import { modalElementParts } from "./html-parts/modal.js";
import { startNewGame } from "./game.js";

const preventScrollToggle = () => {
  const scrollWidth = window.innerWidth - document.documentElement.clientWidth;
  const pageWrapper = document.querySelector(".page-wrapper");

  if (!pageWrapper.classList.contains("prevent-scroll")) {
    document.body.classList.add("prevent-scroll");
    document.body.style.paddingRight = scrollWidth + "px";
  } else {
    document.body.classList.remove("prevent-scroll");
    document.body.style.paddingRight = "";
  }
};

const modalCloseHandler = (event) => {
  if (event.type === "keydown" && event.key === "Escape") {
    closeModalWindow();
    return;
  }

  if (event.type === "click") {
    const target = event.target;
    const action = target.dataset.action;

    if (target.classList.contains("modal-backdrop") || action === "close") {
      closeModalWindow();
    }

    if (action === "new-game") {
      closeModalWindow();
      startNewGame();
    }
  }
};

const openModalWithParts = (contentParts) => {
  preventScrollToggle();

  for (const part in modalElementParts) {
    modalElementParts[part].append(contentParts[part]);
  }

  const modalBackdrop = document.querySelector(".modal-backdrop");
  modalBackdrop.classList.add("modal-backdrop_open");
  modalBackdrop.addEventListener("click", modalCloseHandler);
  document.addEventListener("keydown", modalCloseHandler);
};

const closeModalWindow = () => {
  preventScrollToggle();

  const modalBackdrop = document.querySelector(".modal-backdrop");

  modalBackdrop.classList.remove("modal-backdrop_open");

  modalBackdrop.removeEventListener("click", modalCloseHandler);
  document.removeEventListener("keydown", modalCloseHandler);

  setTimeout(() => {
    for (const part in modalElementParts) {
      modalElementParts[part].replaceChildren();
    }
  }, 300);
};

export { openModalWithParts, closeModalWindow };
