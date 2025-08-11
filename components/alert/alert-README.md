# Alert Component

A reusable alert box used to communicate status messages such as upcoming payments, overdue notices, confirmations, or general information.

## Props (via HTML structure & classes)

| Name                                          | Type               | Description                                                              |
| --------------------------------------------- | ------------------ | ------------------------------------------------------------------------ |
| `alert--default` / `--success` / `--critical` | modifier class     | Controls styling for variant                                             |
| `alert__title`                                | text               | Required main message text                                               |
| `alert__description`                          | text               | Optional supporting text                                                 |
| `alert__icon`                                 | Font Awesome `<i>` | Optional left-side icon for visual context                               |
| `alert__close`                                | `<button>`         | Optional dismiss button. Must include `data-alert-close` for JS to work. |
| `data-alert`                                  | attribute          | Used by JS to find and remove alert on close                             |

## Variants

Apply one of the following modifier classes to `.alert`:

| Class             | Purpose                                        |
| ----------------- | ---------------------------------------------- |
| `alert--default`  | Neutral/informational alert                    |
| `alert--critical` | High-priority alert (errors, overdue payments) |
| `alert--success`  | Confirmation or success messages               |

## Structure

```html
<div class="alert alert--success" data-alert>
  <i class="alert__icon fa-solid fa-circle-check" aria-hidden="true"></i>
  <div class="alert__content">
    <div class="alert__title">Payment Received</div>
    <div class="alert__description">Your auto policy payment has been processed.</div>
  </div>
  <button class="alert__close" aria-label="Dismiss alert" data-alert-close>&times;</button>
</div>
```
