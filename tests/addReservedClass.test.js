"use strict";

const { addReservedClass } = require("../src/attrs-parse");

test("Case 1 (no class attribute)", () => {
	expect(addReservedClass("<div>", "fmd-grid")).toBe('<div class="fmd-grid">');
});

test("Case 2 (other classes exist)", () => {
	expect(
		addReservedClass('<div class="fmd-text-center fmd-col-6">', "fmd-grid"),
	).toBe('<div class="fmd-text-center fmd-col-6 fmd-grid">');
});

test("Case 3 (other classes and attributes exist)", () => {
	expect(
		addReservedClass(
			'<div id="some-id" class="fmd-text-center fmd-col-6" aria-label="Label">',
			"fmd-form-field",
		),
	).toBe(
		'<div id="some-id" class="fmd-text-center fmd-col-6 fmd-form-field" aria-label="Label">',
	);
});

test("Case 4 (class name already exists)", () => {
	expect(
		addReservedClass('<div class="fmd-text-center fmd-grid">', "fmd-grid"),
	).toBe('<div class="fmd-text-center fmd-grid">');
});

test("Case 5 (weird formatting of class name)", () => {
	expect(
		addReservedClass('<div class="fmd-text-center fmd-col-6">', "   fmd-grid	"),
	).toBe('<div class="fmd-text-center fmd-col-6 fmd-grid">');
});

test("Case 6 (class name empty)", () => {
	expect(addReservedClass('<div class="fmd-text-center fmd-col-6">', "")).toBe(
		'<div class="fmd-text-center fmd-col-6">',
	);
});

test("Case 7 (class name only white-space)", () => {
	expect(
		addReservedClass('<div class="fmd-text-center fmd-col-6">', "  	"),
	).toBe('<div class="fmd-text-center fmd-col-6">');
});
