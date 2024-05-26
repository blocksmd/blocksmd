("use strict");

const { createStyles } = require("../src/templates-create");
const beautify = require("beautify");

// Case 1

const expectedStyles1 = `
@import url("https://example.com/font/");
.bmd-root {
	--bmd-body-font-family: "Inter", sans-serif;
	--bmd-backdrop-opacity-lm: 0.075;
	--bmd-backdrop-opacity-dm: 0.05;
	--bmd-body-bg-img-lm: url("https://example.com/bg-lm.jpg");
	--bmd-body-bg-img-dm: url("https://example.com/bg-dm.jpg");
}
.bmd-root {
	--bmd-accent-r: 0;
	--bmd-accent-g: 0;
	--bmd-accent-b: 139;
	--bmd-accent-foreground-r: 255;
	--bmd-accent-foreground-g: 255;
	--bmd-accent-foreground-b: 255;
	--bmd-body-bg-r: 255;
	--bmd-body-bg-g: 255;
	--bmd-body-bg-b: 255;
	--bmd-body-color-r: 0;
	--bmd-body-color-g: 0;
	--bmd-body-color-b: 0;
}
.bmd-root[data-bmd-color-scheme="dark"] {
	--bmd-accent-r: 179;
	--bmd-accent-g: 206;
	--bmd-accent-b: 229;
	--bmd-accent-foreground-r: 0;
	--bmd-accent-foreground-g: 0;
	--bmd-accent-foreground-b: 0;
	--bmd-body-bg-r: 0;
	--bmd-body-bg-g: 0;
	--bmd-body-bg-b: 0;
	--bmd-body-color-r: 255;
	--bmd-body-color-g: 255;
	--bmd-body-color-b: 255;
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
			}),
			{ format: "css" },
		),
	).toBe(beautify(expectedStyles1, { format: "css" }));
});

// Case 2 (dark color scheme)

const expectedStyles2 = `
@import url("https://example.com/font/");
.bmd-root {
	--bmd-body-font-family: "Inter", sans-serif;
	--bmd-backdrop-opacity-dm: 0.05;
	--bmd-backdrop-opacity-lm: 0.075;
	--bmd-body-bg-img-dm: url("https://example.com/bg-dm.jpg");
	--bmd-body-bg-img-lm: url("https://example.com/bg-lm.jpg");
}
.bmd-root[data-bmd-color-scheme="dark"] {
	--bmd-accent-r: 179;
	--bmd-accent-g: 206;
	--bmd-accent-b: 229;
	--bmd-accent-foreground-r: 0;
	--bmd-accent-foreground-g: 0;
	--bmd-accent-foreground-b: 0;
	--bmd-body-bg-r: 0;
	--bmd-body-bg-g: 0;
	--bmd-body-bg-b: 0;
	--bmd-body-color-r: 255;
	--bmd-body-color-g: 255;
	--bmd-body-color-b: 255;
}
.bmd-root {
	--bmd-accent-r: 0;
	--bmd-accent-g: 0;
	--bmd-accent-b: 139;
	--bmd-accent-foreground-r: 255;
	--bmd-accent-foreground-g: 255;
	--bmd-accent-foreground-b: 255;
	--bmd-body-bg-r: 255;
	--bmd-body-bg-g: 255;
	--bmd-body-bg-b: 255;
	--bmd-body-color-r: 0;
	--bmd-body-color-g: 0;
	--bmd-body-color-b: 0;
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
			}),
			{ format: "css" },
		),
	).toBe(beautify(expectedStyles2, { format: "css" }));
});

// Case 3 (only light color scheme)

const expectedStyles3 = `
.bmd-root {
	--bmd-body-font-family: "Inter", sans-serif;
	--bmd-backdrop-opacity-lm: 0.075;
	--bmd-body-bg-img-lm: url("https://example.com/bg-lm.jpg");
}
.bmd-root {
	--bmd-accent-r: 0;
	--bmd-accent-g: 0;
	--bmd-accent-b: 139;
	--bmd-accent-foreground-r: 255;
	--bmd-accent-foreground-g: 255;
	--bmd-accent-foreground-b: 255;
	--bmd-body-bg-r: 255;
	--bmd-body-bg-g: 255;
	--bmd-body-bg-b: 255;
	--bmd-body-color-r: 0;
	--bmd-body-color-g: 0;
	--bmd-body-color-b: 0;
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
			}),
			{ format: "css" },
		),
	).toBe(beautify(expectedStyles3, { format: "css" }));
});

// Case 4 (only dark color scheme)

const expectedStyles4 = `
.bmd-root {
	--bmd-body-font-family: "Inter", sans-serif;
	--bmd-backdrop-opacity-dm: 0.05;
	--bmd-body-bg-img-dm: url("https://example.com/bg-dm.jpg");
}
.bmd-root[data-bmd-color-scheme="dark"] {
	--bmd-accent-r: 179;
	--bmd-accent-g: 206;
	--bmd-accent-b: 229;
	--bmd-accent-foreground-r: 0;
	--bmd-accent-foreground-g: 0;
	--bmd-accent-foreground-b: 0;
	--bmd-body-bg-r: 0;
	--bmd-body-bg-g: 0;
	--bmd-body-bg-b: 0;
	--bmd-body-color-r: 255;
	--bmd-body-color-g: 255;
	--bmd-body-color-b: 255;
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
			}),
			{ format: "css" },
		),
	).toBe(beautify(expectedStyles4, { format: "css" }));
});

// Case 5 (only base styles)

const expectedStyles5 = `
.bmd-root {
	--bmd-body-font-family: "Inter", sans-serif;
	--bmd-backdrop-opacity-lm: 0.075;
	--bmd-backdrop-opacity-dm: 0.05;
	--bmd-body-bg-img-lm: url("https://example.com/bg-lm.jpg");
	--bmd-body-bg-img-dm: url("https://example.com/bg-dm.jpg");
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
			}),
			{ format: "css" },
		),
	).toBe(beautify(expectedStyles5, { format: "css" }));
});

// Case 6 (empty settings)

const expectedStyles6 = "";

test("Case 6 (empty settings)", () => {
	expect(
		createStyles({
			"color-scheme": "light",
		}),
	).toBe(expectedStyles6);
});
