"use strict";

const { createNumberField } = require("../src/form-field-create");
const beautify = require("beautify");

// Case 1

const expectedTemplate1 = `
<div id="some-id" class="fmd-col-6 fmd-xs:col-10 fmd-form-field fmd-form-field-sm fmd-form-field-classic-labels" aria-label="Label" data-title="Some title">
	<label class="fmd-form-question" for="id_number">
		What is your favorite <span class="fmd-text-nowrap" aria-hidden="true">number?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">number? (required)</span>
	</label>
	<p class="fmd-form-description">
		Please enter the number you like the best.
	</p>
	<div class="fmd-input-group">
		<input
			name="number"
			id="id_number"
			type="number"
			class="fmd-form-num-input fmd-form-control"
			placeholder="Type in your favorite number here..."
			required
			value="7"
			min="0"
			max="100"
			step="1"
			disabled
			data-fmd-autofocus
		>
	</div>
</div>
`;

test("Case 1", () => {
	expect(
		beautify(
			createNumberField(
				"number",
				true,
				'id="some-id" class="fmd-col-6 fmd-xs:col-10" aria-label="Label" data-title="Some title"',
				`
					| question = What is your favorite number?
					| description = Please enter the number you like the best.
					| fieldsize = sm
					| subfield
					| placeholder = Type in your favorite number here...
					| value = 7
					| min = 0
					| max = 100
					| step = 1
					| disabled
					| autofocus
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate1, { format: "html" }));
});

// Case 2 (unit and unit end)

const expectedTemplate2 = `
<div id="some-id" class="fmd-col-8 fmd-form-field">
	<label class="fmd-form-question" for="id_number">
		What is your favorite <span class="fmd-text-nowrap" aria-hidden="true">number?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">number? (required)</span>
	</label>
	<p class="fmd-form-description">
		Please enter the number you like the best.
	</p>
	<div class="fmd-input-group">
		<span id="id_number-unit" class="fmd-input-group-text">$</span>
		<input
			name="number"
			id="id_number"
			type="number"
			class="fmd-form-num-input fmd-form-control"
			placeholder="Type a number here..."
			required
			aria-describedby="id_number-unit id_number-unit-end"
		>
		<span id="id_number-unit-end" class="fmd-input-group-text">kg</span>
	</div>
</div>
`;

test("Case 2 (unit and unit end)", () => {
	expect(
		beautify(
			createNumberField(
				"number",
				true,
				'id="some-id" class="fmd-col-8"',
				`
					| question = What is your favorite number?
					| description = Please enter the number you like the best.
					| unit = $
					| unitend = kg
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate2, { format: "html" }));
});

// Case 3 (unit, not required)

const expectedTemplate3 = `
<div id="some-id" class="fmd-col-8 fmd-form-field">
	<label class="fmd-form-question" for="id_number">
		What is your favorite number?
	</label>
	<p class="fmd-form-description">
		Please enter the number you like the best.
	</p>
	<div class="fmd-input-group">
		<span id="id_number-unit" class="fmd-input-group-text">$</span>
		<input
			name="number"
			id="id_number"
			type="number"
			class="fmd-form-num-input fmd-form-control"
			placeholder="Type a number here..."
			aria-describedby="id_number-unit"
		>
	</div>
</div>
`;

test("Case 3 (unit, not required)", () => {
	expect(
		beautify(
			createNumberField(
				"number",
				false,
				'id="some-id" class="fmd-col-8"',
				`
					| question = What is your favorite number?
					| description = Please enter the number you like the best.
					| unit = $
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate3, { format: "html" }));
});

// Case 4 (unit end, different id and localization)

const expectedTemplate4 = `
<div id="some-id" class="fmd-col-8 fmd-form-field">
	<label class="fmd-form-question" for="form1:id_number">
		What is your favorite <span class="fmd-text-nowrap" aria-hidden="true">number?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">number? (প্রয়োজন)</span>
	</label>
	<p class="fmd-form-description">
		Please enter the number you like the best.
	</p>
	<div class="fmd-input-group">
		<input
			name="number"
			id="form1:id_number"
			type="number"
			class="fmd-form-num-input fmd-form-control"
			placeholder="এখানে একটি সংখ্যা টাইপ করুন..."
			required
			aria-describedby="form1:id_number-unit-end"
		>
		<span id="form1:id_number-unit-end" class="fmd-input-group-text">kg</span>
	</div>
</div>
`;

test("Case 4 (unit end, different id and localization)", () => {
	expect(
		beautify(
			createNumberField(
				"number",
				true,
				'id="some-id" class="fmd-col-8"',
				`
					| question = What is your favorite number?
					| description = Please enter the number you like the best.
					| unitEnd = kg
				`,
				"|",
				"form1",
				"bn",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate4, { format: "html" }));
});

// Case 5 (invalid value, min, max, and step)

const expectedTemplate5 = `
<div class="fmd-form-field">
	<label class="fmd-form-question" for="id_number">
		What is your favorite <span class="fmd-text-nowrap" aria-hidden="true">number?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">number? (required)</span>
	</label>
	<p class="fmd-form-description">
		Please enter the number you like the best.
	</p>
	<div class="fmd-input-group">
		<input
			name="number"
			id="id_number"
			type="number"
			class="fmd-form-num-input fmd-form-control"
			placeholder="Type a number here..."
			required
		>
	</div>
</div>
`;

test("Case 5 (invalid value, min, max, and step)", () => {
	expect(
		beautify(
			createNumberField(
				"number",
				true,
				"",
				`
					| question = What is your favorite number?
					| description = Please enter the number you like the best.
					| value = value
					| min = min
					| max = max
					| step = step
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate5, { format: "html" }));
});

// Case 6 (different form delimiter)

const expectedTemplate6 = `
<div class="fmd-form-field">
	<label class="fmd-form-question" for="id_amount">
		What is the <span class="fmd-text-nowrap" aria-hidden="true">amount?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">amount? (required)</span>
	</label>
	<div class="fmd-input-group">
		<span id="id_amount-unit" class="fmd-input-group-text">$</span>
		<input
			name="amount"
			id="id_amount"
			type="number"
			class="fmd-form-num-input fmd-form-control"
			placeholder="Type a number here..."
			required
			value="5.0"
			min="0.0"
			max="10.0"
			step="0.1"
			aria-describedby="id_amount-unit"
		>
	</div>
</div>
`;

test("Case 6 (different form delimiter)", () => {
	expect(
		beautify(
			createNumberField(
				"amount",
				true,
				"",
				`
					question = What is the amount?
					value = 5.0
					min = 0.0
					max = 10.0
					step = 0.1
					unit = $
				`,
				"\n",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate6, { format: "html" }));
});

// Case 7 (no params)

const expectedTemplate7 = `
<div id="some-id" class="fmd-col-8 fmd-form-field">
	<label class="fmd-form-question" for="id_number">
		<span class="fmd-text-nowrap" aria-hidden="true">...<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">... (required)</span>
	</label>
	<div class="fmd-input-group">
		<input
			name="number"
			id="id_number"
			type="number"
			class="fmd-form-num-input fmd-form-control"
			placeholder="Type a number here..."
			required
		>
	</div>
</div>
`;

test("Case 7 (no params)", () => {
	expect(
		beautify(
			createNumberField(
				"number",
				true,
				'id="some-id" class="fmd-col-8"',
				"",
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate7, { format: "html" }));
});
