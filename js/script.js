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

  includeTargets.forEach(async (host) => {
    const name = host.getAttribute("data-include");
    const file = `/demo/partials/${name}.html`;

    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error(`Fetch failed: ${file}`);
      host.innerHTML = await res.text();

      // mark active for navs
      if (name === "nav") setActiveNav(host);

      // optional: announce loaded
      host.dispatchEvent(new CustomEvent("partial:loaded", { detail: { name } }));
    } catch (err) {
      host.innerHTML = `<div style="color:red;">Error loading ${name}</div>`;
      console.warn(err);
    }
  });

  function setActiveNav(container) {
    const want = (container.getAttribute("data-active") || "").trim().toLowerCase();
    const links = container.querySelectorAll(".navigation__item");

    // Clear any pre-baked markers
    links.forEach((a) => {
      a.classList.remove("navigation__item--active");
      a.removeAttribute("aria-current");
    });

    // Make aria-disabled links inert
    links.forEach((a) => {
      if (a.getAttribute("aria-disabled") === "true") {
        a.removeAttribute("href");
        a.setAttribute("tabindex", "-1");
      }
    });

    // No explicit target? leave all inactive
    if (!want) return;

    // Only match by data-route on the link
    const match = Array.from(links).find((a) => (a.dataset.route || "").toLowerCase() === want);

    if (match) {
      match.classList.add("navigation__item--active");
      match.setAttribute("aria-current", "page");
    }
  }
});

// Alert Close Button Functionality
document.querySelectorAll("[data-alert-close]").forEach((button) => {
  button.addEventListener("click", (event) => {
    const alert = event.target.closest("[data-alert]");
    if (alert) alert.remove();
  });
});
