"use strict";

/**
 * Given a template string, parse the data-blocks and separate them from the
 * rest of the template. The data-blocks must be provided as valid JSON inside
 * fenced code blocks with "data" as the language.
 *
 * @param {string} template
 * @returns {{template: string, data: Object}} rest of the template and data
 */
function parseDataBlocks(template) {
	const data = [];
	let dataBlockCount = 1;

	function parseDataBlock(match, content) {
		content = content.trim();
		try {
			data.push(JSON.parse(content));
		} catch {
			console.warn(
				`[DATA] Data-block #${dataBlockCount.toString()} ignored because of invalid JSON`,
			);
		}
		dataBlockCount += 1;
		return "";
	}
	template = template.replace(/```\s*data\s*(.*?)\s*```/gis, parseDataBlock);
	template = template.replace(/~~~\s*data\s*(.*?)\s*~~~/gis, parseDataBlock);

	return {
		template: template,
		data: data.reduce((acc, obj) => Object.assign(acc, obj), {}), // Combine
	};
}

exports.parseDataBlocks = parseDataBlocks;
