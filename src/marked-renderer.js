"use strict";

const { parseElemAttrs, addReservedClass } = require("./attrs-parse");
const {
	formFieldPattern,
	createTextField,
	createNumberField,
	createSelectField,
	createChoiceField,
	createRatingField,
	createOpinionScaleField,
	createDatetimeField,
	createFileField,
} = require("./form-field-create");
const { escape$1, cleanUrl } = require("./helpers");
const { getTranslation } = require("./translations");
const { marked } = require("marked");

/**
 * Get settings for the Marked renderer. Settings are set in the options from
 * the template.
 *
 * @param {Object} options
 * @returns {{
 *   "css-prefix": string,
 *   "form-delimiter": string,
 *   "id": string,
 *   "localization": string
 * }}
 */
function getMarkedSettings(options) {
	let markedSettings = {
		"css-prefix": "fmd-",
		"form-delimiter": "|",
		"id": "",
		"localization": "en",
	};

	// If settings not present in the options, return the defaults
	if (options.markedSettings === undefined) {
		return markedSettings;
	}

	// Update with the settings present in the options
	if (options.markedSettings["css-prefix"] !== undefined) {
		markedSettings["css-prefix"] = options.markedSettings["css-prefix"];
	}
	if (options.markedSettings["form-delimiter"] !== undefined) {
		markedSettings["form-delimiter"] = options.markedSettings["form-delimiter"];
	}
	if (options.markedSettings.id !== undefined) {
		markedSettings.id = options.markedSettings.id;
	}
	if (options.markedSettings.localization !== undefined) {
		markedSettings.localization = options.markedSettings.localization;
	}

	return markedSettings;
}

const renderer = new marked.Renderer();

renderer.blockquote = function (quote) {
	quote = quote.trim();

	// Attributes are supported on blockquotes only if they contain a child
	// paragraph with added attributes from the paragraph renderer (see below)
	const containsParagraph = quote.match(/^<p(.*?)>(.*?)<\/p>$/s);
	if (containsParagraph) {
		return `<blockquote${containsParagraph[1]}>\n<p>${containsParagraph[2]}</p>\n</blockquote>\n`;
	} else {
		return `<blockquote>\n${quote}</blockquote>\n`;
	}
};

renderer.checkbox = function (checked) {
	const markedSettings = getMarkedSettings(this.options);
	if (checked) {
		return `<div role="checkbox" class="fmd-list-check fmd-list-checked" aria-label="${getTranslation(markedSettings.localization, "list-checked")}" aria-checked="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg></div>`;
	} else {
		return `<div role="checkbox" class="fmd-list-check" aria-label="${getTranslation(markedSettings.localization, "list-check")}" aria-checked="false"></div>`;
	}
};

renderer.code = function (code, infostring, escaped) {
	const markedSettings = getMarkedSettings(this.options);
	infostring = infostring || "";
	let startTag = '<div class="fmd-code-wrapper">';

	// Parse and add attributes to the element (if they are provided)
	// Here, attributes are provided in the infostring before or after the lang
	const startAttrsIndex = infostring.indexOf("[");
	const endAttrsIndex = infostring.indexOf("]");
	let parsedAttrs = "";
	if (startAttrsIndex !== -1 && endAttrsIndex !== -1) {
		const attrs = infostring
			.substring(startAttrsIndex + 1, endAttrsIndex)
			.trim();
		infostring =
			infostring.substring(0, startAttrsIndex) +
			infostring.substring(endAttrsIndex + 1);
		infostring = infostring.trim();
		parsedAttrs = parseElemAttrs(attrs, markedSettings["css-prefix"]);
		startTag = `<div ${parsedAttrs}>`;
		startTag = addReservedClass(startTag, "fmd-code-wrapper");
	}

	// Get language and format code
	let lang = "";
	const containsLang = infostring.match(/^\S*/);
	if (containsLang) {
		lang = containsLang[0];
	}
	code = code.replace(/\n$/, "") + "\n";

	// Mermaid integration
	if (lang.toLowerCase() === "mermaid") {
		startTag = parsedAttrs ? `<div ${parsedAttrs}>` : "<div>";
		startTag = addReservedClass(startTag, "fmd-mermaid-wrapper");
		return [
			`${startTag}`,
			`	<pre class="mermaid">${code}</pre>`,
			`</div>\n`,
		].join("\n");
	}

	// Encode code and create the language class for it
	if (!escaped) {
		code = escape$1(code, true);
	}
	let langClass = "";
	if (lang) {
		langClass = ` class="language-${escape$1(lang, true)}"`;
	}

	return [
		`${startTag}`,
		`	<div class="fmd-code-header"><span>${lang}</span><button type="button" class="fmd-copy-btn">${getTranslation(markedSettings.localization, "copy-btn")}</button></div>`,
		`	<pre tabindex="0"><code${langClass}>${code}</code></pre>`,
		`</div>\n`,
	].join("\n");
};

