"use strict";

const { parseSlide } = require("../src/slides-parse");
const beautify = require("beautify");

// Case 1 (form, slide with form field)

const template1 = `
-> profession == "business"
|> 25%
|= CENTER
<< DISABLE
>> POST

# Heading

This is a paragraph.

email* = EmailInput(question=What is your email address?)
`;
const expectedTemplate1 = `
<form
	method="POST"
	action="javascript:void(0);"
	class="fmd-slide"
	data-fmd-jump="profession == 'business'"
	data-fmd-page-progress="25%"
	data-fmd-disable-prev-btn
	data-fmd-post
>
	<div class="fmd-grid">
		<markdown>

		# Heading

		This is a paragraph.

		email* = EmailInput(question=What is your email address?)

		</markdown>
		<div class="fmd-next-controls fmd-d-flex fmd-justify-content-center">
			<button type="submit" class="fmd-submit-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				OK
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon fmd-ms-2" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
			</button>
		</div>
	</div>
</form>
`;

test("Case 1 (form, slide with form field)", () => {
	const result1 = parseSlide(
		template1,
		true,
		false,
		{ showRestartBtn: false, submitBtnText: "" },
		"en",
	);
	expect(beautify(result1.template, { format: "html" })).toBe(
		beautify(expectedTemplate1, { format: "html" }),
	);
	expect(result1.slideType).toBe("body");
});

// Case 2 (form, slide with form field and incorrect page progress, different localization)

const template2 = `
		->    age > 18 && profession == "service"    
|>  33 percent

# Heading

This is a paragraph.

email* = EmailInput(question=What is your email address?)
`;
const expectedTemplate2 = `
<form
	method="POST"
	action="javascript:void(0);"
	class="fmd-slide"
	data-fmd-jump="age > 18 && profession == 'service'"
>
	<div class="fmd-grid">
		<markdown>

		# Heading

		This is a paragraph.

		email* = EmailInput(question=What is your email address?)

		</markdown>
		<div class="fmd-next-controls fmd-d-flex">
			<button type="submit" class="fmd-submit-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				ওকে
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon fmd-ms-2" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
			</button>
		</div>
	</div>
</form>
`;

test("Case 2 (form, slide with form field and incorrect page progress, different localization)", () => {
	const result2 = parseSlide(
		template2,
		true,
		false,
		{ showRestartBtn: false, submitBtnText: "" },
		"bn",
	);
	expect(beautify(result2.template, { format: "html" })).toBe(
		beautify(expectedTemplate2, { format: "html" }),
	);
	expect(result2.slideType).toBe("body");
});

// Case 3 (form, slide without form field)

const template3 = `
|> 3/4
>> post

# Heading

This is a paragraph.
`;
const expectedTemplate3 = `
<div
	class="fmd-slide"
	data-fmd-page-progress="calc(100% * (3/4))"
>
	<div class="fmd-grid">
		<markdown>

		# Heading

		This is a paragraph.

		</markdown>
		<div class="fmd-next-controls fmd-d-flex">
			<button type="button" class="fmd-next-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				Next
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 3 (form, slide without form field)", () => {
	const result3 = parseSlide(
		template3,
		true,
		false,
		{ showRestartBtn: true, submitBtnText: "" },
		"en",
	);
	expect(beautify(result3.template, { format: "html" })).toBe(
		beautify(expectedTemplate3, { format: "html" }),
	);
	expect(result3.slideType).toBe("body");
});

// Case 4 (form, slide without form field, different localization)

const template4 = `
-> name == "Jack"

# Heading

|> 75%

This is a paragraph.
`;
const expectedTemplate4 = `
<div
	class="fmd-slide"
	data-fmd-jump="name == 'Jack'"
	data-fmd-page-progress="75%"
