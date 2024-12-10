"use strict";

const { unescape } = require("./helpers");

/**
 * Parse color from a string and return the RGB values, supported types: name,
 * hex code, or RGB
 * @see {@link http://www.phpied.com/rgb-color-parser-in-javascript/}
 *
 * @param {string} colorString
 * @returns {string} RGB values
 */
function parseColor(colorString) {
	let ok = false;
	let r, g, b;

	// Strip any leading #
	if (colorString.charAt(0) == "#") {
		colorString = colorString.substr(1, 6);
	}

	colorString = colorString.replace(/ /g, "");
	colorString = colorString.toLowerCase();

	// First try simple HTML color names
	const simpleColors = {
		aliceblue: "f0f8ff",
		antiquewhite: "faebd7",
		aqua: "00ffff",
		aquamarine: "7fffd4",
		azure: "f0ffff",
		beige: "f5f5dc",
		bisque: "ffe4c4",
		black: "000000",
		blanchedalmond: "ffebcd",
		blue: "0000ff",
		blueviolet: "8a2be2",
		brown: "a52a2a",
		burlywood: "deb887",
		cadetblue: "5f9ea0",
		chartreuse: "7fff00",
		chocolate: "d2691e",
		coral: "ff7f50",
		cornflowerblue: "6495ed",
		cornsilk: "fff8dc",
		crimson: "dc143c",
		cyan: "00ffff",
		darkblue: "00008b",
		darkcyan: "008b8b",
		darkgoldenrod: "b8860b",
		darkgray: "a9a9a9",
		darkgreen: "006400",
		darkkhaki: "bdb76b",
		darkmagenta: "8b008b",
		darkolivegreen: "556b2f",
		darkorange: "ff8c00",
		darkorchid: "9932cc",
		darkred: "8b0000",
		darksalmon: "e9967a",
		darkseagreen: "8fbc8f",
		darkslateblue: "483d8b",
		darkslategray: "2f4f4f",
		darkturquoise: "00ced1",
		darkviolet: "9400d3",
		deeppink: "ff1493",
		deepskyblue: "00bfff",
		dimgray: "696969",
		dodgerblue: "1e90ff",
		feldspar: "d19275",
		firebrick: "b22222",
		floralwhite: "fffaf0",
		forestgreen: "228b22",
		fuchsia: "ff00ff",
		gainsboro: "dcdcdc",
		ghostwhite: "f8f8ff",
		gold: "ffd700",
		goldenrod: "daa520",
		gray: "808080",
		green: "008000",
		greenyellow: "adff2f",
		honeydew: "f0fff0",
		hotpink: "ff69b4",
		indianred: "cd5c5c",
		indigo: "4b0082",
		ivory: "fffff0",
		khaki: "f0e68c",
		lavender: "e6e6fa",
		lavenderblush: "fff0f5",
		lawngreen: "7cfc00",
		lemonchiffon: "fffacd",
		lightblue: "add8e6",
		lightcoral: "f08080",
		lightcyan: "e0ffff",
		lightgoldenrodyellow: "fafad2",
		lightgrey: "d3d3d3",
		lightgreen: "90ee90",
		lightpink: "ffb6c1",
		lightsalmon: "ffa07a",
		lightseagreen: "20b2aa",
		lightskyblue: "87cefa",
		lightslateblue: "8470ff",
		lightslategray: "778899",
		lightsteelblue: "b0c4de",
		lightyellow: "ffffe0",
		lime: "00ff00",
		limegreen: "32cd32",
		linen: "faf0e6",
		magenta: "ff00ff",
		maroon: "800000",
		mediumaquamarine: "66cdaa",
		mediumblue: "0000cd",
		mediumorchid: "ba55d3",
		mediumpurple: "9370d8",
		mediumseagreen: "3cb371",
		mediumslateblue: "7b68ee",
		mediumspringgreen: "00fa9a",
		mediumturquoise: "48d1cc",
		mediumvioletred: "c71585",
		midnightblue: "191970",
		mintcream: "f5fffa",
		mistyrose: "ffe4e1",
		moccasin: "ffe4b5",
		navajowhite: "ffdead",
		navy: "000080",
		oldlace: "fdf5e6",
		olive: "808000",
		olivedrab: "6b8e23",
		orange: "ffa500",
		orangered: "ff4500",
		orchid: "da70d6",
		palegoldenrod: "eee8aa",
		palegreen: "98fb98",
		paleturquoise: "afeeee",
		palevioletred: "d87093",
		papayawhip: "ffefd5",
		peachpuff: "ffdab9",
		peru: "cd853f",
		pink: "ffc0cb",
		plum: "dda0dd",
		powderblue: "b0e0e6",
		purple: "800080",
		red: "ff0000",
		rosybrown: "bc8f8f",
		royalblue: "4169e1",
		saddlebrown: "8b4513",
		salmon: "fa8072",
		sandybrown: "f4a460",
		seagreen: "2e8b57",
		seashell: "fff5ee",
		sienna: "a0522d",
		silver: "c0c0c0",
		skyblue: "87ceeb",
		slateblue: "6a5acd",
		slategray: "708090",
		snow: "fffafa",
		springgreen: "00ff7f",
		steelblue: "4682b4",
		tan: "d2b48c",
		teal: "008080",
		thistle: "d8bfd8",
		tomato: "ff6347",
		turquoise: "40e0d0",
		violet: "ee82ee",
		violetred: "d02090",
		wheat: "f5deb3",
		white: "ffffff",
		whitesmoke: "f5f5f5",
		yellow: "ffff00",
		yellowgreen: "9acd32",
	};
	for (let key in simpleColors) {
		if (colorString == key) {
			colorString = simpleColors[key];
		}
	}

	// Array of color definition objects
	const colorDefs = [
		{
			re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
			example: ["rgb(123, 234, 45)", "rgb(255,234,245)"],
			process: function (bits) {
				return [parseInt(bits[1]), parseInt(bits[2]), parseInt(bits[3])];
			},
		},
		{
			re: /^(\w{2})(\w{2})(\w{2})$/,
			example: ["#00ff00", "336699"],
			process: function (bits) {
				return [
					parseInt(bits[1], 16),
					parseInt(bits[2], 16),
					parseInt(bits[3], 16),
				];
			},
		},
		{
			re: /^(\w{1})(\w{1})(\w{1})$/,
			example: ["#fb0", "f0f"],
			process: function (bits) {
				return [
					parseInt(bits[1] + bits[1], 16),
					parseInt(bits[2] + bits[2], 16),
					parseInt(bits[3] + bits[3], 16),
				];
			},
		},
	];

	// Search through the definitions to find a match
	for (let i = 0; i < colorDefs.length; i++) {
		const re = colorDefs[i].re;
		const processor = colorDefs[i].process;
		const bits = re.exec(colorString);
		if (bits) {
			const channels = processor(bits);
			r = channels[0];
			g = channels[1];
			b = channels[2];
			ok = true;
		}
	}

	if (ok) {
		// Validate/cleanup values
		r = r < 0 || isNaN(r) ? 0 : r > 255 ? 255 : r;
		g = g < 0 || isNaN(g) ? 0 : g > 255 ? 255 : g;
		b = b < 0 || isNaN(b) ? 0 : b > 255 ? 255 : b;
		return `${r}, ${g}, ${b}`;
	} else {
		throw "Not a valid color (name, hex code, or RGB)";
	}
}

