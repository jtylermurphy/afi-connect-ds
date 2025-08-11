document.querySelectorAll('[data-alert-close]').forEach(button => {
  button.addEventListener('click', event => {
    const alert = event.target.closest('[data-alert]');
    if (alert) alert.remove();
  });
});
