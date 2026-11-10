/** Theme-owned enhancements for the portal and asynchronously rendered Kapow UI. */
(function () {
  'use strict';
  const main = document.getElementById('main-content');
  if (!main) return;
  const setAttribute = (element, name, value) => {
    if (element.getAttribute(name) !== value) element.setAttribute(name, value);
  };
  const setText = (element, value) => {
    if (element.textContent !== value) element.textContent = value;
  };
  const safeHref = (link) => {
    try {
      const url = new URL(link.getAttribute('href'), window.location.href);
      return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
    } catch (_) { return null; }
  };

  function enhanceLearning() {
    // Shared resource cards also appear on other pages; CTA injection is dashboard-only.
    if (/^\/enrollments\/?$/.test(window.location.pathname)) {
      main.querySelectorAll('.kapow-spa .resource-card').forEach((card) => {
        const titleLink = card.querySelector('.card-heading a');
        const content = card.querySelector('.kapow-card-content .wrapper, .kapow-card-content');
        if (!titleLink || !content || !safeHref(titleLink)) return;
        const title = titleLink.textContent.trim();
        card.querySelectorAll('.img a').forEach((link) => setAttribute(link, 'aria-label', 'View program: ' + title));
        let action = content.querySelector('.mojo-program-action');
        if (!action) {
          action = document.createElement('a');
          action.className = 'button button-secondary mojo-program-action';
          action.textContent = 'View program';
          content.appendChild(action);
        }
        setAttribute(action, 'href', safeHref(titleLink));
        setAttribute(action, 'aria-label', 'View program: ' + title);
        if (titleLink.target) setAttribute(action, 'target', titleLink.target);
      });
    }

    const pathway = main.querySelector('.kapow-spt');
    if (!pathway) return;
    pathway.querySelectorAll('.color-banner-subheading').forEach((badge) => {
      const wrapper = badge.parentElement;
      // Remove the badge-only row child so its spacing is removed too.
      if (wrapper && wrapper.parentElement && wrapper.parentElement.matches('.row') && wrapper.children.length === 1) wrapper.remove();
      else badge.remove();
    });
    const modules = Array.from(pathway.querySelectorAll('[data-id]')).filter((item) => item.querySelector('h4'));
    modules.forEach((item, index) => {
      const heading = item.querySelector('h4');
      setText(heading, heading.textContent.replace(/\s*\(B2C\)/g, '').trim());
      item.querySelectorAll('a[href*="/courses/take/"]').forEach((link) => {
        if (link.querySelector('img')) {
          setAttribute(link, 'aria-label', 'Open module ' + (index + 1) + ': ' + heading.textContent.trim());
        } else {
          // Preserve the plugin's original link and any completion/lock state.
          const label = 'View module ' + (index + 1);
          if (link.dataset.mojoModuleLabel !== label || !link.textContent.startsWith(label)) {
            link.textContent = label + ' ';
            const icon = document.createElement('i');
            icon.className = 'fa-solid fa-arrow-right';
            icon.setAttribute('aria-hidden', 'true');
            link.appendChild(icon);
            link.dataset.mojoModuleLabel = label;
          }
          setAttribute(link, 'aria-label', 'View module ' + (index + 1) + ': ' + heading.textContent.trim());
        }
      });
    });
    document.title = document.title.replace(/\s*\(B2C\)/g, '');
  }

  function enhanceAccountNavigation() {
    const nav = document.querySelector('.my-account__menu');
    if (!nav || document.querySelector('.mojo-mobile-account-nav')) return;
    const links = Array.from(nav.querySelectorAll('a[href]'));
    if (!links.length) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'mojo-mobile-account-nav';
    const label = document.createElement('label');
    label.htmlFor = 'mojo-account-section';
    label.textContent = 'My account';
    const select = document.createElement('select');
    select.id = 'mojo-account-section';
    select.className = 'form__control';
    links.forEach((link) => {
      const option = document.createElement('option');
      option.value = link.href;
      option.textContent = link.textContent.trim();
      option.selected = link.getAttribute('aria-current') === 'page' || link.classList.contains('active');
      select.appendChild(option);
    });
    select.addEventListener('change', () => { window.location.assign(select.value); });
    wrapper.append(label, select);
    nav.before(wrapper);
    nav.classList.add('mojo-has-mobile-selector');
  }

  document.addEventListener('click', (event) => {
    const toggle = event.target.closest('.mojo-password-toggle');
    if (!toggle) return;
    const input = document.getElementById(toggle.getAttribute('aria-controls'));
    if (!input) return;
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    toggle.setAttribute('aria-pressed', String(show));
    toggle.textContent = show ? 'Hide password' : 'Show password';
  });

  const header = document.querySelector('.header');
  const menuToggle = header && header.querySelector('.header__mobile-button');
  const mobile = window.matchMedia('(max-width: 767px)');
  const previousInert = new Map();
  const isOpen = () => mobile.matches && header && header.getAttribute('data-menu') === 'open';
  function syncMenu() {
    if (isOpen()) {
      document.querySelectorAll('main, .my-account, .footer').forEach((element) => {
        if (!previousInert.has(element)) previousInert.set(element, element.inert);
        element.inert = true;
      });
    } else {
      previousInert.forEach((value, element) => { element.inert = value; });
      previousInert.clear();
    }
  }
  if (menuToggle) {
    new MutationObserver(syncMenu).observe(header, { attributes: true, attributeFilter: ['data-menu'] });
    mobile.addEventListener('change', syncMenu);
    document.addEventListener('keydown', (event) => {
      if (!isOpen()) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        menuToggle.click();
        menuToggle.focus();
      } else if (event.key === 'Tab') {
        const controls = Array.from(header.querySelectorAll('a[href], button:not([disabled])')).filter((element) =>
          element.getClientRects().length && getComputedStyle(element).visibility !== 'hidden' && !element.closest('#skip-link'));
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });
  }

  enhanceAccountNavigation();
  enhanceLearning();
  let scheduled = false;
  new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; enhanceLearning(); });
  }).observe(main, { childList: true, subtree: true });
})();
