// Prevent interaction with disabled items
document.querySelectorAll('.action-list-item[aria-disabled="true"]').forEach((item) => {
  item.addEventListener("click", (e) => e.preventDefault());
  item.addEventListener("keydown", (e) => e.preventDefault());
});

// Add keyboard click behavior for focusable items
document.querySelectorAll('.action-list-item[tabindex="0"]').forEach((item) => {
  item.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      item.click();
    }
  });
});

//Partials Include Script for DEMO ONLY
document.addEventListener("DOMContentLoaded", () => {
  const includeTargets = document.querySelectorAll("[data-include]");

  includeTargets.forEach((el) => {
    const name = el.getAttribute("data-include");
    const file = `/demo/partials/${name}.html`;

    fetch(file)
      .then((res) => {
        if (!res.ok) throw new Error(`Fetch failed: ${file}`);
        return res.text();
      })
      .then((html) => {
        el.innerHTML = html;
      })
      .catch((err) => {
        el.innerHTML = `<div style="color:red;">Error loading ${name}</div>`;
        console.warn(err);
      });
  });
});

// Alert Close Button Functionality
document.querySelectorAll("[data-alert-close]").forEach((button) => {
  button.addEventListener("click", (event) => {
    const alert = event.target.closest("[data-alert]");
    if (alert) alert.remove();
  });
});
