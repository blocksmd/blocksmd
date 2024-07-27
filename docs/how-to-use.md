# On this page

- [Install via `npm`](#install-via-npm)
- [Convert Markdown files to forms and pages](#convert-markdown-files-to-forms-and-pages)
  - [Routes and mapping](#routes-and-mapping)
- [Pre-fill form fields using URL parameters](#pre-fill-form-fields-using-URL-parameters)
- [Base template](#base-template)
- [Initialization options](#initialization-options)

# Install via `npm`

```
npm install blocksmd
```

# Convert Markdown files to forms and pages

Once you've installed **blocks.md**, put all of your Markdown files in a `src` directory. You can also have your images and media files in `src/static` (that is, within the input directory), and this directory will be copied for you. Once you're ready, run the following command in your CLI:

```
blocksmd
```

By default, this command will look for a directory called `src` and place the resulting output in a new `site` directory. It will also create the necessary CSS and JS files in a new `site/blocksmd` directory (that is, within the output directory) and copy the static files. However, you can specify the input and output directories, and also set the name of the static directory using the following options:

```
Options:
      --help             Show help                                     [boolean]
      --version          Show version number                           [boolean]
  -i, --input            Input directory    [string] [required] [default: "src"]
  -o, --output           Output directory  [string] [required] [default: "site"]
  -s, --static-dir-name  Static directory name (for images, media files, etc.)
                                         [string] [required] [default: "static"]
```

So for example, if you wanted to convert the Markdown files in the `cms/pages` directory and place the output in `website`, you would run the following:

```
blocksmd -i cms/pages -o website
```

The output folder is a static site with regular HTML files, and you can host them on Github Pages, Netlify, Vercel, etc. For example, you can literally drag and drop an output folder created using **blocks.md** to [Netlify Drop](https://app.netlify.com/drop), and your forms and pages will all work properly.

## Routes and mapping

The filenames of the Markdown files become the routes because each input Markdown file is mapped to an output HTML file with the same name. For example, if you had `index.md` and `survey.md` in your input folder, your output folder would contain `index.html` and `survey.html` after running the `blocksmd` command.

# Pre-fill form fields using URL parameters

Let's say you had `apply.md` in your input folder with a form field:

```text
position* = SelectBox(
  | question = What position do you want to apply for?
  | options = Accountant, Engineer, Architect
)
```

You could pre-fill this form field using a URL parameter, like so: `https://example.com/apply?position=Engineer`. In this case, the `Engineer` option would be selected by default. Multiple fields are also supported: `https://example.com/apply?position=Engineer&option=1`.

# Base template

The `blocksmd` command looks for `base.html` in your input folder and uses this as the base to create all of the output HTML files. If you don't have a `base.html` file, it uses the [built-in one](https://github.com/blocksmd/blocksmd/blob/main/bin/base.html) that comes with the library. Therefore, if you want to change the base template for creating the output files, just have your version of `base.html` in your input folder, so that you may choose to do the following:

- Change the metadata tags.
- Write your own CSS to style your forms and pages.
- Include additional CSS and JS files. For example, you could include Tailwind CSS in your `base.html`, set `#! css-prefix = none`, and start [using Tailwind utility classes](https://github.com/blocksmd/blocksmd/blob/docs/class-names-and-attributes.md) for some incredible looking pages and layouts.
- Change the [initialization options](#initialization-options).

And much more. The base template has access to the following data:

- The settings, for example: `{{ settings["title"] }}`
- The route (filename of the input Markdown file), for example: `{{ route }}`

**blocks.md** uses [Nunjucks](https://mozilla.github.io/nunjucks/) to handle the templating, so its entire list of features such as if-else statements, loops, filters, etc. are fully supported.

# Initialization options

During initialization of each form/page, the `blocksmd.init(...)` function is called. You can see this in [`base.html`](https://github.com/blocksmd/blocksmd/blob/main/bin/base.html). This function takes the template (as a string) as the first argument, and an object as the second argument. This object contains the options which are used in various parts of the workflow. These are called the initialization options. For example:

```javascript
blocksmd.init(template, {
	postHeaders: {
		"X-API-KEY": "...",
	},
	sanitize: false,
});
```

The following options are available to use during initialization:

## `getHeaders`

Object containing headers to send with the GET request if you set up a `#! get-url = {url}`. Learn more about [setting and reading data](https://github.com/blocksmd/blocksmd/blob/main/docs/set-and-read-data.md).

- **Type**: Object
- **Default**: `{}`

## `postData`

Extra data to send over with the form responses. Learn more about [sending responses](https://github.com/blocksmd/blocksmd/blob/main/docs/send-responses.md).

- **Type**: Object
- **Default**: `{}`

## `postHeaders`

Object containing headers to send with the POST request (for form responses). Learn more about [setting and reading data](https://github.com/blocksmd/blocksmd/blob/main/docs/set-and-read-data.md).

- **Type**: Object
- **Default**: `{}`

## `prioritizeURLFormData`

Whenever a user inputs some data in any of the form fields, that data is automatically saved in local storage. If the user leaves the form before completing the form, the saved form data is pre-filled when the user returns back to the page.

As mentioned above, you can also pre-fill form fields using URL parameters, for example: `https://example.com/apply?position=Engineer`.

By default, the data saved in local storage is given preference over the URL parameters, because the former comes from user's input. However, if for some reason, you want to always prioritize the URL parameters, set this option to `true`.

- **Type**: Boolean
- **Default**: `false`

## `sanitize`

If set to `true`, the template will first be sanitized using [DOMPurify](https://github.com/cure53/DOMPurify).

- **Type**: Boolean
- **Default**: `false`

## `setColorSchemeAttrsAgain`

By default, **blocks.md** will use saved color scheme preference (light or dark mode) and set it during page load. It will set it again during the template initilization. You can stop the second instance by setting this option to `false`.

This is slightly difficult to understand, but the practical explanation is that if you're using some other method of setting the saved color scheme preference (for example, cookie from the server side), you may need to set this to `false`.

- **Type**: Boolean
- **Default**: `true`
