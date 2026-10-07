const createHeaderButton = (buttonsText) => {
  const buttons = [];

  for (const buttonText of buttonsText) {
    const button = document.createElement("button");

    button.classList.add("header-button");
    button.textContent = buttonText;
    button.dataset.action = buttonText.toLowerCase().split(" ").join("-");

    buttons.push(button);
  }

  return buttons;
};

const createHeader = () => {
  const header = document.createElement("header");
  const buttonsContainer = document.createElement("div");
  const buttonsNames = ["New game", "Leaderboard"];
  const headerButtons = createHeaderButton(buttonsNames);

  header.classList.add("page-header");
  buttonsContainer.classList.add("header-buttons-container");

  header.append(buttonsContainer);
  buttonsContainer.append(...headerButtons);

  return header;
};

const placeHeader = () => {
  const page = document.querySelector(".page");
  page.append(createHeader());
};

export { placeHeader };
