"use strict";

const { parseSlides } = require("../src/slides-parse");
const beautify = require("beautify");

// Case 1 (form, two slides)

const template1 = `
name* = TextInput(
	| question = What is your name?
)
---
email* = EmailInput(
	| question = What is your email address?
)
`;
const expectedTemplate1 = `
<form
	method="POST"
	action="javascript:void(0);"
	class="fmd-slide fmd-first-slide"
>
	<div class="fmd-grid">
		<markdown>

		name* = TextInput(
			| question = What is your name?
		)

		</markdown>
		<div class="fmd-next-controls fmd-d-flex">
			<button type="submit" class="fmd-submit-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				OK
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon fmd-ms-2" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
			</button>
		</div>
	</div>
</form>
<form
	method="POST"
	action="javascript:void(0);"
	class="fmd-slide"
>
	<div class="fmd-grid">
		<markdown>

		email* = EmailInput(
			| question = What is your email address?
		)

		</markdown>
		<div class="fmd-next-controls fmd-d-flex">
			<button type="submit" class="fmd-submit-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				OK
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon fmd-ms-2" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
			</button>
		</div>
	</div>
</form>
<div
	class="fmd-slide fmd-end-slide"
>
	<div class="fmd-grid">
		<div class="fmd-text-center">
			<h1 class="fmd-h2 fmd-mb-2">Thank you</h1>
			<p class="fmd-fs-lead fmd-mb-1">Your response has been recorded.</p>
		</div>
	</div>
</div>
`;

test("Case 1 (form, two slides)", () => {
	const result1 = parseSlides(
		template1,
		true,
		{ showRestartBtn: false, submitBtnText: "" },
		"en",
		"---",
	);
	expect(beautify(result1, { format: "html" })).toBe(
		beautify(expectedTemplate1, { format: "html" }),
	);
});

// Case 2 (form, two slides, different localization and slide delimiter)

const template2 = `
name* = TextInput(
	| question = What is your name?
)
***
email* = EmailInput(
	| question = What is your email address?
)
`;
const expectedTemplate2 = `
<form
	method="POST"
	action="javascript:void(0);"
	class="fmd-slide fmd-first-slide"
>
	<div class="fmd-grid">
		<markdown>

		name* = TextInput(
			| question = What is your name?
		)

		</markdown>
		<div class="fmd-next-controls fmd-d-flex">
			<button type="submit" class="fmd-submit-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				ওকে
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon fmd-ms-2" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
			</button>
		</div>
	</div>
</form>
<form
	method="POST"
	action="javascript:void(0);"
	class="fmd-slide"
>
	<div class="fmd-grid">
		<markdown>

		email* = EmailInput(
			| question = What is your email address?
		)

		</markdown>
		<div class="fmd-next-controls fmd-d-flex">
			<button type="submit" class="fmd-submit-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				ওকে
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon fmd-ms-2" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
			</button>
		</div>
	</div>
</form>
<div
	class="fmd-slide fmd-end-slide"
>
	<div class="fmd-grid">
		<div class="fmd-text-center">
			<h1 class="fmd-h2 fmd-mb-2">ধন্যবাদ</h1>
			<p class="fmd-fs-lead fmd-mb-1">আপনার জবাব রেকর্ড করা হয়েছে।</p>
		</div>
	</div>
</div>
`;

test("Case 2 (form, two slides, different localization and slide delimiter)", () => {
	const result2 = parseSlides(
		template2,
		true,
		{ showRestartBtn: false, submitBtnText: "" },
		"bn",
		"***",
	);
	expect(beautify(result2, { format: "html" })).toBe(
		beautify(expectedTemplate2, { format: "html" }),
	);
});

// Case 3 (not form, two slides)

const template3 = `
# Heading
---
<< DISABLE
This is a paragraph.
`;
const expectedTemplate3 = `
<div
	class="fmd-slide fmd-first-slide"
>
	<div class="fmd-grid">
		<markdown>

		# Heading

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
<div
	class="fmd-slide"
	data-fmd-disable-prev-btn
>
	<div class="fmd-grid">
		<markdown>

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
<div
	class="fmd-slide fmd-end-slide"
>
	<div class="fmd-grid">
		<div class="fmd-text-center">
			<h1 class="fmd-h2 fmd-mb-2">Thank you</h1>
			<p class="fmd-fs-lead fmd-mb-1">You've reached the end.</p>
		</div>
	</div>
</div>
`;

test("Case 3 (not form, two slides)", () => {
	const result3 = parseSlides(
		template3,
		false,
		{ showRestartBtn: false, submitBtnText: "" },
		"en",
		"---",
	);
	expect(beautify(result3, { format: "html" })).toBe(
		beautify(expectedTemplate3, { format: "html" }),
	);
});

// Case 4 (not form, two slides, different localization and slide delimiter)

