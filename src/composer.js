"use strict";

const { placeholdersAndCallingCodes } = require("./phone-numbers");
const { getDefaultSettings } = require("./settings-parse");
const { translations } = require("./translations");

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
	sharedParams.push(`\t${formDelimiter}question = ${params.question}`);
	if (params.description !== undefined) {
		sharedParams.push(`\t${formDelimiter}description = ${params.description}`);
	}
	if (params.fieldSize === "sm") {
		sharedParams.push(`\t${formDelimiter}fieldSize = ${params.fieldSize}`);
	}
	if (params.labelStyle === "classic") {
		sharedParams.push(`\t${formDelimiter}labelStyle = ${params.labelStyle}`);
	}
	if (params.subfield !== undefined) {
		sharedParams.push(`\t${formDelimiter}subfield`);
	}
	if (params.disabled !== undefined) {
		sharedParams.push(`\t${formDelimiter}disabled`);
	}
	if (params.autofocus !== undefined) {
		sharedParams.push(`\t${formDelimiter}autofocus`);
	}

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
	if (params.id !== undefined) {
		attrs.push(`#${params.id}`);
	}
	if (params.classNames !== undefined) {
		for (const className of params.classNames) {
			attrs.push(`.${className}`);
		}
	}
	if (params.attrs !== undefined) {
		for (const attr of params.attrs) {
			attrs.push(`${attr.name}="${attr.value}"`);
		}
	}

	return attrs;
}

/**
 * Translations.
 *
 * @typedef {Object} TranslationsType
 * @property {string} [en] The text in English.
 * @property {string} [ar] The text in Arabic.
 * @property {string} [bn] The text in Bengali.
 * @property {string} [de] The text in German.
 * @property {string} [es] The text in Spanish.
 * @property {string} [fr] The text in French.
 * @property {string} [ja] The text in Japanese.
 * @property {string} [pt] The text in Portuguese.
 * @property {string} [zh] The text in Chinese.
 */

/**
 * Given the localization and object of translations, get the localized string.
 *
 * @param {string} localization
 * @param {TranslationsType} translations
 * @returns {string}
 */
function translate(localization, translations) {
	if (translations[localization] !== undefined) {
		return translations[localization];
	} else {
		return Object.values(translations)[0];
	}
}

class Composer {
	template = "";
	settings = {};
	passedSettings = {};

	/**
	 * The page or form settings.
	 *
	 * @typedef {Object} SettingsType
	 * @property {"all-slides"} [autofocus] If set to `"all-slides"`, when a new slide becomes active (including the first slide on page load), the very first form field will be auto-focused.
	 * @property {string} [accent] The primary color (must be HTML name, hex code, or RGB) used on buttons, form fields, etc. [Supports up to two values](https://formsmd.gitbook.io/docs/settings#different-values-for-light-mode-and-dark-mode).
	 * @property {string} [accentForeground] The text color (must be HTML name, hex code, or RGB) used on `accent` background, for example, the text on buttons. [Supports up to two values](https://formsmd.gitbook.io/docs/settings#different-values-for-light-mode-and-dark-mode).
	 * @property {string} [backdropOpacity] Sets an overlay of the `background-color` on top of the background image. [Supports up to two values](https://formsmd.gitbook.io/docs/settings#different-values-for-light-mode-and-dark-mode).
	 * @property {string} [backgroundColor] The `background-color` of the page (must be HTML name, hex code, or RGB). [Supports up to two values](https://formsmd.gitbook.io/docs/settings#different-values-for-light-mode-and-dark-mode).
	 * @property {string} [backgroundImage] The `background-image` of the page. [Supports up to two values](https://formsmd.gitbook.io/docs/settings#different-values-for-light-mode-and-dark-mode).
	 * @property {string} [brand] An image of your logo added to the header of the page in the top-left corner (must be valid Markdown image). [Supports up to two values](https://formsmd.gitbook.io/docs/settings#different-values-for-light-mode-and-dark-mode).
	 * @property {"center"|"end"|"stretch"} [buttonAlignment] Set the alignment of the slide CTA buttons.
	 * @property {string} [color] The `color` of the text on the page (must be HTML name, hex code, or RGB). [Supports up to two values](https://formsmd.gitbook.io/docs/settings#different-values-for-light-mode-and-dark-mode).
	 * @property {"light"|"dark"} [colorScheme] The default or initial color scheme of the page. Default is `"light"`.
	 * @property {"domain-wide"|"isolate"} [colorSchemeScope] Determines how color scheme preference is saved and applied. Default is `"domain-wide"`.
	 * @property {"show"} [colorSchemeToggle] If set to `"show"`, a toggle button will be available in the footer.
	 * @property {string} [cssPrefix] Prefix added to all CSS classes. Default is `"fmd-"`.
	 * @property {string} [cta] Adds a call to action link styled as a button on the header (must be valid Markdown link).
	 * @property {"ltr"|"rtl"} [dir] The direction of the page's text. Default is `"ltr"`.
	 * @property {string} [favicon] The favicon of the page.
	 * @property {"sm"} [fieldSize] If set to `"sm"`, the size of form fields will be made smaller.
	 * @property {string} [fontFamily] The `font-family` used on the page.
	 * @property {string} [fontImportUrl] URL to import custom fonts (must be valid CSS for the `@import` property).
	 * @property {"sm"|"lg"} [fontSize] Makes the `font-size` of everything on the page smaller or larger.
	 * @property {string} [formDelimiter] Used to separate parameters when creating form fields. Default is `"|"`.
	 * @property {"hide"|"show"} [formsmdBranding] Controls visibility of the Forms.md branding.
	 * @property {"classic"} [formStyle] If set to `"classic"`, the form fields will have a classic appearance.
	 * @property {"hide"|"show"} [footer] Controls visibility of the footer.
	 * @property {"json"|"csv"|"tsv"} [getFormat] The format for reading data. Default is `"json"`. [Read docs](https://formsmd.gitbook.io/docs/set-and-read-data).
	 * @property {string} [getObjectsName] Name used for objects when reading data. Default is `"objects"`. [Read docs](https://formsmd.gitbook.io/docs/set-and-read-data).
	 * @property {string} [getUrl] URL for reading data. [Read docs](https://formsmd.gitbook.io/docs/set-and-read-data).
	 * @property {"hide"|"show"|"align"} [header] Controls header visibility and alignment.
	 * @property {"anchored"} [headings] If set to `"anchored"`, all headings will contain an anchor link.
	 * @property {string} [id] Identifier for the page or form.
	 * @property {"classic"} [labelStyle] If set to `"classic"`, the question and description of form fields will be made smaller.
	 * @property {keyof typeof translations} [localization] Sets the language for automatic translation. Default is `"en"`.
	 * @property {string} [metaAuthor] Sets the author metadata.
	 * @property {string} [metaDescription] Sets the description metadata.
	 * @property {string} [metaImage] Sets the Open Graph image.
	 * @property {string} [metaKeywords] Sets the keywords metadata.
	 * @property {string} [metaType] Sets the Open Graph type.
	 * @property {string} [metaUrl] Sets the Open Graph URL.
	 * @property {"form-slides"|"slides"|"single"} [page] Determines the layout of the page. Default is `"form-slides"`.
	 * @property {"hide"|"show"|"decorative"} [pageProgress] Controls visibility and function of the page progress.
	 * @property {"hide"|"show"} [placeholders] Controls visibility of input placeholders.
	 * @property {string} [postSheetName] When sending responses directly to Google Sheets, this specifies which sheet to save responses to.
	 * @property {string} [postUrl] URL to send form responses to using POST request.
	 * @property {"show"} [restartButton] If set to `"show"`, the restart button will be visible.
	 * @property {"none"|"pill"} [rounded] Controls rounding of buttons and UI elements.
	 * @property {"hide"|"show"} [slideControls] Controls visibility of next and previous buttons.
	 * @property {string} [slideDelimiter] Specifies where new slides are created. Default is `"---"`.
	 * @property {string} [submitButtonText] Custom text for submit buttons.
	 * @property {string} [title] The title of the page.
	 * @property {"start"} [verticalAlignment] If set to `"start"`, content is aligned to the top of the page vertically.
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
				name.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
			] = value;
		}
		this.settings = {
			...this.settings,
			...settings,
		};
		this.passedSettings = {
			...settings,
		};

		// Set up the template chunks using the passed settings
		const templateChunks = [];
		for (const [name, value] of Object.entries(this.passedSettings)) {
			templateChunks.push(
				`#! ${name.replace(/([A-Z])/g, "-$1").toLowerCase()} = ${value}`,
			);
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunks.join("\n")}\n`;
		this.template += result;
		return result;
	}

	/**
	 * HTML attribute.
	 *
	 * @typedef {Object} HTMLAttributeType
	 * @property {string} name The name of the attribute.
	 * @property {string} value The value of the attribute.
	 */

