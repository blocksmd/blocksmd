("use strict");

const { placeholdersAndCallingCodes } = require("./phone-numbers");
const { getDefaultSettings } = require("./settings-parse");

/**
 * Get the shared form field params.
 *
 * @param {Object} params
 * @param {string} formDelimiter
 * @returns {Array.<string>}
 */
function composeSharedFieldParams(params, formDelimiter) {
	const sharedParams = [];

	// Add the shared params
	sharedParams.push(`\t${formDelimiter}question = ${params["question"]}`);
	if (params["description"] !== undefined)
		sharedParams.push(
			`\t${formDelimiter}description = ${params["description"]}`,
		);
	if (params["fieldSize"] === "sm")
		sharedParams.push(`\t${formDelimiter}fieldSize = ${params["fieldSize"]}`);
	if (params["labelStyle"] === "classic")
		sharedParams.push(`\t${formDelimiter}labelStyle = ${params["labelStyle"]}`);
	if (params["subfield"] !== undefined)
		sharedParams.push(`\t${formDelimiter}subfield`);
	if (params["disabled"] !== undefined)
		sharedParams.push(`\t${formDelimiter}disabled`);
	if (params["autofocus"] !== undefined)
		sharedParams.push(`\t${formDelimiter}autofocus`);

	return sharedParams;
}

/**
 * Get the id, CSS class names and other HTML attributes.
 *
 * @param {Object} params
 * @returns {Array.<string>}
 */
function composeAttrs(params) {
	const attrs = [];

	// Add the id, CSS class names and other HTML attributes
	if (params["id"] !== undefined) attrs.push(`#${params["id"]}`);
	if (params["classNames"] !== undefined) {
		for (const className of params["classNames"]) {
			attrs.push(`.${className}`);
		}
	}
	if (params["attrs"] !== undefined) {
		for (const attr of params["attrs"]) {
			attrs.push(`${attr["name"]}="${attr["value"]}"`);
		}
	}

	return attrs;
}

class Composer {
	template = "";
	settings = {};
	passedSettings = {};

	/**
	 * The page or form settings.
	 *
	 * @typedef {Object} SettingsType
	 * @property {"all-slides"} [autofocus] - If set to `"all-slides"`, when a new slide becomes active (including the first slide on page load), the very first form field will be auto-focused.
	 * @property {string} [accent] - The primary color (HTML name, hex code, or RGB) used on buttons, form fields, etc. [Supports up to two values](https://blocksmd.gitbook.io/docs/settings#different-values-for-light-mode-and-dark-mode).
	 * @property {string} [accentForeground] - The text color used on `accent` background, for example, the text on buttons. [Supports up to two values](https://blocksmd.gitbook.io/docs/settings#different-values-for-light-mode-and-dark-mode).
	 * @property {string} [backgroundColor] - The `background-color` of the page. [Supports up to two values](https://blocksmd.gitbook.io/docs/settings#different-values-for-light-mode-and-dark-mode).
	 * @property {string} [backgroundImage] - The `background-image` of the page.
	 * @property {string} [color] - The `color` of the text on the page. [Supports up to two values](https://blocksmd.gitbook.io/docs/settings#different-values-for-light-mode-and-dark-mode).
	 * @property {"light"|"dark"} [colorScheme] - The default or initial color scheme of the page.
	 * @property {string} [formDelimiter] - The form delimiter is used to separate parameters when creating form fields. By default, this is `"|"`.
	 * @property {string} [labelStyle] - If set to `"classic"`, the question and description of all form fields are made smaller.
	 * @property {string} [] -
	 * @property {string} [] -
	 */

