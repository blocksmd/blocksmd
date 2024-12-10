"use strict";

const { createStyles } = require("../src/templates-create");
const beautify = require("beautify");

// Case 1

const expectedStyles1 = `
@import url("https://example.com/font/");
.fmd-root {
	--fmd-body-font-family: "Inter", sans-serif;
	--fmd-backdrop-opacity-lm: 0.075;
	--fmd-backdrop-opacity-dm: 0.05;
	--fmd-body-bg-img-lm: url("https://example.com/bg-lm.jpg");
	--fmd-body-bg-img-dm: url("https://example.com/bg-dm.jpg");
}
.fmd-root {
	--fmd-accent-r: 0;
	--fmd-accent-g: 0;
	--fmd-accent-b: 139;
	--fmd-accent-foreground-r: 255;
	--fmd-accent-foreground-g: 255;
	--fmd-accent-foreground-b: 255;
	--fmd-body-bg-r: 255;
	--fmd-body-bg-g: 255;
	--fmd-body-bg-b: 255;
	--fmd-body-color-r: 0;
	--fmd-body-color-g: 0;
	--fmd-body-color-b: 0;
}
.fmd-root[data-fmd-color-scheme="dark"] {
	--fmd-accent-r: 179;
	--fmd-accent-g: 206;
	--fmd-accent-b: 229;
	--fmd-accent-foreground-r: 0;
	--fmd-accent-foreground-g: 0;
	--fmd-accent-foreground-b: 0;
	--fmd-body-bg-r: 0;
	--fmd-body-bg-g: 0;
	--fmd-body-bg-b: 0;
	--fmd-body-color-r: 255;
	--fmd-body-color-g: 255;
	--fmd-body-color-b: 255;
}
`;

test("Case 1", () => {
	expect(
		beautify(
			createStyles({
				"accent": "0, 0, 139",
				"accent-alt-scheme": "179, 206, 229",
				"accent-foreground": "255, 255, 255",
				"accent-foreground-alt-scheme": "0, 0, 0",
				"backdrop-opacity": "0.075",
				"backdrop-opacity-alt-scheme": "0.05",
				"background-image": 'url("https://example.com/bg-lm.jpg")',
				"background-image-alt-scheme": 'url("https://example.com/bg-dm.jpg")',
				"background-color": "255, 255, 255",
				"background-color-alt-scheme": "0, 0, 0",
				"color": "0, 0, 0",
				"color-alt-scheme": "255, 255, 255",
				"color-scheme": "light",
				"font-family": '"Inter", sans-serif',
				"font-import-url": "https://example.com/font/",
				"id": "",
			}),
			{ format: "css" },
		),
	).toBe(beautify(expectedStyles1, { format: "css" }));
});

// Case 2 (dark color scheme)

const expectedStyles2 = `
@import url("https://example.com/font/");
.fmd-root {
	--fmd-body-font-family: "Inter", sans-serif;
	--fmd-backdrop-opacity-dm: 0.05;
	--fmd-backdrop-opacity-lm: 0.075;
	--fmd-body-bg-img-dm: url("https://example.com/bg-dm.jpg");
	--fmd-body-bg-img-lm: url("https://example.com/bg-lm.jpg");
}
.fmd-root[data-fmd-color-scheme="dark"] {
	--fmd-accent-r: 179;
	--fmd-accent-g: 206;
	--fmd-accent-b: 229;
	--fmd-accent-foreground-r: 0;
	--fmd-accent-foreground-g: 0;
	--fmd-accent-foreground-b: 0;
	--fmd-body-bg-r: 0;
	--fmd-body-bg-g: 0;
	--fmd-body-bg-b: 0;
	--fmd-body-color-r: 255;
	--fmd-body-color-g: 255;
	--fmd-body-color-b: 255;
}
.fmd-root {
	--fmd-accent-r: 0;
	--fmd-accent-g: 0;
	--fmd-accent-b: 139;
	--fmd-accent-foreground-r: 255;
	--fmd-accent-foreground-g: 255;
	--fmd-accent-foreground-b: 255;
	--fmd-body-bg-r: 255;
	--fmd-body-bg-g: 255;
	--fmd-body-bg-b: 255;
	--fmd-body-color-r: 0;
	--fmd-body-color-g: 0;
	--fmd-body-color-b: 0;
}
`;

test("Case 2 (dark color scheme)", () => {
	expect(
		beautify(
			createStyles({
				"accent": "179, 206, 229",
				"accent-alt-scheme": "0, 0, 139",
				"accent-foreground": "0, 0, 0",
				"accent-foreground-alt-scheme": "255, 255, 255",
				"backdrop-opacity": "0.05",
				"backdrop-opacity-alt-scheme": "0.075",
				"background-image": 'url("https://example.com/bg-dm.jpg")',
				"background-image-alt-scheme": 'url("https://example.com/bg-lm.jpg")',
				"background-color": "0, 0, 0",
				"background-color-alt-scheme": "255, 255, 255",
				"color": "255, 255, 255",
				"color-alt-scheme": "0, 0, 0",
				"color-scheme": "dark",
				"font-family": '"Inter", sans-serif',
				"font-import-url": "https://example.com/font/",
				"id": "",
			}),
			{ format: "css" },
		),
	).toBe(beautify(expectedStyles2, { format: "css" }));
});

