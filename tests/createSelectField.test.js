"use strict";

const { createSelectField } = require("../src/form-field-create");
const beautify = require("beautify");

// Case 1

const expectedTemplate1 = `
<div id="some-id" class="fmd-col-6 fmd-xs:col-10 fmd-form-field fmd-form-field-sm fmd-form-field-classic-labels" aria-label="Label" data-title="Some title">
	<label class="fmd-form-question" for="id_color">
		What is your favorite <span class="fmd-text-nowrap" aria-hidden="true">color?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">color? (required)</span>
	</label>
	<p class="fmd-form-description">
		Please enter the color you like the best.
	</p>
	<select
		name="color"
		id="id_color"
		class="fmd-form-str-select fmd-form-select"
		required
		disabled
		data-fmd-autofocus
	>
		<option value="" disabled>Select your favorite color</option>
		<option value="Red" selected>Red</option>
		<option value="Green">Green</option>
		<option value="Blue">Blue</option>
	</select>
</div>
`;

test("Case 1", () => {
	expect(
		beautify(
			createSelectField(
				"color",
				true,
				'id="some-id" class="fmd-col-6 fmd-xs:col-10" aria-label="Label" data-title="Some title"',
				`
					| question = What is your favorite color?
					| description = Please enter the color you like the best.
					| fieldsize = sm
					| subfield
					| placeholder = Select your favorite color
					| options = Red, Green, Blue
					| selected = Red
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

// Case 2 (not required)

const expectedTemplate2 = `
<div id="some-id" class="fmd-col-6 fmd-xs:col-10 fmd-form-field fmd-form-field-sm fmd-form-field-classic-labels" aria-label="Label" data-title="Some title">
	<label class="fmd-form-question" for="id_color">
		What is your favorite color?
	</label>
	<p class="fmd-form-description">
		Please enter the color you like the best.
	</p>
	<select
		name="color"
		id="id_color"
		class="fmd-form-str-select fmd-form-select"
		data-fmd-autofocus
	>
		<option value="">Select an option</option>
		<option value="Red" selected>Red</option>
		<option value="Green">Green</option>
		<option value="Blue">Blue</option>
	</select>
</div>
`;

test("Case 2 (not required)", () => {
	expect(
		beautify(
			createSelectField(
				"color",
				false,
				'id="some-id" class="fmd-col-6 fmd-xs:col-10" aria-label="Label" data-title="Some title"',
				`
					| question = What is your favorite color?
					| description = Please enter the color you like the best.
					| fieldsize = sm
					| subfield
					| options = Red,    Green   , Blue   
					| selected = Red
					| autofocus
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate2, { format: "html" }));
});

// Case 3 (different localization)

const expectedTemplate3 = `
<div class="fmd-form-field">
	<label class="fmd-form-question" for="id_color">
		What is your favorite <span class="fmd-text-nowrap" aria-hidden="true">color?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">color? (প্রয়োজন)</span>
	</label>
	<p class="fmd-form-description">
		Please enter the color you like the best.
	</p>
	<select
		name="color"
		id="id_color"
		class="fmd-form-str-select fmd-form-select"
		required
	>
		<option value="" disabled>যেকোনো একটি নির্বাচন করুন</option>
		<option value="Red" selected>Red</option>
		<option value="Green">Green</option>
		<option value="Blue">Blue</option>
	</select>
</div>
`;

test("Case 3 (different localization)", () => {
	expect(
		beautify(
			createSelectField(
				"color",
				true,
				"",
				`
					| question = What is your favorite color?
					| description = Please enter the color you like the best.
					| options =    Red   ,    Green,Blue   
					| selected = Red
				`,
				"|",
				"",
				"bn",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate3, { format: "html" }));
});

// Case 4 (options with specific values, different id)

const expectedTemplate4 = `
<div class="fmd-form-field">
	<label class="fmd-form-question" for="some-id:id_color">
		What is your favorite <span class="fmd-text-nowrap" aria-hidden="true">color?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">color? (required)</span>
	</label>
	<p class="fmd-form-description">
		Please enter the color you like the best.
	</p>
	<select
		name="color"
		id="some-id:id_color"
		class="fmd-form-str-select fmd-form-select"
		required
	>
		<option value="" disabled>Select an option</option>
		<option value="red" selected>Red</option>
		<option value="green">Green</option>
		<option value="blue">Blue</option>
	</select>
</div>
`;

test("Case 4 (options with specific values, different id)", () => {
	expect(
		beautify(
			createSelectField(
				"color",
				true,
				"",
				`
					| question = What is your favorite color?
					| description = Please enter the color you like the best.
					| options =   Red "red"   ,   "green"   Green  ,  Bl"blue"ue  
					| selected = red
				`,
				"|",
				"some-id",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate4, { format: "html" }));
});

// Case 5 (option with empty value)

const expectedTemplate5 = `
<div class="fmd-form-field">
	<label class="fmd-form-question" for="id_color">
		What is your favorite <span class="fmd-text-nowrap" aria-hidden="true">color?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">color? (required)</span>
	</label>
	<p class="fmd-form-description">
		Please enter the color you like the best.
	</p>
	<select
		name="color"
		id="id_color"
		class="fmd-form-str-select fmd-form-select"
		required
	>
		<option value="" disabled selected>Select an option</option>
		<option value="">Red</option>
		<option value="green">Green</option>
		<option value="blue">Blue</option>
	</select>
</div>
`;

test("Case 5 (option with empty value)", () => {
	expect(
		beautify(
			createSelectField(
				"color",
				true,
				"",
				`
					| question = What is your favorite color?
					| description = Please enter the color you like the best.
					| options =  ""  Red   ,   "green"   Green  ,  Bl"blue"ue  
					| selected =    
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate5, { format: "html" }));
});

// Case 6 (nothing selected, different form delimiter)

const expectedTemplate6 = `
<div class="fmd-form-field">
	<label class="fmd-form-question" for="id_color">
		What is your favorite <span class="fmd-text-nowrap" aria-hidden="true">color?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">color? (required)</span>
	</label>
	<p class="fmd-form-description">
		Please enter the color you like the best.
	</p>
	<select
		name="color"
		id="id_color"
		class="fmd-form-str-select fmd-form-select"
		required
	>
		<option value="" disabled selected>Select an option</option>
		<option value="Red">Red</option>
		<option value="Green">Green</option>
		<option value="Blue">Blue</option>
		<option value="Yellow">Yellow</option>
		<option value="orange">Orange</option>
	</select>
</div>
`;

test("Case 6 (nothing selected, different form delimiter)", () => {
	expect(
		beautify(
			createSelectField(
				"color",
				true,
				"",
				`
					question = What is your favorite color?
					description = Please enter the color you like the best.
					options =Red,Green,Blue,Yellow,Orange"orange" 
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
<div class="fmd-form-field">
	<label class="fmd-form-question" for="id_choice">
		<span class="fmd-text-nowrap" aria-hidden="true">...<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">... (required)</span>
	</label>
	<select
		name="choice"
		id="id_choice"
		class="fmd-form-str-select fmd-form-select"
		required
	>
		<option value="" disabled selected>Select an option</option>
	</select>
</div>
`;

test("Case 7 (no params)", () => {
	expect(
		beautify(createSelectField("choice", true, "", "", "|", "", "en"), {
			format: "html",
		}),
	).toBe(beautify(expectedTemplate7, { format: "html" }));
});
