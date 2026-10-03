import { GAME_CARDS } from "../game.js";

const ALBUMS_LINKS = {
  1: "https://open.spotify.com/album/4HWoQ2bd1So9n8QaOJkmxi?si=YQsKkaBeQTSgzx9mMsE24Q",
  2: "https://open.spotify.com/album/7ED8119lG5aq69kVD9fwKx?si=bDm5jQphT2-VB8sF_-Ki8Q",
  3: "https://open.spotify.com/album/02ckr5ir6P08lwdV2zdcBl?si=73505QPMQM-bVZTZlexTyA",
  4: "https://open.spotify.com/album/55fq75UfkYbGMq4CncCtOH?si=ELHzlk1HQ3Gjt3P-2DhEnA",
  5: "https://open.spotify.com/album/0yhwDk0EqhcbTE5k0cqs1K?si=zspBH823TeSlC3-5ir2Y7A",
  6: "https://open.spotify.com/album/5dN7F9DV0Qg1XRdIgW8rke?si=b5erinm5TnWr4YLIsMMLyg",
  7: "https://open.spotify.com/album/4hBTxv4QRPePXCFcEI7Vjp?si=ydTsZ270ShyCFxl4PEoVdQ",
  8: "https://open.spotify.com/album/7F77EdAfCgfJ4vWTTSSowb?si=4FHmcp4nTKOR5C9HWEiB4g",
};

const createAlbumsLinks = () => {
  const footerNav = document.createElement("nav");

  for (let i = 0; i < GAME_CARDS; i++) {
    const link = document.createElement("a");
    const img = new Image();

    link.classList.add("footer-link");
    link.href = ALBUMS_LINKS[i + 1];

    img.src = `./assets/cards/card-${i + 1}.webp`;
    img.alt = "footer nav image";
    img.draggable = false;

    link.append(img);
    footerNav.append(link);
  }

  return footerNav;
};

const createPageFooter = () => {
  const footer = document.createElement("footer");
  const footerNav = createAlbumsLinks();

  footer.classList.add("page-footer");
  footerNav.classList.add("footer-nav");

  footer.append(footerNav);
  return footer;
};

const placePageFooter = () => {
  const page = document.querySelector(".page");
  const footer = createPageFooter();
  page.append(footer);
};

export { placePageFooter };
