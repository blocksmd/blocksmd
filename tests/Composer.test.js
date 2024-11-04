("use strict");

const { Composer } = require("../src/composer");
const { getDefaultSettings } = require("../src/settings-parse");

// Constructor test

const allSettings = {
	autofocus: "all-slides",
	accent: "#FF0000",
	accentForeground: "#FFFFFF",
	backdropOpacity: "0.5",
	backgroundColor: "#F0F0F0",
	backgroundImage: "url(bg.jpg)",
	blocksmdBranding: "hide",
	brand: "![Logo](logo.png)",
	color: "#000000",
	colorScheme: "dark",
	colorSchemeScope: "isolate",
	colorSchemeToggle: "show",
	cssPrefix: "custom-",
	cta: "[Click Here](https://example.com)",
	dir: "rtl",
	favicon: "favicon.ico",
	fieldSize: "sm",
	fontFamily: "Arial, sans-serif",
	fontImportUrl: "https://fonts.googleapis.com/css2?family=Open+Sans",
	fontSize: "sm",
	formDelimiter: "|",
	footer: "hide",
	getFormat: "json",
	getObjectsName: "data",
	getUrl: "https://api.example.com/data",
	header: "hide",
	headings: "anchored",
	id: "form-1",
	labelStyle: "classic",
	localization: "en",
	metaAuthor: "John Doe",
	metaDescription: "A test form",
	metaImage: "og-image.jpg",
	metaKeywords: "test, form",
	metaType: "website",
	metaUrl: "https://example.com",
	page: "form-slides",
	pageProgress: "hide",
	postSheetName: "Responses",
	postUrl: "https://api.example.com/submit",
	rounded: "pill",
	slideControls: "hide",
	slideDelimiter: "---",
	title: "Test Form",
	verticalAlignment: "start",
};

const expectedTemplate = `
#! autofocus = all-slides
#! accent = #FF0000
#! accent-foreground = #FFFFFF
#! backdrop-opacity = 0.5
#! background-color = #F0F0F0
#! background-image = url(bg.jpg)
#! blocksmd-branding = hide
#! brand = ![Logo](logo.png)
#! color = #000000
#! color-scheme = dark
#! color-scheme-scope = isolate
#! color-scheme-toggle = show
#! css-prefix = custom-
#! cta = [Click Here](https://example.com)
#! dir = rtl
#! favicon = favicon.ico
#! field-size = sm
#! font-family = Arial, sans-serif
#! font-import-url = https://fonts.googleapis.com/css2?family=Open+Sans
#! font-size = sm
#! form-delimiter = |
#! footer = hide
#! get-format = json
#! get-objects-name = data
#! get-url = https://api.example.com/data
#! header = hide
#! headings = anchored
#! id = form-1
#! label-style = classic
#! localization = en
#! meta-author = John Doe
#! meta-description = A test form
#! meta-image = og-image.jpg
#! meta-keywords = test, form
#! meta-type = website
#! meta-url = https://example.com
#! page = form-slides
#! page-progress = hide
#! post-sheet-name = Responses
#! post-url = https://api.example.com/submit
#! rounded = pill
#! slide-controls = hide
#! slide-delimiter = ---
#! title = Test Form
#! vertical-alignment = start
`;

test("Constructor with all settings", () => {
	// Template
	const composer = new Composer(allSettings);
	expect(composer.constructor(allSettings)).toBe(expectedTemplate);

	// Settings
	const defaultSettings = {};
	for (const [name, value] of Object.entries(getDefaultSettings())) {
		defaultSettings[
			name.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
		] = value;
	}
	expect(composer.settings).toEqual({
		...defaultSettings,
		...allSettings,
	});

	// Passed settings
	expect(composer.passedSettings).toEqual(allSettings);
});

// Text input test

const expectedTextTemplate = `
[#text-field .col-6 .xs:col-8 aria-label="Text Input"]
text* = TextInput(
	| question = Text
	| description = Enter some text
	| fieldSize = sm
	| labelStyle = classic
	| subfield
	| disabled
	| autofocus
	| placeholder = Placeholder
	| multiline
	| maxlength = 255
	| pattern = Pattern
	| value = Value
)
`;

