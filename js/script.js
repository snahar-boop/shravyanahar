function openLightbox(el) {
  const full = el.getAttribute('data-full');
  document.getElementById('lightbox-img').src = full;
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// build sprocket holes (kept in JS so the count can flex with screen width later if needed)
function buildSprockets(id, count) {
  const row = document.getElementById(id);
  if (!row) return;
  let html = '';
  for (let i = 0; i < count; i++) html += '<div class="sprocket"></div>';
  row.innerHTML = html;
}
buildSprockets('sprockets-top', 220);
buildSprockets('sprockets-bottom', 220);

// film strip drag-to-scroll
const strip = document.getElementById('strip');
let isDown = false, startX, scrollLeft;
strip.addEventListener('mousedown', (e) => {
  isDown = true;
  strip.classList.add('dragging');
  startX = e.pageX - strip.offsetLeft;
  scrollLeft = strip.scrollLeft;
});
strip.addEventListener('mouseleave', () => { isDown = false; strip.classList.remove('dragging'); });
strip.addEventListener('mouseup', () => { isDown = false; strip.classList.remove('dragging'); });
strip.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - strip.offsetLeft;
  strip.scrollLeft = scrollLeft - (x - startX) * 1.4;
});