	/**
	 * Display condition.
	 *
	 * @typedef {Object} DisplayConditionType
	 * @property {Array.<string>} dependencies The names of the form fields or data to use in the condition.
	 * @property {string} condition The actual condition.
	 */

	/**
	 * Params shared between all form fields.
	 *
	 * @typedef {Object} FormFieldSharedParamsType
	 * @property {string} question The main question of the form field.
	 * @property {true} [required] When set, the field becomes required.
	 * @property {string} [description] Any extra information that the user may need to fill out the form.
	 * @property {"sm"} [fieldSize] When set to `"sm"`, the font sizes of the question, description, and answer are made smaller.
	 * @property {"classic"} [labelStyle] When set to `"classic"`, the question and description of the form field are made smaller.
	 * @property {true} [subfield] When set, the question and description of the form field are made smaller.
	 * @property {true} [disabled] When set, the input is disabled.
	 * @property {true} [autofocus] When set, the input will be automatically focused when the parent slide becomes active, or immediately after page load.
	 * @property {string} [id] The id attribute of the form field.
	 * @property {Array.<string>} [classNames] The CSS class names of the form field.
	 * @property {Array.<HTMLAttributeType>} [attrs] Other HTML attributes of the form field.
	 * @property {DisplayConditionType} [displayCondition] Display condition for the form field.
	 */

	/**
	 * Text input params.
	 *
	 * @typedef {Object} TextInputParamsType
	 * @property {string} [placeholder] Sets the `placeholder` attribute of the input.
	 * @property {true} [multiline] When set, the input accepts values with one or more lines because the `<textarea>` element is used.
	 * @property {number} [maxlength] If set, this becomes the maximum number of allowed characters in the input.
	 * @property {string} [pattern] If set, the input value must match the given pattern.
	 * @property {string} [value] If set, this becomes the default value of the input.
	 */

	/**
	 * Create a text input field.
	 *
	 * @param {string} name
	 * @param {FormFieldSharedParamsType & TextInputParamsType} params
	 * @returns {string}
	 */
	textInput = (name, params) => {
		const instance = this;

		// Set up the template chunks using the shared params
		const formDelimiter =
			instance.settings.formDelimiter !== "\n"
				? `${instance.settings.formDelimiter} `
				: "";
		const templateChunks = [
			`${name}${params.required ? "*" : ""} = TextInput(`,
		].concat(composeSharedFieldParams(params, formDelimiter));

		// Add the other params
		if (params.placeholder !== undefined) {
			templateChunks.push(
				`\t${formDelimiter}placeholder = ${params.placeholder}`,
			);
		}
		if (params.multiline !== undefined) {
			templateChunks.push(`\t${formDelimiter}multiline`);
		}
		if (params.maxlength !== undefined) {
			templateChunks.push(`\t${formDelimiter}maxlength = ${params.maxlength}`);
		}
		if (params.pattern !== undefined) {
			templateChunks.push(`\t${formDelimiter}pattern = ${params.pattern}`);
		}
		if (params.value !== undefined) {
			templateChunks.push(`\t${formDelimiter}value = ${params.value}`);
		}

		// Close the input and add the attributes (if applicable)
		templateChunks.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunks.unshift(`[${attrs.join(" ")}]`);
		}

