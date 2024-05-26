/**
 * Given a template string, parse the data-blocks and separate them from the
 * rest of the template. The data-blocks must be provided as valid JSON inside
 * fenced code blocks with "data" as the language.
 *
 * @param {string} template
 * @returns {{template: string, data: Object}} rest of the template and data
 */
export function parseDataBlocks(template: string): {
	template: string;
	data: any;
};
