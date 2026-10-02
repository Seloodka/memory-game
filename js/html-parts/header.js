const createHeaderButton = (number) => {
  const buttons = [];

  for (let i = 0; i < number; i++) {
    const button = document.createElement("button");
    button.classList.add("header-button");

    buttons.push(button);
  }

  return buttons;
};

const createHeader = () => {
  const header = document.createElement("header");
  const buttonsContainer = document.createElement("div");
  const headerButtons = createHeaderButton(2);
  const buttonsNames = ["New game", "Leaderboard"];

  header.classList.add("page-header");
  buttonsContainer.classList.add("header-buttons-container");

  headerButtons.forEach((button, ind) => {
    button.innerText = buttonsNames[ind];
    buttonsContainer.append(button);
  });

  header.append(buttonsContainer);

  return header;
};

const placeHeader = () => {
  const page = document.querySelector(".page");
  page.append(createHeader());
};

export { placeHeader };
