const nextEl = document.querySelector(".next");
const prevEl = document.querySelector(".prev");
const imgContainerEl = document.querySelector(".image-slider");
const imgsEl = document.querySelectorAll("img");
const statusIcons = document.querySelectorAll(".status-icon");

let currentImg = 1;
let startX = 0;
let isDragging = false;
let timeout;

const updateImg = () => {
  if (currentImg > imgsEl.length) {
    currentImg = 1;
  } else if (currentImg < 1) {
    currentImg = imgsEl.length;
  }

  imgContainerEl.style.transform = `translateX(-${(currentImg - 1) * 500}px)`;

  statusIcons.forEach((icon, index) => {
    icon.classList.toggle("active", index === currentImg - 1);
  });

  timeout = setTimeout(() => {
    currentImg++;
    updateImg();
  }, 3000);
};
updateImg();
nextEl.addEventListener("click", () => {
  currentImg++;
  clearTimeout(timeout);
  updateImg();
});

prevEl.addEventListener("click", () => {
  currentImg--;
  clearTimeout(timeout);
  updateImg();
});

// Click on Status Icons
statusIcons.forEach((icon, index) => {
  icon.addEventListener("click", () => {
    currentImg = index + 1;
    clearTimeout(timeout);
    updateImg();
  });
});

// Touch Events for Dragging
imgContainerEl.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

imgContainerEl.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const currentX = e.touches[0].clientX;
  const diff = startX - currentX;
  if (Math.abs(diff) > 50) {
    // Minimum drag distance to trigger slide change
    if (diff > 0) {
      currentImg++;
      clearTimeout(timeout); // Swipe left
    } else {
      currentImg--;
      clearTimeout(timeout); // Swipe right
    }
    updateImg();
    isDragging = false;
  }
});

imgContainerEl.addEventListener("touchend", () => {
  isDragging = false;
});
