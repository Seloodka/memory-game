const createModalButtons = (...buttonsText) => {
  const buttons = [];

  for (let i = 0; i < buttonsText.length; i++) {
    const button = document.createElement("button");
    const buttonText = buttonsText[i];

    button.classList.add("modal-button");
    button.textContent = buttonText;
    button.dataset.action = buttonText.toLowerCase().split(" ").join("-");

    buttons.push(button);
  }

  return buttons;
};

const createWinModalWindow = (turns) => {
  const modalTittle = document.createElement("h2");
  const modalWinContent = document.createElement("div");
  const winContentTitle = document.createElement("h3");
  const winTotalScore = document.createElement("span");
  const buttonContainer = document.createElement("div");

  modalWinContent.classList.add("modal-content_win");
  winTotalScore.classList.add("modal-total-score");
  buttonContainer.classList.add("modal-button-container");

  modalTittle.textContent = "You Won!";
  winContentTitle.textContent = "Turns total";
  winTotalScore.textContent = turns;

  modalWinContent.append(winContentTitle, winTotalScore);
  buttonContainer.append(...createModalButtons("New Game", "Close"));

  const winModalParts = {
    header: modalTittle,
    content: modalWinContent,
    footer: buttonContainer,
  };

  return winModalParts;
};

const createBaseModalLayout = () => {
  const backdrop = document.createElement("div");
  const modalWindow = document.createElement("section");
  const modalHeader = document.createElement("header");
  const modalContent = document.createElement("div");
  const modalFooter = document.createElement("footer");

  backdrop.classList.add("modal-backdrop");
  modalWindow.classList.add("modal-window");
  modalHeader.classList.add("modal-header");
  modalContent.classList.add("modal-content");
  modalFooter.classList.add("modal-footer");

  backdrop.append(modalWindow);
  modalWindow.append(modalHeader, modalContent, modalFooter);

  return backdrop;
};

const placeModalTemplate = () => {
  const page = document.querySelector(".page");
  page.append(createBaseModalLayout());

  modalElementParts.header = document.querySelector(".modal-header");
  modalElementParts.content = document.querySelector(".modal-content");
  modalElementParts.footer = document.querySelector(".modal-footer");
};

const modalElementParts = {
  header: null,
  content: null,
  footer: null,
};

export { placeModalTemplate, createWinModalWindow, modalElementParts };
