"use strict";

const { parseColor } = require("../src/settings-parse");

test("Case 1 (name)", () => {
	expect(parseColor("aliceblue")).toBe("240, 248, 255");
});

test("Case 2 (hex code)", () => {
	expect(parseColor("#f0f8ff")).toBe("240, 248, 255");
});

test("Case 3 (hex code capitalized)", () => {
	expect(parseColor("#F0F8FF")).toBe("240, 248, 255");
});

test("Case 4 (hex code three characters)", () => {
	expect(parseColor("#f0f")).toBe("255, 0, 255");
});

test("Case 5 (RGB)", () => {
	expect(parseColor("rgb(0, 15, 240)")).toBe("0, 15, 240");
});

test("Case 6 (not a color)", () => {
	expect(() => parseColor("some-random-non-color")).toThrow(
		"Not a valid color (name, hex code, or RGB)",
	);
});