test("Text input with all parameters", () => {
	const composer = new Composer();
	expect(
		composer.textInput("text", {
			question: "Text",
			required: true,
			description: "Enter some text",
			fieldSize: "sm",
			labelStyle: "classic",
			subfield: true,
			disabled: true,
			autofocus: true,
			id: "text-field",
			classNames: ["col-6", "xs:col-8"],
			attrs: [{ name: "aria-label", value: "Text Input" }],
			placeholder: "Placeholder",
			multiline: true,
			maxlength: 255,
			pattern: "Pattern",
			value: "Value",
		}),
	).toBe(expectedTextTemplate);
});

// Email input test

const expectedEmailTemplate = `
[#email-field .col-6 .xs:col-8 aria-label="Email input"]
email* = EmailInput(
	| question = Email Address
	| description = Enter your email
	| fieldSize = sm
	| labelStyle = classic
	| subfield
	| disabled
	| autofocus
	| placeholder = example@domain.com
	| maxlength = 100
	| pattern = [^@]+@[^@]+
	| value = test@example.com
)
`;

test("Email input with all parameters", () => {
	const composer = new Composer();
	expect(
		composer.emailInput("email", {
			question: "Email Address",
			required: true,
			description: "Enter your email",
			fieldSize: "sm",
			labelStyle: "classic",
			subfield: true,
			disabled: true,
			autofocus: true,
			id: "email-field",
			classNames: ["col-6", "xs:col-8"],
			attrs: [{ name: "aria-label", value: "Email input" }],
			placeholder: "example@domain.com",
			maxlength: 100,
			pattern: "[^@]+@[^@]+",
			value: "test@example.com",
		}),
	).toBe(expectedEmailTemplate);
});

// URL input test

const expectedURLTemplate = `
[#url-field .col-6 .xs:col-8 aria-label="URL input"]
website* = URLInput(
	| question = Website URL
	| description = Enter your website
	| fieldSize = sm
	| labelStyle = classic
	| subfield
	| disabled
	| autofocus
	| placeholder = https://example.com
	| maxlength = 200
	| pattern = https?://.*
	| value = https://test.com
)
`;

test("URL input with all parameters", () => {
	const composer = new Composer();
	expect(
		composer.urlInput("website", {
			question: "Website URL",
			required: true,
			description: "Enter your website",
			fieldSize: "sm",
			labelStyle: "classic",
			subfield: true,
			disabled: true,
			autofocus: true,
			id: "url-field",
			classNames: ["col-6", "xs:col-8"],
			attrs: [{ name: "aria-label", value: "URL input" }],
			placeholder: "https://example.com",
			maxlength: 200,
			pattern: "https?://.*",
			value: "https://test.com",
		}),
	).toBe(expectedURLTemplate);
});

// Telephone input test

const expectedTelTemplate = `
[#tel-field .col-6 .xs:col-8 aria-label="Phone input"]
phone* = TelInput(
	| question = Phone Number
	| description = Enter your phone number
	| fieldSize = sm
	| labelStyle = classic
	| subfield
	| disabled
	| autofocus
	| placeholder = (555) 555-5555
	| maxlength = 15
	| pattern = \\d{10}
	| value = 5555555555
	| country = US
	| availableCountries = US, CA, GB
)
`;

test("Telephone input with all parameters", () => {
	const composer = new Composer();
	expect(
		composer.telInput("phone", {
			question: "Phone Number",
			required: true,
			description: "Enter your phone number",
			fieldSize: "sm",
			labelStyle: "classic",
			subfield: true,
			disabled: true,
			autofocus: true,
			id: "tel-field",
			classNames: ["col-6", "xs:col-8"],
			attrs: [{ name: "aria-label", value: "Phone input" }],
			placeholder: "(555) 555-5555",
			maxlength: 15,
			pattern: "\\d{10}",
			value: "5555555555",
			country: "US",
			availableCountries: ["US", "CA", "GB"],
		}),
	).toBe(expectedTelTemplate);
});

// Number input test

const expectedNumberTemplate = `
[#number-field .col-6 .xs:col-8 aria-label="Number input"]
amount* = NumberInput(
	| question = Amount
	| description = Enter the amount
	| fieldSize = sm
	| labelStyle = classic
	| subfield
	| disabled
	| autofocus
	| placeholder = Enter amount
	| min = 0
	| max = 1000
	| step = 0.01
	| unit = $
	| unitend = USD
	| value = 100
)
`;

