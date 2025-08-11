# Navigation

The `navigation` component is a responsive, accessible navigation menu designed for both mobile and desktop layouts. It provides clear active and disabled states, is keyboard-focusable, and adjusts layout depending on screen size.

---

## ✅ Features

- **Mobile-first bottom navigation bar** (like a native mobile app)
- **Sidebar-style navigation on desktop**
- **Accessible by keyboard and screen readers**
- Active and disabled item states
- Consistent icon alignment across breakpoints
- Adjustable via utility classes for demo or previewing layout states

---

## 📦 Markup

Each item is structured using `<li>` inside a `<ul>` list, with consistent icon-label pairs:

```html
<nav class="navigation">
  <ul class="navigation__list">
    <li>
      <a href="#" class="navigation__item" aria-label="Dashboard">
        <i class="fa-regular fa-house"></i>
        <span class="navigation__label">Home</span>
      </a>
    </li>
    <li>
      <a href="#" class="navigation__item navigation__item--disabled" aria-disabled="true">
        <i class="fa-regular fa-lock"></i>
        <span class="navigation__label">Disabled</span>
      </a>
    </li>
    <!-- more items -->
  </ul>
</nav>
```

---

## 🎨 States & Modifiers

| Class                        | Description                                |
| ---------------------------- | ------------------------------------------ |
| `navigation__item--active`   | Highlights the current active page         |
| `navigation__item--disabled` | Visually disables and prevents interaction |

---

## 🎯 Accessibility

- All links are focusable and keyboard-navigable.
- Uses `:focus-visible` for visible keyboard outlines.
- Adds `aria-disabled="true"` to disabled links.
- Suggested: use `aria-current="page"` on active link for screen readers.

---

## 🖥 Responsive Behavior

| Breakpoint          | Behavior                              |
| ------------------- | ------------------------------------- |
| `< 768px` (Mobile)  | Bottom nav, icons and labels stacked  |
| `≥ 768px` (Desktop) | Sidebar layout, icons + labels inline |

Use utility classes to force styles for demo:

```html
<!-- Force mobile nav in demo -->
<div class="demo-mobile-nav">
  <!-- nav goes here -->
</div>

<!-- Force desktop nav in demo -->
<div class="demo-desktop-nav">
  <!-- nav goes here -->
</div>
```

---

## 📝 Notes

- Icons are aligned using fixed width to avoid label misalignment.
- Add spacing and padding as needed inside `.navigation__item` only.
- Do **not** tie any styles to Font Awesome-specific class names like `fa-sharp`; use your own component class names (`navigation__item`, `navigation__label`, etc.) to retain flexibility.
