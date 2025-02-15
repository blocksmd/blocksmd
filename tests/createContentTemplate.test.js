"use strict";

const { createContentTemplate } = require("../src/templates-create");
const beautify = require("beautify");

// The function being tested is composed of calling other smaller functions
// Therefore, the tests only really makes sure that the function runs properly
// As in, without any obvious syntax or reference errors

// Case 1 (slides)

const template1 = `
name* = TextInput(
	| question = What is your name?
)

::: [.col-4 {$ name age $}]
Hello {{ name }}, who is {{ age }}!
:::

---

Another paragraph with {$ name $} and {$ age $}.

::: [{$ something $}]
Word
:::
`;
const expectedTemplate1 = `
<form
	method="POST"
	action="javascript:void(0);"
	class="fmd-slide fmd-first-slide"
>
	<div class="fmd-grid">
		<div class="fmd-form-field">
			<label class="fmd-form-question" for="id_name">
				What is your <span class="fmd-text-nowrap" aria-hidden="true">name?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">name? (required)</span>
			</label>
			<input
				name="name"
				id="id_name"
				type="text"
				class="fmd-form-str-input fmd-form-control"
				placeholder="Type your answer here..."
				required
			>
		</div>
		<div class="fmd-col-4 fmd-grid" data-fmd-bind-name data-fmd-bind-age data-fmd-bind-template-ref="0">
			<p>Hello John, who is 30!</p>
		</div>
		<div class="fmd-next-controls fmd-d-flex">
			<button type="submit" class="fmd-submit-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				OK
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon fmd-ms-2" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
			</button>
		</div>
	</div>
</form>
<div
	class="fmd-slide"
>
	<div class="fmd-grid">
		<p>Another paragraph with <span data-fmd-bind-name>John</span> and <span data-fmd-bind-age>30</span>.</p>
		<div class="fmd-grid" data-fmd-bind-something data-fmd-bind-template-ref="1">
			<p>Word</p>
		</div>
		<div class="fmd-next-controls fmd-d-flex">
			<button type="button" class="fmd-next-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				Next
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
	</div>
</div>
<div
	class="fmd-slide fmd-end-slide"
>
	<div class="fmd-grid">
		<div class="fmd-text-center">
			<h1 class="fmd-h2 fmd-mb-2">Thank you</h1>
			<p class="fmd-fs-lead fmd-mb-1">Your response has been recorded.</p>
		</div>
	</div>
</div>
`;

test("Case 1 (slides)", () => {
	const result1 = createContentTemplate(
		template1,
		{
			"color-scheme": "light",
			"css-prefix": "fmd-",
			"form-delimiter": "|",
			"get-format": "csv",
			"get-objects-name": "objects",
			"localization": "en",
			"page": "form-slides",
			"slide-delimiter": "---",
		},
		{
			name: "John",
			age: 30,
		},
		false,
	);
	expect(beautify(result1.template, { format: "html" })).toBe(
		beautify(expectedTemplate1, { format: "html" }),
	);
	expect(result1.bindDivTemplates).toMatchObject({
		0: "\n\nHello {{ name }}, who is {{ age }}!\n\n",
		1: "\n\nWord\n\n",
	});
});

// Case 2 (single)

const template2 = `
name* = TextInput(
	| question = What is your name?
)

Paragraph with {$ name $} and {$ age $}.

::: [{$ something $}]
Word
:::
`;
const expectedTemplate2 = `
<div class="fmd-single">
	<div class="fmd-grid">
		<div class="fmd-form-field">
			<label class="fmd-form-question" for="id_name">
				What is your <span class="fmd-text-nowrap" aria-hidden="true">name?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">name? (required)</span>
			</label>
			<input
				name="name"
				id="id_name"
				type="text"
				class="fmd-form-str-input fmd-form-control"
				placeholder="Type your answer here..."
				required
			>
		</div>
		<p>Paragraph with <span data-fmd-bind-name>John</span> and <span data-fmd-bind-age>30</span>.</p>
		<div class="fmd-grid" data-fmd-bind-something data-fmd-bind-template-ref="0">
			<p>Word</p>
		</div>
	</div>
</div>
`;

test("Case 2 (single)", () => {
	const result2 = createContentTemplate(
		template2,
		{
			"color-scheme": "light",
			"css-prefix": "fmd-",
			"form-delimiter": "|",
			"get-format": "csv",
			"get-objects-name": "objects",
			"localization": "en",
			"page": "single",
			"slide-delimiter": "---",
		},
		{
			name: "John",
			age: 30,
		},
		false,
	);
	expect(beautify(result2.template, { format: "html" })).toBe(
		beautify(expectedTemplate2, { format: "html" }),
	);
	expect(result2.bindDivTemplates).toMatchObject({
		0: "\n\nWord\n\n",
	});
});