test("Number input with all parameters", () => {
	const composer = new Composer();
	expect(
		composer.numberInput("amount", {
			question: "Amount",
			required: true,
			description: "Enter the amount",
			fieldSize: "sm",
			labelStyle: "classic",
			subfield: true,
			disabled: true,
			autofocus: true,
			id: "number-field",
			classNames: ["col-6", "xs:col-8"],
			attrs: [{ name: "aria-label", value: "Number input" }],
			placeholder: "Enter amount",
			min: 0,
			max: 1000,
			step: 0.01,
			unit: "$",
			unitEnd: "USD",
			value: 100,
		}),
	).toBe(expectedNumberTemplate);
});

// Select box test

const expectedSelectTemplate = `
[#select-field .col-6 .xs:col-8 aria-label="Select input"]
country* = SelectBox(
	| question = Select Country
	| description = Choose your country
	| fieldSize = sm
	| labelStyle = classic
	| subfield
	| disabled
	| autofocus
	| placeholder = Choose a country
	| options = "us" United States, Canada, "gb" United Kingdom
	| selected = us
)
`;

test("Select box with all parameters", () => {
	const composer = new Composer();
	expect(
		composer.selectBox("country", {
			question: "Select Country",
			required: true,
			description: "Choose your country",
			fieldSize: "sm",
			labelStyle: "classic",
			subfield: true,
			disabled: true,
			autofocus: true,
			id: "select-field",
			classNames: ["col-6", "xs:col-8"],
			attrs: [{ name: "aria-label", value: "Select input" }],
			placeholder: "Choose a country",
			options: [
				{ label: "United States", value: "us" },
				"Canada",
				{ label: "United Kingdom", value: "gb" },
			],
			selected: "us",
		}),
	).toBe(expectedSelectTemplate);
});

// Select box with simple string options

const expectedSelectSimpleTemplate = `
[#select-simple .col-6 .xs:col-8]
country* = SelectBox(
	| question = Simple Select
	| description = Choose an option
	| placeholder = Select country
	| options = USA, Canada, UK
	| selected = USA
)
`;

test("Select box with simple string options", () => {
	const composer = new Composer();
	expect(
		composer.selectBox("country", {
			question: "Simple Select",
			required: true,
			description: "Choose an option",
			id: "select-simple",
			classNames: ["col-6", "xs:col-8"],
			placeholder: "Select country",
			options: ["USA", "Canada", "UK"],
			selected: "USA",
		}),
	).toBe(expectedSelectSimpleTemplate);
});

// Choice input test

const expectedChoiceTemplate = `
[#choice-field .col-6 .xs:col-8 aria-label="Choice input"]
colors* = ChoiceInput(
	| question = Select Colors
	| description = Choose your favorite colors
	| fieldSize = sm
	| labelStyle = classic
	| subfield
	| disabled
	| autofocus
	| choices = "red" Red, "blue" Blue, Green
	| multiple
	| horizontal
	| checked = red, blue
)
`;

test("Choice input with all parameters", () => {
	const composer = new Composer();
	expect(
		composer.choiceInput("colors", {
			question: "Select Colors",
			required: true,
			description: "Choose your favorite colors",
			fieldSize: "sm",
			labelStyle: "classic",
			subfield: true,
			disabled: true,
			autofocus: true,
			id: "choice-field",
			classNames: ["col-6", "xs:col-8"],
			attrs: [{ name: "aria-label", value: "Choice input" }],
			choices: [
				{ label: "Red", value: "red" },
				{ label: "Blue", value: "blue" },
				"Green",
			],
			multiple: true,
			horizontal: true,
			checked: ["red", "blue"],
		}),
	).toBe(expectedChoiceTemplate);
});

// Choice input with simple string choices

const expectedChoiceSimpleTemplate = `
[#choice-simple .col-6 .xs:col-8]
colors* = ChoiceInput(
	| question = Simple Choice
	| description = Pick colors
	| choices = Red, Blue, Green
	| multiple
	| checked = Red, Blue
)
`;

test("Choice input with simple string choices", () => {
	const composer = new Composer();
	expect(
		composer.choiceInput("colors", {
			question: "Simple Choice",
			required: true,
			description: "Pick colors",
			id: "choice-simple",
			classNames: ["col-6", "xs:col-8"],
			choices: ["Red", "Blue", "Green"],
			multiple: true,
			checked: ["Red", "Blue"],
		}),
	).toBe(expectedChoiceSimpleTemplate);
});

// Picture choice test

