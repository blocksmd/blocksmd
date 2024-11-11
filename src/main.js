/*!
 * blocks.md
 * @author Tahmid Khan Nafee <tahmid.hm.dev@gmail.com>
 * @license BUSL-1.1
 * Copyright (c) 2024 Tahmid Khan Nafee
 */

"use strict";

const { parseDataBlocks } = require("./data-blocks-parse");
const { isNumeric } = require("./helpers");
const { renderer } = require("./marked-renderer");
const { getDefaultSettings, parseSettings } = require("./settings-parse");
const { parseSpreadsheetData } = require("./spreadsheet-data-parse");
const {
	createStyles,
	madeInLoaderTemplate,
	createBodyTemplate,
	createContentTemplate,
} = require("./templates-create");
const { getTranslation } = require("./translations");
const createDOMPurify = require("dompurify");
const hljs = require("highlight.js/lib/common");
const { marked } = require("marked");
var nunjucks = require("nunjucks");

class blocksmd {
	options = {
		colorScheme: "light",
		getHeaders: {},
		id: "",
		isFullPage: false,
		paddingInlineBottom: null,
		paddingInlineHorizontal: 0,
		paddingInlineTop: null,
		postData: {},
		postHeaders: {},
		prioritizeURLFormData: false,
		sanitize: true,
		saveState: true,
		setColorSchemeAttrsAgain: true,
		themeDark: {
			accent: "rgb(138, 180, 248)",
			accentForeground: "rgb(0, 0, 0)",
			backgroundColor: "rgb(18, 18, 18)",
			color: "rgb(240, 240, 240)",
		},
		themeLight: {
			accent: "rgb(30, 55, 153)",
			accentForeground: "rgb(255, 255, 255)",
			backgroundColor: "rgb(255, 255, 255)",
			color: "rgb(0, 0, 0)",
		},
	};

	/**
	 * Theme for the page or form.
	 *
	 * @typedef {Object} ThemeType
	 * @property {string} [accent] The primary color (must be HTML name, hex code, or RGB) used on buttons, form fields, etc.
	 * @property {string} [accentForeground] The text color (must be HTML name, hex code, or RGB) used on `accent` background, for example, the text on buttons.
	 * @property {string} [backgroundColor] The `background-color` of the page (must be HTML name, hex code, or RGB).
	 * @property {string} [color] The `color` of the text on the page (must be HTML name, hex code, or RGB).
	 */

	/**
	 * Options for the page or form.
	 *
	 * @typedef {Object} OptionsType
	 * @property {"light"|"dark"} [colorScheme] The default or initial color scheme of the page. Default is `"light"`.
	 * @property {Object} [getHeaders] Headers for GET requests.
	 * @property {string} [id] Identifier for the page or form.
	 * @property {boolean} [isFullPage] Whether to render in full page mode. Default is `false`.
	 * @property {number} [paddingInlineTop] Padding top for inline pages or forms.
	 * @property {number} [paddingInlineHorizontal] Horizontal padding for inline pages or forms. Default is `0`.
	 * @property {number} [paddingInlineBottom] Padding bottom for inline pages or forms.
	 * @property {Object} [postData] Extra data sent with POST requests.
	 * @property {Object} [postHeaders] Headers for POST requests.
	 * @property {boolean} [prioritizeURLFormData] Whether to prioritize URL form data. Default is `false`.
	 * @property {boolean} [sanitize] Whether to sanitize template. Default is `true`.
	 * @property {boolean} [saveState] Whether to save form data in local storage. Default is `true`.
	 * @property {boolean} [setColorSchemeAttrsAgain] Whether to set color scheme attributes again.
	 * @property {ThemeType} [themeDark] Dark theme.
	 * @property {ThemeType} [themeLight] Light theme.
	 */

	/**
	 * Create an instance of the class.
	 *
	 * @param {string} template
	 * @param {Document|HTMLElement|Element} container
	 * @param {OptionsType} options
	 */
	constructor(template, container, options) {
		this.container = container;

		// Set the options for use
		if (options) {
			// Color Scheme
			if (
				options["colorScheme"] === "light" ||
				options["colorScheme"] === "dark"
			) {
				this.options["colorScheme"] = options["colorScheme"];
			}
			// GET headers
			if (
				options["getHeaders"] !== undefined &&
				typeof options["getHeaders"] === "object"
			) {
				this.options["getHeaders"] = {
					...this.options["getHeaders"],
					...options["getHeaders"],
				};
			}
			// Id
			if (options["id"] !== undefined && typeof options["id"] === "string")
				this.options["id"] = options["id"];
			// Is full page
			if (
				options["isFullPage"] !== undefined &&
				typeof options["isFullPage"] === "boolean"
			)
				this.options["isFullPage"] = options["isFullPage"];
			// Padding inline bottom
			if (
				options["paddingInlineBottom"] !== undefined &&
				typeof options["paddingInlineBottom"] === "number"
			)
				this.options["paddingInlineBottom"] = options["paddingInlineBottom"];
			// Padding inline horizontal
			if (
				options["paddingInlineHorizontal"] !== undefined &&
				typeof options["paddingInlineHorizontal"] === "number"
			)
				this.options["paddingInlineHorizontal"] =
					options["paddingInlineHorizontal"];
			// Padding inline top
			if (
				options["paddingInlineTop"] !== undefined &&
				typeof options["paddingInlineTop"] === "number"
			)
				this.options["paddingInlineTop"] = options["paddingInlineTop"];
			// POST data
			if (
				options["postData"] !== undefined &&
				typeof options["postData"] === "object"
			) {
				this.options["postData"] = {
					...this.options["postData"],
					...options["postData"],
				};
			}
			// POST headers
			if (
				options["postHeaders"] !== undefined &&
				typeof options["postHeaders"] === "object"
			) {
				this.options["postHeaders"] = {
					...this.options["postHeaders"],
					...options["postHeaders"],
				};
			}
			// Prioritize form data from URLs
			if (
				options["prioritizeURLFormData"] !== undefined &&
				typeof options["prioritizeURLFormData"] === "boolean"
			)
				this.options["prioritizeURLFormData"] =
					options["prioritizeURLFormData"];
			// Sanitize
			if (
				options["sanitize"] !== undefined &&
				typeof options["sanitize"] === "boolean"
			)
				this.options["sanitize"] = options["sanitize"];
			// Save state
			if (
				options["saveState"] !== undefined &&
				typeof options["saveState"] === "boolean"
			)
				this.options["saveState"] = options["saveState"];
			// Set color scheme attributes again
			if (
				options["setColorSchemeAttrsAgain"] !== undefined &&
				typeof options["setColorSchemeAttrsAgain"] === "boolean"
			)
				this.options["setColorSchemeAttrsAgain"] =
					options["setColorSchemeAttrsAgain"];
			else if (!this.options["isFullPage"]) {
				this.options["setColorSchemeAttrsAgain"] = false;
			}
			// Theme dark
			if (
				options["themeDark"] !== undefined &&
				typeof options["themeDark"] === "object"
			) {
				if (
					options["themeDark"]["accent"] !== undefined &&
					typeof options["themeDark"]["accent"] === "string"
				) {
					this.options["themeDark"]["accent"] = options["themeDark"]["accent"];
				}
				if (
					options["themeDark"]["accentForeground"] !== undefined &&
					typeof options["themeDark"]["accentForeground"] === "string"
				) {
					this.options["themeDark"]["accentForeground"] =
						options["themeDark"]["accentForeground"];
				}
				if (
					options["themeDark"]["backgroundColor"] !== undefined &&
					typeof options["themeDark"]["backgroundColor"] === "string"
				) {
					this.options["themeDark"]["backgroundColor"] =
						options["themeDark"]["backgroundColor"];
				}
				if (
					options["themeDark"]["color"] !== undefined &&
					typeof options["themeDark"]["color"] === "string"
				) {
					this.options["themeDark"]["color"] = options["themeDark"]["color"];
				}
			}
			// Theme light
			if (
				options["themeLight"] !== undefined &&
				typeof options["themeLight"] === "object"
			) {
				if (
					options["themeLight"]["accent"] !== undefined &&
					typeof options["themeLight"]["accent"] === "string"
				) {
					this.options["themeLight"]["accent"] =
						options["themeLight"]["accent"];
				}
				if (
					options["themeLight"]["accentForeground"] !== undefined &&
					typeof options["themeLight"]["accentForeground"] === "string"
				) {
					this.options["themeLight"]["accentForeground"] =
						options["themeLight"]["accentForeground"];
				}
				if (
					options["themeLight"]["backgroundColor"] !== undefined &&
					typeof options["themeLight"]["backgroundColor"] === "string"
				) {
					this.options["themeLight"]["backgroundColor"] =
						options["themeLight"]["backgroundColor"];
				}
				if (
					options["themeLight"]["color"] !== undefined &&
					typeof options["themeLight"]["color"] === "string"
				) {
					this.options["themeLight"]["color"] = options["themeLight"]["color"];
				}
			}
		}

		// Set up the settings from the options
		const templateSettingsFromOptions = [];
		if (this.options["id"] !== "")
			templateSettingsFromOptions.push(`#! id = ${this.options["id"]}`);

		let colorScheme = this.options["colorScheme"];
		const templateContainsColorScheme = template.match(
			/#!\s*color-scheme\s*=\s*(light|dark)/,
		);
		if (templateContainsColorScheme) {
			colorScheme = templateContainsColorScheme[1];
		} else {
			templateSettingsFromOptions.push(`#! color-scheme = ${colorScheme}`);
		}

		let theme = this.options["themeLight"];
		let themeAltScheme = this.options["themeDark"];
		if (colorScheme === "dark") {
			theme = this.options["themeDark"];
			themeAltScheme = this.options["themeLight"];
		}
		templateSettingsFromOptions.push(
			`#! accent = ${theme["accent"]} || ${themeAltScheme["accent"]}`,
		);
		templateSettingsFromOptions.push(
			`#! accent-foreground = ${theme["accentForeground"]} || ${themeAltScheme["accentForeground"]}`,
		);
		templateSettingsFromOptions.push(
			`#! background-color = ${theme["backgroundColor"]} || ${themeAltScheme["backgroundColor"]}`,
		);
		templateSettingsFromOptions.push(
			`#! color = ${theme["color"]} || ${themeAltScheme["color"]}`,
		);

		// Set the template
		this._template = `${templateSettingsFromOptions.join("\n")}\n\n${template}`;
	}

	/**
	 * Set the state to defaults.
	 */
	setStateToDefaults = () => {
		const instance = this;

		instance.state = {
			bindDivTemplates: {},
			data: {},
			fieldTypes: {},
			formData: {},
			settings: getDefaultSettings(),
			slideData: {
				currentIndex: 0,
			},
		};
	};

