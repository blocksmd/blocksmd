"use strict";

const { addReservedClass } = require("../src/attrs-parse");

test("Case 1 (no class attribute)", () => {
	expect(addReservedClass("<div>", "bmd-grid")).toBe('<div class="bmd-grid">');
});

test("Case 2 (other classes exist)", () => {
	expect(
		addReservedClass('<div class="bmd-text-center bmd-col-6">', "bmd-grid"),
	).toBe('<div class="bmd-text-center bmd-col-6 bmd-grid">');
});

test("Case 3 (other classes and attributes exist)", () => {
	expect(
		addReservedClass(
			'<div id="some-id" class="bmd-text-center bmd-col-6" aria-label="Label">',
			"bmd-form-field",
		),
	).toBe(
		'<div id="some-id" class="bmd-text-center bmd-col-6 bmd-form-field" aria-label="Label">',
	);
});

test("Case 4 (class name already exists)", () => {
	expect(
		addReservedClass('<div class="bmd-text-center bmd-grid">', "bmd-grid"),
	).toBe('<div class="bmd-text-center bmd-grid">');
});

test("Case 5 (weird formatting of class name)", () => {
	expect(
		addReservedClass('<div class="bmd-text-center bmd-col-6">', "   bmd-grid	"),
	).toBe('<div class="bmd-text-center bmd-col-6 bmd-grid">');
});

test("Case 6 (class name empty)", () => {
	expect(addReservedClass('<div class="bmd-text-center bmd-col-6">', "")).toBe(
		'<div class="bmd-text-center bmd-col-6">',
	);
});

test("Case 7 (class name only white-space)", () => {
	expect(
		addReservedClass('<div class="bmd-text-center bmd-col-6">', "  	"),
	).toBe('<div class="bmd-text-center bmd-col-6">');
});
