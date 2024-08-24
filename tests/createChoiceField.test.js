("use strict");

const { createChoiceField } = require("../src/form-field-create");
const beautify = require("beautify");

// Case 1 (radio)

const expectedTemplate1 = `
<fieldset data-bmd-name="choice" data-bmd-type="radio" data-bmd-required id="some-id" class="bmd-col-6 bmd-xs:col-10 bmd-form-field bmd-form-field-sm bmd-form-subfield" aria-label="Label" data-title="Some title">
	<legend class="bmd-form-question">
		What is your <span class="bmd-text-nowrap" aria-hidden="true">choice?<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">choice? (required)</span>
	</legend>
	<p class="bmd-form-description">
		Please choose.
	</p>
	<div class="bmd-check-grid-wrapper">
		<div class="bmd-check-grid">
			<div class="bmd-form-check">
				<input
					name="choice"
					id="id_choice-1"
					type="radio"
					class="bmd-form-check-input"
					value="Choice A"
				>
				<label class="bmd-form-check-label" for="id_choice-1">
					Choice A
					<span class="bmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="bmd-form-check">
				<input
					name="choice"
					id="id_choice-2"
					type="radio"
					class="bmd-form-check-input"
					value="Choice B"
				>
				<label class="bmd-form-check-label" for="id_choice-2">
					Choice B
					<span class="bmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="bmd-form-check">
				<input
					name="choice"
					id="id_choice-3"
					type="radio"
					class="bmd-form-check-input"
					value="Choice C"
				>
				<label class="bmd-form-check-label" for="id_choice-3">
					Choice C
					<span class="bmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
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
				'id="some-id" class="bmd-col-6 bmd-xs:col-10" aria-label="Label" data-title="Some title"',
				`
					| question = What is your choice?
					| description = Please choose.
					| choices = Choice A, Choice B, Choice C,
					| fieldsize = sm
					| subfield
				`,
				"|",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate1, { format: "html" }));
});

// Case 2 (radio, not required, checked value, horizontal)

const expectedTemplate2 = `
<fieldset data-bmd-name="choice" data-bmd-type="radio" class="bmd-form-field">
	<legend class="bmd-form-question">
		What is your choice?
	</legend>
	<p class="bmd-form-description">
		Please choose.
	</p>
	<div class="bmd-check-grid-wrapper">
		<div class="bmd-check-grid bmd-check-grid-h">
			<div class="bmd-form-check">
				<input
					name="choice"
					id="id_choice-1"
					type="radio"
					class="bmd-form-check-input"
					value="choice-a"
				>
				<label class="bmd-form-check-label" for="id_choice-1">
					Choice A
					<span class="bmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="bmd-form-check">
				<input
					name="choice"
					id="id_choice-2"
					type="radio"
					class="bmd-form-check-input"
					value="choice-b"
					checked
				>
				<label class="bmd-form-check-label" for="id_choice-2">
					Choice B
					<span class="bmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="bmd-form-check">
				<input
					name="choice"
					id="id_choice-3"
					type="radio"
					class="bmd-form-check-input"
					value="Choice C"
				>
				<label class="bmd-form-check-label" for="id_choice-3">
					Choice C
					<span class="bmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
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
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate2, { format: "html" }));
});

// Case 3 (radio, multiple checked values)