>
	<div class="fmd-grid">
		<markdown>

		# Heading



		This is a paragraph.

		</markdown>
		<div class="fmd-next-controls fmd-d-flex">
			<button type="button" class="fmd-next-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				পরবর্তী
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 4 (form, slide without form field, different localization)", () => {
	const result4 = parseSlide(
		template4,
		true,
		false,
		{ showRestartBtn: false, submitBtnText: "" },
		"bn",
	);
	expect(beautify(result4.template, { format: "html" })).toBe(
		beautify(expectedTemplate4, { format: "html" }),
	);
	expect(result4.slideType).toBe("body");
});

// Case 5 (not form, slide with form field)

const template5 = `
-> profession == "business"
|> 25%
=| stretch
>> POST

# Heading

This is a paragraph.

email* = EmailInput(question=What is your email address?)
`;
const expectedTemplate5 = `
<div
	class="fmd-slide"
	data-fmd-jump="profession == 'business'"
	data-fmd-page-progress="25%"
>
	<div class="fmd-grid">
		<markdown>

		# Heading

		This is a paragraph.

		email* = EmailInput(question=What is your email address?)

		</markdown>
		<div class="fmd-next-controls fmd-d-flex fmd-justify-content-stretch">
			<button type="button" class="fmd-next-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				Next
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 5 (not form, slide with form field)", () => {
	const result5 = parseSlide(
		template5,
		false,
		false,
		{ showRestartBtn: false, submitBtnText: "" },
		"en",
	);
	expect(beautify(result5.template, { format: "html" })).toBe(
		beautify(expectedTemplate5, { format: "html" }),
	);
	expect(result5.slideType).toBe("body");
});

// Case 6 (not form, slide without form field)

const template6 = `
|> 75%
>> POST
<< DISABLE

# Heading

This is a paragraph.
`;
const expectedTemplate6 = `
<div
	class="fmd-slide"
	data-fmd-page-progress="75%"
	data-fmd-disable-prev-btn
>
	<div class="fmd-grid">
		<markdown>

		# Heading

		This is a paragraph.

		</markdown>
		<div class="fmd-next-controls fmd-d-flex">
			<button type="button" class="fmd-next-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				Next
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 6 (not form, slide without form field)", () => {
	const result6 = parseSlide(
		template6,
		false,
		false,
		{ showRestartBtn: false, submitBtnText: "" },
		"en",
	);
	expect(beautify(result6.template, { format: "html" })).toBe(
		beautify(expectedTemplate6, { format: "html" }),
	);
	expect(result6.slideType).toBe("body");
});

// Case 7 (form, start slide without form field)

const template7 = `
-> START
|> 25%
>> PoSt

# Welcome
`;
const expectedTemplate7 = `
<div
	class="fmd-slide"
	data-fmd-page-progress="25%"
>
	<div class="fmd-grid">
		<markdown>

		# Welcome

		</markdown>
		<div class="fmd-next-controls fmd-d-flex">
			<button type="button" class="fmd-next-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				Start
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 7 (form, start slide without form field)", () => {
	const result7 = parseSlide(
		template7,
		true,
		false,
		{ showRestartBtn: false, submitBtnText: "Submit" },
		"en",
	);
	expect(beautify(result7.template, { format: "html" })).toBe(
		beautify(expectedTemplate7, { format: "html" }),
	);
	expect(result7.slideType).toBe("start");
});

// Case 8 (form, start slide without form field, different localization)

const template8 = `
   ->   Start
|> 25%
	|= eND
>> POST
<< DISABLE

# Welcome
`;
const expectedTemplate8 = `
<div
	class="fmd-slide"
	data-fmd-page-progress="25%"
	data-fmd-disable-prev-btn
>
	<div class="fmd-grid">
		<markdown>

		# Welcome

		</markdown>
		<div class="fmd-next-controls fmd-d-flex fmd-justify-content-end">
			<button type="button" class="fmd-next-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				শুরু
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 8 (form, start slide without form field, different localization)", () => {
	const result8 = parseSlide(
		template8,
		true,
		false,
		{ showRestartBtn: false, submitBtnText: "" },
		"bn",
	);
	expect(beautify(result8.template, { format: "html" })).toBe(
		beautify(expectedTemplate8, { format: "html" }),
	);
	expect(result8.slideType).toBe("start");
});