	/**
	 * Add a single attribute value to an HTML element.
	 *
	 * @param {HTMLElement} elem
	 * @param {string} name
	 * @param {string} value
	 */
	setSingleAttribute = (elem, name, value) => {
		const attrs = elem.getAttribute(name) || "";
		const attrsArr = attrs
			.replace(/\s\s+/g, " ")
			.split(" ")
			.filter(function (v) {
				return v !== "";
			});
		attrsArr.push(value);
		elem.setAttribute(name, attrsArr.join(" "));
	};

	/**
	 * Remove a single attribute value from an HTML element.
	 *
	 * @param {HTMLElement} elem
	 * @param {string} name
	 * @param {string} value
	 */
	removeSingleAttribute = (elem, name, value) => {
		const attrs = elem.getAttribute(name) || "";
		const attrsArr = attrs
			.replace(/\s\s+/g, " ")
			.split(" ")
			.filter(function (v) {
				return v !== "";
			});
		const index = attrsArr.indexOf(value);
		if (index > -1) attrsArr.splice(index, 1);
		if (attrsArr.length > 0) {
			elem.setAttribute(name, attrsArr.join(" "));
		} else {
			elem.removeAttribute(name);
		}
	};

	/**
	 * Get the prefix for the page/form id.
	 *
	 * @returns {string}
	 */
	getIdPrefix = () => {
		const instance = this;

		return instance.state["settings"]["id"] !== ""
			? `${instance.state["settings"]["id"]}:`
			: "";
	};

	/**
	 * Set the preferred color scheme (if one is found in the local storage).
	 * Depending on the preference from settings, either the domain-wide or the
	 * page-specific value is used.
	 */
	setPreferredColorScheme = () => {
		const instance = this;

		const rootElem = instance.container.querySelector(".bmd-root");
		const localStorageKey =
			rootElem.getAttribute("data-bmd-color-scheme-scope") === "isolate"
				? `blocksmd:${instance.getIdPrefix()}${window.location.hostname}${
						window.location.pathname
					}color-scheme`
				: "blocksmd:color-scheme";
		const preferredColorScheme = localStorage.getItem(localStorageKey);
		if (preferredColorScheme)
			rootElem.setAttribute("data-bmd-color-scheme", preferredColorScheme);
	};

	/**
	 * Toggle color scheme. If the preferred color scheme (from settings) is set
	 * to "isolate", the preference is saved (and used) only for that page.
	 * Otherwise, it is saved (and used) domain-wide.
	 *
	 * @param {MouseEvent} e
	 */
	toggleColorScheme = (e) => {
		const instance = this;

		e.preventDefault();
		const rootElem = instance.container.querySelector(".bmd-root");
		const localStorageKey =
			instance.state["settings"]["color-scheme-scope"] === "isolate"
				? `blocksmd:${instance.getIdPrefix()}${window.location.hostname}${
						window.location.pathname
					}color-scheme`
				: "blocksmd:color-scheme";
		const currentColorScheme = rootElem.getAttribute("data-bmd-color-scheme");
		if (currentColorScheme === "light") {
			rootElem.setAttribute("data-bmd-color-scheme", "dark");
			localStorage.setItem(localStorageKey, "dark");
		} else if (currentColorScheme === "dark") {
			rootElem.setAttribute("data-bmd-color-scheme", "light");
			localStorage.setItem(localStorageKey, "light");
		}
	};

