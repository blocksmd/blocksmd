"use strict";

const { getPhoneNumberPlaceholder } = require("../src/phone-numbers");

test("Case 1", () => {
	expect(getPhoneNumberPlaceholder("US")).toBe("(201) 555-0123");
});

test("Case 2 (lower case country code)", () => {
	expect(getPhoneNumberPlaceholder("bd")).toBe("01812-345678");
});

test("Case 3 (non-existent country code)", () => {
	expect(getPhoneNumberPlaceholder("DOES NOT EXIST")).toBe("(201) 555-0123");
});

test("Case 4 (empty string country code)", () => {
	expect(getPhoneNumberPlaceholder("")).toBe("(201) 555-0123");
});
