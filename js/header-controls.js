import { startNewGame, getGameTurns } from "./game.js";
import { createLeaderboardModalWindow } from "./html-parts/modal.js";
import { openModalWithParts } from "./modal-controls.js";

const handleHeaderButtonsClick = (event) => {
  const button = event.target;

  if (button.dataset.action === "new-game") {
    const turns = getGameTurns();

    if (turns > 0) {
      startNewGame();
    }
  }

  if (button.dataset.action === "leaderboard") {
    const leaderboardModalParts = createLeaderboardModalWindow();
    openModalWithParts(leaderboardModalParts);
  }
};

const headerControlsSetUp = () => {
  const buttonsContainer = document.querySelector(".header-buttons-container");
  buttonsContainer.addEventListener("click", handleHeaderButtonsClick);
};

export { headerControlsSetUp };
