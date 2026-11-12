/* Local marketing-page interactions. No account or database connection is needed. */
const trailer = document.querySelector('.trailer-video');
const trailerPlay = document.querySelector('.trailer-play');
const trailerStatus = document.querySelector('.trailer-status');
trailer.muted = true;
trailer.play().catch(() => { trailerPlay.hidden = false; });
trailer.addEventListener('playing', () => { trailerPlay.hidden = true; });
trailerPlay.addEventListener('click', async () => {
  trailerStatus.hidden = true;
  trailerPlay.hidden = true;
  if (trailer.error) trailer.load();
  trailer.controls = true;
  trailer.focus();
  try {
    await trailer.play();
  } catch {
    trailer.controls = false;
    trailerPlay.hidden = false;
    trailerStatus.textContent = 'The trailer couldn’t play. Try again or use Open video below.';
    trailerStatus.hidden = false;
    trailerPlay.focus();
  }
});

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
function closeMenu() {
  navigation.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.querySelector('use').setAttribute('href', '#icon-menu');
}
menuToggle.hidden = false;
menuToggle.addEventListener('click', () => {
  const open = navigation.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.querySelector('use').setAttribute('href', open ? '#icon-close' : '#icon-menu');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) { closeMenu(); menuToggle.focus(); }
});
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
window.matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);

const tabs = Array.from(document.querySelectorAll('.department-tab'));
function selectDepartment(tab) {
  tabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    const panel = document.getElementById(item.getAttribute('aria-controls'));
    const wasHidden = panel.hidden;
    panel.hidden = !selected;
    panel.classList.toggle('is-entering', selected && wasHidden);
  });
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectDepartment(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault(); selectDepartment(tabs[next]); tabs[next].focus();
  });
});

const screenshotDialog = document.querySelector('#screenshot-dialog');
const dialogImage = document.querySelector('#dialog-image');
const dialogCaption = document.querySelector('#dialog-caption');
const dialogStage = document.querySelector('.dialog-stage');
const imageStatus = document.querySelector('#image-status');
const imageRetry = document.querySelector('#image-retry');
let activeScreenshot;
let imageRequest = 0;

async function loadScreenshot(button) {
  const request = ++imageRequest;
  dialogStage.setAttribute('aria-busy', 'true');
  dialogImage.hidden = true;
  dialogImage.classList.remove('is-entering');
  imageRetry.hidden = true;
  imageStatus.textContent = 'Loading screenshot…';
  imageStatus.hidden = false;
  dialogCaption.textContent = button.dataset.caption;
  try {
    const image = new Image();
    image.src = button.dataset.lightbox;
    await image.decode();
    if (request !== imageRequest || !screenshotDialog.open) return;
    dialogImage.src = image.src;
    dialogImage.alt = button.querySelector('img').alt;
    dialogImage.hidden = false;
    dialogImage.classList.add('is-entering');
    imageStatus.hidden = true;
  } catch {
    if (request !== imageRequest || !screenshotDialog.open) return;
    imageStatus.textContent = 'This screenshot couldn’t load. Please try again.';
    imageRetry.hidden = false;
  } finally {
    if (request === imageRequest) dialogStage.setAttribute('aria-busy', 'false');
  }
}
document.querySelectorAll('[data-lightbox]').forEach(button => {
  button.addEventListener('click', () => {
    activeScreenshot = button;
    screenshotDialog.showModal();
    document.body.classList.add('dialog-open');
    loadScreenshot(button);
  });
});
imageRetry.addEventListener('click', () => {
  document.querySelector('.dialog-close').focus();
  loadScreenshot(activeScreenshot);
});
document.querySelector('.dialog-close').addEventListener('click', () => screenshotDialog.close());
screenshotDialog.addEventListener('click', event => {
  if (event.target !== screenshotDialog) return;
  const rect = screenshotDialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) screenshotDialog.close();
});
screenshotDialog.addEventListener('close', () => {
  imageRequest += 1;
  dialogStage.setAttribute('aria-busy', 'false');
  document.body.classList.remove('dialog-open');
});
