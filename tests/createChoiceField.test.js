"use strict";

const { createChoiceField } = require("../src/form-field-create");
const beautify = require("beautify");

// Case 1 (radio)

const expectedTemplate1 = `
<fieldset data-fmd-name="choice" data-fmd-type="radio" data-fmd-required id="some-id" class="fmd-col-6 fmd-xs:col-10 fmd-form-field fmd-form-field-sm fmd-form-field-classic-labels" aria-label="Label" data-title="Some title">
	<legend class="fmd-form-question">
		What is your <span class="fmd-text-nowrap" aria-hidden="true">choice?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">choice? (required)</span>
	</legend>
	<p class="fmd-form-description">
		Please choose.
	</p>
	<div class="fmd-check-grid-wrapper">
		<div class="fmd-check-grid">
			<div class="fmd-form-check">
				<input
					name="choice"
					id="id_choice-1"
					type="radio"
					class="fmd-form-str-check-input fmd-form-check-input"
					value="Choice A"
				>
				<label class="fmd-form-check-label" for="id_choice-1">
					Choice A
					<span class="fmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="fmd-form-check">
				<input
					name="choice"
					id="id_choice-2"
					type="radio"
					class="fmd-form-str-check-input fmd-form-check-input"
					value="Choice B"
				>
				<label class="fmd-form-check-label" for="id_choice-2">
					Choice B
					<span class="fmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="fmd-form-check">
				<input
					name="choice"
					id="id_choice-3"
					type="radio"
					class="fmd-form-str-check-input fmd-form-check-input"
					value="Choice C"
				>
				<label class="fmd-form-check-label" for="id_choice-3">
					Choice C
					<span class="fmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
		</div>
	</div>
</fieldset>
`;

