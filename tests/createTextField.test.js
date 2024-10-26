("use strict");

const { createTextField } = require("../src/form-field-create");
const { createCountryCallingCodeOptions } = require("../src/phone-numbers");
const beautify = require("beautify");

// Case 1

const expectedTemplate1 = `
<div id="some-id" class="bmd-col-6 bmd-xs:col-10 bmd-form-field bmd-form-field-sm bmd-form-subfield" aria-label="Label" data-title="Some title">
	<label class="bmd-form-question" for="id_name">
		What is your <span class="bmd-text-nowrap" aria-hidden="true">name?<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">name? (required)</span>
	</label>
	<p class="bmd-form-description">
		Please enter your full name.
	</p>
	<input
		name="name"
		id="id_name"
		type="text"
		class="bmd-form-str-input bmd-form-control"
		placeholder="Type in your name here..."
		required
		value="John Doe"
		maxlength="255"
		pattern="[a-zA-Z0-9\s]+"
		disabled
		data-bmd-autofocus
	>
</div>
`;

test("Case 1", () => {
	expect(
		beautify(
			createTextField(
				"name",
				"text",
				true,
				'id="some-id" class="bmd-col-6 bmd-xs:col-10" aria-label="Label" data-title="Some title"',
				`
					| question = What is your name?
					| description = Please enter your full name.
					| fieldsize = sm
					| subfield
					| placeholder = Type in your name here...
					| value = John Doe
					| maxlength = 255
					| pattern = [a-zA-Z0-9\s]+
					| disabled
					| max = 999
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

// Case 2 (email)

const expectedTemplate2 = `
<div id="some-id" class="bmd-col-8 bmd-form-field">
	<label class="bmd-form-question" for="id_email">
		What is your email <span class="bmd-text-nowrap" aria-hidden="true">address?<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">address? (required)</span>
	</label>
	<p class="bmd-form-description">
		We'll reach you directly.
	</p>
	<input
		name="email"
		id="id_email"
		type="email"
		class="bmd-form-str-input bmd-form-control"
		placeholder="name@example.com"
		required
		value="john@example.com"
	>
</div>
`;

test("Case 2 (email)", () => {
	expect(
		beautify(
			createTextField(
				"email",
				"email",
				true,
				'id="some-id" class="bmd-col-8"',
				`
					| question = What is your email address?
					| description = We'll reach you directly.
					| value = john@example.com
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate2, { format: "html" }));
});

// Case 3 (url)

const expectedTemplate3 = `
<div id="some-id" class="bmd-col-10 bmd-form-field bmd-form-field-sm bmd-form-subfield">
	<label class="bmd-form-question" for="id_website">
		What is your website address?
	</label>
	<p class="bmd-form-description">
		You can keep this empty if you don't have one yet.
	</p>
	<input
		name="website"
		id="id_website"
		type="url"
		class="bmd-form-str-input bmd-form-control"
		placeholder="https://example.com"
		maxlength="255"
	>
</div>
`;

test("Case 3 (url)", () => {
	expect(
		beautify(
			createTextField(
				"website",
				"url",
				false,
				'id="some-id" class="bmd-col-10"',
				`
					|
					| question = What is your website address?
					| description = You can keep this empty if you don't have one yet.
					| fieldsize = sm
					| subfield
					| maxlength = 255
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
<div class="bmd-form-field">
	<label class="bmd-form-question" for="form1:id_name">
		আপনার নাম <span class="bmd-text-nowrap" aria-hidden="true">কি?<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">কি? (প্রয়োজন)</span>
	</label>
	<p class="bmd-form-description">
		আপনার সম্পূর্ণ নাম লিখুন
	</p>
	<input
		name="name"
		id="form1:id_name"
		type="text"
		class="bmd-form-str-input bmd-form-control"
		placeholder="এখানে আপনার উত্তর টাইপ করুন..."
		required
	>
</div>
`;

test("Case 4 (form delimiter changed to new line, different id and localization)", () => {
	expect(
		beautify(
			createTextField(
				"name",
				"text",
				true,
				"",
				`
					question = আপনার নাম কি?
					description = আপনার সম্পূর্ণ নাম লিখুন
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
<div class="bmd-form-field">
	<label class="bmd-form-question" for="id_name">
		<span class="bmd-text-nowrap" aria-hidden="true">...<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">... (required)</span>
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
`;

test("Case 5 (no params)", () => {
	expect(
		beautify(createTextField("name", "text", true, "", "", "|", "", "en"), {
			format: "html",
		}),
	).toBe(beautify(expectedTemplate5, { format: "html" }));
});

// Case 6 (multiline)

const expectedTemplate6 = `
<div id="some-id" class="bmd-col-6 bmd-xs:col-10 bmd-form-field" aria-label="Label" data-title="Some title">
	<label class="bmd-form-question" for="id_description">
		Write a short description of your <span class="bmd-text-nowrap" aria-hidden="true">event<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">event (required)</span>
	</label>
	<p class="bmd-form-description">
		A few lines and you're good to go
	</p>
	<textarea
		name="description"
		id="id_description"
		class="bmd-form-str-input bmd-form-control"
		placeholder="Type in your description here..."
		required
		aria-details="id_description-form-text"
	></textarea>
	<div id="id_description-form-text" class="bmd-form-text-bottom bmd-d-flex bmd-align-items-center">
		<kbd class="bmd-d-flex bmd-align-items-center bmd-me-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="bmd-icon bmd-mt-1 bmd-me-2" aria-hidden="true" focusable="false"><path d="M464 56V32h48V56 288v24H488 93.1l79 79 17 17-33.9 33.9-17-17L18.2 305l-17-17 17-17 120-120 17-17L189.1 168l-17 17-79 79H464V56z"/></svg> Enter</kbd>
		to add new line
	</div>
</div>
`;

test("Case 6 (multiline)", () => {
	expect(
		beautify(
			createTextField(
				"description",
				"text",
				true,
				'id="some-id" class="bmd-col-6 bmd-xs:col-10" aria-label="Label" data-title="Some title"',
				`
					| question = Write a short description of your event
					| description = A few lines and you're good to go
					| placeholder = Type in your description here...
					| multiline
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate6, { format: "html" }));
});

// Case 7 (multiline with value)

const expectedTemplate7 = `
<div class="bmd-form-field">
	<label class="bmd-form-question" for="id_description">
		Write a short description of your event
	</label>
	<p class="bmd-form-description">
		A few lines and you're good to go
	</p>
	<textarea
		name="description"
		id="id_description"
		class="bmd-form-str-input bmd-form-control"
		placeholder="Type your answer here..."
		data-bmd-autofocus
		aria-details="id_description-form-text"
	>This is my
description</textarea>
	<div id="id_description-form-text" class="bmd-form-text-bottom bmd-d-flex bmd-align-items-center">
		<kbd class="bmd-d-flex bmd-align-items-center bmd-me-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="bmd-icon bmd-mt-1 bmd-me-2" aria-hidden="true" focusable="false"><path d="M464 56V32h48V56 288v24H488 93.1l79 79 17 17-33.9 33.9-17-17L18.2 305l-17-17 17-17 120-120 17-17L189.1 168l-17 17-79 79H464V56z"/></svg> Enter</kbd>
		to add new line
	</div>
</div>
`;

test("Case 7 (multiline with value)", () => {
	expect(
		beautify(
			createTextField(
				"description",
				"text",
				false,
				"",
				`
					| question = Write a short description of your event
					| description = A few lines and you're good to go
					| value = This is my
					description
					| multiline
					| autofocus
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate7, { format: "html" }));
});

// Case 8 (email with value)

const expectedTemplate8 = `
<div id="some-id" class="bmd-col-8 bmd-form-field">
	<label class="bmd-form-question" for="id_email">
		What is your email <span class="bmd-text-nowrap" aria-hidden="true">address?<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">address? (required)</span>
	</label>
	<p class="bmd-form-description">
		We'll reach you directly.
	</p>
	<input
		name="email"
		id="id_email"
		type="email"
		class="bmd-form-str-input bmd-form-control"
		placeholder="name@example.com"
		required
		value="john@example.com"
		pattern=".+@example\.com"
	>
</div>
`;

test("Case 8 (email with value)", () => {
	expect(
		beautify(
			createTextField(
				"email",
				"email",
				true,
				'id="some-id" class="bmd-col-8"',
				`
					| question = What is your email address?
					| description = We'll reach you directly.
					| value = john@example.com
					| pattern = .+@example\.com
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate8, { format: "html" }));
});

// Case 9 (url with value)

const expectedTemplate9 = `
<div id="some-id" class="bmd-col-10 bmd-form-field bmd-form-field-sm bmd-form-subfield">
	<label class="bmd-form-question" for="id_website">
		What is your website address?
	</label>
	<p class="bmd-form-description">
		You can keep this empty if you don't have one yet.
	</p>
	<input
		name="website"
		id="id_website"
		type="url"
		class="bmd-form-str-input bmd-form-control"
		placeholder="https://example.com"
		value="https://"
		maxlength="255"
	>
</div>
`;

test("Case 9 (url with value)", () => {
	expect(
		beautify(
			createTextField(
				"website",
				"url",
				false,
				'id="some-id" class="bmd-col-10"',
				`
					|
					| question = What is your website address?
					| description = You can keep this empty if you don't have one yet.
					| fieldsize = sm
					| subfield
					| maxlength = 255
					| value = https://
					|
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate9, { format: "html" }));
});

// Case 10 (multiline with different localization)

const expectedTemplate10 = `
<div class="bmd-form-field">
	<label class="bmd-form-question" for="id_description">
		...
	</label>
	<textarea
		name="description"
		id="id_description"
		class="bmd-form-str-input bmd-form-control"
		placeholder="এখানে আপনার উত্তর টাইপ করুন..."
		aria-details="id_description-form-text"
	></textarea>
	<div id="id_description-form-text" class="bmd-form-text-bottom bmd-d-flex bmd-align-items-center">
		<kbd class="bmd-d-flex bmd-align-items-center bmd-me-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="bmd-icon bmd-mt-1 bmd-me-2" aria-hidden="true" focusable="false"><path d="M464 56V32h48V56 288v24H488 93.1l79 79 17 17-33.9 33.9-17-17L18.2 305l-17-17 17-17 120-120 17-17L189.1 168l-17 17-79 79H464V56z"/></svg> Enter</kbd>
		নতুন লাইন যোগ করতে
	</div>
</div>
`;

test("Case 10 (multiline with different localization)", () => {
	expect(
		beautify(
			createTextField(
				"description",
				"text",
				false,
				"",
				"multiline",
				"|",
				"",
				"bn",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate10, { format: "html" }));
});

// Case 11 (telephone number)

const expectedTemplate11 = `
<fieldset id="some-id" class="bmd-col-6 bmd-xs:col-10 bmd-form-field bmd-form-field-sm bmd-form-subfield" aria-label="Label" data-title="Some title">
	<legend class="bmd-form-question">
		What is your phone <span class="bmd-text-nowrap" aria-hidden="true">number?<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">number? (required)</span>
	</legend>
	<p class="bmd-form-description">
		Please enter a number where we can reach you.
	</p>
	<div class="bmd-input-group">
		<select
			name="phoneCountryCode"
			id="id_phoneCountryCode"
			class="bmd-form-str-select bmd-form-countrycode-select bmd-form-select"
			required
			disabled
			data-bmd-autofocus
			aria-label="Country calling code"
		>
			${createCountryCallingCodeOptions("US", [])}
		</select>
		<input
			name="phone"
			id="id_phone"
			type="tel"
			class="bmd-form-str-input bmd-form-control"
			placeholder="(201) 555-0123"
			required
			maxlength="255"
			disabled
			data-bmd-autofocus
			aria-label="Phone number"
		>
	</div>
</fieldset>
`;

test("Case 11 (telephone number)", () => {
	expect(
		beautify(
			createTextField(
				"phone",
				"tel",
				true,
				'id="some-id" class="bmd-col-6 bmd-xs:col-10" aria-label="Label" data-title="Some title"',
				`
					| question = What is your phone number?
					| description = Please enter a number where we can reach you.
					| fieldsize = sm
					| subfield
					| maxlength = 255
					| disabled
					| max = 999
					| autofocus
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate11, { format: "html" }));
});

// Case 12 (telephone number with different country)

const expectedTemplate12 = `
<fieldset class="bmd-form-field">
	<legend class="bmd-form-question">
		...
	</legend>
	<div class="bmd-input-group">
		<select
			name="phoneCountryCode"
			id="id_phoneCountryCode"
			class="bmd-form-str-select bmd-form-countrycode-select bmd-form-select"
			required
			aria-label="দেশের কলিং কোড"
		>
			${createCountryCallingCodeOptions("BD", [])}
		</select>
		<input
			name="phone"
			id="id_phone"
			type="tel"
			class="bmd-form-str-input bmd-form-control"
			placeholder="01812-345678"
			aria-label="ফোন নম্বর"
		>
	</div>
</fieldset>
`;

test("Case 12 (telephone number with different country)", () => {
	expect(
		beautify(
			createTextField("phone", "tel", false, "", "country=bd", "|", "", "bn"),
			{
				format: "html",
			},
		),
	).toBe(beautify(expectedTemplate12, { format: "html" }));
});

// Case 13 (telephone number with restricted available countries)

const expectedTemplate13 = `
<fieldset class="bmd-form-field">
	<legend class="bmd-form-question">
		What is your phone <span class="bmd-text-nowrap" aria-hidden="true">number?<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">number? (required)</span>
	</legend>
	<p class="bmd-form-description">
		Please enter a number where we can reach you.
	</p>
	<div class="bmd-input-group">
		<select
			name="phoneCountryCode"
			id="id_phoneCountryCode"
			class="bmd-form-str-select bmd-form-countrycode-select bmd-form-select"
			required
			aria-label="Country calling code"
		>
			${createCountryCallingCodeOptions("SG", ["GB", "BD", "US"])}
		</select>
		<input
			name="phone"
			id="id_phone"
			type="tel"
			class="bmd-form-str-input bmd-form-control"
			placeholder="8123 4567"
			required
			aria-label="Phone number"
		>
	</div>
</fieldset>
`;

test("Case 13 (telephone number with restricted available countries)", () => {
	expect(
		beautify(
			createTextField(
				"phone",
				"tel",
				true,
				"",
				`
					| question = What is your phone number?
					| description = Please enter a number where we can reach you.
					| country =     sg
					| availableCountries =   GB,bD,       US  
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate13, { format: "html" }));
});
