"use strict";

const { _ } = require("../src/composer");

// Case 1

test("Case 1", () => {
	const translations = {
		en: "Hello",
		es: "Hola",
		fr: "Bonjour",
	};
	expect(_("en", translations)).toBe("Hello");
	expect(_("es", translations)).toBe("Hola");
	expect(_("fr", translations)).toBe("Bonjour");
});

// Case 2 (first available translation for unknown localization)

test("Case 2 (first available translation for unknown localization)", () => {
	const translations = {
		en: "Hello",
		es: "Hola",
	};
	expect(_("de", translations)).toBe("Hello");
});

// Case 3 (empty translations object)

test("Case 3 (empty translations object)", () => {
	expect(_("en", {})).toBeUndefined();
});

// Case 4 (invalid inputs)

test("Case 4 (invalid inputs)", () => {
	const translations = {
		en: "Hello",
		es: "Hola",
	};
	expect(_(null, translations)).toBe("Hello");
	expect(_(undefined, translations)).toBe("Hello");
});
