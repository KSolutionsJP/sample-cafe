// Café こもれび — sample site scripts

// ヘッダー：スクロールで背景を付ける
const header = document.getElementById('siteHeader');
const onScroll = () => header.classList.toggle('is-solid', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// モバイルメニュー
const navToggle = document.getElementById('navToggle');
const globalNav = document.getElementById('globalNav');
navToggle.addEventListener('click', () => {
  const open = globalNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', open);
  header.classList.add('is-solid');
});
globalNav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => globalNav.classList.remove('is-open'))
);

// スクロールでふわっと表示
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

// メニュータブ切り替え
const tabs = document.querySelectorAll('.menu-tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('is-active'));
    tab.classList.add('is-active');
    document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('is-active'));
    document.getElementById('panel-' + tab.dataset.tab).classList.add('is-active');
  });
});

// FAQアコーディオン
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  const panel = item.querySelector('.faq-a');
  btn.addEventListener('click', () => {
    const open = item.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open);
    panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0px';
  });
});

// 予約フォーム（デモ）：入力チェックと完了表示
const form = document.getElementById('reserveForm');
const formError = document.getElementById('formError');
const formSuccess = document.getElementById('formSuccess');
form.addEventListener('submit', e => {
  e.preventDefault();
  const missing = [...form.querySelectorAll('[required]')].some(el => !el.value.trim());
  if (missing) {
    formError.hidden = false;
    formSuccess.hidden = true;
    return;
  }
  formError.hidden = true;
  formSuccess.hidden = false;
  formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
  form.reset();
});
