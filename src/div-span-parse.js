"use strict";

const { parseElemAttrs, addReservedClass } = require("./attrs-parse");

/**
 * Given a template string, parse the <div> elements, and return the template.
 * The opening and closing tags of the <div> elements are identified by pairs
 * of triple colons ":::". Nesting is not supported.
 *
 * @param {string} template
 * @param {string} cssPrefix
 * @returns {{template: string, bindDivTemplates: Object}} template with
 * parsed <div> elements, bind <div> templates
 */
function parseDivs(template, cssPrefix) {
	const bindDivTemplates = {};
	let bindDivCount = 0;
	template = template.replace(/:::\s*(.*?)\s*:::/gs, function (match, content) {
		content = content.trim();

		// Parse and add attributes to the element (if they are provided)
		let startTag = "<div>";
		const containsAttrs = content.match(/^\[(.*?)\](.*)/s);
		if (containsAttrs) {
			let [, attrs, rest] = containsAttrs;

			// Replace multiple spaces with a single space
			attrs = attrs.replace(/\s\s+/g, " ");

			// Parse the data-binding attributes
			// Data-binding attributes are defined within "{$ ... $}" separated by
			// empty spaces, and they are only supported on <div> elements
			let bindAttrs = [];
			let bindAttrsStr = "";
			let bindTemplateRefId = "";
			const startBindIndex = attrs.indexOf("{$");
			const endBindIndex = attrs.indexOf("$}");
			if (
				startBindIndex !== -1 &&
				endBindIndex !== -1 &&
				startBindIndex < endBindIndex
			) {
				const extracted = attrs
					.substring(startBindIndex + 2, endBindIndex)
					.split(" ");
				for (let attr of extracted) {
					attr = attr.trim();
					if (attr) {
						bindAttrs.push(`data-fmd-bind-${attr}`);
					}
				}
				attrs =
					attrs.substring(0, startBindIndex) +
					attrs.substring(endBindIndex + 2);
			}

			content = `\n\n${rest.trim()}\n\n`;

			// If data-binding attributes are present, add those attributes
			// Also save the content and reference
			if (bindAttrs.length > 0) {
				bindAttrsStr = ` ${bindAttrs.join(" ")} data-fmd-bind-template-ref="${bindDivCount.toString()}"`;
				bindDivTemplates[bindDivCount.toString()] = content;
				bindDivCount += 1;
			}

			// Remove any other data-binding sections and parse attributes
			attrs = attrs.replace(/\{\$.*?\$\}/g, "");
			startTag = `<div ${parseElemAttrs(attrs, cssPrefix)}${bindAttrsStr}>`;
		} else {
			content = `\n\n${content}\n\n`;
		}

		// Add the reserved class name to the start tag
		startTag = addReservedClass(startTag, "fmd-grid");

		return `\n${startTag}${content}</div>\n`;
	});

	return {
		template: template,
		bindDivTemplates: bindDivTemplates,
	};
}

/**
 * Given a template string, parse the bind <span> elements, and return the
 * template. The parsed bind <span> elements are defined within "{$ ... $}",
 * with only one variable being supported inside each "{$ ... $}".
 *
 * @param {string} template
 * @returns {string} template with parsed bind <span> elements
 */
function parseBindSpans(template) {
	return template.replace(
		/\{\$\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\$\}/g,
		"<span data-fmd-bind-$1>{{ $1 }}</span>",
	);
}

exports.parseDivs = parseDivs;
exports.parseBindSpans = parseBindSpans;
