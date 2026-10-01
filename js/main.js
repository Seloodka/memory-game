import { createPageLayout } from "./html-parts/page-layout.js";
import { placeHeader } from "./html-parts/header.js";
import { placeGameSection } from "./html-parts/game-section.js";
import { gameSetUp, startNewGame } from "./game.js";

createPageLayout();
placeHeader();
placeGameSection();

gameSetUp();
startNewGame();
