/* ===================================================
   FUSION 5 — HOLOGRAM ARRAY WEBSITE
   script.js
   =================================================== */

// ─── NAV scroll + hamburger ────────────────────────
const nav       = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 40);
});

function setMenuOpen(open) {
  navLinks.classList.toggle('is-open', open);
  hamburger.setAttribute('aria-expanded', String(open));
}
hamburger.addEventListener('click', () => {
  setMenuOpen(hamburger.getAttribute('aria-expanded') !== 'true');
});
navLinks.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => setMenuOpen(false));
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    hamburger.focus();
  }
});
document.addEventListener('click', event => {
  if (!nav.contains(event.target)) setMenuOpen(false);
});
window.matchMedia('(min-width: 769px)').addEventListener('change', () => setMenuOpen(false));
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// ─── PARTICLE CANVAS ──────────────────────────────
(function initParticles() {
  const container = document.getElementById('particles');
  if (!container || reducedMotion.matches) return;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = container.offsetWidth;
    H = canvas.height = container.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : H + 4;
      this.vy = -(0.3 + Math.random() * 0.5);
      this.vx = (Math.random() - 0.5) * 0.3;
      this.alpha = 0;
      this.targetAlpha = 0.2 + Math.random() * 0.4;
      this.size = 1 + Math.random() * 1.5;
      this.life = 0;
      this.maxLife = 200 + Math.random() * 300;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;
      const ratio = this.life / this.maxLife;
      if (ratio < 0.1)      this.alpha = this.targetAlpha * (ratio / 0.1);
      else if (ratio > 0.8) this.alpha = this.targetAlpha * ((1 - ratio) / 0.2);
      else                  this.alpha = this.targetAlpha;
      if (this.life > this.maxLife || this.y < -10) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,229,255,${this.alpha})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = Array.from({length: 60}, () => new Particle());
  }

  function loop() {
    if (document.hidden) {
      requestAnimationFrame(loop);
      return;
    }
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  init();
  loop();
})();

// ─── COUNTER ANIMATION ────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  if (reducedMotion.matches) {
    el.textContent = target.toLocaleString();
    return;
  }
  const dur    = 2000;
  const step   = 16;
  const steps  = dur / step;
  let count    = 0;
  const timer  = setInterval(() => {
    count++;
    const val = Math.min(Math.round(target * (count / steps)), target);
    el.textContent = val.toLocaleString();
    if (count >= steps) clearInterval(timer);
  }, step);
}

// ─── SCROLL REVEAL ────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.glass-card, .section-header, .hero__stat, .timeline__item, .badge, .tag, .about__lead, .about__body').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Counter trigger
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-count]').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsEl = document.getElementById('hero-stats');
if (statsEl) counterObserver.observe(statsEl);

// ─── ACTIVE NAV LINK ──────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav__link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--cyan)';
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ─── HERO ORB image cycle ──────────────────────────
const orbImg   = document.getElementById('hero-orb-img');
const orbImgs  = ['assets/images/hologram1.jpg','assets/images/hologram2.jpg'];
let orbIdx = 0;
setInterval(() => {
  if (!orbImg || document.hidden || reducedMotion.matches) return;
  orbIdx = (orbIdx + 1) % orbImgs.length;
  orbImg.style.opacity = '0';
  setTimeout(() => { orbImg.src = orbImgs[orbIdx]; orbImg.style.opacity = '1'; }, 400);
}, 4000);
orbImg.style.transition = 'opacity 0.4s';

console.log('%cFUSION 5 · HOLOGRAM ARRAY', 'color:#00e5ff;font-family:monospace;font-size:16px;font-weight:bold;');
console.log('%cBuilt with precision. Engineered to display.', 'color:#8a9295;font-family:monospace;font-size:11px;');
