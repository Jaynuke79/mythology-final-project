// ── Scroll-activated content reveal ─────────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.realm__content').forEach((el) => observer.observe(el));

// ── Active nav link on scroll ────────────────────────
const sections = document.querySelectorAll('.realm');
const navLinks = document.querySelectorAll('#realm-nav a');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove('active'));
        const active = document.querySelector(`#realm-nav a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((section) => navObserver.observe(section));

// ── Modal ────────────────────────────────────────────
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

function openModal(html) {
  modalBody.innerHTML = html;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  modalClose.focus();
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  modalBody.innerHTML = '';
}

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Export openModal so realm content scripts can call it.
window.openModal = openModal;

// ── Story cards ──────────────────────────────────────
function wireStoryCards(root) {
  (root || document).querySelectorAll('.story-card').forEach((card) => {
    if (card.dataset.wired) return;
    card.dataset.wired = '1';

    const img = card.querySelector('img');
    const title = card.dataset.title || '';
    const story = card.dataset.story || '';

    if (img && title && !card.querySelector('.story-card__caption')) {
      const caption = document.createElement('span');
      caption.className = 'story-card__caption';
      caption.textContent = title;
      card.appendChild(caption);
    }

    card.addEventListener('click', () => {
      const imgSrc = img ? img.src : '';
      const imgAlt = img ? img.alt : title;
      openModal(`
        ${imgSrc ? `<img class="story-modal__img" src="${imgSrc}" alt="${imgAlt}">` : ''}
        ${title ? `<h3 class="story-modal__title">${title}</h3>` : ''}
        ${story ? `<p class="story-modal__body">${story}</p>` : ''}
      `);
    });
  });
}

wireStoryCards();

// Re-wire any cards added dynamically after page load.
window.wireStoryCards = wireStoryCards;
