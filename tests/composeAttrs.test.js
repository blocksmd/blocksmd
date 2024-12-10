"use strict";

const { composeAttrs } = require("../src/composer");

// Case 1

test("Case 1", () => {
	expect(
		composeAttrs({
			id: "my-form-field",
			classNames: ["col-6", "xs:col-6", "text-accent"],
			attrs: [
				{ name: "aria-label", value: "Label" },
				{ name: "data-fmd-attr", value: "some value" },
			],
		}),
	).toMatchObject([
		"#my-form-field",
		".col-6",
		".xs:col-6",
		".text-accent",
		'aria-label="Label"',
		'data-fmd-attr="some value"',
	]);
});

// Case 2

test("Case 2", () => {
	expect(
		composeAttrs({
			classNames: ["fw-bold"],
		}),
	).toMatchObject([".fw-bold"]);
});

// Case 3

test("Case 3", () => {
	expect(composeAttrs({})).toMatchObject([]);
});