const expectedPictureTemplate = `
[#picture-field .col-6 .xs:col-8 aria-label="Picture input"]
theme* = PictureChoice(
	| question = Select Theme
	| description = Choose your theme
	| fieldSize = sm
	| labelStyle = classic
	| subfield
	| disabled
	| autofocus
	| choices = "light" Light && /light.png, "dark" Dark && /dark.png
	| multiple
	| supersize
	| hidelabels
	| checked = light
)
`;

test("Picture choice with all parameters", () => {
	const composer = new Composer();
	expect(
		composer.pictureChoice("theme", {
			question: "Select Theme",
			required: true,
			description: "Choose your theme",
			fieldSize: "sm",
			labelStyle: "classic",
			subfield: true,
			disabled: true,
			autofocus: true,
			id: "picture-field",
			classNames: ["col-6", "xs:col-8"],
			attrs: [{ name: "aria-label", value: "Picture input" }],
			choices: [
				{ label: "Light", value: "light", image: "/light.png" },
				{ label: "Dark", value: "dark", image: "/dark.png" },
			],
			multiple: true,
			supersize: true,
			hideLabels: true,
			checked: ["light"],
		}),
	).toBe(expectedPictureTemplate);
});

// Picture choice with simple string choices and images

const expectedPictureSimpleTemplate = `
[#picture-simple .col-6 .xs:col-8]
theme* = PictureChoice(
	| question = Simple Picture Choice
	| description = Pick a theme
	| choices = Light && /themes/light.jpg, Dark && /themes/dark.jpg
	| checked = Light
)
`;

test("Picture choice with simple string choices and images", () => {
	const composer = new Composer();
	expect(
		composer.pictureChoice("theme", {
			question: "Simple Picture Choice",
			required: true,
			description: "Pick a theme",
			id: "picture-simple",
			classNames: ["col-6", "xs:col-8"],
			choices: [
				{ label: "Light", image: "/themes/light.jpg" },
				{ label: "Dark", image: "/themes/dark.jpg" },
			],
			checked: ["Light"],
		}),
	).toBe(expectedPictureSimpleTemplate);
});

// Rating input test

const expectedRatingTemplate = `
[#rating-field .col-6 .xs:col-8 aria-label="Rating input"]
satisfaction* = RatingInput(
	| question = Rate your satisfaction
	| description = How satisfied are you?
	| fieldSize = sm
	| labelStyle = classic
	| subfield
	| disabled
	| autofocus
	| outof = 10
	| icon = heart
	| value = 8
	| hidelabels
)
`;

test("Rating input with all parameters", () => {
	const composer = new Composer();
	expect(
		composer.ratingInput("satisfaction", {
			question: "Rate your satisfaction",
			required: true,
			description: "How satisfied are you?",
			fieldSize: "sm",
			labelStyle: "classic",
			subfield: true,
			disabled: true,
			autofocus: true,
			id: "rating-field",
			classNames: ["col-6", "xs:col-8"],
			attrs: [{ name: "aria-label", value: "Rating input" }],
			outOf: 10,
			icon: "heart",
			value: 8,
			hideLabels: true,
		}),
	).toBe(expectedRatingTemplate);
});

// Opinion scale test

const expectedOpinionTemplate = `
[#opinion-field .col-6 .xs:col-8 aria-label="Opinion input"]
agreement* = OpinionScale(
	| question = Rate your agreement
	| description = How much do you agree?
	| fieldSize = sm
	| labelStyle = classic
	| subfield
	| disabled
	| autofocus
	| startat = 1
	| outof = 7
	| labelstart = Strongly Disagree
	| labelend = Strongly Agree
	| hidelabelstart
	| hidelabelend
	| value = 5
)
`;

test("Opinion scale with all parameters", () => {
	const composer = new Composer();
	expect(
		composer.opinionScale("agreement", {
			question: "Rate your agreement",
			required: true,
			description: "How much do you agree?",
			fieldSize: "sm",
			labelStyle: "classic",
			subfield: true,
			disabled: true,
			autofocus: true,
			id: "opinion-field",
			classNames: ["col-6", "xs:col-8"],
			attrs: [{ name: "aria-label", value: "Opinion input" }],
			startAt: 1,
			outOf: 7,
			labelStart: "Strongly Disagree",
			labelEnd: "Strongly Agree",
			hideLabelStart: true,
			hideLabelEnd: true,
			value: 5,
		}),
	).toBe(expectedOpinionTemplate);
});

// Datetime input test

