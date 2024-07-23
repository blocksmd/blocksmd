# On this page

- [Number input at a glance](#number-input-at-a-glance)
- [Basics of a form field](#basics-of-a-form-field)
- [Parameters](#parameters)
  - [Available parameters](#available-parameters)

# Number input at a glance

Here's a number input with only the required parameter(s):

```text
amount = NumberInput(
  | question = What is the amount?
)
```

Given below is another number input with all the available parameters. The **parameter names are case insensitive**, and the ones without values after `=` are **boolean parameters**. You can find details about all of them in the [available parameters section](#available-parameters).

```text
amount* = NumberInput(
  | question = What is the amount?
  | description = Some description
  | fieldSize = sm
  | subfield
  | autofocus
  | placeholder = Some placeholder text
  | disabled
  | min = 0
  | max = 1000
  | step = 5
  | unit = $
  | unitEnd = .00
  | value = 500
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

The following parameters are available for number inputs:

### `question`

The main question of the form field. For text, email, URL, telephone, number, and select inputs, the question is placed inside the main `<label>` element.

### `description`

Any extra information that the user may need to fill out the form.

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

Boolean parameter. When set, the input will be automatically focused when the parent slide becomes active, or immediately after page load (in case of single page layout). Can also be globally set via the `#! autofocus = all-slides` setting (only for slides).

### `placeholder`

Sets the `placeholder` attribute of the input. By default, a generic one is provided, but this can be used to override and set a custom one.

### `disabled`

Boolean parameter. When set, the input is disabled.

### `min`

If set, the value of the input must be equal to or greater than this number.

### `max`

If set, the value of the input must be equal to or less than this number.

### `step`

If set, the value of the input must be a multiple of this number. Moreover, when the up and down arrow keys are used to change the value of the number input, this is the amount by which the value is incremented or decremented respectively. By default, this is set to `1`.

### `unit`

If set, an ornament or decoration is added to the start of the number input. This has no effect on the value of the input, but can be useful for adding additional units or prefixes such as `$`, `£`, `kg`, `Income`, `.00`, etc. This can be used together with the `unitEnd` parameter.

### `unitEnd`

If set, an ornament or decoration is added to the end of the number input. This has no effect on the value of the input, but can be useful for adding additional units or suffixes such as `$`, `£`, `kg`, `Income`, `.00`, etc. This can be used together with the `unit` parameter.

### `value`

If set, this becomes the default value of the input.
