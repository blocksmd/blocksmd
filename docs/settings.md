# On this page

- [Customize colors, branding, and much more with settings](#customize-colors-branding-and-much-more-with-settings)
  - [Different values for light mode and dark mode](#different-values-for-light-mode-and-dark-mode)
- [Available settings](#available-settings)
  - [Colors](#colors)
  - [Other settings](#other-settings)

# Customize colors, branding, and much more with settings

A setting is a line in the format `#! {name} = {value}` added anywhere (but usually at the very start). Settings can be used change things like the `color`, `background-color`, `accent`, etc. You can also add branding, call to action (CTA), change page layout and alignment, and so much more. Go through the [full list of settings](#available-settings) to see everything that's available. Here's a quick example of using some settings to customize a page:

```text
#! accent = #333333 || #dfdfdf
#! accent-foreground = #dfdfdf || #333333
#! background-color = rgb(255, 255, 255) || rgb(18, 18, 18)
#! brand = ![Logo](https://res.cloudinary.com/dnriuttuy/image/upload/v1721059180/logo-lm.svg) || ![Logo](https://res.cloudinary.com/dnriuttuy/image/upload/v1721059180/logo-dm.svg)
#! color = #333333 || #dfdfdf
#! cta = [Sign up](https://example.com)
#! page-progress = hide
#! rounded = none
#! vertical-padding = calculated

plant* = PictureChoice(
  | question = What type of plant would you like?
  | choices =
    House plants && https://res.cloudinary.com/dnriuttuy/image/upload/v1721060655/hplants.jpg,
    Office plants && https://res.cloudinary.com/dnriuttuy/image/upload/v1721060651/oplants.jpg
)
```

![Settings](https://res.cloudinary.com/dnriuttuy/image/upload/v1721838126/settings-1_ha9izf.png)

## Different values for light mode and dark mode

You may have noticed in the example above that some settings (like the colors and brand) can accept up to two values in the format `#! {name} = {value1} || {value2}`. The first value is used for the initial color scheme (which is light by default), and the second value is used for the alternate or dark color scheme. If you change the default color scheme to dark by setting `#! color-scheme = dark`, then the first value would be used in dark mode, and the second value would be used in light mode. Take this example:

```text
#! background-color = rgb(255, 255, 255) || rgb(18, 18, 18)
#! color = #333333 || #dfdfdf

...
```

This means that the `background-color` is set to `rgb(255, 255, 255)` in light mode and `rgb(18, 18, 18)` in dark mode. The text `color` on the other hand is set to `#333333` in light mode and `#dfdfdf` in dark mode. All the settings where you may require different values for the different color schemes (light and dark) support two values.

# Available settings

The following settings are available:

## Colors

> [!NOTE]
> All colors support up to two values. However, if you set only one value, that value will only be used in the default color scheme. For example, `#! background-color = aliceblue` would set the `background-color` to a very pale blue only in light mode. In dark mode, the default `background-color` would be used, because a pale blue background does not exactly make sense here. Please keep this in mind if you turn on color scheme toggle via `#! color-scheme-toggle = show`. All other settings that support two values will use a given single value in both color schemes, however, you can obviously define two different values by separating them with a `||` (as seen above with `#! brand = {value1} || {value2}`).

### `accent`

The primary color used on buttons, form fields, etc.

- **Accepted value**: Any valid color (HTML name, hex code, or RGB)
- **Example(s)**: `#! accent = blue`, `#! accent = #00008b || rgb(173, 216, 230)`
- ✅ Supports up to two values, example: `#! accent = DeepPink || LightPink`

### `accent-foreground`

The text color used on `accent` background, for example, the text on buttons.

- **Accepted value**: Any valid color (HTML name, hex code, or RGB)
- **Example(s)**: `#! accent-foreground = #fff`, `#! accent-foreground = #fff || rgb(0, 0, 0)`
- ✅ Supports up to two values, example: `#! accent-foreground = white || black`

### `background-color`

The `background-color` of the page.

- **Accepted value**: Any valid color (HTML name, hex code, or RGB)
- **Example(s)**: `#! background-color = #fff`, `#! background-color = #fff || rgb(0, 0, 0)`
- ✅ Supports up to two values, example: `#! background-color = AliceBlue || DarkBlue`

### `color`

The `color` of the text on the page.

- **Accepted value**: Any valid color (HTML name, hex code, or RGB)
- **Example(s)**: `#! color = #000`, `#! color = #000 || #fff`
- ✅ Supports up to two values, example: `#! color = DarkBlue || AliceBlue`

## Other settings

### `autofocus`

If set to `all-slides`, when a new slide becomes active (including the first slide on page load), the very first form field will be auto-focused. For choice inputs, the first choice (checkbox or radio button) will be auto-focused. This is useful if you want to allow better keyboard based usage of your forms, and in particular, if you use only one form field per slide.

Please note, this will not work for single pages, that is, when using `#! page = single`.

- **Accepted value**: `all-slides`
- **Example(s)**: `#! autofocus = all-slides`

### `backdrop-opacity`

When using the `background-image` setting, the `backdrop-opacity` can be used to set an overlay of the `background-color` **on top** of the image. This is useful because your image may cause contrast issues with the text and form fields on the page, so by setting an overlay using the `background-color`, the entire page can be made much more readable.

For example, using `#! backdrop-opacity = 0.95` will set an overlay of the `background-color` at `95%` opacity on top of the `background-image`. This will make the image very subtle, but also make the entire page more readable if there are contrast issues. By default, the `backdrop-opacity` is set to `0`.

- **Accepted value**: Valid percentage
- **Example(s)**: `#! backdrop-opacity = 0.95`, `#! backdrop-opacity = 97.5%`
- ✅ Supports up to two values, example: `#! backdrop-opacity = 50% || 0.75`

### `background-image`

The `background-image` of the page.

- **Accepted value**: Valid CSS for `background-image` property ([reference](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image))
- **Example(s)**: `#! background-image = url("https://example.com/bg.png")`, `#! background-image = linear-gradient(red, pink)`
- ✅ Supports up to two values, example: `#! background-image = url("https://example.com/light.png") || url("https://example.com/dark.png")`

### `blocksmd-branding`

If set to `hide`, then the **blocks.md** branding will be hidden. This includes the `Made in blocks.md` button in the footer, and also the branding shown in the page loader animation.

- **Accepted value**: `hide`
- **Example(s)**: `#! blocksmd-branding = hide`

### `brand`

An image of your logo added to the header of the page in the top-left corner. Your brand may have two versions of the same logo: one for light mode and one for dark mode. For this reason, this setting supports up to two values.

- **Accepted value**: Valid Markdown image, example: `![Logo](https://example.com/logo.png)`
- **Example(s)**: `#! brand = ![Logo](https://example.com/logo.png)`
- ✅ Supports up to two values, example: `#! brand = ![Logo](https://example.com/logo-light.png) || ![Logo](https://example.com/logo-dark.png)`

### `color-scheme`

The default or initial color scheme of the page.

- **Default value**: `light`
- **Accepted value**: `light` or `dark`
- **Example(s)**: `#! color-scheme = light`, `#! color-scheme = dark`

### `color-scheme-scope`

If you turn on the color scheme toggle on your page using `#! color-scheme-toggle = show`, your users will be able to change the color scheme to the mode they prefer: light or dark. This preference is saved locally in the users' browsers, and the next time they visit, this preference will be applied automatically.

The `color-scheme-scope` setting determines how this preference is saved and applied: if set to `domain-wide`, the preference is saved and applied for all forms and pages on that domain (this is the default). If set to `isolate`, that particular page is isolated so that the preference is saved and applied only for that page&mdash;no domain-wide settings will any effect here. This is useful because you may have a themed form or page where you don't want to have a dark mode version. Without `#! color-scheme-scope = isolate`, the users with a dark mode saved preference (from another page on your domain) would see a page that essentially ignores the theme you want to show them.

- **Default value**: `domain-wide`
- **Accepted value**: `domain-wide` or `isolate`
- **Example(s)**: `#! color-scheme-scope = domain-wide`, `#! color-scheme-scope = isolate`

### `color-scheme-toggle`

If set to `show`, a toggle button will be available in the footer so that users are able to change the color scheme to the mode they prefer: light or dark. This preference is saved locally in the users' browsers, and the next time they visit, this preference will be applied automatically.

- **Accepted value**: `show`
- **Example(s)**: `#! color-scheme-toggle = show`

### `css-prefix`

**blocks.md** adds a `bmd-` prefix to all CSS classes. You can see how all of the available utility classes in [`blocksmd.css`](https://github.com/blocksmd/blocksmd/blob/main/dist/css/blocksmd.css) have this prefix. This makes sure that there are no collisions with other CSS frameworks that you may choose to use. However, you can change the prefix to any other string using this setting, or simply remove the prefix by setting it to `none`.

**Please note**, by changing the prefix using this setting, you are not actually changing the CSS utility classes that are available in `blocksmd.css`. Therefore, those classes will not work with any value other than the default (`bmd-`). This setting is mainly here to support other CSS frameworks that you may choose to use (instead of using the built-in CSS utilities). And in that case, you will need to include the CSS file(s) in your [`base.html`](https://github.com/blocksmd/blocksmd/blob/main/docs/how-to-use.md#base-template) when building the forms and pages.

- **Default value**: `bmd-`
- **Accepted value**: Any string or `none`
- **Example(s)**: `#! css-prefix = tw-`, `#! css-prefix = none`

### `cta`

Adds a call to action (CTA) link (styled as a button) on the header of the page in the top-right corner.

- **Accepted value**: Valid Markdown link, example: `[Sign Up](https://example.com/sign-up/)`
- **Example(s)**: `#! cta = [Sign Up](https://example.com/sign-up/)`

### `dir`

The direction of the page's text. If you're using a language like Arabic (which is written right to left), you can set this setting to `rtl` and everything on the page will adjust accordingly.

- **Default value**: `ltr`
- **Accepted value**: `ltr` or `rtl`
- **Example(s)**: `#! dir = ltr`, `#! dir = rtl`

### `favicon`

The favicon of the page.

- **Accepted value**: Valid URL to favicon
- **Example(s)**: `#! favicon = https://example.com/favicon.svg`

### `field-size`

If set to `sm`, for all form fields, the font sizes of the question, description, and answer will be made smaller. That is, the small variation of form fields will become the default.

- **Accepted value**: `sm`
- **Example(s)**: `#! field-size = sm`

### `font-family`

The `font-family` used on the page.

- **Accepted value**: Valid CSS for `font-family` property ([reference](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family))
- **Example(s)**: `#! font-family = "Open Sans", sans-serif`, `#! font-family = "Lora", serif`

### `font-import-url`

If you're using a custom font using the `font-family` setting, you can include the font file using this setting. For example, `#! font-import-url = "https://fonts.googleapis.com/css?family=Open+Sans&display=swap"` is the same as this import in CSS:

```css
@import url("https://fonts.googleapis.com/css?family=Open+Sans&display=swap");
```

- **Accepted value**: Valid CSS for `@import` property ([reference](https://developer.mozilla.org/en-US/docs/Web/CSS/@import))
- **Example(s)**: `#! font-import-url = "https://fonts.googleapis.com/css?family=Open+Sans&display=swap"`

### `font-size`

If set to `sm` or `lg`, the `font-size` of everything on the page will be made smaller or larger respectively (compared to the default medium).

- **Accepted value**: `sm` or `lg`
- **Example(s)**: `#! font-size = sm`, `#! font-size = lg`

### `form-delimiter`

The `form-delimiter` is used to separate parameters when creating form fields ([reference](https://github.com/blocksmd/blocksmd/blob/main/docs/text-input.md#parameters)). By default, this is `|`, however, you can use this setting to change it to anything you want.

- **Default value**: `|`
- **Accepted value**: Valid string
- **Example(s)**: `#! font-delimiter = \\n`

### `footer`

If set to `hide`, the footer will be hidden.

- **Accepted value**: `hide`
- **Example(s)**: `#! footer = hide`

### `get-format`

Please refer to the documentation: [Set and read data](https://github.com/blocksmd/blocksmd/blob/main/docs/set-and-read-data.md).

- **Default value**: `csv`
- **Accepted value**: `csv` or `json` or `tsv`
- **Example(s)**: `#! get-format = json`, `#! get-format = tsv`

### `get-objects-name`

Please refer to the documentation: [Set and read data](https://github.com/blocksmd/blocksmd/blob/main/docs/set-and-read-data.md).

- **Accepted value**: Valid string
- **Example(s)**: `#! get-objects-name = items`, `#! get-objects-name = articles`

### `get-url`

Please refer to the documentation: [Set and read data](https://github.com/blocksmd/blocksmd/blob/main/docs/set-and-read-data.md).

- **Accepted value**: Valid URL
- **Example(s)**: `#! get-url = {url}`

### `header`

If set to `hide`, the header will be hidden. Please note, if you do not set a `brand` or `cta` setting, the header will be hidden by default.

- **Accepted value**: `hide`
- **Example(s)**: `#! header = hide`

### `headings`

If set to `anchored`, all the headings on the page will be anchored, that is, they will each contain an anchor link (`#` to themselves). This is useful for documentation pages and some types of articles. Please note, these anchor links are only visible on hover or focus on desktops and other medium to large devices. On phones, the anchor links are always visible.

- **Accepted value**: `anchored`
- **Example(s)**: `#! headings = anchored`

### `localization`

Set the `#! localization = {lang}` to a supported language code, and write your Markdown in that language—everything will be automatically translated. Learn more: [localize](https://github.com/blocksmd/blocksmd/blob/main/docs/localize.md).

- **Default value**: `en`
- **Accepted value**: Valid HTML `lang` attribute value ([reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang))
- **Example(s)**: `#! localization = bn`, `#! localization = es`

### `meta-author`

SEO setting&mdash;sets the `author` metadata.

- **Accepted value**: Valid string
- **Example(s)**: `#! meta-author = John Doe`

### `meta-description`

SEO setting&mdash;sets the `description` metadata. Also used for the Open Graph `description`.

- **Accepted value**: Valid string
- **Example(s)**: `#! meta-description = Some description`

### `meta-image`

SEO setting&mdash;sets the Open Graph `image`.

- **Accepted value**: Valid URL to image
- **Example(s)**: `#! meta-image = https://example.com/open-graph-image.jpg`

### `meta-keywords`

SEO setting&mdash;sets the `keywords` metadata.

- **Accepted value**: Comma-separated values (CSV)
- **Example(s)**: `#! meta-keywords = software, forms, Markdown`

### `meta-type`

SEO setting&mdash;sets the Open Graph `type`.

- **Accepted value**: Valid string
- **Example(s)**: `#! meta-type = article`

### `meta-url`

SEO setting&mdash;sets the Open Graph `url`.

- **Accepted value**: Valid URL
- **Example(s)**: `#! meta-url = https://example.com/some-article`

### `page`

Depending on the value, this setting determines the layout of the page:

- `form-slides` creates slides (this is the default). If a slide contains at least one form field, then that slide becomes a `<form>` element, where the action button (`OK`) submits the form. If a slide does not contain any form fields, the slide is a regular `<div>` element, and the action button (`Next`) takes the user to the next slide.
- `slides` creates non-form slides only, even if there are form fields present in the slide.
- `single` creates a regular web page, useful for blogs, articles, documentation, etc.

---

- **Default value**: `form-slides`
- **Accepted value**: `form-slides` or `slides` or `single`
- **Example(s)**: `#! page = slides`, `#! page = single`

### `page-progress`

The page progress is a bar on top that shows how much of the form has been completed so far. You can hide this by setting the value to `hide`, or simply make it a design element (ornament without any effect) using `decorative`. The page progress can be set for each slide using `|> {percentage|fraction}` ([learn more](https://github.com/blocksmd/blocksmd/blob/main/docs/slides.md#page-progress)).

- **Accepted value**: `hide` or `decorative`
- **Example(s)**: `#! page-progress = hide`, `#! page-progress = decorative`

### `post-sheet-name`

If you're sending responses directly to Google Sheets ([learn how](https://github.com/blocksmd/blocksmd/blob/main/docs/google-sheets-integration.md)), the response would be saved in the very first sheet of the document by default. However, you can specify which sheet to save the response in by putting the name of the sheet as the value of this setting. For example, `#! post-sheet-name = Sheet2` would save the response in `Sheet2`.

- **Accepted value**: Valid string
- **Example(s)**: `#! post-sheet-name = Sheet2`, `#! post-sheet-name = Subscribers`

### `post-url`

Set the `#! post-url = {url}` setting to send form responses to that URL using a POST request. There's also an incredibly useful integration that lets you [send responses directly to Google Sheets](https://github.com/blocksmd/blocksmd/blob/main/docs/google-sheets-integration.md). Responses are sent to the `{url}` when the user reaches the end slide, or if you configure [partial submissions](https://github.com/blocksmd/blocksmd/blob/main/docs/slides.md#partial-or-slide-level-submissions)

- **Accepted value**: Valid URL
- **Example(s)**: `#! post-url = {url}`

### `rounded`

By default, all of the buttons, choices in choice inputs and picture choices, etc. are slightly rounded. You can change this to no rounding by setting `#! rounded = none`. You can also go for or a pill-like appearance (choices are not affected by this) using `#! rounded = pill`.

- **Accepted value**: `none` or `pill`
- **Example(s)**: `#! rounded = none`, `#! rounded = pill`

### `slide-controls`

If set to `hide`, the next and previous buttons in the footer will be hidden.

- **Accepted value**: `hide`
- **Example(s)**: `#! slide-controls = hide`

### `slide-delimiter`

Wherever the `slide-delimiter` is added in a Markdown document, a new slide is created exactly at this point. By default, the `slide-delimiter` is `---`, but you can change this to anything you want using this setting. Please note, this will not have any effect for single pages, that is, when using `#! page = single`.

- **Default value**: `---`
- **Accepted value**: Valid string
- **Example(s)**: `#! slide-delimiter = +++`, `#! slide-delimiter = ***`

### `title`

The title of the page (using the `<title>` tag).

- **Accepted value**: Valid string
- **Example(s)**: `#! title = Survey 2024`

### `vertical-alignment`

By default, the content of each slide (and page) is centered vertically. However, you can set the value of this setting to `start` to change the alignment so that the content is aligned to the top of the page vertically (not centered).

- **Accepted value**: `start`
- **Example(s)**: `#! vertical-alignment = start`

### `vertical-padding`

By default, the content of each slide (and page) has equal padding on top and bottom, irrespective of whether or not the page has a header and/or footer. However, you can set the value of this setting to `calculated` to make sure that the padding on top is calculated using the height of the page progress and header, and the padding on bottom is calculated using the height of the footer, that is, padding on top would be smaller if the page has no header (no `brand` and `cta` setting, or `#! header = hide`), and padding on bottom would be smaller if the footer has been hidden. If you want to apply this calculation only on phones, use `#! vertical-padding = xs:calculated` instead of `calculated`.

Please note, if this is a bit difficult to understand, try playing around with this setting on a page and see how each value affects the padding on top and bottom.

- **Accepted value**: `calculated` or `xs:calculated`
- **Example(s)**: `#! vertical-padding = calculated`, `#! vertical-padding = xs:calculated`
