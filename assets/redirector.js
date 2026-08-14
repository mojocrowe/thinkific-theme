/**
 * Redirect the user to the program page when exiting a SCORM module.
 */
(function () {
  window.addEventListener("click", (event) => {
    const link = event.target.closest('a[href*="/courses/take"]');

    if (!link || !window.location.pathname.includes("/bundles/")) return;

    sessionStorage.setItem("lastKnownProgramScreen", window.location.pathname);
  });

  if (
    window.location.pathname.includes("/enrollments") &&
    document.referrer.includes("/scorm/player/")
  ) {
    const lastKnownProgramScreen = sessionStorage.getItem(
      "lastKnownProgramScreen",
    );
    if (lastKnownProgramScreen) {
      sessionStorage.removeItem("lastKnownProgramScreen");
      window.location.replace(lastKnownProgramScreen);
    }
  }
})();
