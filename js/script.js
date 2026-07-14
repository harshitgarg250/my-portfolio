// Typed.js hero rotator (only runs where .typed exists)
if (document.querySelector('.typed') && window.Typed) {
  new Typed('.typed', {
    strings: ['MERN applications', 'AI-powered products', 'responsive user experiences'],
    typeSpeed: 90,
    backSpeed: 60,
    backDelay: 1000,
    loop: true,
  });
}

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navIcon = navToggle?.querySelector('i');

navToggle?.addEventListener('click', () => {
  const isOpen = navMenu?.classList.toggle('nav-active');
  navToggle.setAttribute('aria-expanded', String(!!isOpen));
  if (navIcon) {
    navIcon.classList.toggle('bx-menu', !isOpen);
    navIcon.classList.toggle('bx-x', !!isOpen);
  }
});

// Smooth scroll for in-page anchors + close mobile menu after click
document.querySelectorAll('a[href*="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href') || '';
    const hashIndex = href.indexOf('#');
    if (hashIndex === -1) return;

    const targetId = href.slice(hashIndex);
    const pagePart = href.slice(0, hashIndex);
    const onSamePage = pagePart === '' || pagePart === window.location.pathname.split('/').pop();
    if (!onSamePage || targetId.length < 2) return;

    const section = document.querySelector(targetId);
    if (section) {
      event.preventDefault();
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navMenu?.classList.remove('nav-active');
      navToggle?.setAttribute('aria-expanded', 'false');
      if (navIcon) {
        navIcon.classList.add('bx-menu');
        navIcon.classList.remove('bx-x');
      }
    }
  });
});

// Reveal-on-scroll animation
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.reveal-item').forEach((section) => {
  revealObserver.observe(section);
});

// Scroll-spy: highlight active nav link based on section in view
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href*="#"]');

if (sections.length && navLinks.length) {
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            const linkHash = link.getAttribute('href')?.split('#')[1];
            link.classList.toggle('active', linkHash === entry.target.id);
          });
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => spyObserver.observe(section));
}

// Back-to-top button
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('is-visible', window.scrollY > 480);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Basic contact form feedback (no backend wired up yet)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = contactForm.querySelector('button[type="submit"]');
    if (button) {
      const original = button.textContent;
      button.textContent = 'Message noted — thank you!';
      button.disabled = true;
      setTimeout(() => {
        button.textContent = original;
        button.disabled = false;
        contactForm.reset();
      }, 2400);
    }
  });
}
