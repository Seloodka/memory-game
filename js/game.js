export const GAME_CARDS = 8;

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

const toggleCardSide = (card) => {
  card.classList.toggle("game-card_open");
};

const setGuessedPair = (...cards) => {
  game.addFoundPair();
  game.fieldElement.removeEventListener("click", gameFieldCardClick);

  setTimeout(() => {
    cards.forEach((card) => card.classList.add("game-card_guessed"));
    game.fieldElement.addEventListener("click", gameFieldCardClick);
  }, 400);
};

const closeOpenedCards = (...cards) => {
  game.fieldElement.removeEventListener("click", gameFieldCardClick);

  setTimeout(() => {
    cards.forEach((card) => toggleCardSide(card));
    game.fieldElement.addEventListener("click", gameFieldCardClick);
  }, 800);
};

const nextTurn = () => {
  game.currentOpenedCard = null;
  game.addTurn();
};

const handleCardClick = (card) => {
  if (!game.currentOpenedCard) {
    game.currentOpenedCard = card;
    toggleCardSide(card);

    return;
  }

  toggleCardSide(card);

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
  const cards = document.querySelectorAll(".game-card");
  cards.forEach((card) => {
    card.classList.remove("game-card_open", "card-guessed");
  });
};

const endGameWithWin = () => {
  game.fieldElement.removeEventListener("click", gameFieldCardClick);
};

export const startNewGame = () => {
  resetField();
  shuffleCards();

  game.turns = 0;
  game.foundPairs = 0;
  game.currentOpenedCard = null;
  game.fieldElement.addEventListener("click", gameFieldCardClick);
};

export const gameSetUp = () => {
  game.fieldElement = document.querySelector(".game-field");
  game.turnsElement = document.querySelector(".game-turns");
  game.foundPairsElement = document.querySelector(".game-found-pairs");
  game.cardPairs = createCardPairs();
};

const game = {
  fieldElement: null,
  turnsElement: null,
  foundPairsElement: null,

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

    const elementText = this.foundPairsElement.innerText.split(":");
    elementText[1] = `${this.foundPairs}/${GAME_CARDS}`;

    const finalText = elementText.join(": ");
    this.foundPairsElement.innerText = finalText;
  },
};