// Case 9 (form, start slide with custom start button and without form field)

const template9 = `
-> start -> Let's Start

# Welcome
`;
const expectedTemplate9 = `
<div
	class="fmd-slide"
>
	<div class="fmd-grid">
		<markdown>

		# Welcome

		</markdown>
		<div class="fmd-next-controls fmd-d-flex">
			<button type="button" class="fmd-next-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				Let's Start
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 9 (form, start slide with custom start button and without form field)", () => {
	const result9 = parseSlide(
		template9,
		true,
		false,
		{ showRestartBtn: false, submitBtnText: "" },
		"en",
	);
	expect(beautify(result9.template, { format: "html" })).toBe(
		beautify(expectedTemplate9, { format: "html" }),
	);
	expect(result9.slideType).toBe("start");
});

// Case 10 (form, start slide with form field)

const template10 = `
-> START
|> 25%
>> post

# Heading

This is a paragraph.

email* = EmailInput(question=What is your email address?)
`;
const expectedTemplate10 = `
<form
	method="POST"
	action="javascript:void(0);"
	class="fmd-slide"
	data-fmd-page-progress="25%"
	data-fmd-post
>
	<div class="fmd-grid">
		<markdown>

		# Heading

		This is a paragraph.

		email* = EmailInput(question=What is your email address?)

		</markdown>
		<div class="fmd-next-controls fmd-d-flex">
			<button type="submit" class="fmd-submit-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				Start
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
	</div>
</form>
`;

test("Case 10 (form, start slide with form field)", () => {
	const result10 = parseSlide(
		template10,
		true,
		false,
		{ showRestartBtn: true, submitBtnText: "" },
		"en",
	);
	expect(beautify(result10.template, { format: "html" })).toBe(
		beautify(expectedTemplate10, { format: "html" }),
	);
	expect(result10.slideType).toBe("start");
});

// Case 11 (form, start slide with custom start button and form field)

const template11 = `
   ->   START     ->   Let's Go!   

# Heading

This is a paragraph.

email* = EmailInput(question=What is your email address?)
`;
const expectedTemplate11 = `
<form
	method="POST"
	action="javascript:void(0);"
	class="fmd-slide"
>
	<div class="fmd-grid">
		<markdown>

		# Heading

		This is a paragraph.

		email* = EmailInput(question=What is your email address?)

		</markdown>
		<div class="fmd-next-controls fmd-d-flex">
			<button type="submit" class="fmd-submit-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				Let's Go!
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
	</div>
</form>
`;

test("Case 11 (form, start slide with custom start button and form field)", () => {
	const result11 = parseSlide(
		template11,
		true,
		false,
		{ showRestartBtn: false, submitBtnText: "" },
		"en",
	);
	expect(beautify(result11.template, { format: "html" })).toBe(
		beautify(expectedTemplate11, { format: "html" }),
	);
	expect(result11.slideType).toBe("start");
});

// Case 12 (not form, start slide with form field)

const template12 = `
-> start

# Welcome

email* = EmailInput(question=What is your email address?)
`;
const expectedTemplate12 = `
<div
	class="fmd-slide"
>
	<div class="fmd-grid">
		<markdown>

		# Welcome

		email* = EmailInput(question=What is your email address?)

		</markdown>
		<div class="fmd-next-controls fmd-d-flex">
			<button type="button" class="fmd-next-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				Start
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 12 (not form, start slide with form field)", () => {
	const result12 = parseSlide(
		template12,
		false,
		false,
		{ showRestartBtn: false, submitBtnText: "" },
		"en",
	);
	expect(beautify(result12.template, { format: "html" })).toBe(
		beautify(expectedTemplate12, { format: "html" }),
	);
	expect(result12.slideType).toBe("start");
});

