(function () {
  const MOBILE_MQ = "(max-width: 767px)";

  /* -- Mobile panel anchor: keep the panel flush under the header -- */
  function setHeaderBottomVar() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const rect = header.getBoundingClientRect();
    const bottom = Math.max(rect.bottom, 0);
    document.documentElement.style.setProperty("--header-bottom", bottom + "px");
  }
  function setupHeaderObserver() {
    setHeaderBottomVar();
    const header = document.querySelector(".site-header");
    if (header && "ResizeObserver" in window) {
      new ResizeObserver(setHeaderBottomVar).observe(header);
    }
    window.addEventListener("resize", setHeaderBottomVar, { passive: true });
    window.addEventListener(
      "scroll",
      () => {
        if (window.matchMedia(MOBILE_MQ).matches) setHeaderBottomVar();
      },
      { passive: true }
    );
  }

  /* -- Core dropdown logic (desktop + mobile panel) -- */
  function initMenu(root) {
    if (!root || root.dataset.bound === "true") return;
    const trigger = root.querySelector(".menu__trigger");
    const panel = root.querySelector(".menu__panel");
    if (!trigger || !panel) return;

    if (!panel.id) panel.id = "menu-panel-" + Math.random().toString(36).slice(2);
    trigger.setAttribute("aria-controls", panel.id);

    const trapFocus = root.dataset.trap === "true";
    let items = [];
    let currentIndex = 0;

    function collectItems() {
      items = Array.from(panel.querySelectorAll(".menu__item"));
    }
    function setRoving(index) {
      currentIndex = Math.max(0, Math.min(index, items.length - 1));
      items.forEach((el, i) => (el.tabIndex = i === currentIndex ? 0 : -1));
    }
    function focusItem(i) {
      if (!items.length) return;
      setRoving((i + items.length) % items.length);
      items[currentIndex].focus();
    }

    function open() {
      // Close other open menus
      document.querySelectorAll('[data-menu][data-open="true"]').forEach((other) => {
        if (other !== root && other.menu) other.menu.close();
      });

      panel.hidden = false;
      root.dataset.open = "true";
      trigger.setAttribute("aria-expanded", "true");

      collectItems();
      setRoving(0);
      if (items[0]) items[0].focus();

      document.addEventListener("click", onDocClick, true);
      document.addEventListener("keydown", onDocKey, true);

      // ensure mobile anchor var is fresh
      setHeaderBottomVar && setHeaderBottomVar();
    }

    function close() {
      if (panel.hidden) return;
      panel.hidden = true;
      root.dataset.open = "false";
      trigger.setAttribute("aria-expanded", "false");

      document.removeEventListener("click", onDocClick, true);
      document.removeEventListener("keydown", onDocKey, true);

      trigger.focus();
    }

    function onDocClick(e) {
      if (panel.contains(e.target) || trigger.contains(e.target)) return;
      close();
    }

    function onDocKey(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    }

    // ⬇️ Keyboard nav inside the menu
    function onMenuKey(e) {
      if (!items.length) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          focusItem(currentIndex + 1);
          break;
        case "ArrowUp":
          e.preventDefault();
          focusItem(currentIndex - 1);
          break;
        case "Home":
          e.preventDefault();
          focusItem(0);
          break;
        case "End":
          e.preventDefault();
          focusItem(items.length - 1);
          break;
        case "Tab":
          if (!trapFocus) return; // allow normal tabbing out
          e.preventDefault();
          if (e.shiftKey) focusItem(currentIndex - 1);
          else focusItem(currentIndex + 1);
          break;
        default:
          // type-ahead (optional): jump to first item starting with typed char
          if (e.key.length === 1 && /\S/.test(e.key)) {
            const ch = e.key.toLowerCase();
            const start = (currentIndex + 1) % items.length;
            const idx = items.findIndex((el, i) => {
              const j = (start + i) % items.length;
              return (items[j].innerText || "").trim().toLowerCase().startsWith(ch);
            });
            if (idx !== -1) focusItem((start + idx) % items.length);
          }
      }
    }

    // Activate item then close
    panel.addEventListener("click", (e) => {
      const item = e.target.closest(".menu__item");
      if (!item) return;
      const action = item.dataset.action;
      if (action) root.dispatchEvent(new CustomEvent("menu:action", { detail: { action, item } }));
      close();
    });

    panel.addEventListener("keydown", onMenuKey);

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      panel.hidden ? open() : close();
    });

    window.addEventListener("resize", () => {
      if (root.dataset.open === "true") close();
    });

    root.dataset.bound = "true";
    root.menu = { open, close };
  }

  function initAll(scope = document) {
    scope.querySelectorAll("[data-menu]").forEach(initMenu);
  }

  // Boot
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      setupHeaderObserver();
      initAll();
    });
  } else {
    setupHeaderObserver();
    initAll();
  }

  // Late-inserted includes
  new MutationObserver((muts) => {
    muts.forEach((m) =>
      m.addedNodes.forEach((n) => {
        if (n.nodeType === 1) {
          setupHeaderObserver();
          initAll(n);
        }
      })
    );
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