const expectedTemplate3 = `
<fieldset data-bmd-name="choice" data-bmd-type="radio" data-bmd-required class="bmd-form-field">
	<legend class="bmd-form-question">
		What is your <span class="bmd-text-nowrap" aria-hidden="true">choice?<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">choice? (required)</span>
	</legend>
	<p class="bmd-form-description">
		Please choose.
	</p>
	<div class="bmd-check-grid-wrapper">
		<div class="bmd-check-grid">
			<div class="bmd-form-check">
				<input
					name="choice"
					id="id_choice-1"
					type="radio"
					class="bmd-form-check-input"
					value="Choice A"
					checked
					disabled
					data-bmd-autofocus
				>
				<label class="bmd-form-check-label" for="id_choice-1">
					Choice A
					<span class="bmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="bmd-form-check">
				<input
					name="choice"
					id="id_choice-2"
					type="radio"
					class="bmd-form-check-input"
					value="choice-b"
					disabled
					data-bmd-autofocus
				>
				<label class="bmd-form-check-label" for="id_choice-2">
					Choice B
					<span class="bmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="bmd-form-check">
				<input
					name="choice"
					id="id_choice-3"
					type="radio"
					class="bmd-form-check-input"
					value="Choice C"
					disabled
					data-bmd-autofocus
				>
				<label class="bmd-form-check-label" for="id_choice-3">
					Choice C
					<span class="bmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
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
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate3, { format: "html" }));
});

// Case 4 (radio, picture choice, multiple checked values)

const expectedTemplate4 = `
<fieldset data-bmd-name="choice" data-bmd-type="radio" data-bmd-required class="bmd-form-field">
	<legend class="bmd-form-question">
		What is your <span class="bmd-text-nowrap" aria-hidden="true">choice?<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">choice? (required)</span>
	</legend>
	<p class="bmd-form-description">
		Please choose.
	</p>
	<div class="bmd-check-grid-wrapper">
		<div class="bmd-check-grid bmd-check-grid-h bmd-check-grid-h-lg">
			<div class="bmd-form-check bmd-form-img-check">
				<input
					name="choice"
					id="id_choice-1"
					type="radio"
					class="bmd-form-check-input"
					value="Choice A"
					checked
					disabled
					data-bmd-autofocus
				>
				<label class="bmd-form-check-label" for="id_choice-1">
					<span class="bmd-form-check-frame">
						<img src="https://example.com/a.png" alt="Choice A">
					</span>
					Choice A
					<span class="bmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="bmd-form-check bmd-form-img-check">
				<input
					name="choice"
					id="id_choice-2"
					type="radio"
					class="bmd-form-check-input"
					value="choice-b"
					disabled
					data-bmd-autofocus
				>
				<label class="bmd-form-check-label" for="id_choice-2">
					<span class="bmd-form-check-frame">
						<img src="" alt="Choice B">
					</span>
					Choice B
					<span class="bmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="bmd-form-check bmd-form-img-check">
				<input
					name="choice"
					id="id_choice-3"
					type="radio"
					class="bmd-form-check-input"
					value="Choice C"
					disabled
					data-bmd-autofocus
				>
				<label class="bmd-form-check-label" for="id_choice-3">
					<span class="bmd-form-check-frame">
						<img src="https://example.com/c.png" alt="Choice C">
					</span>
					Choice C
					<span class="bmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
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
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate4, { format: "html" }));
});

// Case 5 (radio, picture choice, hide labels, different form delimiter)