// Case 13 (not form, start slide with custom start button and form field)

const template13 = `
			-> START -> Next

# Welcome

email* = EmailInput(question=What is your email address?)
`;
const expectedTemplate13 = `
<div
	class="fmd-slide"
>
	<div class="fmd-grid">
		<markdown>

		# Welcome

		email* = EmailInput(question=What is your email address?)

		</markdown>
		<div class="fmd-next-controls fmd-d-flex">
			<button type="button" class="fmd-next-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				Next
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 13 (not form, start slide with custom start button and form field)", () => {
	const result13 = parseSlide(
		template13,
		false,
		false,
		{ showRestartBtn: false, submitBtnText: "" },
		"en",
	);
	expect(beautify(result13.template, { format: "html" })).toBe(
		beautify(expectedTemplate13, { format: "html" }),
	);
	expect(result13.slideType).toBe("start");
});

// Case 14 (form, end slide)

const template14 = `
-> END
|> 95%
>> POST

# Welcome

email* = EmailInput(question=What is your email address?)
`;
const expectedTemplate14 = `
<div
	class="fmd-slide fmd-end-slide"
>
	<div class="fmd-grid">
		<markdown>

		# Welcome

		email* = EmailInput(question=What is your email address?)

		</markdown>
	</div>
</div>
`;

test("Case 14 (form, end slide)", () => {
	const result14 = parseSlide(
		template14,
		true,
		false,
		{ showRestartBtn: false, submitBtnText: "" },
		"en",
	);
	expect(beautify(result14.template, { format: "html" })).toBe(
		beautify(expectedTemplate14, { format: "html" }),
	);
	expect(result14.slideType).toBe("end");
});

// Case 15 (not form, end slide with custom redirect)

const template15 = `
-> END -> https://example.com/success/
|> 95%
>> POST

# Welcome

email* = EmailInput(question=What is your email address?)
`;
const expectedTemplate15 = `
<div
	class="fmd-slide fmd-end-slide"
	data-fmd-redirect="https://example.com/success/"
>
	<div class="fmd-grid">
		<markdown>

		# Welcome

		email* = EmailInput(question=What is your email address?)

		</markdown>
	</div>
</div>
`;

test("Case 15 (not form, end slide with custom redirect)", () => {
	const result15 = parseSlide(
		template15,
		false,
		false,
		{ showRestartBtn: false, submitBtnText: "" },
		"en",
	);
	expect(beautify(result15.template, { format: "html" })).toBe(
		beautify(expectedTemplate15, { format: "html" }),
	);
	expect(result15.slideType).toBe("end");
});

// Case 16 (form, end slide with custom redirect, different localization)

const template16 = `
   ->   end   -> https://example.com/success/
  |> 95%
>>  POST

# Welcome

email* = EmailInput(question=What is your email address?)
`;
const expectedTemplate16 = `
<div
	class="fmd-slide fmd-end-slide"
	data-fmd-redirect="https://example.com/success/"
>
	<div class="fmd-grid">
		<markdown>

		# Welcome

		email* = EmailInput(question=What is your email address?)

		</markdown>
	</div>
</div>
`;

test("Case 16 (form, end slide with custom redirect, different localization)", () => {
	const result16 = parseSlide(
		template16,
		true,
		false,
		{ showRestartBtn: false, submitBtnText: "" },
		"bn",
	);
	expect(beautify(result16.template, { format: "html" })).toBe(
		beautify(expectedTemplate16, { format: "html" }),
	);
	expect(result16.slideType).toBe("end");
});

// Case 17 (form, empty template)

const template17 = "";
const expectedTemplate17 = `
<div
	class="fmd-slide"
