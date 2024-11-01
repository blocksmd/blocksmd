("use strict");

const { createNumberField } = require("../src/form-field-create");
const beautify = require("beautify");

// Case 1

const expectedTemplate1 = `
<div id="some-id" class="bmd-col-6 bmd-xs:col-10 bmd-form-field bmd-form-field-sm bmd-form-field-classic-labels" aria-label="Label" data-title="Some title">
	<label class="bmd-form-question" for="id_number">
		What is your favorite <span class="bmd-text-nowrap" aria-hidden="true">number?<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">number? (required)</span>
	</label>
	<p class="bmd-form-description">
		Please enter the number you like the best.
	</p>
	<div class="bmd-input-group">
		<input
			name="number"
			id="id_number"
			type="number"
			class="bmd-form-num-input bmd-form-control"
			placeholder="Type in your favorite number here..."
			required
			value="7"
			min="0"
			max="100"
			step="1"
			disabled
			data-bmd-autofocus
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
				'id="some-id" class="bmd-col-6 bmd-xs:col-10" aria-label="Label" data-title="Some title"',
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
<div id="some-id" class="bmd-col-8 bmd-form-field">
	<label class="bmd-form-question" for="id_number">
		What is your favorite <span class="bmd-text-nowrap" aria-hidden="true">number?<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">number? (required)</span>
	</label>
	<p class="bmd-form-description">
		Please enter the number you like the best.
	</p>
	<div class="bmd-input-group">
		<span id="id_number-unit" class="bmd-input-group-text">$</span>
		<input
			name="number"
			id="id_number"
			type="number"
			class="bmd-form-num-input bmd-form-control"
			placeholder="Type a number here..."
			required
			aria-describedby="id_number-unit id_number-unit-end"
		>
		<span id="id_number-unit-end" class="bmd-input-group-text">kg</span>
	</div>
</div>
`;

test("Case 2 (unit and unit end)", () => {
	expect(
		beautify(
			createNumberField(
				"number",
				true,
				'id="some-id" class="bmd-col-8"',
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
<div id="some-id" class="bmd-col-8 bmd-form-field">
	<label class="bmd-form-question" for="id_number">
		What is your favorite number?
	</label>
	<p class="bmd-form-description">
		Please enter the number you like the best.
	</p>
	<div class="bmd-input-group">
		<span id="id_number-unit" class="bmd-input-group-text">$</span>
		<input
			name="number"
			id="id_number"
			type="number"
			class="bmd-form-num-input bmd-form-control"
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
				'id="some-id" class="bmd-col-8"',
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
<div id="some-id" class="bmd-col-8 bmd-form-field">
	<label class="bmd-form-question" for="form1:id_number">
		What is your favorite <span class="bmd-text-nowrap" aria-hidden="true">number?<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">number? (প্রয়োজন)</span>
	</label>
	<p class="bmd-form-description">
		Please enter the number you like the best.
	</p>
	<div class="bmd-input-group">
		<input
			name="number"
			id="form1:id_number"
			type="number"
			class="bmd-form-num-input bmd-form-control"
			placeholder="এখানে একটি সংখ্যা টাইপ করুন..."
			required
			aria-describedby="form1:id_number-unit-end"
		>
		<span id="form1:id_number-unit-end" class="bmd-input-group-text">kg</span>
	</div>
</div>
`;

test("Case 4 (unit end, different id and localization)", () => {
	expect(
		beautify(
			createNumberField(
				"number",
				true,
				'id="some-id" class="bmd-col-8"',
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
<div class="bmd-form-field">
	<label class="bmd-form-question" for="id_number">
		What is your favorite <span class="bmd-text-nowrap" aria-hidden="true">number?<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">number? (required)</span>
	</label>
	<p class="bmd-form-description">
		Please enter the number you like the best.
	</p>
	<div class="bmd-input-group">
		<input
			name="number"
			id="id_number"
			type="number"
			class="bmd-form-num-input bmd-form-control"
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
<div class="bmd-form-field">
	<label class="bmd-form-question" for="id_amount">
		What is the <span class="bmd-text-nowrap" aria-hidden="true">amount?<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">amount? (required)</span>
	</label>
	<div class="bmd-input-group">
		<span id="id_amount-unit" class="bmd-input-group-text">$</span>
		<input
			name="amount"
			id="id_amount"
			type="number"
			class="bmd-form-num-input bmd-form-control"
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
<div id="some-id" class="bmd-col-8 bmd-form-field">
	<label class="bmd-form-question" for="id_number">
		<span class="bmd-text-nowrap" aria-hidden="true">...<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">... (required)</span>
	</label>
	<div class="bmd-input-group">
		<input
			name="number"
			id="id_number"
			type="number"
			class="bmd-form-num-input bmd-form-control"
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
				'id="some-id" class="bmd-col-8"',
				"",
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate7, { format: "html" }));
});
