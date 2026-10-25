const loader = document.getElementById('loader');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const navLinks = [...document.querySelectorAll('.nav-link')];

window.addEventListener('load', () => {
  // Keep the intro animation visible long enough to feel intentional.
  window.setTimeout(() => {
    loader.classList.add('done');
    document.body.classList.remove('loading');
  }, 850);
});

document.body.classList.add('loading');
menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Reveal elements only as they enter the viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Keep the navigation highlight in sync with the visible section.
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));

document.getElementById('year').textContent = new Date().getFullYear();
