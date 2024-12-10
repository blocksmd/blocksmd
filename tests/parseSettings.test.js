"use strict";

const { parseSettings } = require("../src/settings-parse");

// Case 1

const template1 = `
#! accent = #0066ff
#! accent-foreground = #fff
#! autofocus = all-slides
#! backdrop-opacity = 10%
#! background-color = white || black
#! background-image = https://example.com/bg.jpg
#! brand = ![Logo](https://example.com/logo.png "Logo")
#! button-alignment = end
#! color = black || white
#! color-scheme = dark
#! color-scheme-scope = isolate
#! color-scheme-toggle = show
#! css-prefix = none
#! cta = [Sign Up](https://example.com/sign-up/)

# Heading

This is a paragraph.
`;
const expectedTemplate1 = `

# Heading

This is a paragraph.
`;
const expectedSettings1 = {
	"accent": "0, 102, 255",
	"accent-foreground": "255, 255, 255",
	"autofocus": "all-slides",
	"backdrop-opacity": "10%",
	"background-color": "255, 255, 255",
	"background-color-alt-scheme": "0, 0, 0",
	"background-image": "https://example.com/bg.jpg",
	"brand": '![Logo](https://example.com/logo.png "Logo")',
	"button-alignment": "end",
	"color": "0, 0, 0",
	"color-alt-scheme": "255, 255, 255",
	"color-scheme": "dark",
	"color-scheme-scope": "isolate",
	"color-scheme-toggle": "show",
	"css-prefix": "",
	"cta": "[Sign Up](https://example.com/sign-up/)",
};

test("Case 1", () => {
	const result1 = parseSettings(template1);
	expect(result1.template).toBe(expectedTemplate1);
	expect(result1.settings).toMatchObject(expectedSettings1);
});

// Case 2

const template2 = `
#! dir = rtl
#! favicon = https://example.com/icon.svg
#! field-size = sm
#! font-family = Inter
#! font-import-url = https://example.com/font/
#! font-size = lg
#! footer = hide
#! form-delimiter = \\n
#! formsmd-branding = hide
#! form-style = classic
#! get-format = json
#! get-objects-name = examples
#! get-url = https://example.com/api/examples/
#! header = align
#! headings = anchored
#! id = form1
#! label-style = classic
#! localization = bn

# Heading

This is a paragraph.

> This is a blockquote.
`;
const expectedTemplate2 = `

# Heading

This is a paragraph.

> This is a blockquote.
`;
const expectedSettings2 = {
	"dir": "rtl",
	"favicon": "https://example.com/icon.svg",
	"field-size": "sm",
	"font-family": "Inter",
	"font-import-url": "https://example.com/font/",
	"font-size": "lg",
	"footer": "hide",
	"form-delimiter": "\n",
	"formsmd-branding": "hide",
	"form-style": "classic",
	"get-format": "json",
	"get-objects-name": "examples",
	"get-url": "https://example.com/api/examples/",
	"header": "align",
	"headings": "anchored",
	"id": "form1",
	"label-style": "classic",
	"localization": "bn",
};

test("Case 2", () => {
	const result2 = parseSettings(template2);
	expect(result2.template).toBe(expectedTemplate2);
	expect(result2.settings).toMatchObject(expectedSettings2);
});

// Case 3 (weird formatting)

const template3 = `
#! meta-author = Author
	#! 		meta-description = This is the description.
  #! meta-image = https://example.com/og.jpg
#! 	meta-keywords = x, y, z
#! meta-type = article
	#! meta-url = https://example.com/articles/4/
#! page = slides
	#! page-progress = hide
			#! placeholders = hide
#! post-sheet-name = Sheet2
		#! post-url = https://example.com/api/examples/create/
#! restart-button = show
		#! rounded = pill
			#! slide-controls = hide
	#! slide-delimiter = ***
			#! submit-button-text = Submit
#! title = Title
#! vertical-alignment = start

# Heading

This is a paragraph.

> This is a blockquote.

	function sum(a, b) {
		return a + b;
	}
`;
const expectedTemplate3 = `

# Heading

This is a paragraph.

> This is a blockquote.

	function sum(a, b) {
		return a + b;
	}
`;
const expectedSettings3 = {
	"meta-author": "Author",
	"meta-description": "This is the description.",
	"meta-image": "https://example.com/og.jpg",
	"meta-keywords": "x, y, z",
	"meta-type": "article",
	"meta-url": "https://example.com/articles/4/",
	"page": "slides",
	"page-progress": "hide",
	"placeholders": "hide",
	"post-sheet-name": "Sheet2",
	"post-url": "https://example.com/api/examples/create/",
	"restart-button": "show",
	"rounded": "pill",
	"slide-controls": "hide",
	"slide-delimiter": "***",
	"submit-button-text": "Submit",
	"title": "Title",
	"vertical-alignment": "start",
};

test("Case 3 (weird formatting)", () => {
	const result3 = parseSettings(template3);
	expect(result3.template).toBe(expectedTemplate3);
	expect(result3.settings).toMatchObject(expectedSettings3);
});

// Case 4 (invalid settings)

const template4 = `
#! accent = random-non-color || random-non-color
#! background-color = random-non-color || black
#! color = black || random-non-color
#! color-scheme = random
#! color-scheme-toggle = show
#! headings = anchored
#! not-setting-1 = value || value
#! not-setting-2 = value
#! rounded = lg

# Heading

This is a paragraph.
`;
const expectedTemplate4 = `

# Heading

This is a paragraph.
`;
const expectedSettings4 = {
	"background-color-alt-scheme": "0, 0, 0",
	"color": "0, 0, 0",
	"color-scheme-toggle": "show",
	"headings": "anchored",
};

test("Case 4 (invalid settings)", () => {
	const result4 = parseSettings(template4);
	expect(result4.template).toBe(expectedTemplate4);
	expect(result4.settings).toMatchObject(expectedSettings4);
});

// Case 5 (no settings)

const template5 = `
# Heading

This is a paragraph.
`;
const expectedTemplate5 = `
# Heading

This is a paragraph.
`;
const expectedSettings5 = {};

test("Case 5 (no settings)", () => {
	const result5 = parseSettings(template5);
	expect(result5.template).toBe(expectedTemplate5);
	expect(result5.settings).toMatchObject(expectedSettings5);
});

// Case 6 (empty string)

const template6 = "";
const expectedTemplate6 = "";
const expectedSettings6 = {};

test("Case 6 (empty string)", () => {
	const result6 = parseSettings(template6);
	expect(result6.template).toBe(expectedTemplate6);
	expect(result6.settings).toMatchObject(expectedSettings6);
});
