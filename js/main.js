import { createPageLayout } from "./html-parts/page-layout.js";
import { placeHeader } from "./html-parts/header.js";
import { placeGameSection } from "./html-parts/game-section.js";
import { placePageFooter } from "./html-parts/page-footer.js";
import { placeModalTemplate } from "./html-parts/modal.js";
import { gameSetUp, startNewGame } from "./game.js";
import { headerControlsSetUp } from "./header-controls.js";

createPageLayout();
placeHeader();
placeGameSection();
placePageFooter();
placeModalTemplate();

headerControlsSetUp();

gameSetUp();
startNewGame();
