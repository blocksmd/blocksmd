/**
 * Translations.
 */
export type TranslationsType = {
	/**
	 * The text in English.
	 */
	en?: string;
	/**
	 * The text in Arabic.
	 */
	ar?: string;
	/**
	 * The text in Bengali.
	 */
	bn?: string;
	/**
	 * The text in German.
	 */
	de?: string;
	/**
	 * The text in Spanish.
	 */
	es?: string;
	/**
	 * The text in French.
	 */
	fr?: string;
	/**
	 * The text in Japanese.
	 */
	ja?: string;
	/**
	 * The text in Portuguese.
	 */
	pt?: string;
	/**
	 * The text in Chinese.
	 */
	zh?: string;
};
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
export function translate(
	localization: string,
	translations: TranslationsType,
): string;
export class Composer {
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
	constructor(settings: {
		/**
		 * If set to `"all-slides"`, when a new slide becomes active (including the first slide on page load), the very first form field will be auto-focused.
		 */
		autofocus?: "all-slides";
		/**
		 * The primary color (must be HTML name, hex code, or RGB) used on buttons, form fields, etc. [Supports up to two values](https://formsmd.gitbook.io/docs/settings#different-values-for-light-mode-and-dark-mode).
		 */
		accent?: string;
		/**
		 * The text color (must be HTML name, hex code, or RGB) used on `accent` background, for example, the text on buttons. [Supports up to two values](https://formsmd.gitbook.io/docs/settings#different-values-for-light-mode-and-dark-mode).
		 */
		accentForeground?: string;
		/**
		 * Sets an overlay of the `background-color` on top of the background image. [Supports up to two values](https://formsmd.gitbook.io/docs/settings#different-values-for-light-mode-and-dark-mode).
		 */
		backdropOpacity?: string;
		/**
		 * The `background-color` of the page (must be HTML name, hex code, or RGB). [Supports up to two values](https://formsmd.gitbook.io/docs/settings#different-values-for-light-mode-and-dark-mode).
		 */
		backgroundColor?: string;
		/**
		 * The `background-image` of the page. [Supports up to two values](https://formsmd.gitbook.io/docs/settings#different-values-for-light-mode-and-dark-mode).
		 */
		backgroundImage?: string;
		/**
		 * An image of your logo added to the header of the page in the top-left corner (must be valid Markdown image). [Supports up to two values](https://formsmd.gitbook.io/docs/settings#different-values-for-light-mode-and-dark-mode).
		 */
		brand?: string;
		/**
		 * Set the alignment of the slide CTA buttons.
		 */
		buttonAlignment?: "center" | "end" | "stretch";
		/**
		 * The `color` of the text on the page (must be HTML name, hex code, or RGB). [Supports up to two values](https://formsmd.gitbook.io/docs/settings#different-values-for-light-mode-and-dark-mode).
		 */
		color?: string;
		/**
		 * The default or initial color scheme of the page. Default is `"light"`.
		 */
		colorScheme?: "light" | "dark";
		/**
		 * Determines how color scheme preference is saved and applied. Default is `"domain-wide"`.
		 */
		colorSchemeScope?: "domain-wide" | "isolate";
		/**
		 * If set to `"show"`, a toggle button will be available in the footer.
		 */
		colorSchemeToggle?: "show";
		/**
		 * Prefix added to all CSS classes. Default is `"fmd-"`.
		 */
		cssPrefix?: string;
		/**
		 * Adds a call to action link styled as a button on the header (must be valid Markdown link).
		 */
		cta?: string;
		/**
		 * The direction of the page's text. Default is `"ltr"`.
		 */
		dir?: "ltr" | "rtl";
		/**
		 * The favicon of the page.
		 */
		favicon?: string;
		/**
		 * If set to `"sm"`, the size of form fields will be made smaller.
		 */
		fieldSize?: "sm";
		/**
		 * The `font-family` used on the page.
		 */
		fontFamily?: string;
		/**
		 * URL to import custom fonts (must be valid CSS for the `@import` property).
		 */
		fontImportUrl?: string;
		/**
		 * Makes the `font-size` of everything on the page smaller or larger.
		 */
		fontSize?: "sm" | "lg";
		/**
		 * Used to separate parameters when creating form fields. Default is `"|"`.
		 */
		formDelimiter?: string;
		/**
		 * Controls visibility of the Forms.md branding.
		 */
		formsmdBranding?: "hide" | "show";
		/**
		 * If set to `"classic"`, the form fields will have a classic appearance.
		 */
		formStyle?: "classic";
		/**
		 * Controls visibility of the footer.
		 */
		footer?: "hide" | "show";
		/**
		 * The format for reading data. Default is `"json"`. [Read docs](https://formsmd.gitbook.io/docs/set-and-read-data).
		 */
		getFormat?: "json" | "csv" | "tsv";
		/**
		 * Name used for objects when reading data. Default is `"objects"`. [Read docs](https://formsmd.gitbook.io/docs/set-and-read-data).
		 */
		getObjectsName?: string;
		/**
		 * URL for reading data. [Read docs](https://formsmd.gitbook.io/docs/set-and-read-data).
		 */
		getUrl?: string;
		/**
		 * Controls header visibility and alignment.
		 */
		header?: "hide" | "show" | "align";
		/**
		 * If set to `"anchored"`, all headings will contain an anchor link.
		 */
		headings?: "anchored";
		/**
		 * Identifier for the page or form.
		 */
		id?: string;
		/**
		 * If set to `"classic"`, the question and description of form fields will be made smaller.
		 */
		labelStyle?: "classic";
		/**
		 * Sets the language for automatic translation. Default is `"en"`.
		 */
		localization?: keyof typeof translations;
		/**
		 * Sets the author metadata.
		 */
		metaAuthor?: string;
		/**
		 * Sets the description metadata.
		 */
		metaDescription?: string;
		/**
		 * Sets the Open Graph image.
		 */
		metaImage?: string;
		/**
		 * Sets the keywords metadata.
		 */
		metaKeywords?: string;
		/**
		 * Sets the Open Graph type.
		 */
		metaType?: string;
		/**
		 * Sets the Open Graph URL.
		 */
		metaUrl?: string;
		/**
		 * Determines the layout of the page. Default is `"form-slides"`.
		 */
		page?: "form-slides" | "slides" | "single";
		/**
		 * Controls visibility and function of the page progress.
		 */
		pageProgress?: "hide" | "show" | "decorative";
		/**
		 * Controls visibility of input placeholders.
		 */
		placeholders?: "hide" | "show";
		/**
		 * When sending responses directly to Google Sheets, this specifies which sheet to save responses to.
		 */
		postSheetName?: string;
		/**
		 * URL to send form responses to using POST request.
		 */
		postUrl?: string;
		/**
		 * If set to `"show"`, the restart button will be visible.
		 */
		restartButton?: "show";
		/**
		 * Controls rounding of buttons and UI elements.
		 */
		rounded?: "none" | "pill";
		/**
		 * Controls visibility of next and previous buttons.
		 */
		slideControls?: "hide" | "show";
		/**
		 * Specifies where new slides are created. Default is `"---"`.
		 */
		slideDelimiter?: string;
		/**
		 * Custom text for submit buttons.
		 */
		submitButtonText?: string;
		/**
		 * The title of the page.
		 */
		title?: string;
		/**
		 * If set to `"start"`, content is aligned to the top of the page vertically.
		 */
		verticalAlignment?: "start";
	});
	template: string;
	settings: {};
	passedSettings: {};
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
	textInput: (
		name: string,
		params: {
			/**
			 * The main question of the form field.
			 */
			question: string;
			/**
			 * When set, the field becomes required.
			 */
			required?: true;
			/**
			 * Any extra information that the user may need to fill out the form.
			 */
			description?: string;
			/**
			 * When set to `"sm"`, the font sizes of the question, description, and answer are made smaller.
			 */
			fieldSize?: "sm";
			/**
			 * When set to `"classic"`, the question and description of the form field are made smaller.
			 */
			labelStyle?: "classic";
			/**
			 * When set, the question and description of the form field are made smaller.
			 */
			subfield?: true;
			/**
			 * When set, the input is disabled.
			 */
			disabled?: true;
			/**
			 * When set, the input will be automatically focused when the parent slide becomes active, or immediately after page load.
			 */
			autofocus?: true;
			/**
			 * The id attribute of the form field.
			 */
			id?: string;
			/**
			 * The CSS class names of the form field.
			 */
			classNames?: Array<string>;
			/**
			 * Other HTML attributes of the form field.
			 */
			attrs?: {
				/**
				 * The name of the attribute.
				 */
				name: string;
				/**
				 * The value of the attribute.
				 */
				value: string;
			}[];
			/**
			 * Display condition for the form field.
			 */
			displayCondition?: {
				/**
				 * The names of the form fields or data to use in the condition.
				 */
				dependencies: Array<string>;
				/**
				 * The actual condition.
				 */
				condition: string;
			};
		} & {
			/**
			 * Sets the `placeholder` attribute of the input.
			 */
			placeholder?: string;
			/**
			 * When set, the input accepts values with one or more lines because the `<textarea>` element is used.
			 */
			multiline?: true;
			/**
			 * If set, this becomes the maximum number of allowed characters in the input.
			 */
			maxlength?: number;
			/**
			 * If set, the input value must match the given pattern.
			 */
			pattern?: string;
			/**
			 * If set, this becomes the default value of the input.
			 */
			value?: string;
		},
	) => string;
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
	emailInput: (
		name: string,
		params: {
			/**
			 * The main question of the form field.
			 */
			question: string;
			/**
			 * When set, the field becomes required.
			 */
			required?: true;
			/**
			 * Any extra information that the user may need to fill out the form.
			 */
			description?: string;
			/**
			 * When set to `"sm"`, the font sizes of the question, description, and answer are made smaller.
			 */
			fieldSize?: "sm";
			/**
			 * When set to `"classic"`, the question and description of the form field are made smaller.
			 */
			labelStyle?: "classic";
			/**
			 * When set, the question and description of the form field are made smaller.
			 */
			subfield?: true;
			/**
			 * When set, the input is disabled.
			 */
			disabled?: true;
			/**
			 * When set, the input will be automatically focused when the parent slide becomes active, or immediately after page load.
			 */
			autofocus?: true;
			/**
			 * The id attribute of the form field.
			 */
			id?: string;
			/**
			 * The CSS class names of the form field.
			 */
			classNames?: Array<string>;
			/**
			 * Other HTML attributes of the form field.
			 */
			attrs?: {
				/**
				 * The name of the attribute.
				 */
				name: string;
				/**
				 * The value of the attribute.
				 */
				value: string;
			}[];
			/**
			 * Display condition for the form field.
			 */
			displayCondition?: {
				/**
				 * The names of the form fields or data to use in the condition.
				 */
				dependencies: Array<string>;
				/**
				 * The actual condition.
				 */
				condition: string;
			};
		} & {
			/**
			 * Sets the `placeholder` attribute of the input.
			 */
			placeholder?: string;
			/**
			 * If set, this becomes the maximum number of allowed characters in the input.
			 */
			maxlength?: number;
			/**
			 * If set, the input value must match the given pattern.
			 */
			pattern?: string;
			/**
			 * If set, this becomes the default value of the input.
			 */
			value?: string;
		},
	) => string;
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
	urlInput: (
		name: string,
		params: {
			/**
			 * The main question of the form field.
			 */
			question: string;
			/**
			 * When set, the field becomes required.
			 */
			required?: true;
			/**
			 * Any extra information that the user may need to fill out the form.
			 */
			description?: string;
			/**
			 * When set to `"sm"`, the font sizes of the question, description, and answer are made smaller.
			 */
			fieldSize?: "sm";
			/**
			 * When set to `"classic"`, the question and description of the form field are made smaller.
			 */
			labelStyle?: "classic";
			/**
			 * When set, the question and description of the form field are made smaller.
			 */
			subfield?: true;
			/**
			 * When set, the input is disabled.
			 */
			disabled?: true;
			/**
			 * When set, the input will be automatically focused when the parent slide becomes active, or immediately after page load.
			 */
			autofocus?: true;
			/**
			 * The id attribute of the form field.
			 */
			id?: string;
			/**
			 * The CSS class names of the form field.
			 */
			classNames?: Array<string>;
			/**
			 * Other HTML attributes of the form field.
			 */
			attrs?: {
				/**
				 * The name of the attribute.
				 */
				name: string;
				/**
				 * The value of the attribute.
				 */
				value: string;
			}[];
			/**
			 * Display condition for the form field.
			 */
			displayCondition?: {
				/**
				 * The names of the form fields or data to use in the condition.
				 */
				dependencies: Array<string>;
				/**
				 * The actual condition.
				 */
				condition: string;
			};
		} & {
			/**
			 * Sets the `placeholder` attribute of the input.
			 */
			placeholder?: string;
			/**
			 * If set, this becomes the maximum number of allowed characters in the input.
			 */
			maxlength?: number;
			/**
			 * If set, the input value must match the given pattern.
			 */
			pattern?: string;
			/**
			 * If set, this becomes the default value of the input.
			 */
			value?: string;
		},
	) => string;
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
	telInput: (
		name: string,
		params: {
			/**
			 * The main question of the form field.
			 */
			question: string;
			/**
			 * When set, the field becomes required.
			 */
			required?: true;
			/**
			 * Any extra information that the user may need to fill out the form.
			 */
			description?: string;
			/**
			 * When set to `"sm"`, the font sizes of the question, description, and answer are made smaller.
			 */
			fieldSize?: "sm";
			/**
			 * When set to `"classic"`, the question and description of the form field are made smaller.
			 */
			labelStyle?: "classic";
			/**
			 * When set, the question and description of the form field are made smaller.
			 */
			subfield?: true;
			/**
			 * When set, the input is disabled.
			 */
			disabled?: true;
			/**
			 * When set, the input will be automatically focused when the parent slide becomes active, or immediately after page load.
			 */
			autofocus?: true;
			/**
			 * The id attribute of the form field.
			 */
			id?: string;
			/**
			 * The CSS class names of the form field.
			 */
			classNames?: Array<string>;
			/**
			 * Other HTML attributes of the form field.
			 */
			attrs?: {
				/**
				 * The name of the attribute.
				 */
				name: string;
				/**
				 * The value of the attribute.
				 */
				value: string;
			}[];
			/**
			 * Display condition for the form field.
			 */
			displayCondition?: {
				/**
				 * The names of the form fields or data to use in the condition.
				 */
				dependencies: Array<string>;
				/**
				 * The actual condition.
				 */
				condition: string;
			};
		} & {
			/**
			 * Sets the `placeholder` attribute of the input.
			 */
			placeholder?: string;
			/**
			 * If set, this becomes the maximum number of allowed characters in the input.
			 */
			maxlength?: number;
			/**
			 * If set, the input value must match the given pattern.
			 */
			pattern?: string;
			/**
			 * If set, this becomes the default value of the input.
			 */
			value?: string;
			/**
			 * The default country code (e.g., `"US"`). Defaults to `"US"` if not specified.
			 */
			country?:
				| "US"
				| "AC"
				| "AD"
				| "AE"
				| "AF"
				| "AG"
				| "AI"
				| "AL"
				| "AM"
				| "AN"
				| "AO"
				| "AQ"
				| "AR"
				| "AS"
				| "AT"
				| "AU"
				| "AW"
				| "AX"
				| "AZ"
				| "BA"
				| "BB"
				| "BD"
				| "BE"
				| "BF"
				| "BG"
				| "BH"
				| "BI"
				| "BJ"
				| "BL"
				| "BM"
				| "BN"
				| "BO"
				| "BQ"
				| "BR"
				| "BS"
				| "BT"
				| "BW"
				| "BY"
				| "BZ"
				| "CA"
				| "CC"
				| "CD"
				| "CF"
				| "CG"
				| "CH"
				| "CI"
				| "CK"
				| "CL"
				| "CM"
				| "CN"
				| "CO"
				| "CR"
				| "CU"
				| "CV"
				| "CW"
				| "CX"
				| "CY"
				| "CZ"
				| "DE"
				| "DJ"
				| "DK"
				| "DM"
				| "DO"
				| "DZ"
				| "EC"
				| "EE"
				| "EG"
				| "EH"
				| "ER"
				| "ES"
				| "ET"
				| "FI"
				| "FJ"
				| "FK"
				| "FM"
				| "FO"
				| "FR"
				| "GA"
				| "GB"
				| "GD"
				| "GE"
				| "GF"
				| "GG"
				| "GH"
				| "GI"
				| "GL"
				| "GM"
				| "GN"
				| "GP"
				| "GQ"
				| "GR"
				| "GS"
				| "GT"
				| "GU"
				| "GW"
				| "GY"
				| "HK"
				| "HM"
				| "HN"
				| "HR"
				| "HT"
				| "HU"
				| "ID"
				| "IE"
				| "IL"
				| "IM"
				| "IN"
				| "IO"
				| "IQ"
				| "IR"
				| "IS"
				| "IT"
				| "JE"
				| "JM"
				| "JO"
				| "JP"
				| "KE"
				| "KG"
				| "KH"
				| "KI"
				| "KM"
				| "KN"
				| "KP"
				| "KR"
				| "KW"
				| "KY"
				| "KZ"
				| "LA"
				| "LB"
				| "LC"
				| "LI"
				| "LK"
				| "LR"
				| "LS"
				| "LT"
				| "LU"
				| "LV"
				| "LY"
				| "MA"
				| "MC"
				| "MD"
				| "ME"
				| "MF"
				| "MG"
				| "MH"
				| "MK"
				| "ML"
				| "MM"
				| "MN"
				| "MO"
				| "MP"
				| "MQ"
				| "MR"
				| "MS"
				| "MT"
				| "MU"
				| "MV"
				| "MW"
				| "MX"
				| "MY"
				| "MZ"
				| "NA"
				| "NC"
				| "NE"
				| "NF"
				| "NG"
				| "NI"
				| "NL"
				| "NO"
				| "NP"
				| "NR"
				| "NU"
				| "NZ"
				| "OM"
				| "PA"
				| "PE"
				| "PF"
				| "PG"
				| "PH"
				| "PK"
				| "PL"
				| "PM"
				| "PN"
				| "PR"
				| "PS"
				| "PT"
				| "PW"
				| "PY"
				| "QA"
				| "RE"
				| "RO"
				| "RS"
				| "RU"
				| "RW"
				| "SA"
				| "SB"
				| "SC"
				| "SD"
				| "SE"
				| "SG"
				| "SH"
				| "SI"
				| "SJ"
				| "SK"
				| "SL"
				| "SM"
				| "SN"
				| "SO"
				| "SR"
				| "SS"
				| "ST"
				| "SV"
				| "SX"
				| "SY"
				| "SZ"
				| "TA"
				| "TC"
				| "TD"
				| "TF"
				| "TG"
				| "TH"
				| "TJ"
				| "TK"
				| "TL"
				| "TM"
				| "TN"
				| "TO"
				| "TR"
				| "TT"
				| "TV"
				| "TW"
				| "TZ"
				| "UA"
				| "UG"
				| "UY"
				| "UZ"
				| "VA"
				| "VC"
				| "VE"
				| "VG"
				| "VI"
				| "VN"
				| "VU"
				| "WF"
				| "WS"
				| "XK"
				| "YE"
				| "YT"
				| "ZA"
				| "ZM"
				| "ZW";
			/**
			 * Array of available country codes (e.g., `["US", "CA", "GB"]`).
			 */
			availableCountries?: (
				| "US"
				| "AC"
				| "AD"
				| "AE"
				| "AF"
				| "AG"
				| "AI"
				| "AL"
				| "AM"
				| "AN"
				| "AO"
				| "AQ"
				| "AR"
				| "AS"
				| "AT"
				| "AU"
				| "AW"
				| "AX"
				| "AZ"
				| "BA"
				| "BB"
				| "BD"
				| "BE"
				| "BF"
				| "BG"
				| "BH"
				| "BI"
				| "BJ"
				| "BL"
				| "BM"
				| "BN"
				| "BO"
				| "BQ"
				| "BR"
				| "BS"
				| "BT"
				| "BW"
				| "BY"
				| "BZ"
				| "CA"
				| "CC"
				| "CD"
				| "CF"
				| "CG"
				| "CH"
				| "CI"
				| "CK"
				| "CL"
				| "CM"
				| "CN"
				| "CO"
				| "CR"
				| "CU"
				| "CV"
				| "CW"
				| "CX"
				| "CY"
				| "CZ"
				| "DE"
				| "DJ"
				| "DK"
				| "DM"
				| "DO"
				| "DZ"
				| "EC"
				| "EE"
				| "EG"
				| "EH"
				| "ER"
				| "ES"
				| "ET"
				| "FI"
				| "FJ"
				| "FK"
				| "FM"
				| "FO"
				| "FR"
				| "GA"
				| "GB"
				| "GD"
				| "GE"
				| "GF"
				| "GG"
				| "GH"
				| "GI"
				| "GL"
				| "GM"
				| "GN"
				| "GP"
				| "GQ"
				| "GR"
				| "GS"
				| "GT"
				| "GU"
				| "GW"
				| "GY"
				| "HK"
				| "HM"
				| "HN"
				| "HR"
				| "HT"
				| "HU"
				| "ID"
				| "IE"
				| "IL"
				| "IM"
				| "IN"
				| "IO"
				| "IQ"
				| "IR"
				| "IS"
				| "IT"
				| "JE"
				| "JM"
				| "JO"
				| "JP"
				| "KE"
				| "KG"
				| "KH"
				| "KI"
				| "KM"
				| "KN"
				| "KP"
				| "KR"
				| "KW"
				| "KY"
				| "KZ"
				| "LA"
				| "LB"
				| "LC"
				| "LI"
				| "LK"
				| "LR"
				| "LS"
				| "LT"
				| "LU"
				| "LV"
				| "LY"
				| "MA"
				| "MC"
				| "MD"
				| "ME"
				| "MF"
				| "MG"
				| "MH"
				| "MK"
				| "ML"
				| "MM"
				| "MN"
				| "MO"
				| "MP"
				| "MQ"
				| "MR"
				| "MS"
				| "MT"
				| "MU"
				| "MV"
				| "MW"
				| "MX"
				| "MY"
				| "MZ"
				| "NA"
				| "NC"
				| "NE"
				| "NF"
				| "NG"
				| "NI"
				| "NL"
				| "NO"
				| "NP"
				| "NR"
				| "NU"
				| "NZ"
				| "OM"
				| "PA"
				| "PE"
				| "PF"
				| "PG"
				| "PH"
				| "PK"
				| "PL"
				| "PM"
				| "PN"
				| "PR"
				| "PS"
				| "PT"
				| "PW"
				| "PY"
				| "QA"
				| "RE"
				| "RO"
				| "RS"
				| "RU"
				| "RW"
				| "SA"
				| "SB"
				| "SC"
				| "SD"
				| "SE"
				| "SG"
				| "SH"
				| "SI"
				| "SJ"
				| "SK"
				| "SL"
				| "SM"
				| "SN"
				| "SO"
				| "SR"
				| "SS"
				| "ST"
				| "SV"
				| "SX"
				| "SY"
				| "SZ"
				| "TA"
				| "TC"
				| "TD"
				| "TF"
				| "TG"
				| "TH"
				| "TJ"
				| "TK"
				| "TL"
				| "TM"
				| "TN"
				| "TO"
				| "TR"
				| "TT"
				| "TV"
				| "TW"
				| "TZ"
				| "UA"
				| "UG"
				| "UY"
				| "UZ"
				| "VA"
				| "VC"
				| "VE"
				| "VG"
				| "VI"
				| "VN"
				| "VU"
				| "WF"
				| "WS"
				| "XK"
				| "YE"
				| "YT"
				| "ZA"
				| "ZM"
				| "ZW"
			)[];
		},
	) => string;
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
	passwordInput: (
		name: string,
		params: {
			/**
			 * The main question of the form field.
			 */
			question: string;
			/**
			 * When set, the field becomes required.
			 */
			required?: true;
			/**
			 * Any extra information that the user may need to fill out the form.
			 */
			description?: string;
			/**
			 * When set to `"sm"`, the font sizes of the question, description, and answer are made smaller.
			 */
			fieldSize?: "sm";
			/**
			 * When set to `"classic"`, the question and description of the form field are made smaller.
			 */
			labelStyle?: "classic";
			/**
			 * When set, the question and description of the form field are made smaller.
			 */
			subfield?: true;
			/**
			 * When set, the input is disabled.
			 */
			disabled?: true;
			/**
			 * When set, the input will be automatically focused when the parent slide becomes active, or immediately after page load.
			 */
			autofocus?: true;
			/**
			 * The id attribute of the form field.
			 */
			id?: string;
			/**
			 * The CSS class names of the form field.
			 */
			classNames?: Array<string>;
			/**
			 * Other HTML attributes of the form field.
			 */
			attrs?: {
				/**
				 * The name of the attribute.
				 */
				name: string;
				/**
				 * The value of the attribute.
				 */
				value: string;
			}[];
			/**
			 * Display condition for the form field.
			 */
			displayCondition?: {
				/**
				 * The names of the form fields or data to use in the condition.
				 */
				dependencies: Array<string>;
				/**
				 * The actual condition.
				 */
				condition: string;
			};
		} & {
			/**
			 * Sets the `placeholder` attribute of the input.
			 */
			placeholder?: string;
			/**
			 * If set, this becomes the maximum number of allowed characters in the input.
			 */
			maxlength?: number;
			/**
			 * If set, the input value must match the given pattern.
			 */
			pattern?: string;
			/**
			 * If set, this becomes the default value of the input.
			 */
			value?: string;
		},
	) => string;
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
	numberInput: (
		name: string,
		params: {
			/**
			 * The main question of the form field.
			 */
			question: string;
			/**
			 * When set, the field becomes required.
			 */
			required?: true;
			/**
			 * Any extra information that the user may need to fill out the form.
			 */
			description?: string;
			/**
			 * When set to `"sm"`, the font sizes of the question, description, and answer are made smaller.
			 */
			fieldSize?: "sm";
			/**
			 * When set to `"classic"`, the question and description of the form field are made smaller.
			 */
			labelStyle?: "classic";
			/**
			 * When set, the question and description of the form field are made smaller.
			 */
			subfield?: true;
			/**
			 * When set, the input is disabled.
			 */
			disabled?: true;
			/**
			 * When set, the input will be automatically focused when the parent slide becomes active, or immediately after page load.
			 */
			autofocus?: true;
			/**
			 * The id attribute of the form field.
			 */
			id?: string;
			/**
			 * The CSS class names of the form field.
			 */
			classNames?: Array<string>;
			/**
			 * Other HTML attributes of the form field.
			 */
			attrs?: {
				/**
				 * The name of the attribute.
				 */
				name: string;
				/**
				 * The value of the attribute.
				 */
				value: string;
			}[];
			/**
			 * Display condition for the form field.
			 */
			displayCondition?: {
				/**
				 * The names of the form fields or data to use in the condition.
				 */
				dependencies: Array<string>;
				/**
				 * The actual condition.
				 */
				condition: string;
			};
		} & {
			/**
			 * Sets the `placeholder` attribute of the input.
			 */
			placeholder?: string;
			/**
			 * Sets the minimum allowed value.
			 */
			min?: number;
			/**
			 * Sets the maximum allowed value.
			 */
			max?: number;
			/**
			 * Sets the stepping interval.
			 */
			step?: number;
			/**
			 * Text to display before the input as a unit (e.g., `"$"`, `"€"`).
			 */
			unit?: string;
			/**
			 * Text to display after the input as a unit (e.g., `"kg"`, `"%"`).
			 */
			unitEnd?: string;
			/**
			 * If set, this becomes the default value of the input.
			 */
			value?: number;
		},
	) => string;
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
	selectBox: (
		name: string,
		params: {
			/**
			 * The main question of the form field.
			 */
			question: string;
			/**
			 * When set, the field becomes required.
			 */
			required?: true;
			/**
			 * Any extra information that the user may need to fill out the form.
			 */
			description?: string;
			/**
			 * When set to `"sm"`, the font sizes of the question, description, and answer are made smaller.
			 */
			fieldSize?: "sm";
			/**
			 * When set to `"classic"`, the question and description of the form field are made smaller.
			 */
			labelStyle?: "classic";
			/**
			 * When set, the question and description of the form field are made smaller.
			 */
			subfield?: true;
			/**
			 * When set, the input is disabled.
			 */
			disabled?: true;
			/**
			 * When set, the input will be automatically focused when the parent slide becomes active, or immediately after page load.
			 */
			autofocus?: true;
			/**
			 * The id attribute of the form field.
			 */
			id?: string;
			/**
			 * The CSS class names of the form field.
			 */
			classNames?: Array<string>;
			/**
			 * Other HTML attributes of the form field.
			 */
			attrs?: {
				/**
				 * The name of the attribute.
				 */
				name: string;
				/**
				 * The value of the attribute.
				 */
				value: string;
			}[];
			/**
			 * Display condition for the form field.
			 */
			displayCondition?: {
				/**
				 * The names of the form fields or data to use in the condition.
				 */
				dependencies: Array<string>;
				/**
				 * The actual condition.
				 */
				condition: string;
			};
		} & {
			/**
			 * Sets the placeholder option of the select.
			 */
			placeholder?: string;
			/**
			 * Array of options as strings or SelectOptionType objects.
			 */
			options: (
				| string
				| {
						/**
						 * The display text for the option.
						 */
						label: string;
						/**
						 * The value for the option. If not provided, label is used as value.
						 */
						value?: string;
				  }
			)[];
			/**
			 * Pre-selected option value.
			 */
			selected?: string;
		},
	) => string;
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
	choiceInput: (
		name: string,
		params: {
			/**
			 * The main question of the form field.
			 */
			question: string;
			/**
			 * When set, the field becomes required.
			 */
			required?: true;
			/**
			 * Any extra information that the user may need to fill out the form.
			 */
			description?: string;
			/**
			 * When set to `"sm"`, the font sizes of the question, description, and answer are made smaller.
			 */
			fieldSize?: "sm";
			/**
			 * When set to `"classic"`, the question and description of the form field are made smaller.
			 */
			labelStyle?: "classic";
			/**
			 * When set, the question and description of the form field are made smaller.
			 */
			subfield?: true;
			/**
			 * When set, the input is disabled.
			 */
			disabled?: true;
			/**
			 * When set, the input will be automatically focused when the parent slide becomes active, or immediately after page load.
			 */
			autofocus?: true;
			/**
			 * The id attribute of the form field.
			 */
			id?: string;
			/**
			 * The CSS class names of the form field.
			 */
			classNames?: Array<string>;
			/**
			 * Other HTML attributes of the form field.
			 */
			attrs?: {
				/**
				 * The name of the attribute.
				 */
				name: string;
				/**
				 * The value of the attribute.
				 */
				value: string;
			}[];
			/**
			 * Display condition for the form field.
			 */
			displayCondition?: {
				/**
				 * The names of the form fields or data to use in the condition.
				 */
				dependencies: Array<string>;
				/**
				 * The actual condition.
				 */
				condition: string;
			};
		} & {
			/**
			 * Array of choices as strings or ChoiceOptionType objects.
			 */
			choices: (
				| string
				| {
						/**
						 * The display text for the choice.
						 */
						label: string;
						/**
						 * The value for the choice. If not provided, label is used as value.
						 */
						value?: string;
				  }
			)[];
			/**
			 * Allow multiple selections.
			 */
			multiple?: true;
			/**
			 * Display choices horizontally.
			 */
			horizontal?: true;
			/**
			 * Hide the form text.
			 */
			hideFormText?: true;
			/**
			 * Array of pre-checked choice values.
			 */
			checked?: Array<string>;
		},
	) => string;
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
	pictureChoice: (
		name: string,
		params: {
			/**
			 * The main question of the form field.
			 */
			question: string;
			/**
			 * When set, the field becomes required.
			 */
			required?: true;
			/**
			 * Any extra information that the user may need to fill out the form.
			 */
			description?: string;
			/**
			 * When set to `"sm"`, the font sizes of the question, description, and answer are made smaller.
			 */
			fieldSize?: "sm";
			/**
			 * When set to `"classic"`, the question and description of the form field are made smaller.
			 */
			labelStyle?: "classic";
			/**
			 * When set, the question and description of the form field are made smaller.
			 */
			subfield?: true;
			/**
			 * When set, the input is disabled.
			 */
			disabled?: true;
			/**
			 * When set, the input will be automatically focused when the parent slide becomes active, or immediately after page load.
			 */
			autofocus?: true;
			/**
			 * The id attribute of the form field.
			 */
			id?: string;
			/**
			 * The CSS class names of the form field.
			 */
			classNames?: Array<string>;
			/**
			 * Other HTML attributes of the form field.
			 */
			attrs?: {
				/**
				 * The name of the attribute.
				 */
				name: string;
				/**
				 * The value of the attribute.
				 */
				value: string;
			}[];
			/**
			 * Display condition for the form field.
			 */
			displayCondition?: {
				/**
				 * The names of the form fields or data to use in the condition.
				 */
				dependencies: Array<string>;
				/**
				 * The actual condition.
				 */
				condition: string;
			};
		} & {
			/**
			 * Array of picture choices.
			 */
			choices: {
				/**
				 * The display text for the choice.
				 */
				label: string;
				/**
				 * The value for the choice. If not provided, label is used as value.
				 */
				value?: string;
				/**
				 * The URL of the image.
				 */
				image: string;
			}[];
			/**
			 * Allow multiple selections.
			 */
			multiple?: true;
			/**
			 * Make the pictures larger.
			 */
			supersize?: true;
			/**
			 * Hide the text labels.
			 */
			hideLabels?: true;
			/**
			 * Hide the form text.
			 */
			hideFormText?: true;
			/**
			 * Array of pre-checked choice values.
			 */
			checked?: Array<string>;
		},
	) => string;
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
	ratingInput: (
		name: string,
		params: {
			/**
			 * The main question of the form field.
			 */
			question: string;
			/**
			 * When set, the field becomes required.
			 */
			required?: true;
			/**
			 * Any extra information that the user may need to fill out the form.
			 */
			description?: string;
			/**
			 * When set to `"sm"`, the font sizes of the question, description, and answer are made smaller.
			 */
			fieldSize?: "sm";
			/**
			 * When set to `"classic"`, the question and description of the form field are made smaller.
			 */
			labelStyle?: "classic";
			/**
			 * When set, the question and description of the form field are made smaller.
			 */
			subfield?: true;
			/**
			 * When set, the input is disabled.
			 */
			disabled?: true;
			/**
			 * When set, the input will be automatically focused when the parent slide becomes active, or immediately after page load.
			 */
			autofocus?: true;
			/**
			 * The id attribute of the form field.
			 */
			id?: string;
			/**
			 * The CSS class names of the form field.
			 */
			classNames?: Array<string>;
			/**
			 * Other HTML attributes of the form field.
			 */
			attrs?: {
				/**
				 * The name of the attribute.
				 */
				name: string;
				/**
				 * The value of the attribute.
				 */
				value: string;
			}[];
			/**
			 * Display condition for the form field.
			 */
			displayCondition?: {
				/**
				 * The names of the form fields or data to use in the condition.
				 */
				dependencies: Array<string>;
				/**
				 * The actual condition.
				 */
				condition: string;
			};
		} & {
			/**
			 * Number of rating options (1-10). Defaults to `5`.
			 */
			outOf?: number;
			/**
			 * Icon to use for rating. Defaults to `"star"`.
			 */
			icon?: "star" | "heart" | "hearts";
			/**
			 * Pre-selected rating value.
			 */
			value?: number;
			/**
			 * Whether to hide the numeric labels.
			 */
			hideLabels?: true;
		},
	) => string;
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
	opinionScale: (
		name: string,
		params: {
			/**
			 * The main question of the form field.
			 */
			question: string;
			/**
			 * When set, the field becomes required.
			 */
			required?: true;
			/**
			 * Any extra information that the user may need to fill out the form.
			 */
			description?: string;
			/**
			 * When set to `"sm"`, the font sizes of the question, description, and answer are made smaller.
			 */
			fieldSize?: "sm";
			/**
			 * When set to `"classic"`, the question and description of the form field are made smaller.
			 */
			labelStyle?: "classic";
			/**
			 * When set, the question and description of the form field are made smaller.
			 */
			subfield?: true;
			/**
			 * When set, the input is disabled.
			 */
			disabled?: true;
			/**
			 * When set, the input will be automatically focused when the parent slide becomes active, or immediately after page load.
			 */
			autofocus?: true;
			/**
			 * The id attribute of the form field.
			 */
			id?: string;
			/**
			 * The CSS class names of the form field.
			 */
			classNames?: Array<string>;
			/**
			 * Other HTML attributes of the form field.
			 */
			attrs?: {
				/**
				 * The name of the attribute.
				 */
				name: string;
				/**
				 * The value of the attribute.
				 */
				value: string;
			}[];
			/**
			 * Display condition for the form field.
			 */
			displayCondition?: {
				/**
				 * The names of the form fields or data to use in the condition.
				 */
				dependencies: Array<string>;
				/**
				 * The actual condition.
				 */
				condition: string;
			};
		} & {
			/**
			 * Starting number (`0` or `1`). Defaults to `0`.
			 */
			startAt?: number;
			/**
			 * Maximum scale value (5-10). Defaults to `10`.
			 */
			outOf?: number;
			/**
			 * Label for the start of the scale.
			 */
			labelStart?: string;
			/**
			 * Label for the end of the scale.
			 */
			labelEnd?: string;
			/**
			 * Whether to hide the start label.
			 */
			hideLabelStart?: true;
			/**
			 * Whether to hide the end label.
			 */
			hideLabelEnd?: true;
			/**
			 * Pre-selected value.
			 */
			value?: number;
		},
	) => string;
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
	datetimeInput: (
		name: string,
		params: {
			/**
			 * The main question of the form field.
			 */
			question: string;
			/**
			 * When set, the field becomes required.
			 */
			required?: true;
			/**
			 * Any extra information that the user may need to fill out the form.
			 */
			description?: string;
			/**
			 * When set to `"sm"`, the font sizes of the question, description, and answer are made smaller.
			 */
			fieldSize?: "sm";
			/**
			 * When set to `"classic"`, the question and description of the form field are made smaller.
			 */
			labelStyle?: "classic";
			/**
			 * When set, the question and description of the form field are made smaller.
			 */
			subfield?: true;
			/**
			 * When set, the input is disabled.
			 */
			disabled?: true;
			/**
			 * When set, the input will be automatically focused when the parent slide becomes active, or immediately after page load.
			 */
			autofocus?: true;
			/**
			 * The id attribute of the form field.
			 */
			id?: string;
			/**
			 * The CSS class names of the form field.
			 */
			classNames?: Array<string>;
			/**
			 * Other HTML attributes of the form field.
			 */
			attrs?: {
				/**
				 * The name of the attribute.
				 */
				name: string;
				/**
				 * The value of the attribute.
				 */
				value: string;
			}[];
			/**
			 * Display condition for the form field.
			 */
			displayCondition?: {
				/**
				 * The names of the form fields or data to use in the condition.
				 */
				dependencies: Array<string>;
				/**
				 * The actual condition.
				 */
				condition: string;
			};
		} & {
			/**
			 * Sets the `placeholder` attribute of the input.
			 */
			placeholder?: string;
			/**
			 * Sets the minimum allowed datetime value (`"YYYY-MM-DDTHH:mm"`).
			 */
			min?: string;
			/**
			 * Sets the maximum allowed datetime value (`"YYYY-MM-DDTHH:mm"`).
			 */
			max?: string;
			/**
			 * Sets the stepping interval.
			 */
			step?: string;
			/**
			 * Pre-selected datetime value (`"YYYY-MM-DDTHH:mm"`).
			 */
			value?: string;
		},
	) => string;
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
	dateInput: (
		name: string,
		params: {
			/**
			 * The main question of the form field.
			 */
			question: string;
			/**
			 * When set, the field becomes required.
			 */
			required?: true;
			/**
			 * Any extra information that the user may need to fill out the form.
			 */
			description?: string;
			/**
			 * When set to `"sm"`, the font sizes of the question, description, and answer are made smaller.
			 */
			fieldSize?: "sm";
			/**
			 * When set to `"classic"`, the question and description of the form field are made smaller.
			 */
			labelStyle?: "classic";
			/**
			 * When set, the question and description of the form field are made smaller.
			 */
			subfield?: true;
			/**
			 * When set, the input is disabled.
			 */
			disabled?: true;
			/**
			 * When set, the input will be automatically focused when the parent slide becomes active, or immediately after page load.
			 */
			autofocus?: true;
			/**
			 * The id attribute of the form field.
			 */
			id?: string;
			/**
			 * The CSS class names of the form field.
			 */
			classNames?: Array<string>;
			/**
			 * Other HTML attributes of the form field.
			 */
			attrs?: {
				/**
				 * The name of the attribute.
				 */
				name: string;
				/**
				 * The value of the attribute.
				 */
				value: string;
			}[];
			/**
			 * Display condition for the form field.
			 */
			displayCondition?: {
				/**
				 * The names of the form fields or data to use in the condition.
				 */
				dependencies: Array<string>;
				/**
				 * The actual condition.
				 */
				condition: string;
			};
		} & {
			/**
			 * Sets the `placeholder` attribute of the input.
			 */
			placeholder?: string;
			/**
			 * Sets the minimum allowed date value (`"YYYY-MM-DD"`).
			 */
			min?: string;
			/**
			 * Sets the maximum allowed date value (`"YYYY-MM-DD"`).
			 */
			max?: string;
			/**
			 * Sets the stepping interval.
			 */
			step?: string;
			/**
			 * Pre-selected date value (`"YYYY-MM-DD"`).
			 */
			value?: string;
		},
	) => string;
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
	timeInput: (
		name: string,
		params: {
			/**
			 * The main question of the form field.
			 */
			question: string;
			/**
			 * When set, the field becomes required.
			 */
			required?: true;
			/**
			 * Any extra information that the user may need to fill out the form.
			 */
			description?: string;
			/**
			 * When set to `"sm"`, the font sizes of the question, description, and answer are made smaller.
			 */
			fieldSize?: "sm";
			/**
			 * When set to `"classic"`, the question and description of the form field are made smaller.
			 */
			labelStyle?: "classic";
			/**
			 * When set, the question and description of the form field are made smaller.
			 */
			subfield?: true;
			/**
			 * When set, the input is disabled.
			 */
			disabled?: true;
			/**
			 * When set, the input will be automatically focused when the parent slide becomes active, or immediately after page load.
			 */
			autofocus?: true;
			/**
			 * The id attribute of the form field.
			 */
			id?: string;
			/**
			 * The CSS class names of the form field.
			 */
			classNames?: Array<string>;
			/**
			 * Other HTML attributes of the form field.
			 */
			attrs?: {
				/**
				 * The name of the attribute.
				 */
				name: string;
				/**
				 * The value of the attribute.
				 */
				value: string;
			}[];
			/**
			 * Display condition for the form field.
			 */
			displayCondition?: {
				/**
				 * The names of the form fields or data to use in the condition.
				 */
				dependencies: Array<string>;
				/**
				 * The actual condition.
				 */
				condition: string;
			};
		} & {
			/**
			 * Sets the `placeholder` attribute of the input.
			 */
			placeholder?: string;
			/**
			 * Sets the minimum allowed time value (`"HH:mm"`).
			 */
			min?: string;
			/**
			 * Sets the maximum allowed time value (`"HH:mm"`).
			 */
			max?: string;
			/**
			 * Sets the stepping interval.
			 */
			step?: string;
			/**
			 * Pre-selected time value (`"HH:mm"`).
			 */
			value?: string;
		},
	) => string;
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
	fileInput: (
		name: string,
		params: {
			/**
			 * The main question of the form field.
			 */
			question: string;
			/**
			 * When set, the field becomes required.
			 */
			required?: true;
			/**
			 * Any extra information that the user may need to fill out the form.
			 */
			description?: string;
			/**
			 * When set to `"sm"`, the font sizes of the question, description, and answer are made smaller.
			 */
			fieldSize?: "sm";
			/**
			 * When set to `"classic"`, the question and description of the form field are made smaller.
			 */
			labelStyle?: "classic";
			/**
			 * When set, the question and description of the form field are made smaller.
			 */
			subfield?: true;
			/**
			 * When set, the input is disabled.
			 */
			disabled?: true;
			/**
			 * When set, the input will be automatically focused when the parent slide becomes active, or immediately after page load.
			 */
			autofocus?: true;
			/**
			 * The id attribute of the form field.
			 */
			id?: string;
			/**
			 * The CSS class names of the form field.
			 */
			classNames?: Array<string>;
			/**
			 * Other HTML attributes of the form field.
			 */
			attrs?: {
				/**
				 * The name of the attribute.
				 */
				name: string;
				/**
				 * The value of the attribute.
				 */
				value: string;
			}[];
			/**
			 * Display condition for the form field.
			 */
			displayCondition?: {
				/**
				 * The names of the form fields or data to use in the condition.
				 */
				dependencies: Array<string>;
				/**
				 * The actual condition.
				 */
				condition: string;
			};
		} & {
			/**
			 * Maximum file size in MB. Defaults to `10`.
			 */
			sizeLimit?: number;
			/**
			 * When set, only image files are accepted.
			 */
			imageOnly?: true;
			/**
			 * The current file that exists in the database. Use a URL for best results, for example, https://example.s3.com/image.png.
			 */
			currentFile?: string;
		},
	) => string;
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
	slide: (params?: {
		/**
		 * Logic jump condition that must be `true` for slide to be shown.
		 */
		jumpCondition?: string;
		/**
		 * Progress indicator shown on top (e.g. `"50%"` or `"1/2"`).
		 */
		pageProgress?: string;
		/**
		 * Set the alignment of this slide's CTA button.
		 */
		buttonAlignment?: "start" | "center" | "end" | "stretch";
		/**
		 * If set, posts form data up to this slide when going to the next one.
		 */
		post?: true;
		/**
		 * If set, disables the previous button.
		 */
		disablePrevious?: true;
	}) => string;
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
	startSlide: (params?: {
		/**
		 * Custom text for the start button.
		 */
		buttonText?: string;
		/**
		 * Set the alignment of this slide's CTA button.
		 */
		buttonAlignment?: "start" | "center" | "end" | "stretch";
	}) => string;
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
	endSlide: (params?: {
		/**
		 * URL to redirect to from the end slide.
		 */
		redirectUrl?: string;
	}) => string;
	/**
	 * Create a data-block.
	 *
	 * @param {Object} data
	 * @returns {string}
	 */
	dataBlock: (data: any) => string;
	/**
	 * Create free-form content.
	 *
	 * @param {string} content
	 * @returns {string}
	 */
	free: (content: string) => string;
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
	p: (
		content: string,
		params?: {
			/**
			 * The id attribute of the element.
			 */
			id?: string;
			/**
			 * The CSS class names of the element.
			 */
			classNames?: Array<string>;
			/**
			 * Other HTML attributes of the element.
			 */
			attrs?: {
				/**
				 * The name of the attribute.
				 */
				name: string;
				/**
				 * The value of the attribute.
				 */
				value: string;
			}[];
		},
	) => string;
	/**
	 * Create a heading 1.
	 *
	 * @param {string} content
	 * @param {BlockElemParamsType} [params]
	 * @returns {string}
	 */
	h1: (
		content: string,
		params?: {
			/**
			 * The id attribute of the element.
			 */
			id?: string;
			/**
			 * The CSS class names of the element.
			 */
			classNames?: Array<string>;
			/**
			 * Other HTML attributes of the element.
			 */
			attrs?: {
				/**
				 * The name of the attribute.
				 */
				name: string;
				/**
				 * The value of the attribute.
				 */
				value: string;
			}[];
		},
	) => string;
	/**
	 * Create a heading 2.
	 *
	 * @param {string} content
	 * @param {BlockElemParamsType} [params]
	 * @returns {string}
	 */
	h2: (
		content: string,
		params?: {
			/**
			 * The id attribute of the element.
			 */
			id?: string;
			/**
			 * The CSS class names of the element.
			 */
			classNames?: Array<string>;
			/**
			 * Other HTML attributes of the element.
			 */
			attrs?: {
				/**
				 * The name of the attribute.
				 */
				name: string;
				/**
				 * The value of the attribute.
				 */
				value: string;
			}[];
		},
	) => string;
	/**
	 * Create a heading 3.
	 *
	 * @param {string} content
	 * @param {BlockElemParamsType} [params]
	 * @returns {string}
	 */
	h3: (
		content: string,
		params?: {
			/**
			 * The id attribute of the element.
			 */
			id?: string;
			/**
			 * The CSS class names of the element.
			 */
			classNames?: Array<string>;
			/**
			 * Other HTML attributes of the element.
			 */
			attrs?: {
				/**
				 * The name of the attribute.
				 */
				name: string;
				/**
				 * The value of the attribute.
				 */
				value: string;
			}[];
		},
	) => string;
	/**
	 * Create a heading 4.
	 *
	 * @param {string} content
	 * @param {BlockElemParamsType} [params]
	 * @returns {string}
	 */
	h4: (
		content: string,
		params?: {
			/**
			 * The id attribute of the element.
			 */
			id?: string;
			/**
			 * The CSS class names of the element.
			 */
			classNames?: Array<string>;
			/**
			 * Other HTML attributes of the element.
			 */
			attrs?: {
				/**
				 * The name of the attribute.
				 */
				name: string;
				/**
				 * The value of the attribute.
				 */
				value: string;
			}[];
		},
	) => string;
	/**
	 * Create a heading 5.
	 *
	 * @param {string} content
	 * @param {BlockElemParamsType} [params]
	 * @returns {string}
	 */
	h5: (
		content: string,
		params?: {
			/**
			 * The id attribute of the element.
			 */
			id?: string;
			/**
			 * The CSS class names of the element.
			 */
			classNames?: Array<string>;
			/**
			 * Other HTML attributes of the element.
			 */
			attrs?: {
				/**
				 * The name of the attribute.
				 */
				name: string;
				/**
				 * The value of the attribute.
				 */
				value: string;
			}[];
		},
	) => string;
	/**
	 * Create a heading 6.
	 *
	 * @param {string} content
	 * @param {BlockElemParamsType} [params]
	 * @returns {string}
	 */
	h6: (
		content: string,
		params?: {
			/**
			 * The id attribute of the element.
			 */
			id?: string;
			/**
			 * The CSS class names of the element.
			 */
			classNames?: Array<string>;
			/**
			 * Other HTML attributes of the element.
			 */
			attrs?: {
				/**
				 * The name of the attribute.
				 */
				name: string;
				/**
				 * The value of the attribute.
				 */
				value: string;
			}[];
		},
	) => string;
	/**
	 * Create an unordered list.
	 *
	 * @param {Array.<string>} items
	 * @param {BlockElemParamsType} [params]
	 * @returns {string}
	 */
	ul: (
		items: Array<string>,
		params?: {
			/**
			 * The id attribute of the element.
			 */
			id?: string;
			/**
			 * The CSS class names of the element.
			 */
			classNames?: Array<string>;
			/**
			 * Other HTML attributes of the element.
			 */
			attrs?: {
				/**
				 * The name of the attribute.
				 */
				name: string;
				/**
				 * The value of the attribute.
				 */
				value: string;
			}[];
		},
	) => string;
	/**
	 * Create an ordered list.
	 *
	 * @param {Array.<string>} items
	 * @param {BlockElemParamsType} [params]
	 * @returns {string}
	 */
	ol: (
		items: Array<string>,
		params?: {
			/**
			 * The id attribute of the element.
			 */
			id?: string;
			/**
			 * The CSS class names of the element.
			 */
			classNames?: Array<string>;
			/**
			 * Other HTML attributes of the element.
			 */
			attrs?: {
				/**
				 * The name of the attribute.
				 */
				name: string;
				/**
				 * The value of the attribute.
				 */
				value: string;
			}[];
		},
	) => string;
	/**
	 * Create a blockquote.
	 *
	 * @param {string} content
	 * @param {BlockElemParamsType} [params]
	 * @returns {string}
	 */
	blockquote: (
		content: string,
		params?: {
			/**
			 * The id attribute of the element.
			 */
			id?: string;
			/**
			 * The CSS class names of the element.
			 */
			classNames?: Array<string>;
			/**
			 * Other HTML attributes of the element.
			 */
			attrs?: {
				/**
				 * The name of the attribute.
				 */
				name: string;
				/**
				 * The value of the attribute.
				 */
				value: string;
			}[];
		},
	) => string;
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
	code: (
		content: string,
		params?: {
			/**
			 * The id attribute of the element.
			 */
			id?: string;
			/**
			 * The CSS class names of the element.
			 */
			classNames?: Array<string>;
			/**
			 * Other HTML attributes of the element.
			 */
			attrs?: {
				/**
				 * The name of the attribute.
				 */
				name: string;
				/**
				 * The value of the attribute.
				 */
				value: string;
			}[];
		} & {
			/**
			 * The language of the code.
			 */
			language?: string;
		},
	) => string;
	/**
	 * Create a horizontal rule.
	 *
	 * @returns {string}
	 */
	hr: () => string;
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
	divStart: (
		params?: {
			/**
			 * The id attribute of the element.
			 */
			id?: string;
			/**
			 * The CSS class names of the element.
			 */
			classNames?: Array<string>;
			/**
			 * Other HTML attributes of the element.
			 */
			attrs?: {
				/**
				 * The name of the attribute.
				 */
				name: string;
				/**
				 * The value of the attribute.
				 */
				value: string;
			}[];
		} & {
			/**
			 * The data to bind to the division, e.g., `["name", "email", "birthday"]`.
			 */
			bind?: Array<string>;
		},
	) => string;
	/**
	 * Create a division end tag.
	 *
	 * @returns {string}
	 */
	divEnd: () => string;
	/**
	 * Create a division.
	 *
	 * @param {string} content
	 * @param {BlockElemParamsType & DivParamsType} [params]
	 * @returns {string}
	 */
	div: (
		content: string,
		params?: {
			/**
			 * The id attribute of the element.
			 */
			id?: string;
			/**
			 * The CSS class names of the element.
			 */
			classNames?: Array<string>;
			/**
			 * Other HTML attributes of the element.
			 */
			attrs?: {
				/**
				 * The name of the attribute.
				 */
				name: string;
				/**
				 * The value of the attribute.
				 */
				value: string;
			}[];
		} & {
			/**
			 * The data to bind to the division, e.g., `["name", "email", "birthday"]`.
			 */
			bind?: Array<string>;
		},
	) => string;
}
import { translations } from "./translations";
