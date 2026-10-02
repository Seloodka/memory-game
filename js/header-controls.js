import { startNewGame } from "./game.js";

const showLeaderboardHandler = () => {};

const newGameControlHandler = () => {
  const turns = parseInt(
    document.querySelector(".game-turns").textContent.replace("Turns: ", ""),
  );

  if (turns > 0) {
    startNewGame();
  }
};

export const headerControlsSetUp = () => {
  const controls = document.querySelectorAll(".header-button");
  controls[0].addEventListener("click", newGameControlHandler);
  controls[1].addEventListener("click", showLeaderboardHandler);
};
