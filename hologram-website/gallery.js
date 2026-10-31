/* Evaluation day photo journal. Original photos remain uncropped. */
(() => {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;

  const items = [...gallery.querySelectorAll('.gallery__item')];
  const preview = document.getElementById('gallery-preview');
  const stage = document.getElementById('gallery-open');
  const filmstrip = gallery.querySelector('.gallery__filmstrip');
  const category = document.getElementById('gallery-category');
  const title = document.getElementById('gallery-photo-title');
  const description = document.getElementById('gallery-description');
  const counter = document.getElementById('gallery-current');
  const lightbox = document.getElementById('lightbox');
  const fullImage = document.getElementById('lightbox-img');
  const fullCaption = document.getElementById('lightbox-caption');
  const fullCounter = document.getElementById('lightbox-counter');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let currentIndex = 0;
  let lastSwipeAt = -Infinity;
  let photoAnimation;

  const number = index => String(index + 1).padStart(2, '0');
  const wrap = index => (index + items.length) % items.length;

  function syncFullView() {
    const item = items[currentIndex];
    const image = item.querySelector('img');
    fullImage.src = image.src;
    fullImage.alt = image.alt;
    fullCaption.textContent = item.dataset.title;
    fullCounter.textContent = `${number(currentIndex)} / ${String(items.length).padStart(2, '0')}`;
  }

  function selectPhoto(index, animate = true) {
    currentIndex = wrap(index);
    const item = items[currentIndex];
    const image = item.querySelector('img');
    preview.src = image.src;
    preview.alt = image.alt;
    preview.width = Number(image.getAttribute('width'));
    preview.height = Number(image.getAttribute('height'));
    category.textContent = item.dataset.caption;
    title.textContent = item.dataset.title;
    description.textContent = image.alt;
    counter.textContent = number(currentIndex);
    stage.setAttribute('aria-label', `Open photo ${number(currentIndex)} in full view: ${item.dataset.title}`);

    items.forEach((button, i) => {
      button.classList.toggle('is-selected', i === currentIndex);
      button.setAttribute('aria-pressed', String(i === currentIndex));
    });

    // Scroll only the thumbnail strip, preserving the page's vertical position.
    if (filmstrip.scrollWidth > filmstrip.clientWidth) {
      const selected = item.getBoundingClientRect();
      const strip = filmstrip.getBoundingClientRect();
      filmstrip.scrollBy({
        left: selected.left - strip.left - (strip.width - selected.width) / 2,
        behavior: reducedMotion.matches ? 'auto' : 'smooth',
      });
    }

    photoAnimation?.cancel();
    if (animate && !reducedMotion.matches) {
      photoAnimation = preview.animate([{ opacity: 0.4 }, { opacity: 1 }], { duration: 240 });
    }
    if (lightbox.classList.contains('is-open')) syncFullView();
  }

  function openFullView(event) {
    if (performance.now() - lastSwipeAt < 400) {
      event?.preventDefault();
      return;
    }
    syncFullView();
    ProjectUI.open(lightbox);
  }

  const previous = () => selectPhoto(currentIndex - 1);
  const next = () => selectPhoto(currentIndex + 1);
  const close = () => ProjectUI.close(lightbox);

  items.forEach((item, index) => item.addEventListener('click', () => selectPhoto(index)));
  stage.addEventListener('click', openFullView);
  document.getElementById('gallery-prev').addEventListener('click', previous);
  document.getElementById('gallery-next').addEventListener('click', next);
  document.getElementById('lightbox-prev').addEventListener('click', previous);
  document.getElementById('lightbox-next').addEventListener('click', next);
  document.getElementById('lightbox-close').addEventListener('click', close);

  gallery.addEventListener('keydown', event => {
    const actions = { ArrowLeft: previous, ArrowRight: next, Home: () => selectPhoto(0), End: () => selectPhoto(items.length - 1) };
    if (!actions[event.key]) return;
    event.preventDefault();
    actions[event.key]();
    if (event.target.closest('.gallery__item')) items[currentIndex].focus({ preventScroll: true });
  });

  document.addEventListener('keydown', event => {
    if (!lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') { event.preventDefault(); previous(); }
    if (event.key === 'ArrowRight') { event.preventDefault(); next(); }
  });

  const imageArea = document.getElementById('lightbox-image-area');
  lightbox.addEventListener('click', event => {
    if (performance.now() - lastSwipeAt < 400) return;
    if (event.target === lightbox || event.target === imageArea) close();
  });

  function enableSwipe(element) {
    let start = null;
    element.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'touch' || !event.isPrimary) return;
      start = { x: event.clientX, y: event.clientY, id: event.pointerId };
    });
    element.addEventListener('pointercancel', () => { start = null; });
    element.addEventListener('pointerup', event => {
      if (!start || start.id !== event.pointerId) return;
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      start = null;
      if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      lastSwipeAt = performance.now();
      dx < 0 ? next() : previous();
    });
  }

  enableSwipe(stage);
  enableSwipe(imageArea);
  selectPhoto(0, false);
})();
