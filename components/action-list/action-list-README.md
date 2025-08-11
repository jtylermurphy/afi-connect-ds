# Action List

A vertical list of interactive items, typically used to present navigational actions or important options. Each item supports optional icons and chevrons, and can be styled for disabled states.

## Usage

Use `.action-list` as a container and `.action-list-item` for each row in the list. Items are focusable and styled for keyboard accessibility by default.

## Example

```html
<div class="action-list">
  <div class="action-list-item" role="button" tabindex="0">
    <i class="action-list-item__icon fa-solid fa-file-lines" aria-hidden="true"></i>
    <span class="action-list-item__label">Item Label</span>
    <i class="action-list-item__chevron fa-solid fa-chevron-right" aria-hidden="true"></i>
  </div>
</div>
```

## States

| State    | Class                         | Description                          |
| -------- | ----------------------------- | ------------------------------------ |
| Default  | `.action-list-item`           | Regular interactive item             |
| Disabled | `.action-list-item--disabled` | Visually muted and non-interactive   |
| Focus    | `:focus-visible`              | Shows outline on keyboard focus only |

## Classes

| Class Name                   | Description                                    |
| ---------------------------- | ---------------------------------------------- |
| `action-list`                | Parent container for all list items            |
| `action-list-item`           | One row in the list (must have `tabindex="0"`) |
| `action-list-item__icon`     | Optional left-side icon (e.g. Font Awesome)    |
| `action-list-item__label`    | Required main text label                       |
| `action-list-item__chevron`  | Optional right-facing icon for navigation hint |
| `action-list-item--disabled` | Applies disabled visual and behavior styling   |

## Accessibility

- Each item uses `role="button"` and `tabindex="0"` for keyboard interaction.
- Uses `:focus-visible` for clear tab-based focus styling.
- Disabled items use `aria-disabled="true"` and `tabindex="-1"` to skip focus.

## Notes

- Icons should have consistent width using `width` on `.action-list-item__icon`.
- Keyboard interaction (e.g., Enter or Space to "click") can be handled by devs.
