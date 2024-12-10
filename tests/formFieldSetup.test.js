"use strict";

const { formFieldSetup } = require("../src/form-field-create");

test("Case 1", () => {
	expect(
		formFieldSetup(
			true,
			'id="some-id" class="fmd-col-4 fmd-xs:col-6" aria-label="Label" data-title="Some title"',
			`
				| question = What is your name?
				| description = Please enter your full name.
				| fieldsize = sm
				| subfield
				| placeholder = Type in your name here...
				| maxlength = 255
			`,
			"|",
			"en",
			false,
		),
	).toMatchObject({
		startTag:
			'<div id="some-id" class="fmd-col-4 fmd-xs:col-6 fmd-form-field fmd-form-field-sm fmd-form-field-classic-labels" aria-label="Label" data-title="Some title">',
		validParams: {
			question:
				'What is your <span class="fmd-text-nowrap" aria-hidden="true">name?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">name? (required)</span>',
			description: "Please enter your full name.",
			fieldsize: "sm",
			subfield: true,
		},
		restParams: {
			placeholder: "Type in your name here...",
			maxlength: "255",
		},
	});
});

test("Case 2 (no parsed attrbiutes, less params, weird formatting)", () => {
	expect(
		formFieldSetup(
			true,
			"",
			`
				|
				| fieldsize = sm
				| placeholder = Placeholder
				| multiline
				|
			`,
			"|",
			"en",
			false,
		),
	).toMatchObject({
		startTag: '<div class="fmd-form-field fmd-form-field-sm">',
		validParams: {
			question:
				'<span class="fmd-text-nowrap" aria-hidden="true">...<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">... (required)</span>',
			fieldsize: "sm",
		},
		restParams: {
			placeholder: "Placeholder",
			multiline: true,
		},
	});
});

test("Case 3 (form delimiter set to new line)", () => {
	expect(
		formFieldSetup(
			false,
			'id="some-id" class="fmd-col-4 fmd-xs:col-6" aria-label="Label" data-title="Some title"',
			`
				question = What is your name?
				description = Please enter your full name.
				fieldsize = sm
				subfield
				placeholder = Type in your name here...
				maxlength = 255
			`,
			"\n",
			"en",
			false,
		),
	).toMatchObject({
		startTag:
			'<div id="some-id" class="fmd-col-4 fmd-xs:col-6 fmd-form-field fmd-form-field-sm fmd-form-field-classic-labels" aria-label="Label" data-title="Some title">',
		validParams: {
			question: "What is your name?",
			description: "Please enter your full name.",
			fieldsize: "sm",
			subfield: true,
		},
		restParams: {
			placeholder: "Type in your name here...",
			maxlength: "255",
		},
	});
});

test("Case 4", () => {
	expect(
		formFieldSetup(
			false,
			'id="some-id" class="fmd-col-8"',
			"question = Address Line 1 | subfield",
			"|",
			"en",
			false,
		),
	).toMatchObject({
		startTag:
			'<div id="some-id" class="fmd-col-8 fmd-form-field fmd-form-field-classic-labels">',
		validParams: {
			question: "Address Line 1",
			subfield: true,
		},
		restParams: {},
	});
});

test("Case 5 (use fieldset)", () => {
	expect(
		formFieldSetup(
			true,
			'id="some-id" class="fmd-col-4 fmd-xs:col-6" aria-label="Label" data-title="Some title"',
			`
				| question = What is your name?
				| description = Please enter your full name.
				| fieldsize = sm
				| subfield
				| placeholder = Type in your name here...
				| maxlength = 255
			`,
			"|",
			"en",
			true,
		),
	).toMatchObject({
		startTag:
			'<fieldset id="some-id" class="fmd-col-4 fmd-xs:col-6 fmd-form-field fmd-form-field-sm fmd-form-field-classic-labels" aria-label="Label" data-title="Some title">',
		validParams: {
			question:
				'What is your <span class="fmd-text-nowrap" aria-hidden="true">name?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">name? (required)</span>',
			description: "Please enter your full name.",
			fieldsize: "sm",
			subfield: true,
		},
		restParams: {
			placeholder: "Type in your name here...",
			maxlength: "255",
		},
	});
});