test("Case 1 (radio)", () => {
	expect(
		beautify(
			createChoiceField(
				"choice",
				false,
				true,
				'id="some-id" class="fmd-col-6 fmd-xs:col-10" aria-label="Label" data-title="Some title"',
				`
					| question = What is your choice?
					| description = Please choose.
					| choices = Choice A, Choice B, Choice C,
					| fieldsize = sm
					| subfield
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate1, { format: "html" }));
});

// Case 2 (radio, not required, checked value, horizontal)

const expectedTemplate2 = `
<fieldset data-fmd-name="choice" data-fmd-type="radio" class="fmd-form-field">
	<legend class="fmd-form-question">
		What is your choice?
	</legend>
	<p class="fmd-form-description">
		Please choose.
	</p>
	<div class="fmd-check-grid-wrapper">
		<div class="fmd-check-grid fmd-check-grid-h">
			<div class="fmd-form-check">
				<input
					name="choice"
					id="id_choice-1"
					type="radio"
					class="fmd-form-str-check-input fmd-form-check-input"
					value="choice-a"
				>
				<label class="fmd-form-check-label" for="id_choice-1">
					Choice A
					<span class="fmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="fmd-form-check">
				<input
					name="choice"
					id="id_choice-2"
					type="radio"
					class="fmd-form-str-check-input fmd-form-check-input"
					value="choice-b"
					checked
				>
				<label class="fmd-form-check-label" for="id_choice-2">
					Choice B
					<span class="fmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="fmd-form-check">
				<input
					name="choice"
					id="id_choice-3"
					type="radio"
					class="fmd-form-str-check-input fmd-form-check-input"
					value="Choice C"
				>
				<label class="fmd-form-check-label" for="id_choice-3">
					Choice C
					<span class="fmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
		</div>
	</div>
</fieldset>
`;

test("Case 2 (radio, not required, checked value, horizontal)", () => {
	expect(
		beautify(
			createChoiceField(
				"choice",
				false,
				false,
				"",
				`
					| question = What is your choice?
					| description = Please choose.
					| choices = Choice A "choice-a", "choice-b" Choice B, Choice C,
					| checked = choice-b
					| horizontal
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate2, { format: "html" }));
});

// Case 3 (radio, multiple checked values)

const expectedTemplate3 = `
<fieldset data-fmd-name="choice" data-fmd-type="radio" data-fmd-required class="fmd-form-field">
	<legend class="fmd-form-question">
		What is your <span class="fmd-text-nowrap" aria-hidden="true">choice?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">choice? (required)</span>
	</legend>
	<p class="fmd-form-description">
		Please choose.
	</p>
	<div class="fmd-check-grid-wrapper">
		<div class="fmd-check-grid">
			<div class="fmd-form-check">
				<input
					name="choice"
					id="id_choice-1"
					type="radio"
					class="fmd-form-str-check-input fmd-form-check-input"
					value="Choice A"
					checked
					disabled
					data-fmd-autofocus
				>
				<label class="fmd-form-check-label" for="id_choice-1">
					Choice A
					<span class="fmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="fmd-form-check">
				<input
					name="choice"
					id="id_choice-2"
					type="radio"
					class="fmd-form-str-check-input fmd-form-check-input"
					value="choice-b"
					disabled
					data-fmd-autofocus
				>
				<label class="fmd-form-check-label" for="id_choice-2">
					Choice B
					<span class="fmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="fmd-form-check">
				<input
					name="choice"
					id="id_choice-3"
					type="radio"
					class="fmd-form-str-check-input fmd-form-check-input"
					value="Choice C"
					disabled
					data-fmd-autofocus
				>
				<label class="fmd-form-check-label" for="id_choice-3">
					Choice C
					<span class="fmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
		</div>
	</div>
</fieldset>
`;

test("Case 3 (radio, multiple checked values)", () => {
	expect(
		beautify(
			createChoiceField(
				"choice",
				false,
				true,
				"",
				`
					| question = What is your choice?
					| description = Please choose.
					| choices = 
						Choice A && https://example.com/a.png,
						Choice B "choice-b",
						Choice C && https://example.com/c.png,
					| checked = Choice A, Choice B, Choice C
					| disabled
					| autofocus
					| supersize
					| hidelabels
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate3, { format: "html" }));
});

// Case 4 (radio, picture choice, multiple checked values)

const expectedTemplate4 = `
<fieldset data-fmd-name="choice" data-fmd-type="radio" data-fmd-required class="fmd-form-field">
	<legend class="fmd-form-question">
		What is your <span class="fmd-text-nowrap" aria-hidden="true">choice?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">choice? (required)</span>
	</legend>
	<p class="fmd-form-description">
		Please choose.
	</p>
	<div class="fmd-check-grid-wrapper">
		<div class="fmd-check-grid fmd-check-grid-h fmd-check-grid-h-lg">
			<div class="fmd-form-check fmd-form-img-check">
				<input
					name="choice"
					id="id_choice-1"
					type="radio"
					class="fmd-form-str-check-input fmd-form-check-input"
					value="Choice A"
					checked
					disabled
					data-fmd-autofocus
				>
				<label class="fmd-form-check-label" for="id_choice-1">
					<span class="fmd-form-check-frame">
						<img src="https://example.com/a.png" alt="Choice A">
					</span>
					Choice A
					<span class="fmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="fmd-form-check fmd-form-img-check">
				<input
					name="choice"
					id="id_choice-2"
					type="radio"
					class="fmd-form-str-check-input fmd-form-check-input"
					value="choice-b"
					disabled
					data-fmd-autofocus
				>
				<label class="fmd-form-check-label" for="id_choice-2">
					<span class="fmd-form-check-frame">
						<img src="" alt="Choice B">
					</span>
					Choice B
					<span class="fmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="fmd-form-check fmd-form-img-check">
				<input
					name="choice"
					id="id_choice-3"
					type="radio"
					class="fmd-form-str-check-input fmd-form-check-input"
					value="Choice C"
					disabled
					data-fmd-autofocus
				>
				<label class="fmd-form-check-label" for="id_choice-3">
					<span class="fmd-form-check-frame">
						<img src="https://example.com/c.png" alt="Choice C">
					</span>
					Choice C
					<span class="fmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
		</div>
	</div>
</fieldset>
`;

test("Case 4 (radio, picture choice, multiple checked values)", () => {
	expect(
		beautify(
			createChoiceField(
				"choice",
				true,
				true,
				"",
				`
					| question = What is your choice?
					| description = Please choose.
					| choices = 
						Choice A &&      https://example.com/a.png   ,
								Choice B   "   choice-b ",
						Choice C &&       https://example.com/c.png		,
					| checked = 	Choice A  ,    Choice B  ,Choice C
					| disabled
					| autofocus
					| supersize
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate4, { format: "html" }));
});

// Case 5 (radio, picture choice, hide labels, different form delimiter)

const expectedTemplate5 = `
<fieldset data-fmd-name="choice" data-fmd-type="radio" id="some-id" class="fmd-col-6 fmd-xs:col-10 fmd-form-field" aria-label="Label" data-title="Some title">
	<legend class="fmd-form-question">
		What is your choice?
	</legend>
	<p class="fmd-form-description">
		Please choose.
	</p>
	<div class="fmd-check-grid-wrapper">
		<div class="fmd-check-grid fmd-check-grid-h">
			<div class="fmd-form-check fmd-form-img-check">
				<input
					name="choice"
					id="id_choice-1"
					type="radio"
					class="fmd-form-str-check-input fmd-form-check-input"
					value="Choice A"
					data-fmd-autofocus
				>
				<label class="fmd-form-check-label" for="id_choice-1">
					<span class="fmd-form-check-frame">
						<img src="https://example.com/a.png" alt="Choice A">
					</span>
					<span class="fmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="fmd-form-check fmd-form-img-check">
				<input
					name="choice"
					id="id_choice-2"
					type="radio"
					class="fmd-form-str-check-input fmd-form-check-input"
					value="choice-b"
					checked
					data-fmd-autofocus
				>
				<label class="fmd-form-check-label" for="id_choice-2">
					<span class="fmd-form-check-frame">
						<img src="" alt="Choice B">
					</span>
					<span class="fmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="fmd-form-check fmd-form-img-check">
				<input
					name="choice"
					id="id_choice-3"
					type="radio"
					class="fmd-form-str-check-input fmd-form-check-input"
					value="Choice C"
					data-fmd-autofocus
				>
				<label class="fmd-form-check-label" for="id_choice-3">
					<span class="fmd-form-check-frame">
						<img src="https://example.com/c.png" alt="Choice C">
					</span>
					<span class="fmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
		</div>
	</div>
</fieldset>
`;

test("Case 5 (radio, picture choice, hide labels, different form delimiter)", () => {
	expect(
		beautify(
			createChoiceField(
				"choice",
				true,
				false,
				'id="some-id" class="fmd-col-6 fmd-xs:col-10" aria-label="Label" data-title="Some title"',
				`
					question = What is your choice?
					description = Please choose.
					choices = Choice A &&      https://example.com/a.png   , Choice B   "   choice-b ",   Choice C &&       https://example.com/c.png		,
					checked = 	choice-b
					autofocus
					hidelabels
				`,
				"\n",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate5, { format: "html" }));
});

// Case 6 (checkbox)

const expectedTemplate6 = `
<fieldset data-fmd-name="choice" data-fmd-type="checkbox" data-fmd-required id="some-id" class="fmd-col-6 fmd-xs:col-10 fmd-form-field fmd-form-field-sm fmd-form-field-classic-labels" aria-label="Label" data-title="Some title">
	<legend class="fmd-form-question">
		What is your <span class="fmd-text-nowrap" aria-hidden="true">choice?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">choice? (required)</span>
	</legend>
	<p class="fmd-form-description">
		Please choose.
	</p>
	<div class="fmd-check-grid-wrapper">
		<div class="fmd-check-grid">
			<div class="fmd-form-check">
				<input
					name="choice"
					id="id_choice-1"
					type="checkbox"
					class="fmd-form-str-check-input fmd-form-check-input"
					value="Choice A"
				>
				<label class="fmd-form-check-label" for="id_choice-1">
					Choice A
					<span class="fmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="fmd-form-check">
				<input
					name="choice"
					id="id_choice-2"
					type="checkbox"
					class="fmd-form-str-check-input fmd-form-check-input"
					value="Choice B"
				>
				<label class="fmd-form-check-label" for="id_choice-2">
					Choice B
					<span class="fmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="fmd-form-check">
				<input
					name="choice"
					id="id_choice-3"
					type="checkbox"
					class="fmd-form-str-check-input fmd-form-check-input"
					value="Choice C"
				>
				<label class="fmd-form-check-label" for="id_choice-3">
					Choice C
					<span class="fmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
		</div>
	</div>
</fieldset>
`;

test("Case 6 (checkbox)", () => {
	expect(
		beautify(
			createChoiceField(
				"choice",
				false,
				true,
				'id="some-id" class="fmd-col-6 fmd-xs:col-10" aria-label="Label" data-title="Some title"',
				`
					| question = What is your choice?
					| description = Please choose.
					| choices = Choice A, Choice B, Choice C,
					| multiple
					| fieldsize = sm
					| subfield
					| hideFormText
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate6, { format: "html" }));
});

// Case 7 (checkbox, not required, checked values, horizontal, different id and localization)

const expectedTemplate7 = `
<fieldset data-fmd-name="choice" data-fmd-type="checkbox" class="fmd-form-field">
	<legend class="fmd-form-question">
		What is your choice?
	</legend>
	<p class="fmd-form-description">
		Please choose.
	</p>
	<div class="fmd-form-text">
		এক বা একাধিক নির্বাচন করুন
	</div>
	<div class="fmd-check-grid-wrapper">
		<div class="fmd-check-grid fmd-check-grid-h">
			<div class="fmd-form-check">
				<input
					name="choice"
					id="page_123456:id_choice-1"
					type="checkbox"
					class="fmd-form-str-check-input fmd-form-check-input"
					value="choice-a"
				>
				<label class="fmd-form-check-label" for="page_123456:id_choice-1">
					Choice A
					<span class="fmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="fmd-form-check">
				<input
					name="choice"
					id="page_123456:id_choice-2"
					type="checkbox"
					class="fmd-form-str-check-input fmd-form-check-input"
					value="choice-b"
					checked
				>
				<label class="fmd-form-check-label" for="page_123456:id_choice-2">
					Choice B
					<span class="fmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="fmd-form-check">
				<input
					name="choice"
					id="page_123456:id_choice-3"
					type="checkbox"
					class="fmd-form-str-check-input fmd-form-check-input"
					value="Choice C"
					checked
				>
				<label class="fmd-form-check-label" for="page_123456:id_choice-3">
					Choice C
					<span class="fmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
		</div>
	</div>
</fieldset>
`;

test("Case 7 (checkbox, not required, checked values, horizontal, different id and localization)", () => {
	expect(
		beautify(
			createChoiceField(
				"choice",
				false,
				false,
				"",
				`
					| question = What is your choice?
					| description = Please choose.
					| choices = Choice A "choice-a", "choice-b" Choice B, Choice C,
					| checked = Choice A, choice-b, Choice C, Choice D,
					| horizontal
					| multiple
				`,
				"|",
				"page_123456",
				"bn",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate7, { format: "html" }));
});

// Case 8 (checkbox, picture choice)

const expectedTemplate8 = `
<fieldset data-fmd-name="choice" data-fmd-type="checkbox" data-fmd-required class="fmd-form-field">
	<legend class="fmd-form-question">
		What is your <span class="fmd-text-nowrap" aria-hidden="true">choice?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">choice? (required)</span>
	</legend>
	<p class="fmd-form-description">
		Please choose.
	</p>
	<div class="fmd-form-text">
		Choose as many as you like
	</div>
	<div class="fmd-check-grid-wrapper">
		<div class="fmd-check-grid fmd-check-grid-h fmd-check-grid-h-lg">
			<div class="fmd-form-check fmd-form-img-check">
				<input
					name="choice"
					id="id_choice-1"
					type="checkbox"
					class="fmd-form-str-check-input fmd-form-check-input"
					value="Choice A"
					checked
					disabled
					data-fmd-autofocus
				>
				<label class="fmd-form-check-label" for="id_choice-1">
					<span class="fmd-form-check-frame">
						<img src="https://example.com/a.png" alt="Choice A">
					</span>
					Choice A
					<span class="fmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="fmd-form-check fmd-form-img-check">
				<input
					name="choice"
					id="id_choice-2"
					type="checkbox"
					class="fmd-form-str-check-input fmd-form-check-input"
					value="choice-b"
					disabled
					data-fmd-autofocus
				>
				<label class="fmd-form-check-label" for="id_choice-2">
					<span class="fmd-form-check-frame">
						<img src="" alt="Choice B">
					</span>
					Choice B
					<span class="fmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="fmd-form-check fmd-form-img-check">
				<input
					name="choice"
					id="id_choice-3"
					type="checkbox"
					class="fmd-form-str-check-input fmd-form-check-input"
					value="Choice C"
					disabled
					data-fmd-autofocus
				>
				<label class="fmd-form-check-label" for="id_choice-3">
					<span class="fmd-form-check-frame">
						<img src="https://example.com/c.png" alt="Choice C">
					</span>
					Choice C
					<span class="fmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
		</div>
	</div>
</fieldset>
`;

test("Case 8 (checkbox, picture choice)", () => {
	expect(
		beautify(
			createChoiceField(
				"choice",
				true,
				true,
				"",
				`
					| question = What is your choice?
					| description = Please choose.
					| choices = 
						Choice A &&      https://example.com/a.png   ,
								Choice B   "   choice-b ",
						Choice C &&       https://example.com/c.png		,
					| checked = 	Choice A  
					| disabled
					| autofocus
					| supersize
					| multiple
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate8, { format: "html" }));
});

// Case 9 (no params)

const expectedTemplate9 = `
<fieldset data-fmd-name="choice" data-fmd-type="radio" data-fmd-required class="fmd-form-field">
	<legend class="fmd-form-question">
		<span class="fmd-text-nowrap" aria-hidden="true">...<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">... (required)</span>
	</legend>
	<div class="fmd-check-grid-wrapper">
		<div class="fmd-check-grid">
		</div>
	</div>
</fieldset>
`;

test("Case 9 (no params)", () => {
	expect(
		beautify(createChoiceField("choice", false, true, "", "", "|", "", "en"), {
			format: "html",
		}),
	).toBe(beautify(expectedTemplate9, { format: "html" }));
});

// Case 10 (picture choice, no params)

const expectedTemplate10 = `
<fieldset data-fmd-name="choice" data-fmd-type="radio" data-fmd-required class="fmd-form-field">
	<legend class="fmd-form-question">
		<span class="fmd-text-nowrap" aria-hidden="true">...<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">... (required)</span>
	</legend>
	<div class="fmd-check-grid-wrapper">
		<div class="fmd-check-grid fmd-check-grid-h">
		</div>
	</div>
</fieldset>
`;

test("Case 10 (picture choice, no params)", () => {
	expect(
		beautify(createChoiceField("choice", true, true, "", "", "|", "", "en"), {
			format: "html",
		}),
	).toBe(beautify(expectedTemplate10, { format: "html" }));
});
