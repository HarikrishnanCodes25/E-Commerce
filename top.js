// Mobile hamburger + dropdown handling (Option A: sticky header; main is offset)
(function () {
  const header = document.getElementById('site-header');
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  const dropdownParents = Array.from(document.querySelectorAll('.dropdown'));

  if (!hamburger || !nav) return;

  // keep main content offset equal to header height (handles header height changes)
  function syncMainPadding() {
    const rootH = getComputedStyle(document.documentElement).getPropertyValue('--header-h') || '72px';
    const main = document.querySelector('main');
    if (main) {
      // apply exact computed header height plus 16px breathing room
      main.style.paddingTop = `calc(${rootH} + 16px)`;
    }
  }
  syncMainPadding();
  window.addEventListener('resize', syncMainPadding);

  // Toggle mobile nav open/close
  hamburger.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', String(isOpen));

    // prevent page behind from scrolling when mobile panel is open
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      // collapse dropdowns
      dropdownParents.forEach(d => d.classList.remove('expanded'));
      dropdownParents.forEach(d => {
        const a = d.querySelector('a[aria-expanded]');
        if (a) a.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Handle dropdowns: on small screens, clicking parent toggles submenu.
  dropdownParents.forEach(li => {
    const anchor = li.querySelector('a');
    const submenu = li.querySelector('.dropdown-menu');
    if (!submenu || !anchor) return;

    anchor.addEventListener('click', function (ev) {
      if (window.matchMedia('(max-width: 1024px)').matches) {
        ev.preventDefault();
        const nowExpanded = li.classList.toggle('expanded');
        anchor.setAttribute('aria-expanded', String(nowExpanded));
      }
    });
  });

  // close nav when clicking outside
  document.addEventListener('click', function (ev) {
    if (!nav.classList.contains('active')) return;
    const target = ev.target;
    if (!target.closest('#main-nav') && !target.closest('#hamburger')) {
      nav.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      dropdownParents.forEach(d => d.classList.remove('expanded'));
    }
  });

  // close nav on escape
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') {
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        dropdownParents.forEach(d => d.classList.remove('expanded'));
      }
    }
  });
})();















/* multiple type animation js code */

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll("[data-animate]").forEach(el => observer.observe(el));










