"use strict";

const { createDatetimeField } = require("../src/form-field-create");
const beautify = require("beautify");

// Case 1

const expectedTemplate1 = `
<div data-fmd-name="joined" data-fmd-type="datetime-local" id="some-id" class="fmd-col-6 fmd-xs:col-10 fmd-form-field fmd-form-field-sm fmd-form-field-classic-labels" aria-label="Label" data-title="Some title">
	<label class="fmd-form-question" for="id_joined">
		When did you <span class="fmd-text-nowrap" aria-hidden="true">join?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">join? (required)</span>
	</label>
	<p class="fmd-form-description">
		Please enter a datetime.
	</p>
	<input
		name="joined"
		id="id_joined"
		type="datetime-local"
		class="fmd-form-datetime-input fmd-form-control"
		placeholder="YYYY-MM-DDTHH:mm"
		required
		value="2024-01-01T10:00"
		min="2023-01-01T10:00"
		max="2025-01-01T10:00"
		step="any"
		disabled
		data-fmd-autofocus
	>
</div>
`;

test("Case 1", () => {
	expect(
		beautify(
			createDatetimeField(
				"joined",
				"datetime",
				true,
				'id="some-id" class="fmd-col-6 fmd-xs:col-10" aria-label="Label" data-title="Some title"',
				`
					| question = When did you join?
					| description = Please enter a datetime.
					| fieldsize = sm
					| subfield
					| value = 2024-01-01T10:00
					| min = 2023-01-01T10:00
					| max = 2025-01-01T10:00
					| step = any
					| disabled
					| maxlength = 999
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

// Case 2 (date)

const expectedTemplate2 = `
<div data-fmd-name="joined" data-fmd-type="date" id="some-id" class="fmd-col-8 fmd-form-field">
	<label class="fmd-form-question" for="id_joined">
		What is your join <span class="fmd-text-nowrap" aria-hidden="true">date?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">date? (required)</span>
	</label>
	<input
		name="joined"
		id="id_joined"
		type="date"
		class="fmd-form-datetime-input fmd-form-control"
		placeholder="YYYY-MM-DD"
		required
		value="2024-12-30"
	>
</div>
`;

test("Case 2 (date)", () => {
	expect(
		beautify(
			createDatetimeField(
				"joined",
				"date",
				true,
				'id="some-id" class="fmd-col-8"',
				`
					| question = What is your join date?
					| value = 2024-12-30
					| min = yesterday
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate2, { format: "html" }));
});

// Case 3 (time)

const expectedTemplate3 = `
<div data-fmd-name="when" data-fmd-type="time" id="some-id" class="fmd-col-10 fmd-form-field fmd-form-field-sm fmd-form-field-classic-labels">
	<label class="fmd-form-question" for="id_when">
		When did you come in yesterday?
	</label>
	<p class="fmd-form-description">
		Please specify.
	</p>
	<input
		name="when"
		id="id_when"
		type="time"
		class="fmd-form-datetime-input fmd-form-control"
		placeholder="HH:mm"
		value="09:00"
		max="13:00"
	>
</div>
`;

test("Case 3 (time)", () => {
	expect(
		beautify(
			createDatetimeField(
				"when",
				"time",
				false,
				'id="some-id" class="fmd-col-10"',
				`
					|
					| question = When did you come in yesterday?
					| description = Please specify.
					| fieldsize = sm
					| subfield
					| value = 09:00
					| max = 13:00
					|
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate3, { format: "html" }));
});

// Case 4 (form delimiter changed to new line, different id and localization)

const expectedTemplate4 = `
<div data-fmd-name="joined" data-fmd-type="datetime-local" id="some-id" class="fmd-col-6 fmd-xs:col-10 fmd-form-field fmd-form-field-sm fmd-form-field-classic-labels" aria-label="Label" data-title="Some title">
	<label class="fmd-form-question" for="form1:id_joined">
		আপনি কখন জয়েন <span class="fmd-text-nowrap" aria-hidden="true">করলেন?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">করলেন? (প্রয়োজন)</span>
	</label>
	<input
		name="joined"
		id="form1:id_joined"
		type="datetime-local"
		class="fmd-form-datetime-input fmd-form-control"
		placeholder="YYYY-MM-DDTHH:mm"
		required
		value="2024-01-01T10:00"
		min="2023-01-01T10:00"
		max="2025-01-01T10:00"
	>
</div>
`;

test("Case 4 (form delimiter changed to new line, different id and localization)", () => {
	expect(
		beautify(
			createDatetimeField(
				"joined",
				"datetime",
				true,
				'id="some-id" class="fmd-col-6 fmd-xs:col-10" aria-label="Label" data-title="Some title"',
				`
					question = আপনি কখন জয়েন করলেন?
					fieldsize = sm
					subfield
					value = 2024-01-01T10:00
					min = 2023-01-01T10:00
					max = 2025-01-01T10:00
				`,
				"\n",
				"form1",
				"bn",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate4, { format: "html" }));
});

// Case 5 (no params)

const expectedTemplate5 = `
<div data-fmd-name="updated" data-fmd-type="date" class="fmd-form-field">
	<label class="fmd-form-question" for="id_updated">
		<span class="fmd-text-nowrap" aria-hidden="true">...<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">... (required)</span>
	</label>
	<input
		name="updated"
		id="id_updated"
		type="date"
		class="fmd-form-datetime-input fmd-form-control"
		placeholder="YYYY-MM-DD"
		required
	>
</div>
`;

test("Case 5 (no params)", () => {
	expect(
		beautify(
			createDatetimeField("updated", "date", true, "", "", "|", "", "en"),
			{
				format: "html",
			},
		),
	).toBe(beautify(expectedTemplate5, { format: "html" }));
});