		// Create a wrapping <div> with the display condition (if applicable)
		if (params.displayCondition !== undefined) {
			templateChunks.unshift(`{% if ${params.displayCondition.condition} %}`);
			templateChunks.unshift(
				`::: [{$ ${params.displayCondition.dependencies.join(" ")} $}]`,
			);
			templateChunks.push("{% endif %}");
			templateChunks.push(":::");
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunks.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Email input params.
	 *
	 * @typedef {Object} EmailInputParamsType
	 * @property {string} [placeholder] Sets the `placeholder` attribute of the input.
	 * @property {number} [maxlength] If set, this becomes the maximum number of allowed characters in the input.
	 * @property {string} [pattern] If set, the input value must match the given pattern.
	 * @property {string} [value] If set, this becomes the default value of the input.
	 */

	/**
	 * Create an email input field.
	 *
	 * @param {string} name
	 * @param {FormFieldSharedParamsType & EmailInputParamsType} params
	 * @returns {string}
	 */
	emailInput = (name, params) => {
		const instance = this;

		// Set up the template chunks using the shared params
		const formDelimiter =
			instance.settings.formDelimiter !== "\n"
				? `${instance.settings.formDelimiter} `
				: "";
		const templateChunks = [
			`${name}${params.required ? "*" : ""} = EmailInput(`,
		].concat(composeSharedFieldParams(params, formDelimiter));

		// Add the other params
		if (params.placeholder !== undefined) {
			templateChunks.push(
				`\t${formDelimiter}placeholder = ${params.placeholder}`,
			);
		}
		if (params.maxlength !== undefined) {
			templateChunks.push(`\t${formDelimiter}maxlength = ${params.maxlength}`);
		}
		if (params.pattern !== undefined) {
			templateChunks.push(`\t${formDelimiter}pattern = ${params.pattern}`);
		}
		if (params.value !== undefined) {
			templateChunks.push(`\t${formDelimiter}value = ${params.value}`);
		}

		// Close the input and add the attributes (if applicable)
		templateChunks.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunks.unshift(`[${attrs.join(" ")}]`);
		}

		// Create a wrapping <div> with the display condition (if applicable)
		if (params.displayCondition !== undefined) {
			templateChunks.unshift(`{% if ${params.displayCondition.condition} %}`);
			templateChunks.unshift(
				`::: [{$ ${params.displayCondition.dependencies.join(" ")} $}]`,
			);
			templateChunks.push("{% endif %}");
			templateChunks.push(":::");
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunks.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * URL input params.
	 *
	 * @typedef {Object} URLInputParamsType
	 * @property {string} [placeholder] Sets the `placeholder` attribute of the input.
	 * @property {number} [maxlength] If set, this becomes the maximum number of allowed characters in the input.
	 * @property {string} [pattern] If set, the input value must match the given pattern.
	 * @property {string} [value] If set, this becomes the default value of the input.
	 */

	/**
	 * Create a URL input field.
	 *
	 * @param {string} name
	 * @param {FormFieldSharedParamsType & URLInputParamsType} params
	 * @returns {string}
	 */
	urlInput = (name, params) => {
		const instance = this;

		// Set up the template chunks using the shared params
		const formDelimiter =
			instance.settings.formDelimiter !== "\n"
				? `${instance.settings.formDelimiter} `
				: "";
		const templateChunks = [
			`${name}${params.required ? "*" : ""} = URLInput(`,
		].concat(composeSharedFieldParams(params, formDelimiter));

		// Add the other params
		if (params.placeholder !== undefined) {
			templateChunks.push(
				`\t${formDelimiter}placeholder = ${params.placeholder}`,
			);
		}
		if (params.maxlength !== undefined) {
			templateChunks.push(`\t${formDelimiter}maxlength = ${params.maxlength}`);
		}
		if (params.pattern !== undefined) {
			templateChunks.push(`\t${formDelimiter}pattern = ${params.pattern}`);
		}
		if (params.value !== undefined) {
			templateChunks.push(`\t${formDelimiter}value = ${params.value}`);
		}

		// Close the input and add the attributes (if applicable)
		templateChunks.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunks.unshift(`[${attrs.join(" ")}]`);
		}

		// Create a wrapping <div> with the display condition (if applicable)
		if (params.displayCondition !== undefined) {
			templateChunks.unshift(`{% if ${params.displayCondition.condition} %}`);
			templateChunks.unshift(
				`::: [{$ ${params.displayCondition.dependencies.join(" ")} $}]`,
			);
			templateChunks.push("{% endif %}");
			templateChunks.push(":::");
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunks.join("\n")}\n`;
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
	 * @property {string} [placeholder] Sets the `placeholder` attribute of the input.
	 * @property {number} [maxlength] If set, this becomes the maximum number of allowed characters in the input.
	 * @property {string} [pattern] If set, the input value must match the given pattern.
	 * @property {string} [value] If set, this becomes the default value of the input.
	 * @property {CountryCodeType} [country] The default country code (e.g., `"US"`). Defaults to `"US"` if not specified.
	 * @property {Array.<CountryCodeType>} [availableCountries] Array of available country codes (e.g., `["US", "CA", "GB"]`).
	 */

	/**
	 * Create a telephone input field.
	 *
	 * @param {string} name
	 * @param {FormFieldSharedParamsType & TelInputParamsType} params
	 * @returns {string}
	 */
	telInput = (name, params) => {
		const instance = this;

		// Set up the template chunks using the shared params
		const formDelimiter =
			instance.settings.formDelimiter !== "\n"
				? `${instance.settings.formDelimiter} `
				: "";
		const templateChunks = [
			`${name}${params.required ? "*" : ""} = TelInput(`,
		].concat(composeSharedFieldParams(params, formDelimiter));

		// Add the other params
		if (params.placeholder !== undefined) {
			templateChunks.push(
				`\t${formDelimiter}placeholder = ${params.placeholder}`,
			);
		}
		if (params.maxlength !== undefined) {
			templateChunks.push(`\t${formDelimiter}maxlength = ${params.maxlength}`);
		}
		if (params.pattern !== undefined) {
			templateChunks.push(`\t${formDelimiter}pattern = ${params.pattern}`);
		}
		if (params.value !== undefined) {
			templateChunks.push(`\t${formDelimiter}value = ${params.value}`);
		}
		if (params.country !== undefined) {
			templateChunks.push(`\t${formDelimiter}country = ${params.country}`);
		}
		if (params.availableCountries !== undefined) {
			templateChunks.push(
				`\t${formDelimiter}availableCountries = ${params.availableCountries.join(", ")}`,
			);
		}

		// Close the input and add the attributes (if applicable)
		templateChunks.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunks.unshift(`[${attrs.join(" ")}]`);
		}

		// Create a wrapping <div> with the display condition (if applicable)
		if (params.displayCondition !== undefined) {
			templateChunks.unshift(`{% if ${params.displayCondition.condition} %}`);
			templateChunks.unshift(
				`::: [{$ ${params.displayCondition.dependencies.join(" ")} $}]`,
			);
			templateChunks.push("{% endif %}");
			templateChunks.push(":::");
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunks.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Password input params.
	 *
	 * @typedef {Object} PasswordInputParamsType
	 * @property {string} [placeholder] Sets the `placeholder` attribute of the input.
	 * @property {number} [maxlength] If set, this becomes the maximum number of allowed characters in the input.
	 * @property {string} [pattern] If set, the input value must match the given pattern.
	 * @property {string} [value] If set, this becomes the default value of the input.
	 */

	/**
	 * Create a password input field.
	 *
	 * @param {string} name
	 * @param {FormFieldSharedParamsType & PasswordInputParamsType} params
	 * @returns {string}
	 */
	passwordInput = (name, params) => {
		const instance = this;

		// Set up the template chunks using the shared params
		const formDelimiter =
			instance.settings.formDelimiter !== "\n"
				? `${instance.settings.formDelimiter} `
				: "";
		const templateChunks = [
			`${name}${params.required ? "*" : ""} = PasswordInput(`,
		].concat(composeSharedFieldParams(params, formDelimiter));

		// Add the other params
		if (params.placeholder !== undefined) {
			templateChunks.push(
				`\t${formDelimiter}placeholder = ${params.placeholder}`,
			);
		}
		if (params.maxlength !== undefined) {
			templateChunks.push(`\t${formDelimiter}maxlength = ${params.maxlength}`);
		}
		if (params.pattern !== undefined) {
			templateChunks.push(`\t${formDelimiter}pattern = ${params.pattern}`);
		}
		if (params.value !== undefined) {
			templateChunks.push(`\t${formDelimiter}value = ${params.value}`);
		}

		// Close the input and add the attributes (if applicable)
		templateChunks.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunks.unshift(`[${attrs.join(" ")}]`);
		}

		// Create a wrapping <div> with the display condition (if applicable)
		if (params.displayCondition !== undefined) {
			templateChunks.unshift(`{% if ${params.displayCondition.condition} %}`);
			templateChunks.unshift(
				`::: [{$ ${params.displayCondition.dependencies.join(" ")} $}]`,
			);
			templateChunks.push("{% endif %}");
			templateChunks.push(":::");
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunks.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Number input params.
	 *
	 * @typedef {Object} NumberInputParamsType
	 * @property {string} [placeholder] Sets the `placeholder` attribute of the input.
	 * @property {number} [min] Sets the minimum allowed value.
	 * @property {number} [max] Sets the maximum allowed value.
	 * @property {number} [step] Sets the stepping interval.
	 * @property {string} [unit] Text to display before the input as a unit (e.g., `"$"`, `"€"`).
	 * @property {string} [unitEnd] Text to display after the input as a unit (e.g., `"kg"`, `"%"`).
	 * @property {number} [value] If set, this becomes the default value of the input.
	 */

	/**
	 * Create a number input field.
	 *
	 * @param {string} name
	 * @param {FormFieldSharedParamsType & NumberInputParamsType} params
	 * @returns {string}
	 */
	numberInput = (name, params) => {
		const instance = this;

		// Set up the template chunks using the shared params
		const formDelimiter =
			instance.settings.formDelimiter !== "\n"
				? `${instance.settings.formDelimiter} `
				: "";
		const templateChunks = [
			`${name}${params.required ? "*" : ""} = NumberInput(`,
		].concat(composeSharedFieldParams(params, formDelimiter));

		// Add the other params
		if (params.placeholder !== undefined) {
			templateChunks.push(
				`\t${formDelimiter}placeholder = ${params.placeholder}`,
			);
		}
		if (params.min !== undefined) {
			templateChunks.push(`\t${formDelimiter}min = ${params.min}`);
		}
		if (params.max !== undefined) {
			templateChunks.push(`\t${formDelimiter}max = ${params.max}`);
		}
		if (params.step !== undefined) {
			templateChunks.push(`\t${formDelimiter}step = ${params.step}`);
		}
		if (params.unit !== undefined) {
			templateChunks.push(`\t${formDelimiter}unit = ${params.unit}`);
		}
		if (params.unitEnd !== undefined) {
			templateChunks.push(`\t${formDelimiter}unitend = ${params.unitEnd}`);
		}
		if (params.value !== undefined) {
			templateChunks.push(`\t${formDelimiter}value = ${params.value}`);
		}

		// Close the input and add the attributes (if applicable)
		templateChunks.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunks.unshift(`[${attrs.join(" ")}]`);
		}

		// Create a wrapping <div> with the display condition (if applicable)
		if (params.displayCondition !== undefined) {
			templateChunks.unshift(`{% if ${params.displayCondition.condition} %}`);
			templateChunks.unshift(
				`::: [{$ ${params.displayCondition.dependencies.join(" ")} $}]`,
			);
			templateChunks.push("{% endif %}");
			templateChunks.push(":::");
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunks.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Select option.
	 *
	 * @typedef {Object} SelectOptionType
	 * @property {string} label The display text for the option.
	 * @property {string} [value] The value for the option. If not provided, label is used as value.
	 */

	/**
	 * Select box params.
	 *
	 * @typedef {Object} SelectBoxParamsType
	 * @property {string} [placeholder] Sets the placeholder option of the select.
	 * @property {Array<string|SelectOptionType>} options Array of options as strings or SelectOptionType objects.
	 * @property {string} [selected] Pre-selected option value.
	 */

	/**
	 * Create a select box field.
	 *
	 * @param {string} name
	 * @param {FormFieldSharedParamsType & SelectBoxParamsType} params
	 * @returns {string}
	 */
	selectBox = (name, params) => {
		const instance = this;

		// Set up the template chunks using the shared params
		const formDelimiter =
			instance.settings.formDelimiter !== "\n"
				? `${instance.settings.formDelimiter} `
				: "";
		const templateChunks = [
			`${name}${params.required ? "*" : ""} = SelectBox(`,
		].concat(composeSharedFieldParams(params, formDelimiter));

		// Add the other params
		if (params.placeholder !== undefined) {
			templateChunks.push(
				`\t${formDelimiter}placeholder = ${params.placeholder}`,
			);
		}

		const optionsString = params.options
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
		templateChunks.push(`\t${formDelimiter}options = ${optionsString}`);

		if (params.selected !== undefined) {
			templateChunks.push(`\t${formDelimiter}selected = ${params.selected}`);
		}

		// Close the input and add the attributes (if applicable)
		templateChunks.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunks.unshift(`[${attrs.join(" ")}]`);
		}

		// Create a wrapping <div> with the display condition (if applicable)
		if (params.displayCondition !== undefined) {
			templateChunks.unshift(`{% if ${params.displayCondition.condition} %}`);
			templateChunks.unshift(
				`::: [{$ ${params.displayCondition.dependencies.join(" ")} $}]`,
			);
			templateChunks.push("{% endif %}");
			templateChunks.push(":::");
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunks.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Choice option.
	 *
	 * @typedef {Object} ChoiceOptionType
	 * @property {string} label The display text for the choice.
	 * @property {string} [value] The value for the choice. If not provided, label is used as value.
	 */

	/**
	 * Choice input params.
	 *
	 * @typedef {Object} ChoiceInputParamsType
	 * @property {Array<string|ChoiceOptionType>} choices Array of choices as strings or ChoiceOptionType objects.
	 * @property {true} [multiple] Allow multiple selections.
	 * @property {true} [horizontal] Display choices horizontally.
	 * @property {true} [hideFormText] Hide the form text.
	 * @property {Array<string>} [checked] Array of pre-checked choice values.
	 */

	/**
	 * Create a choice input field.
	 *
	 * @param {string} name
	 * @param {FormFieldSharedParamsType & ChoiceInputParamsType} params
	 * @returns {string}
	 */
	choiceInput = (name, params) => {
		const instance = this;

		// Set up the template chunks using the shared params
		const formDelimiter =
			instance.settings.formDelimiter !== "\n"
				? `${instance.settings.formDelimiter} `
				: "";
		const templateChunks = [
			`${name}${params.required ? "*" : ""} = ChoiceInput(`,
		].concat(composeSharedFieldParams(params, formDelimiter));

		// Add the other params
		const choicesString = params.choices
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
		templateChunks.push(`\t${formDelimiter}choices = ${choicesString}`);

		if (params.multiple !== undefined) {
			templateChunks.push(`\t${formDelimiter}multiple`);
		}
		if (params.horizontal !== undefined) {
			templateChunks.push(`\t${formDelimiter}horizontal`);
		}
		if (params.hideFormText !== undefined) {
			templateChunks.push(`\t${formDelimiter}hideformtext`);
		}
		if (params.checked !== undefined) {
			templateChunks.push(
				`\t${formDelimiter}checked = ${params.checked.join(", ")}`,
			);
		}

		// Close the input and add the attributes (if applicable)
		templateChunks.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunks.unshift(`[${attrs.join(" ")}]`);
		}

		// Create a wrapping <div> with the display condition (if applicable)
		if (params.displayCondition !== undefined) {
			templateChunks.unshift(`{% if ${params.displayCondition.condition} %}`);
			templateChunks.unshift(
				`::: [{$ ${params.displayCondition.dependencies.join(" ")} $}]`,
			);
			templateChunks.push("{% endif %}");
			templateChunks.push(":::");
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunks.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Picture choice option.
	 *
	 * @typedef {Object} PictureChoiceOptionType
	 * @property {string} label The display text for the choice.
	 * @property {string} [value] The value for the choice. If not provided, label is used as value.
	 * @property {string} image The URL of the image.
	 */

	/**
	 * Picture choice params.
	 *
	 * @typedef {Object} PictureChoiceParamsType
	 * @property {Array<PictureChoiceOptionType>} choices Array of picture choices.
	 * @property {true} [multiple] Allow multiple selections.
	 * @property {true} [supersize] Make the pictures larger.
	 * @property {true} [hideLabels] Hide the text labels.
	 * @property {true} [hideFormText] Hide the form text.
	 * @property {Array<string>} [checked] Array of pre-checked choice values.
	 */

	/**
	 * Create a picture choice field.
	 *
	 * @param {string} name
	 * @param {FormFieldSharedParamsType & PictureChoiceParamsType} params
	 * @returns {string}
	 */
	pictureChoice = (name, params) => {
		const instance = this;

		// Set up the template chunks using the shared params
		const formDelimiter =
			instance.settings.formDelimiter !== "\n"
				? `${instance.settings.formDelimiter} `
				: "";
		const templateChunks = [
			`${name}${params.required ? "*" : ""} = PictureChoice(`,
		].concat(composeSharedFieldParams(params, formDelimiter));

		// Add the other params
		const choicesString = params.choices
			.map((choice) => {
				const baseChoice =
					choice.value !== undefined
						? `"${choice.value}" ${choice.label}`
						: choice.label;
				return `${baseChoice} && ${choice.image}`;
			})
			.join(", ");
		templateChunks.push(`\t${formDelimiter}choices = ${choicesString}`);

		if (params.multiple !== undefined) {
			templateChunks.push(`\t${formDelimiter}multiple`);
		}
		if (params.supersize !== undefined) {
			templateChunks.push(`\t${formDelimiter}supersize`);
		}
		if (params.hideLabels !== undefined) {
			templateChunks.push(`\t${formDelimiter}hidelabels`);
		}
		if (params.hideFormText !== undefined) {
			templateChunks.push(`\t${formDelimiter}hideformtext`);
		}
		if (params.checked !== undefined) {
			templateChunks.push(
				`\t${formDelimiter}checked = ${params.checked.join(", ")}`,
			);
		}

		// Close the input and add the attributes (if applicable)
		templateChunks.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunks.unshift(`[${attrs.join(" ")}]`);
		}

		// Create a wrapping <div> with the display condition (if applicable)
		if (params.displayCondition !== undefined) {
			templateChunks.unshift(`{% if ${params.displayCondition.condition} %}`);
			templateChunks.unshift(
				`::: [{$ ${params.displayCondition.dependencies.join(" ")} $}]`,
			);
			templateChunks.push("{% endif %}");
			templateChunks.push(":::");
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunks.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Rating input params.
	 *
	 * @typedef {Object} RatingInputParamsType
	 * @property {number} [outOf] Number of rating options (1-10). Defaults to `5`.
	 * @property {"star"|"heart"|"hearts"} [icon] Icon to use for rating. Defaults to `"star"`.
	 * @property {number} [value] Pre-selected rating value.
	 * @property {true} [hideLabels] Whether to hide the numeric labels.
	 */

	/**
	 * Create a rating input field.
	 *
	 * @param {string} name
	 * @param {FormFieldSharedParamsType & RatingInputParamsType} params
	 * @returns {string}
	 */
	ratingInput = (name, params) => {
		const instance = this;

		// Set up the template chunks using the shared params
		const formDelimiter =
			instance.settings.formDelimiter !== "\n"
				? `${instance.settings.formDelimiter} `
				: "";
		const templateChunks = [
			`${name}${params.required ? "*" : ""} = RatingInput(`,
		].concat(composeSharedFieldParams(params, formDelimiter));

		// Add the other params
		if (params.outOf !== undefined) {
			templateChunks.push(`\t${formDelimiter}outof = ${params.outOf}`);
		}
		if (params.icon !== undefined) {
			templateChunks.push(`\t${formDelimiter}icon = ${params.icon}`);
		}
		if (params.value !== undefined) {
			templateChunks.push(`\t${formDelimiter}value = ${params.value}`);
		}
		if (params.hideLabels !== undefined) {
			templateChunks.push(`\t${formDelimiter}hidelabels`);
		}

		// Close the input and add the attributes (if applicable)
		templateChunks.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunks.unshift(`[${attrs.join(" ")}]`);
		}

		// Create a wrapping <div> with the display condition (if applicable)
		if (params.displayCondition !== undefined) {
			templateChunks.unshift(`{% if ${params.displayCondition.condition} %}`);
			templateChunks.unshift(
				`::: [{$ ${params.displayCondition.dependencies.join(" ")} $}]`,
			);
			templateChunks.push("{% endif %}");
			templateChunks.push(":::");
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunks.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Opinion scale input params.
	 *
	 * @typedef {Object} OpinionScaleParamsType
	 * @property {number} [startAt] Starting number (`0` or `1`). Defaults to `0`.
	 * @property {number} [outOf] Maximum scale value (5-10). Defaults to `10`.
	 * @property {string} [labelStart] Label for the start of the scale.
	 * @property {string} [labelEnd] Label for the end of the scale.
	 * @property {true} [hideLabelStart] Whether to hide the start label.
	 * @property {true} [hideLabelEnd] Whether to hide the end label.
	 * @property {number} [value] Pre-selected value.
	 */

	/**
	 * Create an opinion scale field.
	 *
	 * @param {string} name
	 * @param {FormFieldSharedParamsType & OpinionScaleParamsType} params
	 * @returns {string}
	 */
	opinionScale = (name, params) => {
		const instance = this;

		// Set up the template chunks using the shared params
		const formDelimiter =
			instance.settings.formDelimiter !== "\n"
				? `${instance.settings.formDelimiter} `
				: "";
		const templateChunks = [
			`${name}${params.required ? "*" : ""} = OpinionScale(`,
		].concat(composeSharedFieldParams(params, formDelimiter));

		// Add the other params
		if (params.startAt !== undefined) {
			templateChunks.push(`\t${formDelimiter}startat = ${params.startAt}`);
		}
		if (params.outOf !== undefined) {
			templateChunks.push(`\t${formDelimiter}outof = ${params.outOf}`);
		}
		if (params.labelStart !== undefined) {
			templateChunks.push(
				`\t${formDelimiter}labelstart = ${params.labelStart}`,
			);
		}
		if (params.labelEnd !== undefined) {
			templateChunks.push(`\t${formDelimiter}labelend = ${params.labelEnd}`);
		}
		if (params.hideLabelStart !== undefined) {
			templateChunks.push(`\t${formDelimiter}hidelabelstart`);
		}
		if (params.hideLabelEnd !== undefined) {
			templateChunks.push(`\t${formDelimiter}hidelabelend`);
		}
		if (params.value !== undefined) {
			templateChunks.push(`\t${formDelimiter}value = ${params.value}`);
		}

		// Close the input and add the attributes (if applicable)
		templateChunks.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunks.unshift(`[${attrs.join(" ")}]`);
		}

		// Create a wrapping <div> with the display condition (if applicable)
		if (params.displayCondition !== undefined) {
			templateChunks.unshift(`{% if ${params.displayCondition.condition} %}`);
			templateChunks.unshift(
				`::: [{$ ${params.displayCondition.dependencies.join(" ")} $}]`,
			);
			templateChunks.push("{% endif %}");
			templateChunks.push(":::");
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunks.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Datetime input params.
	 *
	 * @typedef {Object} DatetimeInputParamsType
	 * @property {string} [placeholder] Sets the `placeholder` attribute of the input.
	 * @property {string} [min] Sets the minimum allowed datetime value (`"YYYY-MM-DDTHH:mm"`).
	 * @property {string} [max] Sets the maximum allowed datetime value (`"YYYY-MM-DDTHH:mm"`).
	 * @property {string} [step] Sets the stepping interval.
	 * @property {string} [value] Pre-selected datetime value (`"YYYY-MM-DDTHH:mm"`).
	 */

	/**
	 * Create a datetime input field.
	 *
	 * @param {string} name
	 * @param {FormFieldSharedParamsType & DatetimeInputParamsType} params
	 * @returns {string}
	 */
	datetimeInput = (name, params) => {
		const instance = this;

		// Set up the template chunks using the shared params
		const formDelimiter =
			instance.settings.formDelimiter !== "\n"
				? `${instance.settings.formDelimiter} `
				: "";
		const templateChunks = [
			`${name}${params.required ? "*" : ""} = DatetimeInput(`,
		].concat(composeSharedFieldParams(params, formDelimiter));

		// Add the other params
		if (params.placeholder !== undefined) {
			templateChunks.push(
				`\t${formDelimiter}placeholder = ${params.placeholder}`,
			);
		}
		if (params.min !== undefined) {
			templateChunks.push(`\t${formDelimiter}min = ${params.min}`);
		}
		if (params.max !== undefined) {
			templateChunks.push(`\t${formDelimiter}max = ${params.max}`);
		}
		if (params.step !== undefined) {
			templateChunks.push(`\t${formDelimiter}step = ${params.step}`);
		}
		if (params.value !== undefined) {
			templateChunks.push(`\t${formDelimiter}value = ${params.value}`);
		}

		// Close the input and add the attributes (if applicable)
		templateChunks.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunks.unshift(`[${attrs.join(" ")}]`);
		}

		// Create a wrapping <div> with the display condition (if applicable)
		if (params.displayCondition !== undefined) {
			templateChunks.unshift(`{% if ${params.displayCondition.condition} %}`);
			templateChunks.unshift(
				`::: [{$ ${params.displayCondition.dependencies.join(" ")} $}]`,
			);
			templateChunks.push("{% endif %}");
			templateChunks.push(":::");
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunks.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Date input params.
	 *
	 * @typedef {Object} DateInputParamsType
	 * @property {string} [placeholder] Sets the `placeholder` attribute of the input.
	 * @property {string} [min] Sets the minimum allowed date value (`"YYYY-MM-DD"`).
	 * @property {string} [max] Sets the maximum allowed date value (`"YYYY-MM-DD"`).
	 * @property {string} [step] Sets the stepping interval.
	 * @property {string} [value] Pre-selected date value (`"YYYY-MM-DD"`).
	 */

	/**
	 * Create a date input field.
	 *
	 * @param {string} name
	 * @param {FormFieldSharedParamsType & DateInputParamsType} params
	 * @returns {string}
	 */
	dateInput = (name, params) => {
		const instance = this;

		// Set up the template chunks using the shared params
		const formDelimiter =
			instance.settings.formDelimiter !== "\n"
				? `${instance.settings.formDelimiter} `
				: "";
		const templateChunks = [
			`${name}${params.required ? "*" : ""} = DateInput(`,
		].concat(composeSharedFieldParams(params, formDelimiter));

		// Add the other params
		if (params.placeholder !== undefined) {
			templateChunks.push(
				`\t${formDelimiter}placeholder = ${params.placeholder}`,
			);
		}
		if (params.min !== undefined) {
			templateChunks.push(`\t${formDelimiter}min = ${params.min}`);
		}
		if (params.max !== undefined) {
			templateChunks.push(`\t${formDelimiter}max = ${params.max}`);
		}
		if (params.step !== undefined) {
			templateChunks.push(`\t${formDelimiter}step = ${params.step}`);
		}
		if (params.value !== undefined) {
			templateChunks.push(`\t${formDelimiter}value = ${params.value}`);
		}

		// Close the input and add the attributes (if applicable)
		templateChunks.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunks.unshift(`[${attrs.join(" ")}]`);
		}

		// Create a wrapping <div> with the display condition (if applicable)
		if (params.displayCondition !== undefined) {
			templateChunks.unshift(`{% if ${params.displayCondition.condition} %}`);
			templateChunks.unshift(
				`::: [{$ ${params.displayCondition.dependencies.join(" ")} $}]`,
			);
			templateChunks.push("{% endif %}");
			templateChunks.push(":::");
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunks.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Time input params.
	 *
	 * @typedef {Object} TimeInputParamsType
	 * @property {string} [placeholder] Sets the `placeholder` attribute of the input.
	 * @property {string} [min] Sets the minimum allowed time value (`"HH:mm"`).
	 * @property {string} [max] Sets the maximum allowed time value (`"HH:mm"`).
	 * @property {string} [step] Sets the stepping interval.
	 * @property {string} [value] Pre-selected time value (`"HH:mm"`).
	 */

	/**
	 * Create a time input field.
	 *
	 * @param {string} name
	 * @param {FormFieldSharedParamsType & TimeInputParamsType} params
	 * @returns {string}
	 */
	timeInput = (name, params) => {
		const instance = this;

		// Set up the template chunks using the shared params
		const formDelimiter =
			instance.settings.formDelimiter !== "\n"
				? `${instance.settings.formDelimiter} `
				: "";
		const templateChunks = [
			`${name}${params.required ? "*" : ""} = TimeInput(`,
		].concat(composeSharedFieldParams(params, formDelimiter));

		// Add the other params
		if (params.placeholder !== undefined) {
			templateChunks.push(
				`\t${formDelimiter}placeholder = ${params.placeholder}`,
			);
		}
		if (params.min !== undefined) {
			templateChunks.push(`\t${formDelimiter}min = ${params.min}`);
		}
		if (params.max !== undefined) {
			templateChunks.push(`\t${formDelimiter}max = ${params.max}`);
		}
		if (params.step !== undefined) {
			templateChunks.push(`\t${formDelimiter}step = ${params.step}`);
		}
		if (params.value !== undefined) {
			templateChunks.push(`\t${formDelimiter}value = ${params.value}`);
		}

		// Close the input and add the attributes (if applicable)
		templateChunks.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunks.unshift(`[${attrs.join(" ")}]`);
		}

		// Create a wrapping <div> with the display condition (if applicable)
		if (params.displayCondition !== undefined) {
			templateChunks.unshift(`{% if ${params.displayCondition.condition} %}`);
			templateChunks.unshift(
				`::: [{$ ${params.displayCondition.dependencies.join(" ")} $}]`,
			);
			templateChunks.push("{% endif %}");
			templateChunks.push(":::");
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunks.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * File input params.
	 *
	 * @typedef {Object} FileInputParamsType
	 * @property {number} [sizeLimit] Maximum file size in MB. Defaults to `10`.
	 * @property {true} [imageOnly] When set, only image files are accepted.
	 * @property {string} [currentFile] The current file that exists in the database. Use a URL for best results, for example, https://example.s3.com/image.png.
	 */

	/**
	 * Create a file input field.
	 *
	 * @param {string} name
	 * @param {FormFieldSharedParamsType & FileInputParamsType} params
	 * @returns {string}
	 */
	fileInput = (name, params) => {
		const instance = this;

		// Set up the template chunks using the shared params
		const formDelimiter =
			instance.settings.formDelimiter !== "\n"
				? `${instance.settings.formDelimiter} `
				: "";
		const templateChunks = [
			`${name}${params.required ? "*" : ""} = FileInput(`,
		].concat(composeSharedFieldParams(params, formDelimiter));

		// Add the other params
		if (params.sizeLimit !== undefined) {
			templateChunks.push(`\t${formDelimiter}sizelimit = ${params.sizeLimit}`);
		}
		if (params.imageOnly !== undefined) {
			templateChunks.push(`\t${formDelimiter}imageonly`);
		}
		if (params.currentFile !== undefined) {
			templateChunks.push(
				`\t${formDelimiter}currentfile = ${params.currentFile}`,
			);
		}

		// Close the input and add the attributes (if applicable)
		templateChunks.push(")");
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunks.unshift(`[${attrs.join(" ")}]`);
		}

		// Create a wrapping <div> with the display condition (if applicable)
		if (params.displayCondition !== undefined) {
			templateChunks.unshift(`{% if ${params.displayCondition.condition} %}`);
			templateChunks.unshift(
				`::: [{$ ${params.displayCondition.dependencies.join(" ")} $}]`,
			);
			templateChunks.push("{% endif %}");
			templateChunks.push(":::");
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunks.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Slide params.
	 *
	 * @typedef {Object} SlideParamsType
	 * @property {string} [jumpCondition] Logic jump condition that must be `true` for slide to be shown.
	 * @property {string} [pageProgress] Progress indicator shown on top (e.g. `"50%"` or `"1/2"`).
	 * @property {"start"|"center"|"end"|"stretch"} [buttonAlignment] Set the alignment of this slide's CTA button.
	 * @property {true} [post] If set, posts form data up to this slide when going to the next one.
	 * @property {true} [disablePrevious] If set, disables the previous button.
	 */

	/**
	 * Create a slide.
	 *
	 * @param {SlideParamsType} [params]
	 * @returns {string}
	 */
	slide = (params) => {
		var instance = this;

		if (!params) {
			params = {};
		}
		var templateChunks = [];

		// Add the slide and params
		if (
			instance.template
				.split("\n")
				.filter((line) => !line.trim().startsWith("#!"))
				.join("\n")
				.trim() !== ""
		) {
			templateChunks.push(instance.settings.slideDelimiter);
		}
		if (params.jumpCondition !== undefined) {
			templateChunks.push(`-> ${params.jumpCondition}`);
		}
		if (params.pageProgress !== undefined) {
			templateChunks.push(`|> ${params.pageProgress}`);
		}
		if (params.buttonAlignment !== undefined) {
			templateChunks.push(`=| ${params.buttonAlignment}`);
		}
		if (params.post !== undefined) {
			templateChunks.push(">> post");
		}
		if (params.disablePrevious !== undefined) {
			templateChunks.push("<< disable");
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunks.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Start slide params.
	 *
	 * @typedef {Object} StartSlideParamsType
	 * @property {string} [buttonText] Custom text for the start button.
	 * @property {"start"|"center"|"end"|"stretch"} [buttonAlignment] Set the alignment of this slide's CTA button.
	 */

	/**
	 * Create a start slide.
	 *
	 * @param {StartSlideParamsType} [params]
	 * @returns {string}
	 */
	startSlide = (params) => {
		const instance = this;

		if (!params) {
			params = {};
		}
		const templateChunks = [];

		// Add the slide and params
		if (
			instance.template
				.split("\n")
				.filter((line) => !line.trim().startsWith("#!"))
				.join("\n")
				.trim() !== ""
		) {
			templateChunks.push(instance.settings.slideDelimiter);
		}
		if (params.buttonText !== undefined) {
			templateChunks.push(`-> start -> ${params.buttonText}`);
		} else {
			templateChunks.push("-> start");
		}
		if (params.buttonAlignment !== undefined) {
			templateChunks.push(`=| ${params.buttonAlignment}`);
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunks.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * End slide params.
	 *
	 * @typedef {Object} EndSlideParamsType
	 * @property {string} [redirectUrl] URL to redirect to from the end slide.
	 */

	/**
	 * Create an end slide.
	 *
	 * @param {EndSlideParamsType} [params]
	 * @returns {string}
	 */
	endSlide = (params) => {
		const instance = this;

		if (!params) {
			params = {};
		}
		const templateChunks = [];

		// Add the slide and params
		if (
			instance.template
				.split("\n")
				.filter((line) => !line.trim().startsWith("#!"))
				.join("\n")
				.trim() !== ""
		) {
			templateChunks.push(instance.settings.slideDelimiter);
		}
		if (params.redirectUrl !== undefined) {
			templateChunks.push(`-> end -> ${params.redirectUrl}`);
		} else {
			templateChunks.push("-> end");
		}

		// Create the result, add it to the template and return
		const result = `\n${templateChunks.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Create a data-block.
	 *
	 * @param {Object} data
	 * @returns {string}
	 */
	dataBlock = (data) => {
		const instance = this;

		const result = `\n\`\`\`data\n${JSON.stringify(data, null, 2)}\n\`\`\`\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Create free-form content.
	 *
	 * @param {string} content
	 * @returns {string}
	 */
	free = (content) => {
		const instance = this;

		const result = `\n${content}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Block-level element params.
	 *
	 * @typedef {Object} BlockElemParamsType
	 * @property {string} [id] The id attribute of the element.
	 * @property {Array.<string>} [classNames] The CSS class names of the element.
	 * @property {Array.<HTMLAttributeType>} [attrs] Other HTML attributes of the element.
	 */

	/**
	 * Create a paragraph.
	 *
	 * @param {string} content
	 * @param {BlockElemParamsType} [params]
	 * @returns {string}
	 */
	p = (content, params) => {
		const instance = this;

		if (!params) {
			params = {};
		}
		const attrs = composeAttrs(params);
		let result = "";
		if (attrs.length > 0) {
			result = `\n[${attrs.join(" ")}]\n${content}\n`;
		} else {
			result = `\n${content}\n`;
		}
		instance.template += result;
		return result;
	};

	/**
	 * Create a heading 1.
	 *
	 * @param {string} content
	 * @param {BlockElemParamsType} [params]
	 * @returns {string}
	 */
	h1 = (content, params) => {
		const instance = this;

		if (!params) {
			params = {};
		}
		const attrs = composeAttrs(params);
		let result = "";
		if (attrs.length > 0) {
			result = `\n# [${attrs.join(" ")}] ${content}\n`;
		} else {
			result = `\n# ${content}\n`;
		}
		instance.template += result;
		return result;
	};

	/**
	 * Create a heading 2.
	 *
	 * @param {string} content
	 * @param {BlockElemParamsType} [params]
	 * @returns {string}
	 */
	h2 = (content, params) => {
		const instance = this;

		if (!params) {
			params = {};
		}
		const attrs = composeAttrs(params);
		let result = "";
		if (attrs.length > 0) {
			result = `\n## [${attrs.join(" ")}] ${content}\n`;
		} else {
			result = `\n## ${content}\n`;
		}
		instance.template += result;
		return result;
	};

	/**
	 * Create a heading 3.
	 *
	 * @param {string} content
	 * @param {BlockElemParamsType} [params]
	 * @returns {string}
	 */
	h3 = (content, params) => {
		const instance = this;

		if (!params) {
			params = {};
		}
		const attrs = composeAttrs(params);
		let result = "";
		if (attrs.length > 0) {
			result = `\n### [${attrs.join(" ")}] ${content}\n`;
		} else {
			result = `\n### ${content}\n`;
		}
		instance.template += result;
		return result;
	};

	/**
	 * Create a heading 4.
	 *
	 * @param {string} content
	 * @param {BlockElemParamsType} [params]
	 * @returns {string}
	 */
	h4 = (content, params) => {
		const instance = this;

		if (!params) {
			params = {};
		}
		const attrs = composeAttrs(params);
		let result = "";
		if (attrs.length > 0) {
			result = `\n#### [${attrs.join(" ")}] ${content}\n`;
		} else {
			result = `\n#### ${content}\n`;
		}
		instance.template += result;
		return result;
	};

	/**
	 * Create a heading 5.
	 *
	 * @param {string} content
	 * @param {BlockElemParamsType} [params]
	 * @returns {string}
	 */
	h5 = (content, params) => {
		const instance = this;

		if (!params) {
			params = {};
		}
		const attrs = composeAttrs(params);
		let result = "";
		if (attrs.length > 0) {
			result = `\n##### [${attrs.join(" ")}] ${content}\n`;
		} else {
			result = `\n##### ${content}\n`;
		}
		instance.template += result;
		return result;
	};

	/**
	 * Create a heading 6.
	 *
	 * @param {string} content
	 * @param {BlockElemParamsType} [params]
	 * @returns {string}
	 */
	h6 = (content, params) => {
		const instance = this;

		if (!params) {
			params = {};
		}
		const attrs = composeAttrs(params);
		let result = "";
		if (attrs.length > 0) {
			result = `\n###### [${attrs.join(" ")}] ${content}\n`;
		} else {
			result = `\n###### ${content}\n`;
		}
		instance.template += result;
		return result;
	};

	/**
	 * Create an unordered list.
	 *
	 * @param {Array.<string>} items
	 * @param {BlockElemParamsType} [params]
	 * @returns {string}
	 */
	ul = (items, params) => {
		const instance = this;

		if (!params) {
			params = {};
		}
		const templateChunks = [];
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunks.push(`- [${attrs.join(" ")}]`);
		}
		items.forEach((item) => {
			templateChunks.push(`- ${item}`);
		});
		const result = `\n${templateChunks.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Create an ordered list.
	 *
	 * @param {Array.<string>} items
	 * @param {BlockElemParamsType} [params]
	 * @returns {string}
	 */
	ol = (items, params) => {
		const instance = this;

		if (!params) {
			params = {};
		}
		const templateChunks = [];
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunks.push(`0. [${attrs.join(" ")}]`);
		}
		items.forEach((item, index) => {
			templateChunks.push(`${index + 1}. ${item}`);
		});
		const result = `\n${templateChunks.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Create a blockquote.
	 *
	 * @param {string} content
	 * @param {BlockElemParamsType} [params]
	 * @returns {string}
	 */
	blockquote = (content, params) => {
		const instance = this;

		if (!params) {
			params = {};
		}
		const templateChunks = [];
		const attrs = composeAttrs(params);
		if (attrs.length > 0) {
			templateChunks.push(`> [${attrs.join(" ")}]`);
		}
		const lines = content.split("\n");
		lines.forEach((line) => {
			templateChunks.push(`> ${line}`);
		});
		const result = `\n${templateChunks.join("\n")}\n`;
		instance.template += result;
		return result;
	};

	/**
	 * Code params.
	 *
	 * @typedef {Object} CodeParamsType
	 * @property {string} [language] The language of the code.
	 */

	/**
	 * Create a block-level code element.
	 *
	 * @param {string} content
	 * @param {BlockElemParamsType & CodeParamsType} [params]
	 * @returns {string}
	 */
	code = (content, params) => {
		const instance = this;

		if (!params) {
			params = {};
		}
		const attrs = composeAttrs(params);
		let result = "";
		if (attrs.length > 0) {
			const language = params.language || "";
			result = `\n\`\`\`${language} [${attrs.join(" ")}]\n${content}\n\`\`\`\n`;
		} else {
			const language = params.language || "";
			result = `\n\`\`\`${language}\n${content}\n\`\`\`\n`;
		}
		instance.template += result;
		return result;
	};

	/**
	 * Create a horizontal rule.
	 *
	 * @returns {string}
	 */
	hr = () => {
		const instance = this;

		let result = "";
		if (instance.settings.slideDelimiter === "---") {
			result = "\n***\n";
		} else {
			result = "\n---\n";
		}
		instance.template += result;
		return result;
	};

	/**
	 * Division params.
	 *
	 * @typedef {Object} DivParamsType
	 * @property {Array.<string>} [bind] The data to bind to the division, e.g., `["name", "email", "birthday"]`.
	 */

	/**
	 * Create a division start tag.
	 *
	 * @param {BlockElemParamsType & DivParamsType} [params]
	 * @returns {string}
	 */
	divStart = (params) => {
		const instance = this;

		if (!params) {
			params = {};
		}
		if (!params.bind) {
			params.bind = [];
		}

		const attrs = composeAttrs(params);
		let result = "";

		if (attrs.length > 0 || params.bind.length > 0) {
			const attrPart = attrs.length > 0 ? attrs.join(" ") : "";
			const bindPart =
				params.bind.length > 0 ? `{$ ${params.bind.join(" ")} $}` : "";

			// Handle cases where we might have either attrs or bindings or both
			if (attrPart && bindPart) {
				result = `\n::: [${attrPart} ${bindPart}]\n`;
			} else if (attrPart) {
				result = `\n::: [${attrPart}]\n`;
			} else if (bindPart) {
				result = `\n::: [${bindPart}]\n`;
			}
		} else {
			result = "\n:::\n";
		}

		instance.template += result;
		return result;
	};

	/**
	 * Create a division end tag.
	 *
	 * @returns {string}
	 */
	divEnd = () => {
		const instance = this;

		const result = "\n:::\n";
		instance.template += result;
		return result;
	};

	/**
	 * Create a division.
	 *
	 * @param {string} content
	 * @param {BlockElemParamsType & DivParamsType} [params]
	 * @returns {string}
	 */
	div = (content, params) => {
		const instance = this;

		if (!params) {
			params = {};
		}
		if (!params.bind) {
			params.bind = [];
		}

		const attrs = composeAttrs(params);
		let result = "";

		// Start tag construction
		if (attrs.length > 0 || params.bind.length > 0) {
			const attrPart = attrs.length > 0 ? attrs.join(" ") : "";
			const bindPart =
				params.bind.length > 0 ? `{$ ${params.bind.join(" ")} $}` : "";

			// Handle cases where we might have either attrs or bindings or both
			if (attrPart && bindPart) {
				result = `\n::: [${attrPart} ${bindPart}]\n`;
			} else if (attrPart) {
				result = `\n::: [${attrPart}]\n`;
			} else if (bindPart) {
				result = `\n::: [${bindPart}]\n`;
			}
		} else {
			result = "\n:::\n";
		}

		// Add content
		result += content;

		// Add end tag
		result += "\n:::\n";

		instance.template += result;
		return result;
	};
}

exports.composeSharedFieldParams = composeSharedFieldParams;
exports.composeAttrs = composeAttrs;
exports.translate = translate;
exports.Composer = Composer;
