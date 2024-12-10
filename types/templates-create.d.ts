/**
 * Create the CSS styles using the settings.
 *
 * @param {Object} settings
 * @returns {string} the contents of the stylesheet
 */
export function createStyles(settings: any): string;
export const madeInLoaderTemplate: '\n<div class="bmd-backdrop"></div>\n\n<main class="bmd-main">\n\t<div class="bmd-main-container">\n\t\t<div class="bmd-loader-container">\n\t\t\t<div class="bmd-text-center bmd-mb-3">\n\t\t\t\t{% if settings["formsmd-branding"] != "hide" %}\n\t\t\t\t{{ translations.madeInLoader | safe }}\n\t\t\t\t{% else %}\n\t\t\t\t<div class="bmd-specific-fs-20 bmd-text-emphasis bmd-fw-bold">{{ translations.loading }}...</div>\n\t\t\t\t{% endif %}\n\t\t\t</div>\n\t\t\t<div class="bmd-loader-progress" role="status" aria-label="{{ translations.loading }}"></div>\n\t\t</div>\n\t</div>\n</main>\n';
/**
 * Create the body template.
 *
 * @param {Object} settings
 * @returns {{template: string, settings: Object}} the template and the
 * updated settings
 */
export function createBodyTemplate(settings: any): {
	template: string;
	settings: any;
};
/**
 * Create the content template.
 *
 * @param {string} template
 * @param {Object} settings
 * @param {Object} data
 * @param {boolean} windowAndSanitize
 * @returns {{template: string, bindDivTemplates: Object}} template and bind
 * <div> templates
 */
export function createContentTemplate(
	template: string,
	settings: any,
	data: any,
	windowAndSanitize: boolean,
): {
	template: string;
	bindDivTemplates: any;
};