>
	<div class="fmd-grid">
		<markdown>

		</markdown>
		<div class="fmd-next-controls fmd-d-flex">
			<button type="button" class="fmd-next-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				Next
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 17 (form, empty template)", () => {
	const result17 = parseSlide(
		template17,
		true,
		false,
		{ showRestartBtn: false, submitBtnText: "" },
		"en",
	);
	expect(beautify(result17.template, { format: "html" })).toBe(
		beautify(expectedTemplate17, { format: "html" }),
	);
	expect(result17.slideType).toBe("body");
});

// Case 18 (form, first slide with form field)

const template18 = `
-> profession == "business"
|> 25%
>> POST
<< DISABLE

# Heading

This is a paragraph.

email* = EmailInput(question=What is your email address?)
`;
const expectedTemplate18 = `
<form
	method="POST"
	action="javascript:void(0);"
	class="fmd-slide fmd-first-slide"
	data-fmd-page-progress="25%"
	data-fmd-disable-prev-btn
	data-fmd-post
>
	<div class="fmd-grid">
		<markdown>

		# Heading

		This is a paragraph.

		email* = EmailInput(question=What is your email address?)

		</markdown>
		<div class="fmd-next-controls fmd-d-flex">
			<button type="submit" class="fmd-submit-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				OK
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon fmd-ms-2" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
			</button>
		</div>
	</div>
</form>
`;

test("Case 18 (form, first slide with form field)", () => {
	const result18 = parseSlide(
		template18,
		true,
		true,
		{ showRestartBtn: false, submitBtnText: "" },
		"en",
	);
	expect(beautify(result18.template, { format: "html" })).toBe(
		beautify(expectedTemplate18, { format: "html" }),
	);
	expect(result18.slideType).toBe("body");
});

// Case 19 (form, start first slide without form field)

const template19 = `
-> START
|> 25%
>> POST

# Welcome
`;
const expectedTemplate19 = `
<div
	class="fmd-slide fmd-first-slide"
	data-fmd-page-progress="25%"
>
	<div class="fmd-grid">
		<markdown>

		# Welcome

		</markdown>
		<div class="fmd-next-controls fmd-d-flex">
			<button type="button" class="fmd-next-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				Start
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 19 (form, start first slide without form field)", () => {
	const result19 = parseSlide(
		template19,
		true,
		true,
		{ showRestartBtn: false, submitBtnText: "" },
		"en",
	);
	expect(beautify(result19.template, { format: "html" })).toBe(
		beautify(expectedTemplate19, { format: "html" }),
	);
	expect(result19.slideType).toBe("start");
});

// Case 20 (not form, first slide with form field)

const template20 = `
-> profession == "business"
|> 25%
>> POST

# Heading

This is a paragraph.

email* = EmailInput(question=What is your email address?)
`;
const expectedTemplate20 = `
<div
	class="fmd-slide fmd-first-slide"
	data-fmd-page-progress="25%"
>
	<div class="fmd-grid">
		<markdown>

		# Heading

		This is a paragraph.

		email* = EmailInput(question=What is your email address?)

		</markdown>
		<div class="fmd-next-controls fmd-d-flex">
			<button type="button" class="fmd-next-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				Next
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 20 (not form, first slide with form field)", () => {
	const result20 = parseSlide(
		template20,
		false,
		true,
		{ showRestartBtn: false, submitBtnText: "" },
		"en",
	);
	expect(beautify(result20.template, { format: "html" })).toBe(
		beautify(expectedTemplate20, { format: "html" }),
	);
	expect(result20.slideType).toBe("body");
});

// Case 21 (form, end slide, show restart button)