	/**
	 * Create an instance of the class.
	 *
	 * @param {SettingsType} settings
	 */
	constructor(settings) {
		const defaultSettings = getDefaultSettings();
		for (const [name, value] of Object.entries(defaultSettings)) {
			this.settings[
				name.replace(/\b-([a-z])/g, (_, char) => char.toUpperCase())
			] = value;
		}
		this.settings = {
			...this.settings,
			...settings,
		};
		this.passedSettings = {
			...settings,
		};
	}

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
	 * @property {"sm"} [fieldSize] - When set to `"sm"`, the font sizes of the question, description, and answer are made smaller.
	 * @property {"classic"} [labelStyle] - When set to `"classic"`, the question and description of the form field are made smaller.
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
	textInput = (name, required, params) => {
		const instance = this;

		// Set up the template chunk using the shared params
		const formDelimiter =
			instance.settings["formDelimiter"] !== "\n"
				? `${instance.settings["formDelimiter"]} `
				: "";
		const templateChunk = [`${name}${required ? "*" : ""} = TextInput(`].concat(
			composeSharedFieldParams(params, formDelimiter),
		);

		// Add the other params
		if (params["placeholder"] !== undefined)
			templateChunk.push(
				`\t${formDelimiter}placeholder = ${params["placeholder"]}`,
			);
		if (params["multiline"] !== undefined)
			templateChunk.push(`\t${formDelimiter}multiline`);
		if (params["maxlength"] !== undefined)
			templateChunk.push(
				`\t${formDelimiter}maxlength = ${params["maxlength"]}`,
			);
		if (params["pattern"] !== undefined)
			templateChunk.push(`\t${formDelimiter}pattern = ${params["pattern"]}`);
		if (params["value"] !== undefined)
			templateChunk.push(`\t${formDelimiter}value = ${params["value"]}`);

		// Close the input and add the attributes (if applicable)
		templateChunk.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunk.unshift(`[${attrs.join(" ")}]`);
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunk.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Email input params.
	 *
	 * @typedef {Object} EmailInputParamsType
	 * @property {string} [placeholder] - Sets the `placeholder` attribute of the input.
	 * @property {number} [maxlength] - If set, this becomes the maximum number of allowed characters in the input.
	 * @property {string} [pattern] - If set, the input value must match the given pattern.
	 * @property {string} [value] - If set, this becomes the default value of the input.
	 */

	/**
	 * Create an email input field.
	 *
	 * @param {string} name
	 * @param {boolean} required
	 * @param {FormFieldSharedParamsType & EmailInputParamsType} params
	 * @returns {string}
	 */
	emailInput = (name, required, params) => {
		const instance = this;

		// Set up the template chunk using the shared params
		const formDelimiter =
			instance.settings["formDelimiter"] !== "\n"
				? `${instance.settings["formDelimiter"]} `
				: "";
		const templateChunk = [
			`${name}${required ? "*" : ""} = EmailInput(`,
		].concat(composeSharedFieldParams(params, formDelimiter));

		// Add the other params
		if (params["placeholder"] !== undefined)
			templateChunk.push(
				`\t${formDelimiter}placeholder = ${params["placeholder"]}`,
			);
		if (params["maxlength"] !== undefined)
			templateChunk.push(
				`\t${formDelimiter}maxlength = ${params["maxlength"]}`,
			);
		if (params["pattern"] !== undefined)
			templateChunk.push(`\t${formDelimiter}pattern = ${params["pattern"]}`);
		if (params["value"] !== undefined)
			templateChunk.push(`\t${formDelimiter}value = ${params["value"]}`);

		// Close the input and add the attributes (if applicable)
		templateChunk.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunk.unshift(`[${attrs.join(" ")}]`);
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunk.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * URL input params.
	 *
	 * @typedef {Object} URLInputParamsType
	 * @property {string} [placeholder] - Sets the `placeholder` attribute of the input.
	 * @property {number} [maxlength] - If set, this becomes the maximum number of allowed characters in the input.
	 * @property {string} [pattern] - If set, the input value must match the given pattern.
	 * @property {string} [value] - If set, this becomes the default value of the input.
	 */

	/**
	 * Create a URL input field.
	 *
	 * @param {string} name
	 * @param {boolean} required
	 * @param {FormFieldSharedParamsType & URLInputParamsType} params
	 * @returns {string}
	 */
	urlInput = (name, required, params) => {
		const instance = this;

		// Set up the template chunk using the shared params
		const formDelimiter =
			instance.settings["formDelimiter"] !== "\n"
				? `${instance.settings["formDelimiter"]} `
				: "";
		const templateChunk = [`${name}${required ? "*" : ""} = URLInput(`].concat(
			composeSharedFieldParams(params, formDelimiter),
		);

		// Add the other params
		if (params["placeholder"] !== undefined)
			templateChunk.push(
				`\t${formDelimiter}placeholder = ${params["placeholder"]}`,
			);
		if (params["maxlength"] !== undefined)
			templateChunk.push(
				`\t${formDelimiter}maxlength = ${params["maxlength"]}`,
			);
		if (params["pattern"] !== undefined)
			templateChunk.push(`\t${formDelimiter}pattern = ${params["pattern"]}`);
		if (params["value"] !== undefined)
			templateChunk.push(`\t${formDelimiter}value = ${params["value"]}`);

		// Close the input and add the attributes (if applicable)
		templateChunk.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunk.unshift(`[${attrs.join(" ")}]`);
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunk.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Country code.
	 *
	 * @typedef {keyof typeof placeholdersAndCallingCodes} CountryCodeType
	 */

	/**
	 * Telephone input params.
	 *
	 * @typedef {Object} TelInputParamsType
	 * @property {string} [placeholder] - Sets the `placeholder` attribute of the input.
	 * @property {number} [maxlength] - If set, this becomes the maximum number of allowed characters in the input.
	 * @property {string} [pattern] - If set, the input value must match the given pattern.
	 * @property {string} [value] - If set, this becomes the default value of the input.
	 * @property {CountryCodeType} [country] - The default country code (e.g., `"US"`). Defaults to `"US"` if not specified.
	 * @property {Array.<CountryCodeType>} [availableCountries] - Array of available country codes (e.g., `["US", "CA", "GB"]`).
	 */

	/**
	 * Create a telephone input field.
	 *
	 * @param {string} name
	 * @param {boolean} required
	 * @param {FormFieldSharedParamsType & TelInputParamsType} params
	 * @returns {string}
	 */
	telInput = (name, required, params) => {
		const instance = this;

		// Set up the template chunk using the shared params
		const formDelimiter =
			instance.settings["formDelimiter"] !== "\n"
				? `${instance.settings["formDelimiter"]} `
				: "";
		const templateChunk = [`${name}${required ? "*" : ""} = TelInput(`].concat(
			composeSharedFieldParams(params, formDelimiter),
		);

		// Add the other params
		if (params["placeholder"] !== undefined)
			templateChunk.push(
				`\t${formDelimiter}placeholder = ${params["placeholder"]}`,
			);
		if (params["maxlength"] !== undefined)
			templateChunk.push(
				`\t${formDelimiter}maxlength = ${params["maxlength"]}`,
			);
		if (params["pattern"] !== undefined)
			templateChunk.push(`\t${formDelimiter}pattern = ${params["pattern"]}`);
		if (params["value"] !== undefined)
			templateChunk.push(`\t${formDelimiter}value = ${params["value"]}`);
		if (params["country"] !== undefined) {
			templateChunk.push(`\t${formDelimiter}country = ${params["country"]}`);
		}
		if (params["availableCountries"] !== undefined) {
			templateChunk.push(
				`\t${formDelimiter}availableCountries = ${params["availableCountries"].join(", ")}`,
			);
		}

		// Close the input and add the attributes (if applicable)
		templateChunk.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunk.unshift(`[${attrs.join(" ")}]`);
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunk.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Number input params.
	 *
	 * @typedef {Object} NumberInputParamsType
	 * @property {string} [placeholder] - Sets the `placeholder` attribute of the input.
	 * @property {number} [min] - Sets the minimum allowed value.
	 * @property {number} [max] - Sets the maximum allowed value.
	 * @property {number} [step] - Sets the stepping interval.
	 * @property {string} [unit] - Text to display before the input as a unit (e.g., `"$"`, `"€"`).
	 * @property {string} [unitEnd] - Text to display after the input as a unit (e.g., `"kg"`, `"%"`).
	 * @property {number} [value] - If set, this becomes the default value of the input.
	 */

	/**
	 * Create a number input field.
	 *
	 * @param {string} name
	 * @param {boolean} required
	 * @param {FormFieldSharedParamsType & NumberInputParamsType} params
	 * @returns {string}
	 */
	numberInput = (name, required, params) => {
		const instance = this;

		// Set up the template chunk using the shared params
		const formDelimiter =
			instance.settings["formDelimiter"] !== "\n"
				? `${instance.settings["formDelimiter"]} `
				: "";
		const templateChunk = [
			`${name}${required ? "*" : ""} = NumberInput(`,
		].concat(composeSharedFieldParams(params, formDelimiter));

		// Add the other params
		if (params["placeholder"] !== undefined)
			templateChunk.push(
				`\t${formDelimiter}placeholder = ${params["placeholder"]}`,
			);
		if (params["min"] !== undefined)
			templateChunk.push(`\t${formDelimiter}min = ${params["min"]}`);
		if (params["max"] !== undefined)
			templateChunk.push(`\t${formDelimiter}max = ${params["max"]}`);
		if (params["step"] !== undefined)
			templateChunk.push(`\t${formDelimiter}step = ${params["step"]}`);
		if (params["unit"] !== undefined)
			templateChunk.push(`\t${formDelimiter}unit = ${params["unit"]}`);
		if (params["unitEnd"] !== undefined)
			templateChunk.push(`\t${formDelimiter}unitend = ${params["unitEnd"]}`);
		if (params["value"] !== undefined)
			templateChunk.push(`\t${formDelimiter}value = ${params["value"]}`);

		// Close the input and add the attributes (if applicable)
		templateChunk.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunk.unshift(`[${attrs.join(" ")}]`);
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunk.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Select option.
	 *
	 * @typedef {Object} SelectOptionType
	 * @property {string} label - The display text for the option.
	 * @property {string} [value] - The value for the option. If not provided, label is used as value.
	 */

	/**
	 * Select box params.
	 *
	 * @typedef {Object} SelectBoxParamsType
	 * @property {string} [placeholder] - Sets the placeholder option of the select.
	 * @property {Array<string|SelectOptionType>} options - Array of options as strings or SelectOptionType objects.
	 * @property {string} [selected] - Pre-selected option value.
	 */

	/**
	 * Create a select box field.
	 *
	 * @param {string} name
	 * @param {boolean} required
	 * @param {FormFieldSharedParamsType & SelectBoxParamsType} params
	 * @returns {string}
	 */
	selectBox = (name, required, params) => {
		const instance = this;

		// Set up the template chunk using the shared params
		const formDelimiter =
			instance.settings["formDelimiter"] !== "\n"
				? `${instance.settings["formDelimiter"]} `
				: "";
		const templateChunk = [`${name}${required ? "*" : ""} = SelectBox(`].concat(
			composeSharedFieldParams(params, formDelimiter),
		);

		// Add the other params
		if (params["placeholder"] !== undefined)
			templateChunk.push(
				`\t${formDelimiter}placeholder = ${params["placeholder"]}`,
			);

		const optionsString = params["options"]
			.map((option) => {
				if (typeof option === "string") {
					return option;
				}
				if (option.value !== undefined) {
					return `"${option.value}" ${option.label}`;
				}
				return option.label;
			})
			.join(", ");
		templateChunk.push(`\t${formDelimiter}options = ${optionsString}`);

		if (params["selected"] !== undefined)
			templateChunk.push(`\t${formDelimiter}selected = ${params["selected"]}`);

		// Close the input and add the attributes (if applicable)
		templateChunk.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunk.unshift(`[${attrs.join(" ")}]`);
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunk.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Choice option.
	 *
	 * @typedef {Object} ChoiceOptionType
	 * @property {string} label - The display text for the choice.
	 * @property {string} [value] - The value for the choice. If not provided, label is used as value.
	 */

	/**
	 * Choice input params.
	 *
	 * @typedef {Object} ChoiceInputParamsType
	 * @property {Array<string|ChoiceOptionType>} choices - Array of choices as strings or ChoiceOptionType objects.
	 * @property {boolean} [multiple] - Allow multiple selections.
	 * @property {boolean} [horizontal] - Display choices horizontally.
	 * @property {Array<string>} [checked] - Array of pre-checked choice values.
	 */

	/**
	 * Create a choice input field.
	 *
	 * @param {string} name
	 * @param {boolean} required
	 * @param {FormFieldSharedParamsType & ChoiceInputParamsType} params
	 * @returns {string}
	 */
	choiceInput = (name, required, params) => {
		const instance = this;

		// Set up the template chunk using the shared params
		const formDelimiter =
			instance.settings["formDelimiter"] !== "\n"
				? `${instance.settings["formDelimiter"]} `
				: "";
		const templateChunk = [
			`${name}${required ? "*" : ""} = ChoiceInput(`,
		].concat(composeSharedFieldParams(params, formDelimiter));

		// Add the other params
		const choicesString = params["choices"]
			.map((choice) => {
				if (typeof choice === "string") {
					return choice;
				}
				if (choice.value !== undefined) {
					return `"${choice.value}" ${choice.label}`;
				}
				return choice.label;
			})
			.join(", ");
		templateChunk.push(`\t${formDelimiter}choices = ${choicesString}`);

		if (params["multiple"] !== undefined)
			templateChunk.push(`\t${formDelimiter}multiple`);
		if (params["horizontal"] !== undefined)
			templateChunk.push(`\t${formDelimiter}horizontal`);
		if (params["checked"] !== undefined)
			templateChunk.push(
				`\t${formDelimiter}checked = ${params["checked"].join(", ")}`,
			);

		// Close the input and add the attributes (if applicable)
		templateChunk.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunk.unshift(`[${attrs.join(" ")}]`);
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunk.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Picture choice option.
	 *
	 * @typedef {Object} PictureChoiceOptionType
	 * @property {string} label - The display text for the choice.
	 * @property {string} [value] - The value for the choice. If not provided, label is used as value.
	 * @property {string} image - The URL of the image.
	 */

	/**
	 * Picture choice params.
	 *
	 * @typedef {Object} PictureChoiceParamsType
	 * @property {Array<PictureChoiceOptionType>} choices - Array of picture choices.
	 * @property {boolean} [multiple] - Allow multiple selections.
	 * @property {boolean} [supersize] - Make the pictures larger.
	 * @property {boolean} [hideLabels] - Hide the text labels.
	 * @property {Array<string>} [checked] - Array of pre-checked choice values.
	 */

	/**
	 * Create a picture choice field.
	 *
	 * @param {string} name
	 * @param {boolean} required
	 * @param {FormFieldSharedParamsType & PictureChoiceParamsType} params
	 * @returns {string}
	 */
	pictureChoice = (name, required, params) => {
		const instance = this;

		// Set up the template chunk using the shared params
		const formDelimiter =
			instance.settings["formDelimiter"] !== "\n"
				? `${instance.settings["formDelimiter"]} `
				: "";
		const templateChunk = [
			`${name}${required ? "*" : ""} = PictureChoice(`,
		].concat(composeSharedFieldParams(params, formDelimiter));

		// Add the other params
		const choicesString = params["choices"]
			.map((choice) => {
				const baseChoice =
					choice.value !== undefined
						? `"${choice.value}" ${choice.label}`
						: choice.label;
				return `${baseChoice} && ${choice.image}`;
			})
			.join(", ");
		templateChunk.push(`\t${formDelimiter}choices = ${choicesString}`);

		if (params["multiple"] !== undefined)
			templateChunk.push(`\t${formDelimiter}multiple`);
		if (params["supersize"] !== undefined)
			templateChunk.push(`\t${formDelimiter}supersize`);
		if (params["hideLabels"] !== undefined)
			templateChunk.push(`\t${formDelimiter}hidelabels`);
		if (params["checked"] !== undefined)
			templateChunk.push(
				`\t${formDelimiter}checked = ${params["checked"].join(", ")}`,
			);

		// Close the input and add the attributes (if applicable)
		templateChunk.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunk.unshift(`[${attrs.join(" ")}]`);
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunk.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Rating input params.
	 *
	 * @typedef {Object} RatingInputParamsType
	 * @property {number} [outOf] - Number of rating options (1-10). Defaults to `5`.
	 * @property {"star"|"heart"|"hearts"} [icon] - Icon to use for rating. Defaults to `"star"`.
	 * @property {number} [value] - Pre-selected rating value.
	 * @property {true} [hideLabels] - Whether to hide the numeric labels.
	 */

	/**
	 * Create a rating input field.
	 *
	 * @param {string} name
	 * @param {boolean} required
	 * @param {FormFieldSharedParamsType & RatingInputParamsType} params
	 * @returns {string}
	 */
	ratingInput = (name, required, params) => {
		const instance = this;

		// Set up the template chunk using the shared params
		const formDelimiter =
			instance.settings["formDelimiter"] !== "\n"
				? `${instance.settings["formDelimiter"]} `
				: "";
		const templateChunk = [
			`${name}${required ? "*" : ""} = RatingInput(`,
		].concat(composeSharedFieldParams(params, formDelimiter));

		// Add the other params
		if (params["outOf"] !== undefined)
			templateChunk.push(`\t${formDelimiter}outof = ${params["outOf"]}`);
		if (params["icon"] !== undefined)
			templateChunk.push(`\t${formDelimiter}icon = ${params["icon"]}`);
		if (params["value"] !== undefined)
			templateChunk.push(`\t${formDelimiter}value = ${params["value"]}`);
		if (params["hideLabels"] !== undefined)
			templateChunk.push(`\t${formDelimiter}hidelabels`);

		// Close the input and add the attributes (if applicable)
		templateChunk.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunk.unshift(`[${attrs.join(" ")}]`);
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunk.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Opinion scale input params.
	 *
	 * @typedef {Object} OpinionScaleParamsType
	 * @property {number} [startAt] - Starting number (`0` or `1`). Defaults to `0`.
	 * @property {number} [outOf] - Maximum scale value (5-10). Defaults to `10`.
	 * @property {string} [labelStart] - Label for the start of the scale.
	 * @property {string} [labelEnd] - Label for the end of the scale.
	 * @property {true} [hideLabelStart] - Whether to hide the start label.
	 * @property {true} [hideLabelEnd] - Whether to hide the end label.
	 * @property {number} [value] - Pre-selected value.
	 */

	/**
	 * Create an opinion scale field.
	 *
	 * @param {string} name
	 * @param {boolean} required
	 * @param {FormFieldSharedParamsType & OpinionScaleParamsType} params
	 * @returns {string}
	 */
	opinionScale = (name, required, params) => {
		const instance = this;

		// Set up the template chunk using the shared params
		const formDelimiter =
			instance.settings["formDelimiter"] !== "\n"
				? `${instance.settings["formDelimiter"]} `
				: "";
		const templateChunk = [
			`${name}${required ? "*" : ""} = OpinionScale(`,
		].concat(composeSharedFieldParams(params, formDelimiter));

		// Add the other params
		if (params["startAt"] !== undefined)
			templateChunk.push(`\t${formDelimiter}startat = ${params["startAt"]}`);
		if (params["outOf"] !== undefined)
			templateChunk.push(`\t${formDelimiter}outof = ${params["outOf"]}`);
		if (params["labelStart"] !== undefined)
			templateChunk.push(
				`\t${formDelimiter}labelstart = ${params["labelStart"]}`,
			);
		if (params["labelEnd"] !== undefined)
			templateChunk.push(`\t${formDelimiter}labelend = ${params["labelEnd"]}`);
		if (params["hideLabelStart"] !== undefined)
			templateChunk.push(`\t${formDelimiter}hidelabelstart`);
		if (params["hideLabelEnd"] !== undefined)
			templateChunk.push(`\t${formDelimiter}hidelabelend`);
		if (params["value"] !== undefined)
			templateChunk.push(`\t${formDelimiter}value = ${params["value"]}`);

		// Close the input and add the attributes (if applicable)
		templateChunk.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunk.unshift(`[${attrs.join(" ")}]`);
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunk.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Datetime input params.
	 *
	 * @typedef {Object} DatetimeInputParamsType
	 * @property {string} [placeholder] - Sets the `placeholder` attribute of the input.
	 * @property {string} [min] - Sets the minimum allowed datetime value (`YYYY-MM-DDTHH:mm`).
	 * @property {string} [max] - Sets the maximum allowed datetime value (`YYYY-MM-DDTHH:mm`).
	 * @property {string} [step] - Sets the stepping interval.
	 * @property {string} [value] - Pre-selected datetime value (`YYYY-MM-DDTHH:mm`).
	 */

	/**
	 * Create a datetime input field.
	 *
	 * @param {string} name
	 * @param {boolean} required
	 * @param {FormFieldSharedParamsType & DatetimeInputParamsType} params
	 * @returns {string}
	 */
	datetimeInput = (name, required, params) => {
		const instance = this;

		// Set up the template chunk using the shared params
		const formDelimiter =
			instance.settings["formDelimiter"] !== "\n"
				? `${instance.settings["formDelimiter"]} `
				: "";
		const templateChunk = [
			`${name}${required ? "*" : ""} = DatetimeInput(`,
		].concat(composeSharedFieldParams(params, formDelimiter));

		// Add the other params
		if (params["placeholder"] !== undefined)
			templateChunk.push(
				`\t${formDelimiter}placeholder = ${params["placeholder"]}`,
			);
		if (params["min"] !== undefined)
			templateChunk.push(`\t${formDelimiter}min = ${params["min"]}`);
		if (params["max"] !== undefined)
			templateChunk.push(`\t${formDelimiter}max = ${params["max"]}`);
		if (params["step"] !== undefined)
			templateChunk.push(`\t${formDelimiter}step = ${params["step"]}`);
		if (params["value"] !== undefined)
			templateChunk.push(`\t${formDelimiter}value = ${params["value"]}`);

		// Close the input and add the attributes (if applicable)
		templateChunk.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunk.unshift(`[${attrs.join(" ")}]`);
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunk.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Date input params.
	 *
	 * @typedef {Object} DateInputParamsType
	 * @property {string} [placeholder] - Sets the `placeholder` attribute of the input.
	 * @property {string} [min] - Sets the minimum allowed date value (`YYYY-MM-DD`).
	 * @property {string} [max] - Sets the maximum allowed date value (`YYYY-MM-DD`).
	 * @property {string} [step] - Sets the stepping interval.
	 * @property {string} [value] - Pre-selected date value (`YYYY-MM-DD`).
	 */

	/**
	 * Create a date input field.
	 *
	 * @param {string} name
	 * @param {boolean} required
	 * @param {FormFieldSharedParamsType & DateInputParamsType} params
	 * @returns {string}
	 */
	dateInput = (name, required, params) => {
		const instance = this;

		// Set up the template chunk using the shared params
		const formDelimiter =
			instance.settings["formDelimiter"] !== "\n"
				? `${instance.settings["formDelimiter"]} `
				: "";
		const templateChunk = [`${name}${required ? "*" : ""} = DateInput(`].concat(
			composeSharedFieldParams(params, formDelimiter),
		);

		// Add the other params
		if (params["placeholder"] !== undefined)
			templateChunk.push(
				`\t${formDelimiter}placeholder = ${params["placeholder"]}`,
			);
		if (params["min"] !== undefined)
			templateChunk.push(`\t${formDelimiter}min = ${params["min"]}`);
		if (params["max"] !== undefined)
			templateChunk.push(`\t${formDelimiter}max = ${params["max"]}`);
		if (params["step"] !== undefined)
			templateChunk.push(`\t${formDelimiter}step = ${params["step"]}`);
		if (params["value"] !== undefined)
			templateChunk.push(`\t${formDelimiter}value = ${params["value"]}`);

		// Close the input and add the attributes (if applicable)
		templateChunk.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunk.unshift(`[${attrs.join(" ")}]`);
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunk.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Time input params.
	 *
	 * @typedef {Object} TimeInputParamsType
	 * @property {string} [placeholder] - Sets the `placeholder` attribute of the input.
	 * @property {string} [min] - Sets the minimum allowed time value (`HH:mm`).
	 * @property {string} [max] - Sets the maximum allowed time value (`HH:mm`).
	 * @property {string} [step] - Sets the stepping interval.
	 * @property {string} [value] - Pre-selected time value (`HH:mm`).
	 */

	/**
	 * Create a time input field.
	 *
	 * @param {string} name
	 * @param {boolean} required
	 * @param {FormFieldSharedParamsType & TimeInputParamsType} params
	 * @returns {string}
	 */
	timeInput = (name, required, params) => {
		const instance = this;

		// Set up the template chunk using the shared params
		const formDelimiter =
			instance.settings["formDelimiter"] !== "\n"
				? `${instance.settings["formDelimiter"]} `
				: "";
		const templateChunk = [`${name}${required ? "*" : ""} = TimeInput(`].concat(
			composeSharedFieldParams(params, formDelimiter),
		);

		// Add the other params
		if (params["placeholder"] !== undefined)
			templateChunk.push(
				`\t${formDelimiter}placeholder = ${params["placeholder"]}`,
			);
		if (params["min"] !== undefined)
			templateChunk.push(`\t${formDelimiter}min = ${params["min"]}`);
		if (params["max"] !== undefined)
			templateChunk.push(`\t${formDelimiter}max = ${params["max"]}`);
		if (params["step"] !== undefined)
			templateChunk.push(`\t${formDelimiter}step = ${params["step"]}`);
		if (params["value"] !== undefined)
			templateChunk.push(`\t${formDelimiter}value = ${params["value"]}`);

		// Close the input and add the attributes (if applicable)
		templateChunk.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunk.unshift(`[${attrs.join(" ")}]`);
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunk.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * File input params.
	 *
	 * @typedef {Object} FileInputParamsType
	 * @property {number} [sizeLimit] - Maximum file size in MB. Defaults to `10`.
	 * @property {true} [imageOnly] - When set, only image files are accepted.
	 */

	/**
	 * Create a file input field.
	 *
	 * @param {string} name
	 * @param {boolean} required
	 * @param {FormFieldSharedParamsType & FileInputParamsType} params
	 * @returns {string}
	 */
	fileInput = (name, required, params) => {
		const instance = this;

		// Set up the template chunk using the shared params
		const formDelimiter =
			instance.settings["formDelimiter"] !== "\n"
				? `${instance.settings["formDelimiter"]} `
				: "";
		const templateChunk = [`${name}${required ? "*" : ""} = FileInput(`].concat(
			composeSharedFieldParams(params, formDelimiter),
		);

		// Add the other params
		if (params["sizeLimit"] !== undefined)
			templateChunk.push(
				`\t${formDelimiter}sizelimit = ${params["sizeLimit"]}`,
			);
		if (params["imageOnly"] !== undefined)
			templateChunk.push(`\t${formDelimiter}imageonly`);

		// Close the input and add the attributes (if applicable)
		templateChunk.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunk.unshift(`[${attrs.join(" ")}]`);
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunk.join("\n")}\n`;
		instance.template += result;
		return result;
	};
}

exports.composeSharedFieldParams = composeSharedFieldParams;
exports.composeAttrs = composeAttrs;
exports.Composer = Composer;
