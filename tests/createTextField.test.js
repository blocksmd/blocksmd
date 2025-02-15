"use strict";

const { createTextField } = require("../src/form-field-create");
const { createCountryCallingCodeOptions } = require("../src/phone-numbers");
const beautify = require("beautify");

// Case 1

const expectedTemplate1 = `
<div id="some-id" class="fmd-col-6 fmd-xs:col-10 fmd-form-field fmd-form-field-sm fmd-form-field-classic-labels" aria-label="Label" data-title="Some title">
	<label class="fmd-form-question" for="id_name">
		What is your <span class="fmd-text-nowrap" aria-hidden="true">name?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">name? (required)</span>
	</label>
	<p class="fmd-form-description">
		Please enter your full name.
	</p>
	<input
		name="name"
		id="id_name"
		type="text"
		class="fmd-form-str-input fmd-form-control"
		placeholder="Type in your name here..."
		required
		value="John Doe"
		maxlength="255"
		pattern="[a-zA-Z0-9\s]+"
		disabled
		data-fmd-autofocus
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
				'id="some-id" class="fmd-col-6 fmd-xs:col-10" aria-label="Label" data-title="Some title"',
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
<div id="some-id" class="fmd-col-8 fmd-form-field">
	<label class="fmd-form-question" for="id_email">
		What is your email <span class="fmd-text-nowrap" aria-hidden="true">address?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">address? (required)</span>
	</label>
	<p class="fmd-form-description">
		We'll reach you directly.
	</p>
	<input
		name="email"
		id="id_email"
		type="email"
		class="fmd-form-str-input fmd-form-control"
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
				'id="some-id" class="fmd-col-8"',
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
<div id="some-id" class="fmd-col-10 fmd-form-field fmd-form-field-sm fmd-form-field-classic-labels">
	<label class="fmd-form-question" for="id_website">
		What is your website address?
	</label>
	<p class="fmd-form-description">
		You can keep this empty if you don't have one yet.
	</p>
	<input
		name="website"
		id="id_website"
		type="url"
		class="fmd-form-str-input fmd-form-control"
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
				'id="some-id" class="fmd-col-10"',
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
<div class="fmd-form-field">
	<label class="fmd-form-question" for="form1:id_name">
		আপনার নাম <span class="fmd-text-nowrap" aria-hidden="true">কি?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">কি? (প্রয়োজন)</span>
	</label>
	<p class="fmd-form-description">
		আপনার সম্পূর্ণ নাম লিখুন
	</p>
	<input
		name="name"
		id="form1:id_name"
		type="text"
		class="fmd-form-str-input fmd-form-control"
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
<div class="fmd-form-field">
	<label class="fmd-form-question" for="id_name">
		<span class="fmd-text-nowrap" aria-hidden="true">...<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">... (required)</span>
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
<div id="some-id" class="fmd-col-6 fmd-xs:col-10 fmd-form-field" aria-label="Label" data-title="Some title">
	<label class="fmd-form-question" for="id_description">
		Write a short description of your <span class="fmd-text-nowrap" aria-hidden="true">event<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">event (required)</span>
	</label>
	<p class="fmd-form-description">
		A few lines and you're good to go
	</p>
	<textarea
		name="description"
		id="id_description"
		class="fmd-form-str-input fmd-form-control"
		placeholder="Type in your description here..."
		required
		aria-describedby="id_description-form-text"
	></textarea>
	<div id="id_description-form-text" class="fmd-form-text-bottom fmd-d-flex fmd-align-items-center">
		<kbd class="fmd-d-flex fmd-align-items-center fmd-me-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fmd-icon fmd-mt-1 fmd-me-2" aria-hidden="true" focusable="false"><path d="M464 56V32h48V56 288v24H488 93.1l79 79 17 17-33.9 33.9-17-17L18.2 305l-17-17 17-17 120-120 17-17L189.1 168l-17 17-79 79H464V56z"/></svg> Enter</kbd>
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
				'id="some-id" class="fmd-col-6 fmd-xs:col-10" aria-label="Label" data-title="Some title"',
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
<div class="fmd-form-field">
	<label class="fmd-form-question" for="id_description">
		Write a short description of your event
	</label>
	<p class="fmd-form-description">
		A few lines and you're good to go
	</p>
	<textarea
		name="description"
		id="id_description"
		class="fmd-form-str-input fmd-form-control"
		placeholder="Type your answer here..."
		data-fmd-autofocus
		aria-describedby="id_description-form-text"
	>This is my
description</textarea>
	<div id="id_description-form-text" class="fmd-form-text-bottom fmd-d-flex fmd-align-items-center">
		<kbd class="fmd-d-flex fmd-align-items-center fmd-me-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fmd-icon fmd-mt-1 fmd-me-2" aria-hidden="true" focusable="false"><path d="M464 56V32h48V56 288v24H488 93.1l79 79 17 17-33.9 33.9-17-17L18.2 305l-17-17 17-17 120-120 17-17L189.1 168l-17 17-79 79H464V56z"/></svg> Enter</kbd>
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
<div id="some-id" class="fmd-col-8 fmd-form-field fmd-form-field-classic-labels">
	<label class="fmd-form-question" for="id_email">
		What is your email <span class="fmd-text-nowrap" aria-hidden="true">address?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">address? (required)</span>
	</label>
	<p class="fmd-form-description">
		We'll reach you directly.
	</p>
	<input
		name="email"
		id="id_email"
		type="email"
		class="fmd-form-str-input fmd-form-control"
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
				'id="some-id" class="fmd-col-8"',
				`
					| question = What is your email address?
					| description = We'll reach you directly.
					| value = john@example.com
					| pattern = .+@example\.com
					| labelStyle = classic
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
<div id="some-id" class="fmd-col-10 fmd-form-field fmd-form-field-sm fmd-form-field-classic-labels">
	<label class="fmd-form-question" for="id_website">
		What is your website address?
	</label>
	<p class="fmd-form-description">
		You can keep this empty if you don't have one yet.
	</p>
	<input
		name="website"
		id="id_website"
		type="url"
		class="fmd-form-str-input fmd-form-control"
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
				'id="some-id" class="fmd-col-10"',
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
<div class="fmd-form-field">
	<label class="fmd-form-question" for="id_description">
		...
	</label>
	<textarea
		name="description"
		id="id_description"
		class="fmd-form-str-input fmd-form-control"
		placeholder="এখানে আপনার উত্তর টাইপ করুন..."
		aria-describedby="id_description-form-text"
	></textarea>
	<div id="id_description-form-text" class="fmd-form-text-bottom fmd-d-flex fmd-align-items-center">
		<kbd class="fmd-d-flex fmd-align-items-center fmd-me-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fmd-icon fmd-mt-1 fmd-me-2" aria-hidden="true" focusable="false"><path d="M464 56V32h48V56 288v24H488 93.1l79 79 17 17-33.9 33.9-17-17L18.2 305l-17-17 17-17 120-120 17-17L189.1 168l-17 17-79 79H464V56z"/></svg> Enter</kbd>
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
<fieldset id="some-id" class="fmd-col-6 fmd-xs:col-10 fmd-form-field fmd-form-field-sm fmd-form-field-classic-labels" aria-label="Label" data-title="Some title">
	<legend class="fmd-form-question">
		What is your phone <span class="fmd-text-nowrap" aria-hidden="true">number?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">number? (required)</span>
	</legend>
	<p class="fmd-form-description">
		Please enter a number where we can reach you.
	</p>
	<div class="fmd-input-group">
		<select
			name="phoneCountryCode"
			id="id_phoneCountryCode"
			class="fmd-form-str-select fmd-form-countrycode-select fmd-form-select"
			required
			disabled
			data-fmd-autofocus
			aria-label="Country calling code"
		>
			${createCountryCallingCodeOptions("US", [])}
		</select>
		<input
			name="phone"
			id="id_phone"
			type="tel"
			class="fmd-form-str-input fmd-form-control"
			placeholder="(201) 555-0123"
			required
			maxlength="255"
			disabled
			data-fmd-autofocus
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
				'id="some-id" class="fmd-col-6 fmd-xs:col-10" aria-label="Label" data-title="Some title"',
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
<fieldset class="fmd-form-field">
	<legend class="fmd-form-question">
		...
	</legend>
	<div class="fmd-input-group">
		<select
			name="phoneCountryCode"
			id="id_phoneCountryCode"
			class="fmd-form-str-select fmd-form-countrycode-select fmd-form-select"
			required
			aria-label="দেশের কলিং কোড"
		>
			${createCountryCallingCodeOptions("BD", [])}
		</select>
		<input
			name="phone"
			id="id_phone"
			type="tel"
			class="fmd-form-str-input fmd-form-control"
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
<fieldset class="fmd-form-field">
	<legend class="fmd-form-question">
		What is your phone <span class="fmd-text-nowrap" aria-hidden="true">number?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">number? (required)</span>
	</legend>
	<p class="fmd-form-description">
		Please enter a number where we can reach you.
	</p>
	<div class="fmd-input-group">
		<select
			name="phoneCountryCode"
			id="id_phoneCountryCode"
			class="fmd-form-str-select fmd-form-countrycode-select fmd-form-select"
			required
			aria-label="Country calling code"
		>
			${createCountryCallingCodeOptions("SG", ["GB", "BD", "US"])}
		</select>
		<input
			name="phone"
			id="id_phone"
			type="tel"
			class="fmd-form-str-input fmd-form-control"
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

// Case 14 (password)

const expectedTemplate14 = `
<div id="some-id" class="fmd-col-8 fmd-form-field">
	<label class="fmd-form-question" for="id_password">
		Enter your <span class="fmd-text-nowrap" aria-hidden="true">password<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">password (required)</span>
	</label>
	<p class="fmd-form-description">
		Must be 8 characters long.
	</p>
	<input
		name="password"
		id="id_password"
		type="password"
		class="fmd-form-password-input fmd-form-control"
		placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
		required
		value="my-password"
		maxlength="8"
	>
</div>
`;

test("Case 14 (password)", () => {
	expect(
		beautify(
			createTextField(
				"password",
				"password",
				true,
				'id="some-id" class="fmd-col-8"',
				`
					| question = Enter your password
					| description = Must be 8 characters long.
					| value = my-password
					| maxlength = 8
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate14, { format: "html" }));
});
