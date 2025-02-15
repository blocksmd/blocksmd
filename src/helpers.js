"use strict";

/**
 * Given a string, check if it is a valid number.
 *
 * @param {string} str
 * @returns {boolean}
 */
function isNumeric(str) {
	if (typeof str != "string") {
		return false;
	} // Only process strings
	return (
		!isNaN(str) && // Use type coercion to parse the entirety of the string (`parseFloat` alone does not do this)
		!isNaN(parseFloat(str)) // Ensure strings of whitespace fail
	);
}

exports.isNumeric = isNumeric;

// The following is copied from Marked
// https://github.com/markedjs/marked/

const escapeTest = /[&<>"']/;
const escapeReplace = new RegExp(escapeTest.source, "g");
const escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
const escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g");
const escapeReplacements = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#39;",
};
const getEscapeReplacement = (ch) => escapeReplacements[ch];

function escape$1(html, encode) {
	if (encode) {
		if (escapeTest.test(html)) {
			return html.replace(escapeReplace, getEscapeReplacement);
		}
	} else {
		if (escapeTestNoEncode.test(html)) {
			return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
		}
	}
	return html;
}

function cleanUrl(href) {
	try {
		href = encodeURI(href).replace(/%25/g, "%");
	} catch (e) {
		return null;
	}
	return href;
}

exports.escape$1 = escape$1;
exports.cleanUrl = cleanUrl;

// The following is copied from Lodash
// https://github.com/lodash/lodash/

const htmlUnescapes = {
	"&amp;": "&",
	"&lt;": "<",
	"&gt;": ">",
	"&quot;": '"',
	"&#39;": "'",
};
const reEscapedHtml = /&(?:amp|lt|gt|quot|#(0+)?39);/g;
const reHasEscapedHtml = RegExp(reEscapedHtml.source);

function unescape(string) {
	return string && reHasEscapedHtml.test(string)
		? string.replace(reEscapedHtml, (entity) => htmlUnescapes[entity] || "'")
		: string || "";
}

exports.unescape = unescape;
