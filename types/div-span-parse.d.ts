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
export function parseDivs(
	template: string,
	cssPrefix: string,
): {
	template: string;
	bindDivTemplates: any;
};
/**
 * Given a template string, parse the bind <span> elements, and return the
 * template. The parsed bind <span> elements are defined within "{$ ... $}",
 * with only one variable being supported inside each "{$ ... $}".
 *
 * @param {string} template
 * @returns {string} template with parsed bind <span> elements
 */
export function parseBindSpans(template: string): string;