const template4 = `
# Heading
===
This is a paragraph.
`;
const expectedTemplate4 = `
<div
	class="fmd-slide fmd-first-slide"
>
	<div class="fmd-grid">
		<markdown>

		# Heading

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
<div
	class="fmd-slide"
>
	<div class="fmd-grid">
		<markdown>

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
<div
	class="fmd-slide fmd-end-slide"
>
	<div class="fmd-grid">
		<div class="fmd-text-center">
			<h1 class="fmd-h2 fmd-mb-2">ধন্যবাদ</h1>
			<p class="fmd-fs-lead fmd-mb-1">আপনি শেষ পর্যন্ত পৌঁছেছেন।</p>
		</div>
	</div>
</div>
`;

test("Case 4 (not form, two slides, different localization and slide delimiter)", () => {
	const result4 = parseSlides(
		template4,
		false,
		{ showRestartBtn: false, submitBtnText: "" },
		"bn",
		"===",
	);
	expect(beautify(result4, { format: "html" })).toBe(
		beautify(expectedTemplate4, { format: "html" }),
	);
});

// Case 5 (form, start slide, end slide)

const template5 = `
-> START
# Hello
---
name* = TextInput(
	| question = What is your name?
)
---
-> END
<< DISABLE
# This is the end
`;
const expectedTemplate5 = `
<div
	class="fmd-slide fmd-first-slide"
>
	<div class="fmd-grid">
		<markdown>

		# Hello

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
<form
	method="POST"
	action="javascript:void(0);"
	class="fmd-slide"
>
	<div class="fmd-grid">
		<markdown>

		name* = TextInput(
			| question = What is your name?
		)

		</markdown>
		<div class="fmd-next-controls fmd-d-flex">
			<button type="submit" class="fmd-submit-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				OK
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon fmd-ms-2" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
			</button>
		</div>
	</div>
</form>
<div
	class="fmd-slide fmd-end-slide"
>
	<div class="fmd-grid">
		<markdown>

		# This is the end

		</markdown>
	</div>
</div>
`;

test("Case 5 (form, start slide, end slide)", () => {
	const result5 = parseSlides(
		template5,
		true,
		{ showRestartBtn: false, submitBtnText: "" },
		"en",
		"---",
	);
	expect(beautify(result5, { format: "html" })).toBe(
		beautify(expectedTemplate5, { format: "html" }),
	);
});

// Case 6 (not form, start slide, end slide)

const template6 = `
-> START -> Let's Go
# Hello
---
# Body
---
-> END -> https://example.com/redirect/
# This is the end
`;
const expectedTemplate6 = `
<div
	class="fmd-slide fmd-first-slide"
>
	<div class="fmd-grid">
		<markdown>

		# Hello

		</markdown>
		<div class="fmd-next-controls fmd-d-flex">
			<button type="button" class="fmd-next-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				Let's Go
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
	</div>
</div>
<div
	class="fmd-slide"
>
	<div class="fmd-grid">
		<markdown>

		# Body

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
<div
	class="fmd-slide fmd-end-slide"
	data-fmd-redirect="https://example.com/redirect/"
>
	<div class="fmd-grid">
		<markdown>

		# This is the end

		</markdown>
	</div>
</div>
`;

test("Case 6 (not form, start slide, end slide)", () => {
	const result6 = parseSlides(
		template6,
		false,
		{ showRestartBtn: false, submitBtnText: "" },
		"en",
		"---",
	);
	expect(beautify(result6, { format: "html" })).toBe(
		beautify(expectedTemplate6, { format: "html" }),
	);
});

// Case 7 (two start slides, two end slides)

const template7 = `
-> start
# Begin here
---
-> START
# Hello
---
name* = TextInput(
	| question = What is your name?
)
---
-> end
# End here
---
-> END
# This is the end
`;
const expectedTemplate7 = `
<div
	class="fmd-slide fmd-first-slide"
>
	<div class="fmd-grid">
		<markdown>

		# Begin here

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
<div
	class="fmd-slide"
>
	<div class="fmd-grid">
		<markdown>

		# Hello

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
<form
	method="POST"
	action="javascript:void(0);"
	class="fmd-slide"
>
	<div class="fmd-grid">
		<markdown>

		name* = TextInput(
			| question = What is your name?
		)

		</markdown>
		<div class="fmd-next-controls fmd-d-flex">
			<button type="submit" class="fmd-submit-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				OK
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon fmd-ms-2" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
			</button>
		</div>
	</div>
</form>
<div
	class="fmd-slide fmd-end-slide"
>
	<div class="fmd-grid">
		<markdown>

		# This is the end

		</markdown>
	</div>
</div>
`;

