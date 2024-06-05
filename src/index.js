/*!
 * blocksmd
 * @author Tahmid Khan Nafee <tahmid.hm.dev@gmail.com>
 * @license BUSL-1.1
 * Copyright (c) 2024 Tahmid Khan Nafee
 */

("use strict");

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
const { v4: uuidv4 } = require("uuid");

// Initialize state and options (overridden in the init function)
var state = {
	bindDivTemplates: {},
	data: {},
	fieldTypes: {},
	formData: {},
	settings: getDefaultSettings(),
	slideData: {
		currentIndex: 0,
	},
};
var options = {
	getHeaders: {},
	postData: {},
	postHeaders: {},
	prioritizeURLFormData: false,
	sanitize: false,
	setColorSchemeAttrsAgain: true,
};

/**
 * Set the preferred color scheme (if one is found in the local storage).
 * Depending on the preference from settings, either the domain-wide or the
 * page-specific value is used.
 */
function setPreferredColorScheme() {
	const rootElem = document.querySelector(".bmd-root");
	const localStorageKey =
		rootElem.getAttribute("data-bmd-color-scheme-scope") === "isolate"
			? `blocksmd:${window.location.hostname}${window.location.pathname}color-scheme`
			: "blocksmd:color-scheme";
	const preferredColorScheme = localStorage.getItem(localStorageKey);
	if (preferredColorScheme)
		rootElem.setAttribute("data-bmd-color-scheme", preferredColorScheme);
}

/**
 * Toggle color scheme. If the preferred color scheme (from settings) is set
 * to "isolate", the preference is saved (and used) only for that page.
 * Otherwise, it is saved (and used) domain-wide.
 *
 * @param {MouseEvent} e
 */
function toggleColorScheme(e) {
	e.preventDefault();
	const rootElem = document.querySelector(".bmd-root");
	const localStorageKey =
		state["settings"]["color-scheme-scope"] === "isolate"
			? `blocksmd:${window.location.hostname}${window.location.pathname}color-scheme`
			: "blocksmd:color-scheme";
	const currentColorScheme = rootElem.getAttribute("data-bmd-color-scheme");
	if (currentColorScheme === "light") {
		rootElem.setAttribute("data-bmd-color-scheme", "dark");
		localStorage.setItem(localStorageKey, "dark");
	} else if (currentColorScheme === "dark") {
		rootElem.setAttribute("data-bmd-color-scheme", "light");
		localStorage.setItem(localStorageKey, "light");
	}
}

/**
 * Get or create response id. This uniquely identifies one single form
 * response. The id is created on page load (unless one already exists), and
 * it is removed when the user reaches the end slide.
 *
 * @returns {string}
 */
function getOrCreateResponseId() {
	const localStorageKey = `blocksmd:${window.location.hostname}${window.location.pathname}response-id`;
	let responseId = localStorage.getItem(localStorageKey);
	if (!responseId) {
		responseId = uuidv4();
		localStorage.setItem(localStorageKey, responseId);
	}
	return responseId;
}

/**
 * Remove response id. This is called when the user reaches the end slide.
 */
function removeResponseId() {
	localStorage.removeItem(
		`blocksmd:${window.location.hostname}${window.location.pathname}response-id`,
	);
}

/**
 * Save form field value in local storage.
 *
 * @param {string} name
 * @param {*} value
 */
function saveFieldValue(name, value) {
	const localStorageKey = `blocksmd:${window.location.hostname}${window.location.pathname}form-data`;
	let savedFormData = localStorage.getItem(localStorageKey) || "{}";
	savedFormData = JSON.parse(savedFormData);
	savedFormData[name] = value;
	localStorage.setItem(localStorageKey, JSON.stringify(savedFormData));
}

/**
 * Remove form data from local storage. This is called when the user reaches
 * the end slide.
 */
function removeSavedFormData() {
	localStorage.removeItem(
		`blocksmd:${window.location.hostname}${window.location.pathname}form-data`,
	);
}

/**
 * Re-render the bind <div> and <span> elements.
 *
 * @param {string} name
 */
function reRenderBindElems(name) {
	// Re-render the bind <div> elements
	document.querySelectorAll(`div[data-bmd-bind-${name}]`).forEach((div) => {
		const template =
			state["bindDivTemplates"][div.getAttribute("data-bmd-bind-template-ref")];
		marked.use({ renderer });
		let parsedTemplate = marked.parse(
			nunjucks.renderString(template, {
				...state["data"],
				...state["formData"],
			}),
		);
		if (options["sanitize"]) {
			const DOMPurify = createDOMPurify(window);
			parsedTemplate = DOMPurify.sanitize(parsedTemplate);
		}
		div.innerHTML = parsedTemplate;

		// Highlight code blocks again
		div.querySelectorAll("pre code").forEach((codeBlock) => {
			hljs.highlightElement(codeBlock);
		});

		// Add event listeners again
		addEventListeners(div);
	});

	// Re-render the bind <span> elements
	document.querySelectorAll(`span[data-bmd-bind-${name}]`).forEach((span) => {
		span.innerHTML = state["formData"][name];
	});
}

/**
 * Get value of a set of radio buttons or checkboxes.
 *
 * @param {string} name
 * @param {"radio"|"checkbox"} type
 * @returns {string|Array.<string>}
 */
function getChoiceFieldValue(name, type) {
	// For radio buttons, the single checked value is returned
	if (type === "radio") {
		let value = "";
		const input = document.querySelector(
			`.bmd-form-check-input[type="radio"][name="${name}"]:checked`,
		);
		if (input) value = input.value;
		return value;
	}
	// For checkboxes, an array of checked values is returned
	else if (type === "checkbox") {
		const value = [];
		document
			.querySelectorAll(
				`.bmd-form-check-input[type="checkbox"][name="${name}"]:checked`,
			)
			.forEach((input) => {
				value.push(input.value);
			});
		return value;
	}
}

