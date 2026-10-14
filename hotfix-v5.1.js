/* Adel v5.1 hotfix: modales, recherche, ajout et conflit bouton Netlify */
(() => {
  'use strict';

  const byId = (id) => document.getElementById(id);

  // 1. Le bouton X ne doit pas dependre de la creation implicite d'une variable globale par son id.
  const closeButton = byId('close');
  if (closeButton) {
    closeButton.type = 'button';
    closeButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (typeof hide === 'function') hide();
      else byId('modal')?.classList.remove('on');
    });
  }

  // Fermeture clavier coherente pour toutes les modales.
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && byId('modal')?.classList.contains('on')) {
      event.preventDefault();
      if (typeof hide === 'function') hide();
      else byId('modal')?.classList.remove('on');
    }
  });

  // 2. Netlify place son indicateur en bas a droite. Le bouton Ajouter passe en bas a gauche.
  const addButton = byId('add');
  if (addButton) {
    addButton.style.left = 'max(20px, env(safe-area-inset-left))';
    addButton.style.right = 'auto';
    addButton.style.bottom = 'max(20px, env(safe-area-inset-bottom))';
    addButton.style.zIndex = '40';
  }

  // 3. Le rendu de la recherche recree le champ. On restaure immediatement focus et curseur.
  document.addEventListener('input', (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || input.placeholder !== '🔍 Rechercher…') return;
    const cursor = input.selectionStart ?? input.value.length;
    requestAnimationFrame(() => {
      const replacement = [...document.querySelectorAll('input')]
        .find((node) => node.placeholder === '🔍 Rechercher…');
      if (!replacement) return;
      replacement.focus({ preventScroll: true });
      const safeCursor = Math.min(cursor, replacement.value.length);
      replacement.setSelectionRange(safeCursor, safeCursor);
    });
  }, true);

  // 4. Dans la V5, le nom de fonction "form" entre en collision avec id="form".
  // Ce gestionnaire capture donc directement la validation du formulaire article.
  document.addEventListener('submit', (event) => {
    const formElement = event.target;
    if (!(formElement instanceof HTMLFormElement) || formElement.id !== 'form') return;

    event.preventDefault();
    event.stopImmediatePropagation();

    const data = Object.fromEntries(new FormData(formElement));
    ['qty', 'unit', 'got', 'paid'].forEach((key) => {
      data[key] = Number(data[key]) || 0;
    });
    data.qty = Math.max(1, data.qty);
    data.got = Math.max(0, Math.min(data.qty, data.got));

    const existing = data.id ? state.items.find((item) => item.id === data.id) : null;
    if (existing) {
      Object.assign(existing, data, {
        priority: existing.priority || 'normal',
        acq: existing.acq || 'new'
      });
    } else {
      delete data.id;
      data.id = globalThis.crypto?.randomUUID?.() || `custom-${Date.now()}`;
      data.priority = data.priority || 'normal';
      data.acq = data.acq || 'new';
      data.notes = data.notes || '';
      state.items.unshift(data);
    }

    if (typeof hide === 'function') hide();
    if (typeof save === 'function') save();
  }, true);

  // Les boutons qui ne valident pas le formulaire doivent toujours avoir type=button.
  document.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.id === 'close' || button.id === 'del') button.type = 'button';
  }, true);
})();
