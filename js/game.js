import { addGameStatsToTop } from "./local-storage.js";
import { createWinModalWindow } from "./html-parts/modal.js";
import { openModalWithParts } from "./modal-controls.js";

const GAME_CARDS = 8;

const createCardPairs = () => {
  const cards = Array.from(document.querySelector(".game-field").children);
  const cardPairs = new Map();

  for (let i = 1; i < cards.length; i += 2) {
    cardPairs.set(cards[i], cards[i - 1]);
    cardPairs.set(cards[i - 1], cards[i]);
  }

  return cardPairs;
};

const shuffleCards = () => {
  const gameField = document.querySelector(".game-field");
  const cards = Array.from(gameField.children);

  for (let i = 0; i < cards.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));

    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  gameField.append(...cards);
};

const closeCard = (card) => {
  card.classList.remove("game-card_open");
};

const openCard = (card) => {
  card.classList.add("game-card_open");
};

const setGuessedPair = (...cards) => {
  game.addFoundPair();
  game.fieldElement.removeEventListener("click", gameFieldCardClick);

  game.activeTimer = setTimeout(() => {
    cards.forEach((card) => card.classList.add("game-card_guessed"));

    game.fieldElement.addEventListener("click", gameFieldCardClick);
    game.activeTimer = null;
  }, 300);
};

const closeOpenedCards = (...cards) => {
  game.fieldElement.removeEventListener("click", gameFieldCardClick);

  game.activeTimer = setTimeout(() => {
    cards.forEach((card) => closeCard(card));

    game.fieldElement.addEventListener("click", gameFieldCardClick);
    game.activeTimer = null;
  }, 900);
};

const nextTurn = () => {
  game.currentOpenedCard = null;
  game.addTurn();
};

const handleCardClick = (card) => {
  if (!game.currentOpenedCard) {
    game.currentOpenedCard = card;
    openCard(card);

    return;
  }

  openCard(card);

  if (game.cardPairs.get(card) === game.currentOpenedCard) {
    setGuessedPair(card, game.currentOpenedCard);
  } else {
    closeOpenedCards(card, game.currentOpenedCard);
  }

  nextTurn();

  if (game.foundPairs === GAME_CARDS) {
    endGameWithWin();
  }
};

const gameFieldCardClick = (event) => {
  const card = event.target.closest(".game-card");

  if (!card) {
    return;
  }

  if (
    card.classList.contains("card-guessed") ||
    card.classList.contains("game-card_open")
  ) {
    return;
  }

  handleCardClick(card);
};

const resetField = () => {
  const cards = Array.from(game.fieldElement.children);
  cards.forEach((card) => {
    card.classList.remove("game-card_open", "game-card_guessed");
  });
};

const endGameWithWin = () => {
  const todayDate = new Date().toLocaleDateString("en-GB");

  addGameStatsToTop(game.turns, todayDate);

  const winModalParts = createWinModalWindow(game.turns);
  openModalWithParts(winModalParts);

  setTimeout(() => {
    Array.from(game.fieldElement.children).forEach((card) => {
      card.classList.remove("game-card_guessed");
    });
  }, 300);

  game.fieldElement.removeEventListener("click", gameFieldCardClick);
};

const startNewGame = () => {
  game.fieldElement.removeEventListener("click", gameFieldCardClick);

  if (game.activeTimer) {
    clearTimeout(game.activeTimer);

    game.activeTimer = null;
  }

  resetField();

  setTimeout(() => {
    //shuffleCards();
    game.fieldElement.addEventListener("click", gameFieldCardClick);
  }, 300);

  game.turns = 0;
  game.foundPairs = 0;
  game.currentOpenedCard = null;
  game.resetCounters();
};

const gameSetUp = () => {
  game.fieldElement = document.querySelector(".game-field");
  game.turnsElement = document.querySelector(".game-turns");
  game.foundPairsElement = document.querySelector(".game-found-pairs");
  game.cardPairs = createCardPairs();
};

const game = {
  fieldElement: null,
  turnsElement: null,
  foundPairsElement: null,

  activeTimer: null,

  cardPairs: null,
  currentOpenedCard: null,
  turns: 0,
  foundPairs: 0,

  addTurn() {
    this.turns += 1;
    this.turnsElement.innerText = `Turns: ${this.turns}`;
  },

  addFoundPair() {
    this.foundPairs += 1;

    const text = "Pairs found:" + `${this.foundPairs}/${GAME_CARDS}`;
    this.foundPairsElement.innerText = text;
  },

  resetCounters() {
    this.turnsElement.innerText = `Turns: ${this.turns}`;
    this.foundPairsElement.innerText = "Pairs found: 0/8";
  },
};

export { GAME_CARDS, gameSetUp, startNewGame };