const expectedTemplate5 = `
<fieldset data-bmd-name="choice" data-bmd-type="radio" id="some-id" class="bmd-col-6 bmd-xs:col-10 bmd-form-field" aria-label="Label" data-title="Some title">
	<legend class="bmd-form-question">
		What is your choice?
	</legend>
	<p class="bmd-form-description">
		Please choose.
	</p>
	<div class="bmd-check-grid-wrapper">
		<div class="bmd-check-grid bmd-check-grid-h">
			<div class="bmd-form-check bmd-form-img-check">
				<input
					name="choice"
					id="id_choice-1"
					type="radio"
					class="bmd-form-check-input"
					value="Choice A"
					data-bmd-autofocus
				>
				<label class="bmd-form-check-label" for="id_choice-1">
					<span class="bmd-form-check-frame">
						<img src="https://example.com/a.png" alt="Choice A">
					</span>
					<span class="bmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="bmd-form-check bmd-form-img-check">
				<input
					name="choice"
					id="id_choice-2"
					type="radio"
					class="bmd-form-check-input"
					value="choice-b"
					checked
					data-bmd-autofocus
				>
				<label class="bmd-form-check-label" for="id_choice-2">
					<span class="bmd-form-check-frame">
						<img src="" alt="Choice B">
					</span>
					<span class="bmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="bmd-form-check bmd-form-img-check">
				<input
					name="choice"
					id="id_choice-3"
					type="radio"
					class="bmd-form-check-input"
					value="Choice C"
					data-bmd-autofocus
				>
				<label class="bmd-form-check-label" for="id_choice-3">
					<span class="bmd-form-check-frame">
						<img src="https://example.com/c.png" alt="Choice C">
					</span>
					<span class="bmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
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
				'id="some-id" class="bmd-col-6 bmd-xs:col-10" aria-label="Label" data-title="Some title"',
				`
					question = What is your choice?
					description = Please choose.
					choices = Choice A &&      https://example.com/a.png   , Choice B   "   choice-b ",   Choice C &&       https://example.com/c.png		,
					checked = 	choice-b
					autofocus
					hidelabels
				`,
				"\n",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate5, { format: "html" }));
});

// Case 6 (checkbox)

const expectedTemplate6 = `
<fieldset data-bmd-name="choice" data-bmd-type="checkbox" data-bmd-required id="some-id" class="bmd-col-6 bmd-xs:col-10 bmd-form-field bmd-form-field-sm bmd-form-subfield" aria-label="Label" data-title="Some title">
	<legend class="bmd-form-question">
		What is your <span class="bmd-text-nowrap" aria-hidden="true">choice?<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">choice? (required)</span>
	</legend>
	<p class="bmd-form-description">
		Please choose.
	</p>
	<div class="bmd-form-text">
		Choose as many as you like
	</div>
	<div class="bmd-check-grid-wrapper">
		<div class="bmd-check-grid">
			<div class="bmd-form-check">
				<input
					name="choice"
					id="id_choice-1"
					type="checkbox"
					class="bmd-form-check-input"
					value="Choice A"
				>
				<label class="bmd-form-check-label" for="id_choice-1">
					Choice A
					<span class="bmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="bmd-form-check">
				<input
					name="choice"
					id="id_choice-2"
					type="checkbox"
					class="bmd-form-check-input"
					value="Choice B"
				>
				<label class="bmd-form-check-label" for="id_choice-2">
					Choice B
					<span class="bmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="bmd-form-check">
				<input
					name="choice"
					id="id_choice-3"
					type="checkbox"
					class="bmd-form-check-input"
					value="Choice C"
				>
				<label class="bmd-form-check-label" for="id_choice-3">
					Choice C
					<span class="bmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
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
				'id="some-id" class="bmd-col-6 bmd-xs:col-10" aria-label="Label" data-title="Some title"',
				`
					| question = What is your choice?
					| description = Please choose.
					| choices = Choice A, Choice B, Choice C,
					| multiple
					| fieldsize = sm
					| subfield
				`,
				"|",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate6, { format: "html" }));
});

// Case 7 (checkbox, not required, checked values, horizontal, different localization)

const expectedTemplate7 = `
<fieldset data-bmd-name="choice" data-bmd-type="checkbox" class="bmd-form-field">
	<legend class="bmd-form-question">
		What is your choice?
	</legend>
	<p class="bmd-form-description">
		Please choose.
	</p>
	<div class="bmd-form-text">
		এক বা একাধিক নির্বাচন করুন
	</div>
	<div class="bmd-check-grid-wrapper">
		<div class="bmd-check-grid bmd-check-grid-h">
			<div class="bmd-form-check">
				<input
					name="choice"
					id="id_choice-1"
					type="checkbox"
					class="bmd-form-check-input"
					value="choice-a"
				>
				<label class="bmd-form-check-label" for="id_choice-1">
					Choice A
					<span class="bmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="bmd-form-check">
				<input
					name="choice"
					id="id_choice-2"
					type="checkbox"
					class="bmd-form-check-input"
					value="choice-b"
					checked
				>
				<label class="bmd-form-check-label" for="id_choice-2">
					Choice B
					<span class="bmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="bmd-form-check">
				<input
					name="choice"
					id="id_choice-3"
					type="checkbox"
					class="bmd-form-check-input"
					value="Choice C"
					checked
				>
				<label class="bmd-form-check-label" for="id_choice-3">
					Choice C
					<span class="bmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
		</div>
	</div>
</fieldset>
`;

