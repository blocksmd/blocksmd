export const formFieldPattern: RegExp;
/**
 * Generate the start tag and validate shared params for creating form fields.
 *
 * @param {boolean} required
 * @param {string} parsedAttrs
 * @param {string} params
 * @param {string} formDelimiter
 * @param {string} localization
 * @param {boolean} useFieldset
 * @returns {{startTag: string, validParams: Object, restParams: Object}}
 * start tag, validated params, rest of the params
 */
export function formFieldSetup(
	required: boolean,
	parsedAttrs: string,
	params: string,
	formDelimiter: string,
	localization: string,
	useFieldset: boolean,
): {
	startTag: string;
	validParams: any;
	restParams: any;
};
/**
 * Create a text form field. Supported types are "text", "email", "url",
 * "tel", and "password". For the multiline "text" type, the <textarea>
 * element is used.
 *
 * @param {string} name
 * @param {"text"|"email"|"url"|"tel"|"password"} inputType
 * @param {boolean} required
 * @param {string} parsedAttrs
 * @param {string} params
 * @param {string} formDelimiter
 * @param {string} id - the id of the page/form
 * @param {string} localization
 * @returns {string} text input form field as HTML string
 */
export function createTextField(
	name: string,
	inputType: "text" | "email" | "url" | "tel" | "password",
	required: boolean,
	parsedAttrs: string,
	params: string,
	formDelimiter: string,
	id: string,
	localization: string,
): string;
/**
 * Create a number form field.
 *
 * @param {string} name
 * @param {boolean} required
 * @param {string} parsedAttrs
 * @param {string} params
 * @param {string} formDelimiter
 * @param {string} id - the id of the page/form
 * @param {string} localization
 * @returns {string} number input form field as HTML string
 */
export function createNumberField(
	name: string,
	required: boolean,
	parsedAttrs: string,
	params: string,
	formDelimiter: string,
	id: string,
	localization: string,
): string;
/**
 * Create a select form field.
 *
 * @param {string} name
 * @param {boolean} required
 * @param {string} parsedAttrs
 * @param {string} params
 * @param {string} formDelimiter
 * @param {string} id - the id of the page/form
 * @param {string} localization
 * @returns {string} select box form field as HTML string
 */
export function createSelectField(
	name: string,
	required: boolean,
	parsedAttrs: string,
	params: string,
	formDelimiter: string,
	id: string,
	localization: string,
): string;
/**
 * Create a choice form field.
 *
 * @param {string} name
 * @param {boolean} isPictureChoice
 * @param {boolean} required
 * @param {string} parsedAttrs
 * @param {string} params
 * @param {string} formDelimiter
 * @param {string} id - the id of the page/form
 * @param {string} localization
 * @returns {string} choice input form field as HTML string
 */
export function createChoiceField(
	name: string,
	isPictureChoice: boolean,
	required: boolean,
	parsedAttrs: string,
	params: string,
	formDelimiter: string,
	id: string,
	localization: string,
): string;
/**
 * Create a rating form field.
 *
 * @param {string} name
 * @param {boolean} required
 * @param {string} parsedAttrs
 * @param {string} params
 * @param {string} formDelimiter
 * @param {string} id - the id of the page/form
 * @param {string} localization
 * @returns {string} rating input form field as HTML string
 */
export function createRatingField(
	name: string,
	required: boolean,
	parsedAttrs: string,
	params: string,
	formDelimiter: string,
	id: string,
	localization: string,
): string;
/**
 * Create an opinion scale form field.
 *
 * @param {string} name
 * @param {boolean} required
 * @param {string} parsedAttrs
 * @param {string} params
 * @param {string} formDelimiter
 * @param {string} id - the id of the page/form
 * @param {string} localization
 * @returns {string} opinion scale form field as HTML string
 */
export function createOpinionScaleField(
	name: string,
	required: boolean,
	parsedAttrs: string,
	params: string,
	formDelimiter: string,
	id: string,
	localization: string,
): string;
/**
 * Create a datetime, date, or time form field.
 *
 * @param {string} name
 * @param {"datetime"|"date"|"time"} inputType
 * @param {boolean} required
 * @param {string} parsedAttrs
 * @param {string} params
 * @param {string} formDelimiter
 * @param {string} id - the id of the page/form
 * @param {string} localization
 * @returns {string} datetime, date, or time input form field as HTML string
 */
export function createDatetimeField(
	name: string,
	inputType: "datetime" | "date" | "time",
	required: boolean,
	parsedAttrs: string,
	params: string,
	formDelimiter: string,
	id: string,
	localization: string,
): string;
/**
 * Create a file form field.
 *
 * @param {string} name
 * @param {boolean} required
 * @param {string} parsedAttrs
 * @param {string} params
 * @param {string} formDelimiter
 * @param {string} id - the id of the page/form
 * @param {string} localization
 * @returns {string} file input form field as HTML string
 */
export function createFileField(
	name: string,
	required: boolean,
	parsedAttrs: string,
	params: string,
	formDelimiter: string,
	id: string,
	localization: string,
): string;