// Case 3 (only light color scheme)

const expectedStyles3 = `
.fmd-root {
	--fmd-body-font-family: "Inter", sans-serif;
	--fmd-backdrop-opacity-lm: 0.075;
	--fmd-body-bg-img-lm: url("https://example.com/bg-lm.jpg");
}
.fmd-root {
	--fmd-accent-r: 0;
	--fmd-accent-g: 0;
	--fmd-accent-b: 139;
	--fmd-accent-foreground-r: 255;
	--fmd-accent-foreground-g: 255;
	--fmd-accent-foreground-b: 255;
	--fmd-body-bg-r: 255;
	--fmd-body-bg-g: 255;
	--fmd-body-bg-b: 255;
	--fmd-body-color-r: 0;
	--fmd-body-color-g: 0;
	--fmd-body-color-b: 0;
}
`;

test("Case 3 (only light color scheme)", () => {
	expect(
		beautify(
			createStyles({
				"accent": "0, 0, 139",
				"accent-foreground": "255, 255, 255",
				"backdrop-opacity": "0.075",
				"background-image": 'url("https://example.com/bg-lm.jpg")',
				"background-color": "255, 255, 255",
				"color": "0, 0, 0",
				"color-scheme": "light",
				"font-family": '"Inter", sans-serif',
				"id": "",
			}),
			{ format: "css" },
		),
	).toBe(beautify(expectedStyles3, { format: "css" }));
});

// Case 4 (only dark color scheme)

const expectedStyles4 = `
.fmd-root {
	--fmd-body-font-family: "Inter", sans-serif;
	--fmd-backdrop-opacity-dm: 0.05;
	--fmd-body-bg-img-dm: url("https://example.com/bg-dm.jpg");
}
.fmd-root[data-fmd-color-scheme="dark"] {
	--fmd-accent-r: 179;
	--fmd-accent-g: 206;
	--fmd-accent-b: 229;
	--fmd-accent-foreground-r: 0;
	--fmd-accent-foreground-g: 0;
	--fmd-accent-foreground-b: 0;
	--fmd-body-bg-r: 0;
	--fmd-body-bg-g: 0;
	--fmd-body-bg-b: 0;
	--fmd-body-color-r: 255;
	--fmd-body-color-g: 255;
	--fmd-body-color-b: 255;
}
`;

test("Case 4 (only dark color scheme)", () => {
	expect(
		beautify(
			createStyles({
				"accent": "179, 206, 229",
				"accent-foreground": "0, 0, 0",
				"backdrop-opacity": "0.05",
				"background-image": 'url("https://example.com/bg-dm.jpg")',
				"background-color": "0, 0, 0",
				"color": "255, 255, 255",
				"color-scheme": "dark",
				"font-family": '"Inter", sans-serif',
				"id": "",
			}),
			{ format: "css" },
		),
	).toBe(beautify(expectedStyles4, { format: "css" }));
});

// Case 5 (only base styles)

const expectedStyles5 = `
.fmd-root {
	--fmd-body-font-family: "Inter", sans-serif;
	--fmd-backdrop-opacity-lm: 0.075;
	--fmd-backdrop-opacity-dm: 0.05;
	--fmd-body-bg-img-lm: url("https://example.com/bg-lm.jpg");
	--fmd-body-bg-img-dm: url("https://example.com/bg-dm.jpg");
}
`;

test("Case 5 (only base styles)", () => {
	expect(
		beautify(
			createStyles({
				"backdrop-opacity": "0.075",
				"backdrop-opacity-alt-scheme": "0.05",
				"background-image": 'url("https://example.com/bg-lm.jpg")',
				"background-image-alt-scheme": 'url("https://example.com/bg-dm.jpg")',
				"color-scheme": "light",
				"font-family": '"Inter", sans-serif',
				"id": "",
			}),
			{ format: "css" },
		),
	).toBe(beautify(expectedStyles5, { format: "css" }));
});

// Case 6 (different id)

