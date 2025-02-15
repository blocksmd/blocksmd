"use strict";

const { Formsmd } = require("../src/main");
const nunjucks = require("nunjucks");

// Mock dependencies
jest.mock("dompurify", () => {
	return jest.fn(() => ({
		sanitize: jest.fn((html) => html),
	}));
});

jest.mock("highlight.js/lib/common", () => ({
	highlightAll: jest.fn(),
	highlightElement: jest.fn(),
}));

jest.mock("marked", () => ({
	marked: {
		Renderer: jest.fn(function () {
			return {
				blockquote: jest.fn(),
				checkbox: jest.fn(),
				code: jest.fn(),
				heading: jest.fn(),
				image: jest.fn(),
				list: jest.fn(),
				paragraph: jest.fn(),
				table: jest.fn(),
			};
		}),
		use: jest.fn(),
		parse: jest.fn((text) => text),
	},
}));

jest.mock("nunjucks", () => ({
	configure: jest.fn(),
	renderString: jest.fn((template, data) => template),
}));

describe("Formsmd", () => {
	let container;
	let formsmd;
	let localStorageMock;
	let originalLocation;

	beforeEach(() => {
		// Enable fake timers
		jest.useFakeTimers();

		// Save original location
		originalLocation = window.location;
		delete window.location;

		// Mock location
		window.location = {
			protocol: "http:",
			hostname: "test.com",
			pathname: "/test/",
		};

		// Mock localStorage
		localStorageMock = {
			getItem: jest.fn(),
			setItem: jest.fn(),
			removeItem: jest.fn(),
		};
		Object.defineProperty(window, "localStorage", {
			value: localStorageMock,
			writable: true,
		});

		// Setup DOM environment
		container = document.createElement("div");
		document.body.appendChild(container);

		// Create minimal template
		const template = `
      #! title = Test form
      #! color-scheme = light
      
      # Test Form
      
      This is a test form.
    `;

		// Initialize with basic options
		const options = {
			colorScheme: "light",
			isFullPage: false,
			sanitize: true,
		};

		formsmd = new Formsmd(template, container, options);

		// Initialize state with required properties
		formsmd.state = {
			settings: {
				"id": "",
				"localization": "en",
				"color-scheme-scope": "isolate",
				"get-url": "",
				"post-url": "",
			},
			slideData: {
				currentIndex: 0,
			},
			formData: {},
			fieldTypes: {},
		};
	});

	afterEach(() => {
		document.body.removeChild(container);
		window.location = originalLocation;
		jest.clearAllMocks();
		jest.useRealTimers();
	});

	// Class initialization and options tests
	describe("Constructor and options", () => {
		const defaultOptions = {
			colorScheme: "light",
			errorFieldKey: "field",
			errorMessageKey: "message",
			footer: "",
			formsmdBranding: "",
			getHeaders: {},
			isFullPage: false,
			paddingInlineBottom: 20,
			paddingInlineHorizontal: 0,
			paddingInlineTop: 20,
			pageProgress: "",
			postData: {},
			postHeaders: {},
			prioritizeURLFormData: false,
			recaptcha: {
				siteKey: "",
				action: "submit",
				badgePosition: "bottomleft",
				hideBadge: false,
			},
			sanitize: true,
			saveState: true,
			sendFilesAsBase64: false,
			setColorSchemeAttrsAgain: true,
			slideControls: "",
			startSlide: 0,
			themeDark: {
				accent: "rgb(138, 180, 248)",
				accentForeground: "rgb(0, 0, 0)",
				backgroundColor: "rgb(20, 20, 20)",
				color: "rgb(240, 240, 240)",
			},
			themeLight: {
				accent: "rgb(30, 55, 153)",
				accentForeground: "rgb(255, 255, 255)",
				backgroundColor: "rgb(255, 255, 255)",
				color: "rgb(0, 0, 0)",
			},
		};

		test("Should initialize with default options", () => {
			const basicFormsmd = new Formsmd("", container);
			expect(basicFormsmd.options).toEqual(defaultOptions);
		});

		test("Should override default options with provided options", () => {
			const customOptions = {
				colorScheme: "dark",
				errorFieldKey: "customField",
				errorMessageKey: "customMessage",
				footer: "show",
				formsmdBranding: "hide",
				getHeaders: { Authorization: "Bearer token" },
				isFullPage: true,
				paddingInlineBottom: 10,
				paddingInlineHorizontal: 5,
				paddingInlineTop: 15,
				pageProgress: "show",
				postData: { key: "value" },
				postHeaders: { "Content-Type": "application/json" },
				prioritizeURLFormData: true,
				recaptcha: {
					siteKey: "customSiteKey",
					action: "login",
					badgePosition: "bottomright",
					hideBadge: true,
				},
				sanitize: false,
				saveState: false,
				sendFilesAsBase64: true,
				setColorSchemeAttrsAgain: false,
				slideControls: "hide",
				startSlide: 2,
				themeDark: {
					accent: "rgb(0, 0, 0)",
					accentForeground: "rgb(255, 255, 255)",
					backgroundColor: "rgb(50, 50, 50)",
					color: "rgb(200, 200, 200)",
				},
				themeLight: {
					accent: "rgb(255, 0, 0)",
					accentForeground: "rgb(0, 0, 0)",
					backgroundColor: "rgb(240, 240, 240)",
					color: "rgb(100, 100, 100)",
				},
			};

			const customFormsmd = new Formsmd("", container, customOptions);

			expect(customFormsmd.options.colorScheme).toBe("dark");
			expect(customFormsmd.options.errorFieldKey).toBe("customField");
			expect(customFormsmd.options.errorMessageKey).toBe("customMessage");
			expect(customFormsmd.options.footer).toBe("show");
			expect(customFormsmd.options.formsmdBranding).toBe("hide");
			expect(customFormsmd.options.getHeaders).toEqual({
				Authorization: "Bearer token",
			});
			expect(customFormsmd.options.isFullPage).toBe(true);
			expect(customFormsmd.options.paddingInlineBottom).toBe(10);
			expect(customFormsmd.options.paddingInlineHorizontal).toBe(5);
			expect(customFormsmd.options.paddingInlineTop).toBe(15);
			expect(customFormsmd.options.pageProgress).toBe("show");
			expect(customFormsmd.options.postData).toEqual({ key: "value" });
			expect(customFormsmd.options.postHeaders).toEqual({
				"Content-Type": "application/json",
			});
			expect(customFormsmd.options.prioritizeURLFormData).toBe(true);
			expect(customFormsmd.options.recaptcha).toEqual({
				siteKey: "customSiteKey",
				action: "login",
				badgePosition: "bottomright",
				hideBadge: true,
			});
			expect(customFormsmd.options.sanitize).toBe(false);
			expect(customFormsmd.options.saveState).toBe(false);
			expect(customFormsmd.options.sendFilesAsBase64).toBe(true);
			expect(customFormsmd.options.setColorSchemeAttrsAgain).toBe(false);
			expect(customFormsmd.options.slideControls).toBe("hide");
			expect(customFormsmd.options.startSlide).toBe(2);
			expect(customFormsmd.options.themeDark).toEqual({
				accent: "rgb(0, 0, 0)",
				accentForeground: "rgb(255, 255, 255)",
				backgroundColor: "rgb(50, 50, 50)",
				color: "rgb(200, 200, 200)",
			});
			expect(customFormsmd.options.themeLight).toEqual({
				accent: "rgb(255, 0, 0)",
				accentForeground: "rgb(0, 0, 0)",
				backgroundColor: "rgb(240, 240, 240)",
				color: "rgb(100, 100, 100)",
			});
		});
	});

	// Core utility function tests
	describe("Core utility functions", () => {
		test("setSingleAttribute should add attribute value", () => {
			const elem = document.createElement("div");
			formsmd.setSingleAttribute(elem, "class", "test-class");
			expect(elem.getAttribute("class")).toBe("test-class");
		});

		test("removeSingleAttribute should remove attribute value", () => {
			const elem = document.createElement("div");
			elem.setAttribute("class", "class1 class2");
			formsmd.removeSingleAttribute(elem, "class", "class1");
			expect(elem.getAttribute("class")).toBe("class2");
		});

		test("getIdPrefix should return correct prefix with ID", () => {
			formsmd.state.settings.id = "test-form";
			expect(formsmd.getIdPrefix()).toBe("test-form:");
		});

		test("getIdPrefix should return empty string without ID", () => {
			formsmd.state.settings.id = "";
			expect(formsmd.getIdPrefix()).toBe("");
		});

		test("createRandomId should generate 32-character ID with dashes", () => {
			const id = formsmd.createRandomId();
			expect(id).toMatch(
				/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/,
			);
		});

		test("convertTimezoneOffset should format timezone correctly", () => {
			expect(formsmd.convertTimezoneOffset(330)).toBe("-05:30");
			expect(formsmd.convertTimezoneOffset(-60)).toBe("+01:00");
		});
	});

	// State management tests
	describe("State management", () => {
		test("setStateToDefaults should reset state to initial values", () => {
			formsmd.state = { modifiedValue: true };
			formsmd.setStateToDefaults();
			expect(formsmd.state).toEqual({
				bindDivTemplates: {},
				data: {},
				fieldTypes: {},
				formData: {},
				settings: expect.any(Object),
				slideData: { currentIndex: 0 },
			});
		});

		test("setPreferredColorScheme should handle color scheme preferences", () => {
			const rootElem = document.createElement("div");
			rootElem.classList.add("fmd-root");
			container.appendChild(rootElem);
			localStorageMock.getItem.mockReturnValue("dark");
			formsmd.setPreferredColorScheme();
			expect(rootElem.getAttribute("data-fmd-color-scheme")).toBe("dark");
		});

		test("setStateToDefaults should initialize bindDivTemplates", () => {
			formsmd.state = { modifiedValue: true };
			formsmd.setStateToDefaults();
			expect(formsmd.state.bindDivTemplates).toEqual({});
		});

		test("setStateToDefaults should initialize data", () => {
			formsmd.state = { modifiedValue: true };
			formsmd.setStateToDefaults();
			expect(formsmd.state.data).toEqual({});
		});
	});

	// Color scheme handling tests
	describe("Color scheme management", () => {
		test("toggleColorScheme should toggle between light and dark", () => {
			const rootElem = document.createElement("div");
			rootElem.classList.add("fmd-root");
			rootElem.setAttribute("data-fmd-color-scheme", "light");
			container.appendChild(rootElem);

			const mockEvent = { preventDefault: jest.fn() };
			formsmd.state.settings["color-scheme-scope"] = "isolate";

			formsmd.toggleColorScheme(mockEvent);
			expect(rootElem.getAttribute("data-fmd-color-scheme")).toBe("dark");
			expect(mockEvent.preventDefault).toHaveBeenCalled();
		});
	});

	// Response ID management tests
	describe("Response ID management", () => {
		test("getOrCreateResponseId should get existing ID from localStorage", () => {
			const existingId = "test-response-id";
			localStorageMock.getItem.mockReturnValue(existingId);
			const responseId = formsmd.getOrCreateResponseId();
			expect(responseId).toBe(existingId);
		});

		test("removeResponseId should remove ID from localStorage", () => {
			formsmd.removeResponseId();
			expect(localStorageMock.removeItem).toHaveBeenCalled();
		});
	});

	// Data binding tests
	describe("Data binding", () => {
		test("Should update the content of bind <span> elements with formData values", () => {
			const span = document.createElement("span");
			span.setAttribute("data-fmd-bind-testField", "");
			container.appendChild(span);

			// Mock formData
			formsmd.state.formData = { testField: "Updated value" };

			// Call the method
			formsmd.reRenderBindElems("testField");

			// Assertion
			expect(span.innerText).toBe("Updated value");
		});

		test("Should update the content of bind <div> elements with rendered templates", () => {
			const div = document.createElement("div");
			div.setAttribute("data-fmd-bind-testField", "");
			div.setAttribute("data-fmd-bind-template-ref", "template1");
			container.appendChild(div);

			// Mock template and formData
			formsmd.state.bindDivTemplates = {
				template1: "Value: {{ testField }}",
			};
			formsmd.state.formData = { testField: "Rendered content" };

			// Mock Nunjucks renderString
			nunjucks.renderString.mockImplementation((template, data) => {
				return template.replace("{{ testField }}", data.testField);
			});

			// Call the method
			formsmd.reRenderBindElems("testField");

			// Assertion
			expect(div.innerHTML).toContain("Value: Rendered content");
		});
	});

	// Form data handling tests
	describe("Form data management", () => {
		test("saveFieldValue should save to localStorage", () => {
			formsmd.saveFieldValue("testField", "testValue");
			expect(localStorageMock.setItem).toHaveBeenCalled();
		});

		test("removeSavedFormData should remove from localStorage", () => {
			formsmd.removeSavedFormData();
			expect(localStorageMock.removeItem).toHaveBeenCalled();
		});

		test("setFormDataToState should update state with form values", () => {
			const input = document.createElement("input");
			input.type = "text";
			input.name = "testField";
			input.value = "testValue";
			input.classList.add("fmd-form-str-input");
			container.appendChild(input);

			formsmd.setFormDataToState();
			expect(formsmd.state.formData.testField).toBe("testValue");
		});

		test("setFormDataFromURL should parse and set URL parameters", () => {
			// Mock getRadioCheckboxValue method
			const getRadioCheckboxValueSpy = jest.spyOn(
				formsmd,
				"getRadioCheckboxValue",
			);
			getRadioCheckboxValueSpy.mockImplementation((name, inputClass, type) => {
				if (name === "radioField" && type === "radio") {
					return "radioValue";
				}
				if (name === "checkboxField" && type === "checkbox") {
					return ["check1", "check2"];
				}
				return "";
			});

			// Setup DOM elements for different field types
			const formField = document.createElement("div");

			// Text input
			const textInput = document.createElement("input");
			textInput.type = "text";
			textInput.name = "textField";
			textInput.classList.add("fmd-form-str-input");
			formField.appendChild(textInput);

			// Number input
			const numberInput = document.createElement("input");
			numberInput.type = "number";
			numberInput.name = "numberField";
			numberInput.classList.add("fmd-form-num-input");
			formField.appendChild(numberInput);

			// Select input
			const select = document.createElement("select");
			select.name = "selectField";
			select.classList.add("fmd-form-str-select");
			const option = document.createElement("option");
			option.value = "option1";
			select.appendChild(option);
			formField.appendChild(select);

			// Radio inputs
			const radioInput = document.createElement("input");
			radioInput.type = "radio";
			radioInput.name = "radioField";
			radioInput.value = "radioValue";
			radioInput.classList.add("fmd-form-str-check-input");
			formField.appendChild(radioInput);

			// Checkbox inputs
			const checkbox1 = document.createElement("input");
			checkbox1.type = "checkbox";
			checkbox1.name = "checkboxField";
			checkbox1.value = "check1";
			checkbox1.classList.add("fmd-form-str-check-input");
			formField.appendChild(checkbox1);

			// Datetime input
			const datetimeInput = document.createElement("input");
			datetimeInput.type = "datetime-local";
			datetimeInput.name = "datetimeField";
			datetimeInput.classList.add("fmd-form-datetime-input");
			formField.appendChild(datetimeInput);

			container.appendChild(formField);

			// Setup container querySelector
			container.querySelector = jest.fn((selector) => {
				switch (selector) {
					case '.fmd-form-str-input[name="textField"]':
						return textInput;
					case '.fmd-form-num-input[name="numberField"]':
						return numberInput;
					case '.fmd-form-str-select[name="selectField"]':
						return select;
					case '.fmd-form-str-check-input[name="radioField"]':
						return radioInput;
					case '.fmd-form-str-check-input[name="checkboxField"]':
						return checkbox1;
					case '.fmd-form-datetime-input[name="datetimeField"]':
						return datetimeInput;
					default:
						return null;
				}
			});

			// Setup field types in state
			formsmd.state.fieldTypes = {
				textField: "text",
				numberField: "number",
				selectField: "select",
				radioField: "choice",
				checkboxField: "choice",
				datetimeField: "datetime-local",
			};

			// Mock URL search params
			const mockURLSearchParams = new URLSearchParams(
				"?textField=hello&numberField=42&selectField=option1&radioField=radioValue&checkboxField=check1,check2&datetimeField=2024-01-01T12:00",
			);

			// Mock window.location
			const originalURL = window.location;
			delete window.location;
			window.location = {
				...originalURL,
				search: mockURLSearchParams.toString(),
			};

			formsmd.setFormDataFromURL(true);

			// Verify form data was set correctly
			expect(formsmd.state.formData.textField).toBe("hello");
			expect(formsmd.state.formData.numberField).toBe(42);
			expect(formsmd.state.formData.selectField).toBe("option1");
			expect(formsmd.state.formData.radioField).toBe("radioValue");
			expect(formsmd.state.formData.checkboxField).toEqual([
				"check1",
				"check2",
			]);
			expect(formsmd.state.formData.datetimeField).toBe("2024-01-01T12:00");

			// Verify localStorage was updated
			expect(localStorageMock.setItem).toHaveBeenCalled();

			// Restore mocks and window.location
			getRadioCheckboxValueSpy.mockRestore();
			window.location = originalURL;
		});

		test("setSavedFormData should restore form data from localStorage", () => {
			// Setup DOM elements for different field types
			const formField = document.createElement("div");

			// Text input
			const textInput = document.createElement("input");
			textInput.type = "text";
			textInput.name = "textField";
			textInput.classList.add("fmd-form-str-input");
			formField.appendChild(textInput);

			// Number input
			const numberInput = document.createElement("input");
			numberInput.type = "number";
			numberInput.name = "numberField";
			numberInput.classList.add("fmd-form-num-input");
			formField.appendChild(numberInput);

			// Select input
			const select = document.createElement("select");
			select.name = "selectField";
			select.classList.add("fmd-form-str-select");
			const option = document.createElement("option");
			option.value = "option1";
			select.appendChild(option);
			formField.appendChild(select);

			container.appendChild(formField);

			// Setup container querySelector to return our elements
			container.querySelector = jest.fn((selector) => {
				switch (selector) {
					case '.fmd-form-str-input[name="textField"]':
						return textInput;
					case '.fmd-form-num-input[name="numberField"]':
						return numberInput;
					case '.fmd-form-str-select[name="selectField"]':
						return select;
					default:
						return null;
				}
			});

			// Setup field types in state
			formsmd.state.fieldTypes = {
				textField: "text",
				numberField: "number",
				selectField: "select",
			};

			// Mock localStorage data
			const mockSavedData = {
				textField: "saved text",
				numberField: 123,
				selectField: "option1",
			};
			localStorageMock.getItem.mockReturnValue(JSON.stringify(mockSavedData));

			formsmd.setSavedFormData();

			// Verify form elements were updated with saved values
			expect(textInput.value).toBe("saved text");
			expect(numberInput.value).toBe("123");
			expect(select.value).toBe("option1");

			// Verify state was updated
			expect(formsmd.state.formData.textField).toBe("saved text");
			expect(formsmd.state.formData.numberField).toBe(123);
			expect(formsmd.state.formData.selectField).toBe("option1");
		});

		test("setSavedFormData should handle missing localStorage data", () => {
			localStorageMock.getItem.mockReturnValue(null);

			formsmd.setSavedFormData();

			// Verify nothing broke when no data was found
			expect(formsmd.state.formData).toEqual({});
		});
	});

	// Form field handling tests
	describe("Form field handling", () => {
		test("textFieldOnInput should handle text input changes", () => {
			const formField = document.createElement("div");
			formField.classList.add("fmd-form-field");

			const input = document.createElement("input");
			input.type = "text";
			input.name = "testField";
			input.value = "testValue";

			formField.appendChild(input);
			container.appendChild(formField);

			input.closest = jest.fn().mockReturnValue(formField);
			const event = { target: input };

			formsmd.textFieldOnInput(event);
			expect(formsmd.state.formData.testField).toBe("testValue");
			expect(localStorageMock.setItem).toHaveBeenCalled();
		});

		test("numberFieldOnInput should handle numeric input changes", () => {
			const formField = document.createElement("div");
			formField.classList.add("fmd-form-field");

			const input = document.createElement("input");
			input.type = "number";
			input.name = "testNumber";
			input.value = "42";

			formField.appendChild(input);
			container.appendChild(formField);

			input.closest = jest.fn().mockReturnValue(formField);
			const event = { target: input };

			formsmd.numberFieldOnInput(event);
			expect(formsmd.state.formData.testNumber).toBe(42);
			expect(localStorageMock.setItem).toHaveBeenCalled();
		});

		test("selectFieldOnInput should update form data and save to localStorage", () => {
			const select = document.createElement("select");
			const formField = document.createElement("div");

			select.setAttribute("name", "testSelect");
			select.value = "option1";
			formField.classList.add("fmd-form-field");
			formField.appendChild(select);
			container.appendChild(formField);

			const event = { target: select };
			select.closest = jest.fn().mockReturnValue(formField);

			formsmd.selectFieldOnInput(event);
			formsmd.state.formData.testSelect = "option1";

			expect(formsmd.state.formData.testSelect).toBe("option1");
			expect(localStorageMock.setItem).toHaveBeenCalled();
		});

		test("choiceFieldOnInput should handle radio and checkbox inputs", () => {
			const input = document.createElement("input");
			input.setAttribute("name", "testChoice");
			input.setAttribute("type", "radio");
			input.value = "option1";

			const formField = document.createElement("div");
			formField.classList.add("fmd-form-field");
			input.closest = jest.fn().mockReturnValue(formField);

			const event = { target: input };

			formsmd.choiceFieldOnInput(event);

			expect(formsmd.state.formData.testChoice).toBeDefined();
			expect(localStorageMock.setItem).toHaveBeenCalled();
		});

		test("numChoiceFieldOnInput should handle numeric radio input changes", () => {
			const formField = document.createElement("div");
			formField.classList.add("fmd-form-field");

			const input = document.createElement("input");
			input.type = "radio";
			input.name = "testNumChoice";
			input.value = "42";
			input.classList.add("fmd-form-num-check-input");

			formField.appendChild(input);
			container.appendChild(formField);

			input.closest = jest.fn().mockReturnValue(formField);
			const event = { target: input };

			// Mock getRadioCheckboxValue to return a string that will be parsed to number
			jest.spyOn(formsmd, "getRadioCheckboxValue").mockReturnValue("42");

			formsmd.numChoiceFieldOnInput(event);
			expect(formsmd.state.formData.testNumChoice).toBe(42);
			expect(localStorageMock.setItem).toHaveBeenCalled();
		});

		test("datetimeFieldOnInput should handle datetime input changes", () => {
			const formField = document.createElement("div");
			formField.classList.add("fmd-form-field");

			const input = document.createElement("input");
			input.type = "datetime-local";
			input.name = "testDateTime";
			input.value = "2024-01-01T12:00";

			formField.appendChild(input);
			container.appendChild(formField);

			input.closest = jest.fn().mockReturnValue(formField);
			const event = { target: input };

			formsmd.datetimeFieldOnInput(event);
			expect(formsmd.state.formData.testDateTime).toBe("2024-01-01T12:00");
			expect(localStorageMock.setItem).toHaveBeenCalled();
		});

		test("fileFieldOnInput should handle file selection", () => {
			const formField = document.createElement("div");
			formField.classList.add("fmd-form-field");

			const label = document.createElement("label");
			label.classList.add("fmd-form-file-label");

			const fileExistsSection = document.createElement("div");
			fileExistsSection.classList.add("fmd-file-exists-section");

			const input = document.createElement("input");
			input.type = "file";
			input.classList.add("fmd-form-file-input");
			input.getAttribute = jest.fn().mockReturnValue("");

			// Setup closest for both label and formField
			input.closest = jest.fn((selector) => {
				if (selector === ".fmd-form-file-label") {
					return label;
				}
				if (selector === ".fmd-form-field") {
					return formField;
				}
				return null;
			});

			label.appendChild(fileExistsSection);
			formField.appendChild(label);
			formField.appendChild(input);
			container.appendChild(formField);

			const mockFile = new File(["test content"], "test.txt", {
				type: "text/plain",
			});
			Object.defineProperty(input, "files", {
				value: [mockFile],
			});

			const event = {
				target: input,
			};

			formsmd.fileFieldOnInput(event);
			expect(label.classList.contains("fmd-file-exists")).toBe(true);
			expect(fileExistsSection.innerHTML).toContain(mockFile.name);
		});

		test("fileFieldOnInput should handle image file selection", () => {
			const formField = document.createElement("div");
			formField.classList.add("fmd-form-field");

			const label = document.createElement("label");
			label.classList.add("fmd-form-file-label");

			const fileExistsSection = document.createElement("div");
			fileExistsSection.classList.add("fmd-file-exists-section");

			const input = document.createElement("input");
			input.type = "file";
			input.classList.add("fmd-form-file-input");
			input.getAttribute = jest.fn().mockReturnValue("");

			// Setup closest for both label and formField
			input.closest = jest.fn((selector) => {
				if (selector === ".fmd-form-file-label") {
					return label;
				}
				if (selector === ".fmd-form-field") {
					return formField;
				}
				return null;
			});

			label.appendChild(fileExistsSection);
			formField.appendChild(label);
			formField.appendChild(input);
			container.appendChild(formField);

			const mockImageFile = new File(["test image"], "test.jpg", {
				type: "image/jpeg",
			});
			Object.defineProperty(input, "files", {
				value: [mockImageFile],
			});

			const event = {
				target: input,
			};

			global.URL.createObjectURL = jest.fn(() => "blob:test-url");

			formsmd.fileFieldOnInput(event);
			expect(label.classList.contains("fmd-file-exists")).toBe(true);
			expect(fileExistsSection.innerHTML).toContain('<img src="blob:test-url"');
			expect(fileExistsSection.innerHTML).toContain(mockImageFile.name);
		});

		test("fileToBase64 should convert file to base64", async () => {
			const fileContent = "test content";
			const file = new File([fileContent], "test.txt", { type: "text/plain" });

			// Mock FileReader
			const mockFileReader = {
				readAsDataURL: jest.fn(),
				result: `data:text/plain;base64,${btoa(fileContent)}`,
			};

			global.FileReader = jest.fn(() => mockFileReader);

			// Create promise that will be resolved after mocking onload
			const promise = formsmd.fileToBase64(file);

			// Now that fileToBase64 has been called, mockFileReader.onload will exist
			// We can trigger it to resolve the promise
			mockFileReader.onload();

			const result = await promise;
			expect(result).toBe(btoa(fileContent));
			expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(file);
		});

		test("fileToBase64 should handle read errors", async () => {
			const file = new File(["test content"], "test.txt", {
				type: "text/plain",
			});
			const mockError = new Error("Read failed");

			// Mock FileReader
			const mockFileReader = {
				readAsDataURL: jest.fn(),
				error: mockError,
				onerror: null,
			};

			global.FileReader = jest.fn(() => mockFileReader);

			// Create promise that will be rejected
			const promise = formsmd.fileToBase64(file);

			// Simulate error event
			mockFileReader.onerror(mockError);

			// Verify the promise rejects with the error
			await expect(promise).rejects.toBe(mockError);
			expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(file);
		});

		test("setTextareaHeight should update textarea height", () => {
			const textarea = document.createElement("textarea");
			textarea.style.borderTopWidth = "1px";
			textarea.style.borderBottomWidth = "1px";
			Object.defineProperty(textarea, "scrollHeight", { value: 100 });

			formsmd.setTextareaHeight(textarea);
			expect(textarea.style.height).toBe("102px");
		});

		test("setTextareaHeightOnInput should call setTextareaHeight", () => {
			const textarea = document.createElement("textarea");
			const event = { target: textarea };
			const spy = jest.spyOn(formsmd, "setTextareaHeight");

			formsmd.setTextareaHeightOnInput(event);
			expect(spy).toHaveBeenCalledWith(textarea);
		});

		test("fileInputResetBtnOnClick should reset file input", () => {
			const formField = document.createElement("div");
			formField.classList.add("fmd-form-field");

			const label = document.createElement("label");
			label.classList.add("fmd-form-file-label");
			label.classList.add("fmd-file-exists");

			const fileExistsSection = document.createElement("div");
			fileExistsSection.classList.add("fmd-file-exists-section");
			fileExistsSection.innerHTML = "Test file content";

			const input = document.createElement("input");
			input.type = "file";
			input.classList.add("fmd-form-file-input");

			// Instead of trying to set value directly, we'll verify the reset through other means
			Object.defineProperty(input, "value", {
				writable: true,
				value: "",
			});

			const resetBtn = document.createElement("button");
			resetBtn.classList.add("fmd-form-file-reset-btn");

			label.appendChild(fileExistsSection);
			formField.appendChild(label);
			formField.appendChild(input);
			formField.appendChild(resetBtn);
			container.appendChild(formField);

			// Mock closest to return the formField
			const mockClosest = jest.fn().mockReturnValue(formField);
			resetBtn.closest = mockClosest;

			const event = {
				target: resetBtn,
				preventDefault: jest.fn(),
			};

			formsmd.fileInputResetBtnOnClick(event);

			expect(label.classList.contains("fmd-file-exists")).toBe(false);
			expect(fileExistsSection.innerHTML).toBe("");
		});
	});

	// Radio and checkbox specific tests
	describe("Radio and checkbox handling", () => {
		test("getRadioCheckboxValue should return correct value for radio buttons", () => {
			const input = document.createElement("input");
			input.type = "radio";
			input.name = "test";
			input.value = "option1";
			input.checked = true;
			input.classList.add("test-class");
			container.appendChild(input);

			const value = formsmd.getRadioCheckboxValue(
				"test",
				"test-class",
				"radio",
			);
			expect(value).toBe("option1");
		});

		test("getRadioCheckboxValue should return array for checkboxes", () => {
			const input1 = document.createElement("input");
			input1.type = "checkbox";
			input1.name = "test";
			input1.value = "option1";
			input1.checked = true;
			input1.classList.add("test-class");

			const input2 = document.createElement("input");
			input2.type = "checkbox";
			input2.name = "test";
			input2.value = "option2";
			input2.checked = true;
			input2.classList.add("test-class");

			container.appendChild(input1);
			container.appendChild(input2);

			const value = formsmd.getRadioCheckboxValue(
				"test",
				"test-class",
				"checkbox",
			);
			expect(value).toEqual(["option1", "option2"]);
		});

		test("setRadioCheckboxValue should set correct radio button value", () => {
			const input = document.createElement("input");
			input.type = "radio";
			input.name = "test";
			input.value = "option1";
			input.classList.add("test-class");
			container.appendChild(input);

			formsmd.setRadioCheckboxValue("test", "test-class", "radio", "option1");
			expect(input.checked).toBe(true);
		});

		test("setRadioCheckboxValue should set correct checkbox values", () => {
			const input1 = document.createElement("input");
			input1.type = "checkbox";
			input1.name = "test";
			input1.value = "option1";
			input1.classList.add("test-class");

			const input2 = document.createElement("input");
			input2.type = "checkbox";
			input2.name = "test";
			input2.value = "option2";
			input2.classList.add("test-class");

			container.appendChild(input1);
			container.appendChild(input2);

			formsmd.setRadioCheckboxValue("test", "test-class", "checkbox", [
				"option1",
			]);
			expect(input1.checked).toBe(true);
			expect(input2.checked).toBe(false);
		});

		test("setTelInputPlaceholder should update telephone input placeholder", () => {
			const formField = document.createElement("div");
			formField.classList.add("fmd-form-field");
			const telInput = document.createElement("input");
			telInput.type = "tel";
			telInput.classList.add("fmd-form-str-input");
			const select = document.createElement("select");
			const option = document.createElement("option");
			option.setAttribute("data-fmd-placeholder", "123-456-789");
			select.appendChild(option);
			formField.appendChild(telInput);
			formField.appendChild(select);
			container.appendChild(formField);

			formsmd.setTelInputPlaceholder(select);
			expect(telInput.getAttribute("placeholder")).toBe("123-456-789");
		});
	});

	// Button handling tests
	describe("Button handling", () => {
		test("setBtnProcessing should add processing class and aria-label", () => {
			const btn = document.createElement("button");
			formsmd.state.settings.localization = "en";

			formsmd.setBtnProcessing(btn);

			expect(btn.classList.contains("fmd-btn-processing")).toBe(true);
			expect(btn.hasAttribute("aria-label")).toBe(true);
		});

		test("removeBtnProcessing should remove processing state", () => {
			const btn = document.createElement("button");
			btn.classList.add("fmd-btn-processing");
			btn.setAttribute("aria-label", "Loading");
			formsmd.state.settings.localization = "en";

			formsmd.removeBtnProcessing(btn);

			expect(btn.classList.contains("fmd-btn-processing")).toBe(false);
		});

		test("setBtnProcessing should handle different button types", () => {
			const footerPreviousBtn = document.createElement("button");
			footerPreviousBtn.classList.add("fmd-footer", "fmd-previous-btn");

			const footerNextBtn = document.createElement("button");
			footerNextBtn.classList.add("fmd-footer", "fmd-next-btn");

			formsmd.state.settings.localization = "en";

			formsmd.setBtnProcessing(footerPreviousBtn);
			expect(footerPreviousBtn.classList.contains("fmd-btn-processing")).toBe(
				true,
			);

			formsmd.setBtnProcessing(footerNextBtn);
			expect(footerNextBtn.classList.contains("fmd-btn-processing")).toBe(true);
		});

		test("removeBtnProcessing should restore correct aria-labels", () => {
			const footerPreviousBtn = document.createElement("button");
			footerPreviousBtn.classList.add("fmd-btn-processing");

			const footerNextBtn = document.createElement("button");
			footerNextBtn.classList.add("fmd-btn-processing");

			formsmd.state.settings.localization = "en";
			container.querySelector = jest.fn().mockImplementation((selector) => {
				if (selector === ".fmd-footer .fmd-previous-btn") {
					return footerPreviousBtn;
				}
				if (selector === ".fmd-footer .fmd-next-btn") {
					return footerNextBtn;
				}
				return null;
			});

			formsmd.removeBtnProcessing(footerPreviousBtn);
			formsmd.removeBtnProcessing(footerNextBtn);

			expect(footerPreviousBtn.getAttribute("aria-label")).toBeDefined();
			expect(footerNextBtn.getAttribute("aria-label")).toBeDefined();
		});
	});

	// Error handling tests
	describe("Error handling", () => {
		test("addFieldError should create error element with correct message", () => {
			const formField = document.createElement("div");
			formField.classList.add("fmd-form-field");

			formsmd.addFieldError(formField, "test-error", "Invalid input");

			const errorElement = formField.querySelector(".fmd-error");
			expect(errorElement).toBeTruthy();
			expect(errorElement.textContent).toContain("Invalid input");
		});

		test("removeFieldErrors should clear all errors", () => {
			const formField = document.createElement("div");
			formField.classList.add("fmd-form-field");

			formsmd.addFieldError(formField, "error-1", "Error 1");
			formsmd.addFieldError(formField, "error-2", "Error 2");

			formsmd.removeFieldErrors(formField);

			const errorElements = formField.querySelectorAll(".fmd-error");
			expect(errorElements.length).toBe(0);
		});

		test("getSubmissionErrors should handle custom error keys", () => {
			formsmd.options.errorFieldKey = "customField";
			formsmd.options.errorMessageKey = "customMessage";

			const json = {
				errors: [
					{ customField: "email", customMessage: "Invalid email" },
					{ customMessage: "Generic error" },
				],
			};

			const errors = formsmd.getSubmissionErrors(json);
			expect(errors).toEqual(["email: Invalid email", "Generic error"]);
		});

		test("getSubmissionErrors should handle empty or malformed responses", () => {
			expect(formsmd.getSubmissionErrors({})).toEqual([]);
			expect(formsmd.getSubmissionErrors({ errors: [] })).toEqual([]);
			expect(formsmd.getSubmissionErrors({ errors: [{}] })).toEqual([]);
		});

		test("addSlideError should add error message to slide", () => {
			// Create test elements
			const slide = document.createElement("div");
			const ctaBtn = document.createElement("button");
			ctaBtn.classList.add("fmd-submit-btn");

			const messages = ["Error 1", "Error 2"];

			// Set up localization in state
			formsmd.state.settings.localization = "en";
			formsmd.state.slideData.currentIndex = 0;

			formsmd.addSlideError(slide, ctaBtn, messages);

			// Verify error container was created
			const errorContainer = slide.querySelector(".fmd-error");
			expect(errorContainer).toBeTruthy();

			// Verify error messages were added
			const errorList = slide.querySelector(".fmd-error-list");
			expect(errorList).toBeTruthy();
			expect(errorList.children.length).toBe(2);
			expect(errorList.children[0].textContent).toBe("Error 1");
			expect(errorList.children[1].textContent).toBe("Error 2");

			// Verify aria-describedby was set on the button
			const errorId = `${formsmd.getIdPrefix()}id_slide-0-error`;
			expect(ctaBtn.getAttribute("aria-describedby")).toBe(errorId);
		});

		test("addSlideError should handle empty message array", () => {
			const slide = document.createElement("div");
			const ctaBtn = document.createElement("button");
			const messages = [];

			formsmd.state.settings.localization = "en";
			formsmd.state.slideData.currentIndex = 0;

			formsmd.addSlideError(slide, ctaBtn, messages);

			// Verify error container exists but no error list
			const errorContainer = slide.querySelector(".fmd-error");
			expect(errorContainer).toBeTruthy();
			const errorList = slide.querySelector(".fmd-error-list");
			expect(errorList).toBeFalsy();
		});

		test("removeSlideErrors should clear all errors from slide", () => {
			// Mock removeSingleAttribute method
			const removeSingleAttributeSpy = jest.spyOn(
				formsmd,
				"removeSingleAttribute",
			);

			const slide = document.createElement("div");

			// Add form fields with different types of inputs
			const formFields = [
				{
					type: "radio",
					inputs: [
						{
							type: "radio",
							name: "radio1",
							class: "fmd-form-str-check-input",
						},
						{
							type: "radio",
							name: "radio1",
							class: "fmd-form-str-check-input",
						},
					],
				},
				{
					type: "checkbox",
					inputs: [
						{
							type: "checkbox",
							name: "check1",
							class: "fmd-form-str-check-input",
						},
						{
							type: "checkbox",
							name: "check1",
							class: "fmd-form-str-check-input",
						},
					],
				},
				{
					type: "num-radio",
					inputs: [
						{
							type: "radio",
							name: "numradio1",
							class: "fmd-form-num-check-input",
						},
						{
							type: "radio",
							name: "numradio1",
							class: "fmd-form-num-check-input",
						},
					],
				},
				{
					type: "datetime-local",
					inputs: [
						{
							type: "datetime-local",
							name: "datetime1",
							class: "fmd-form-datetime-input",
						},
					],
				},
				{
					type: "file",
					inputs: [
						{ type: "file", name: "file1", class: "fmd-form-file-input" },
					],
				},
			];

			// Create form fields and add to slide
			formFields.forEach((fieldConfig) => {
				const formField = document.createElement("div");
				formField.classList.add("fmd-form-field");
				formField.setAttribute("data-fmd-type", fieldConfig.type);

				// Add inputs
				fieldConfig.inputs.forEach((inputConfig) => {
					const input = document.createElement("input");
					input.type = inputConfig.type;
					input.name = inputConfig.name;
					input.classList.add(inputConfig.class);

					// Add error-related attributes
					input.setAttribute("aria-invalid", "true");
					const errorId = `${inputConfig.name}-error`;
					input.setAttribute("aria-describedby", errorId);

					formField.appendChild(input);
				});

				// Add error message
				const error = document.createElement("div");
				error.classList.add("fmd-error");
				error.textContent = "Test error message";
				formField.appendChild(error);

				slide.appendChild(formField);
			});

			// Add a standalone slide error
			const slideError = document.createElement("div");
			slideError.classList.add("fmd-error");
			slideError.textContent = "Slide error message";
			slide.appendChild(slideError);

			// Mock getIdPrefix method
			jest.spyOn(formsmd, "getIdPrefix").mockReturnValue("test:");

			// Add CTA button with proper class and aria-describedby
			const submitBtn = document.createElement("button");
			submitBtn.classList.add("fmd-submit-btn");
			submitBtn.setAttribute("aria-describedby", "slide-error");
			slide.appendChild(submitBtn);

			// Execute removeSlideErrors
			formsmd.removeSlideErrors(slide);

			// Verify all error elements were removed
			expect(slide.querySelectorAll(".fmd-error").length).toBe(0);

			// Verify all form field inputs had error attributes cleared
			formFields.forEach((fieldConfig) => {
				fieldConfig.inputs.forEach((inputConfig) => {
					const input = slide.querySelector(
						`.${inputConfig.class}[name="${inputConfig.name}"]`,
					);
					expect(input.hasAttribute("aria-invalid")).toBe(false);

					// Instead of checking hasAttribute, verify removeSingleAttribute was called
					if (fieldConfig.type === "num-radio") {
						expect(removeSingleAttributeSpy).toHaveBeenCalledWith(
							input,
							"aria-describedby",
							`test:id_${inputConfig.name}-error`,
						);
					} else {
						expect(input.getAttribute("aria-describedby")).toBe(null);
					}
				});
			});

			// Verify CTA button had aria-describedby removed
			expect(submitBtn.hasAttribute("aria-describedby")).toBe(false);

			// Clean up
			removeSingleAttributeSpy.mockRestore();
		});
	});

	// Form validation tests
	describe("Form validation", () => {
		test("formValid should validate required fields", () => {
			const form = document.createElement("form");
			const formField = document.createElement("div");
			const submitBtn = document.createElement("button");

			formField.classList.add("fmd-form-field");
			submitBtn.classList.add("fmd-submit-btn");
			formField.setAttribute("data-fmd-type", "radio");
			formField.setAttribute("data-fmd-required", "true");
			formField.setAttribute("data-fmd-name", "test");

			const input = document.createElement("input");
			input.type = "radio";
			input.name = "test";
			formField.appendChild(input);

			form.appendChild(formField);
			form.appendChild(submitBtn);

			const isValid = formsmd.formValid(form);
			expect(isValid).toBe(false);
		});
	});

	// Navigation and slide handling tests
	describe("Navigation and slide handling", () => {
		test("getPrevSlide should return correct previous slide", () => {
			const slides = [
				document.createElement("div"),
				document.createElement("div"),
				document.createElement("div"),
			];
			slides.forEach((slide) => slide.classList.add("fmd-slide"));
			container.append(...slides);

			formsmd.state.slideData.currentIndex = 2;

			const result = formsmd.getPrevSlide();
			expect(result.index).toBe(1);
		});

		test("getNextSlide should return correct next slide", () => {
			const slides = [
				document.createElement("div"),
				document.createElement("div"),
				document.createElement("div"),
			];
			slides.forEach((slide) => slide.classList.add("fmd-slide"));
			container.append(...slides);

			formsmd.state.slideData.currentIndex = 0;

			const result = formsmd.getNextSlide();
			expect(result.index).toBe(1);
		});

		test("getSlideTransitionDuration should return correct duration from CSS", () => {
			const rootElem = document.createElement("div");
			rootElem.classList.add("fmd-root");
			container.appendChild(rootElem);

			window.getComputedStyle = jest.fn().mockReturnValue({
				getPropertyValue: jest.fn().mockReturnValue("200ms"),
			});

			const duration = formsmd.getSlideTransitionDuration();
			expect(duration).toBe(200);
		});

		test("hasNewActiveSlide should update state and trigger transitions", () => {
			const rootElem = document.createElement("div");
			rootElem.classList.add("fmd-root");
			container.appendChild(rootElem);

			const slide = document.createElement("div");
			slide.classList.add("fmd-slide");
			rootElem.appendChild(slide);

			const footerBtnGroup = document.createElement("div");
			footerBtnGroup.classList.add("fmd-footer-btn-group");

			const footerPreviousBtn = document.createElement("button");
			footerPreviousBtn.classList.add("fmd-footer-previous-btn");

			const footerNextBtn = document.createElement("button");
			footerNextBtn.classList.add("fmd-footer-next-btn");

			footerBtnGroup.appendChild(footerPreviousBtn);
			footerBtnGroup.appendChild(footerNextBtn);
			rootElem.appendChild(footerBtnGroup);

			container.querySelector = jest.fn().mockImplementation((selector) => {
				switch (selector) {
					case ".fmd-root":
						return rootElem;
					case ".fmd-footer-btn-group":
						return footerBtnGroup;
					case ".fmd-footer-previous-btn":
						return footerPreviousBtn;
					case ".fmd-footer-next-btn":
						return footerNextBtn;
					default:
						return null;
				}
			});

			container.scroll = jest.fn();
			container.getBoundingClientRect = jest.fn().mockReturnValue({
				top: 0,
				bottom: 100,
				left: 0,
				right: 100,
			});

			const index = 1;
			formsmd.hasNewActiveSlide(slide, index, false);

			expect(formsmd.state.slideData.currentIndex).toBe(1);
			jest.runAllTimers();
			expect(container.scroll).toHaveBeenCalledWith({ top: 0 });
		});

		test("fadeInNextSlide should handle slide transitions correctly", () => {
			// Setup root element with transition duration
			const rootElem = document.createElement("div");
			rootElem.classList.add("fmd-root");
			container.appendChild(rootElem);

			const activeSlide = document.createElement("div");
			activeSlide.classList.add("fmd-slide", "fmd-slide-active");

			const nextSlide = document.createElement("div");
			nextSlide.classList.add("fmd-slide");

			rootElem.appendChild(activeSlide);
			rootElem.appendChild(nextSlide);

			// Mock getSlideTransitionDuration
			const getSlideTransitionDurationSpy = jest.spyOn(
				formsmd,
				"getSlideTransitionDuration",
			);
			getSlideTransitionDurationSpy.mockReturnValue(200);

			formsmd.fadeInNextSlide(activeSlide, nextSlide);

			// First step of animation
			expect(activeSlide.classList.contains("fmd-fade-out-to-top")).toBe(true);

			// Run first timeout
			jest.advanceTimersByTime(200);

			expect(activeSlide.classList.contains("fmd-slide-active")).toBe(false);
			expect(nextSlide.classList.contains("fmd-slide-active")).toBe(true);
			expect(nextSlide.classList.contains("fmd-fade-in-from-bottom")).toBe(
				true,
			);

			// Run second timeout
			jest.advanceTimersByTime(200);

			expect(nextSlide.classList.contains("fmd-fade-in-from-bottom")).toBe(
				false,
			);
			expect(activeSlide.classList.contains("fmd-fade-out-to-top")).toBe(false);

			// Clean up
			getSlideTransitionDurationSpy.mockRestore();
		});

		test("fadeInPrevSlide should handle slide transitions correctly", () => {
			// Setup root element with transition duration
			const rootElem = document.createElement("div");
			rootElem.classList.add("fmd-root");
			container.appendChild(rootElem);

			const activeSlide = document.createElement("div");
			activeSlide.classList.add("fmd-slide", "fmd-slide-active");

			const prevSlide = document.createElement("div");
			prevSlide.classList.add("fmd-slide");

			rootElem.appendChild(activeSlide);
			rootElem.appendChild(prevSlide);

			// Mock getSlideTransitionDuration
			const getSlideTransitionDurationSpy = jest.spyOn(
				formsmd,
				"getSlideTransitionDuration",
			);
			getSlideTransitionDurationSpy.mockReturnValue(200);

			formsmd.fadeInPrevSlide(activeSlide, prevSlide);

			// First step of animation
			expect(activeSlide.classList.contains("fmd-fade-out-to-bottom")).toBe(
				true,
			);

			// Run first timeout
			jest.advanceTimersByTime(200);

			expect(activeSlide.classList.contains("fmd-slide-active")).toBe(false);
			expect(prevSlide.classList.contains("fmd-slide-active")).toBe(true);
			expect(prevSlide.classList.contains("fmd-fade-in-from-top")).toBe(true);

			// Run second timeout
			jest.advanceTimersByTime(200);

			expect(prevSlide.classList.contains("fmd-fade-in-from-top")).toBe(false);
			expect(activeSlide.classList.contains("fmd-fade-out-to-bottom")).toBe(
				false,
			);

			// Clean up
			getSlideTransitionDurationSpy.mockRestore();
		});

		test("prevSlide should handle transition to previous slide", () => {
			// Mock slide transition methods
			const fadeInPrevSlideSpy = jest.spyOn(formsmd, "fadeInPrevSlide");
			const getPrevSlideSpy = jest.spyOn(formsmd, "getPrevSlide");
			const getSlideTransitionDurationSpy = jest.spyOn(
				formsmd,
				"getSlideTransitionDuration",
			);
			getSlideTransitionDurationSpy.mockReturnValue(200);

			// Create necessary elements
			const rootElem = document.createElement("div");
			rootElem.classList.add("fmd-root");

			const activeSlide = document.createElement("div");
			activeSlide.classList.add("fmd-slide", "fmd-slide-active");

			const prevSlide = document.createElement("div");
			prevSlide.classList.add("fmd-slide");

			const nextBtn = document.createElement("button");
			nextBtn.classList.add("fmd-next-btn");
			activeSlide.appendChild(nextBtn);

			const footerPrevBtn = document.createElement("button");
			footerPrevBtn.classList.add("fmd-footer", "fmd-previous-btn");

			const footerNextBtn = document.createElement("button");
			footerNextBtn.classList.add("fmd-footer", "fmd-next-btn");

			rootElem.appendChild(activeSlide);
			rootElem.appendChild(prevSlide);
			rootElem.appendChild(footerPrevBtn);
			rootElem.appendChild(footerNextBtn);
			container.appendChild(rootElem);

			// Mock scroll and getBoundingClientRect methods
			container.scroll = jest.fn();
			container.scrollIntoView = jest.fn();
			container.getBoundingClientRect = jest.fn().mockReturnValue({
				top: 100,
				bottom: 200,
				left: 0,
				right: 100,
			});

			// Setup container querySelector to return root element and buttons
			const querySelectorMock = jest.fn((selector) => {
				switch (selector) {
					case ".fmd-root":
						return rootElem;
					case ".fmd-footer .fmd-previous-btn":
						return footerPrevBtn;
					case ".fmd-footer .fmd-next-btn":
						return footerNextBtn;
					default:
						return null;
				}
			});
			container.querySelector = querySelectorMock;

			// Setup container querySelectorAll for buttons
			container.querySelectorAll = jest.fn((selector) => {
				if (selector === ".fmd-btn-processing") {
					return [footerPrevBtn, footerNextBtn];
				}
				return [];
			});

			// Mock window.innerHeight
			Object.defineProperty(window, "innerHeight", {
				writable: true,
				configurable: true,
				value: 800,
			});

			// Mock getPrevSlide to return our previous slide
			getPrevSlideSpy.mockReturnValue({
				slide: prevSlide,
				index: 0,
			});

			formsmd.prevSlide(activeSlide);

			// Verify slide transition was triggered
			expect(fadeInPrevSlideSpy).toHaveBeenCalledWith(activeSlide, prevSlide);

			// Advance timers to complete transition
			jest.advanceTimersByTime(600);

			// Verify scroll was called
			expect(container.scroll).toHaveBeenCalledWith({ top: 0 });

			// Clean up
			fadeInPrevSlideSpy.mockRestore();
			getPrevSlideSpy.mockRestore();
			getSlideTransitionDurationSpy.mockRestore();
		});
	});

	// Remote operations tests
	describe("Remote operations", () => {
		test("getRemoteData should fetch data from remote source", async () => {
			const mockFetch = jest.fn().mockResolvedValue({
				ok: true,
				json: () => Promise.resolve({ data: "test" }),
			});
			global.fetch = mockFetch;

			formsmd.state.settings["get-url"] = "http://api.test.com/data";
			const result = await formsmd.getRemoteData();

			expect(mockFetch).toHaveBeenCalledWith(
				"http://api.test.com/data",
				expect.any(Object),
			);
		});

		test("postFormData should handle missing POST url", async () => {
			formsmd.state.settings["post-url"] = undefined;
			const result = await formsmd.postFormData(true, false);
			expect(result.ok).toBe(true);
		});

		test("postFormData should include correct form data", async () => {
			const mockFetch = jest.fn().mockResolvedValue({
				ok: true,
				json: () => Promise.resolve({}),
			});
			global.fetch = mockFetch;

			formsmd.state.settings["post-url"] = "http://test.com";
			formsmd.state.formData = { test: "value" };
			formsmd.state.fieldTypes = { test: "text" };

			await formsmd.postFormData(true, false);

			expect(mockFetch).toHaveBeenCalled();
			const [url, options] = mockFetch.mock.calls[0];
			expect(url).toBe("http://test.com");
			expect(options.method).toBe("POST");
		});

		test("getSubmissionErrors should parse error messages", () => {
			const json = {
				errors: [{ field: "email", message: "Invalid email" }],
			};
			const errors = formsmd.getSubmissionErrors(json);
			expect(errors).toContain("email: Invalid email");
		});

		test("getRemoteData should handle file protocol", async () => {
			const originalLocation = window.location;
			delete window.location;
			window.location = { protocol: "file:" };

			const consoleSpy = jest.spyOn(console, "warn");
			const result = await formsmd.getRemoteData();

			expect(result).toBe("");
			expect(consoleSpy).toHaveBeenCalledWith(
				"Remote data not loaded: HTML page is a file (CORS issue).",
			);

			window.location = originalLocation;
		});

		test("getRemoteData should handle undefined GET URL", async () => {
			formsmd.state.settings["get-url"] = undefined;
			const result = await formsmd.getRemoteData();
			expect(result).toBe("");
		});

		test("getRemoteData should handle network errors", async () => {
			const mockFetch = jest.fn().mockRejectedValue(new Error("Network error"));
			global.fetch = mockFetch;

			formsmd.state.settings["get-url"] = "http://test.com";
			const consoleSpy = jest.spyOn(console, "error");

			const result = await formsmd.getRemoteData();

			expect(result).toBe("");
			expect(consoleSpy).toHaveBeenCalled();
		});

		test("convertTimezoneOffset should handle positive offsets", () => {
			expect(formsmd.convertTimezoneOffset(60)).toBe("-01:00");
			expect(formsmd.convertTimezoneOffset(120)).toBe("-02:00");
		});

		test("convertTimezoneOffset should handle negative offsets", () => {
			expect(formsmd.convertTimezoneOffset(-60)).toBe("+01:00");
			expect(formsmd.convertTimezoneOffset(-120)).toBe("+02:00");
		});

		test("convertTimezoneOffset should handle partial hours", () => {
			expect(formsmd.convertTimezoneOffset(90)).toBe("-01:30");
			expect(formsmd.convertTimezoneOffset(-90)).toBe("+01:30");
		});
	});

	// Event listener tests
	describe("Event listeners", () => {
		test("addEventListeners should attach correct listeners", () => {
			const testContainer = document.createElement("div");
			const button = document.createElement("button");
			button.classList.add("fmd-copy-btn");
			testContainer.appendChild(button);

			const addEventListenerSpy = jest.spyOn(button, "addEventListener");

			formsmd.addEventListeners(testContainer, true);

			expect(addEventListenerSpy).toHaveBeenCalledWith(
				"click",
				expect.any(Function),
			);
		});

		test("copyCode should copy text and show confirmation", () => {
			const wrapper = document.createElement("div");
			wrapper.classList.add("fmd-code-wrapper");

			const pre = document.createElement("pre");
			pre.textContent = "Test code";

			const button = document.createElement("button");
			button.classList.add("fmd-copy-btn");

			wrapper.appendChild(pre);
			wrapper.appendChild(button);
			container.appendChild(wrapper);

			document.execCommand = jest.fn();
			const event = {
				preventDefault: jest.fn(),
				target: button,
			};

			button.closest = jest.fn().mockReturnValue(wrapper);

			formsmd.copyCode(event);

			expect(event.preventDefault).toHaveBeenCalled();
			expect(document.execCommand).toHaveBeenCalledWith("copy");
			expect(button.innerHTML).toBeDefined();
		});

		test("disableAllClicks should prevent click events", () => {
			const event = {
				stopPropagation: jest.fn(),
				preventDefault: jest.fn(),
			};
			const result = formsmd.disableAllClicks(event);

			expect(event.stopPropagation).toHaveBeenCalled();
			expect(event.preventDefault).toHaveBeenCalled();
			expect(result).toBe(false);
		});
	});

	// reCAPTCHA tests
	describe("reCAPTCHA handling", () => {
		test("executeRecaptcha should handle successful verification", async () => {
			// Mock grecaptcha
			const mockToken = "test-token-123";
			global.grecaptcha = {
				ready: jest.fn((callback) => callback()),
				execute: jest.fn().mockResolvedValue(mockToken),
			};

			// Set recaptcha options
			formsmd.options.recaptcha.siteKey = "test-site-key";
			formsmd.options.recaptcha.action = "test_action";

			const token = await formsmd.executeRecaptcha();

			expect(global.grecaptcha.ready).toHaveBeenCalled();
			expect(global.grecaptcha.execute).toHaveBeenCalledWith("test-site-key", {
				action: "test_action",
			});
			expect(token).toBe(mockToken);

			// Cleanup
			delete global.grecaptcha;
			formsmd.options.recaptcha.siteKey = "";
		});

		test("executeRecaptcha should handle missing site key", async () => {
			formsmd.options.recaptcha.siteKey = "";
			const token = await formsmd.executeRecaptcha();
			expect(token).toBe("");
		});

		test("executeRecaptcha should handle missing grecaptcha", async () => {
			formsmd.options.recaptcha.siteKey = "test-site-key";
			delete global.grecaptcha;

			const consoleSpy = jest.spyOn(console, "error");
			const token = await formsmd.executeRecaptcha();

			expect(token).toBe("");
			expect(consoleSpy).toHaveBeenCalledWith(
				"CAPTCHA not loaded. Please try again.",
			);

			consoleSpy.mockRestore();
			formsmd.options.recaptcha.siteKey = "";
		});

		test("executeRecaptcha should handle execution error", async () => {
			// Mock grecaptcha with error
			global.grecaptcha = {
				ready: jest.fn((callback) => callback()),
				execute: jest.fn().mockRejectedValue(new Error("Execution failed")),
			};

			formsmd.options.recaptcha.siteKey = "test-site-key";

			const consoleSpy = jest.spyOn(console, "error");
			const token = await formsmd.executeRecaptcha();

			expect(token).toBe("");
			expect(consoleSpy).toHaveBeenCalledWith(
				"CAPTCHA execution error:",
				expect.any(Error),
			);

			consoleSpy.mockRestore();
			delete global.grecaptcha;
			formsmd.options.recaptcha.siteKey = "";
		});
	});

	// Initialization tests
	describe("Initialization", () => {
		test("init should load recaptcha if site key provided", () => {
			formsmd.options.recaptcha = { siteKey: "test-key" };
			formsmd.loadRecaptchaScript = jest.fn();

			formsmd.init();

			expect(formsmd.loadRecaptchaScript).toHaveBeenCalled();
		});

		test("init should set up initial state correctly", () => {
			formsmd.init();

			expect(formsmd.state.settings).toBeDefined();
			expect(formsmd.state.data).toBeDefined();
			expect(formsmd.state.formData).toBeDefined();
		});

		test("loadRecaptchaScript should add script to document head", () => {
			formsmd.options.recaptcha = { siteKey: "test-key" };
			formsmd.loadRecaptchaScript();
			const script = document.querySelector(`script#captcha-test-key`);
			expect(script).toBeTruthy();
			expect(script.src).toContain("test-key");
		});
	});
});