test("Case 7 (checkbox, not required, checked values, horizontal, different localization)", () => {
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
				"bn",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate7, { format: "html" }));
});

// Case 8 (checkbox, picture choice)

const expectedTemplate8 = `
<fieldset data-bmd-name="choice" data-bmd-type="checkbox" data-bmd-required class="bmd-form-field">
	<legend class="bmd-form-question">
		What is your <span class="bmd-text-nowrap" aria-hidden="true">choice?<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">choice? (required)</span>
	</legend>
	<p class="bmd-form-description">
		Please choose.
	</p>
	<div class="bmd-form-text">
		Choose as many as you like
	</div>
	<div class="bmd-check-grid-wrapper">
		<div class="bmd-check-grid bmd-check-grid-h bmd-check-grid-h-lg">
			<div class="bmd-form-check bmd-form-img-check">
				<input
					name="choice"
					id="id_choice-1"
					type="checkbox"
					class="bmd-form-check-input"
					value="Choice A"
					checked
					disabled
					data-bmd-autofocus
				>
				<label class="bmd-form-check-label" for="id_choice-1">
					<span class="bmd-form-check-frame">
						<img src="https://example.com/a.png" alt="Choice A">
					</span>
					Choice A
					<span class="bmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="bmd-form-check bmd-form-img-check">
				<input
					name="choice"
					id="id_choice-2"
					type="checkbox"
					class="bmd-form-check-input"
					value="choice-b"
					disabled
					data-bmd-autofocus
				>
				<label class="bmd-form-check-label" for="id_choice-2">
					<span class="bmd-form-check-frame">
						<img src="" alt="Choice B">
					</span>
					Choice B
					<span class="bmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="bmd-form-check bmd-form-img-check">
				<input
					name="choice"
					id="id_choice-3"
					type="checkbox"
					class="bmd-form-check-input"
					value="Choice C"
					disabled
					data-bmd-autofocus
				>
				<label class="bmd-form-check-label" for="id_choice-3">
					<span class="bmd-form-check-frame">
						<img src="https://example.com/c.png" alt="Choice C">
					</span>
					Choice C
					<span class="bmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
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
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate8, { format: "html" }));
});

// Case 9 (no params)

const expectedTemplate9 = `
<fieldset data-bmd-name="choice" data-bmd-type="radio" data-bmd-required class="bmd-form-field">
	<legend class="bmd-form-question">
		<span class="bmd-text-nowrap" aria-hidden="true">...<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">... (required)</span>
	</legend>
	<div class="bmd-check-grid-wrapper">
		<div class="bmd-check-grid">
		</div>
	</div>
</fieldset>
`;

test("Case 9 (no params)", () => {
	expect(
		beautify(createChoiceField("choice", false, true, "", "", "|", "en"), {
			format: "html",
		}),
	).toBe(beautify(expectedTemplate9, { format: "html" }));
});

// Case 10 (picture choice, no params)

const expectedTemplate10 = `
<fieldset data-bmd-name="choice" data-bmd-type="radio" data-bmd-required class="bmd-form-field">
	<legend class="bmd-form-question">
		<span class="bmd-text-nowrap" aria-hidden="true">...<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">... (required)</span>
	</legend>
	<div class="bmd-check-grid-wrapper">
		<div class="bmd-check-grid bmd-check-grid-h">
		</div>
	</div>
</fieldset>
`;

test("Case 10 (picture choice, no params)", () => {
	expect(
		beautify(createChoiceField("choice", true, true, "", "", "|", "en"), {
			format: "html",
		}),
	).toBe(beautify(expectedTemplate10, { format: "html" }));
});
