/* Shared dialog and keyboard behavior. */
window.ProjectUI = (() => {
  let activeDialog = null;
  let opener = null;
  let previousOverflow = '';
  const inertStates = new Map();
  const focusables = 'button, a[href], [tabindex="0"], input, select, textarea';

  function open(dialog) {
    if (activeDialog === dialog) return;
    if (activeDialog) close(activeDialog);
    opener = document.activeElement;
    previousOverflow = document.body.style.overflow;
    activeDialog = dialog;
    dialog.inert = false;
    dialog.setAttribute('aria-hidden', 'false');
    dialog.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    for (const element of document.body.children) {
      if (element === dialog || element.tagName === 'SCRIPT') continue;
      inertStates.set(element, element.inert);
      element.inert = true;
    }
    requestAnimationFrame(() => {
      if (activeDialog === dialog) dialog.querySelector('button')?.focus({ preventScroll: true });
    });
  }

  function close(dialog) {
    if (activeDialog !== dialog) return;
    dialog.classList.remove('is-open');
    for (const [element, wasInert] of inertStates) element.inert = wasInert;
    inertStates.clear();
    document.body.style.overflow = previousOverflow;
    activeDialog = null;
    if (opener?.isConnected) opener.focus({ preventScroll: true });
    dialog.inert = true;
    dialog.setAttribute('aria-hidden', 'true');
  }

  document.addEventListener('keydown', event => {
    if (!activeDialog || event.key !== 'Tab') return;
    const items = [...activeDialog.querySelectorAll(focusables)]
      .filter(element => !element.disabled && element.getClientRects().length);
    const first = items[0];
    const last = items[items.length - 1];
    if (!activeDialog.contains(document.activeElement)) {
      event.preventDefault();
      first?.focus();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });

  function makeButton(element, label, activate) {
    element.setAttribute('role', 'button');
    element.tabIndex = 0;
    element.setAttribute('aria-label', label);
    element.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      activate();
    });
  }

  return { open, close, makeButton };
})();