const expectedStyles6 = `
@import url("https://example.com/font/");
.fmd-root[data-fmd-id="form1"] {
	--fmd-body-font-family: "Inter", sans-serif;
	--fmd-backdrop-opacity-lm: 0.075;
	--fmd-backdrop-opacity-dm: 0.05;
	--fmd-body-bg-img-lm: url("https://example.com/bg-lm.jpg");
	--fmd-body-bg-img-dm: url("https://example.com/bg-dm.jpg");
}
.fmd-root[data-fmd-id="form1"] {
	--fmd-accent-r: 0;
	--fmd-accent-g: 0;
	--fmd-accent-b: 139;
	--fmd-accent-foreground-r: 255;
	--fmd-accent-foreground-g: 255;
	--fmd-accent-foreground-b: 255;
	--fmd-body-bg-r: 255;
	--fmd-body-bg-g: 255;
	--fmd-body-bg-b: 255;
	--fmd-body-color-r: 0;
	--fmd-body-color-g: 0;
	--fmd-body-color-b: 0;
}
.fmd-root[data-fmd-id="form1"][data-fmd-color-scheme="dark"] {
	--fmd-accent-r: 179;
	--fmd-accent-g: 206;
	--fmd-accent-b: 229;
	--fmd-accent-foreground-r: 0;
	--fmd-accent-foreground-g: 0;
	--fmd-accent-foreground-b: 0;
	--fmd-body-bg-r: 0;
	--fmd-body-bg-g: 0;
	--fmd-body-bg-b: 0;
	--fmd-body-color-r: 255;
	--fmd-body-color-g: 255;
	--fmd-body-color-b: 255;
}
`;

test("Case 6 (different id)", () => {
	expect(
		beautify(
			createStyles({
				"accent": "0, 0, 139",
				"accent-alt-scheme": "179, 206, 229",
				"accent-foreground": "255, 255, 255",
				"accent-foreground-alt-scheme": "0, 0, 0",
				"backdrop-opacity": "0.075",
				"backdrop-opacity-alt-scheme": "0.05",
				"background-image": 'url("https://example.com/bg-lm.jpg")',
				"background-image-alt-scheme": 'url("https://example.com/bg-dm.jpg")',
				"background-color": "255, 255, 255",
				"background-color-alt-scheme": "0, 0, 0",
				"color": "0, 0, 0",
				"color-alt-scheme": "255, 255, 255",
				"color-scheme": "light",
				"font-family": '"Inter", sans-serif',
				"font-import-url": "https://example.com/font/",
				"id": "form1",
			}),
			{ format: "css" },
		),
	).toBe(beautify(expectedStyles6, { format: "css" }));
});

// Case 7 (dark color scheme, different id)

const expectedStyles7 = `
@import url("https://example.com/font/");
.fmd-root[data-fmd-id="mypage"] {
	--fmd-body-font-family: "Inter", sans-serif;
	--fmd-backdrop-opacity-dm: 0.05;
	--fmd-backdrop-opacity-lm: 0.075;
	--fmd-body-bg-img-dm: url("https://example.com/bg-dm.jpg");
	--fmd-body-bg-img-lm: url("https://example.com/bg-lm.jpg");
}
.fmd-root[data-fmd-id="mypage"][data-fmd-color-scheme="dark"] {
	--fmd-accent-r: 179;
	--fmd-accent-g: 206;
	--fmd-accent-b: 229;
	--fmd-accent-foreground-r: 0;
	--fmd-accent-foreground-g: 0;
	--fmd-accent-foreground-b: 0;
	--fmd-body-bg-r: 0;
	--fmd-body-bg-g: 0;
	--fmd-body-bg-b: 0;
	--fmd-body-color-r: 255;
	--fmd-body-color-g: 255;
	--fmd-body-color-b: 255;
}
.fmd-root[data-fmd-id="mypage"] {
	--fmd-accent-r: 0;
	--fmd-accent-g: 0;
	--fmd-accent-b: 139;
	--fmd-accent-foreground-r: 255;
	--fmd-accent-foreground-g: 255;
	--fmd-accent-foreground-b: 255;
	--fmd-body-bg-r: 255;
	--fmd-body-bg-g: 255;
	--fmd-body-bg-b: 255;
	--fmd-body-color-r: 0;
	--fmd-body-color-g: 0;
	--fmd-body-color-b: 0;
}
`;

test("Case 7 (dark color scheme, different id)", () => {
	expect(
		beautify(
			createStyles({
				"accent": "179, 206, 229",
				"accent-alt-scheme": "0, 0, 139",
				"accent-foreground": "0, 0, 0",
				"accent-foreground-alt-scheme": "255, 255, 255",
				"backdrop-opacity": "0.05",
				"backdrop-opacity-alt-scheme": "0.075",
				"background-image": 'url("https://example.com/bg-dm.jpg")',
				"background-image-alt-scheme": 'url("https://example.com/bg-lm.jpg")',
				"background-color": "0, 0, 0",
				"background-color-alt-scheme": "255, 255, 255",
				"color": "255, 255, 255",
				"color-alt-scheme": "0, 0, 0",
				"color-scheme": "dark",
				"font-family": '"Inter", sans-serif',
				"font-import-url": "https://example.com/font/",
				"id": "mypage",
			}),
			{ format: "css" },
		),
	).toBe(beautify(expectedStyles7, { format: "css" }));
});

// Case 8 (empty settings)

const expectedStyles8 = "";

test("Case 8 (empty settings)", () => {
	expect(
		createStyles({
			"color-scheme": "light",
			"id": "",
		}),
	).toBe(expectedStyles8);
});
