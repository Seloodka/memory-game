import { getTopWinsFromStorage } from "../local-storage.js";
import { getGameTurns } from "../game.js";

const createLeaderboardTableGameRow = (game) => {
  const tr = document.createElement("tr");

  for (const cell in game) {
    const td = document.createElement("td");
    td.textContent = game[cell];

    tr.append(td);
  }

  return tr;
};

const createLeaderboardTableHeadRow = (cells) => {
  const tr = document.createElement("tr");

  for (const cell of cells) {
    const th = document.createElement("th");
    th.textContent = cell;

    tr.append(th);
  }

  return tr;
};

const createLeaderboardTableFromData = (data) => {
  const table = document.createElement("table");
  const caption = document.createElement("caption");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  const theadCells = ["Top", "Turns", "Date"];

  table.classList.add("leaderboard-table");
  caption.innerText = "Top results";

  table.append(caption, thead, tbody);
  thead.append(createLeaderboardTableHeadRow(theadCells));

  data.forEach((game, ind) => {
    const gameRowData = {
      top: ind + 1,
      turns: game.turns,
      date: game.date,
    };
    const gameRow = createLeaderboardTableGameRow(gameRowData);

    tbody.append(gameRow);
  });

  return table;
};

const createModalButtons = (...buttonsText) => {
  const buttons = [];

  for (const buttonText of buttonsText) {
    const button = document.createElement("button");

    button.classList.add("modal-button");
    button.textContent = buttonText;
    button.dataset.action = buttonText.toLowerCase().split(" ").join("-");

    buttons.push(button);
  }

  return buttons;
};

const createLeaderboardModalWindow = () => {
  const modalTittle = document.createElement("h2");
  const modalContainer = document.createElement("div");
  const buttonContainer = document.createElement("div");
  let modalContent;

  const topWins = getTopWinsFromStorage();

  if (topWins.length === 0) {
    modalContent = document.createElement("h3");
    modalContent.textContent = "No results yet";
  } else {
    modalContent = createLeaderboardTableFromData(topWins);
  }

  modalContainer.classList.add("modal-content_leaderboard");

  modalTittle.textContent = "Leaderboard";

  modalContainer.append(modalContent);
  buttonContainer.append(...createModalButtons("Close"));

  const leaderboardParts = {
    header: modalTittle,
    content: modalContainer,
    footer: buttonContainer,
  };

  return leaderboardParts;
};

const createWinModalWindow = () => {
  const modalTittle = document.createElement("h2");
  const modalWinContent = document.createElement("div");
  const winContentTitle = document.createElement("h3");
  const winTotalScore = document.createElement("span");
  const buttonContainer = document.createElement("div");

  const turns = getGameTurns();

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

export {
  placeModalTemplate,
  createWinModalWindow,
  createLeaderboardModalWindow,
  modalElementParts,
};