/**
 * Get the default settings.
 *
 * @returns {Object}
 */
function getDefaultSettings() {
	return {
		"color-scheme": "light",
		"color-scheme-scope": "domain-wide",
		"css-prefix": "fmd-",
		"dir": "ltr",
		"form-delimiter": "|",
		"get-format": "json",
		"get-objects-name": "objects",
		"id": "",
		"localization": "en",
		"page": "form-slides",
		"slide-delimiter": "---",
	};
}

/**
 * Given a template string, parse the settings and separate them from the rest
 * of the lines. Settings are lines starting with "#!".
 *
 * @param {string} template
 * @returns {{template: string, settings: Object}} rest of the template and
 * settings
 */
function parseSettings(template) {
	// Settings references
	const settingsRef = {
		"accent": {
			accepted: "valid color (name, hex code, or RGB)",
		},
		"accent-alt-scheme": {
			accepted: "valid color (name, hex code, or RGB)",
		},
		"accent-foreground": {
			accepted: "valid color (name, hex code, or RGB)",
		},
		"accent-foreground-alt-scheme": {
			accepted: "valid color (name, hex code, or RGB)",
		},
		"autofocus": {
			pattern: /^all-slides$/,
			accepted: "all-slides",
		},
		"backdrop-opacity": {
			pattern: /^[0-9.]+%?$/,
			accepted: "valid positive number or percentage",
		},
		"backdrop-opacity-alt-scheme": {
			pattern: /^[0-9.]+%?$/,
			accepted: "valid positive number or percentage",
		},
		"background-color": {
			accepted: "valid color (name, hex code, or RGB)",
		},
		"background-color-alt-scheme": {
			accepted: "valid color (name, hex code, or RGB)",
		},
		"background-image": {
			pattern: /^.*$/,
			accepted: "valid CSS for background-image",
		},
		"background-image-alt-scheme": {
			pattern: /^.*$/,
			accepted: "valid CSS for background-image",
		},
		"brand": {
			pattern: /^!\[.*\]\(.*\)$/s,
			accepted:
				"Markdown image, example: ![Example logo](https://example.com/logo.png)",
		},
		"brand-alt-scheme": {
			pattern: /^!\[.*\]\(.*\)$/s,
			accepted:
				"Markdown image, example: ![Example logo](https://example.com/logo.png)",
		},
		"button-alignment": {
			pattern: /^(center|end|stretch)$/,
			accepted: "center || end || stretch",
		},
		"color": {
			accepted: "valid color (name, hex code, or RGB)",
		},
		"color-alt-scheme": {
			accepted: "valid color (name, hex code, or RGB)",
		},
		"color-scheme": {
			pattern: /^(light|dark)$/,
			accepted: "light (default) || dark",
		},
		"color-scheme-scope": {
			pattern: /^(domain-wide|isolate)$/,
			accepted: "domain-wide (default) || isolate",
		},
		"color-scheme-toggle": {
			pattern: /^show$/,
			accepted: "show",
		},
		"css-prefix": {
			pattern: /^.*$/,
			accepted: "valid string",
		},
		"cta": {
			pattern: /^\[.*\]\(.*\)$/s,
			accepted:
				"Markdown link, example: [Sign Up](https://example.com/sign-up/)",
		},
		"dir": {
			pattern: /^(ltr|rtl)$/,
			accepted: "ltr (default) || rtl",
		},
		"favicon": {
			pattern: /^.*$/,
			accepted: "valid path to favicon",
		},
		"field-size": {
			pattern: /^sm$/,
			accepted: "sm",
		},
		"font-family": {
			pattern: /^.*$/,
			accepted: "valid font family",
		},
		"font-import-url": {
			pattern: /^.*$/,
			accepted: "valid URL to font",
		},
		"font-size": {
			pattern: /^(sm|lg)$/,
			accepted: "sm || lg",
		},
		"footer": {
			pattern: /^(hide|show)$/,
			accepted: "hide || show",
		},
		"form-delimiter": {
			pattern: /^.*$/,
			accepted: "valid string",
		},
		"formsmd-branding": {
			pattern: /^(hide|show)$/,
			accepted: "hide || show",
		},
		"form-style": {
			pattern: /^classic$/,
			accepted: "classic",
		},
		"get-format": {
			pattern: /^(json|csv|tsv)$/,
			accepted: "json (default) || csv || tsv",
		},
		"get-objects-name": {
			pattern: /^.*$/,
			accepted: "valid string",
		},
		"get-url": {
			pattern: /^.*$/,
			accepted: "valid URL",
		},
		"header": {
			pattern: /^(align|hide|show)$/,
			accepted: "align || hide || show",
		},
		"headings": {
			pattern: /^anchored$/,
			accepted: "anchored",
		},
		"id": {
			pattern: /^[a-zA-Z][\w:.-]*$/,
			accepted: "valid HTML id",
		},
		"label-style": {
			pattern: /^classic$/,
			accepted: "classic",
		},
		"localization": {
			pattern: /^.*$/,
			accepted: "valid string",
		},
		"meta-author": {
			pattern: /^.*$/,
			accepted: "valid string",
		},
		"meta-description": {
			pattern: /^.*$/,
			accepted: "valid string",
		},
		"meta-image": {
			pattern: /^.*$/,
			accepted: "valid URL to image",
		},
		"meta-keywords": {
			pattern: /^.*$/,
			accepted: "comma-separated values",
		},
		"meta-type": {
			pattern: /^.*$/,
			accepted: "valid string",
		},
		"meta-url": {
			pattern: /^.*$/,
			accepted: "valid URL",
		},
		"page": {
			pattern: /^(form-slides|slides|single)$/,
			accepted: "form-slides (default) || slides || single",
		},
		"page-progress": {
			pattern: /^(hide|show|decorative)$/,
			accepted: "hide || show || decorative",
		},
		"placeholders": {
			pattern: /^(hide|show)$/,
			accepted: "hide || show",
		},
		"post-sheet-name": {
			pattern: /^.*$/,
			accepted: "valid string",
		},
		"post-url": {
			pattern: /^.*$/,
			accepted: "valid URL",
		},
		"restart-button": {
			pattern: /^show$/,
			accepted: "show",
		},
		"rounded": {
			pattern: /^(none|pill)$/,
			accepted: "none || pill",
		},
		"slide-controls": {
			pattern: /^(hide|show)$/,
			accepted: "hide || show",
		},
		"slide-delimiter": {
			pattern: /^.*$/,
			accepted: "valid string",
		},
		"submit-button-text": {
			pattern: /^.*$/,
			accepted: "valid string",
		},
		"title": {
			pattern: /^.*$/,
			accepted: "valid string",
		},
		"vertical-alignment": {
			pattern: /^start$/,
			accepted: "start",
		},
	};

	// Go through each line to extract settings
	// The rest of the lines are also separated
	const lines = template.split("\n");
	const userSettings = {};
	const restLines = [];
	for (let line of lines) {
		if (line.trim().startsWith("#!")) {
			line = line.trim();
			line = line.slice(2);

			// A setting is only accepted if it contains a "=" to provide the value
			let equalIndex = line.indexOf("=");
			if (equalIndex !== -1) {
				let key = line.slice(0, equalIndex).trim();
				let value = line.slice(equalIndex + 1).trim();

				// Settings ending with "-alt-scheme" are not accepted from user
				// They are reserved to be set here if the user put 2 values with "||"
				if (!key.endsWith("-alt-scheme")) {
					let valueSplit = value.split("||");
					userSettings[key] = valueSplit[0].trim();
					if (valueSplit.length > 1) {
						userSettings[`${key}-alt-scheme`] = valueSplit[1].trim();
					}
				}
			}
		} else {
			restLines.push(line);
		}
	}

	// Validate the user settings
	const settings = {};
	for (let [key, value] of Object.entries(userSettings)) {
		// Discard settings where the value is an empty string
		if (value === "") {
			continue;
		}

		// Make sure only accepted settings are available later
		if (!(key in settingsRef)) {
			// Unacceptable settings ending with "-alt-scheme" are discarded
			if (!key.endsWith("-alt-scheme")) {
				console.warn(`[SETTINGS] "${key}" is not a valid setting`);
			}
			continue;
		}

		// Validate each item to make sure all values are acceptable
		// Colors are converted to RGB values
		// Other values are decoded, and escaped new lines are replaced with
		// actual ones (mainly for "form-delimiter")
		let valueInvalid = false;
		if (
			key === "accent" ||
			key === "accent-alt-scheme" ||
			key === "accent-foreground" ||
			key === "accent-foreground-alt-scheme" ||
			key === "background-color" ||
			key === "background-color-alt-scheme" ||
			key === "color" ||
			key === "color-alt-scheme"
		) {
			try {
				settings[key] = parseColor(value);
			} catch {
				valueInvalid = true;
			}
		} else if (key === "css-prefix") {
			if (value.match(settingsRef[key].pattern)) {
				settings[key] =
					value === "none" ? "" : unescape(value.replace(/\\n/g, "\n"));
			} else {
				valueInvalid = true;
			}
		} else {
			if (value.match(settingsRef[key].pattern)) {
				settings[key] = unescape(value.replace(/\\n/g, "\n"));
			} else {
				valueInvalid = true;
			}
		}

		// Settings ending with "-alt-scheme" are not accepted from user
		// Therefore, warning messages will remove that part of the key
		if (valueInvalid) {
			let keyForUser = key;
			if (key.endsWith("-alt-scheme")) {
				keyForUser = key.substring(0, key.length - "-alt-scheme".length);
			}
			console.warn(
				`[SETTINGS] "${keyForUser}" value "${value}" is not valid, accepted: ${settingsRef[key].accepted}`,
			);
		}
	}

	return {
		template: restLines.join("\n"),
		settings: settings,
	};
}

exports.parseColor = parseColor;
exports.getDefaultSettings = getDefaultSettings;
exports.parseSettings = parseSettings;
