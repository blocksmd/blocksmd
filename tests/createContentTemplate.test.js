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
	class="bmd-slide bmd-first-slide"
>
	<div class="bmd-grid">
		<div class="bmd-form-field">
			<label class="bmd-form-question" for="id_name">
				What is your <span class="bmd-text-nowrap" aria-hidden="true">name?<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">name? (required)</span>
			</label>
			<input
				name="name"
				id="id_name"
				type="text"
				class="bmd-form-str-input bmd-form-control"
				placeholder="Type your answer here..."
				required
			>
		</div>
		<div class="bmd-col-4 bmd-grid" data-bmd-bind-name data-bmd-bind-age data-bmd-bind-template-ref="0">
			<p>Hello John, who is 30!</p>
		</div>
		<div class="bmd-next-controls bmd-d-flex">
			<button type="submit" class="bmd-submit-btn bmd-btn bmd-btn-accent bmd-d-flex bmd-align-items-center bmd-justify-content-center">
				OK
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon bmd-ms-2" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
			</button>
		</div>
	</div>
</form>
<div
	class="bmd-slide"
>
	<div class="bmd-grid">
		<p>Another paragraph with <span data-bmd-bind-name>John</span> and <span data-bmd-bind-age>30</span>.</p>
		<div class="bmd-grid" data-bmd-bind-something data-bmd-bind-template-ref="1">
			<p>Word</p>
		</div>
		<div class="bmd-next-controls bmd-d-flex">
			<button type="button" class="bmd-next-btn bmd-btn bmd-btn-accent bmd-d-flex bmd-align-items-center bmd-justify-content-center">
				Next
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="bmd-icon bmd-ms-2 bmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="bmd-icon bmd-ms-2 bmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
	</div>
</div>
<div
	class="bmd-slide bmd-end-slide"
>
	<div class="bmd-grid">
		<div class="bmd-text-center">
			<h1 class="bmd-h2 bmd-mb-2">Thank you</h1>
			<p class="bmd-fs-lead bmd-mb-1">Your response has been recorded. Thank you!</p>
		</div>
		<div class="bmd-next-controls bmd-d-flex bmd-justify-content-center">
			<button type="button" class="bmd-restart-btn bmd-btn bmd-btn-accent bmd-d-flex bmd-align-items-center bmd-justify-content-center">
				Restart
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="bmd-icon bmd-ms-2" aria-hidden="true" focusable="false"><path d="M472 224c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24s-24 10.7-24 24v80.1l-20-23.5C387 63.4 325.1 32 256 32C132.3 32 32 132.3 32 256s100.3 224 224 224c50.4 0 97-16.7 134.4-44.8c10.6-8 12.7-23 4.8-33.6s-23-12.7-33.6-4.8C332.2 418.9 295.7 432 256 432c-97.2 0-176-78.8-176-176s78.8-176 176-176c54.3 0 102.9 24.6 135.2 63.4l.1 .2 0 0L418.9 176H328c-13.3 0-24 10.7-24 24s10.7 24 24 24H472z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 1 (slides)", () => {
	const result1 = createContentTemplate(
		template1,
		{
			"color-scheme": "light",
			"css-prefix": "bmd-",
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
	expect(beautify(result1["template"], { format: "html" })).toBe(
		beautify(expectedTemplate1, { format: "html" }),
	);
	expect(result1["bindDivTemplates"]).toMatchObject({
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
<div class="bmd-single">
	<div class="bmd-grid">
		<div class="bmd-form-field">
			<label class="bmd-form-question" for="id_name">
				What is your <span class="bmd-text-nowrap" aria-hidden="true">name?<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">name? (required)</span>
			</label>
			<input
				name="name"
				id="id_name"
				type="text"
				class="bmd-form-str-input bmd-form-control"
				placeholder="Type your answer here..."
				required
			>
		</div>
		<p>Paragraph with <span data-bmd-bind-name>John</span> and <span data-bmd-bind-age>30</span>.</p>
		<div class="bmd-grid" data-bmd-bind-something data-bmd-bind-template-ref="0">
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
			"css-prefix": "bmd-",
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
	expect(beautify(result2["template"], { format: "html" })).toBe(
		beautify(expectedTemplate2, { format: "html" }),
	);
	expect(result2["bindDivTemplates"]).toMatchObject({
		0: "\n\nWord\n\n",
	});
});
