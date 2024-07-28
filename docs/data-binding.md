# Data-binding

## Data-binding, `<div>` and `<span>` elements

Create wrapping `<div>` elements by putting content inside pairs of `:::`. The content inside can be any valid Markdown, such as headings, paragraphs, lists, form fields, etc. Class names and other attributes are supported via `[...]` ([learn more](class-names-and-attributes/)). Moreover, you can bind one or more fields to a `<div>` element by adding the names of the fields inside `{$...$}` (separated by spaces), and placing this within the `[...]`. This means that whenever the value of a binded field changes, the content inside the `<div>` will be automatically re-rendered.

The templating is done using [Nunjucks](https://mozilla.github.io/nunjucks/), so its entire list of features such as if-else statements, loops, filters, etc. are fully supported. You can also bind a single field to a `<span>` element using `{$ field $}`. This is obviously not as flexible, but it is simple, and can be used inside paragraphs, headings, list items, etc.

```text
product* = SelectBox(
  | question = Product | options = T-Shirts, Socks
  | selected = T-Shirts | subfield
)

price* = NumberInput(
  | question = Price | unitEnd = $ | subfield | min = 1
)

quantity* = NumberInput(
  | question = Quantity | subfield | min = 1
)

[.col-4]
Selected: {$ product $}

::: [.col-8 .text-end .xs:text-start {$ price quantity $}]
{% if price and quantity -%}
  Total: ${{ price }} × {{ quantity }} = ${{ price * quantity }}
{% else -%}
  Total: Set price and quantity
{% endif %}
:::
```

Moreover, you can use data-binding to dynamically update class names and other attributes based on user input. In the example below, the `color` and `background-color` of the paragraph and the list within the `<div>` element will change depending on what is chosen by the user.

```text
color* = ChoiceInput(
  | question = Choose a color
  | choices = Red "red", Blue "blue"
)

::: [{$ color $}]
[.col-6 style="color: {{ color }}"]
Paragraph

- [.col-6 style="background-color: {{ color }}"]
- Item
- Item
:::
```

Here's another example showing how to dynamically change the code depending on the choice of language:

````text
#! page = single

language* = ChoiceInput(
  | question = What is your language of choice?
  | choices = Python, JavaScript
  | checked = Python
)

::: [{$ language $}]
{% if language == "Python" %}
```Python
def add(a, b):
  return a + b
```
{% else %}
```JavaScript
function add(a, b) {
  return a + b;
}
```
{% endif %}
:::
````
