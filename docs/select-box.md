# Select box

## Select box at a glance

A select box is an input element that lets the user select a single item from a list. For multi-select, please use a [choice input](choice-input/) with the `multiple` parameter. Here's a select box with only the required parameter(s):

```text
color = SelectBox(
  | question = What is your favorite color?
  | options = Red, Green, Blue
)
```

Given below is another select box with all the available parameters. The **parameter names are case insensitive**, and the ones without values after `=` are **boolean parameters**. You can find details about all of them in the [available parameters section](#available-parameters).

```text
color* = SelectBox(
  | question = What is your favorite color?
  | options = Red, Green, Blue
  | selected = Green
  | description = Some description
  | fieldSize = sm
  | subfield
  | autofocus
  | placeholder = Some placeholder text
  | disabled
)
```

## Basics of a form field

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

## Parameters

Parameters are information provided within the `(...)` when creating form fields. They must be separated by the `form-delimiter`, which by default is `|`. The `form-delimiter` can be changed as a [setting](settings/). For example, this would render the exact same email input from above:

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

### Available parameters

The following parameters are available for select boxes:

#### `question`

The main question of the form field. For text, email, URL, telephone, number, and select inputs, the question is placed inside the main `<label>` element.

#### `options`

List of available options as CSV (comma separated values), for example:

```text
color* = SelectBox(
  | options = Red, Green, Blue
)
```

By default, the value of each option is the same as the label. However, you can specify a custom value for an option by putting it inside `"..."`, and placing this before or after the label. For example:

```text
color* = SelectBox(
  | question = What is your favorite color?
  | options = Red "red", "g" Green, Blue
)

---
-> color == "g"

Your favorite color is Green.
```

Note how the jump condition (`->`) is using `"g"` instead of `"Green"`, because `g` is the value and `Green` is the label. Only the label is shown to the user, so this is useful if you have labels which are long, readable, and/or descriptive, and values which are unique, short, usable, and/or programmatic. Here's another example where the labels are product names, and the values are machine-readable IDs:

```text
product* = SelectBox(
  | question = What do you want to buy?
  | options = Mango "SKU-1234-5678", Apple "SKU-8765-4321"
)
```

#### `selected`

If set and matches one of the options, then that option is selected by default. For instance, in the example below, option `y` would be selected by default.

```text
choice = SelectBox(
  | options = x, y, z
  | selected = y
)
```

Please note, this parameter must match the value of the option, not the label. So if you set a value using `"..."` (see above), then the `selected` must be set to this value. For example:

```text
product* = SelectBox(
  | question = What do you want to buy?
  | options = Mango "SKU-1234-5678", Apple "SKU-8765-4321"
  | selected = SKU-8765-4321
)
```

In the above example, the `Apple` option would be selected by default.

#### `description`

Any extra information that the user may need to fill out the form.

#### `fieldSize`

When set to `sm`, the font sizes of the question, description, and answer are made smaller. Can also be globally set via the `#! field-size = sm` setting.

#### `subfield`

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

#### `autofocus`

Boolean parameter. When set, the input will be automatically focused when the parent slide becomes active, or immediately after page load (in case of single page layout). Can also be globally set via the `#! autofocus = all-slides` setting (only for slides).

#### `placeholder`

Creates an `<option>` element with `value=""` and `disabled` attribute. This acts as a placeholder for the select box because it can't be selected. By default, a generic one is provided, but this can be used to override and set a custom one.

#### `disabled`

Boolean parameter. When set, the input is disabled.
