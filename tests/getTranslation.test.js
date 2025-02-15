"use strict";

const { getTranslation } = require("../src/translations");

test("Case 1", () => {
	expect(getTranslation("en", "copy-btn")).toBe("Copy");
});

test("Case 2 (different localization)", () => {
	expect(getTranslation("bn", "copy-btn")).toBe("কপি");
});

test("Case 3 (missing localization)", () => {
	expect(getTranslation("some-random-localization", "copy-btn")).toBe("Copy");
});

test("Case 4 (missing key)", () => {
	expect(getTranslation("en", "some-random-key")).toBe("");
});

test("Case 5 (missing localization and key)", () => {
	expect(getTranslation("some-random-localization", "some-random-key")).toBe(
		"",
	);
});