/**
 * Set value of a set of radio buttons or checkboxes.
 *
 * @param {string} name
 * @param {"radio"|"checkbox"} type
 * @param {string|Array.<string>} value
 */
function setChoiceFieldValue(name, type, value) {
	// For radio buttons, the value is a single string
	if (type === "radio") {
		value = value.trim();
		const input = document.querySelector(
			`.bmd-form-check-input[type="radio"][name="${name}"][value="${value}"]`,
		);
		if (input) input.checked = true;
	}
	// For checkboxes, the value is an array of strings
	else if (type === "checkbox") {
		const values = {};
		for (const item of value) {
			values[item.trim()] = true;
		}
		document
			.querySelectorAll(
				`.bmd-form-check-input[type="checkbox"][name="${name}"]`,
			)
			.forEach((input) => {
				input.checked = false;
				if (values[input.value]) input.checked = true;
			});
	}
}

/**
 * Set form data to state (value and type). Also re-render the bind <div> and
 * <span> elements.
 */
function setFormDataToState() {
	// Text fields
	document
		.querySelectorAll(
			'input.bmd-form-control[type="text"], input.bmd-form-control[type="email"], input.bmd-form-control[type="url"], input.bmd-form-control[type="tel"], textarea.bmd-form-control',
		)
		.forEach((elem) => {
			let name = elem.getAttribute("name");
			const value = elem.value;
			const type = elem.getAttribute("type") || "text";

			// Issue-fix with DOMPurify (in case of sanitization)
			// https://github.com/cure53/DOMPurify/issues/952
			if (elem.getAttribute("id") === "id_name") {
				elem.setAttribute("name", "name");
				name = "name";
			}

			state["formData"][name] = value;
			state["fieldTypes"][name] = type;
			reRenderBindElems(name);
		});

	// Number fields
	document
		.querySelectorAll('input.bmd-form-control[type="number"]')
		.forEach((elem) => {
			const name = elem.getAttribute("name");
			const value = isNumeric(elem.value) ? Number(elem.value) : null;
			state["formData"][name] = value;
			state["fieldTypes"][name] = "number";
			reRenderBindElems(name);
		});

	// Select fields
	document.querySelectorAll("select.bmd-form-select").forEach((elem) => {
		const name = elem.getAttribute("name");
		const value = elem.value;
		state["formData"][name] = value;
		state["fieldTypes"][name] = "select";
		reRenderBindElems(name);
	});

	// Choice fields
	document
		.querySelectorAll(".bmd-form-check:first-child input.bmd-form-check-input")
		.forEach((elem) => {
			const name = elem.getAttribute("name");
			const type = elem.getAttribute("type");
			const value = getChoiceFieldValue(name, type);
			state["formData"][name] = value;
			state["fieldTypes"][name] = "choice";
			reRenderBindElems(name);
		});
}

/**
 * Set form data from URL parameters: set value in the DOM, update state,
 * conditionally update local storage, and re-render the bind <div> and <span>
 * elements. The local storage is updated if this function is called AFTER
 * setting the saved form data (in local storage).
 *
 * @param {boolean} updateLocalStorage
 */
function setFormDataFromURL(updateLocalStorage) {
	const urlParams = new URLSearchParams(window.location.search);
	for (const urlParam of urlParams) {
		const name = urlParam[0];
		let value = urlParam[1];

		// Text field
		if (
			state["fieldTypes"][name] === "text" ||
			state["fieldTypes"][name] === "email" ||
			state["fieldTypes"][name] === "url" ||
			state["fieldTypes"][name] === "tel"
		) {
			const input = document.querySelector(`.bmd-form-control[name="${name}"]`);
			if (input) {
				input.value = value;
				state["formData"][name] = value;
				if (updateLocalStorage) saveFieldValue(name, value);
				reRenderBindElems(name);
			}
		}

		// Number field
		if (state["fieldTypes"][name] === "number") {
			const input = document.querySelector(`.bmd-form-control[name="${name}"]`);
			if (input && isNumeric(value)) {
				value = Number(value);
				input.value = value;
				state["formData"][name] = value;
				if (updateLocalStorage) saveFieldValue(name, value);
				reRenderBindElems(name);
			}
		}

		// Select field
		if (state["fieldTypes"][name] === "select") {
			const select = document.querySelector(`.bmd-form-select[name="${name}"]`);
			if (select) {
				const options = select.querySelectorAll("option");
				for (const option of options) {
					if (option.getAttribute("value") === value) {
						select.value = value;
						state["formData"][name] = value;
						if (updateLocalStorage) saveFieldValue(name, value);
						reRenderBindElems(name);
						break;
					}
				}
			}
		}

		// Choice field
		if (state["fieldTypes"][name] === "choice") {
			const input = document.querySelector(
				`.bmd-form-check-input[name="${name}"]`,
			);
			if (input) {
				const type = input.getAttribute("type");

				// Set value, for checkbox, convert to array first
				if (type === "checkbox") value = value.split(",");
				setChoiceFieldValue(name, type, value);

				// Get value again, set to state, etc.
				value = getChoiceFieldValue(name, type);
				state["formData"][name] = value;
				if (updateLocalStorage) saveFieldValue(name, value);
				reRenderBindElems(name);
			}
		}
	}
}

/**
 * Set form data saved in local storage: set value in the DOM, update state,
 * and re-render the bind <div> and <span> elements.
 */
