// =======================
// CAROUSEL DOS CARDS
// =======================
document.querySelectorAll('.card').forEach(card => {
  const track = card.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const prevButton = card.querySelector('.carousel-btn.prev');
  const nextButton = card.querySelector('.carousel-btn.next');
  let index = 0;

  function updateSlide() {
    slides.forEach((slide, i) => slide.style.display = i === index ? 'block' : 'none');
  }

  prevButton.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    updateSlide();
  });

  nextButton.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    updateSlide();
  });

  updateSlide();
});

// =======================
// MODAL DE IMAGEM/VIDEO
// =======================
const imageModal = document.getElementById('imageModal');
const modalContent = imageModal.querySelector('.modal-content');
const modalClose = imageModal.querySelector('.close');
const modalPrev = imageModal.querySelector('.prev');
const modalNext = imageModal.querySelector('.next');

let currentMedia = [];
let currentIndex = 0;

function openModal(mediaArray, startIndex) {
  currentMedia = mediaArray;
  currentIndex = startIndex;
  showModalContent();
  imageModal.style.display = 'flex';
  imageModal.setAttribute('aria-hidden', 'false');
}

function showModalContent() {
  const item = currentMedia[currentIndex];
  modalContent.innerHTML = '';
  if (item.endsWith('.mp4')) {
    const video = document.createElement('video');
    video.src = item;
    video.controls = true;
    video.autoplay = true;
    video.style.maxHeight = '80vh';
    modalContent.appendChild(video);
  } else {
    const img = document.createElement('img');
    img.src = item;
    img.style.maxHeight = '80vh';
    modalContent.appendChild(img);
  }
}

modalClose.addEventListener('click', () => {
  imageModal.style.display = 'none';
  imageModal.setAttribute('aria-hidden', 'true');
});

modalPrev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + currentMedia.length) % currentMedia.length;
  showModalContent();
});

modalNext.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % currentMedia.length;
  showModalContent();
});

// Abrir modal ao clicar na imagem ou vídeo
document.querySelectorAll('.open-modal').forEach(el => {
  el.addEventListener('click', () => {
    const images = el.dataset.images.split(',');
    const startIndex = images.indexOf(el.getAttribute('src')) >= 0 
      ? images.indexOf(el.getAttribute('src')) 
      : 0;
    openModal(images, startIndex);
  });
});

// Navegação por teclado no modal de imagens
document.addEventListener('keydown', e => {
  if (imageModal.style.display === 'flex') {
    if (e.key === 'ArrowLeft') modalPrev.click();
    if (e.key === 'ArrowRight') modalNext.click();
    if (e.key === 'Escape') modalClose.click();
  }
});

// Fechar modal clicando fora do conteúdo
imageModal.addEventListener('click', e => {
  if (e.target === imageModal) modalClose.click();
});

// =======================
// MODAL DE INFORMAÇÕES
// =======================
const infoModal = document.getElementById('infoModal');
const infoClose = infoModal.querySelector('.close-info');
const infoTitle = infoModal.querySelector('h2');
const infoDetails = infoModal.querySelector('p');

document.querySelectorAll('.info-trigger').forEach(el => {
  el.addEventListener('click', () => {
    infoTitle.textContent = el.dataset.title;
    infoDetails.textContent = el.dataset.details;
    infoModal.style.display = 'flex';
    infoModal.setAttribute('aria-hidden', 'false');
  });
});

infoClose.addEventListener('click', () => {
  infoModal.style.display = 'none';
  infoModal.setAttribute('aria-hidden', 'true');
});

// Fechar modal de informações clicando fora do conteúdo
infoModal.addEventListener('click', e => {
  if (e.target === infoModal) infoClose.click();
});

// Navegação por teclado no modal de informações
document.addEventListener('keydown', e => {
  if (infoModal.style.display === 'flex' && e.key === 'Escape') infoClose.click();
});
