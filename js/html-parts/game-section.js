const GAME_CARDS = 8;

const createSectionHeader = () => {
  const sectionHeader = document.createElement("header");
  const sectionName = document.createElement("h1");

  sectionHeader.classList.add("game-header");
  sectionHeader.append(sectionName);

  sectionName.classList.add("game-title");
  sectionName.innerText = "Memory Game";

  return sectionHeader;
};

const createSectionFooter = () => {
  const sectionFooter = document.createElement("footer");
  const gameTurns = document.createElement("span");
  const foundPairs = document.createElement("span");

  sectionFooter.classList.add("game-footer");
  sectionFooter.append(gameTurns, foundPairs);

  gameTurns.classList.add("game-turns");
  gameTurns.textContent = "Turns: 0";

  foundPairs.classList.add("game-found-pairs");
  foundPairs.textContent = "Pairs found: 0/" + GAME_CARDS;

  return sectionFooter;
};

const createCardImage = (number) => {
  const image = new Image();

  image.src = `./assets/cards/card-${number}.webp`;
  image.alt = "Card image";
  image.draggable = false;

  return image;
};

const createCards = () => {
  const cards = [];

  for (let i = 0; i < GAME_CARDS; i++) {
    const card = document.createElement("div");
    const cardFront = document.createElement("div");
    const cardBack = document.createElement("div");

    card.classList.add("game-card");
    card.append(cardFront, cardBack);

    cardFront.classList.add("card-side", "card-side_front");
    cardFront.append(createCardImage(i + 1));

    cardBack.classList.add("card-side", "card-side_back");

    cards.push(card);
  }

  return cards.flatMap((card) => [card, card.cloneNode(true)]);
};

const createGameSection = () => {
  const gameSection = document.createElement("section");
  const gameField = document.createElement("div");
  const sectionHeader = createSectionHeader();
  const fieldCards = createCards();
  const sectionFooter = createSectionFooter();

  gameSection.classList.add("game-wrapper");
  gameSection.append(sectionHeader, gameField, sectionFooter);

  gameField.classList.add("game-field");
  gameField.append(...fieldCards);

  return gameSection;
};

export const placeGameSection = () => {
  const page = document.querySelector(".page");
  page.append(createGameSection());
};