const expectedDatetimeTemplate = `
[#datetime-field .col-6 .xs:col-8 aria-label="Datetime input"]
meeting* = DatetimeInput(
	| question = Meeting Time
	| description = Select meeting date and time
	| fieldSize = sm
	| labelStyle = classic
	| subfield
	| disabled
	| autofocus
	| placeholder = Select date and time
	| min = 2024-01-01T09:00
	| max = 2024-12-31T17:00
	| step = 1800
	| value = 2024-03-15T14:30
)
`;

test("Datetime input with all parameters", () => {
	const composer = new Composer();
	expect(
		composer.datetimeInput("meeting", {
			question: "Meeting Time",
			required: true,
			description: "Select meeting date and time",
			fieldSize: "sm",
			labelStyle: "classic",
			subfield: true,
			disabled: true,
			autofocus: true,
			id: "datetime-field",
			classNames: ["col-6", "xs:col-8"],
			attrs: [{ name: "aria-label", value: "Datetime input" }],
			placeholder: "Select date and time",
			min: "2024-01-01T09:00",
			max: "2024-12-31T17:00",
			step: "1800",
			value: "2024-03-15T14:30",
		}),
	).toBe(expectedDatetimeTemplate);
});

// Date input test

const expectedDateTemplate = `
[#date-field .col-6 .xs:col-8 aria-label="Date input"]
birthday* = DateInput(
	| question = Birth Date
	| description = Enter your birth date
	| fieldSize = sm
	| labelStyle = classic
	| subfield
	| disabled
	| autofocus
	| placeholder = Select date
	| min = 1900-01-01
	| max = 2024-12-31
	| step = 1
	| value = 2000-01-01
)
`;

test("Date input with all parameters", () => {
	const composer = new Composer();
	expect(
		composer.dateInput("birthday", {
			question: "Birth Date",
			required: true,
			description: "Enter your birth date",
			fieldSize: "sm",
			labelStyle: "classic",
			subfield: true,
			disabled: true,
			autofocus: true,
			id: "date-field",
			classNames: ["col-6", "xs:col-8"],
			attrs: [{ name: "aria-label", value: "Date input" }],
			placeholder: "Select date",
			min: "1900-01-01",
			max: "2024-12-31",
			step: "1",
			value: "2000-01-01",
		}),
	).toBe(expectedDateTemplate);
});

// Time input test

const expectedTimeTemplate = `
[#time-field .col-6 .xs:col-8 aria-label="Time input"]
startTime* = TimeInput(
	| question = Start Time
	| description = Select start time
	| fieldSize = sm
	| labelStyle = classic
	| subfield
	| disabled
	| autofocus
	| placeholder = Select time
	| min = 09:00
	| max = 17:00
	| step = 900
	| value = 13:00
)
`;

test("Time input with all parameters", () => {
	const composer = new Composer();
	expect(
		composer.timeInput("startTime", {
			question: "Start Time",
			required: true,
			description: "Select start time",
			fieldSize: "sm",
			labelStyle: "classic",
			subfield: true,
			disabled: true,
			autofocus: true,
			id: "time-field",
			classNames: ["col-6", "xs:col-8"],
			attrs: [{ name: "aria-label", value: "Time input" }],
			placeholder: "Select time",
			min: "09:00",
			max: "17:00",
			step: "900",
			value: "13:00",
		}),
	).toBe(expectedTimeTemplate);
});

// File input test

const expectedFileTemplate = `
[#file-field .col-6 .xs:col-8 aria-label="File input"]
attachment* = FileInput(
	| question = Upload File
	| description = Upload your document
	| fieldSize = sm
	| labelStyle = classic
	| subfield
	| disabled
	| autofocus
	| sizelimit = 5
	| imageonly
)
`;

test("File input with all parameters", () => {
	const composer = new Composer();
	expect(
		composer.fileInput("attachment", {
			question: "Upload File",
			required: true,
			description: "Upload your document",
			fieldSize: "sm",
			labelStyle: "classic",
			subfield: true,
			disabled: true,
			autofocus: true,
			id: "file-field",
			classNames: ["col-6", "xs:col-8"],
			attrs: [{ name: "aria-label", value: "File input" }],
			sizeLimit: 5,
			imageOnly: true,
		}),
	).toBe(expectedFileTemplate);
});

