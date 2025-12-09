export const runViewTransition = async (
  name: string,
  disableAnimateOld = false,
  prepare?: (root: HTMLElement) => void
) => {
  if (typeof document === 'undefined' || !document.startViewTransition) {
    prepare?.(document.documentElement);
    return;
  }

  // Use container if provided, otherwise fallback to <html>
  const root = document.documentElement;

  // Inject <style> for this transition
  const style = document.createElement('style');
  style.dataset.vt = name;

  if (disableAnimateOld) {
    style.textContent = `
      :root::view-transition-old {
        animation: none !important;
        opacity: 1 !important;
      }
    `;
  }

  root.appendChild(style);

  // Start view transition
  const transition = document.startViewTransition(() => {
    prepare?.(root);
    root.setAttribute('data-vt', name);
  });

  try {
    await transition.finished;
  } finally {
    root.removeAttribute('data-vt');
    style.remove();
  }
};