function setSavedFormData() {
	const localStorageKey = `blocksmd:${window.location.hostname}${window.location.pathname}form-data`;
	const savedFormData = localStorage.getItem(localStorageKey);
	if (!savedFormData) return;
	for (const [name, value] of Object.entries(JSON.parse(savedFormData))) {
		// Text field
		if (
			state["fieldTypes"][name] === "text" ||
			state["fieldTypes"][name] === "email" ||
			state["fieldTypes"][name] === "url" ||
			state["fieldTypes"][name] === "tel"
		) {
			const input = document.querySelector(`.bmd-form-control[name="${name}"]`);
			if (input) {
				input.value = value;
				state["formData"][name] = value;
				reRenderBindElems(name);
			}
		}

		// Number field
		if (state["fieldTypes"][name] === "number") {
			const input = document.querySelector(`.bmd-form-control[name="${name}"]`);
			if (input) {
				input.value = value;
				state["formData"][name] = value;
				reRenderBindElems(name);
			}
		}

		// Select field
		if (state["fieldTypes"][name] === "select") {
			const select = document.querySelector(`.bmd-form-select[name="${name}"]`);
			if (select) {
				const options = select.querySelectorAll("option");
				for (const option of options) {
					if (option.getAttribute("value") === value) {
						select.value = value;
						state["formData"][name] = value;
						reRenderBindElems(name);
						break;
					}
				}
			}
		}

		// Choice field
		if (state["fieldTypes"][name] === "choice") {
			const input = document.querySelector(
				`.bmd-form-check-input[name="${name}"]`,
			);
			if (input) {
				const type = input.getAttribute("type");
				setChoiceFieldValue(name, type, value);
				state["formData"][name] = getChoiceFieldValue(name, type);
				reRenderBindElems(name);
			}
		}
	}
}

/**
 * Given a form field element, remove all errors (and everything related).
 *
 * @param {HTMLElement} formField
 */
function removeFieldErrors(formField) {
	// Remove all errors
	formField.querySelectorAll(".bmd-error").forEach((error) => {
		error.remove();
	});

	// Form fields with errors will have a type attribute
	const type = formField.getAttribute("data-bmd-type");

	// Choice field
	// Remove WAI-ARIA tags
	if (type === "radio" || type === "checkbox") {
		formField.querySelectorAll(".bmd-form-check-input").forEach((input) => {
			input.removeAttribute("aria-invalid");
			input.removeAttribute("aria-describedby");
		});
	}
}

/**
 * Handle the inputs of text form fields: update value in the state, save
 * value in local storage remove, errors and re-render the bind <div> and
 * <span> elements.
 *
 * @param {InputEvent} e
 */
function textFieldOnInput(e) {
	const name = e.target.getAttribute("name");
	const value = e.target.value;
	state["formData"][name] = value;
	saveFieldValue(name, value);
	removeFieldErrors(e.target.closest(".bmd-form-field"));
	reRenderBindElems(name);
}

/**
 * Handle the inputs of number form fields: update value in the state, save
 * value in local storage remove, errors and re-render the bind <div> and
 * <span> elements.
 *
 * @param {InputEvent} e
 */
function numberFieldOnInput(e) {
	const name = e.target.getAttribute("name");
	const value = isNumeric(e.target.value) ? Number(e.target.value) : null;
	state["formData"][name] = value;
	saveFieldValue(name, value);
	removeFieldErrors(e.target.closest(".bmd-form-field"));
	reRenderBindElems(name);
}

/**
 * Handle the inputs of select form fields: update value in the state, save
 * value in local storage remove, errors and re-render the bind <div> and
 * <span> elements.
 *
 * @param {InputEvent} e
 */
function selectFieldOnInput(e) {
	const name = e.target.getAttribute("name");
	const value = e.target.value;
	state["formData"][name] = value;
	saveFieldValue(name, value);
	removeFieldErrors(e.target.closest(".bmd-form-field"));
	reRenderBindElems(name);
}

/**
 * Handle the inputs of choice form fields: update value in the state, save
 * value in local storage remove, errors and re-render the bind <div> and
 * <span> elements.
 *
 * @param {InputEvent} e
 */
function choiceFieldOnInput(e) {
	const name = e.target.getAttribute("name");
	const type = e.target.getAttribute("type");
	const value = getChoiceFieldValue(name, type);
	state["formData"][name] = value;
	saveFieldValue(name, value);
	removeFieldErrors(e.target.closest(".bmd-form-field"));
	reRenderBindElems(name);
}

/**
 * Set the height of a <textrea> element on input.
 *
 * @param {InputEvent} e
 */
function setTextareaHeightOnInput(e) {
	const textarea = e.target;
	textarea.style.height = "";
	textarea.style.height = textarea.scrollHeight + "px";
}

/**
 * Given a <button> element, set it to the processing state.
 *
 * @param {HTMLButtonElement} btn
 */
function setBtnProcessing(btn) {
	btn.classList.add("bmd-btn-processing");
	const localization = state["settings"]["localization"];
	btn.setAttribute("aria-label", getTranslation(localization, "loading"));
}

/**
 * Given a <button> element, remove its processing state.
 *
 * @param {HTMLButtonElement} btn
 */
function removeBtnProcessing(btn) {
	btn.classList.remove("bmd-btn-processing");
	btn.removeAttribute("aria-label");
	const localization = state["settings"]["localization"];
	const footerPreviousBtn = document.querySelector(
		".bmd-footer .bmd-previous-btn",
	);
	const footerNextBtn = document.querySelector(".bmd-footer .bmd-next-btn");
	if (btn === footerPreviousBtn) {
		btn.setAttribute(
			"aria-label",
			getTranslation(localization, "previous-btn"),
		);
	} else if (btn === footerNextBtn) {
		btn.setAttribute("aria-label", getTranslation(localization, "next-btn"));
	}
}

