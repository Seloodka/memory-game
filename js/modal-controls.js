import { modalElementParts } from "./html-parts/modal.js";
import { startNewGame } from "./game.js";

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
  for (const part in modalElementParts) {
    modalElementParts[part].append(contentParts[part]);
  }

  const modalBackdrop = document.querySelector(".modal-backdrop");
  modalBackdrop.classList.add("modal-backdrop_open");
  modalBackdrop.addEventListener("click", modalCloseHandler);
  document.addEventListener("keydown", modalCloseHandler);
};

const closeModalWindow = () => {
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
