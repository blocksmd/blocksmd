"use strict";

const { unescape } = require("./helpers");

/**
 * Given a string, parse and return the attributes as a ready-for-DOM string.
 * In the input, id starts with "#", class names start with ".", and other
 * attributes are defined as is.
 *
 * @param {string} attrs
 * @param {string} cssPrefix
 * @returns {string} parsed attributes as a ready-for-DOM string
 */
function parseElemAttrs(attrs, cssPrefix) {
	// Replace multiple spaces with a single space
	// Also unescape the necessary HTML entitites
	attrs = unescape(attrs.replace(/\s\s+/g, " "));

	// Split the attributes string wherever there's an empty space
	// But only if the empty space is not inside single or double quotes
	let splitAttrs = [];
	let insideSingleQuotes = false;
	let insideDoubleQuotes = false;
	let currentWord = "";

	for (let i = 0; i < attrs.length; i++) {
		const char = attrs[i];

		if (char === "'" && !insideDoubleQuotes) {
			insideSingleQuotes = !insideSingleQuotes;
			currentWord += char;
		} else if (char === '"' && !insideSingleQuotes) {
			insideDoubleQuotes = !insideDoubleQuotes;
			currentWord += char;
		} else if (char === " " && !insideSingleQuotes && !insideDoubleQuotes) {
			if (currentWord !== "") {
				splitAttrs.push(currentWord);
				currentWord = "";
			}
		} else {
			currentWord += char;
		}
	}

	if (currentWord !== "") {
		splitAttrs.push(currentWord);
	}

	// Prepare and return the parsed attributes as a ready-for-DOM string
	let id = "";
	const classNames = [];
	const otherAttrs = [];
	const parsedAttrs = [];

	for (let attr of splitAttrs) {
		attr = attr.trim();
		if (attr.startsWith("#")) {
			id = attr.substring(1);
		} else if (attr.startsWith(".")) {
			classNames.push(`${cssPrefix}${attr.substring(1)}`);
		} else {
			// Replace all single-quotes with double-quotes (for standardization)
			otherAttrs.push(attr.replace(/'/g, '"'));
		}
	}

	if (id) {
		parsedAttrs.push(`id="${id}"`);
	}
	if (classNames.length > 0) {
		parsedAttrs.push(`class="${classNames.join(" ")}"`);
	}
	if (otherAttrs.length > 0) {
		parsedAttrs.push(otherAttrs.join(" "));
	}

	return parsedAttrs.join(" ");
}

/**
 * Given a tag (as a string) and a class name, add the name inside the
 * `class="..."` attribute. Please note, this method assumes that class names
 * are inside double quotes, NOT single quotes.
 *
 * @param {string} tag
 * @param {string} name
 * @returns {string} tag after adding the class name
 */
function addReservedClass(tag, name) {
	// Return tag if name is empty string or only white-space
	name = name.trim();
	if (!name) {
		return tag;
	}

	const classRegex = /class="([^"]*)"/;
	const containsClass = tag.match(classRegex);
	if (containsClass) {
		const classes = containsClass[1].split(" ");
		if (!classes.includes(name)) {
			classes.push(name);
		}
		return tag.replace(classRegex, `class="${classes.join(" ")}"`);
	} else {
		return tag.replace(/<([^\s>]+)/, `<$1 class="${name}"`);
	}
}

exports.parseElemAttrs = parseElemAttrs;
exports.addReservedClass = addReservedClass;
