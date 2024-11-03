/**
 * Get the shared form field params.
 *
 * @param {Object} params
 * @param {string} formDelimiter
 * @returns {Array.<string>}
 */
export function composeSharedFieldParams(
	params: any,
	formDelimiter: string,
): Array<string>;
/**
 * Get the id, CSS class names and other HTML attributes.
 *
 * @param {Object} params
 * @returns {Array.<string>}
 */
export function composeAttrs(params: any): Array<string>;
export class Composer {
	/**
	 * The page or form settings.
	 *
	 * @typedef {Object} SettingsType
	 * @property {string} [accent] - The primary color (HTML name, hex code, or RGB) used on buttons, form fields, etc. [Supports up to two values](https://blocksmd.gitbook.io/docs/settings#different-values-for-light-mode-and-dark-mode).
	 */
	/**
	 * Create an instance of the class.
	 *
	 * @param {SettingsType} [settings]
	 */
	constructor(settings?: {
		/**
		 * - The primary color (HTML name, hex code, or RGB) used on buttons, form fields, etc. [Supports up to two values](https://blocksmd.gitbook.io/docs/settings#different-values-for-light-mode-and-dark-mode).
		 */
		accent?: string;
	});
	template: string;
	settings: any;
	passedSettings: {};
	/**
	 * HTML attribute.
	 *
	 * @typedef {Object} HTMLAttributeType
	 * @property {string} name - The name of the attribute.
	 * @property {string} value - The value of the attribute.
	 */
	/**
	 * Params shared between all form fields.
	 *
	 * @typedef {Object} FormFieldSharedParamsType
	 * @property {string} question - The main question of the form field.
	 * @property {string} [description] - Any extra information that the user may need to fill out the form.
	 * @property {"sm"} [fieldSize] - When set to `sm`, the font sizes of the question, description, and answer are made smaller.
	 * @property {"classic"} [labelStyle] - When set to `classic`, the question and description of the form field are made smaller.
	 * @property {true} [subfield] - When set, the question and description of the form field are made smaller.
	 * @property {true} [disabled] - When set, the input is disabled.
	 * @property {true} [autofocus] - When set, the input will be automatically focused when the parent slide becomes active, or immediately after page load.
	 * @property {string} [id] - The id attribute of the form field.
	 * @property {Array.<string>} [classNames] - The CSS class names of the form field.
	 * @property {Array.<HTMLAttributeType>} [attrs] - Other HTML attributes of the form field.
	 */
	/**
	 * Text input params.
	 *
	 * @typedef {Object} TextInputParamsType
	 * @property {string} [placeholder] - Sets the `placeholder` attribute of the input.
	 * @property {true} [multiline] - When set, the input accepts values with one or more lines because the `<textarea>` element is used.
	 * @property {number} [maxlength] - If set, this becomes the maximum number of allowed characters in the input.
	 * @property {string} [pattern] - If set, the input value must match the given pattern.
	 * @property {string} [value] - If set, this becomes the default value of the input.
	 */
	/**
	 * Create a text input field.
	 *
	 * @param {string} name
	 * @param {boolean} required
	 * @param {FormFieldSharedParamsType & TextInputParamsType} params
	 * @returns {string}
	 */
	textInput: (
		name: string,
		required: boolean,
		params: {
			/**
			 * - The main question of the form field.
			 */
			question: string;
			/**
			 * - Any extra information that the user may need to fill out the form.
			 */
			description?: string;
			/**
			 * - When set to `sm`, the font sizes of the question, description, and answer are made smaller.
			 */
			fieldSize?: "sm";
			/**
			 * - When set to `classic`, the question and description of the form field are made smaller.
			 */
			labelStyle?: "classic";
			/**
			 * - When set, the question and description of the form field are made smaller.
			 */
			subfield?: true;
			/**
			 * - When set, the input is disabled.
			 */
			disabled?: true;
			/**
			 * - When set, the input will be automatically focused when the parent slide becomes active, or immediately after page load.
			 */
			autofocus?: true;
			/**
			 * - The id attribute of the form field.
			 */
			id?: string;
			/**
			 * - The CSS class names of the form field.
			 */
			classNames?: Array<string>;
			/**
			 * - Other HTML attributes of the form field.
			 */
			attrs?: {
				/**
				 * - The name of the attribute.
				 */
				name: string;
				/**
				 * - The value of the attribute.
				 */
				value: string;
			}[];
		} & {
			/**
			 * - Sets the `placeholder` attribute of the input.
			 */
			placeholder?: string;
			/**
			 * - When set, the input accepts values with one or more lines because the `<textarea>` element is used.
			 */
			multiline?: true;
			/**
			 * - If set, this becomes the maximum number of allowed characters in the input.
			 */
			maxlength?: number;
			/**
			 * - If set, the input value must match the given pattern.
			 */
			pattern?: string;
			/**
			 * - If set, this becomes the default value of the input.
			 */
			value?: string;
		},
	) => string;
	/**
	 * Create an email input field.
	 *
	 * @param {string} name
	 * @param {boolean} required
	 * @param {any} params
	 */
	emailInput: (name: string, required: boolean, params: any) => void;
	/**
	 * Create a new slide.
	 *
	 * @param {{
	 *   jumpCondition?: string,
	 *   pageProgress?: number,
	 *   partialSubmission?: true,
	 *   alignCTA?: "center"|"end",
	 *   disablePrev?: true,
	 * }} params
	 */
	slide: (params: {
		jumpCondition?: string;
		pageProgress?: number;
		partialSubmission?: true;
		alignCTA?: "center" | "end";
		disablePrev?: true;
	}) => void;
}
