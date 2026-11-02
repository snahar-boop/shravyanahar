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

// nav: highlight the section currently in view (top bar + side rail)
(function () {
  const ids = ['home','about','experience','projects','education','skills','beyond','lens','contact'];
  const sections = ids.map(id => document.getElementById(id)).filter(Boolean);
  const links = document.querySelectorAll('[data-nav]');
  let current = null, ticking = false;
  function update() {
    ticking = false;
    const line = window.innerHeight * 0.4;
    let active = sections[0].id;
    sections.forEach(sec => { if (sec.getBoundingClientRect().top <= line) active = sec.id; });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) active = 'contact';
    if (active === current) return;
    current = active;
    links.forEach(a => {
      const on = a.dataset.nav === active;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      if (on && a.closest('.topnav-pill')) {
        const pill = a.closest('.topnav-pill');
        pill.scrollTo({ left: a.offsetLeft - pill.clientWidth / 2 + a.clientWidth / 2, behavior: 'smooth' });
      }
    });
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();

// experience: filter pills
(function () {
  const pills = document.querySelectorAll('[data-job-filter]');
  const jobs = document.querySelectorAll('.job');
  pills.forEach(p => p.addEventListener('click', () => {
    const f = p.dataset.jobFilter;
    pills.forEach(x => x.setAttribute('aria-pressed', x === p ? 'true' : 'false'));
    jobs.forEach(j => { j.hidden = !(f === 'all' || j.dataset.job === f); });
  }));
})();

// experience: typing prompt bars
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.job-prompt').forEach(box => {
    const phrases = (box.dataset.phrases || '').split('|').filter(Boolean);
    const out = box.querySelector('.job-prompt-text');
    if (!phrases.length) return;
    out.textContent = phrases[0];
    if (reduce) return;
    let i = 0, running = false, timer = null;
    const wait = ms => new Promise(r => { timer = setTimeout(r, ms); });
    async function loop() {
      if (running) return; running = true;
      while (running) {
        const text = phrases[i % phrases.length];
        for (let c = 0; c <= text.length && running; c++) { out.textContent = text.slice(0, c); await wait(38); }
        await wait(1600);
        for (let c = text.length; c >= 0 && running; c--) { out.textContent = text.slice(0, c); await wait(16); }
        await wait(300);
        i++;
      }
    }
    new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) loop(); else { running = false; clearTimeout(timer); }
    }), { threshold: 0.2 }).observe(box);
  });
})();


// work slideshows
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-slides]').forEach(box => {
    const slides = Array.from(box.querySelectorAll('.slide'));
    const ui = box.querySelector('.slides-ui');
    if (slides.length < 2) return;
    ui.hidden = false;
    const dots = box.querySelector('.slides-dots');
    slides.forEach(() => dots.appendChild(document.createElement('i')));
    let i = 0, timer = null;
    function show(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle('is-on', k === i));
      Array.from(dots.children).forEach((d, k) => d.classList.toggle('on', k === i));
    }
    function start() { if (!reduce) { stop(); timer = setInterval(() => show(i + 1), 4500); } }
    function stop() { clearInterval(timer); }
    box.querySelector('.slides-prev').addEventListener('click', () => { show(i - 1); start(); });
    box.querySelector('.slides-next').addEventListener('click', () => { show(i + 1); start(); });
    box.addEventListener('mouseenter', stop); box.addEventListener('mouseleave', start);
    show(0); start();
  });
})();

// video facade: load the YouTube clip only when asked
(function () {
  document.querySelectorAll('.video-facade').forEach(btn => {
    btn.addEventListener('click', () => {
      const f = document.createElement('iframe');
      f.src = btn.dataset.embed;
      f.title = 'Video clip';
      f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      f.referrerPolicy = 'strict-origin-when-cross-origin';
      f.className = 'video-frame';
      btn.replaceWith(f);
    });
  });
})();
