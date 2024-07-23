# On this page

- [Picture choice at a glance](#picture-choice-at-a-glance)
- [Basics of a form field](#basics-of-a-form-field)
- [Parameters](#parameters)
  - [Available parameters](#available-parameters)

# Picture choice at a glance

A picture choice lets the user select one or more items from a list. The only difference from a regular choice input is that each choice here has a relevant image to help the users. Here's a single picture choice with only the required parameter(s):

```text
furniture = PictureChoice(
  | question = Please choose
  | choices =
    Chairs && https://res.cloudinary.com/dnriuttuy/image/upload/v1721060655/hplants.jpg,
    Tables && https://res.cloudinary.com/dnriuttuy/image/upload/v1721060651/oplants.jpg
)
```

Please note, the images are coming from the URLs, and they can be local (as in refer to local images) or remote (from a media hosting service such as S3, Cloudinary, and so on). Here's a multi-choice variation with only the required parameter(s):

```text
furniture = PictureChoice(
  | question = Please choose
  | choices =
    Chairs && https://res.cloudinary.com/dnriuttuy/image/upload/v1721060655/hplants.jpg,
    Tables && https://res.cloudinary.com/dnriuttuy/image/upload/v1721060651/oplants.jpg
  | multiple
)
```

Given below is another picture choice with all the available parameters. The **parameter names are case insensitive**, and the ones without values after `=` are **boolean parameters**. You can find details about all of them in the [available parameters section](#available-parameters).

```text
furniture* = PictureChoice(
  | question = Please choose
  | choices =
    Chairs && https://res.cloudinary.com/dnriuttuy/image/upload/v1721060655/hplants.jpg,
    Tables && https://res.cloudinary.com/dnriuttuy/image/upload/v1721060651/oplants.jpg
  | multiple
  | checked = Chairs, Tables
  | description = Some description
  | hideLabels
  | fieldSize = sm
  | subfield
  | autofocus
  | disabled
  | supersize
)
```

# Basics of a form field

A form field is a **Markdown paragraph** in the following format:

```text
{fieldName}{optionalAsterisk} = {fieldType}(
  {parameters}
)
```

- The `{fieldName}` is the name of the input. It is used as the key for the value of the input in the form data (which is submitted as JSON). The `{fieldName}` can also be used to reference the input's value in the template. It must adhere to the following rules:
  - Not start with a number
  - Not contain a dash or hyphen (`-`)
  - Not contain a space
- The `{optionalAsterisk}` is an `*` which (if provided) indicates that the field is required. If this is omitted, then the field becomes optional.
- The `{fieldType}` must be one of the following: `TextInput`, `EmailInput`, `TelInput`, `NumberInput`, `SelectBox`, `ChoiceInput`, or `PictureChoice` (case insensitive).

For example, here's a required email input form field with a class name added to the wrapping container:

```text
[.col-6]
yourEmail* = EmailInput(
  | question = What is your email address?
  | description = Please make sure it's correct.
)

Your email is {$ yourEmail $}.
```

The following is not a valid form field because the empty line means that there are two Markdown paragraphs, and none of them follow the valid format:

```text
address = TextInput(
  | question = What is your address?

  | description = ...
)
```

# Parameters

Parameters are information provided within the `(...)` when creating form fields. They must be separated by the `form-delimiter`, which by default is `|`. The `form-delimiter` can be changed as a [setting](https://github.com/blocksmd/blocksmd/blob/main/docs/settings.md). For example, this would render the exact same email input from above:

```text
#! form-delimiter = \\n

[.col-6]
yourEmail* = EmailInput(
  question = What is your email address?
  description = Please make sure it's correct.
)

Your email is {$ yourEmail $}.
```

Please note once again that parameter names are case insensitive, and boolean parameters only require their names to have effect (no need for values after `=`).

## Available parameters

The following parameters are available for picture choices:

### `question`

The main question of the form field. For choice inputs and picture choices, the question is placed inside a `<legend>` element, which in turn is placed inside the wrapping `<fieldset>`.

### `choices`

List of available choices as CSV (comma separated values), where the image URL **must come at the end** after a `&&`. For example:

```text
color* = PictureChoice(
  | choices =
    Red && img/red.jpg,
    Green && img/green.jpg,
    Blue && img/blue.jpg
)
```

By default, the value of each choice is the same as the label. However, you can specify a custom value for a choice by putting it inside `"..."`, and placing this before or after the label. Note that the image URL must still come at the end. For example:

```text
color* = PictureChoice(
  | question = Please choose
  | choices =
    Red "red" && img/red.jpg,
    "g" Green && img/green.jpg,
    Blue && img/blue.jpg
)

---
-> color == "g"

Your favorite color is Green.
```

Note how the jump condition (`->`) is using `"g"` instead of `"Green"`, because `g` is the value and `Green` is the label. Only the label is shown to the user, so this is useful if you have labels which are long, readable, and/or descriptive, and values which are unique, short, usable, and/or programmatic. Here's another example where the labels are product names, and the values are machine-readable IDs:

```text
product* = PictureChoice(
  | question = What do you want to buy?
  | choices =
    Mango "SKU-1234-5678" && img/mango.png,
    Apple "SKU-8765-4321" && img/apple.gif
)
```

### `multiple`

Boolean parameter. When set, allows the user to select more than one choice. In case of multi-choice inputs, checkboxes are used instead of radio buttons.

### `checked`

If set and matches one or more choices, then the choices are checked by default. For instance, in the example below, choice `y` would be checked by default.

```text
selection = ChoiceInput(
  | choices =
    x && img/x.jpg,
    y && img/y.jpg,
    z && img/z.jpg
  | checked = y
)
```

For multi-choice variations, you can put in one or more values as CSV (comma separated values). In the example below, all three choices would be checked by default.

```text
selections = ChoiceInput(
  | choices =
    x && img/x.jpg,
    y && img/y.jpg,
    z && img/z.jpg
  | multiple
  | checked = x, y, z
)
```

Please note, this parameter must match the value of the choice, not the label. So if you set a value using `"..."` (see above), then the `checked` must be set to this value. For example:

```text
product* = PictureChoice(
  | question = What do you want to buy?
  | choices =
    Mango "SKU-1234-5678" && img/mango.png,
    Apple "SKU-8765-4321" && img/apple.gif
  | checked = SKU-8765-4321
)
```

In the above example, the `Apple` choice would be checked by default.

### `description`

Any extra information that the user may need to fill out the form.

### `hideLabels`

Boolean parameter. When set, the text labels are hidden so that only the images are shown to the user.

### `fieldSize`

When set to `sm`, the font sizes of the question, description, and answer are made smaller. Can also be globally set via the `#! field-size = sm` setting.

### `subfield`

Boolean parameter. When set, the question of the form field is made smaller. This is useful for creating subfields, especially inside `.col-*` classes. For example:

```text
[.form-question]
What is your address?

[.col-8]
city* = TextInput(
  | question = City | subfield | placeholder = New York
)

[.col-4]
zip* = TextInput(
  | question = Zip | subfield | placeholder = 10001
)
```

### `autofocus`

Boolean parameter. When set, the first choice (checkbox or radio button) will be automatically focused when the parent slide becomes active, or immediately after page load (in case of single page layout). Can also be globally set via the `#! autofocus = all-slides` setting (only for slides).

### `disabled`

Boolean parameter. When set, all the choices (checkboxes or radio buttons) are disabled.

### `supersize`

Boolean parameter. When set, only up to two choices are placed in one row (default is up to three), so each choice (and its image) is made bigger. This is not applicable on phones because of screen size.