renderer.heading = function (text, level, raw) {
	const markedSettings = getMarkedSettings(this.options);
	text = text.trim();

	// Parse and add attributes to the element (if they are provided)
	let startTag = `<h${level}>`;
	const containsAttrs = text.match(/^\[(.*?)\](.*)/s);
	if (containsAttrs) {
		let [, attrs, rest] = containsAttrs;
		startTag = `<h${level} ${parseElemAttrs(attrs, markedSettings["css-prefix"])}>`;
		text = rest.trim();
	}

	// Check if id exists and get it if it does
	// Otherwise, create id by stripping HTML from and slugifying the text
	let id;
	const containsId = startTag.match(/id="([^"]*)"/);
	if (containsId) {
		id = containsId[1];
	} else {
		id = text
			.replace(/(<([^>]+)>)/gi, "")
			.toLowerCase()
			.replace(/[^a-z0-9 -]/g, "")
			.replace(/\s+/g, "-")
			.replace(/-+/g, "-");
		if (markedSettings.id !== "") {
			id = `${markedSettings.id}:${id}`;
		}
		startTag = startTag.replace(/<([^\s>]+)/, `<$1 id="${id}"`);
	}

	return `${startTag}${text}&nbsp;<a href="#${id}" class="fmd-heading-anchor">#</a></h${level}>\n`;
};

renderer.image = function (href, title, text) {
	const cleanHref = cleanUrl(href);
	if (cleanHref === null) {
		return text;
	}
	href = cleanHref;

	let out = `<img src="${href}" loading="lazy" alt="${text}"`;
	if (title) {
		out += ` title="${title}"`;
	}
	out += ">";
	return out;
};

renderer.list = function (body, ordered, start) {
	const markedSettings = getMarkedSettings(this.options);
	const type = ordered ? "ol" : "ul";
	let startAttr = "";
	if (ordered) {
		if (start !== 0 && start !== 1) {
			startAttr = ` start="${start}"`;
		}
	}

	// Parse and add attributes to the element (if they are provided)
	// For lists, the attributes are provided inside the first <li> element
	let startTag = `<${type}${startAttr}>`;
	const containsFirstItem = body.match(/<li>(.*?)<\/li>/);
	if (containsFirstItem) {
		const firstItem = containsFirstItem[1].trim();
		const containsAttrs = firstItem.match(/^\[(.*?)\](.*)/s);
		if (containsAttrs) {
			startTag = `<${type}${startAttr} ${parseElemAttrs(containsAttrs[1], markedSettings["css-prefix"])}>`;
			body = body.replace(/<li>(.*?)<\/li>/, "").trim();
		}
	}

	return `${startTag}\n${body}</${type}>\n`;
};