test("Case 7 (form, two start slides, two end slides)", () => {
	const result7 = parseSlides(
		template7,
		true,
		{ showRestartBtn: false, submitBtnText: "" },
		"en",
		"---",
	);
	expect(beautify(result7, { format: "html" })).toBe(
		beautify(expectedTemplate7, { format: "html" }),
	);
});

// Case 8 (single slide)

const template8 = `
name* = TextInput(
	| question = What is your name?
)
`;
const expectedTemplate8 = `
<form
	method="POST"
	action="javascript:void(0);"
	class="fmd-slide fmd-first-slide"
>
	<div class="fmd-grid">
		<markdown>

		name* = TextInput(
			| question = What is your name?
		)

		</markdown>
		<div class="fmd-next-controls fmd-d-flex">
			<button type="submit" class="fmd-submit-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				OK
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon fmd-ms-2" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
			</button>
		</div>
	</div>
</form>
<div
	class="fmd-slide fmd-end-slide"
>
	<div class="fmd-grid">
		<div class="fmd-text-center">
			<h1 class="fmd-h2 fmd-mb-2">Thank you</h1>
			<p class="fmd-fs-lead fmd-mb-1">Your response has been recorded.</p>
		</div>
	</div>
</div>
`;

test("Case 8 (single slide)", () => {
	const result8 = parseSlides(
		template8,
		true,
		{ showRestartBtn: false, submitBtnText: "" },
		"en",
		"---",
	);
	expect(beautify(result8, { format: "html" })).toBe(
		beautify(expectedTemplate8, { format: "html" }),
	);
});

// Case 9 (empty template)

const template9 = "";
const expectedTemplate9 = `
<div
	class="fmd-slide fmd-first-slide"
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
<div
	class="fmd-slide fmd-end-slide"
>
	<div class="fmd-grid">
		<div class="fmd-text-center">
			<h1 class="fmd-h2 fmd-mb-2">Thank you</h1>
			<p class="fmd-fs-lead fmd-mb-1">You've reached the end.</p>
		</div>
	</div>
</div>
`;

test("Case 9 (empty template)", () => {
	const result9 = parseSlides(
		template9,
		false,
		{ showRestartBtn: false, submitBtnText: "" },
		"en",
		"---",
	);
	expect(beautify(result9, { format: "html" })).toBe(
		beautify(expectedTemplate9, { format: "html" }),
	);
});

// Case 10 (form, two slides, different submit button text, show restart button)

const template10 = `
name* = TextInput(
	| question = What is your name?
)
---
email* = EmailInput(
	| question = What is your email address?
)
`;
const expectedTemplate10 = `
<form
	method="POST"
	action="javascript:void(0);"
	class="fmd-slide fmd-first-slide"
>
	<div class="fmd-grid">
		<markdown>

		name* = TextInput(
			| question = What is your name?
		)

		</markdown>
		<div class="fmd-next-controls fmd-d-flex">
			<button type="submit" class="fmd-submit-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				Let's Go!	
			</button>
		</div>
	</div>
</form>
<form
	method="POST"
	action="javascript:void(0);"
	class="fmd-slide"
>
	<div class="fmd-grid">
		<markdown>

		email* = EmailInput(
			| question = What is your email address?
		)

		</markdown>
		<div class="fmd-next-controls fmd-d-flex">
			<button type="submit" class="fmd-submit-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				Let's Go!	
			</button>
		</div>
	</div>
</form>
<div
	class="fmd-slide fmd-end-slide"
>
	<div class="fmd-grid">
		<div class="fmd-text-center">
			<h1 class="fmd-h2 fmd-mb-2">Thank you</h1>
			<p class="fmd-fs-lead fmd-mb-1">Your response has been recorded.</p>
		</div>
		<div class="fmd-next-controls fmd-d-flex fmd-justify-content-center">
			<button type="button" class="fmd-restart-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				Restart
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fmd-icon fmd-ms-2" aria-hidden="true" focusable="false"><path d="M472 224c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24s-24 10.7-24 24v80.1l-20-23.5C387 63.4 325.1 32 256 32C132.3 32 32 132.3 32 256s100.3 224 224 224c50.4 0 97-16.7 134.4-44.8c10.6-8 12.7-23 4.8-33.6s-23-12.7-33.6-4.8C332.2 418.9 295.7 432 256 432c-97.2 0-176-78.8-176-176s78.8-176 176-176c54.3 0 102.9 24.6 135.2 63.4l.1 .2 0 0L418.9 176H328c-13.3 0-24 10.7-24 24s10.7 24 24 24H472z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 10 (form, two slides, different submit button text, show restart button)", () => {
	const result10 = parseSlides(
		template10,
		true,
		{ showRestartBtn: true, submitBtnText: "Let's Go!" },
		"en",
		"---",
	);
	expect(beautify(result10, { format: "html" })).toBe(
		beautify(expectedTemplate10, { format: "html" }),
	);
});