// Additional test with different form delimiter for each input type
test("Input fields with different form delimiter", () => {
	const composer = new Composer({ formDelimiter: "\n" });

	// Text input
	const expectedTextSimple = `
text = TextInput(
	question = Text
	description = Enter text
)
`;
	expect(
		composer.textInput("text", {
			question: "Text",
			description: "Enter text",
		}),
	).toBe(expectedTextSimple);

	// Email input
	const expectedEmailSimple = `
email = EmailInput(
	question = Email
	description = Enter email
)
`;
	expect(
		composer.emailInput("email", {
			question: "Email",
			description: "Enter email",
		}),
	).toBe(expectedEmailSimple);

	// URL input
	const expectedUrlSimple = `
url = URLInput(
	question = Website
	description = Enter website
)
`;
	expect(
		composer.urlInput("url", {
			question: "Website",
			description: "Enter website",
		}),
	).toBe(expectedUrlSimple);

	// Telephone input
	const expectedTelSimple = `
tel = TelInput(
	question = Phone
	description = Enter phone
)
`;
	expect(
		composer.telInput("tel", {
			question: "Phone",
			description: "Enter phone",
		}),
	).toBe(expectedTelSimple);

	// Number input
	const expectedNumberSimple = `
number = NumberInput(
	question = Amount
	description = Enter amount
)
`;
	expect(
		composer.numberInput("number", {
			question: "Amount",
			description: "Enter amount",
		}),
	).toBe(expectedNumberSimple);

	// Select box
	const expectedSelectSimple = `
select = SelectBox(
	question = Select
	description = Make selection
	options = Option 1, Option 2
)
`;
	expect(
		composer.selectBox("select", {
			question: "Select",
			description: "Make selection",
			options: ["Option 1", "Option 2"],
		}),
	).toBe(expectedSelectSimple);

	// Choice input
	const expectedChoiceSimple = `
choice = ChoiceInput(
	question = Choose
	description = Make choice
	choices = Choice 1, Choice 2
)
`;
	expect(
		composer.choiceInput("choice", {
			question: "Choose",
			description: "Make choice",
			choices: ["Choice 1", "Choice 2"],
		}),
	).toBe(expectedChoiceSimple);

	// Picture choice
	const expectedPictureSimple = `
picture = PictureChoice(
	question = Select Picture
	description = Choose picture
	choices = Option 1 && /img1.png, Option 2 && /img2.png
)
`;
	expect(
		composer.pictureChoice("picture", {
			question: "Select Picture",
			description: "Choose picture",
			choices: [
				{ label: "Option 1", image: "/img1.png" },
				{ label: "Option 2", image: "/img2.png" },
			],
		}),
	).toBe(expectedPictureSimple);

	// Rating input
	const expectedRatingSimple = `
rating = RatingInput(
	question = Rate
	description = Give rating
	outof = 5
)
`;
	expect(
		composer.ratingInput("rating", {
			question: "Rate",
			description: "Give rating",
			outOf: 5,
		}),
	).toBe(expectedRatingSimple);

	// Opinion Scale input
	const expectedOpinionSimple = `
opinion = OpinionScale(
	question = Opinion
	description = Share opinion
	outof = 7
	labelstart = Low
	labelend = High
)
`;
	expect(
		composer.opinionScale("opinion", {
			question: "Opinion",
			description: "Share opinion",
			outOf: 7,
			labelStart: "Low",
			labelEnd: "High",
		}),
	).toBe(expectedOpinionSimple);

	// Datetime input
	const expectedDatetimeSimple = `
datetime = DatetimeInput(
	question = Date and Time
	description = Select datetime
)
`;
	expect(
		composer.datetimeInput("datetime", {
			question: "Date and Time",
			description: "Select datetime",
		}),
	).toBe(expectedDatetimeSimple);

	// Date input
	const expectedDateSimple = `
date = DateInput(
	question = Date
	description = Select date
)
`;
	expect(
		composer.dateInput("date", {
			question: "Date",
			description: "Select date",
		}),
	).toBe(expectedDateSimple);

	// Time input
	const expectedTimeSimple = `
time = TimeInput(
	question = Time
	description = Select time
)
`;
	expect(
		composer.timeInput("time", {
			question: "Time",
			description: "Select time",
		}),
	).toBe(expectedTimeSimple);

	// File input
	const expectedFileSimple = `
file = FileInput(
	question = Upload
	description = Select file
)
`;
	expect(
		composer.fileInput("file", {
			question: "Upload",
			description: "Select file",
		}),
	).toBe(expectedFileSimple);
});
