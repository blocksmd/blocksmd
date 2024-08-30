# [blocks.md](https://blocks.md) - Markdown to amazing forms and web pages

**blocks.md** is a tool that takes your Markdown files and turns them into amazing forms and web pages. Here are some key features:

- Easy to write and undestand, especially if you know Markdown
- Support for form fields: text, email, choice, select, etc.
- Create form-slides and slides using `---`, or create single pages instead
- Logic jumps and page progress
- Save form responses, with support for partial or slide-level submissions
- Google Sheets integration
- Add class names and attributes
- Data-binding
- Highly customizable, including branding
- Set and read data, create reactive blog posts and articles
- Localizable to any language
- Accessibility out of the box

It's quite a lot to take in, but **blocks.md** is remarkably simple to use and understand in practice. Please check out [our website](https://blocks.md) and see the examples there.

## How to use

> Full documentation: [How to use](https://blocksmd.gitbook.io/docs/how-to-use)

### Install via `npm`

```
npm install blocksmd
```

### Convert Markdown files to forms and pages

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

## Roadmap

The following list contains upcoming features that have been planned for **blocks.md**:

1. Date time input
2. Multi-choice input with dynamic filtering and results
3. Rating input ✅
4. Opinion scale and Net Promoter Score<sup>®</sup> ✅
5. File/image upload
6. Ranking input (maybe)
7. Honeypot fields for spam prevention
8. Layout options with images and media (also slide level)
9. Classic form style
10. Payments
11. WordPress plugin
12. Cloud version
13. Go open-source

## Build

Run the following to build the project:

```
npm run build
```

Make sure you have the dev dependencies installed.

## Test

Run the following to test the project:

```
npm run test
```

Again, make sure you have the dev dependencies installed.

## Documentation

[https://blocksmd.gitbook.io/docs/](https://blocksmd.gitbook.io/docs/)
