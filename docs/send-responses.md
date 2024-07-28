# Send responses

## Send full and partial responses to your server or Google Sheets

Set the `#! post-url = {url}` setting to send form responses to that URL using a POST request. There's also an incredibly useful integration that lets you [send responses directly to Google Sheets](google-sheets-integration/). Responses are sent to the `{url}` when the user reaches the end slide.

Partial submissions are also supported. Add `>> post` (case insensitive) to a slide to enable partial submission up to that slide, that is, when a user completes this slide and goes to the next one, all the form data up to that slide will be sent to the URL you set in the setting. [Learn more](slides/#partial-or-slide-level-submissions).

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

## Format of responses

Each response is sent as a JSON object where the names of form fields are the keys, and value is the input provided by the user. There are three other fields added automatically:

- `_rid`&mdash;unique ID of the response
- `_submitted`&mdash;date and time when the response is submitted
- `_end`&mdash;whether or not the user has reached the end or not (in case of partial submissions, this will **not** be `TRUE`)

Take this example:

```text
email* = EmailField(
  | question = What is your email address?
)
```

Here's an example response from this form:

```json
{
	"_rid": "2690ebfd-ef08-4eb4-9e17-4fe438e7b988",
	"_submitted": "Thu, 16 May 2024 08:29:33 GMT",
	"email": "john@example.com",
	"_end": "TRUE"
}
```
