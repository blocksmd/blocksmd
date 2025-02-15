"use strict";

const { createOpinionScaleField } = require("../src/form-field-create");
const beautify = require("beautify");

// Case 1

const expectedTemplate1 = `
<fieldset data-fmd-name="opinion" data-fmd-type="num-radio" data-fmd-required id="some-id" class="fmd-col-6 fmd-xs:col-10 fmd-form-field fmd-form-field-sm fmd-form-field-classic-labels" aria-label="Label" data-title="Some title">
	<legend class="fmd-form-question">
		What is your <span class="fmd-text-nowrap" aria-hidden="true">opinion?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">opinion? (required)</span>
	</legend>
	<p class="fmd-form-description">
		Please choose.
	</p>
	<div class="fmd-scale-grid">
		<input 
			name="opinion"
			id="id_opinion-0"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="0"
			data-fmd-autofocus
			aria-describedby="id_opinion-label-start"
		>
		<label class="fmd-form-scale-label" for="id_opinion-0">0</label>
		<input 
			name="opinion"
			id="id_opinion-1"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="1"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_opinion-1">1</label>
		<input 
			name="opinion"
			id="id_opinion-2"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="2"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_opinion-2">2</label>
		<input 
			name="opinion"
			id="id_opinion-3"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="3"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_opinion-3">3</label>
		<input 
			name="opinion"
			id="id_opinion-4"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="4"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_opinion-4">4</label>
		<input 
			name="opinion"
			id="id_opinion-5"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="5"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_opinion-5">5</label>
		<input 
			name="opinion"
			id="id_opinion-6"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="6"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_opinion-6">6</label>
		<input 
			name="opinion"
			id="id_opinion-7"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="7"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_opinion-7">7</label>
		<input 
			name="opinion"
			id="id_opinion-8"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="8"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_opinion-8">8</label>
		<input 
			name="opinion"
			id="id_opinion-9"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="9"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_opinion-9">9</label>
		<input 
			name="opinion"
			id="id_opinion-10"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="10"
			data-fmd-autofocus
			aria-describedby="id_opinion-label-end"
		>
		<label class="fmd-form-scale-label" for="id_opinion-10">10</label>
	</div>
	<div class="fmd-form-scale-text">
		<div class="fmd-form-scale-text-start">
        	<span class="fmd-d-none fmd-xs:d-inline-block">0 &mdash;</span>
        	<span id="id_opinion-label-start">Not likely at all</span>
        </div>
        <div class="fmd-form-scale-text-end">
        	<span class="fmd-d-none fmd-xs:d-inline-block">10 &mdash;</span>
        	<span id="id_opinion-label-end">Extremely likely</span>
        </div>
    </div>
</fieldset>
`;

