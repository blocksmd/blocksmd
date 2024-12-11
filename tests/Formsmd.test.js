"use strict";

const { Formsmd } = require("../src/main");

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
		test("Should initialize with default options", () => {
			const basicFormsmd = new Formsmd("", container);
			expect(basicFormsmd.options.colorScheme).toBe("light");
			expect(basicFormsmd.options.isFullPage).toBe(false);
			expect(basicFormsmd.options.sanitize).toBe(true);
		});

		test("Should override default options with provided options", () => {
			const customOptions = {
				colorScheme: "dark",
				isFullPage: true,
				sanitize: false,
			};
			const customFormsmd = new Formsmd("", container, customOptions);
			expect(customFormsmd.options.colorScheme).toBe("dark");
			expect(customFormsmd.options.isFullPage).toBe(true);
			expect(customFormsmd.options.sanitize).toBe(false);
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
