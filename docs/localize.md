# On this page

- [Localizable to any language](#localizable-to-any-language)
- [Supported language codes](#supported-language-codes)
- [Adding support for a new language](#adding-support-for-a-new-language)

# Localizable to any language

Set the `#! localization = {lang}` to a supported language code, and write your Markdown in that language—everything will be automatically translated. Here's an example page in Spanish:

```text
#! localization = es

name* = TextInput(
  | question = Cómo te llamas?
  | description =
    Empecemos con la encuesta. En primer lugar, dinos tu
    nombre legal completo según tu pasaporte.
)

---
# Hola {$ name $} 👋

Es un **placer** conocerte. Continuemos.

---
email* = EmailInput(
  | question = Cuál es tu dirección de correo electrónico?
  | description =
    Introduzca una dirección de correo electrónico en la
    que podamos localizarle para responderle.
)
```

# Supported language codes

As of right now, the following language codes are supported:

- `en` | English (default)
- `bn` | Bengali
- `es` | Spanish

# Adding support for a new language

In order to add support for a new language, all we need is an entry for this language in the `translations` object within the [`src/translations.js`](https://github.com/blocksmd/blocksmd/blob/main/src/translations.js) file. The key for this entry would be the language code, and the value would be a JSON object containing translations required for creating the forms and pages. For example, if we wanted to support `{lang}`, we would need the following:

```javascript
const translations = {
  en: {...},
  bn: {...},
  es: {...},
  {lang}: {...},
};
```

Once this entry is in place, we would need to build the project again with `npm run build`. After that, the language would be fully supported and would be usable with the `#! localization = {lang}` setting.

If you want your language to be supported in **blocks.md**, please create a PR by adding an entry in [`src/translations.js`](https://github.com/blocksmd/blocksmd/blob/main/src/translations.js), or just create an issue containing all of the relevant translations.
