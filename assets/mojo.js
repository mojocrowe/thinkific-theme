/**
 * Include the module number in view module links.
 */
function updateModuleLinkText() {
	if (!window.location.pathname.includes("/bundles/")) {
		return;
	}

	const allLinks = document.querySelectorAll('.kapow-spt a[href*="/courses/take"]');
	const links = Array.from(allLinks).filter((link) => !link.querySelector("img"));

	links.forEach((link, index) => (link.innerHTML = `View Module ${index + 1} <i class="fa-solid fa-arrow-right"></i>`));
}

updateModuleLinkText();