test("Case 1", () => {
	expect(
		beautify(
			createOpinionScaleField(
				"opinion",
				true,
				'id="some-id" class="fmd-col-6 fmd-xs:col-10" aria-label="Label" data-title="Some title"',
				`
					| question = What is your opinion?
					| description = Please choose.
					| fieldsize = sm
					| subfield
					| autofocus
					| startat = 2
					| outof = 4
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate1, { format: "html" }));
});

// Case 2 (not required, start at 1, out of 5, value, disabled)

const expectedTemplate2 = `
<fieldset data-fmd-name="opinion" data-fmd-type="num-radio" class="fmd-form-field">
	<legend class="fmd-form-question">
		What is your opinion?
	</legend>
	<p class="fmd-form-description">
		Please choose.
	</p>
	<div class="fmd-scale-grid">
		<input 
			name="opinion"
			id="id_opinion-1"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="1"
			disabled
			aria-describedby="id_opinion-label-start"
		>
		<label class="fmd-form-scale-label" for="id_opinion-1">1</label>
		<input 
			name="opinion"
			id="id_opinion-2"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="2"
			disabled
		>
		<label class="fmd-form-scale-label" for="id_opinion-2">2</label>
		<input 
			name="opinion"
			id="id_opinion-3"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="3"
			checked
			disabled
		>
		<label class="fmd-form-scale-label" for="id_opinion-3">3</label>
		<input 
			name="opinion"
			id="id_opinion-4"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="4"
			disabled
		>
		<label class="fmd-form-scale-label" for="id_opinion-4">4</label>
		<input 
			name="opinion"
			id="id_opinion-5"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="5"
			disabled
			aria-describedby="id_opinion-label-end"
		>
		<label class="fmd-form-scale-label" for="id_opinion-5">5</label>
	</div>
	<div class="fmd-form-scale-text">
		<div class="fmd-form-scale-text-start">
        	<span class="fmd-d-none fmd-xs:d-inline-block">1 &mdash;</span>
        	<span id="id_opinion-label-start">Not likely at all</span>
        </div>
        <div class="fmd-form-scale-text-end">
        	<span class="fmd-d-none fmd-xs:d-inline-block">5 &mdash;</span>
        	<span id="id_opinion-label-end">Extremely likely</span>
        </div>
    </div>
</fieldset>
`;

test("Case 2 (not required, start at 1, out of 5, value, disabled)", () => {
	expect(
		beautify(
			createOpinionScaleField(
				"opinion",
				false,
				"",
				`
					| question = What is your opinion?
					| description = Please choose.
					| startat = 1
					| outof = 5
					| value = 3
					| disabled
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate2, { format: "html" }));
});

// Case 3 (out of 6, different labels, different form delimiter)

const expectedTemplate3 = `
<fieldset data-fmd-name="opinion" data-fmd-type="num-radio" data-fmd-required class="fmd-form-field fmd-form-field-classic-labels">
	<legend class="fmd-form-question">
		What is your <span class="fmd-text-nowrap" aria-hidden="true">opinion?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">opinion? (required)</span>
	</legend>
	<p class="fmd-form-description">
		Please choose.
	</p>
	<div class="fmd-scale-grid">
		<input 
			name="opinion"
			id="id_opinion-0"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="0"
			aria-describedby="id_opinion-label-start"
		>
		<label class="fmd-form-scale-label" for="id_opinion-0">0</label>
		<input 
			name="opinion"
			id="id_opinion-1"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="1"
		>
		<label class="fmd-form-scale-label" for="id_opinion-1">1</label>
		<input 
			name="opinion"
			id="id_opinion-2"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="2"
		>
		<label class="fmd-form-scale-label" for="id_opinion-2">2</label>
		<input 
			name="opinion"
			id="id_opinion-3"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="3"
		>
		<label class="fmd-form-scale-label" for="id_opinion-3">3</label>
		<input 
			name="opinion"
			id="id_opinion-4"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="4"
		>
		<label class="fmd-form-scale-label" for="id_opinion-4">4</label>
		<input 
			name="opinion"
			id="id_opinion-5"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="5"
		>
		<label class="fmd-form-scale-label" for="id_opinion-5">5</label>
		<input 
			name="opinion"
			id="id_opinion-6"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="6"
			aria-describedby="id_opinion-label-end"
		>
		<label class="fmd-form-scale-label" for="id_opinion-6">6</label>
	</div>
	<div class="fmd-form-scale-text">
		<div class="fmd-form-scale-text-start">
        	<span class="fmd-d-none fmd-xs:d-inline-block">0 &mdash;</span>
        	<span id="id_opinion-label-start">Start</span>
        </div>
        <div class="fmd-form-scale-text-end">
        	<span class="fmd-d-none fmd-xs:d-inline-block">6 &mdash;</span>
        	<span id="id_opinion-label-end">End</span>
        </div>
    </div>
</fieldset>
`;

test("Case 3 (out of 6, different labels, different form delimiter)", () => {
	expect(
		beautify(
			createOpinionScaleField(
				"opinion",
				true,
				"",
				`
					question = What is your opinion?
					description = Please choose.
					outof = 6
					labelstart = Start
					labelend = End
					labelstyle =   classic
				`,
				"\n",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate3, { format: "html" }));
});

// Case 4 (different localization)

const expectedTemplate4 = `
<fieldset data-fmd-name="opinion" data-fmd-type="num-radio" data-fmd-required id="some-id" class="fmd-col-6 fmd-xs:col-10 fmd-form-field fmd-form-field-sm fmd-form-field-classic-labels" aria-label="Label" data-title="Some title">
	<legend class="fmd-form-question">
		What is your <span class="fmd-text-nowrap" aria-hidden="true">opinion?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">opinion? (প্রয়োজন)</span>
	</legend>
	<p class="fmd-form-description">
		Please choose.
	</p>
	<div class="fmd-scale-grid">
		<input 
			name="opinion"
			id="id_opinion-0"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="0"
			data-fmd-autofocus
			aria-describedby="id_opinion-label-start"
		>
		<label class="fmd-form-scale-label" for="id_opinion-0">0</label>
		<input 
			name="opinion"
			id="id_opinion-1"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="1"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_opinion-1">1</label>
		<input 
			name="opinion"
			id="id_opinion-2"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="2"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_opinion-2">2</label>
		<input 
			name="opinion"
			id="id_opinion-3"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="3"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_opinion-3">3</label>
		<input 
			name="opinion"
			id="id_opinion-4"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="4"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_opinion-4">4</label>
		<input 
			name="opinion"
			id="id_opinion-5"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="5"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_opinion-5">5</label>
		<input 
			name="opinion"
			id="id_opinion-6"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="6"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_opinion-6">6</label>
		<input 
			name="opinion"
			id="id_opinion-7"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="7"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_opinion-7">7</label>
		<input 
			name="opinion"
			id="id_opinion-8"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="8"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_opinion-8">8</label>
		<input 
			name="opinion"
			id="id_opinion-9"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="9"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_opinion-9">9</label>
		<input 
			name="opinion"
			id="id_opinion-10"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="10"
			data-fmd-autofocus
			aria-describedby="id_opinion-label-end"
		>
		<label class="fmd-form-scale-label" for="id_opinion-10">10</label>
	</div>
	<div class="fmd-form-scale-text">
		<div class="fmd-form-scale-text-start">
        	<span class="fmd-d-none fmd-xs:d-inline-block">0 &mdash;</span>
        	<span id="id_opinion-label-start">কোনো সম্ভাবনা নেই</span>
        </div>
        <div class="fmd-form-scale-text-end">
        	<span class="fmd-d-none fmd-xs:d-inline-block">10 &mdash;</span>
        	<span id="id_opinion-label-end">অত্যন্ত সম্ভাবনাময়</span>
        </div>
    </div>
</fieldset>
`;

test("Case 4 (different localization)", () => {
	expect(
		beautify(
			createOpinionScaleField(
				"opinion",
				true,
				'id="some-id" class="fmd-col-6 fmd-xs:col-10" aria-label="Label" data-title="Some title"',
				`
					| question = What is your opinion?
					| description = Please choose.
					| fieldsize = sm
					| subfield
					| autofocus
					| startat = 2
					| outof = 4
				`,
				"|",
				"",
				"bn",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate4, { format: "html" }));
});

// Case 5 (hide labels)

const expectedTemplate5 = `
<fieldset data-fmd-name="choice" data-fmd-type="num-radio" data-fmd-required id="some-id" class="fmd-col-6 fmd-xs:col-10 fmd-form-field fmd-form-field-sm fmd-form-field-classic-labels" aria-label="Label" data-title="Some title">
	<legend class="fmd-form-question">
		What is your <span class="fmd-text-nowrap" aria-hidden="true">choice?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">choice? (required)</span>
	</legend>
	<p class="fmd-form-description">
		Please choose.
	</p>
	<div class="fmd-scale-grid">
		<input 
			name="choice"
			id="id_choice-0"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="0"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_choice-0">0</label>
		<input 
			name="choice"
			id="id_choice-1"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="1"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_choice-1">1</label>
		<input 
			name="choice"
			id="id_choice-2"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="2"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_choice-2">2</label>
		<input 
			name="choice"
			id="id_choice-3"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="3"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_choice-3">3</label>
		<input 
			name="choice"
			id="id_choice-4"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="4"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_choice-4">4</label>
		<input 
			name="choice"
			id="id_choice-5"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="5"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_choice-5">5</label>
		<input 
			name="choice"
			id="id_choice-6"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="6"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_choice-6">6</label>
		<input 
			name="choice"
			id="id_choice-7"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="7"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_choice-7">7</label>
		<input 
			name="choice"
			id="id_choice-8"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="8"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_choice-8">8</label>
		<input 
			name="choice"
			id="id_choice-9"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="9"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_choice-9">9</label>
		<input 
			name="choice"
			id="id_choice-10"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="10"
			data-fmd-autofocus
		>
		<label class="fmd-form-scale-label" for="id_choice-10">10</label>
	</div>
</fieldset>
`;

test("Case 5 (hide labels)", () => {
	expect(
		beautify(
			createOpinionScaleField(
				"choice",
				true,
				'id="some-id" class="fmd-col-6 fmd-xs:col-10" aria-label="Label" data-title="Some title"',
				`
					| question = What is your choice?
					| description = Please choose.
					| fieldsize = sm
					| subfield
					| autofocus
					| hideLabelStart
					| hideLabelEnd
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate5, { format: "html" }));
});

// Case 6 (not required, start at 1, out of 5, value, disabled, hide start label)

const expectedTemplate6 = `
<fieldset data-fmd-name="opinion" data-fmd-type="num-radio" class="fmd-form-field">
	<legend class="fmd-form-question">
		What is your opinion?
	</legend>
	<p class="fmd-form-description">
		Please choose.
	</p>
	<div class="fmd-scale-grid">
		<input 
			name="opinion"
			id="id_opinion-1"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="1"
			disabled
		>
		<label class="fmd-form-scale-label" for="id_opinion-1">1</label>
		<input 
			name="opinion"
			id="id_opinion-2"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="2"
			disabled
		>
		<label class="fmd-form-scale-label" for="id_opinion-2">2</label>
		<input 
			name="opinion"
			id="id_opinion-3"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="3"
			checked
			disabled
		>
		<label class="fmd-form-scale-label" for="id_opinion-3">3</label>
		<input 
			name="opinion"
			id="id_opinion-4"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="4"
			disabled
		>
		<label class="fmd-form-scale-label" for="id_opinion-4">4</label>
		<input 
			name="opinion"
			id="id_opinion-5"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="5"
			disabled
			aria-describedby="id_opinion-label-end"
		>
		<label class="fmd-form-scale-label" for="id_opinion-5">5</label>
	</div>
	<div class="fmd-form-scale-text">
        <div class="fmd-form-scale-text-end">
        	<span class="fmd-d-none fmd-xs:d-inline-block">5 &mdash;</span>
        	<span id="id_opinion-label-end">Extremely likely</span>
        </div>
    </div>
</fieldset>
`;

test("Case 6 (not required, start at 1, out of 5, value, disabled, hide start label)", () => {
	expect(
		beautify(
			createOpinionScaleField(
				"opinion",
				false,
				"",
				`
					| question = What is your opinion?
					| description = Please choose.
					| startat = 1
					| outof = 5
					| value = 3
					| disabled
					| hideLabelStart
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate6, { format: "html" }));
});

// Case 7 (not required, start at 1, out of 5, value, disabled, hide end label)

const expectedTemplate7 = `
<fieldset data-fmd-name="opinion" data-fmd-type="num-radio" class="fmd-form-field">
	<legend class="fmd-form-question">
		What is your opinion?
	</legend>
	<p class="fmd-form-description">
		Please choose.
	</p>
	<div class="fmd-scale-grid">
		<input 
			name="opinion"
			id="id_opinion-1"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="1"
			disabled
			aria-describedby="id_opinion-label-start"
		>
		<label class="fmd-form-scale-label" for="id_opinion-1">1</label>
		<input 
			name="opinion"
			id="id_opinion-2"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="2"
			disabled
		>
		<label class="fmd-form-scale-label" for="id_opinion-2">2</label>
		<input 
			name="opinion"
			id="id_opinion-3"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="3"
			checked
			disabled
		>
		<label class="fmd-form-scale-label" for="id_opinion-3">3</label>
		<input 
			name="opinion"
			id="id_opinion-4"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="4"
			disabled
		>
		<label class="fmd-form-scale-label" for="id_opinion-4">4</label>
		<input 
			name="opinion"
			id="id_opinion-5"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="5"
			disabled
		>
		<label class="fmd-form-scale-label" for="id_opinion-5">5</label>
	</div>
	<div class="fmd-form-scale-text">
		<div class="fmd-form-scale-text-start">
        	<span class="fmd-d-none fmd-xs:d-inline-block">1 &mdash;</span>
        	<span id="id_opinion-label-start">Not likely at all</span>
        </div>
    </div>
</fieldset>
`;

test("Case 7 (not required, start at 1, out of 5, value, disabled, hide end label)", () => {
	expect(
		beautify(
			createOpinionScaleField(
				"opinion",
				false,
				"",
				`
					| question = What is your opinion?
					| description = Please choose.
					| startat = 1
					| outof = 5
					| value = 3
					| disabled
					| hideLabelEnd
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate7, { format: "html" }));
});

// Case 8 (no params)

const expectedTemplate8 = `
<fieldset data-fmd-name="opinion" data-fmd-type="num-radio" data-fmd-required class="fmd-form-field">
	<legend class="fmd-form-question">
		<span class="fmd-text-nowrap" aria-hidden="true">...<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">... (required)</span>
	</legend>
	<div class="fmd-scale-grid">
		<input 
			name="opinion"
			id="id_opinion-0"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="0"
			aria-describedby="id_opinion-label-start"
		>
		<label class="fmd-form-scale-label" for="id_opinion-0">0</label>
		<input 
			name="opinion"
			id="id_opinion-1"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="1"
		>
		<label class="fmd-form-scale-label" for="id_opinion-1">1</label>
		<input 
			name="opinion"
			id="id_opinion-2"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="2"
		>
		<label class="fmd-form-scale-label" for="id_opinion-2">2</label>
		<input 
			name="opinion"
			id="id_opinion-3"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="3"
		>
		<label class="fmd-form-scale-label" for="id_opinion-3">3</label>
		<input 
			name="opinion"
			id="id_opinion-4"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="4"
		>
		<label class="fmd-form-scale-label" for="id_opinion-4">4</label>
		<input 
			name="opinion"
			id="id_opinion-5"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="5"
		>
		<label class="fmd-form-scale-label" for="id_opinion-5">5</label>
		<input 
			name="opinion"
			id="id_opinion-6"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="6"
		>
		<label class="fmd-form-scale-label" for="id_opinion-6">6</label>
		<input 
			name="opinion"
			id="id_opinion-7"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="7"
		>
		<label class="fmd-form-scale-label" for="id_opinion-7">7</label>
		<input 
			name="opinion"
			id="id_opinion-8"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="8"
		>
		<label class="fmd-form-scale-label" for="id_opinion-8">8</label>
		<input 
			name="opinion"
			id="id_opinion-9"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="9"
		>
		<label class="fmd-form-scale-label" for="id_opinion-9">9</label>
		<input 
			name="opinion"
			id="id_opinion-10"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="10"
			aria-describedby="id_opinion-label-end"
		>
		<label class="fmd-form-scale-label" for="id_opinion-10">10</label>
	</div>
	<div class="fmd-form-scale-text">
		<div class="fmd-form-scale-text-start">
        	<span class="fmd-d-none fmd-xs:d-inline-block">0 &mdash;</span>
        	<span id="id_opinion-label-start">Not likely at all</span>
        </div>
        <div class="fmd-form-scale-text-end">
        	<span class="fmd-d-none fmd-xs:d-inline-block">10 &mdash;</span>
        	<span id="id_opinion-label-end">Extremely likely</span>
        </div>
    </div>
</fieldset>
`;

test("Case 8 (no params)", () => {
	expect(
		beautify(createOpinionScaleField("opinion", true, "", "", "|", "", "en"), {
			format: "html",
		}),
	).toBe(beautify(expectedTemplate8, { format: "html" }));
});
