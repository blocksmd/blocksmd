export class blocksmd {
	/**
	 * Create an instance of the class.
	 *
	 * @param {string} template
	 * @param {Document|HTMLElement} container
	 * @param {{
	 *   colorScheme?: "light" | "dark",
	 *   getHeaders?: Object,
	 *   id?: string,
	 *   isFullPage?: boolean,
	 *   paddingInline?: number,
	 *   postData?: Object,
	 *   postHeaders?: Object,
	 *   prioritizeURLFormData?: boolean,
	 *   removePaddingInline?: boolean,
	 *   sanitize?: boolean,
	 *   setColorSchemeAttrsAgain?: boolean,
	 *   themeDark?: {
	 *     accent?: string,
	 *     accentForeground?: string,
	 *     backgroundColor?: string,
	 *     color?: string
	 *   },
	 *   themeLight?: {
	 *     accent?: string,
	 *     accentForeground?: string,
	 *     backgroundColor?: string,
	 *     color?: string
	 *   }
	 * }} [options]
	 */
	constructor(
		template: string,
		container: Document | HTMLElement,
		options?: {
			colorScheme?: "light" | "dark";
			getHeaders?: any;
			id?: string;
			isFullPage?: boolean;
			paddingInline?: number;
			postData?: any;
			postHeaders?: any;
			prioritizeURLFormData?: boolean;
			removePaddingInline?: boolean;
			sanitize?: boolean;
			setColorSchemeAttrsAgain?: boolean;
			themeDark?: {
				accent?: string;
				accentForeground?: string;
				backgroundColor?: string;
				color?: string;
			};
			themeLight?: {
				accent?: string;
				accentForeground?: string;
				backgroundColor?: string;
				color?: string;
			};
		},
	);
	options: {
		colorScheme: string;
		getHeaders: {};
		id: string;
		isFullPage: boolean;
		paddingInline: any;
		postData: {};
		postHeaders: {};
		prioritizeURLFormData: boolean;
		removePaddingInline: boolean;
		sanitize: boolean;
		setColorSchemeAttrsAgain: boolean;
		themeDark: {
			accent: string;
			accentForeground: string;
			backgroundColor: string;
			color: string;
		};
		themeLight: {
			accent: string;
			accentForeground: string;
			backgroundColor: string;
			color: string;
		};
	};
	container: Document | HTMLElement;
	_template: string;
	/**
	 * Set the state to defaults.
	 */
	setStateToDefaults: () => void;
	state: {
		bindDivTemplates: {};
		data: {};
		fieldTypes: {};
		formData: {};
		settings: any;
		slideData: {
			currentIndex: number;
		};
	};
	/**
	 * Add a single attribute value to an HTML element.
	 *
	 * @param {HTMLElement} elem
	 * @param {string} name
	 * @param {string} value
	 */
	setSingleAttribute: (elem: HTMLElement, name: string, value: string) => void;
	/**
	 * Remove a single attribute value from an HTML element.
	 *
	 * @param {HTMLElement} elem
	 * @param {string} name
	 * @param {string} value
	 */
	removeSingleAttribute: (
		elem: HTMLElement,
		name: string,
		value: string,
	) => void;
	/**
	 * Get the prefix for the page/form id.
	 *
	 * @returns {string}
	 */
	getIdPrefix: () => string;
	/**
	 * Set the preferred color scheme (if one is found in the local storage).
	 * Depending on the preference from settings, either the domain-wide or the
	 * page-specific value is used.
	 */
	setPreferredColorScheme: () => void;
	/**
	 * Toggle color scheme. If the preferred color scheme (from settings) is set
	 * to "isolate", the preference is saved (and used) only for that page.
	 * Otherwise, it is saved (and used) domain-wide.
	 *
	 * @param {MouseEvent} e
	 */
	toggleColorScheme: (e: MouseEvent) => void;
	/**
	 * Get or create response id. This uniquely identifies one single form
	 * response. The id is created on initialization (unless one already
	 * exists), and it is removed when the user reaches the end slide.
	 *
	 * @returns {string}
	 */
	getOrCreateResponseId: () => string;
	/**
	 * Remove response id. This is called when the user reaches the end slide.
	 */
	removeResponseId: () => void;
	/**
	 * Save form field value in local storage.
	 *
	 * @param {string} name
	 * @param {*} value
	 */
	saveFieldValue: (name: string, value: any) => void;
	/**
	 * Remove form data from local storage. This is called when the user reaches
	 * the end slide.
	 */
	removeSavedFormData: () => void;
	/**
	 * Re-render the bind <div> and <span> elements.
	 *
	 * @param {string} name
	 */
	reRenderBindElems: (name: string) => void;
	/**
	 * Get value of a set of radio buttons or checkboxes.
	 *
	 * @param {string} name
	 * @param {string} inputClass
	 * @param {"radio"|"checkbox"} type
	 * @returns {string|Array.<string>}
	 */
	getRadioCheckboxValue: (
		name: string,
		inputClass: string,
		type: "radio" | "checkbox",
	) => string | Array<string>;
	/**
	 * Set value of a set of radio buttons or checkboxes.
	 *
	 * @param {string} name
	 * @param {string} inputClass
	 * @param {"radio"|"checkbox"} type
	 * @param {string|Array.<string>} value
	 */
	setRadioCheckboxValue: (
		name: string,
		inputClass: string,
		type: "radio" | "checkbox",
		value: string | Array<string>,
	) => void;
	/**
	 * Given a country calling code <select>, update placeholder of the
	 * corresponding telephone input using the selected <option>.
	 *
	 * @param {HTMLSelectElement} countryCodeSelect
	 */
	setTelInputPlaceholder: (countryCodeSelect: HTMLSelectElement) => void;
	/**
	 * Set form data to state (value and type). Also re-render the bind <div>
	 * and <span> elements.
	 */
	setFormDataToState: () => void;
	/**
	 * Set form data from URL parameters: set value in the DOM, update state,
	 * conditionally update local storage, and re-render the bind <div> and
	 * <span> elements. The local storage is updated if this function is called
	 * AFTER setting the saved form data (in local storage).
	 *
	 * @param {boolean} updateLocalStorage
	 */
	setFormDataFromURL: (updateLocalStorage: boolean) => void;
	/**
	 * Set form data saved in local storage: set value in the DOM, update state,
	 * and re-render the bind <div> and <span> elements.
	 */
	setSavedFormData: () => void;
	/**
	 * Given a form field element, remove all errors (and everything related).
	 *
	 * @param {HTMLElement} formField
	 */
	removeFieldErrors: (formField: HTMLElement) => void;
	/**
	 * Handle the inputs of text form fields: update value in the state, save
	 * value in local storage, remove errors and re-render the bind <div> and
	 * <span> elements.
	 *
	 * @param {InputEvent} e
	 */
	textFieldOnInput: (e: InputEvent) => void;
	/**
	 * Handle the inputs of number form fields: update value in the state, save
	 * value in local storage, remove errors and re-render the bind <div> and
	 * <span> elements.
	 *
	 * @param {InputEvent} e
	 */
	numberFieldOnInput: (e: InputEvent) => void;
	/**
	 * Handle the inputs of select form fields: update value in the state, save
	 * value in local storage, remove errors and re-render the bind <div> and
	 * <span> elements. If the select box is a country calling code select, then
	 * also update the placeholder of the corresponding telephone input.
	 *
	 * @param {InputEvent} e
	 */
	selectFieldOnInput: (e: InputEvent) => void;
	/**
	 * Handle the inputs of choice form fields: update value in the state, save
	 * value in local storage, remove errors and re-render the bind <div> and
	 * <span> elements.
	 *
	 * @param {InputEvent} e
	 */
	choiceFieldOnInput: (e: InputEvent) => void;
	/**
	 * Handle the inputs of number choice form fields: update value in the
	 * state, save value in local storage, remove errors and re-render the bind
	 * <div> and <span> elements.
	 *
	 * @param {InputEvent} e
	 */
	numChoiceFieldOnInput: (e: InputEvent) => void;
	/**
	 * Handle the inputs of datetime form fields: update value in the state,
	 * save value in local storage, remove errors and re-render the bind <div>
	 * and <span> elements.
	 *
	 * @param {InputEvent} e
	 */
	dateTimeFieldOnInput: (e: InputEvent) => void;
	/**
	 * Handle the inputs of file form fields: reset and update the wrapping
	 * <label> depending on the file chosen.
	 *
	 * @param {InputEvent} e
	 */
	fileFieldOnInput: (e: InputEvent) => void;
	/**
	 * Set the height of a <textrea> element on input.
	 *
	 * @param {InputEvent} e
	 */
	setTextareaHeightOnInput: (e: InputEvent) => void;
	/**
	 * Reset file input when the corresponding reset button is clicked.
	 *
	 * @param {MouseEvent} e
	 */
	fileInputResetBtnOnClick: (e: MouseEvent) => void;
	/**
	 * Given a <button> element, set it to the processing state.
	 *
	 * @param {HTMLButtonElement} btn
	 */
	setBtnProcessing: (btn: HTMLButtonElement) => void;
	/**
	 * Given a <button> element, remove its processing state.
	 *
	 * @param {HTMLButtonElement} btn
	 */
	removeBtnProcessing: (btn: HTMLButtonElement) => void;
	/**
	 * Given a slide element, remove all errors (and everything related).
	 *
	 * @param {HTMLElement} slide
	 */
	removeSlideErrors: (slide: HTMLElement) => void;
	/**
	 * Add an error inside the given form field element.
	 *
	 * @param {HTMLElement} formField
	 * @param {string} errorId
	 * @param {string} message
	 */
	addFieldError: (
		formField: HTMLElement,
		errorId: string,
		message: string,
	) => void;
	/**
	 * Given a <form> element, validate and add errors if necessary. By default,
	 * most form fields rely entirely on built-in client-side validation that is
	 * found in browsers.
	 *
	 * @param {HTMLFormElement} form
	 * @returns {boolean} form is valid or not
	 */
	formValid: (form: HTMLFormElement) => boolean;
	/**
	 * When an error occurs during form submission or slide transition, add an
	 * error inside the slide element.
	 *
	 * @param {HTMLElement} slide
	 * @param {HTMLButtonElement} ctaBtn
	 */
	addSlideError: (slide: HTMLElement, ctaBtn: HTMLButtonElement) => void;
	/**
	 * GET data from remote source. A remote source here is anything outside of
	 * the actual template.
	 *
	 * @returns {Promise<string>}
	 */
	getRemoteData: () => Promise<string>;
	/**
	 * Convert timezone offset (in minutes) to the +HH:mm or -HH:mm format.
	 *
	 * @param {number} minutes
	 * @returns {String}
	 */
	convertTimezoneOffset: (minutes: number) => string;
	/**
	 * POST form data.
	 *
	 * @param {boolean} postCondition
	 * @param {boolean} end
	 * @returns {Promise<boolean>}
	 */
	postFormData: (postCondition: boolean, end: boolean) => Promise<boolean>;
	/**
	 * Go through each slide (before the current one) to get the previous one to
	 * make active (depending on the jump condition).
	 *
	 * @returns {{slide: HTMLElement, index: number}} the previous slide and its
	 * index
	 */
	getPrevSlide: () => {
		slide: HTMLElement;
		index: number;
	};
	/**
	 * Go through each slide (after the current one) to get the next one to make
	 * active (depending on the jump condition).
	 *
	 * @returns {{slide: HTMLElement, index: number}} the next slide and its
	 * index
	 */
	getNextSlide: () => {
		slide: HTMLElement;
		index: number;
	};
	/**
	 * Get the CSS slide transition duration (in milliseconds).
	 *
	 * @returns {number}
	 */
	getSlideTransitionDuration: () => number;
	/**
	 * When a new slide becomes active, do the following: update state, handle
	 * page progress (if applicable), handle the display and state of the footer
	 * slide control buttons, scroll to top and autofocus (if applicable).
	 *
	 * @param {HTMLElement} slide
	 * @param {number} index
	 * @param {boolean} fromInit
	 */
	hasNewActiveSlide: (
		slide: HTMLElement,
		index: number,
		fromInit: boolean,
	) => void;
	/**
	 * Fade out active slide and fade in next slide. The timeouts make sure that
	 * the animations work properly.
	 *
	 * @param {HTMLElement} activeSlide
	 * @param {HTMLElement} nextSlide
	 */
	fadeInNextSlide: (activeSlide: HTMLElement, nextSlide: HTMLElement) => void;
	/**
	 * Fade out active slide and fade in previous slide. The timeouts make sure
	 * that the animations work properly.
	 *
	 * @param {HTMLElement} activeSlide
	 * @param {HTMLElement} prevSlide
	 */
	fadeInPrevSlide: (activeSlide: HTMLElement, prevSlide: HTMLElement) => void;
	/**
	 * Disable all clicks. This is added when the slide transition starts, and
	 * removed after the slide transition has ended (or if there is an error).
	 *
	 * @param {MouseEvent} e
	 */
	disableAllClicks: (e: MouseEvent) => boolean;
	/**
	 * Go to the next slide.
	 *
	 * @param {HTMLElement} activeSlide
	 */
	nextSlide: (activeSlide: HTMLElement) => void;
	/**
	 * Go to the previous slide.
	 *
	 * @param {HTMLElement} activeSlide
	 */
	prevSlide: (activeSlide: HTMLElement) => void;
	/**
	 * Copy code to clipboard. The code block (<pre> element) closest to the
	 * copy button is the target.
	 *
	 * @param {MouseEvent} e
	 */
	copyCode: (e: MouseEvent) => void;
	/**
	 * Add all the event listeners.
	 *
	 * @param {HTMLElement} container
	 * @param {boolean} fromInit
	 */
	addEventListeners: (container: HTMLElement, fromInit: boolean) => void;
	/**
	 * Initialize settings, set data defined in the template, fetch and set data
	 * from remote source, and create the templates.
	 *
	 * @param {boolean} isFirstInit
	 */
	_init: (isFirstInit: boolean) => void;
	template: string;
	/**
	 * Initialize for the first time.
	 */
	init: () => void;
}