renderer.paragraph = function (text) {
	const markedSettings = getMarkedSettings(this.options);
	text = text.trim();

	// Parse and add attributes to the element (if they are provided)
	let startTag = "<p>";
	let parsedAttrs = "";
	const containsAttrs = text.match(/^\[(.*?)\](.*)/s);
	if (containsAttrs) {
		let [, attrs, rest] = containsAttrs;
		parsedAttrs = parseElemAttrs(attrs, markedSettings["css-prefix"]);
		startTag = `<p ${parsedAttrs}>`;
		text = rest.trim();
	}

	// Check if paragraph is formatted as a form field
	// If yes, create the form field instead of paragraph
	const matchesFormField = text.match(formFieldPattern);
	if (matchesFormField) {
		const fieldName = matchesFormField[1];
		const fieldInputType = matchesFormField[3].toLowerCase();
		const fieldRequired = matchesFormField[2] ? true : false;
		const fieldParams = matchesFormField[4].replace(/(<([^>]+)>)/gi, ""); // Strip all HTML tags from the params
		try {
			if (
				fieldInputType === "textinput" ||
				fieldInputType === "emailinput" ||
				fieldInputType === "urlinput" ||
				fieldInputType === "telinput" ||
				fieldInputType === "passwordinput"
			) {
				return createTextField(
					fieldName,
					fieldInputType.replace("input", ""),
					fieldRequired,
					parsedAttrs,
					fieldParams,
					markedSettings["form-delimiter"],
					markedSettings.id,
					markedSettings.localization,
				);
			} else if (fieldInputType === "numberinput") {
				return createNumberField(
					fieldName,
					fieldRequired,
					parsedAttrs,
					fieldParams,
					markedSettings["form-delimiter"],
					markedSettings.id,
					markedSettings.localization,
				);
			} else if (fieldInputType === "selectbox") {
				return createSelectField(
					fieldName,
					fieldRequired,
					parsedAttrs,
					fieldParams,
					markedSettings["form-delimiter"],
					markedSettings.id,
					markedSettings.localization,
				);
			} else if (
				fieldInputType === "choiceinput" ||
				fieldInputType === "picturechoice"
			) {
				return createChoiceField(
					fieldName,
					fieldInputType === "picturechoice" ? true : false,
					fieldRequired,
					parsedAttrs,
					fieldParams,
					markedSettings["form-delimiter"],
					markedSettings.id,
					markedSettings.localization,
				);
			} else if (fieldInputType === "ratinginput") {
				return createRatingField(
					fieldName,
					fieldRequired,
					parsedAttrs,
					fieldParams,
					markedSettings["form-delimiter"],
					markedSettings.id,
					markedSettings.localization,
				);
			} else if (fieldInputType === "opinionscale") {
				return createOpinionScaleField(
					fieldName,
					fieldRequired,
					parsedAttrs,
					fieldParams,
					markedSettings["form-delimiter"],
					markedSettings.id,
					markedSettings.localization,
				);
			} else if (
				fieldInputType === "datetimeinput" ||
				fieldInputType === "dateinput" ||
				fieldInputType === "timeinput"
			) {
				return createDatetimeField(
					fieldName,
					fieldInputType.replace("input", ""),
					fieldRequired,
					parsedAttrs,
					fieldParams,
					markedSettings["form-delimiter"],
					markedSettings.id,
					markedSettings.localization,
				);
			} else if (fieldInputType === "fileinput") {
				return createFileField(
					fieldName,
					fieldRequired,
					parsedAttrs,
					fieldParams,
					markedSettings["form-delimiter"],
					markedSettings.id,
					markedSettings.localization,
				);
			}
		} catch (error) {
			console.warn(error);
		}
	}

	return `${startTag}${text}</p>\n`;
};

renderer.table = function (header, body) {
	if (body) {
		body = `<tbody>${body}</tbody>`;
	}
	return [
		`<table class="fmd-table">`,
		`	<thead>${header}</thead>`,
		`	${body}`,
		`</table>\n`,
	].join("\n");
};

exports.renderer = renderer;
