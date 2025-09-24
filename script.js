document.addEventListener("DOMContentLoaded", () => {
  /* =======================
      CARROSSEL
  ======================== */
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const prevBtn = carousel.querySelector(".carousel-btn.prev");
    const nextBtn = carousel.querySelector(".carousel-btn.next");
    const items = track.children;
    let index = 0;

    function updateCarousel() {
      const width = items[0].clientWidth;
      track.style.transform = `translateX(-${index * width}px)`;
    }

    nextBtn.addEventListener("click", () => {
      index = (index + 1) % items.length;
      updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
      index = (index - 1 + items.length) % items.length;
      updateCarousel();
    });

    window.addEventListener("resize", updateCarousel);
  });

  /* =======================
      MODAL DE IMAGENS/VÍDEOS
  ======================== */
  const imageModal = document.getElementById("imageModal");
  const modalContent = imageModal.querySelector(".modal-content");
  const closeModal = imageModal.querySelector(".close");
  const prevModal = imageModal.querySelector(".prev");
  const nextModal = imageModal.querySelector(".next");

  let mediaList = [];
  let currentIndex = 0;

  function openMediaModal(images, startIndex = 0) {
    mediaList = images.split(",");
    currentIndex = startIndex;
    showMedia();
    imageModal.style.display = "flex";
  }

  function showMedia() {
    modalContent.innerHTML = "";
    const current = mediaList[currentIndex];

    if (current.endsWith(".mp4")) {
      const video = document.createElement("video");
      video.src = current;
      video.controls = true;
      video.autoplay = true;
      video.style.maxWidth = "100%";
      video.style.maxHeight = "70vh";
      modalContent.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.src = current;
      img.alt = "Imagem do imóvel";
      img.style.maxWidth = "100%";
      img.style.maxHeight = "70vh";
      modalContent.appendChild(img);
    }
  }

  function navigateModal(step) {
    currentIndex = (currentIndex + step + mediaList.length) % mediaList.length;
    showMedia();
  }

  document.querySelectorAll(".open-modal").forEach((item) => {
    item.addEventListener("click", () => {
      const images = item.dataset.images;
      const siblings = [...item.parentElement.children];
      const startIndex = siblings.indexOf(item);
      openMediaModal(images, startIndex);
    });
  });

  closeModal.addEventListener("click", () => (imageModal.style.display = "none"));
  prevModal.addEventListener("click", () => navigateModal(-1));
  nextModal.addEventListener("click", () => navigateModal(1));

  imageModal.addEventListener("click", (e) => {
    if (e.target === imageModal) imageModal.style.display = "none";
  });

  /* =======================
      MODAL DE INFORMAÇÕES
  ======================== */
  const infoModal = document.getElementById("infoModal");
  const infoTitle = infoModal.querySelector("h2");
  const infoDetails = infoModal.querySelector("p");
  const closeInfo = infoModal.querySelector(".close-info");

  document.querySelectorAll(".info-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      infoTitle.textContent = trigger.dataset.title;
      infoDetails.innerHTML = trigger.dataset.details.replace(/\n/g, "<br>");
      infoModal.style.display = "flex";
    });
  });

  closeInfo.addEventListener("click", () => (infoModal.style.display = "none"));

  infoModal.addEventListener("click", (e) => {
    if (e.target === infoModal) infoModal.style.display = "none";
  });

  /* =======================
      ACESSIBILIDADE (ESC + SETAS)
  ======================== */
  document.addEventListener("keydown", (e) => {
    if (imageModal.style.display === "flex") {
      if (e.key === "Escape") imageModal.style.display = "none";
      if (e.key === "ArrowLeft") navigateModal(-1);
      if (e.key === "ArrowRight") navigateModal(1);
    }
    if (infoModal.style.display === "flex" && e.key === "Escape") {
      infoModal.style.display = "none";
    }
  });
});