	/**
	 * Create a random 32 characters id separated by dashes.
	 *
	 * @returns {string}
	 */
	createRandomId = () => {
		const characters =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let id = "";
		for (let i = 0; i < 32; i++) {
			id += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`;
	};

	/**
	 * Get or create response id. This uniquely identifies one single form
	 * response. The id is created on initialization (unless one already
	 * exists), and it is removed when the user reaches the end slide.
	 *
	 * @returns {string}
	 */
	getOrCreateResponseId = () => {
		const instance = this;

		const localStorageKey = `blocksmd:${instance.getIdPrefix()}${
			window.location.hostname
		}${window.location.pathname}response-id`;
		let responseId = localStorage.getItem(localStorageKey);
		if (!responseId) {
			responseId = instance.createRandomId();
			localStorage.setItem(localStorageKey, responseId);
		}
		return responseId;
	};

	/**
	 * Remove response id. This is called when the user reaches the end slide.
	 */
	removeResponseId = () => {
		const instance = this;

		const localStorageKey = `blocksmd:${instance.getIdPrefix()}${
			window.location.hostname
		}${window.location.pathname}response-id`;
		localStorage.removeItem(localStorageKey);
	};

	/**
	 * Save form field value in local storage.
	 *
	 * @param {string} name
	 * @param {*} value
	 */
	saveFieldValue = (name, value) => {
		const instance = this;

		const localStorageKey = `blocksmd:${instance.getIdPrefix()}${
			window.location.hostname
		}${window.location.pathname}form-data`;
		let savedFormData = localStorage.getItem(localStorageKey) || "{}";
		savedFormData = JSON.parse(savedFormData);
		savedFormData[name] = value;
		localStorage.setItem(localStorageKey, JSON.stringify(savedFormData));
	};

	/**
	 * Remove form data from local storage. This is called when the user reaches
	 * the end slide.
	 */
	removeSavedFormData = () => {
		const instance = this;

		const localStorageKey = `blocksmd:${instance.getIdPrefix()}${
			window.location.hostname
		}${window.location.pathname}form-data`;
		localStorage.removeItem(localStorageKey);
	};

	/**
	 * Re-render the bind <div> and <span> elements.
	 *
	 * @param {string} name
	 */
	reRenderBindElems = (name) => {
		const instance = this;

		// Re-render the bind <div> elements
		instance.container
			.querySelectorAll(`div[data-bmd-bind-${name}]`)
			.forEach((div) => {
				const template =
					instance.state["bindDivTemplates"][
						div.getAttribute("data-bmd-bind-template-ref")
					];
				marked.use({
					renderer: renderer,
					markedSettings: {
						"css-prefix": instance.state["settings"]["css-prefix"],
						"form-delimiter": instance.state["settings"]["form-delimiter"],
						"id": instance.state["settings"]["id"],
						"localization": instance.state["settings"]["localization"],
					},
				});
				let parsedTemplate = marked.parse(
					nunjucks.renderString(template, {
						...instance.state["data"],
						...instance.state["formData"],
					}),
				);
				if (instance.options["sanitize"]) {
					const DOMPurify = createDOMPurify(window);
					parsedTemplate = DOMPurify.sanitize(parsedTemplate);
				}
				div.innerHTML = parsedTemplate;

				// Highlight code blocks again
				div.querySelectorAll("pre code").forEach((codeBlock) => {
					hljs.highlightElement(codeBlock);
				});

				// Add event listeners again
				instance.addEventListeners(div, false);
			});

		// Re-render the bind <span> elements
		instance.container
			.querySelectorAll(`span[data-bmd-bind-${name}]`)
			.forEach((span) => {
				span.innerText = instance.state["formData"][name];
			});
	};

	/**
	 * Get value of a set of radio buttons or checkboxes.
	 *
	 * @param {string} name
	 * @param {string} inputClass
	 * @param {"radio"|"checkbox"} type
	 * @returns {string|Array.<string>}
	 */
	getRadioCheckboxValue = (name, inputClass, type) => {
		const instance = this;

		// For radio buttons, the single checked value is returned
		if (type === "radio") {
			let value = "";
			const input = instance.container.querySelector(
				`.${inputClass}[type="radio"][name="${name}"]:checked`,
			);
			if (input) value = input.value;
			return value;
		}
		// For checkboxes, an array of checked values is returned
		else if (type === "checkbox") {
			const value = [];
			instance.container
				.querySelectorAll(
					`.${inputClass}[type="checkbox"][name="${name}"]:checked`,
				)
				.forEach((input) => {
					value.push(input.value);
				});
			return value;
		}
	};

	/**
	 * Set value of a set of radio buttons or checkboxes.
	 *
	 * @param {string} name
	 * @param {string} inputClass
	 * @param {"radio"|"checkbox"} type
	 * @param {string|Array.<string>} value
	 */
	setRadioCheckboxValue = (name, inputClass, type, value) => {
		const instance = this;

		// For radio buttons, the value is a single string
		if (type === "radio") {
			if (typeof value === "string") value = value.trim();
			const input = instance.container.querySelector(
				`.${inputClass}[type="radio"][name="${name}"][value="${value}"]`,
			);
			if (input) input.checked = true;
		}
		// For checkboxes, the value is an array of strings
		else if (type === "checkbox") {
			const values = {};
			for (const item of value) {
				values[item.trim()] = true;
			}
			instance.container
				.querySelectorAll(`.${inputClass}[type="checkbox"][name="${name}"]`)
				.forEach((input) => {
					input.checked = false;
					if (values[input.value]) input.checked = true;
				});
		}
	};

	/**
	 * Given a country calling code <select>, update placeholder of the
	 * corresponding telephone input using the selected <option>.
	 *
	 * @param {HTMLSelectElement} countryCodeSelect
	 */
	setTelInputPlaceholder = (countryCodeSelect) => {
		const telInput = countryCodeSelect
			.closest(".bmd-form-field")
			.querySelector('.bmd-form-str-input[type="tel"]');
		const selected = countryCodeSelect.selectedOptions[0];
		if (telInput && selected) {
			telInput.setAttribute(
				"placeholder",
				selected.getAttribute("data-bmd-placeholder"),
			);
		}
	};

	/**
	 * Set form data to state (value and type). Also re-render the bind <div>
	 * and <span> elements.
	 */
	setFormDataToState = () => {
		const instance = this;

		// Text fields
		instance.container
			.querySelectorAll(
				'input.bmd-form-str-input[type="text"], input.bmd-form-str-input[type="email"], input.bmd-form-str-input[type="url"], input.bmd-form-str-input[type="tel"], textarea.bmd-form-str-input',
			)
			.forEach((elem) => {
				let name = elem.getAttribute("name");
				const value = elem.value;
				const type = elem.getAttribute("type") || "text";

				// Issue-fix with DOMPurify (in case of sanitization)
				// https://github.com/cure53/DOMPurify/issues/952
				if (elem.getAttribute("id") === `${instance.getIdPrefix()}id_name`) {
					elem.setAttribute("name", "name");
					name = "name";
				}

				instance.state["formData"][name] = value;
				instance.state["fieldTypes"][name] = type;
				instance.reRenderBindElems(name);
			});

		// Number fields
		instance.container
			.querySelectorAll('input.bmd-form-num-input[type="number"]')
			.forEach((elem) => {
				const name = elem.getAttribute("name");
				const value = isNumeric(elem.value) ? Number(elem.value) : null;
				instance.state["formData"][name] = value;
				instance.state["fieldTypes"][name] = "number";
				instance.reRenderBindElems(name);
			});

		// Select fields
		instance.container
			.querySelectorAll("select.bmd-form-str-select")
			.forEach((elem) => {
				const name = elem.getAttribute("name");
				const value = elem.value;
				instance.state["formData"][name] = value;
				instance.state["fieldTypes"][name] = "select";
				instance.reRenderBindElems(name);
			});

		// Choice fields
		instance.container
			.querySelectorAll(
				".bmd-form-check:first-child input.bmd-form-str-check-input",
			)
			.forEach((elem) => {
				const name = elem.getAttribute("name");
				const type = elem.getAttribute("type");
				const value = instance.getRadioCheckboxValue(
					name,
					"bmd-form-str-check-input",
					type,
				);
				instance.state["formData"][name] = value;
				instance.state["fieldTypes"][name] = "choice";
				instance.reRenderBindElems(name);
			});

		// Number choice fields
		instance.container
			.querySelectorAll("input.bmd-form-num-check-input:first-child")
			.forEach((elem) => {
				const name = elem.getAttribute("name");
				let value = instance.getRadioCheckboxValue(
					name,
					"bmd-form-num-check-input",
					"radio",
				);
				value = value ? parseInt(value) : null;
				instance.state["formData"][name] = value;
				instance.state["fieldTypes"][name] = "num-choice";
				instance.reRenderBindElems(name);
			});

		// Datetime fields
		instance.container
			.querySelectorAll(
				'input.bmd-form-datetime-input[type="datetime-local"], input.bmd-form-datetime-input[type="date"], input.bmd-form-datetime-input[type="time"]',
			)
			.forEach((elem) => {
				let name = elem.getAttribute("name");
				const value = elem.value;
				const type = elem.getAttribute("type");
				instance.state["formData"][name] = value;
				instance.state["fieldTypes"][name] = type;
				instance.reRenderBindElems(name);
			});
	};

	/**
	 * Set form data from URL parameters: set value in the DOM, update state,
	 * conditionally update local storage, and re-render the bind <div> and
	 * <span> elements. The local storage is updated if this function is called
	 * AFTER setting the saved form data (in local storage).
	 *
	 * @param {boolean} updateLocalStorage
	 */
	setFormDataFromURL = (updateLocalStorage) => {
		const instance = this;

		const urlParams = new URLSearchParams(window.location.search);
		for (const urlParam of urlParams) {
			let name = urlParam[0];
			let value = urlParam[1];

			// Make sure URL parameters are id-scoped
			if (instance.state["settings"]["id"] !== "") {
				if (name.startsWith(`${instance.state["settings"]["id"]}:`)) {
					name = name.replace(`${instance.state["settings"]["id"]}:`, "");
				} else {
					continue;
				}
			}

			// Text field
			if (
				instance.state["fieldTypes"][name] === "text" ||
				instance.state["fieldTypes"][name] === "email" ||
				instance.state["fieldTypes"][name] === "url" ||
				instance.state["fieldTypes"][name] === "tel"
			) {
				const input = instance.container.querySelector(
					`.bmd-form-str-input[name="${name}"]`,
				);
				if (input) {
					input.value = value;
					instance.state["formData"][name] = value;
					if (updateLocalStorage && instance.options["saveState"])
						instance.saveFieldValue(name, value);
					instance.reRenderBindElems(name);
				}
			}

			// Number field
			if (instance.state["fieldTypes"][name] === "number") {
				const input = instance.container.querySelector(
					`.bmd-form-num-input[name="${name}"]`,
				);
				if (input && isNumeric(value)) {
					value = Number(value);
					input.value = value;
					instance.state["formData"][name] = value;
					if (updateLocalStorage && instance.options["saveState"])
						instance.saveFieldValue(name, value);
					instance.reRenderBindElems(name);
				}
			}

			// Select field
			if (instance.state["fieldTypes"][name] === "select") {
				const select = instance.container.querySelector(
					`.bmd-form-str-select[name="${name}"]`,
				);
				if (select) {
					const options = select.querySelectorAll("option");
					for (const option of options) {
						if (option.getAttribute("value") === value) {
							select.value = value;
							instance.state["formData"][name] = value;
							if (updateLocalStorage && instance.options["saveState"])
								instance.saveFieldValue(name, value);
							instance.reRenderBindElems(name);
							break;
						}
					}
					if (select.classList.contains("bmd-form-countrycode-select"))
						instance.setTelInputPlaceholder(select);
				}
			}

			// Choice field
			if (instance.state["fieldTypes"][name] === "choice") {
				const input = instance.container.querySelector(
					`.bmd-form-str-check-input[name="${name}"]`,
				);
				if (input) {
					const type = input.getAttribute("type");

					// Set value, for checkbox, convert to array first
					if (type === "checkbox") value = value.split(",");
					instance.setRadioCheckboxValue(
						name,
						"bmd-form-str-check-input",
						type,
						value,
					);

					// Get value again, set to state, etc.
					value = instance.getRadioCheckboxValue(
						name,
						"bmd-form-str-check-input",
						type,
					);
					instance.state["formData"][name] = value;
					if (updateLocalStorage && instance.options["saveState"])
						instance.saveFieldValue(name, value);
					instance.reRenderBindElems(name);
				}
			}

			// Number choice field
			if (instance.state["fieldTypes"][name] === "num-choice") {
				const input = instance.container.querySelector(
					`.bmd-form-num-check-input[name="${name}"]`,
				);
				if (input) {
					instance.setRadioCheckboxValue(
						name,
						"bmd-form-num-check-input",
						"radio",
						value,
					);
					value = instance.getRadioCheckboxValue(
						name,
						"bmd-form-num-check-input",
						"radio",
					);
					value = value ? parseInt(value) : null;
					instance.state["formData"][name] = value;
					if (updateLocalStorage && instance.options["saveState"])
						instance.saveFieldValue(name, value);
					instance.reRenderBindElems(name);
				}
			}

			// Datetime field
			if (
				instance.state["fieldTypes"][name] === "datetime-local" ||
				instance.state["fieldTypes"][name] === "date" ||
				instance.state["fieldTypes"][name] === "time"
			) {
				const input = instance.container.querySelector(
					`.bmd-form-datetime-input[name="${name}"]`,
				);
				if (input) {
					input.value = value;
					instance.state["formData"][name] = value;
					if (updateLocalStorage && instance.options["saveState"])
						instance.saveFieldValue(name, value);
					instance.reRenderBindElems(name);
				}
			}
		}
	};

	/**
	 * Set form data saved in local storage: set value in the DOM, update state,
	 * and re-render the bind <div> and <span> elements.
	 */
	setSavedFormData = () => {
		const instance = this;

		const localStorageKey = `blocksmd:${instance.getIdPrefix()}${
			window.location.hostname
		}${window.location.pathname}form-data`;
		const savedFormData = localStorage.getItem(localStorageKey);
		if (!savedFormData) return;
		for (const [name, value] of Object.entries(JSON.parse(savedFormData))) {
			// Text field
			if (
				instance.state["fieldTypes"][name] === "text" ||
				instance.state["fieldTypes"][name] === "email" ||
				instance.state["fieldTypes"][name] === "url" ||
				instance.state["fieldTypes"][name] === "tel"
			) {
				const input = instance.container.querySelector(
					`.bmd-form-str-input[name="${name}"]`,
				);
				if (input) {
					input.value = value;
					instance.state["formData"][name] = value;
					instance.reRenderBindElems(name);
				}
			}

			// Number field
			if (instance.state["fieldTypes"][name] === "number") {
				const input = instance.container.querySelector(
					`.bmd-form-num-input[name="${name}"]`,
				);
				if (input) {
					input.value = value;
					instance.state["formData"][name] = value;
					instance.reRenderBindElems(name);
				}
			}

			// Select field
			if (instance.state["fieldTypes"][name] === "select") {
				const select = instance.container.querySelector(
					`.bmd-form-str-select[name="${name}"]`,
				);
				if (select) {
					const options = select.querySelectorAll("option");
					for (const option of options) {
						if (option.getAttribute("value") === value) {
							select.value = value;
							instance.state["formData"][name] = value;
							instance.reRenderBindElems(name);
							break;
						}
					}
					if (select.classList.contains("bmd-form-countrycode-select"))
						instance.setTelInputPlaceholder(select);
				}
			}

			// Choice field
			if (instance.state["fieldTypes"][name] === "choice") {
				const input = instance.container.querySelector(
					`.bmd-form-str-check-input[name="${name}"]`,
				);
				if (input) {
					const type = input.getAttribute("type");
					instance.setRadioCheckboxValue(
						name,
						"bmd-form-str-check-input",
						type,
						value,
					);
					instance.state["formData"][name] = instance.getRadioCheckboxValue(
						name,
						"bmd-form-str-check-input",
						type,
					);
					instance.reRenderBindElems(name);
				}
			}

			// Number choice field
			if (instance.state["fieldTypes"][name] === "num-choice") {
				const input = instance.container.querySelector(
					`.bmd-form-num-check-input[name="${name}"]`,
				);
				if (input) {
					instance.setRadioCheckboxValue(
						name,
						"bmd-form-num-check-input",
						"radio",
						String(value),
					);
					instance.state["formData"][name] = instance.getRadioCheckboxValue(
						name,
						"bmd-form-num-check-input",
						"radio",
					);
					instance.reRenderBindElems(name);
				}
			}

			// Datetime field
			if (
				instance.state["fieldTypes"][name] === "datetime-local" ||
				instance.state["fieldTypes"][name] === "date" ||
				instance.state["fieldTypes"][name] === "time"
			) {
				const input = instance.container.querySelector(
					`.bmd-form-datetime-input[name="${name}"]`,
				);
				if (input) {
					input.value = value;
					instance.state["formData"][name] = value;
					instance.reRenderBindElems(name);
				}
			}
		}
	};

	/**
	 * Given a form field element, remove all errors (and everything related).
	 *
	 * @param {HTMLElement} formField
	 */
	removeFieldErrors = (formField) => {
		const instance = this;

		// Remove all errors
		formField.querySelectorAll(".bmd-error").forEach((error) => {
			error.remove();
		});

		// Form fields with errors will have a type attribute
		const type = formField.getAttribute("data-bmd-type");

		// Remove WAI-ARIA tags
		// Choice field
		if (type === "radio" || type === "checkbox") {
			formField
				.querySelectorAll(".bmd-form-str-check-input")
				.forEach((input) => {
					input.removeAttribute("aria-invalid");
					input.removeAttribute("aria-describedby");
				});
		}
		// Number choice field
		else if (type === "num-radio") {
			formField
				.querySelectorAll(".bmd-form-num-check-input")
				.forEach((input) => {
					input.removeAttribute("aria-invalid");
					const name = input.getAttribute("name");
					instance.removeSingleAttribute(
						input,
						"aria-describedby",
						`${instance.getIdPrefix()}id_${name}-error`,
					);
				});
		}
		// Datetime field
		else if (type === "datetime-local" || type === "date" || type === "time") {
			formField
				.querySelectorAll(".bmd-form-datetime-input")
				.forEach((input) => {
					input.removeAttribute("aria-invalid");
					input.removeAttribute("aria-describedby");
				});
		}
		// File field
		else if (type === "file") {
			formField.querySelectorAll(".bmd-form-file-input").forEach((input) => {
				input.removeAttribute("aria-invalid");
				input.removeAttribute("aria-describedby");
			});
		}
	};

	/**
	 * Handle the inputs of text form fields: update value in the state, save
	 * value in local storage, remove errors and re-render the bind <div> and
	 * <span> elements.
	 *
	 * @param {InputEvent} e
	 */
	textFieldOnInput = (e) => {
		const instance = this;

		const name = e.target.getAttribute("name");
		const value = e.target.value;
		instance.state["formData"][name] = value;
		if (instance.options["saveState"]) instance.saveFieldValue(name, value);
		instance.removeFieldErrors(e.target.closest(".bmd-form-field"));
		instance.reRenderBindElems(name);
	};

	/**
	 * Handle the inputs of number form fields: update value in the state, save
	 * value in local storage, remove errors and re-render the bind <div> and
	 * <span> elements.
	 *
	 * @param {InputEvent} e
	 */
	numberFieldOnInput = (e) => {
		const instance = this;

		const name = e.target.getAttribute("name");
		const value = isNumeric(e.target.value) ? Number(e.target.value) : null;
		instance.state["formData"][name] = value;
		if (instance.options["saveState"]) instance.saveFieldValue(name, value);
		instance.removeFieldErrors(e.target.closest(".bmd-form-field"));
		instance.reRenderBindElems(name);
	};

	/**
	 * Handle the inputs of select form fields: update value in the state, save
	 * value in local storage, remove errors and re-render the bind <div> and
	 * <span> elements. If the select box is a country calling code select, then
	 * also update the placeholder of the corresponding telephone input.
	 *
	 * @param {InputEvent} e
	 */
	selectFieldOnInput = (e) => {
		const instance = this;

		const name = e.target.getAttribute("name");
		const value = e.target.value;
		instance.state["formData"][name] = value;
		if (instance.options["saveState"]) instance.saveFieldValue(name, value);
		instance.removeFieldErrors(e.target.closest(".bmd-form-field"));
		instance.reRenderBindElems(name);

		// Update placeholder of telephone input if country calling code <select>
		if (e.target.classList.contains("bmd-form-countrycode-select"))
			instance.setTelInputPlaceholder(e.target);
	};

	/**
	 * Handle the inputs of choice form fields: update value in the state, save
	 * value in local storage, remove errors and re-render the bind <div> and
	 * <span> elements.
	 *
	 * @param {InputEvent} e
	 */
	choiceFieldOnInput = (e) => {
		const instance = this;

		const name = e.target.getAttribute("name");
		const type = e.target.getAttribute("type");
		const value = instance.getRadioCheckboxValue(
			name,
			"bmd-form-str-check-input",
			type,
		);
		instance.state["formData"][name] = value;
		if (instance.options["saveState"]) instance.saveFieldValue(name, value);
		instance.removeFieldErrors(e.target.closest(".bmd-form-field"));
		instance.reRenderBindElems(name);
	};

	/**
	 * Handle the inputs of number choice form fields: update value in the
	 * state, save value in local storage, remove errors and re-render the bind
	 * <div> and <span> elements.
	 *
	 * @param {InputEvent} e
	 */
	numChoiceFieldOnInput = (e) => {
		const instance = this;

		const name = e.target.getAttribute("name");
		const value = parseInt(
			instance.getRadioCheckboxValue(name, "bmd-form-num-check-input", "radio"),
		);
		instance.state["formData"][name] = value;
		if (instance.options["saveState"]) instance.saveFieldValue(name, value);
		instance.removeFieldErrors(e.target.closest(".bmd-form-field"));
		instance.reRenderBindElems(name);
	};

	/**
	 * Handle the inputs of datetime form fields: update value in the state,
	 * save value in local storage, remove errors and re-render the bind <div>
	 * and <span> elements.
	 *
	 * @param {InputEvent} e
	 */
	datetimeFieldOnInput = (e) => {
		const instance = this;

		const name = e.target.getAttribute("name");
		const value = e.target.value;
		instance.state["formData"][name] = value;
		if (instance.options["saveState"]) instance.saveFieldValue(name, value);
		instance.removeFieldErrors(e.target.closest(".bmd-form-field"));
		instance.reRenderBindElems(name);
	};

	/**
	 * Handle the inputs of file form fields: reset and update the wrapping
	 * <label> depending on the file chosen.
	 *
	 * @param {InputEvent} e
	 */
	fileFieldOnInput = (e) => {
		const instance = this;

		// Get the wrapper and inner section
		const label = e.target.closest(".bmd-form-file-label");
		const fileExistsSection = label.querySelector(".bmd-file-exists-section");

		// Reset first
		instance.removeFieldErrors(e.target.closest(".bmd-form-field"));
		label.classList.remove("bmd-file-exists");
		fileExistsSection.innerHTML = "";

		// Get the file and update wrapper depending on type
		const imageFileTypes = [
			"image/apng",
			"image/bmp",
			"image/gif",
			"image/jpeg",
			"image/pjpeg",
			"image/png",
			"image/svg+xml",
			"image/tiff",
			"image/webp",
			"image/x-icon",
		];
		const file = e.target.files[0];
		if (file) {
			// Bug fix where you can drag in a non-image file and have it be accepted
			// This bug exists on Chrome for macOS (and maybe others)
			let fileValid = true;
			if (
				e.target.getAttribute("accept") === "image/*" &&
				!imageFileTypes.includes(file.type)
			) {
				e.target.value = "";
				fileValid = false;
			}

			if (fileValid) {
				if (imageFileTypes.includes(file.type)) {
					fileExistsSection.innerHTML = [
						`<span class="bmd-form-file-img-container">`,
						`	<img src="${URL.createObjectURL(file)}" alt="${file.name}">`,
						`</span>`,
						`<span class="bmd-d-block bmd-mt-3">`,
						`	<strong class="bmd-text-accent">${file.name}</strong>`,
						`</span>\n`,
					].join("\n");
				} else {
					fileExistsSection.innerHTML = [
						`<span class="bmd-form-file-img-container">`,
						`	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M352 448l0-256-112 0c-26.5 0-48-21.5-48-48l0-112L64 32C46.3 32 32 46.3 32 64l0 384c0 17.7 14.3 32 32 32l256 0c17.7 0 32-14.3 32-32zm-.5-288c-.7-2.8-2.1-5.4-4.2-7.4L231.4 36.7c-2.1-2.1-4.6-3.5-7.4-4.2L224 144c0 8.8 7.2 16 16 16l111.5 0zM0 64C0 28.7 28.7 0 64 0L220.1 0c12.7 0 24.9 5.1 33.9 14.1L369.9 129.9c9 9 14.1 21.2 14.1 33.9L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"/></svg>`,
						`</span>`,
						`<span class="bmd-d-block bmd-mt-3">`,
						`	<strong class="bmd-text-accent">${file.name}</strong>`,
						`</span>\n`,
					].join("\n");
				}
				label.classList.add("bmd-file-exists");
			}
		}
	};

	/**
	 * Set the height of a <textrea> element on input.
	 *
	 * @param {InputEvent} e
	 */
	setTextareaHeightOnInput = (e) => {
		const textarea = e.target;
		textarea.style.height = "";
		textarea.style.height = textarea.scrollHeight + "px";
	};

	/**
	 * Reset file input when the corresponding reset button is clicked.
	 *
	 * @param {MouseEvent} e
	 */
	fileInputResetBtnOnClick = (e) => {
		const instance = this;

		// Get the input, wrapper and inner section
		const fileInput = e.target
			.closest(".bmd-form-field")
			.querySelector('.bmd-form-file-input[type="file"]');
		const label = e.target
			.closest(".bmd-form-field")
			.querySelector(".bmd-form-file-label");
		const fileExistsSection = label.querySelector(".bmd-file-exists-section");

		// Reset
		if (fileInput && label && fileExistsSection) {
			fileInput.value = "";
			instance.removeFieldErrors(e.target.closest(".bmd-form-field"));
			label.classList.remove("bmd-file-exists");
			fileExistsSection.innerHTML = "";
		}
	};

	/**
	 * Given a <button> element, set it to the processing state.
	 *
	 * @param {HTMLButtonElement} btn
	 */
	setBtnProcessing = (btn) => {
		const instance = this;

		btn.classList.add("bmd-btn-processing");
		const localization = instance.state["settings"]["localization"];
		btn.setAttribute("aria-label", getTranslation(localization, "loading"));
	};

	/**
	 * Given a <button> element, remove its processing state.
	 *
	 * @param {HTMLButtonElement} btn
	 */
	removeBtnProcessing = (btn) => {
		const instance = this;

		btn.classList.remove("bmd-btn-processing");
		btn.removeAttribute("aria-label");
		const localization = instance.state["settings"]["localization"];
		const footerPreviousBtn = instance.container.querySelector(
			".bmd-footer .bmd-previous-btn",
		);
		const footerNextBtn = instance.container.querySelector(
			".bmd-footer .bmd-next-btn",
		);
		if (btn === footerPreviousBtn) {
			btn.setAttribute(
				"aria-label",
				getTranslation(localization, "previous-btn"),
			);
		} else if (btn === footerNextBtn) {
			btn.setAttribute("aria-label", getTranslation(localization, "next-btn"));
		}
	};

	/**
	 * Given a slide element, remove all errors (and everything related).
	 *
	 * @param {HTMLElement} slide
	 */
	removeSlideErrors = (slide) => {
		const instance = this;

		// Remove all field errors
		slide.querySelectorAll(".bmd-form-field").forEach((formField) => {
			instance.removeFieldErrors(formField);
		});

		// Remove all slide errors
		slide.querySelectorAll(".bmd-error").forEach((error) => {
			error.remove();
		});

		// Remove WAI-ARIA tag from CTA button
		const ctaBtn =
			slide.querySelector(".bmd-submit-btn") ||
			slide.querySelector(".bmd-next-btn");
		ctaBtn.removeAttribute("aria-describedby");
	};

	/**
	 * Add an error inside the given form field element.
	 *
	 * @param {HTMLElement} formField
	 * @param {string} errorId
	 * @param {string} message
	 */
	addFieldError = (formField, errorId, message) => {
		const instance = this;

		const error = document.createElement("div");
		error.setAttribute("id", errorId);
		error.innerHTML = [
			`<div class="bmd-error">`,
			`	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="bmd-icon bmd-error-icon" aria-hidden="true" focusable="false"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>`,
			`	${message}`,
			`</div>`,
		].join("\n");
		formField.insertAdjacentElement("beforeend", error);
	};

	/**
	 * Given a <form> element, validate and add errors if necessary. By default,
	 * most form fields rely entirely on built-in client-side validation that is
	 * found in browsers.
	 *
	 * @param {HTMLFormElement} form
	 * @returns {boolean} form is valid or not
	 */
	formValid = (form) => {
		const instance = this;

		const localization = instance.state["settings"]["localization"];

		// Remove all form errors (reset)
		instance.removeSlideErrors(form);

		// By default, form is valid
		let isFormValid = true;
		const formFieldsWithError = [];

		// Go through form fields to validate
		// These fields will have a type attribute
		form
			.querySelectorAll(
				'.bmd-form-field[data-bmd-type="radio"][data-bmd-required], .bmd-form-field[data-bmd-type="checkbox"][data-bmd-required], .bmd-form-field[data-bmd-type="num-radio"][data-bmd-required], .bmd-form-field[data-bmd-type="datetime-local"], .bmd-form-field[data-bmd-type="date"], .bmd-form-field[data-bmd-type="time"], .bmd-form-field[data-bmd-type="file"]',
			)
			.forEach((formField) => {
				const name = formField.getAttribute("data-bmd-name");
				const type = formField.getAttribute("data-bmd-type");

				// Required choice fields
				if (type === "radio" || type === "checkbox") {
					const value = instance.getRadioCheckboxValue(
						name,
						"bmd-form-str-check-input",
						type,
					);
					if (value.length === 0) {
						isFormValid = false;
						formFieldsWithError.push(formField);

						// Add error
						const errorId = `${instance.getIdPrefix()}id_${name}-error`;
						instance.addFieldError(
							formField,
							errorId,
							getTranslation(localization, "choice-field-required"),
						);

						// Add WAI-ARIA tags to the inputs
						formField
							.querySelectorAll(".bmd-form-str-check-input")
							.forEach((input) => {
								input.setAttribute("aria-invalid", "true");
								input.setAttribute("aria-describedby", errorId);
							});
					}
				}
				// Required number choice fields
				else if (type === "num-radio") {
					const value = instance.getRadioCheckboxValue(
						name,
						"bmd-form-num-check-input",
						"radio",
					);
					if (value.length === 0) {
						isFormValid = false;
						formFieldsWithError.push(formField);

						// Add error
						const errorId = `${instance.getIdPrefix()}id_${name}-error`;
						instance.addFieldError(
							formField,
							errorId,
							getTranslation(localization, "number-choice-field-required"),
						);

						// Add WAI-ARIA tags to the inputs
						formField
							.querySelectorAll(".bmd-form-num-check-input")
							.forEach((input) => {
								input.setAttribute("aria-invalid", "true");
								instance.setSingleAttribute(input, "aria-describedby", errorId);
							});
					}
				}
				// Datetime fields
				else if (
					type === "datetime-local" ||
					type === "date" ||
					type === "time"
				) {
					const value = formField.querySelector(
						`.bmd-form-datetime-input[name="${name}"]`,
					).value;

					// Set up the pattern and error translation key
					let pattern = /.*/;
					let errorTranslationKey = "";
					if (type === "datetime-local") {
						pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
						errorTranslationKey = "datetime-input-error";
					} else if (type === "date") {
						pattern = /^\d{4}-\d{2}-\d{2}$/;
						errorTranslationKey = "date-input-error";
					} else if (type === "time") {
						pattern = /^\d{2}:\d{2}$/;
						errorTranslationKey = "time-input-error";
					}

					if (value !== "" && !value.match(pattern)) {
						isFormValid = false;
						formFieldsWithError.push(formField);

						// Add error
						const errorId = `${instance.getIdPrefix()}id_${name}-error`;
						instance.addFieldError(
							formField,
							errorId,
							getTranslation(localization, errorTranslationKey),
						);

						// Add WAI-ARIA tags to the input
						formField
							.querySelectorAll(".bmd-form-datetime-input")
							.forEach((input) => {
								input.setAttribute("aria-invalid", "true");
								input.setAttribute("aria-describedby", errorId);
							});
					}
				}
				// File fields
				else if (type === "file") {
					const sizeLimit = Number(
						formField.getAttribute("data-bmd-size-limit"),
					);
					const file = formField.querySelector(".bmd-form-file-input").files[0];
					if (file) {
						const fileSize = (file.size / 1024 / 1024).toFixed(4);
						if (fileSize > sizeLimit) {
							isFormValid = false;
							formFieldsWithError.push(formField);

							// Add error
							const errorId = `${instance.getIdPrefix()}id_${name}-error`;
							instance.addFieldError(
								formField,
								errorId,
								getTranslation(localization, "file-input-size-error"),
							);

							// Add WAI-ARIA tags to the input
							formField
								.querySelectorAll(".bmd-form-file-input")
								.forEach((input) => {
									input.setAttribute("aria-invalid", "true");
									input.setAttribute("aria-describedby", errorId);
								});
						}
					}
				}
			});

		// Focus on the first form field with error
		if (formFieldsWithError.length > 0) {
			const inputToFocus = formFieldsWithError[0].querySelector(
				".bmd-form-str-check-input, .bmd-form-num-check-input, .bmd-form-datetime-input, .bmd-form-file-input",
			);
			if (inputToFocus) inputToFocus.focus();
		}

		return isFormValid;
	};

	/**
	 * When an error occurs during form submission or slide transition, add an
	 * error inside the slide element.
	 *
	 * @param {HTMLElement} slide
	 * @param {HTMLButtonElement} ctaBtn
	 */
	addSlideError = (slide, ctaBtn) => {
		const instance = this;

		const localization = instance.state["settings"]["localization"];
		const error = document.createElement("div");
		const errorId = `${instance.getIdPrefix()}id_slide-${
			instance.state["slideData"]["currentIndex"]
		}-error`;
		error.setAttribute("id", errorId);
		error.innerHTML = [
			`<div class="bmd-error">`,
			`	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="bmd-icon bmd-error-icon" aria-hidden="true" focusable="false"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>`,
			`	${getTranslation(localization, "slide-error")}`,
			`</div>`,
		].join("\n");
		ctaBtn.setAttribute("aria-describedby", errorId);
		slide.insertAdjacentElement("beforeend", error);
	};

	/**
	 * GET data from remote source. A remote source here is anything outside of
	 * the actual template.
	 *
	 * @returns {Promise<string>}
	 */
	getRemoteData = () => {
		const instance = this;

		// If the page is a file, return resolved promise
		// This way, the page can load quickly (useful when drafting)
		if (window.location.protocol === "file:") {
			console.warn("Remote data not loaded: HTML page is a file (CORS issue).");
			return Promise.resolve("").then((result) => {
				return result;
			});
		}

		// GET url not provided in settings (return resolved promise)
		if (instance.state["settings"]["get-url"] === undefined) {
			return Promise.resolve("").then((result) => {
				return result;
			});
		}

		// Fetch data using GET url
		return fetch(instance.state["settings"]["get-url"], {
			method: "GET",
			headers: instance.options["getHeaders"],
		})
			.then((response) => {
				if (response.ok) {
					return response.text();
				} else {
					console.error("Network response not ok.");
					return "";
				}
			})
			.catch((error) => {
				console.error(error);
				return "";
			});
	};

	/**
	 * Convert timezone offset (in minutes) to the +HH:mm or -HH:mm format.
	 *
	 * @param {number} minutes
	 * @returns {String}
	 */
	convertTimezoneOffset = (minutes) => {
		const sign = minutes > 0 ? "-" : "+";
		const absoluteMinutes = Math.abs(minutes);
		const hours = Math.floor(absoluteMinutes / 60);
		const mins = absoluteMinutes % 60;

		// Pad hours and minutes with leading zeros if necessary
		const HH = String(hours).padStart(2, "0");
		const mm = String(mins).padStart(2, "0");

		return `${sign}${HH}:${mm}`;
	};

	/**
	 * POST form data.
	 *
	 * @param {boolean} postCondition
	 * @param {boolean} end
	 * @returns {Promise<boolean>}
	 */
	postFormData = (postCondition, end) => {
		const instance = this;

		// If the post condition is false, return resolved promise
		if (!postCondition) {
			return Promise.resolve(true).then((result) => {
				return result;
			});
		}

		// If the page is a file, return resolved promise
		// This way, the form can continue working (useful when drafting)
		if (window.location.protocol === "file:") {
			console.warn("Form data not sent: HTML page is a file (CORS issue).");
			return Promise.resolve(true).then((result) => {
				return result;
			});
		}

		// POST url not provided in settings (return resolved promise)
		// True is returned with a console warning
		// Again, this way, the form can continue working (useful when drafting)
		if (instance.state["settings"]["post-url"] === undefined) {
			console.warn('Form data not sent: "post-url" setting not found.');
			return Promise.resolve(true).then((result) => {
				return result;
			});
		}

		// Create the form data to send
		const formData = new FormData();

		// Set the POST data from the options
		for (const [key, value] of Object.entries(instance.options["postData"])) {
			formData.append(key, value);
		}

		// Set the form data from the state
		// Make sure to add the user timezone offset to the local datetime inputs
		let timezoneOffset = "";
		try {
			timezoneOffset = instance.convertTimezoneOffset(
				new Date().getTimezoneOffset(),
			);
		} catch (error) {
			console.error(error);
		}
		for (const [key, value] of Object.entries(instance.state["formData"])) {
			if (instance.state["fieldTypes"][key] === "datetime-local") {
				formData.append(key, `${value}${timezoneOffset}`);
			} else {
				formData.append(key, value);
			}
		}

		// Add the password inputs (these are not in the state)
		instance.container
			.querySelectorAll('.bmd-form-password-input[type="password"]')
			.forEach((input) => {
				formData.append(input.getAttribute("name"), input.value);
			});

		// Add the chosen files from the inputs (these are not in the state)
		instance.container
			.querySelectorAll('.bmd-form-file-input[type="file"]')
			.forEach((input) => {
				const name = input.getAttribute("name");
				const file = input.files[0];
				if (file) {
					formData.append(name, file);
				}
			});

		// Set the extra fields
		formData.append("_end", end ? end : "");
		formData.append("_rid", instance.getOrCreateResponseId());
		formData.append(
			"_sheetName",
			instance.state["settings"]["post-sheet-name"] || "",
		);
		formData.append("_submitted", new Date().toUTCString());

		// Send data using POST url
		return fetch(instance.state["settings"]["post-url"], {
			method: "POST",
			headers: instance.options["postHeaders"],
			body: formData,
		})
			.then((response) => {
				if (response.ok) {
					console.log("Form data sent successfully!");
					return true;
				} else {
					console.error("Network response not ok.");
					return false;
				}
			})
			.catch((error) => {
				console.error(error);
				return false;
			});
	};

	/**
	 * Go through each slide (before the current one) to get the previous one to
	 * make active (depending on the jump condition).
	 *
	 * @returns {{slide: HTMLElement, index: number}} the previous slide and its
	 * index
	 */
	getPrevSlide = () => {
		const instance = this;

		const currentIndex = instance.state["slideData"]["currentIndex"];
		const slides = instance.container.querySelectorAll(".bmd-slide");
		let prevSlide = slides[currentIndex];
		let prevSlideIndex = currentIndex;

		// Go through each slide (before the current one)
		for (let i = currentIndex - 1; i >= 0; i--) {
			const slide = slides[i];

			// If jump condition not present, this is the previous slide
			if (!slide.hasAttribute("data-bmd-jump")) {
				prevSlide = slide;
				prevSlideIndex = i;
				break;
			}

			// Use Nunjucks to check jump condition
			nunjucks.configure({ autoescape: false });
			const jumpCondition = nunjucks.renderString(
				`{% if ${slide.getAttribute("data-bmd-jump")} %}true{% endif %}`,
				{
					...instance.state["data"],
					...instance.state["formData"],
				},
			);
			if (jumpCondition === "true") {
				prevSlide = slide;
				prevSlideIndex = i;
				break;
			}
		}

		return {
			slide: prevSlide,
			index: prevSlideIndex,
		};
	};

	/**
	 * Go through each slide (after the current one) to get the next one to make
	 * active (depending on the jump condition).
	 *
	 * @returns {{slide: HTMLElement, index: number}} the next slide and its
	 * index
	 */
	getNextSlide = () => {
		const instance = this;

		const currentIndex = instance.state["slideData"]["currentIndex"];
		const slides = instance.container.querySelectorAll(".bmd-slide");
		let nextSlide = slides[currentIndex];
		let nextSlideIndex = currentIndex;

		// Go through each slide (after the current one)
		for (let i = currentIndex + 1; i < slides.length; i++) {
			const slide = slides[i];

			// If jump condition not present, this is the next slide
			if (!slide.hasAttribute("data-bmd-jump")) {
				nextSlide = slide;
				nextSlideIndex = i;
				break;
			}

			// Use Nunjucks to check jump condition
			nunjucks.configure({ autoescape: false });
			const jumpCondition = nunjucks.renderString(
				`{% if ${slide.getAttribute("data-bmd-jump")} %}true{% endif %}`,
				{
					...instance.state["data"],
					...instance.state["formData"],
				},
			);
			if (jumpCondition === "true") {
				nextSlide = slide;
				nextSlideIndex = i;
				break;
			}
		}

		return {
			slide: nextSlide,
			index: nextSlideIndex,
		};
	};

	/**
	 * Get the CSS slide transition duration (in milliseconds).
	 *
	 * @returns {number}
	 */
	getSlideTransitionDuration = () => {
		const instance = this;

		const rootElem = instance.container.querySelector(".bmd-root");

		// If the duration is saved on the root element, return saved duration
		if (rootElem.hasAttribute("data-bmd-slide-transition-duration")) {
			return Number(
				rootElem.getAttribute("data-bmd-slide-transition-duration"),
			);
		}
		// Otherwise, calculate duration from CSS, save on root element, and return
		else {
			let duration =
				window
					.getComputedStyle(rootElem)
					.getPropertyValue("--bmd-slide-transition-duration") || "200ms";
			duration = Number(duration.slice(0, -2));
			rootElem.setAttribute("data-bmd-slide-transition-duration", duration);
			return duration;
		}
	};

	/**
	 * When a new slide becomes active, do the following: update state, handle
	 * page progress (if applicable), handle the display and state of the footer
	 * slide control buttons, scroll to top and autofocus (if applicable).
	 *
	 * @param {HTMLElement} slide
	 * @param {number} index
	 * @param {boolean} fromInit
	 */
	hasNewActiveSlide = (slide, index, fromInit) => {
		const instance = this;

		// Update state
		instance.state["slideData"]["currentIndex"] = index;

		// Handle page progress (if applicable)
		const pageProgress = instance.container.querySelector(".bmd-page-progress");
		let slidePageProgress;
		if (slide.classList.contains("bmd-first-slide")) {
			slidePageProgress = "0%";
		} else if (slide.classList.contains("bmd-end-slide")) {
			slidePageProgress = "100%";
		} else if (slide.hasAttribute("data-bmd-page-progress")) {
			slidePageProgress = slide.getAttribute("data-bmd-page-progress");
		}
		if (
			pageProgress &&
			slidePageProgress !== undefined &&
			instance.state["settings"]["page-progress"] !== "decorative"
		) {
			const localization = instance.state["settings"]["localization"];
			pageProgress.setAttribute("role", "progressbar");
			pageProgress.setAttribute(
				"aria-label",
				getTranslation(localization, "page-progress"),
			);
			pageProgress.setAttribute("aria-valuemin", "0");
			pageProgress.setAttribute("aria-valuemax", "100");
			pageProgress.setAttribute(
				"aria-valuenow",
				slidePageProgress.replace("%", ""),
			);
			pageProgress
				.querySelector(".bmd-progress-bar")
				.setAttribute("style", `width: ${slidePageProgress}`);
		}

		// The timeout makes sure that the slide animation has completed
		setTimeout(function () {
			// Scroll
			if (instance.options["isFullPage"]) {
				window.scroll({ top: 0 });
			} else {
				instance.container.scroll({ top: 0 });

				// Scroll into view if no part of the container is within the viewport
				const rect = instance.container.getBoundingClientRect();
				if (!fromInit && !(rect.top < window.innerHeight && rect.bottom > 0)) {
					instance.container.scrollIntoView();
				}
			}

			// Handle the display and state of the footer slide control buttons
			const footerBtnGroup = instance.container.querySelector(
				".bmd-footer .bmd-btn-group",
			);
			if (footerBtnGroup) {
				const footerPreviousBtn =
					footerBtnGroup.querySelector(".bmd-previous-btn");
				const footerNextBtn = footerBtnGroup.querySelector(".bmd-next-btn");

				// Reset first
				footerBtnGroup.classList.remove("bmd-d-none");
				footerPreviousBtn.disabled = false;
				footerNextBtn.disabled = false;

				// Disable previous button for first slide
				// Hide both for end slide
				if (slide.classList.contains("bmd-first-slide")) {
					footerPreviousBtn.disabled = true;
				} else if (slide.classList.contains("bmd-end-slide")) {
					footerBtnGroup.classList.add("bmd-d-none");
				}

				// Also disable previous button if slide contains the specific attribute
				if (slide.hasAttribute("data-bmd-disable-prev-btn"))
					footerPreviousBtn.disabled = true;
			}

			// Autofocus (if applicable)
			if (!fromInit || (fromInit && instance.options["isFullPage"])) {
				if (instance.state["settings"]["autofocus"] === "all-slides") {
					const elemToAutofocus = slide.querySelector(
						"input.bmd-form-str-input, textarea.bmd-form-str-input, input.bmd-form-num-input, select.bmd-form-str-select, input.bmd-form-str-check-input, input.bmd-form-num-check-input, input.bmd-form-datetime-input, input.bmd-form-file-input",
					);
					if (elemToAutofocus) elemToAutofocus.focus();
				} else {
					const elemToAutofocus = slide.querySelector("[data-bmd-autofocus]");
					if (elemToAutofocus) elemToAutofocus.focus();
				}
			}
		}, instance.getSlideTransitionDuration() * 2);
	};

	/**
	 * Fade out active slide and fade in next slide. The timeouts make sure that
	 * the animations work properly.
	 *
	 * @param {HTMLElement} activeSlide
	 * @param {HTMLElement} nextSlide
	 */
	fadeInNextSlide = (activeSlide, nextSlide) => {
		const instance = this;

		activeSlide.classList.add("bmd-fade-out-to-top");
		setTimeout(function () {
			activeSlide.classList.remove("bmd-slide-active");
			nextSlide.classList.add("bmd-fade-in-from-bottom");
			nextSlide.classList.add("bmd-slide-active");
			setTimeout(function () {
				nextSlide.classList.remove("bmd-fade-in-from-bottom");
				activeSlide.classList.remove("bmd-fade-out-to-top");
			}, instance.getSlideTransitionDuration());
		}, instance.getSlideTransitionDuration());
	};

	/**
	 * Fade out active slide and fade in previous slide. The timeouts make sure
	 * that the animations work properly.
	 *
	 * @param {HTMLElement} activeSlide
	 * @param {HTMLElement} prevSlide
	 */
	fadeInPrevSlide = (activeSlide, prevSlide) => {
		const instance = this;

		activeSlide.classList.add("bmd-fade-out-to-bottom");
		setTimeout(function () {
			activeSlide.classList.remove("bmd-slide-active");
			prevSlide.classList.add("bmd-fade-in-from-top");
			prevSlide.classList.add("bmd-slide-active");
			setTimeout(function () {
				prevSlide.classList.remove("bmd-fade-in-from-top");
				activeSlide.classList.remove("bmd-fade-out-to-bottom");
			}, instance.getSlideTransitionDuration());
		}, instance.getSlideTransitionDuration());
	};

	/**
	 * Disable all clicks. This is added when the slide transition starts, and
	 * removed after the slide transition has ended (or if there is an error).
	 *
	 * @param {MouseEvent} e
	 */
	disableAllClicks = (e) => {
		e.stopPropagation();
		e.preventDefault();
		return false;
	};

	/**
	 * Go to the next slide.
	 *
	 * @param {HTMLElement} activeSlide
	 */
	nextSlide = (activeSlide) => {
		const instance = this;

		// Disable all clicks on root element
		const rootElem = instance.container.querySelector(".bmd-root");
		rootElem.addEventListener("click", instance.disableAllClicks, true);

		// Set CTA button and footer previous and next buttons to processing
		const ctaBtn =
			activeSlide.querySelector(".bmd-submit-btn") ||
			activeSlide.querySelector(".bmd-next-btn");
		instance.setBtnProcessing(ctaBtn);
		const footerPreviousBtn = instance.container.querySelector(
			".bmd-footer .bmd-previous-btn",
		);
		if (footerPreviousBtn) instance.setBtnProcessing(footerPreviousBtn);
		const footerNextBtn = instance.container.querySelector(
			".bmd-footer .bmd-next-btn",
		);
		if (footerNextBtn) instance.setBtnProcessing(footerNextBtn);

		// Validate form (if active slide is <form> element)
		if (activeSlide.tagName === "FORM") {
			// Form is not valid
			if (!instance.formValid(activeSlide)) {
				// Remove all buttons from their processing states
				instance.container
					.querySelectorAll(".bmd-btn-processing")
					.forEach((btn) => {
						instance.removeBtnProcessing(btn);
					});

				// Enable all clicks on root element
				rootElem.removeEventListener("click", instance.disableAllClicks, true);

				return;
			}
		} else {
			// Remove all slide errors (reset)
			instance.removeSlideErrors(activeSlide);
		}

		// Get the next slide
		// If it is the same as the active slide, add (and show) error
		const nextSlideAndIndex = instance.getNextSlide();
		if (activeSlide === nextSlideAndIndex["slide"]) {
			// Add error
			instance.addSlideError(activeSlide, ctaBtn);

			// Remove all buttons from their processing states
			instance.container
				.querySelectorAll(".bmd-btn-processing")
				.forEach((btn) => {
					instance.removeBtnProcessing(btn);
				});

			// Enable all clicks on root element
			rootElem.removeEventListener("click", instance.disableAllClicks, true);

			return;
		}

		// POST form data
		const postCondition =
			instance.state["settings"]["page"] === "form-slides" &&
			(activeSlide.hasAttribute("data-bmd-post") ||
				nextSlideAndIndex["slide"].classList.contains("bmd-end-slide"))
				? true
				: false;
		instance
			.postFormData(
				postCondition,
				nextSlideAndIndex["slide"].classList.contains("bmd-end-slide"),
			)
			.then((promiseResult) => {
				// Success
				if (promiseResult) {
					// If next slide is the end slide: remove response id, remove form
					// data from local storage, and redirect (if applicable)
					if (nextSlideAndIndex["slide"].classList.contains("bmd-end-slide")) {
						instance.removeResponseId();
						instance.removeSavedFormData();
						const redirect =
							nextSlideAndIndex["slide"].getAttribute("data-bmd-redirect");
						if (redirect) {
							window.location.href = redirect;
							return;
						}
					}

					// Fade in next slide
					instance.fadeInNextSlide(activeSlide, nextSlideAndIndex["slide"]);

					// Handle the new active slide
					instance.hasNewActiveSlide(
						nextSlideAndIndex["slide"],
						nextSlideAndIndex["index"],
						false,
					);
				}
				// Error
				else {
					// Add error
					instance.addSlideError(activeSlide, ctaBtn);
				}

				// Remove all buttons from their processing states
				instance.container
					.querySelectorAll(".bmd-btn-processing")
					.forEach((btn) => {
						instance.removeBtnProcessing(btn);
					});

				// Enable all clicks on root element
				// Timeout makes sure that the slide animation has completed
				setTimeout(function () {
					rootElem.removeEventListener(
						"click",
						instance.disableAllClicks,
						true,
					);
				}, instance.getSlideTransitionDuration() * 3);
			});
	};

	/**
	 * Go to the previous slide.
	 *
	 * @param {HTMLElement} activeSlide
	 */
	prevSlide = (activeSlide) => {
		const instance = this;

		// Disable all clicks on root element
		const rootElem = instance.container.querySelector(".bmd-root");
		rootElem.addEventListener("click", instance.disableAllClicks, true);

		// Set CTA button and footer previous and next buttons to processing
		const ctaBtn =
			activeSlide.querySelector(".bmd-submit-btn") ||
			activeSlide.querySelector(".bmd-next-btn");
		instance.setBtnProcessing(ctaBtn);
		const footerPreviousBtn = instance.container.querySelector(
			".bmd-footer .bmd-previous-btn",
		);
		if (footerPreviousBtn) instance.setBtnProcessing(footerPreviousBtn);
		const footerNextBtn = instance.container.querySelector(
			".bmd-footer .bmd-next-btn",
		);
		if (footerNextBtn) instance.setBtnProcessing(footerNextBtn);

		// Get the previous slide
		// If it is the same as the active slide, log error
		const prevSlideAndIndex = instance.getPrevSlide();
		if (activeSlide === prevSlideAndIndex["slide"]) {
			// Log error
			console.error("Something went wrong. Please try again.");

			// Remove all buttons from their processing states
			instance.container
				.querySelectorAll(".bmd-btn-processing")
				.forEach((btn) => {
					instance.removeBtnProcessing(btn);
				});

			// Enable all clicks on root element
			rootElem.removeEventListener("click", instance.disableAllClicks, true);

			return;
		}

		// Fade in previous slide
		instance.fadeInPrevSlide(activeSlide, prevSlideAndIndex["slide"]);

		// Handle the new active slide
		instance.hasNewActiveSlide(
			prevSlideAndIndex["slide"],
			prevSlideAndIndex["index"],
			false,
		);

		// Remove all buttons from their processing states
		instance.container
			.querySelectorAll(".bmd-btn-processing")
			.forEach((btn) => {
				instance.removeBtnProcessing(btn);
			});

		// Enable all clicks on root element
		// Timeout makes sure that the slide animation has completed
		setTimeout(function () {
			rootElem.removeEventListener("click", instance.disableAllClicks, true);
		}, instance.getSlideTransitionDuration() * 3);
	};

	/**
	 * Copy code to clipboard. The code block (<pre> element) closest to the
	 * copy button is the target.
	 *
	 * @param {MouseEvent} e
	 */
	copyCode = (e) => {
		const instance = this;

		e.preventDefault();
		const copyBtn = e.target;
		const codeBlock = copyBtn.closest(".bmd-code-wrapper").querySelector("pre");

		// Copy code to clipboard
		const range = document.createRange();
		range.selectNode(codeBlock);
		window.getSelection().removeAllRanges();
		window.getSelection().addRange(range);
		document.execCommand("copy");
		window.getSelection().removeAllRanges();

		// Show confirmation
		copyBtn.innerHTML = getTranslation(
			instance.state["settings"]["localization"],
			"copy-btn-success",
		);

		// Hide confirmation after 2 seconds
		setTimeout(function () {
			copyBtn.innerHTML = getTranslation(
				instance.state["settings"]["localization"],
				"copy-btn",
			);
		}, 2000);
	};

	/**
	 * Add all the event listeners.
	 *
	 * @param {HTMLElement} container
	 * @param {boolean} fromInit
	 */
	addEventListeners = (container, fromInit) => {
		const instance = this;

		if (fromInit) {
			// Blur header when scrolling over content
			// This is done only for full page (header is always blurred inline)
			const header = instance.container.querySelector(".bmd-header");
			if (header && instance.options["isFullPage"]) {
				const pageProgress =
					instance.container.querySelector(".bmd-page-progress");
				const pageProgressHeight = pageProgress ? pageProgress.offsetHeight : 0;
				const heightToBlur = (pageProgressHeight + header.offsetHeight) / 3;
				window.addEventListener(
					"scroll",
					function () {
						if (window.scrollY > heightToBlur) {
							header.classList.add("bmd-header-bg-blur");
						} else {
							header.classList.remove("bmd-header-bg-blur");
						}
					},
					false,
				);
			}

			// Toggle color scheme button
			instance.container
				.querySelectorAll(".bmd-toggle-color-scheme-btn")
				.forEach((btn) => {
					btn.addEventListener("click", instance.toggleColorScheme);
				});

			// <form> submit
			instance.container.querySelectorAll("form.bmd-slide").forEach((form) => {
				form.addEventListener("submit", function (e) {
					instance.nextSlide(e.target);
				});
			});

			// Slide next buttons
			instance.container
				.querySelectorAll(".bmd-slide .bmd-next-btn")
				.forEach((btn) => {
					btn.addEventListener("click", function (e) {
						if (!btn.classList.contains("bmd-btn-processing")) {
							const parentSlide = btn.closest(".bmd-slide");
							instance.nextSlide(parentSlide);
						}
					});
				});

			// Footer previous button
			instance.container
				.querySelectorAll(".bmd-footer .bmd-previous-btn")
				.forEach((btn) => {
					btn.addEventListener("click", function (e) {
						if (!btn.classList.contains("bmd-btn-processing")) {
							const activeSlide =
								instance.container.querySelector(".bmd-slide-active");
							instance.prevSlide(activeSlide);
						}
					});
				});

			// Footer next button
			instance.container
				.querySelectorAll(".bmd-footer .bmd-next-btn")
				.forEach((btn) => {
					btn.addEventListener("click", function (e) {
						if (!btn.classList.contains("bmd-btn-processing")) {
							const activeSlide =
								instance.container.querySelector(".bmd-slide-active");
							if (activeSlide.tagName === "FORM") {
								activeSlide.querySelector(".bmd-submit-btn").click();
							} else {
								instance.nextSlide(activeSlide);
							}
						}
					});
				});

			// Restart buttons
			instance.container.querySelectorAll(".bmd-restart-btn").forEach((btn) => {
				btn.addEventListener("click", function (e) {
					if (instance.options["isFullPage"]) {
						window.location.reload();
					} else {
						instance._init(false);
					}
				});
			});
		}

		// Copy buttons
		container.querySelectorAll(".bmd-copy-btn").forEach((btn) => {
			btn.addEventListener("click", instance.copyCode);
		});

		// <input> elements
		container
			.querySelectorAll(
				"input.bmd-form-str-input, input.bmd-form-num-input, input.bmd-form-str-check-input, input.bmd-form-num-check-input, input.bmd-form-datetime-input, input.bmd-form-file-input",
			)
			.forEach((input) => {
				if (
					input.getAttribute("type") === "text" ||
					input.getAttribute("type") === "email" ||
					input.getAttribute("type") === "url" ||
					input.getAttribute("type") === "tel"
				) {
					input.addEventListener("input", instance.textFieldOnInput);
				} else if (input.getAttribute("type") === "number") {
					input.addEventListener("input", instance.numberFieldOnInput);
				} else if (
					input.getAttribute("type") === "radio" ||
					input.getAttribute("type") === "checkbox"
				) {
					if (input.classList.contains("bmd-form-str-check-input")) {
						input.addEventListener("input", instance.choiceFieldOnInput);
					} else if (input.classList.contains("bmd-form-num-check-input")) {
						input.addEventListener("input", instance.numChoiceFieldOnInput);
					}
				} else if (
					input.getAttribute("type") === "datetime-local" ||
					input.getAttribute("type") === "date" ||
					input.getAttribute("type") === "time"
				) {
					input.addEventListener("input", instance.datetimeFieldOnInput);
				} else if (input.getAttribute("type") === "file") {
					input.addEventListener("change", instance.fileFieldOnInput);
				}
			});

		// <textarea> elements
		container
			.querySelectorAll("textarea.bmd-form-str-input")
			.forEach((textarea) => {
				textarea.addEventListener("input", instance.textFieldOnInput);
				textarea.addEventListener("input", instance.setTextareaHeightOnInput);
			});

		// <select> elements
		container
			.querySelectorAll("select.bmd-form-str-select")
			.forEach((select) => {
				select.addEventListener("input", instance.selectFieldOnInput);
			});

		// File input reset buttons
		container.querySelectorAll(".bmd-form-file-reset-btn").forEach((btn) => {
			btn.addEventListener("click", instance.fileInputResetBtnOnClick);
		});
	};

	/**
	 * Initialize settings, set data defined in the template, fetch and set data
	 * from remote source, and create the templates.
	 *
	 * @param {boolean} isFirstInit
	 */
	_init = (isFirstInit) => {
		const instance = this;

		// Set the state to defaults
		instance.setStateToDefaults();

		// Initialize settings
		const parsedTemplateAndSettings = parseSettings(instance._template);
		instance.template = parsedTemplateAndSettings["template"];
		instance.state["settings"] = {
			...instance.state["settings"],
			...parsedTemplateAndSettings["settings"],
		};

		// Add the root and body in case of inline
		if (!instance.options["isFullPage"]) {
			let rootElemClass = "bmd-root bmd-root-inline";
			let rootElemStyle = "";

			// Handle padding inline bottom
			if (instance.options["paddingInlineBottom"] !== null) {
				rootElemClass += " bmd-pb-custom";
				rootElemStyle += ` --bmd-content-padding-bottom-custom: ${instance.options["paddingInlineBottom"]}px;`;
				if (instance.options["paddingInlineBottom"] === 0)
					rootElemClass += " bmd-pb-0";
			}

			// Handle padding inline horizontal
			rootElemClass += " bmd-px-custom";
			rootElemStyle += ` --bmd-content-padding-x-custom: ${instance.options["paddingInlineHorizontal"]}px;`;
			if (instance.options["paddingInlineHorizontal"] === 0)
				rootElemClass += " bmd-px-0";

			// Handle padding inline top
			if (instance.options["paddingInlineTop"] !== null) {
				rootElemClass += " bmd-pt-custom";
				rootElemStyle += ` --bmd-content-padding-top-custom: ${instance.options["paddingInlineTop"]}px;`;
				if (instance.options["paddingInlineTop"] === 0)
					rootElemClass += " bmd-pt-0";
			}

			instance.container.innerHTML = [
				"<div",
				'	spellcheck="false"',
				`	class="${rootElemClass}"`,
				`	style="${rootElemStyle}"`,
				`	data-bmd-color-scheme="${instance.state["settings"]["color-scheme"]}"`,
				`	data-bmd-id="${instance.state["settings"]["id"]}"`,
				">",
				'	<div class="bmd-body">',
				"		<noscript>Please turn on JavaScript to see this page.</noscript>",
				'		<main class="bmd-main">',
				'			<div class="bmd-loader-container">',
				'				<div class="bmd-loader-spinner" role="status" aria-label="Loading"></div>',
				"			</div>",
				"		</main>",
				"	</div>",
				"</div>\n",
			].join("\n");
		}

		// Get or create response id
		if (instance.state["settings"]["page"] === "form-slides")
			instance.getOrCreateResponseId();

		// The following is done only for full page (not inline)
		if (instance.options["isFullPage"]) {
			// Set title and favicon
			if (instance.state["settings"]["title"] !== undefined)
				document.title = instance.state["settings"]["title"];
			if (instance.state["settings"]["favicon"] !== undefined) {
				let faviconLink = document.querySelector('link[rel~="icon"]');
				if (!faviconLink) {
					faviconLink = document.createElement("link");
					faviconLink.rel = "icon";
					document.head.appendChild(faviconLink);
				}
				faviconLink.href = instance.state["settings"]["favicon"];
			}

			// Swap out the main CSS stylesheet in case of RTL
			const mainStylesheetLink = document.querySelector(
				'link[href$="blocksmd.min.css"]',
			);
			if (instance.state["settings"]["dir"] === "rtl" && mainStylesheetLink) {
				mainStylesheetLink.setAttribute(
					"href",
					mainStylesheetLink
						.getAttribute("href")
						.replace("blocksmd.min.css", "blocksmd.rtl.min.css"),
				);
			}
		}

		// Create and add the stylesheet to the <head>
		if (isFirstInit) {
			const stylesheet = document.createElement("style");
			stylesheet.setAttribute("type", "text/css");
			stylesheet.innerText = createStyles(instance.state["settings"]);
			document.head.appendChild(stylesheet);
		}

		// Add setting if browser is Safari
		try {
			if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent))
				instance.state["settings"]["browser"] = "safari";
		} catch (error) {
			console.error(error);
		}

		// Add the necessary attributes from the settings to the root
		const rootElem = instance.container.querySelector(".bmd-root");
		const rootSettingsAttributesMap = {
			"browser": "data-bmd-browser",
			"button-alignment": "data-bmd-button-alignment",
			"dir": "dir",
			"field-size": "data-bmd-field-size",
			"font-size": "data-bmd-font-size",
			"header": "data-bmd-header",
			"headings": "data-bmd-headings",
			"id": "data-bmd-id",
			"label-style": "data-bmd-label-style",
			"localization": "lang",
			"rounded": "data-bmd-rounded",
			"vertical-alignment": "data-bmd-vertical-alignment",
		};
		if (instance.options["setColorSchemeAttrsAgain"]) {
			rootSettingsAttributesMap["color-scheme"] = "data-bmd-color-scheme";
			rootSettingsAttributesMap["color-scheme-scope"] =
				"data-bmd-color-scheme-scope";
			rootSettingsAttributesMap["color-scheme-toggle"] =
				"data-bmd-color-scheme-toggle";
		}
		for (const [key, value] of Object.entries(instance.state["settings"])) {
			if (rootSettingsAttributesMap[key] !== undefined) {
				const attribute = rootSettingsAttributesMap[key];
				rootElem.setAttribute(attribute, value);
			}
		}

		// Set the preferred color scheme
		// This is done here again in case we are re-setting the "color-scheme"
		// attribute to the root
		if (
			instance.options["setColorSchemeAttrsAgain"] &&
			instance.state["settings"]["color-scheme-toggle"] === "show"
		)
			instance.setPreferredColorScheme();

		// Add the made in loader to the DOM body
		const localization = instance.state["settings"]["localization"];
		nunjucks.configure({ autoescape: false });
		instance.container.querySelector(".bmd-body").innerHTML =
			nunjucks.renderString(madeInLoaderTemplate, {
				settings: instance.state["settings"],
				translations: {
					loading: getTranslation(localization, "loading"),
					madeInLoader: getTranslation(localization, "made-in-loader"),
				},
			});

		// Set data defined in the template
		const parsedTemplateAndData = parseDataBlocks(instance.template);
		instance.template = parsedTemplateAndData["template"];
		instance.state["data"] = {
			...instance.state["data"],
			...parsedTemplateAndData["data"],
		};

		// Fetch data from remote source
		// Then set to state and create the templates
		instance.getRemoteData().then((promiseResult) => {
			// Set fetched data to state
			if (promiseResult !== "") {
				// Create variables for settings needed (for better readability)
				const getFormat = instance.state["settings"]["get-format"];
				const getObjectsName = instance.state["settings"]["get-objects-name"];

				// JSON (set response data depending on the format)
				if (getFormat === "json") {
					const promiseResultJSON = JSON.parse(promiseResult);
					if (Array.isArray(promiseResultJSON)) {
						instance.state["data"][getObjectsName] = promiseResultJSON;
					} else {
						instance.state["data"] = {
							...instance.state["data"],
							...promiseResultJSON,
						};
					}
				}
				// CSV or TSV
				else {
					// Delimeter is comma by default (as CSV is the default format)
					let delimeter = ",";
					if (getFormat === "tsv") delimeter = "\t";

					// Parse and set response data
					const parsedSpreadsheetData = parseSpreadsheetData(
						promiseResult,
						delimeter,
					);
					instance.state["data"] = {
						...instance.state["data"],
						...parsedSpreadsheetData["dataSpreadsheet"],
					};
					instance.state["data"][getObjectsName] =
						parsedSpreadsheetData["dataNormalized"];
				}
			}

			// Create the body template and add to the DOM
			// The "header-render" and "footer-render" settings are also set here
			// (in the function being called)
			const bodyTemplateAndSettings = createBodyTemplate(
				instance.state["settings"],
			);
			const bodyTemplate = bodyTemplateAndSettings["template"];
			instance.state["settings"] = bodyTemplateAndSettings["settings"];
			instance.container.querySelector(".bmd-body").innerHTML = bodyTemplate;

			// Hide page progress, header and/or footer (if applicable)
			if (instance.state["settings"]["page-progress"] === "hide")
				rootElem.setAttribute("data-bmd-page-progress", "hide");
			if (!instance.state["settings"]["header-render"])
				rootElem.setAttribute("data-bmd-header", "hide");
			if (!instance.state["settings"]["footer-render"])
				rootElem.setAttribute("data-bmd-footer", "hide");

			// Create the content template and add to the DOM
			const contentTemplateAndBindDivs = createContentTemplate(
				instance.template,
				instance.state["settings"],
				{
					...instance.state["data"],
					...instance.state["formData"],
				},
				instance.options["sanitize"],
			);
			instance.template = contentTemplateAndBindDivs["template"];
			instance.state["bindDivTemplates"] =
				contentTemplateAndBindDivs["bindDivTemplates"];
			instance.container
				.querySelector(".bmd-main-container")
				.insertAdjacentHTML("beforeend", instance.template);

			// Highlight code blocks
			hljs.highlightAll();

			// Add all the event listeners
			instance.addEventListeners(instance.container, true);

			// Set form data to state
			instance.setFormDataToState();

			// Set form data from URL parameters BEFORE local storage
			if (!instance.options["prioritizeURLFormData"])
				try {
					instance.setFormDataFromURL(false);
				} catch (error) {
					console.error(error);
				}

			// Set form data saved in local storage
			if (instance.options["saveState"]) {
				try {
					instance.setSavedFormData();
				} catch (error) {
					console.error(error);
				}
			}

			// Set form data from URL parameters AFTER local storage
			if (instance.options["prioritizeURLFormData"])
				try {
					instance.setFormDataFromURL(true);
				} catch (error) {
					console.error(error);
				}

			// Hide loader and show content
			instance.container
				.querySelector(".bmd-loader-container")
				.classList.add("bmd-d-none");
			if (instance.state["settings"]["page"] !== "single") {
				const firstSlide = instance.container.querySelector(".bmd-slide");
				firstSlide.classList.add("bmd-slide-active");
				instance.hasNewActiveSlide(firstSlide, 0, true);
			} else {
				instance.container
					.querySelector(".bmd-single")
					.classList.add("bmd-single-active");
			}
		});
	};

	/**
	 * Initialize for the first time.
	 */
	init = () => {
		const instance = this;

		instance._init(true);
	};
}

exports.blocksmd = blocksmd;
