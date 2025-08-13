(function () {
  function initSubnav(root = document) {
    root.querySelectorAll("[data-subnav]").forEach((nav) => {
      const path = location.pathname.replace(/\/+$/, "");
      nav.querySelectorAll(".subnav__link").forEach((a) => {
        const href = (a.getAttribute("href") || "").replace(/\/+$/, "");
        if (!a.hasAttribute("aria-current") && href && href === path) {
          a.setAttribute("aria-current", "page");
        }
      });
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSubnav);
  } else {
    initSubnav();
  }
})();
