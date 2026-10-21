import { profile } from '../data/portfolio';

const byId = <T extends HTMLElement>(id: string) => document.getElementById(id) as T | null;
const dialogTriggers = new WeakMap<HTMLDialogElement, HTMLElement>();
const openDialog = (dialog: HTMLDialogElement | null) => {
  if (!dialog || dialog.open) return;
  let trigger = document.activeElement as HTMLElement | null;
  if (trigger?.closest('dialog')) {
    trigger = document.querySelector<HTMLElement>('.command-trigger');
    if (!trigger?.getClientRects().length) trigger = document.querySelector<HTMLElement>('.menu-trigger');
  }
  if (trigger) dialogTriggers.set(dialog, trigger);
  document.querySelectorAll<HTMLDialogElement>('dialog[open]').forEach(other => other.close());
  dialog.showModal();
};

document.querySelectorAll<HTMLButtonElement>('[data-close-dialog]').forEach(button => {
  button.addEventListener('click', () => button.closest('dialog')?.close());
});
document.querySelectorAll<HTMLDialogElement>('dialog').forEach(dialog => {
  dialog.addEventListener('close', () => {
    queueMicrotask(() => {
      if (!document.querySelector('dialog[open]')) {
        const trigger = dialogTriggers.get(dialog);
        if (trigger?.isConnected && trigger.getClientRects().length) trigger.focus({ preventScroll: true });
      }
    });
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
});
document.querySelector('.menu-trigger')?.addEventListener('click', () => openDialog(byId<HTMLDialogElement>('mobile-menu')));
byId('mobile-menu')?.querySelectorAll<HTMLAnchorElement>('nav a').forEach(link => link.addEventListener('click', () => byId<HTMLDialogElement>('mobile-menu')?.close()));
document.querySelectorAll<HTMLButtonElement>('[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    const id = button.dataset.project;
    if (id) openDialog(byId<HTMLDialogElement>(`case-${id}`));
  });
});

// Native buttons remain keyboard accessible; filtering preserves the curated order.
const filterButtons = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
const cards = document.querySelectorAll<HTMLElement>('.project-card');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => {
      const selected = item === button;
      item.classList.toggle('selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    let count = 0;
    cards.forEach(card => {
      const shown = filter === 'Todos' || card.dataset.category === filter;
      card.hidden = !shown;
      if (shown) count++;
    });
    const counter = byId('project-count');
    if (counter) counter.textContent = String(count).padStart(2, '0');
  });
});

const navLinks = document.querySelectorAll<HTMLAnchorElement>('[data-nav]');
const sections = [...document.querySelectorAll<HTMLElement>('main > section[id]')];
let scrollPending = false;
function updateScroll() {
  const threshold = window.innerHeight * 0.32;
  let active = sections[0]?.id;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= threshold) active = section.id;
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20) active = 'contacto';
  navLinks.forEach(link => {
    const selected = link.dataset.nav === active;
    link.classList.toggle('active', selected);
    if (selected) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  const progress = document.querySelector<HTMLElement>('.reading-progress');
  const height = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = `${height > 0 ? Math.min(100, window.scrollY / height * 100) : 0}%`;
  scrollPending = false;
}
window.addEventListener('scroll', () => {
  if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateScroll); }
}, { passive: true });
window.addEventListener('resize', updateScroll);
updateScroll();

const clock = byId<HTMLTimeElement>('local-time');
function updateTime() {
  if (!clock) return;
  const now = new Date();
  clock.textContent = new Intl.DateTimeFormat('es-CL', { timeZone: 'America/Santiago', hour: '2-digit', minute: '2-digit', hour12: false }).format(now);
  clock.dateTime = now.toISOString();
}
updateTime();
setInterval(updateTime, 60000);

byId<HTMLButtonElement>('copy-email')?.addEventListener('click', async () => {
  const status = byId('copy-status');
  try {
    await navigator.clipboard.writeText(profile.email);
    if (status) status.textContent = 'Correo copiado. ¡Hablemos pronto!';
  } catch {
    if (status) status.textContent = `Puedes copiarlo directamente: ${profile.email}`;
  }
});
byId<HTMLButtonElement>('easter-trigger')?.addEventListener('click', event => {
  const button = event.currentTarget as HTMLButtonElement;
  const note = byId('easter-note');
  if (!note) return;
  note.hidden = !note.hidden;
  button.setAttribute('aria-expanded', String(!note.hidden));
});

const commandDialog = byId<HTMLDialogElement>('command-dialog');
const commandSearch = byId<HTMLInputElement>('command-search');
const commandItems = [...document.querySelectorAll<HTMLElement>('[data-command-item]')];
let commandIndex = -1;
const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es');
const visibleCommandItems = () => commandItems.filter(item => !item.hidden);
function highlightCommand(index: number) {
  const visible = visibleCommandItems();
  commandIndex = visible.length ? (index + visible.length) % visible.length : -1;
  commandItems.forEach(item => item.classList.remove('command-active'));
  const selected = visible[commandIndex];
  selected?.classList.add('command-active');
  selected?.scrollIntoView({ block: 'nearest' });
}
function showCommands() {
  if (!commandDialog || !commandSearch) return;
  commandSearch.value = '';
  commandItems.forEach(item => { item.hidden = false; item.classList.remove('command-active'); });
  const empty = document.querySelector<HTMLElement>('.command-empty');
  if (empty) empty.hidden = true;
  commandIndex = -1;
  openDialog(commandDialog);
  commandSearch.focus();
}
document.querySelector('.command-trigger')?.addEventListener('click', showCommands);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    const activeDialog = document.querySelector<HTMLDialogElement>('dialog[open]');
    if (activeDialog) {
      event.preventDefault();
      activeDialog.close();
    }
  }
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    if (commandDialog?.open) commandDialog.close();
    else showCommands();
  }
});
commandSearch?.addEventListener('input', () => {
  const query = normalize(commandSearch.value.trim());
  const matches = commandItems.filter(item => normalize(`${item.textContent || ''} ${item.dataset.search || ''}`).includes(query));
  const exactWordMatches = query && !query.includes(' ')
    ? matches.filter(item => normalize(`${item.textContent || ''} ${item.dataset.search || ''}`).split(/[^a-z0-9]+/).includes(query))
    : [];
  const results = exactWordMatches.length ? exactWordMatches : matches;
  commandItems.forEach(item => {
    item.hidden = !results.includes(item);
  });
  const visible = visibleCommandItems();
  const empty = document.querySelector<HTMLElement>('.command-empty');
  if (empty) empty.hidden = visible.length > 0;
  highlightCommand(0);
});
commandSearch?.addEventListener('keydown', event => {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    highlightCommand(commandIndex + (event.key === 'ArrowDown' ? 1 : -1));
  }
  if (event.key === 'Enter') {
    event.preventDefault();
    const item = visibleCommandItems()[commandIndex < 0 ? 0 : commandIndex];
    item?.click();
  }
});
commandItems.forEach(item => {
  if (item.tagName === 'A') item.addEventListener('click', () => commandDialog?.close());
});