/**
 * Given a slide element, remove all errors (and everything related).
 *
 * @param {HTMLElement} slide
 */
function removeSlideErrors(slide) {
	// Remove all field errors
	slide.querySelectorAll(".bmd-form-field").forEach((formField) => {
		removeFieldErrors(formField);
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
}

/**
 * Given a <form> element, validate and add errors if necessary. By default,
 * most form fields rely entirely on built-in client-side validation that is
 * found in browsers.
 *
 * @param {HTMLFormElement} form
 * @returns {boolean} form is valid or not
 */
function formValid(form) {
	const localization = state["settings"]["localization"];

	// Remove all form errors (reset)
	removeSlideErrors(form);

	// By default, form is valid
	let isFormValid = true;
	const formFieldsWithError = [];

	// Go through form fields to validate
	// These fields will have a type attribute
	form
		.querySelectorAll(
			'.bmd-form-field[data-bmd-type="radio"][data-bmd-required], .bmd-form-field[data-bmd-type="checkbox"][data-bmd-required]',
		)
		.forEach((formField) => {
			const name = formField.getAttribute("data-bmd-name");
			const type = formField.getAttribute("data-bmd-type");

			// Required choice fields
			if (type === "radio" || type === "checkbox") {
				const value = getChoiceFieldValue(name, type);
				if (value.length === 0) {
					isFormValid = false;
					formFieldsWithError.push(formField);

					// Add error
					const error = document.createElement("div");
					const errorId = `id_${name}-error`;
					error.setAttribute("id", errorId);
					error.innerHTML = [
						`<div class="bmd-error">`,
						`	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="bmd-icon bmd-error-icon" aria-hidden="true" focusable="false"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>`,
						`	${getTranslation(localization, "choice-field-required")}`,
						`</div>`,
					].join("\n");
					formField.insertAdjacentElement("beforeend", error);

					// Add WAI-ARIA tags to the inputs
					formField
						.querySelectorAll(".bmd-form-check-input")
						.forEach((input) => {
							input.setAttribute("aria-invalid", "true");
							input.setAttribute("aria-describedby", errorId);
						});
				}
			}
		});

	// Focus on the first form field with error
	if (formFieldsWithError.length > 0) {
		const inputToFocus = formFieldsWithError[0].querySelector(
			".bmd-form-check-input",
		);
		if (inputToFocus) inputToFocus.focus();
	}

	return isFormValid;
}

/**
 * When an error occurs during form submission or slide transition, add an
 * error inside the slide element.
 *
 * @param {HTMLElement} slide
 * @param {HTMLButtonElement} ctaBtn
 */
function addSlideError(slide, ctaBtn) {
	const localization = state["settings"]["localization"];
	const error = document.createElement("div");
	const errorId = `id_slide-${state["slideData"]["currentIndex"]}-error`;
	error.setAttribute("id", errorId);
	error.innerHTML = [
		`<div class="bmd-error">`,
		`	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="bmd-icon bmd-error-icon" aria-hidden="true" focusable="false"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>`,
		`	${getTranslation(localization, "slide-error")}`,
		`</div>`,
	].join("\n");
	ctaBtn.setAttribute("aria-describedby", errorId);
	slide.insertAdjacentElement("beforeend", error);
}

/**
 * GET data from remote source. A remote source here is anything outside of
 * the actual template.
 *
 * @returns {Promise<string>}
 */
function getRemoteData() {
	// If the page is a file, return resolved promise
	// This way, the page can load quickly (useful when drafting)
	if (window.location.protocol === "file:") {
		console.warn("Remote data not loaded: HTML page is a file (CORS issue).");
		return Promise.resolve("").then((result) => {
			return result;
		});
	}

	// GET url not provided in settings (return resolved promise)
	if (state["settings"]["get-url"] === undefined) {
		return Promise.resolve("").then((result) => {
			return result;
		});
	}

	// Fetch data using GET url
	return fetch(state["settings"]["get-url"], {
		method: "GET",
		headers: options["getHeaders"],
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
}

/**
 * POST form data.
 *
 * @param {boolean} postCondition
 * @param {boolean} end
 * @returns {Promise<boolean>}
 */
function postFormData(postCondition, end) {
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
	if (state["settings"]["post-url"] === undefined) {
		console.warn('Form data not sent: "post-url" setting not found.');
		return Promise.resolve(true).then((result) => {
			return result;
		});
	}

	// Send data using POST url
	return fetch(state["settings"]["post-url"], {
		method: "POST",
		headers: options["postHeaders"],
		body: JSON.stringify({
			...options["postData"],
			...state["formData"],
			...{
				_end: end ? end : "",
				_rid: getOrCreateResponseId(),
				_sheetName: state["settings"]["post-sheet-name"] || "",
				_submitted: new Date().toUTCString(),
			},
		}),
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
}

/**
 * Go through each slide (before the current one) to get the previous one to
 * make active (depending on the jump condition).
 *
 * @returns {{slide: HTMLElement, index: number}} the previous slide and its
 * index
 */
function getPrevSlide() {
	const currentIndex = state["slideData"]["currentIndex"];
	const slides = document.querySelectorAll(".bmd-slide");
	let prevSlide = slides[currentIndex];
	let prevSlideIndex = currentIndex;

	// Go through each slide (before the current one)
	for (let i = currentIndex - 1; i >= 0; i--) {
		const slide = slides[i];

		// If jump condition not present, this is automatically the previous slide
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
				...state["data"],
				...state["formData"],
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
}

/**
 * Go through each slide (after the current one) to get the next one to make
 * active (depending on the jump condition).
 *
 * @returns {{slide: HTMLElement, index: number}} the next slide and its index
 */
function getNextSlide() {
	const currentIndex = state["slideData"]["currentIndex"];
	const slides = document.querySelectorAll(".bmd-slide");
	let nextSlide = slides[currentIndex];
	let nextSlideIndex = currentIndex;

	// Go through each slide (after the current one)
	for (let i = currentIndex + 1; i < slides.length; i++) {
		const slide = slides[i];

		// If jump condition not present, this is automatically the next slide
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
				...state["data"],
				...state["formData"],
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
}

/**
 * Get the CSS slide transition duration (in milliseconds).
 *
 * @returns {number}
 */
function getSlideTransitionDuration() {
	const rootElem = document.querySelector(".bmd-root");

	// If the duration is saved on the root element, return saved duration
	if (rootElem.hasAttribute("data-bmd-slide-transition-duration")) {
		return Number(rootElem.getAttribute("data-bmd-slide-transition-duration"));
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
}

/**
 * When a new slide becomes active, do the following: update state, handle
 * page progress (if applicable), handle the display and state of the footer
 * slide control buttons, scroll to top and autofocus (if applicable).
 *
 * @param {HTMLElement} slide
 * @param {number} index
 */
function hasNewActiveSlide(slide, index) {
	// Update state
	state["slideData"]["currentIndex"] = index;

	// Handle page progress (if applicable)
	const pageProgress = document.querySelector(".bmd-page-progress");
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
		state["settings"]["page-progress"] !== "decorative"
	) {
		const localization = state["settings"]["localization"];
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

	// Handle the display and state of the footer slide control buttons
	const footerBtnGroup = document.querySelector(".bmd-footer .bmd-btn-group");
	if (footerBtnGroup) {
		const footerPreviousBtn = footerBtnGroup.querySelector(".bmd-previous-btn");
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

	// The timeout makes sure that the slide animation has completed
	setTimeout(function () {
		// Scroll to top
		window.scrollTo({ top: 0 });

		// Autofocus (if applicable)
		if (state["settings"]["autofocus"] === "all-slides") {
			const elemToAutofocus = slide.querySelector(
				"input.bmd-form-control, textarea.bmd-form-control, select.bmd-form-select, input.bmd-form-check-input",
			);
			if (elemToAutofocus) elemToAutofocus.focus();
		} else {
			const elemToAutofocus = slide.querySelector("[data-bmd-autofocus]");
			if (elemToAutofocus) elemToAutofocus.focus();
		}
	}, getSlideTransitionDuration() * 2);
}

/**
 * Fade out active slide and fade in next slide. The timeouts make sure that
 * the animations work properly.
 *
 * @param {HTMLElement} activeSlide
 * @param {HTMLElement} nextSlide
 */
function fadeInNextSlide(activeSlide, nextSlide) {
	activeSlide.classList.add("bmd-fade-out-to-top");
	setTimeout(function () {
		activeSlide.classList.remove("bmd-slide-active");
		nextSlide.classList.add("bmd-fade-in-from-bottom");
		nextSlide.classList.add("bmd-slide-active");
		setTimeout(function () {
			nextSlide.classList.remove("bmd-fade-in-from-bottom");
			activeSlide.classList.remove("bmd-fade-out-to-top");
		}, getSlideTransitionDuration());
	}, getSlideTransitionDuration());
}

/**
 * Fade out active slide and fade in previous slide. The timeouts make sure
 * that the animations work properly.
 *
 * @param {HTMLElement} activeSlide
 * @param {HTMLElement} prevSlide
 */
function fadeInPrevSlide(activeSlide, prevSlide) {
	activeSlide.classList.add("bmd-fade-out-to-bottom");
	setTimeout(function () {
		activeSlide.classList.remove("bmd-slide-active");
		prevSlide.classList.add("bmd-fade-in-from-top");
		prevSlide.classList.add("bmd-slide-active");
		setTimeout(function () {
			prevSlide.classList.remove("bmd-fade-in-from-top");
			activeSlide.classList.remove("bmd-fade-out-to-bottom");
		}, getSlideTransitionDuration());
	}, getSlideTransitionDuration());
}

/**
 * Disable all clicks. This is added when the slide transition starts, and
 * removed after the slide transition has ended (or if there is an error).
 *
 * @param {MouseEvent} e
 */
function disableAllClicks(e) {
	e.stopPropagation();
	e.preventDefault();
	return false;
}

/**
 * Go to the next slide.
 *
 * @param {HTMLElement} activeSlide
 */
function nextSlide(activeSlide) {
	// Disable all clicks on root element
	const rootElem = document.querySelector(".bmd-root");
	rootElem.addEventListener("click", disableAllClicks, true);

	// Set CTA button and footer previous and next buttons to processing
	const ctaBtn =
		activeSlide.querySelector(".bmd-submit-btn") ||
		activeSlide.querySelector(".bmd-next-btn");
	setBtnProcessing(ctaBtn);
	const footerPreviousBtn = document.querySelector(
		".bmd-footer .bmd-previous-btn",
	);
	if (footerPreviousBtn) setBtnProcessing(footerPreviousBtn);
	const footerNextBtn = document.querySelector(".bmd-footer .bmd-next-btn");
	if (footerNextBtn) setBtnProcessing(footerNextBtn);

	// Validate form (if active slide is <form> element)
	if (activeSlide.tagName === "FORM") {
		// Form is not valid
		if (!formValid(activeSlide)) {
			// Remove all buttons from their processing states
			document.querySelectorAll(".bmd-btn-processing").forEach((btn) => {
				removeBtnProcessing(btn);
			});

			// Enable all clicks on root element
			rootElem.removeEventListener("click", disableAllClicks, true);

			return;
		}
	} else {
		// Remove all slide errors (reset)
		removeSlideErrors(activeSlide);
	}

	// Get the next slide
	// If it is the same as the active slide, add (and show) error
	const nextSlideAndIndex = getNextSlide();
	if (activeSlide === nextSlideAndIndex["slide"]) {
		// Add error
		addSlideError(activeSlide, nextBtn);

		// Remove all buttons from their processing states
		document.querySelectorAll(".bmd-btn-processing").forEach((btn) => {
			removeBtnProcessing(btn);
		});

		// Enable all clicks on root element
		rootElem.removeEventListener("click", disableAllClicks, true);

		return;
	}

	// POST form data
	const postCondition =
		state["settings"]["page"] === "form-slides" &&
		(activeSlide.hasAttribute("data-bmd-post") ||
			nextSlideAndIndex["slide"].classList.contains("bmd-end-slide"))
			? true
			: false;
	postFormData(
		postCondition,
		nextSlideAndIndex["slide"].classList.contains("bmd-end-slide"),
	).then((promiseResult) => {
		// Success
		if (promiseResult) {
			// If next slide is the end slide: remove response id, remove form data
			// from local storage, and redirect (if applicable)
			if (nextSlideAndIndex["slide"].classList.contains("bmd-end-slide")) {
				removeResponseId();
				removeSavedFormData();
				const redirect =
					nextSlideAndIndex["slide"].getAttribute("data-bmd-redirect");
				if (redirect) {
					window.location.href = redirect;
					return;
				}
			}

			// Fade in next slide
			fadeInNextSlide(activeSlide, nextSlideAndIndex["slide"]);

			// Handle the new active slide
			hasNewActiveSlide(nextSlideAndIndex["slide"], nextSlideAndIndex["index"]);
		}
		// Error
		else {
			// Add error
			addSlideError(activeSlide, ctaBtn);
		}

		// Remove all buttons from their processing states
		document.querySelectorAll(".bmd-btn-processing").forEach((btn) => {
			removeBtnProcessing(btn);
		});

		// Enable all clicks on root element
		// Timeout makes sure that the slide animation has completed
		setTimeout(function () {
			rootElem.removeEventListener("click", disableAllClicks, true);
		}, getSlideTransitionDuration() * 3);
	});
}

/**
 * Go to the previous slide.
 *
 * @param {HTMLElement} activeSlide
 */
function prevSlide(activeSlide) {
	// Disable all clicks on root element
	const rootElem = document.querySelector(".bmd-root");
	rootElem.addEventListener("click", disableAllClicks, true);

	// Set CTA button and footer previous and next buttons to processing
	const ctaBtn =
		activeSlide.querySelector(".bmd-submit-btn") ||
		activeSlide.querySelector(".bmd-next-btn");
	setBtnProcessing(ctaBtn);
	const footerPreviousBtn = document.querySelector(
		".bmd-footer .bmd-previous-btn",
	);
	if (footerPreviousBtn) setBtnProcessing(footerPreviousBtn);
	const footerNextBtn = document.querySelector(".bmd-footer .bmd-next-btn");
	if (footerNextBtn) setBtnProcessing(footerNextBtn);

	// Get the previous slide
	// If it is the same as the active slide, log error
	const prevSlideAndIndex = getPrevSlide();
	if (activeSlide === prevSlideAndIndex["slide"]) {
		// Log error
		console.error("Something went wrong. Please try again.");

		// Remove all buttons from their processing states
		document.querySelectorAll(".bmd-btn-processing").forEach((btn) => {
			removeBtnProcessing(btn);
		});

		// Enable all clicks on root element
		rootElem.removeEventListener("click", disableAllClicks, true);

		return;
	}

	// Fade in previous slide
	fadeInPrevSlide(activeSlide, prevSlideAndIndex["slide"]);

	// Handle the new active slide
	hasNewActiveSlide(prevSlideAndIndex["slide"], prevSlideAndIndex["index"]);

	// Remove all buttons from their processing states
	document.querySelectorAll(".bmd-btn-processing").forEach((btn) => {
		removeBtnProcessing(btn);
	});

	// Enable all clicks on root element
	// Timeout makes sure that the slide animation has completed
	setTimeout(function () {
		rootElem.removeEventListener("click", disableAllClicks, true);
	}, getSlideTransitionDuration() * 3);
}

/**
 * Copy code to clipboard. The code block (<pre> element) closest to the copy
 * button is the target.
 *
 * @param {MouseEvent} e
 */
function copyCode(e) {
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
		state["settings"]["localization"],
		"copy-btn-success",
	);

	// Hide confirmation after 2 seconds
	setTimeout(function () {
		copyBtn.innerHTML = getTranslation(
			state["settings"]["localization"],
			"copy-btn",
		);
	}, 2000);
}

/**
 * Add all the event listeners.
 *
 * @param {HTMLElement} container
 */
function addEventListeners(container) {
	if (container === document) {
		// Blur header when scrolling over content
		const header = document.querySelector(".bmd-header");
		if (header) {
			const pageProgress = document.querySelector(".bmd-page-progress");
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
		document.querySelectorAll(".bmd-toggle-color-scheme-btn").forEach((btn) => {
			btn.addEventListener("click", toggleColorScheme);
		});

		// <form> submit
		document.querySelectorAll("form.bmd-slide").forEach((form) => {
			form.addEventListener("submit", function (e) {
				nextSlide(e.target);
			});
		});

		// Slide next buttons
		document.querySelectorAll(".bmd-slide .bmd-next-btn").forEach((btn) => {
			btn.addEventListener("click", function (e) {
				if (!btn.classList.contains("bmd-btn-processing")) {
					const parentSlide = btn.closest(".bmd-slide");
					nextSlide(parentSlide);
				}
			});
		});

		// Footer previous button
		document
			.querySelectorAll(".bmd-footer .bmd-previous-btn")
			.forEach((btn) => {
				btn.addEventListener("click", function (e) {
					if (!btn.classList.contains("bmd-btn-processing")) {
						const activeSlide = document.querySelector(".bmd-slide-active");
						prevSlide(activeSlide);
					}
				});
			});

		// Footer next button
		document.querySelectorAll(".bmd-footer .bmd-next-btn").forEach((btn) => {
			btn.addEventListener("click", function (e) {
				if (!btn.classList.contains("bmd-btn-processing")) {
					const activeSlide = document.querySelector(".bmd-slide-active");
					if (activeSlide.tagName === "FORM") {
						activeSlide.querySelector(".bmd-submit-btn").click();
					} else {
						nextSlide(activeSlide);
					}
				}
			});
		});

		// Restart buttons
		document.querySelectorAll(".bmd-restart-btn").forEach((btn) => {
			btn.addEventListener("click", function (e) {
				window.location.reload();
			});
		});
	}

	// Copy buttons
	container.querySelectorAll(".bmd-copy-btn").forEach((btn) => {
		btn.addEventListener("click", copyCode);
	});

	// <input> elements
	container
		.querySelectorAll("input.bmd-form-control, input.bmd-form-check-input")
		.forEach((input) => {
			if (
				input.getAttribute("type") === "text" ||
				input.getAttribute("type") === "email" ||
				input.getAttribute("type") === "url" ||
				input.getAttribute("type") === "tel"
			) {
				input.addEventListener("input", textFieldOnInput);
			} else if (input.getAttribute("type") === "number") {
				input.addEventListener("input", numberFieldOnInput);
			} else if (
				input.getAttribute("type") === "radio" ||
				input.getAttribute("type") === "checkbox"
			) {
				input.addEventListener("input", choiceFieldOnInput);
			}
		});

	// <textarea> elements
	container
		.querySelectorAll("textarea.bmd-form-control")
		.forEach((textarea) => {
			textarea.addEventListener("input", textFieldOnInput);
			textarea.addEventListener("input", setTextareaHeightOnInput);
		});

	// <select> elements
	container.querySelectorAll("select.bmd-form-select").forEach((select) => {
		select.addEventListener("input", selectFieldOnInput);
	});
}

/**
 * Initialize settings, set data defined in the template, fetch and set data
 * from remote source, and create the templates.
 *
 * @param {string} template
 * @param {{getHeaders: Object, postHeaders: Object, sanitize: boolean}} opts
 */
function init(template, opts) {
	// Ping the server
	if (window.location.protocol !== "file:")
		fetch("https://ping.blocks.md", { method: "GET" });

	// Set the options for use
	if (opts) {
		// GET headers
		if (
			opts["getHeaders"] !== undefined &&
			typeof opts["getHeaders"] === "object"
		) {
			options["getHeaders"] = {
				...options["getHeaders"],
				...opts["getHeaders"],
			};
		}
		// POST data
		if (
			opts["postData"] !== undefined &&
			typeof opts["postData"] === "object"
		) {
			options["postData"] = {
				...options["postData"],
				...opts["postData"],
			};
		}
		// POST headers
		if (
			opts["postHeaders"] !== undefined &&
			typeof opts["postHeaders"] === "object"
		) {
			options["postHeaders"] = {
				...options["postHeaders"],
				...opts["postHeaders"],
			};
		}
		// Prioritize form data from URLs
		if (
			opts["prioritizeURLFormData"] !== undefined &&
			typeof opts["prioritizeURLFormData"] === "boolean"
		)
			options["prioritizeURLFormData"] = opts["prioritizeURLFormData"];
		// Sanitize
		if (opts["sanitize"] !== undefined && typeof opts["sanitize"] === "boolean")
			options["sanitize"] = opts["sanitize"];
		// Set color scheme attributes again
		if (
			opts["setColorSchemeAttrsAgain"] !== undefined &&
			typeof opts["setColorSchemeAttrsAgain"] === "boolean"
		)
			options["setColorSchemeAttrsAgain"] = opts["setColorSchemeAttrsAgain"];
	}

	// Initialize settings
	// Also save the settings required for the Marked renderer in local storage
	const parsedTemplateAndSettings = parseSettings(template);
	template = parsedTemplateAndSettings["template"];
	state["settings"] = {
		...state["settings"],
		...parsedTemplateAndSettings["settings"],
	};
	localStorage.setItem(
		`blocksmd:${window.location.hostname}${window.location.pathname}marked-settings`,
		JSON.stringify({
			"css-prefix": state["settings"]["css-prefix"],
			"form-delimiter": state["settings"]["form-delimiter"],
			"localization": state["settings"]["localization"],
		}),
	);

	// Get or create response id
	if (state["settings"]["page"] === "form-slides") getOrCreateResponseId();

	// Set title and favicon
	if (state["settings"]["title"] !== undefined)
		document.title = state["settings"]["title"];
	if (state["settings"]["favicon"] !== undefined) {
		let faviconLink = document.querySelector('link[rel~="icon"]');
		if (!faviconLink) {
			faviconLink = document.createElement("link");
			faviconLink.rel = "icon";
			document.head.appendChild(faviconLink);
		}
		faviconLink.href = state["settings"]["favicon"];
	}

	// Create and add the stylesheet to the <head>
	const stylesheet = document.createElement("style");
	stylesheet.setAttribute("type", "text/css");
	stylesheet.innerText = createStyles(state["settings"]);
	document.head.appendChild(stylesheet);

	// Swap out the main CSS stylesheet in case of RTL
	const mainStylesheetLink = document.querySelector(
		'link[href$="blocksmd.min.css"]',
	);
	if (state["settings"]["dir"] === "rtl" && mainStylesheetLink) {
		mainStylesheetLink.setAttribute(
			"href",
			mainStylesheetLink
				.getAttribute("href")
				.replace("blocksmd.min.css", "blocksmd.rtl.min.css"),
		);
	}

	// Add the necessary attributes from the settings to the root
	const rootElem = document.querySelector(".bmd-root");
	const rootSettingsAttributesMap = {
		"dir": "dir",
		"field-size": "data-bmd-field-size",
		"font-size": "data-bmd-font-size",
		"header": "data-bmd-header",
		"headings": "data-bmd-headings",
		"lang": "lang",
		"rounded": "data-bmd-rounded",
	};
	if (options["setColorSchemeAttrsAgain"]) {
		rootSettingsAttributesMap["color-scheme"] = "data-bmd-color-scheme";
		rootSettingsAttributesMap["color-scheme-scope"] =
			"data-bmd-color-scheme-scope";
		rootSettingsAttributesMap["color-scheme-toggle"] =
			"data-bmd-color-scheme-toggle";
	}
	for (const [key, value] of Object.entries(state["settings"])) {
		if (rootSettingsAttributesMap[key] !== undefined) {
			const attribute = rootSettingsAttributesMap[key];
			rootElem.setAttribute(attribute, value);
		}
	}

	// Set the preferred color scheme
	// This is done here again in case we are re-setting the "color-scheme"
	// attribute to the root
	if (
		options["setColorSchemeAttrsAgain"] &&
		state["settings"]["color-scheme-toggle"] === "show"
	)
		setPreferredColorScheme();

	// Add the made in loader to the DOM body
	const localization = state["settings"]["localization"];
	nunjucks.configure({ autoescape: false });
	document.querySelector(".bmd-body").innerHTML = nunjucks.renderString(
		madeInLoaderTemplate,
		{
			settings: state["settings"],
			translations: {
				loading: getTranslation(localization, "loading"),
				madeInLoader: getTranslation(localization, "made-in-loader"),
			},
		},
	);

	// Set data defined in the template
	const parsedTemplateAndData = parseDataBlocks(template);
	template = parsedTemplateAndData["template"];
	state["data"] = { ...state["data"], ...parsedTemplateAndData["data"] };

	// Fetch data from remote source
	// Then set to state and create the templates
	getRemoteData().then((promiseResult) => {
		// Set fetched data to state
		if (promiseResult !== "") {
			// Create variables for settings needed (for better readability)
			const getFormat = state["settings"]["get-format"];
			const getObjectsName = state["settings"]["get-objects-name"];

			// JSON (set response data depending on the format)
			if (getFormat === "json") {
				const promiseResultJSON = JSON.parse(promiseResult);
				if (Array.isArray(promiseResultJSON)) {
					state["data"][getObjectsName] = promiseResultJSON;
				} else {
					state["data"] = { ...state["data"], ...promiseResultJSON };
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
				state["data"] = {
					...state["data"],
					...parsedSpreadsheetData["dataSpreadsheet"],
				};
				state["data"][getObjectsName] = parsedSpreadsheetData["dataNormalized"];
			}
		}

		// Create the body template and add to the DOM
		// The "header-render" and "footer-render" settings are also set here (in
		// the function being called)
		const bodyTemplateAndSettings = createBodyTemplate(state["settings"]);
		const bodyTemplate = bodyTemplateAndSettings["template"];
		state["settings"] = bodyTemplateAndSettings["settings"];
		document.querySelector(".bmd-body").innerHTML = bodyTemplate;

		// Hide page progress, header and/or footer (if applicable)
		if (state["settings"]["page-progress"] === "hide")
			rootElem.setAttribute("data-bmd-page-progress", "hide");
		if (!state["settings"]["header-render"])
			rootElem.setAttribute("data-bmd-header", "hide");
		if (!state["settings"]["footer-render"])
			rootElem.setAttribute("data-bmd-footer", "hide");

		// Create the content template and add to the DOM
		const contentTemplateAndBindDivs = createContentTemplate(
			template,
			state["settings"],
			{
				...state["data"],
				...state["formData"],
			},
			options["sanitize"],
		);
		template = contentTemplateAndBindDivs["template"];
		state["bindDivTemplates"] = contentTemplateAndBindDivs["bindDivTemplates"];
		document
			.querySelector(".bmd-main-container")
			.insertAdjacentHTML("beforeend", template);

		// Highlight code blocks
		hljs.highlightAll();

		// Add all the event listeners
		addEventListeners(document);

		// Set form data to state
		setFormDataToState();

		// Set form data from URL parameters BEFORE local storage
		if (!options["prioritizeURLFormData"]) setFormDataFromURL(false);

		// Set form data saved in local storage
		setSavedFormData();

		// Set form data from URL parameters AFTER local storage
		if (options["prioritizeURLFormData"]) setFormDataFromURL(true);

		// Hide loader and show content
		document.querySelector(".bmd-loader-container").classList.add("bmd-d-none");
		if (state["settings"]["page"] !== "single") {
			const firstSlide = document.querySelector(".bmd-slide");
			firstSlide.classList.add("bmd-slide-active");
			hasNewActiveSlide(firstSlide, 0);
		} else {
			document.querySelector(".bmd-single").classList.add("bmd-single-active");
		}
	});
}

exports.blocksmd = {
	init: init,
	options: options,
	setPreferredColorScheme: setPreferredColorScheme,
	state: state,
};
