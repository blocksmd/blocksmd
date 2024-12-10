"use strict";

const { translate } = require("../src/composer");

// Case 1

test("Case 1", () => {
	const translations = {
		en: "Hello",
		es: "Hola",
		fr: "Bonjour",
	};
	expect(translate("en", translations)).toBe("Hello");
	expect(translate("es", translations)).toBe("Hola");
	expect(translate("fr", translations)).toBe("Bonjour");
});

// Case 2 (first available translation for unknown localization)

test("Case 2 (first available translation for unknown localization)", () => {
	const translations = {
		en: "Hello",
		es: "Hola",
	};
	expect(translate("de", translations)).toBe("Hello");
});

// Case 3 (empty translations object)

test("Case 3 (empty translations object)", () => {
	expect(translate("en", {})).toBeUndefined();
});

// Case 4 (invalid inputs)

test("Case 4 (invalid inputs)", () => {
	const translations = {
		en: "Hello",
		es: "Hola",
	};
	expect(translate(null, translations)).toBe("Hello");
	expect(translate(undefined, translations)).toBe("Hello");
});
