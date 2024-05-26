/**
 * Parse color from a string and return the RGB values, supported types: name,
 * hex code, or RGB
 * @see {@link http://www.phpied.com/rgb-color-parser-in-javascript/}
 *
 * @param {string} colorString
 * @returns {string} RGB values
 */
export function parseColor(colorString: string): string;
/**
 * Get the default settings.
 *
 * @returns {Object}
 */
export function getDefaultSettings(): any;
/**
 * Given a template string, parse the settings and separate them from the rest
 * of the lines. Settings are lines starting with "#!".
 *
 * @param {string} template
 * @returns {{template: string, settings: Object}} rest of the template and
 * settings
 */
export function parseSettings(template: string): {
	template: string;
	settings: any;
};
