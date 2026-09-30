export const createPageLayout = () => {
  const pageWrapper = document.createElement("div");

  pageWrapper.classList.add("page");
  document.body.classList.add("page-wrapper");

  document.body.append(pageWrapper);
};
