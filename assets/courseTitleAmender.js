/**
 * Remove "(B2C)" from course titles
 */
(function () {
  if (!window.location.pathname.includes("/bundles/")) {
    return;
  }

  document.title = document.title.replace(" (B2C)", "");

  const allCourseTitles = document.querySelectorAll(".kapow-spt h4");

  allCourseTitles.forEach((title) => {
    title.textContent = title.textContent.replace(" (B2C)", "");
  });
})();
