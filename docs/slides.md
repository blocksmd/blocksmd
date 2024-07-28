# Slides

> [!NOTE]
> Please note, everything on this page is only applicable if you're using slides layout. Therefore, if you use `#! page = single` (no slides), then none of the following would apply.

## How to create slides

You can create slides by using the `slide-delimiter`&mdash;wherever this is added, a new slide is created exactly at this point. The `slide-delimiter` is `---` by default, but can be changed as a [setting](settings/). For example: `#! slide-delimiter = +++`. Please take note of the following:

- Everything up to the first `---` will become the first slide.
- If no `---` is used, the entire form/page will just have one slide (plus the end slide which is added programmatically).

In Markdown, `---` creates an `<hr>`, so if you're using the default `slide-delimiter`, you can use `***` or `___` (underscores) to create `<hr>` elements instead.

## Conditionally show slides using logic jumps

Add `-> {condition}` to a slide to conditionally show it, that is, the slide will be shown to the user only if the jump condition is true. This is called a **logic jump**. Note that the `{condition}` has to be a valid [Nunjucks if-condition](https://mozilla.github.io/nunjucks/).

```text
specialty* = ChoiceInput(
  | question = What is your specialty?
  | description =
    This will help us with your placement on our team.
  | choices = Back-end, Front-end, Full-stack
)

---
-> specialty == "Back-end"

At this stage, we're only hiring engineers who have front-end
expertise. Sorry for the inconvenience.

---
-> specialty == "Front-end" or specialty == "Full-stack"

expertise* = SelectBox(
  | question = What is your level of expertise?
  | description =
    Choose the level of experience you have in the
    industry. Again, this will help with your placement.
  | options = Junior, Mid-level, Senior
)
```

Here, the second slide will be shown only if the `Back-end` choice is selected. Otherwise, the page will jump to the third slide.

## Page progress

Use `|> {percentage|fraction}` to show page progress on top. This inidicates how much of the form has been completed so far.

```text
specialty* = ChoiceInput(
  | question = What is your specialty?
  | description =
    This will help us with your placement on our team.
  | choices = Back-end, Front-end, Full-stack
)

---
-> specialty == "Back-end"
|> 50%

At this stage, we're only hiring engineers who have front-end
expertise. Sorry for the inconvenience.

---
-> specialty == "Front-end" or specialty == "Full-stack"
|> 1/2

expertise* = SelectBox(
  | question = What is your level of expertise?
  | description =
    Choose the level of experience you have in the
    industry. Again, this will help with your placement.
  | options = Junior, Mid-level, Senior
)
```

Here, the page progress bar will move to 50% (or half) when the user reaches the second or third slide. By default, the bar will be full when the user reaches the end slide.

## Partial or slide-level submissions

Set the `#! post-url = {url}` setting to send form responses to that URL using a POST request. There's also an incredibly useful integration that lets you send responses directly to Google Sheets. Responses are sent to the `{url}` when the user reaches the end slide.

Partial submissions are also supported. Add `>> post` (case insensitive) to a slide to enable partial submission up to that slide, that is, when a user completes this slide and goes to the next one, all the form data up to that slide will be sent to the URL you set in the setting. [See video example](https://example.com).

```text
#! post-url = {url}
>> post

phone* = TelInput(
  | question = What is your phone number?
  | description =
    This will allow us to get in touch and fulfill your
    order. Make sure the number is correct.
)

---
products* = PictureChoice(
  | question = What products would you like?
  | choices =
    T-Shirts && https://res.cloudinary.com/dnriuttuy/image/upload/v1720015194/tshirts.png,
    Socks && https://res.cloudinary.com/dnriuttuy/image/upload/v1720015163/socks.png
  | multiple
)
```

Here, when the user reaches the second slide, the first slide's phone number will be sent to the `{url}`. Therefore, even if the user does not complete the form, the author will still have a way to reach out to the user and complete their order.

## Slide action button alignment

Each slide has an action button added to it programmatically. For form slides, an `OK` button is added that submits the form and takes the user to the next slide. For non-form slides, a `Next` button is added which also takes the user to the next slide.

By default, this action button is aligned to the start or left (inverted in RTL) of the slide. However, you can change this alignment by adding one of the following to a slide:

- `=| center` or `|= center` (case insensitive) aligns the button to the center of the slide
- `=| end` or `|= end` (case insensitive) aligns the button to the end or right (inverted in RTL) of the slide

```text
=| center

name* = TextInput(
  | question = What is your name?
  | description =
    Let's get started with the survey. First, please tell
    us your full legal name according to your passport.
)

---
=| END

# Hey {$ name $} 👋

It's a **pleasure** to meet you. Let us continue.
```

Here, the `OK` button in the first slide will be aligned to the center, and the `Next` button in the second slide will aligned to the end (or right).

## Disable previous button

On the footer, there are previous and next buttons that allow the user to navigate between slides. You can disable the previous button in any particular slide by adding `<< disable` (case insensitive). This disables the previous button and stops the user from going back.

```text
# Hello only once

---
<< disable

email = EmailInput(
  | question = What is your email address?
)
```

Here, once the user reaches the second slide, they will be unable to go back to the first one using the previous button.

## Start slides

Start slides can be used to create introductions to your forms and pages. They are very similar to regular slides, with the only differences being the following:

- The action button will say `Start` by default.
- The action button text can be overridden to say something else.

Create start slides by adding `-> start` (case insensitive). This is the same syntax as logic jumps, but because this is the start slide, logic jumps are not relevant here. Here's an example:

```text
-> START
=| CENTER

# [.text-center] Yearly Survey 2024

[.fs-lead .text-center]
Welcome to the our survey for the year of 2024.

---
Paragraph
```

As mentioned above, you can change the text of the action button using the following: `-> start -> {text}`. For instance, in the example below, the action button will say `Let's Go!` instead of `Start`:

```text
-> sTaRt -> Let's Go!
=| cEnTeR

# [.text-center] Yearly Survey 2024

[.fs-lead .text-center]
Welcome to the our survey for the year of 2024.

---
Paragraph
```

**Please note**, you can add more than one start slide. However, no matter where you add your start slides, they will always be gathered together and brought to the start of the page.

## End slide

An end slide is always added programmatically to every page. This slide contains a `Restart` button, along with some relevant text. However, you can override the contents of the end slide by adding `-> end` (case insensitive). This is the same syntax as logic jumps, but because this is the end slide, logic jumps are not relevant here. Here's an example:

```text
name* = TextInput(
  | question = What is your name?
  | description =
    Let's get started with the survey. First, please tell
    us your full legal name according to your passport.
)

---
-> END

# [.text-center] Thank you for your answer!
```

**Please note**, only one end slide is supported per page (last one defined will be used). You also can't change the alignment of the action button (`Restart` button) on the end slide. This will always be centered.

### Redirect from end slide

You can also redirect to any other URL from the end slide using the following: `-> end -> {url}`. In this case, no content needs to be added to the slide:

```text
name* = TextInput(
  | question = What is your name?
  | description =
    Let's get started with the survey. First, please tell
    us your full legal name according to your passport.
)

---
-> end -> https://example.com
```

Here, when the user reaches the end slide, they will be redirected to https://example.com instead of being shown another slide. You can use this to redirect to your own website for example.
