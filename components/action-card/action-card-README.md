# Action Card

The **Action Card** component is used to display a clickable, icon-based action in a dashboard or quick links area. Typically used in a grid format on desktop, each card contains an icon and a short label describing the action.

---

## HTML

```html
<a href="#" class="action-card">
  <div class="action-card__icon">
    <i class="fa-sharp fa-regular fa-file-lines"></i>
  </div>
  <div class="action-card__label">View Policies</div>
</a>
```

---

## CSS

```css
.action-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #fff;
  border: 1px solid #dcdcdc;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  color: inherit;
  text-decoration: none;
  transition: box-shadow 0.2s ease-in-out;
}

.action-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.action-card__icon {
  background-color: #aeb4bd;
  color: #fff;
  width: 48px;
  height: 48px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.action-card__label {
  font-weight: 600;
}
```

---

## Accessibility

- The card is rendered as a link (`<a>`), so it is keyboard accessible by default.
- Ensure `aria-label` or descriptive text is included for screen readers if the label alone is ambiguous.

---

## Responsive Usage

- Designed to be used in a grid layout.
- Typically placed inside a grid container like this:

```css
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
```