const template21 = `
-> END
|> 95%
>> POST

# Welcome

email* = EmailInput(question=What is your email address?)
`;
const expectedTemplate21 = `
<div
	class="fmd-slide fmd-end-slide"
>
	<div class="fmd-grid">
		<markdown>

		# Welcome

		email* = EmailInput(question=What is your email address?)

		</markdown>
		<div class="fmd-next-controls fmd-d-flex fmd-justify-content-center">
			<button type="button" class="fmd-restart-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				Restart
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fmd-icon fmd-ms-2" aria-hidden="true" focusable="false"><path d="M472 224c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24s-24 10.7-24 24v80.1l-20-23.5C387 63.4 325.1 32 256 32C132.3 32 32 132.3 32 256s100.3 224 224 224c50.4 0 97-16.7 134.4-44.8c10.6-8 12.7-23 4.8-33.6s-23-12.7-33.6-4.8C332.2 418.9 295.7 432 256 432c-97.2 0-176-78.8-176-176s78.8-176 176-176c54.3 0 102.9 24.6 135.2 63.4l.1 .2 0 0L418.9 176H328c-13.3 0-24 10.7-24 24s10.7 24 24 24H472z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 21 (form, end slide, show restart button)", () => {
	const result21 = parseSlide(
		template21,
		true,
		false,
		{ showRestartBtn: true, submitBtnText: "" },
		"en",
	);
	expect(beautify(result21.template, { format: "html" })).toBe(
		beautify(expectedTemplate21, { format: "html" }),
	);
	expect(result21.slideType).toBe("end");
});

// Case 22 (form, slide with form field, different submit button text)

const template22 = `
-> profession == "business"
|> 25%
<< DISABLE
>> POST

# Heading

This is a paragraph.

email* = EmailInput(question=What is your email address?)
`;
const expectedTemplate22 = `
<form
	method="POST"
	action="javascript:void(0);"
	class="fmd-slide"
	data-fmd-jump="profession == 'business'"
	data-fmd-page-progress="25%"
	data-fmd-disable-prev-btn
	data-fmd-post
>
	<div class="fmd-grid">
		<markdown>

		# Heading

		This is a paragraph.

		email* = EmailInput(question=What is your email address?)

		</markdown>
		<div class="fmd-next-controls fmd-d-flex">
			<button type="submit" class="fmd-submit-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				Submit form
			</button>
		</div>
	</div>
</form>
`;

test("Case 22 (form, slide with form field, different submit button text)", () => {
	const result22 = parseSlide(
		template22,
		true,
		false,
		{ showRestartBtn: false, submitBtnText: "Submit form" },
		"en",
	);
	expect(beautify(result22.template, { format: "html" })).toBe(
		beautify(expectedTemplate22, { format: "html" }),
	);
	expect(result22.slideType).toBe("body");
});

// Case 23 (form, end slide, show restart button, different localization)

const template23 = `
-> END
|> 95%
>> POST

# Welcome

email* = EmailInput(question=What is your email address?)
`;
const expectedTemplate23 = `
<div
	class="fmd-slide fmd-end-slide"
>
	<div class="fmd-grid">
		<markdown>

		# Welcome

		email* = EmailInput(question=What is your email address?)

		</markdown>
		<div class="fmd-next-controls fmd-d-flex fmd-justify-content-center">
			<button type="button" class="fmd-restart-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				আবার শুরু
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fmd-icon fmd-ms-2" aria-hidden="true" focusable="false"><path d="M472 224c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24s-24 10.7-24 24v80.1l-20-23.5C387 63.4 325.1 32 256 32C132.3 32 32 132.3 32 256s100.3 224 224 224c50.4 0 97-16.7 134.4-44.8c10.6-8 12.7-23 4.8-33.6s-23-12.7-33.6-4.8C332.2 418.9 295.7 432 256 432c-97.2 0-176-78.8-176-176s78.8-176 176-176c54.3 0 102.9 24.6 135.2 63.4l.1 .2 0 0L418.9 176H328c-13.3 0-24 10.7-24 24s10.7 24 24 24H472z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 23 (form, end slide, show restart button, different localization)", () => {
	const result23 = parseSlide(
		template23,
		true,
		false,
		{ showRestartBtn: true, submitBtnText: "" },
		"bn",
	);
	expect(beautify(result23.template, { format: "html" })).toBe(
		beautify(expectedTemplate23, { format: "html" }),
	);
	expect(result23.slideType).toBe("end");
});
