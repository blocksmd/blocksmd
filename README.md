> This `README.md` is a work in progress.

# [blocks.md](https://blocks.md)

**blocks.md** is a tool that takes your Markdown files and turns them into amazing forms and web pages. Here are some key features:

- Easy to write and undestand. If you know Markdown, you can jump right in.
- All the basic form fields are supported, and more are on the way.
- By default, slides can be created using `---`. You can also turn this off to create a single page instead.
- Full support for logic jumps and progress indicator.
- Save form response remotely at any slide.
- If-else support, for loops, and more (thanks to **Nunjucks**).
- Data binding support.
- Pull in data from remote sources, with built-in Google Sheets integration.
- Save your form responses via POST requests, again with built-in Google Sheets integration.

Moreover, the resulting forms and pages are:

- Fully accessible
- Beautiful, and highly customizable, with support for light and dark color schemes
- Fully localizable to your language of choice

It's quite a lot to take in, but **blocks.md** is remarkably simple to use and understand in practice. Please check out [our website](https://blocks.md) and see the examples there to get a better idea.

## How to use

> Full documentation: [How to use](https://github.com/blocksmd/blocksmd/blob/main/docs/how-to-use.md)

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

https://blocks.md/docs/
