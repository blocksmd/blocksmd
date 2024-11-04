import { Composer } from "./composer";

// Initialize the Composer with some settings
const composer = new Composer({
	accent: "#007bff",
	accentForeground: "#ffffff",
	backgroundColor: "#f8f9fa",
	title: "Complete Form Demo",
	page: "form-slides",
});

// Regular text input
composer.textInput("name", {
	question: "What's your name?",
	description: "Please enter your full name",
	placeholder: "John Doe",
	required: true,
});

// Text input with attributes
composer.textInput("username", {
	question: "Choose a username",
	description: "This will be your unique identifier",
	placeholder: "johndoe123",
	required: true,
	id: "username-field",
	classNames: ["custom-input", "highlight"],
	attrs: [
		{ name: "data-testid", value: "username-input" },
		{ name: "autocomplete", value: "username" },
	],
});

// Email inputs
composer.emailInput("personal_email", {
	question: "Personal Email Address",
	placeholder: "you@example.com",
});

composer.emailInput("work_email", {
	question: "Work Email Address",
	placeholder: "you@company.com",
	id: "work-email",
	classNames: ["work-contact"],
	attrs: [{ name: "data-department", value: "employee" }],
});

// Number inputs
composer.numberInput("age", {
	question: "Your Age",
	min: 18,
	max: 120,
});

composer.numberInput("salary", {
	question: "Expected Salary",
	min: 30000,
	max: 200000,
	unit: "$",
	id: "salary-input",
	classNames: ["salary-field"],
	attrs: [{ name: "data-currency", value: "USD" }],
});

// Select boxes
composer.selectBox("country", {
	question: "Select your country",
	options: ["United States", "Canada", "United Kingdom", "Australia"],
});

composer.selectBox("industry", {
	question: "Select your industry",
	options: [
		{ label: "Technology", value: "tech" },
		{ label: "Healthcare", value: "health" },
		{ label: "Finance", value: "finance" },
	],
	id: "industry-select",
	classNames: ["industry-field"],
	attrs: [{ name: "data-group", value: "professional" }],
});

// Choice inputs
composer.choiceInput("interests", {
	question: "Select your interests",
	choices: ["Reading", "Gaming", "Sports", "Music"],
	multiple: true,
});

composer.choiceInput("experience", {
	question: "Years of experience",
	choices: [
		{ label: "Entry Level (0-2 years)", value: "entry" },
		{ label: "Mid Level (3-5 years)", value: "mid" },
		{ label: "Senior Level (6+ years)", value: "senior" },
	],
	id: "experience-choice",
	classNames: ["experience-field"],
	attrs: [{ name: "data-type", value: "radio" }],
});

// Rating inputs
composer.ratingInput("satisfaction", {
	question: "How satisfied are you with our service?",
	outOf: 5,
});

composer.ratingInput("recommendation", {
	question: "How likely are you to recommend us?",
	outOf: 10,
	icon: "star",
	id: "recommend-rating",
	classNames: ["rating-field"],
	attrs: [{ name: "data-category", value: "feedback" }],
});

// Date inputs
composer.dateInput("birth_date", {
	question: "Date of Birth",
	max: "2006-01-01",
});

composer.dateInput("start_date", {
	question: "Preferred Start Date",
	min: "2024-01-01",
	id: "start-date",
	classNames: ["date-field"],
	attrs: [{ name: "data-scheduling", value: "true" }],
});

// Divs
composer.divStart();
composer.h2("Personal Information");
composer.p("Please fill out all required fields marked with an asterisk (*).");
composer.divEnd();

composer.div("Custom content section", {
	id: "custom-section",
	classNames: ["content-wrapper"],
	attrs: [{ name: "data-section", value: "custom" }],
});

// HTML Lists
composer.ul([
	"First unordered item",
	"Second unordered item",
	"Third unordered item",
]);

composer.ul(["Premium feature 1", "Premium feature 2", "Premium feature 3"], {
	id: "features-list",
	classNames: ["feature-list"],
	attrs: [{ name: "data-type", value: "features" }],
});

composer.ol([
	"First ordered step",
	"Second ordered step",
	"Third ordered step",
]);

composer.ol(["Step 1: Register", "Step 2: Configure", "Step 3: Deploy"], {
	id: "steps-list",
	classNames: ["steps-list"],
	attrs: [{ name: "data-tutorial", value: "setup" }],
});

// Headings
composer.h1("Welcome to our Form");
composer.h1("Important Section", {
	id: "main-heading",
	classNames: ["title-main"],
	attrs: [{ name: "data-section", value: "intro" }],
});

// Paragraphs
composer.p("This is a simple paragraph.");
composer.p("This is a styled paragraph with custom attributes.", {
	id: "custom-para",
	classNames: ["text-large"],
	attrs: [{ name: "data-content", value: "custom" }],
});

// Code blocks
composer.code("console.log('Hello World');", {
	language: "javascript",
});

composer.code(
	`
function example() {
  return "This is a sample function";
}
`,
	{
		language: "javascript",
		id: "code-block",
		classNames: ["code-example"],
		attrs: [{ name: "data-syntax", value: "js" }],
	},
);

// Get the complete template
console.log(composer.template);
