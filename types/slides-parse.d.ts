/**
 * Given a template, parse the slide and return a ready-to-use HTML string
 * (with Markdown content inside).
 *
 * Differences between first slide and start slides:
 *
 * - The first slide is the very first slide to render on the template.
 * - Start slides simply use a slightly altered template.
 * - The first slide cannot have a jump condition or a page progress.
 * - A start slide may or may not be the first slide.
 *
 * @param {string} template
 * @param {boolean} isForm
 * @param {boolean} isFirstSlide
 * @param {{hideRestartBtn: boolean, submitBtnText: string}} btnSettings
 * @param {string} localization
 * @returns {{template: string, slideType:"start"|"body"|"end"}} template with
 * parsed slides, type of the slide
 */
export function parseSlide(
	template: string,
	isForm: boolean,
	isFirstSlide: boolean,
	btnSettings: {
		hideRestartBtn: boolean;
		submitBtnText: string;
	},
	localization: string,
): {
	template: string;
	slideType: "start" | "body" | "end";
};
/**
 * Given a template string, parse the slides. Slides are created wherever the
 * slide delimiter is used. By default, this is set to "---" in the state.
 *
 * @param {string} template
 * @param {boolean} isForm
 * @param {{hideRestartBtn: boolean, submitBtnText: string}} btnSettings
 * @param {string} localization
 * @param {string} slideDelimiter
 * @returns {string} template with parsed slides
 */
export function parseSlides(
	template: string,
	isForm: boolean,
	btnSettings: {
		hideRestartBtn: boolean;
		submitBtnText: string;
	},
	localization: string,
	slideDelimiter: string,
): string;
