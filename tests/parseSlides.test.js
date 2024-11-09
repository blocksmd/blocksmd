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
	class="bmd-slide bmd-first-slide"
>
	<div class="bmd-grid">
		<markdown>

		name* = TextInput(
			| question = What is your name?
		)

		</markdown>
		<div class="bmd-next-controls bmd-d-flex bmd-justify-content-start">
			<button type="submit" class="bmd-submit-btn bmd-btn bmd-btn-accent bmd-d-inline-flex bmd-align-items-center">
				OK
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon bmd-ms-2" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
			</button>
		</div>
	</div>
</form>
<form
	method="POST"
	action="javascript:void(0);"
	class="bmd-slide"
>
	<div class="bmd-grid">
		<markdown>

		email* = EmailInput(
			| question = What is your email address?
		)

		</markdown>
		<div class="bmd-next-controls bmd-d-flex bmd-justify-content-start">
			<button type="submit" class="bmd-submit-btn bmd-btn bmd-btn-accent bmd-d-inline-flex bmd-align-items-center">
				OK
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon bmd-ms-2" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
			</button>
		</div>
	</div>
</form>
<div
	class="bmd-slide bmd-end-slide"
>
	<div class="bmd-grid">
		<div class="bmd-text-center">
			<h1 class="bmd-h2 bmd-mb-2">Thank you</h1>
			<p class="bmd-fs-lead bmd-mb-1">Your response has been recorded. Thank you!</p>
		</div>
		<div class="bmd-next-controls bmd-d-flex bmd-justify-content-center">
			<button type="button" class="bmd-restart-btn bmd-btn bmd-btn-accent bmd-d-inline-flex bmd-align-items-center">
				Restart
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="bmd-icon bmd-ms-2" aria-hidden="true" focusable="false"><path d="M472 224c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24s-24 10.7-24 24v80.1l-20-23.5C387 63.4 325.1 32 256 32C132.3 32 32 132.3 32 256s100.3 224 224 224c50.4 0 97-16.7 134.4-44.8c10.6-8 12.7-23 4.8-33.6s-23-12.7-33.6-4.8C332.2 418.9 295.7 432 256 432c-97.2 0-176-78.8-176-176s78.8-176 176-176c54.3 0 102.9 24.6 135.2 63.4l.1 .2 0 0L418.9 176H328c-13.3 0-24 10.7-24 24s10.7 24 24 24H472z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 1 (form, two slides)", () => {
	const result1 = parseSlides(template1, true, "en", "---");
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
	class="bmd-slide bmd-first-slide"
>
	<div class="bmd-grid">
		<markdown>

		name* = TextInput(
			| question = What is your name?
		)

		</markdown>
		<div class="bmd-next-controls bmd-d-flex bmd-justify-content-start">
			<button type="submit" class="bmd-submit-btn bmd-btn bmd-btn-accent bmd-d-inline-flex bmd-align-items-center">
				ওকে
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon bmd-ms-2" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
			</button>
		</div>
	</div>
</form>
<form
	method="POST"
	action="javascript:void(0);"
	class="bmd-slide"
>
	<div class="bmd-grid">
		<markdown>

		email* = EmailInput(
			| question = What is your email address?
		)

		</markdown>
		<div class="bmd-next-controls bmd-d-flex bmd-justify-content-start">
			<button type="submit" class="bmd-submit-btn bmd-btn bmd-btn-accent bmd-d-inline-flex bmd-align-items-center">
				ওকে
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon bmd-ms-2" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
			</button>
		</div>
	</div>
</form>
<div
	class="bmd-slide bmd-end-slide"
>
	<div class="bmd-grid">
		<div class="bmd-text-center">
			<h1 class="bmd-h2 bmd-mb-2">ধন্যবাদ</h1>
			<p class="bmd-fs-lead bmd-mb-1">আপনার জবাব রেকর্ড করা হয়েছে। ধন্যবাদ!</p>
		</div>
		<div class="bmd-next-controls bmd-d-flex bmd-justify-content-center">
			<button type="button" class="bmd-restart-btn bmd-btn bmd-btn-accent bmd-d-inline-flex bmd-align-items-center">
				আবার শুরু
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="bmd-icon bmd-ms-2" aria-hidden="true" focusable="false"><path d="M472 224c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24s-24 10.7-24 24v80.1l-20-23.5C387 63.4 325.1 32 256 32C132.3 32 32 132.3 32 256s100.3 224 224 224c50.4 0 97-16.7 134.4-44.8c10.6-8 12.7-23 4.8-33.6s-23-12.7-33.6-4.8C332.2 418.9 295.7 432 256 432c-97.2 0-176-78.8-176-176s78.8-176 176-176c54.3 0 102.9 24.6 135.2 63.4l.1 .2 0 0L418.9 176H328c-13.3 0-24 10.7-24 24s10.7 24 24 24H472z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 2 (form, two slides, different localization and slide delimiter)", () => {
	const result2 = parseSlides(template2, true, "bn", "***");
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
	class="bmd-slide bmd-first-slide"
>
	<div class="bmd-grid">
		<markdown>

		# Heading

		</markdown>
		<div class="bmd-next-controls bmd-d-flex bmd-justify-content-start">
			<button type="button" class="bmd-next-btn bmd-btn bmd-btn-accent bmd-d-inline-flex bmd-align-items-center">
				Next
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="bmd-icon bmd-ms-2 bmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="bmd-icon bmd-ms-2 bmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
	</div>
</div>
<div
	class="bmd-slide"
	data-bmd-disable-prev-btn
>
	<div class="bmd-grid">
		<markdown>

		This is a paragraph.

		</markdown>
		<div class="bmd-next-controls bmd-d-flex bmd-justify-content-start">
			<button type="button" class="bmd-next-btn bmd-btn bmd-btn-accent bmd-d-inline-flex bmd-align-items-center">
				Next
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="bmd-icon bmd-ms-2 bmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="bmd-icon bmd-ms-2 bmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
	</div>
</div>
<div
	class="bmd-slide bmd-end-slide"
>
	<div class="bmd-grid">
		<div class="bmd-text-center">
			<h1 class="bmd-h2 bmd-mb-2">Thank you</h1>
			<p class="bmd-fs-lead bmd-mb-1">You've reached the end. Thanks for reading!</p>
		</div>
		<div class="bmd-next-controls bmd-d-flex bmd-justify-content-center">
			<button type="button" class="bmd-restart-btn bmd-btn bmd-btn-accent bmd-d-inline-flex bmd-align-items-center">
				Restart
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="bmd-icon bmd-ms-2" aria-hidden="true" focusable="false"><path d="M472 224c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24s-24 10.7-24 24v80.1l-20-23.5C387 63.4 325.1 32 256 32C132.3 32 32 132.3 32 256s100.3 224 224 224c50.4 0 97-16.7 134.4-44.8c10.6-8 12.7-23 4.8-33.6s-23-12.7-33.6-4.8C332.2 418.9 295.7 432 256 432c-97.2 0-176-78.8-176-176s78.8-176 176-176c54.3 0 102.9 24.6 135.2 63.4l.1 .2 0 0L418.9 176H328c-13.3 0-24 10.7-24 24s10.7 24 24 24H472z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 3 (not form, two slides)", () => {
	const result3 = parseSlides(template3, false, "en", "---");
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
	class="bmd-slide bmd-first-slide"
>
	<div class="bmd-grid">
		<markdown>

		# Heading

		</markdown>
		<div class="bmd-next-controls bmd-d-flex bmd-justify-content-start">
			<button type="button" class="bmd-next-btn bmd-btn bmd-btn-accent bmd-d-inline-flex bmd-align-items-center">
				পরবর্তী
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="bmd-icon bmd-ms-2 bmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="bmd-icon bmd-ms-2 bmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
	</div>
</div>
<div
	class="bmd-slide"
>
	<div class="bmd-grid">
		<markdown>

		This is a paragraph.

		</markdown>
		<div class="bmd-next-controls bmd-d-flex bmd-justify-content-start">
			<button type="button" class="bmd-next-btn bmd-btn bmd-btn-accent bmd-d-inline-flex bmd-align-items-center">
				পরবর্তী
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="bmd-icon bmd-ms-2 bmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="bmd-icon bmd-ms-2 bmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
	</div>
</div>
<div
	class="bmd-slide bmd-end-slide"
>
	<div class="bmd-grid">
		<div class="bmd-text-center">
			<h1 class="bmd-h2 bmd-mb-2">ধন্যবাদ</h1>
			<p class="bmd-fs-lead bmd-mb-1">আপনি শেষ পর্যন্ত পৌঁছেছেন৷ পড়ার জন্য ধন্যবাদ!</p>
		</div>
		<div class="bmd-next-controls bmd-d-flex bmd-justify-content-center">
			<button type="button" class="bmd-restart-btn bmd-btn bmd-btn-accent bmd-d-inline-flex bmd-align-items-center">
				আবার শুরু
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="bmd-icon bmd-ms-2" aria-hidden="true" focusable="false"><path d="M472 224c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24s-24 10.7-24 24v80.1l-20-23.5C387 63.4 325.1 32 256 32C132.3 32 32 132.3 32 256s100.3 224 224 224c50.4 0 97-16.7 134.4-44.8c10.6-8 12.7-23 4.8-33.6s-23-12.7-33.6-4.8C332.2 418.9 295.7 432 256 432c-97.2 0-176-78.8-176-176s78.8-176 176-176c54.3 0 102.9 24.6 135.2 63.4l.1 .2 0 0L418.9 176H328c-13.3 0-24 10.7-24 24s10.7 24 24 24H472z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 4 (not form, two slides, different localization and slide delimiter)", () => {
	const result4 = parseSlides(template4, false, "bn", "===");
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
	class="bmd-slide bmd-first-slide"
>
	<div class="bmd-grid">
		<markdown>

		# Hello

		</markdown>
		<div class="bmd-next-controls bmd-d-flex bmd-justify-content-start">
			<button type="button" class="bmd-next-btn bmd-btn bmd-btn-accent bmd-d-inline-flex bmd-align-items-center">
				Start
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="bmd-icon bmd-ms-2 bmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="bmd-icon bmd-ms-2 bmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
	</div>
</div>
<form
	method="POST"
	action="javascript:void(0);"
	class="bmd-slide"
>
	<div class="bmd-grid">
		<markdown>

		name* = TextInput(
			| question = What is your name?
		)

		</markdown>
		<div class="bmd-next-controls bmd-d-flex bmd-justify-content-start">
			<button type="submit" class="bmd-submit-btn bmd-btn bmd-btn-accent bmd-d-inline-flex bmd-align-items-center">
				OK
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon bmd-ms-2" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
			</button>
		</div>
	</div>
</form>
<div
	class="bmd-slide bmd-end-slide"
>
	<div class="bmd-grid">
		<markdown>

		# This is the end

		</markdown>
		<div class="bmd-next-controls bmd-d-flex bmd-justify-content-center">
			<button type="button" class="bmd-restart-btn bmd-btn bmd-btn-accent bmd-d-inline-flex bmd-align-items-center">
				Restart
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="bmd-icon bmd-ms-2" aria-hidden="true" focusable="false"><path d="M472 224c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24s-24 10.7-24 24v80.1l-20-23.5C387 63.4 325.1 32 256 32C132.3 32 32 132.3 32 256s100.3 224 224 224c50.4 0 97-16.7 134.4-44.8c10.6-8 12.7-23 4.8-33.6s-23-12.7-33.6-4.8C332.2 418.9 295.7 432 256 432c-97.2 0-176-78.8-176-176s78.8-176 176-176c54.3 0 102.9 24.6 135.2 63.4l.1 .2 0 0L418.9 176H328c-13.3 0-24 10.7-24 24s10.7 24 24 24H472z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 5 (form, start slide, end slide)", () => {
	const result5 = parseSlides(template5, true, "en", "---");
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
	class="bmd-slide bmd-first-slide"
>
	<div class="bmd-grid">
		<markdown>

		# Hello

		</markdown>
		<div class="bmd-next-controls bmd-d-flex bmd-justify-content-start">
			<button type="button" class="bmd-next-btn bmd-btn bmd-btn-accent bmd-d-inline-flex bmd-align-items-center">
				Let's Go
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="bmd-icon bmd-ms-2 bmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="bmd-icon bmd-ms-2 bmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
	</div>
</div>
<div
	class="bmd-slide"
>
	<div class="bmd-grid">
		<markdown>

		# Body

		</markdown>
		<div class="bmd-next-controls bmd-d-flex bmd-justify-content-start">
			<button type="button" class="bmd-next-btn bmd-btn bmd-btn-accent bmd-d-inline-flex bmd-align-items-center">
				Next
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="bmd-icon bmd-ms-2 bmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="bmd-icon bmd-ms-2 bmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
	</div>
</div>
<div
	class="bmd-slide bmd-end-slide"
	data-bmd-redirect="https://example.com/redirect/"
>
	<div class="bmd-grid">
		<markdown>

		# This is the end

		</markdown>
		<div class="bmd-next-controls bmd-d-flex bmd-justify-content-center">
			<button type="button" class="bmd-restart-btn bmd-btn bmd-btn-accent bmd-d-inline-flex bmd-align-items-center">
				Restart
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="bmd-icon bmd-ms-2" aria-hidden="true" focusable="false"><path d="M472 224c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24s-24 10.7-24 24v80.1l-20-23.5C387 63.4 325.1 32 256 32C132.3 32 32 132.3 32 256s100.3 224 224 224c50.4 0 97-16.7 134.4-44.8c10.6-8 12.7-23 4.8-33.6s-23-12.7-33.6-4.8C332.2 418.9 295.7 432 256 432c-97.2 0-176-78.8-176-176s78.8-176 176-176c54.3 0 102.9 24.6 135.2 63.4l.1 .2 0 0L418.9 176H328c-13.3 0-24 10.7-24 24s10.7 24 24 24H472z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 6 (not form, start slide, end slide)", () => {
	const result6 = parseSlides(template6, false, "en", "---");
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
	class="bmd-slide bmd-first-slide"
>
	<div class="bmd-grid">
		<markdown>

		# Begin here

		</markdown>
		<div class="bmd-next-controls bmd-d-flex bmd-justify-content-start">
			<button type="button" class="bmd-next-btn bmd-btn bmd-btn-accent bmd-d-inline-flex bmd-align-items-center">
				Start
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="bmd-icon bmd-ms-2 bmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="bmd-icon bmd-ms-2 bmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
	</div>
</div>
<div
	class="bmd-slide"
>
	<div class="bmd-grid">
		<markdown>

		# Hello

		</markdown>
		<div class="bmd-next-controls bmd-d-flex bmd-justify-content-start">
			<button type="button" class="bmd-next-btn bmd-btn bmd-btn-accent bmd-d-inline-flex bmd-align-items-center">
				Start
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="bmd-icon bmd-ms-2 bmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="bmd-icon bmd-ms-2 bmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
	</div>
</div>
<form
	method="POST"
	action="javascript:void(0);"
	class="bmd-slide"
>
	<div class="bmd-grid">
		<markdown>

		name* = TextInput(
			| question = What is your name?
		)

		</markdown>
		<div class="bmd-next-controls bmd-d-flex bmd-justify-content-start">
			<button type="submit" class="bmd-submit-btn bmd-btn bmd-btn-accent bmd-d-inline-flex bmd-align-items-center">
				OK
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon bmd-ms-2" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
			</button>
		</div>
	</div>
</form>
<div
	class="bmd-slide bmd-end-slide"
>
	<div class="bmd-grid">
		<markdown>

		# This is the end

		</markdown>
		<div class="bmd-next-controls bmd-d-flex bmd-justify-content-center">
			<button type="button" class="bmd-restart-btn bmd-btn bmd-btn-accent bmd-d-inline-flex bmd-align-items-center">
				Restart
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="bmd-icon bmd-ms-2" aria-hidden="true" focusable="false"><path d="M472 224c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24s-24 10.7-24 24v80.1l-20-23.5C387 63.4 325.1 32 256 32C132.3 32 32 132.3 32 256s100.3 224 224 224c50.4 0 97-16.7 134.4-44.8c10.6-8 12.7-23 4.8-33.6s-23-12.7-33.6-4.8C332.2 418.9 295.7 432 256 432c-97.2 0-176-78.8-176-176s78.8-176 176-176c54.3 0 102.9 24.6 135.2 63.4l.1 .2 0 0L418.9 176H328c-13.3 0-24 10.7-24 24s10.7 24 24 24H472z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 7 (form, two start slides, two end slides)", () => {
	const result7 = parseSlides(template7, true, "en", "---");
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
	class="bmd-slide bmd-first-slide"
>
	<div class="bmd-grid">
		<markdown>

		name* = TextInput(
			| question = What is your name?
		)

		</markdown>
		<div class="bmd-next-controls bmd-d-flex bmd-justify-content-start">
			<button type="submit" class="bmd-submit-btn bmd-btn bmd-btn-accent bmd-d-inline-flex bmd-align-items-center">
				OK
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon bmd-ms-2" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
			</button>
		</div>
	</div>
</form>
<div
	class="bmd-slide bmd-end-slide"
>
	<div class="bmd-grid">
		<div class="bmd-text-center">
			<h1 class="bmd-h2 bmd-mb-2">Thank you</h1>
			<p class="bmd-fs-lead bmd-mb-1">Your response has been recorded. Thank you!</p>
		</div>
		<div class="bmd-next-controls bmd-d-flex bmd-justify-content-center">
			<button type="button" class="bmd-restart-btn bmd-btn bmd-btn-accent bmd-d-inline-flex bmd-align-items-center">
				Restart
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="bmd-icon bmd-ms-2" aria-hidden="true" focusable="false"><path d="M472 224c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24s-24 10.7-24 24v80.1l-20-23.5C387 63.4 325.1 32 256 32C132.3 32 32 132.3 32 256s100.3 224 224 224c50.4 0 97-16.7 134.4-44.8c10.6-8 12.7-23 4.8-33.6s-23-12.7-33.6-4.8C332.2 418.9 295.7 432 256 432c-97.2 0-176-78.8-176-176s78.8-176 176-176c54.3 0 102.9 24.6 135.2 63.4l.1 .2 0 0L418.9 176H328c-13.3 0-24 10.7-24 24s10.7 24 24 24H472z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 8 (single slide)", () => {
	const result8 = parseSlides(template8, true, "en", "---");
	expect(beautify(result8, { format: "html" })).toBe(
		beautify(expectedTemplate8, { format: "html" }),
	);
});

// Case 9 (empty template)

const template9 = "";
const expectedTemplate9 = `
<div
	class="bmd-slide bmd-first-slide"
>
	<div class="bmd-grid">
		<markdown>

		</markdown>
		<div class="bmd-next-controls bmd-d-flex bmd-justify-content-start">
			<button type="button" class="bmd-next-btn bmd-btn bmd-btn-accent bmd-d-inline-flex bmd-align-items-center">
				Next
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="bmd-icon bmd-ms-2 bmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="bmd-icon bmd-ms-2 bmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
	</div>
</div>
<div
	class="bmd-slide bmd-end-slide"
>
	<div class="bmd-grid">
		<div class="bmd-text-center">
			<h1 class="bmd-h2 bmd-mb-2">Thank you</h1>
			<p class="bmd-fs-lead bmd-mb-1">You've reached the end. Thanks for reading!</p>
		</div>
		<div class="bmd-next-controls bmd-d-flex bmd-justify-content-center">
			<button type="button" class="bmd-restart-btn bmd-btn bmd-btn-accent bmd-d-inline-flex bmd-align-items-center">
				Restart
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="bmd-icon bmd-ms-2" aria-hidden="true" focusable="false"><path d="M472 224c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24s-24 10.7-24 24v80.1l-20-23.5C387 63.4 325.1 32 256 32C132.3 32 32 132.3 32 256s100.3 224 224 224c50.4 0 97-16.7 134.4-44.8c10.6-8 12.7-23 4.8-33.6s-23-12.7-33.6-4.8C332.2 418.9 295.7 432 256 432c-97.2 0-176-78.8-176-176s78.8-176 176-176c54.3 0 102.9 24.6 135.2 63.4l.1 .2 0 0L418.9 176H328c-13.3 0-24 10.7-24 24s10.7 24 24 24H472z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 9 (empty template)", () => {
	const result9 = parseSlides(template9, false, "en", "---");
	expect(beautify(result9, { format: "html" })).toBe(
		beautify(expectedTemplate9, { format: "html" }),
	);
});
