# On this page

- [Add class names and attributes](#add-class-names-and-attributes)
- [`<div>` element and data-binding](#div-element-and-data-binding)
- [Available CSS utility classes](#available-css-utility-classes)
- [Use with Tailwind CSS or other frameworks](#use-with-tailwind-css-or-other-frameworks)

# Add class names and attributes

Add class names and other attributes (such as IDs, WAI-ARIA tags, etc.) to any block-level element by putting them inside `[...]` and placing this at the very start of the element's syntax. IDs start with `#`, class names start with `.`, and other attributes can be added as-is, for example, `style="..."`.

Here's how you can add class names and attributes to all the elements that support it:

````text
# [#my-heading .anchored] Heading

[style="font-size: 17px;"]
Paragraph

- [.col-6 .xs:col-6 .list-inside]
- List item
- List item

0. [.col-6 .xs:col-6 .list-inside]
1. List item
2. List item

> [.text-accent #my-blockquote aria-label="..."]
> Blockquote

``` [.col-6 #my-code-block] python
def add(a, b):
  return a + b
```

[.col-6 .mt-3]
input* = TextInput(
  | question = What is your answer?
)
````

# `<div>` element and data-binding

Create wrapping `<div>` elements by putting content inside pairs of `:::`. The content inside can be any valid Markdown, such as headings, paragraphs, lists, form fields, etc. Class names and other attributes are supported via `[...]`. Moreover, you can bind one or more fields to a `<div>` element by adding the names of the fields inside `{$...$}` (separated by spaces), and placing this within the `[...]`. This means that whenever the value of a binded field changes, the content inside the `<div>` will be automatically re-rendered.

```text
price* = NumberInput(
  | question = Price | unitEnd = $ | subfield | min = 1
)

quantity* = NumberInput(
  | question = Quantity | subfield | min = 1
)

::: [.col-8 .text-end .xs:text-start {$ price quantity $}]
{% if price and quantity -%}
  Total: ${{ price }} × {{ quantity }} = ${{ price * quantity }}
{% else -%}
  Total: Set price and quantity
{% endif %}
:::
```

**Learn more:** [Data-binding, `<div>` and `<span>` elements](https://github.com/blocksmd/blocksmd/blob/main/docs/data-binding.md)

# Available CSS utility classes

The following CSS utility classes are included by default in **blocks.md**:

## Layout

The content in **blocks.md** uses a grid based, 12-column system. This means you can add a `.col-{value}` class to any block-level element to have it occupy only a portion of the full width of the row. These class names come in the following formats:

- `.col-{value}` (only for non-phone devices, `≥ 576px`)
- `.xs:col-{value}` (only for phones, `< 576px`)

The `{value}` can be any integer between `1` to `12` (included) or `auto`. So for example, `.col-4` would span 4 columns.

```text
[.col-4 .xs:col-6 style="border: 1px solid"]
price* = NumberInput(
  | question = Price | unitEnd = $ | subfield | min = 1
)

[.col-4 .xs:col-6 style="border: 1px solid"]
quantity* = NumberInput(
  | question = Quantity | subfield | min = 1
)
```

![Layout classes](https://res.cloudinary.com/dnriuttuy/image/upload/v1721303995/layout-1_t9x7tu.png)

You can also push and pull each column using the following classes:

- `.col-start-{value}`/`.xs:col-start-{value}` (sets `grid-column-start: {value}`)
- `.col-end-{value}`/`.xs:col-end-{value}` (sets `grid-column-end: {value}`)

Here, the `{value}` can be any integer between `1` to `13` (included) or `auto`.

```text
[.col-4 .xs:col-6 style="border: 1px solid"]
price* = NumberInput(
  | question = Price | unitEnd = $ | subfield | min = 1
)

[.col-4 .col-start-9 .xs:col-6 style="border: 1px solid"]
quantity* = NumberInput(
  | question = Quantity | subfield | min = 1
)
```

![Layout classes](https://res.cloudinary.com/dnriuttuy/image/upload/v1721304104/layout-2_ysjm3l.png)

`<div>` elements created using `:::` can also be given `.col-{value}` classes. Moreover, each `<div>` element is also a 12-column grid, so these classes can also be used on sub-elements within the `<div>`.

```text
::: [.col-9 style="border: 1px solid"]
[.col-6 style="border: 1px solid red"]
Paragraph

- [.col-6 style="border: 1px solid red"]
- Item
- Item
:::
```

![Layout classes](https://res.cloudinary.com/dnriuttuy/image/upload/v1721305236/layout-3_ognbco.png)

## Color

| Class            | Description                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| `.text-emphasis` | `color: var(--bmd-emphasis-color)` (`black` in light mode and `white` in dark mode by default) |
| `.text-accent`   | Sets `color` to `accent`                                                                       |

## Display (and flex)

| Class                     | Description                   |
| ------------------------- | ----------------------------- |
| `.d-inline-block`         | `display: inline-block`       |
| `.d-block`                | `display: block`              |
| `.d-inline-flex`          | `display: inline-flex`        |
| `.d-flex`                 | `display: flex`               |
| `.align-items-center`     | `align-items: center`         |
| `.justify-content-start`  | `justify-content: flex-start` |
| `.justify-content-center` | `justify-content: center`     |
| `.justify-content-end`    | `justify-content: flex-end`   |
| `.d-none`                 | `display: none`               |

## Heading

| Class       | Description                                        |
| ----------- | -------------------------------------------------- |
| `.h1`       | Match the appearance of `<h1>`                     |
| `.h2`       | Match the appearance of `<h2>`                     |
| `.h3`       | Match the appearance of `<h3>`                     |
| `.h4`       | Match the appearance of `<h4>`                     |
| `.h5`       | Match the appearance of `<h5>`                     |
| `.h6`       | Match the appearance of `<h6>`                     |
| `.anchored` | Adds an anchor link to the heading (`#` to itself) |

## Font size

| Class             | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `.fs-lead`        | `font-size: var(--bmd-font-size-lg)` (`18px` by default) |
| `.specific-fs-12` | `font-size: 12px`                                        |
| `.specific-fs-14` | `font-size: 14px`                                        |
| `.specific-fs-16` | `font-size: 16px`                                        |
| `.specific-fs-18` | `font-size: 18px`                                        |
| `.specific-fs-20` | `font-size: 20px`                                        |

## Font weight

| Class          | Description            |
| -------------- | ---------------------- |
| `.fw-lighter`  | `font-weight: lighter` |
| `.fw-light`    | `font-weight: 300`     |
| `.fw-normal`   | `font-weight: 400`     |
| `.fw-medium`   | `font-weight: 500`     |
| `.fw-semibold` | `font-weight: 600`     |
| `.fw-bold`     | `font-weight: 700`     |
| `.fw-bolder`   | `font-weight: bolder`  |

## Form

| Class               | Description                                      |
| ------------------- | ------------------------------------------------ |
| `.form-question`    | Match the appearance of a form field question    |
| `.form-description` | Match the appearance of a form field description |

## Light/dark mode

| Class      | Description                        |
| ---------- | ---------------------------------- |
| `.hide-lm` | `display: none` only in light mode |
| `.hide-dm` | `display: none` only in dark mode  |

## List

| Class            | Description                                         |
| ---------------- | --------------------------------------------------- |
| `.list-inside`   | `padding-left: 0` and `list-style-position: inside` |
| `.list-unstyled` | `padding-left: 0` and `list-style: none`            |

## LTR/RTL

| Class       | Description                 |
| ----------- | --------------------------- |
| `.hide-ltr` | `display: none` only in LTR |
| `.hide-rtl` | `display: none` only in RTL |

## Spacing

The class names for the `margin` and `padding` utilities come in the following formats: `.m{sides}-{size}` and `.p{sides}-{size}`.

### `{sides}`

| `{sides}`   | Description                                              |
| ----------- | -------------------------------------------------------- |
| `t`         | Sets `margin-top` or `padding-top`                       |
| `b`         | Sets `margin-bottom` or `padding-bottom`                 |
| `s` (start) | Sets `margin-left` or `padding-left` (inverted in RTL)   |
| `e` (end)   | Sets `margin-right` or `padding-right` (inverted in RTL) |

### `{size}`

| `{size}` | Description                                    |
| -------- | ---------------------------------------------- |
| `0`      | Sets `margin` or `padding` to `0`              |
| `1`      | Sets `margin` or `padding` to `4px`            |
| `2`      | Sets `margin` or `padding` to `8px`            |
| `3`      | Sets `margin` or `padding` to `16px`           |
| `auto`   | Sets `margin-left` or `margin-right` to `auto` |

## Text alignment

| Class             | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `.text-start`     | `text-align: left` (inverted in RTL)                 |
| `.text-center`    | `text-align: center`                                 |
| `.text-end`       | `text-align: right` (inverted in RTL)                |
| `.xs:text-start`  | `text-align: left` only on phones (inverted in RTL)  |
| `.xs:text-center` | `text-align: center` only on phones                  |
| `.xs:text-end`    | `text-align: right` only on phones (inverted in RTL) |

## Visibility

| Class        | Description          |
| ------------ | -------------------- |
| `.invisible` | `visibility: hidden` |

# Use with Tailwind CSS or other frameworks

**blocks.md** adds a `bmd-` prefix to all CSS classes. This prefix comes from the `#! css-prefix = bmd-` setting. You can see how all of the available utility classes discussed on this page have this prefix in [`blocksmd.css`](https://github.com/blocksmd/blocksmd/blob/main/dist/css/blocksmd.css). This makes sure that there are no collisions with other CSS frameworks that you may choose to use.

Therefore, if you want to use Tailwind CSS with your forms and pages, you would need to do the following:

- Set prefix to none (or whatever your Tailwind prefix is) by adding the `#! css-prefix = none` line.
- Include Tailwind CSS in your [`base.html`](https://github.com/blocksmd/blocksmd/blob/main/docs/how-to-use.md#base-template) when building the forms and pages.

After that, you can add Tailwind classes in `[...]` and everything should work as expected.
