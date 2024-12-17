"use strict";

const { createBodyTemplate } = require("../src/templates-create");
const beautify = require("beautify");

// Case 1

const expectedTemplate1 = `
<div class="fmd-backdrop"></div>

<div class="fmd-page-progress">
	<div class="fmd-progress">
		<div class="fmd-progress-bar" style="width: 0%"></div>
	</div>
</div>

<div class="fmd-header">
	<div class="fmd-header-container">
		<img class="fmd-header-brand fmd-hide-dm" src="https://example.com/logo-lm.svg" loading="lazy" alt="Brand">
		<img class="fmd-header-brand fmd-hide-lm" src="https://example.com/logo-dm.svg" loading="lazy" alt="Brand">
		<a class="fmd-btn fmd-btn-accent fmd-btn-control fmd-ms-auto" href="https://example.com/sign-up/">Sign Up</a>
	</div>
</div>

<div class="fmd-main">
	<div class="fmd-main-container">
		<div class="fmd-loader-container">
			<div class="fmd-text-center fmd-mb-3">
				<div class="fmd-specific-fs-14">Made in</div>
				<div class="fmd-specific-fs-20 fmd-text-emphasis"><strong>Forms.md</strong></div>
			</div>
			<div class="fmd-loader-progress" role="status" aria-label="Loading"></div>
		</div>
	</div>
</div>

<div class="fmd-footer">
	<div class="fmd-footer-inner">
		<button type="button" class="fmd-toggle-color-scheme-btn fmd-btn fmd-btn-accent fmd-btn-control fmd-btn-control-square fmd-d-flex fmd-align-items-center fmd-justify-content-center" aria-label="Toggle color scheme">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fmd-icon" aria-hidden="true" focusable="false"><path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" /></svg>
		</button>
		<div class="fmd-btn-group" role="group">
			<button type="button" class="fmd-previous-btn fmd-btn fmd-btn-accent fmd-btn-control fmd-btn-control-square fmd-d-flex fmd-align-items-center fmd-justify-content-center" aria-label="Previous" disabled>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>
			</button>
			<div class="fmd-btn-group-vr"><div class="fmd-btn-group-vr-inner"></div></div>
			<button type="button" class="fmd-next-btn fmd-btn fmd-btn-accent fmd-btn-control fmd-btn-control-square fmd-d-flex fmd-align-items-center fmd-justify-content-center" aria-label="Next">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
			</button>
		</div>
		<a href="https://forms.md" target="_blank" class="fmd-btn fmd-btn-accent fmd-btn-control">
			Made in <strong class="fmd-antialiased">Forms.md</strong>
		</a>
	</div>
</div>
`;

test("Case 1", () => {
	const result1 = createBodyTemplate({
		"brand": "![Brand](https://example.com/logo-lm.svg)",
		"brand-alt-scheme": "![Brand](https://example.com/logo-dm.svg)",
		"cta": "[Sign Up](https://example.com/sign-up/)",
		"color-scheme": "light",
		"color-scheme-toggle": "show",
		"localization": "en",
		"page": "form-slides",
	});
	expect(beautify(result1.template, { format: "html" })).toBe(
		beautify(expectedTemplate1, { format: "html" }),
	);
	expect(result1.settings).toMatchObject({
		"brand":
			'<img class="fmd-header-brand fmd-hide-dm" src="https://example.com/logo-lm.svg" loading="lazy" alt="Brand">',
		"brand-alt-scheme":
			'<img class="fmd-header-brand fmd-hide-lm" src="https://example.com/logo-dm.svg" loading="lazy" alt="Brand">',
		"cta":
			'<a class="fmd-btn fmd-btn-accent fmd-btn-control fmd-ms-auto" href="https://example.com/sign-up/">Sign Up</a>',
		"color-scheme": "light",
		"color-scheme-toggle": "show",
		"footer-render": true,
		"header-render": true,
		"localization": "en",
		"page": "form-slides",
	});
});

// Case 2 (dark color scheme)

const expectedTemplate2 = `
<div class="fmd-backdrop"></div>

<div class="fmd-page-progress">
	<div class="fmd-progress">
		<div class="fmd-progress-bar" style="width: 0%"></div>
	</div>
</div>

<div class="fmd-header">
	<div class="fmd-header-container">
		<img class="fmd-header-brand fmd-hide-lm" src="https://example.com/logo-dm.svg" loading="lazy" alt="Brand">
		<img class="fmd-header-brand fmd-hide-dm" src="https://example.com/logo-lm.svg" loading="lazy" alt="Brand">
		<a class="fmd-btn fmd-btn-accent fmd-btn-control fmd-ms-auto" href="https://example.com/sign-up/">Sign Up</a>
	</div>
</div>

<div class="fmd-main">
	<div class="fmd-main-container">
		<div class="fmd-loader-container">
			<div class="fmd-text-center fmd-mb-3">
				<div class="fmd-specific-fs-14">Made in</div>
				<div class="fmd-specific-fs-20 fmd-text-emphasis"><strong>Forms.md</strong></div>
			</div>
			<div class="fmd-loader-progress" role="status" aria-label="Loading"></div>
		</div>
	</div>
</div>

<div class="fmd-footer">
	<div class="fmd-footer-inner">
		<button type="button" class="fmd-toggle-color-scheme-btn fmd-btn fmd-btn-accent fmd-btn-control fmd-btn-control-square fmd-d-flex fmd-align-items-center fmd-justify-content-center" aria-label="Toggle color scheme">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fmd-icon" aria-hidden="true" focusable="false"><path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" /></svg>
		</button>
		<div class="fmd-btn-group" role="group">
			<button type="button" class="fmd-previous-btn fmd-btn fmd-btn-accent fmd-btn-control fmd-btn-control-square fmd-d-flex fmd-align-items-center fmd-justify-content-center" aria-label="Previous" disabled>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>
			</button>
			<div class="fmd-btn-group-vr"><div class="fmd-btn-group-vr-inner"></div></div>
			<button type="button" class="fmd-next-btn fmd-btn fmd-btn-accent fmd-btn-control fmd-btn-control-square fmd-d-flex fmd-align-items-center fmd-justify-content-center" aria-label="Next">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
			</button>
		</div>
		<a href="https://forms.md" target="_blank" class="fmd-btn fmd-btn-accent fmd-btn-control">
			Made in <strong class="fmd-antialiased">Forms.md</strong>
		</a>
	</div>
</div>
`;

test("Case 2 (dark color scheme)", () => {
	const result2 = createBodyTemplate({
		"brand": "![Brand](https://example.com/logo-dm.svg)",
		"brand-alt-scheme": "![Brand](https://example.com/logo-lm.svg)",
		"cta": "[Sign Up](https://example.com/sign-up/)",
		"color-scheme": "dark",
		"color-scheme-toggle": "show",
		"localization": "en",
		"page": "form-slides",
	});
	expect(beautify(result2.template, { format: "html" })).toBe(
		beautify(expectedTemplate2, { format: "html" }),
	);
	expect(result2.settings).toMatchObject({
		"brand":
			'<img class="fmd-header-brand fmd-hide-lm" src="https://example.com/logo-dm.svg" loading="lazy" alt="Brand">',
		"brand-alt-scheme":
			'<img class="fmd-header-brand fmd-hide-dm" src="https://example.com/logo-lm.svg" loading="lazy" alt="Brand">',
		"cta":
			'<a class="fmd-btn fmd-btn-accent fmd-btn-control fmd-ms-auto" href="https://example.com/sign-up/">Sign Up</a>',
		"color-scheme": "dark",
		"color-scheme-toggle": "show",
		"footer-render": true,
		"header-render": true,
		"localization": "en",
		"page": "form-slides",
	});
});

// Case 3 (different localization)

const expectedTemplate3 = `
<div class="fmd-backdrop"></div>

<div class="fmd-page-progress">
	<div class="fmd-progress">
		<div class="fmd-progress-bar" style="width: 0%"></div>
	</div>
</div>

<div class="fmd-header">
	<div class="fmd-header-container">
		<img class="fmd-header-brand fmd-hide-dm" src="https://example.com/logo-lm.svg" loading="lazy" alt="Brand">
		<img class="fmd-header-brand fmd-hide-lm" src="https://example.com/logo-dm.svg" loading="lazy" alt="Brand">
		<a class="fmd-btn fmd-btn-accent fmd-btn-control fmd-ms-auto" href="https://example.com/sign-up/">Sign Up</a>
	</div>
</div>

<div class="fmd-main">
	<div class="fmd-main-container">
		<div class="fmd-loader-container">
			<div class="fmd-text-center fmd-mb-3">
				<div class="fmd-specific-fs-20 fmd-text-emphasis"><strong>Forms.md</strong></div>
				<div class="fmd-specific-fs-14">তে তৈরি</div>
			</div>
			<div class="fmd-loader-progress" role="status" aria-label="লোড হচ্ছে"></div>
		</div>
	</div>
</div>

<div class="fmd-footer">
	<div class="fmd-footer-inner">
		<button type="button" class="fmd-toggle-color-scheme-btn fmd-btn fmd-btn-accent fmd-btn-control fmd-btn-control-square fmd-d-flex fmd-align-items-center fmd-justify-content-center" aria-label="রঙের স্কিম টগল করুন">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fmd-icon" aria-hidden="true" focusable="false"><path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" /></svg>
		</button>
		<div class="fmd-btn-group" role="group">
			<button type="button" class="fmd-previous-btn fmd-btn fmd-btn-accent fmd-btn-control fmd-btn-control-square fmd-d-flex fmd-align-items-center fmd-justify-content-center" aria-label="পূর্ববর্তী" disabled>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>
			</button>
			<div class="fmd-btn-group-vr"><div class="fmd-btn-group-vr-inner"></div></div>
			<button type="button" class="fmd-next-btn fmd-btn fmd-btn-accent fmd-btn-control fmd-btn-control-square fmd-d-flex fmd-align-items-center fmd-justify-content-center" aria-label="পরবর্তী">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
			</button>
		</div>
		<a href="https://forms.md" target="_blank" class="fmd-btn fmd-btn-accent fmd-btn-control">
			<strong class="fmd-antialiased">Forms.md</strong> তে তৈরি
		</a>
	</div>
</div>
`;

test("Case 3 (different localization)", () => {
	const result3 = createBodyTemplate({
		"brand": "![Brand](https://example.com/logo-lm.svg)",
		"brand-alt-scheme": "![Brand](https://example.com/logo-dm.svg)",
		"cta": "[Sign Up](https://example.com/sign-up/)",
		"color-scheme": "light",
		"color-scheme-toggle": "show",
		"localization": "bn",
		"page": "form-slides",
	});
	expect(beautify(result3.template, { format: "html" })).toBe(
		beautify(expectedTemplate3, { format: "html" }),
	);
	expect(result3.settings).toMatchObject({
		"brand":
			'<img class="fmd-header-brand fmd-hide-dm" src="https://example.com/logo-lm.svg" loading="lazy" alt="Brand">',
		"brand-alt-scheme":
			'<img class="fmd-header-brand fmd-hide-lm" src="https://example.com/logo-dm.svg" loading="lazy" alt="Brand">',
		"cta":
			'<a class="fmd-btn fmd-btn-accent fmd-btn-control fmd-ms-auto" href="https://example.com/sign-up/">Sign Up</a>',
		"color-scheme": "light",
		"color-scheme-toggle": "show",
		"footer-render": true,
		"header-render": true,
		"localization": "bn",
		"page": "form-slides",
	});
});

// Case 4 (hide all)

const expectedTemplate4 = `
<div class="fmd-backdrop"></div>

<div class="fmd-main">
	<div class="fmd-main-container">
		<div class="fmd-loader-container">
			<div class="fmd-text-center fmd-mb-3">
				<div class="fmd-specific-fs-14">Made in</div>
				<div class="fmd-specific-fs-20 fmd-text-emphasis"><strong>Forms.md</strong></div>
			</div>
			<div class="fmd-loader-progress" role="status" aria-label="Loading"></div>
		</div>
	</div>
</div>
`;

test("Case 4 (hide all)", () => {
	const result4 = createBodyTemplate({
		"brand": "![Brand](https://example.com/logo-lm.svg)",
		"brand-alt-scheme": "![Brand](https://example.com/logo-dm.svg)",
		"cta": "[Sign Up](https://example.com/sign-up/)",
		"color-scheme": "light",
		"color-scheme-toggle": "show",
		"footer": "hide",
		"header": "hide",
		"localization": "en",
		"page": "form-slides",
		"page-progress": "hide",
	});
	expect(beautify(result4.template, { format: "html" })).toBe(
		beautify(expectedTemplate4, { format: "html" }),
	);
	expect(result4.settings).toMatchObject({
		"brand":
			'<img class="fmd-header-brand fmd-hide-dm" src="https://example.com/logo-lm.svg" loading="lazy" alt="Brand">',
		"brand-alt-scheme":
			'<img class="fmd-header-brand fmd-hide-lm" src="https://example.com/logo-dm.svg" loading="lazy" alt="Brand">',
		"cta":
			'<a class="fmd-btn fmd-btn-accent fmd-btn-control fmd-ms-auto" href="https://example.com/sign-up/">Sign Up</a>',
		"color-scheme": "light",
		"color-scheme-toggle": "show",
		"footer": "hide",
		"footer-render": false,
		"header": "hide",
		"header-render": false,
		"localization": "en",
		"page": "form-slides",
		"page-progress": "hide",
	});
});

// Case 5 (only header brand)

const expectedTemplate5 = `
<div class="fmd-backdrop"></div>

<div class="fmd-header">
	<div class="fmd-header-container">
		<img class="fmd-header-brand" src="https://example.com/logo-lm.svg" loading="lazy" alt="Brand">
	</div>
</div>

<div class="fmd-main">
	<div class="fmd-main-container">
		<div class="fmd-loader-container">
			<div class="fmd-text-center fmd-mb-3">
				<div class="fmd-specific-fs-14">Made in</div>
				<div class="fmd-specific-fs-20 fmd-text-emphasis"><strong>Forms.md</strong></div>
			</div>
			<div class="fmd-loader-progress" role="status" aria-label="Loading"></div>
		</div>
	</div>
</div>
`;

test("Case 5 (only header brand)", () => {
	const result5 = createBodyTemplate({
		"brand": "![Brand](https://example.com/logo-lm.svg)",
		"color-scheme": "light",
		"footer": "hide",
		"localization": "en",
		"page": "form-slides",
		"page-progress": "hide",
	});
	expect(beautify(result5.template, { format: "html" })).toBe(
		beautify(expectedTemplate5, { format: "html" }),
	);
	expect(result5.settings).toMatchObject({
		"brand":
			'<img class="fmd-header-brand" src="https://example.com/logo-lm.svg" loading="lazy" alt="Brand">',
		"color-scheme": "light",
		"footer": "hide",
		"footer-render": false,
		"header-render": true,
		"localization": "en",
		"page": "form-slides",
		"page-progress": "hide",
	});
});

// Case 6 (only header CTA)

const expectedTemplate6 = `
<div class="fmd-backdrop"></div>

<div class="fmd-header">
	<div class="fmd-header-container">
		<a class="fmd-btn fmd-btn-accent fmd-btn-control fmd-ms-auto" href="https://example.com/learn-more/">Learn More</a>
	</div>
</div>

<div class="fmd-main">
	<div class="fmd-main-container">
		<div class="fmd-loader-container">
			<div class="fmd-text-center fmd-mb-3">
				<div class="fmd-specific-fs-14">Made in</div>
				<div class="fmd-specific-fs-20 fmd-text-emphasis"><strong>Forms.md</strong></div>
			</div>
			<div class="fmd-loader-progress" role="status" aria-label="Loading"></div>
		</div>
	</div>
</div>
`;

test("Case 6 (only header CTA)", () => {
	const result6 = createBodyTemplate({
		"cta": "[Learn More](https://example.com/learn-more/)",
		"color-scheme": "light",
		"footer": "hide",
		"localization": "en",
		"page": "form-slides",
		"page-progress": "hide",
	});
	expect(beautify(result6.template, { format: "html" })).toBe(
		beautify(expectedTemplate6, { format: "html" }),
	);
	expect(result6.settings).toMatchObject({
		"cta":
			'<a class="fmd-btn fmd-btn-accent fmd-btn-control fmd-ms-auto" href="https://example.com/learn-more/">Learn More</a>',
		"color-scheme": "light",
		"footer": "hide",
		"footer-render": false,
		"header-render": true,
		"localization": "en",
		"page": "form-slides",
		"page-progress": "hide",
	});
});

// Case 7 (no footer toggle color scheme button)

const expectedTemplate7 = `
<div class="fmd-backdrop"></div>

<div class="fmd-main">
	<div class="fmd-main-container">
		<div class="fmd-loader-container">
			<div class="fmd-text-center fmd-mb-3">
				<div class="fmd-specific-fs-14">Made in</div>
				<div class="fmd-specific-fs-20 fmd-text-emphasis"><strong>Forms.md</strong></div>
			</div>
			<div class="fmd-loader-progress" role="status" aria-label="Loading"></div>
		</div>
	</div>
</div>

<div class="fmd-footer">
	<div class="fmd-footer-inner">
		<div class="fmd-btn-group" role="group">
			<button type="button" class="fmd-previous-btn fmd-btn fmd-btn-accent fmd-btn-control fmd-btn-control-square fmd-d-flex fmd-align-items-center fmd-justify-content-center" aria-label="Previous" disabled>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>
			</button>
			<div class="fmd-btn-group-vr"><div class="fmd-btn-group-vr-inner"></div></div>
			<button type="button" class="fmd-next-btn fmd-btn fmd-btn-accent fmd-btn-control fmd-btn-control-square fmd-d-flex fmd-align-items-center fmd-justify-content-center" aria-label="Next">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
			</button>
		</div>
		<a href="https://forms.md" target="_blank" class="fmd-btn fmd-btn-accent fmd-btn-control">
			Made in <strong class="fmd-antialiased">Forms.md</strong>
		</a>
	</div>
</div>
`;

test("Case 7 (no footer toggle color scheme button)", () => {
	const result7 = createBodyTemplate({
		"color-scheme": "light",
		"header": "hide",
		"localization": "en",
		"page": "form-slides",
		"page-progress": "hide",
	});
	expect(beautify(result7.template, { format: "html" })).toBe(
		beautify(expectedTemplate7, { format: "html" }),
	);
	expect(result7.settings).toMatchObject({
		"color-scheme": "light",
		"footer-render": true,
		"header-render": false,
		"localization": "en",
		"page": "form-slides",
		"page-progress": "hide",
	});
});

// Case 8 (no footer slide controls)

const expectedTemplate8 = `
<div class="fmd-backdrop"></div>

<div class="fmd-main">
	<div class="fmd-main-container">
		<div class="fmd-loader-container">
			<div class="fmd-text-center fmd-mb-3">
				<div class="fmd-specific-fs-14">Made in</div>
				<div class="fmd-specific-fs-20 fmd-text-emphasis"><strong>Forms.md</strong></div>
			</div>
			<div class="fmd-loader-progress" role="status" aria-label="Loading"></div>
		</div>
	</div>
</div>

<div class="fmd-footer">
	<div class="fmd-footer-inner">
		<a href="https://forms.md" target="_blank" class="fmd-btn fmd-btn-accent fmd-btn-control">
			Made in <strong class="fmd-antialiased">Forms.md</strong>
		</a>
	</div>
</div>
`;

test("Case 8 (no footer slide controls)", () => {
	const result8 = createBodyTemplate({
		"color-scheme": "light",
		"header": "hide",
		"localization": "en",
		"page": "form-slides",
		"page-progress": "hide",
		"slide-controls": "hide",
	});
	expect(beautify(result8.template, { format: "html" })).toBe(
		beautify(expectedTemplate8, { format: "html" }),
	);
	expect(result8.settings).toMatchObject({
		"color-scheme": "light",
		"footer-render": true,
		"header-render": false,
		"localization": "en",
		"page": "form-slides",
		"page-progress": "hide",
		"slide-controls": "hide",
	});
});

// Case 9 (no footer slide controls with page setting)

const expectedTemplate9 = `
<div class="fmd-backdrop"></div>

<div class="fmd-main">
	<div class="fmd-main-container">
		<div class="fmd-loader-container">
			<div class="fmd-text-center fmd-mb-3">
				<div class="fmd-specific-fs-14">Made in</div>
				<div class="fmd-specific-fs-20 fmd-text-emphasis"><strong>Forms.md</strong></div>
			</div>
			<div class="fmd-loader-progress" role="status" aria-label="Loading"></div>
		</div>
	</div>
</div>

<div class="fmd-footer">
	<div class="fmd-footer-inner">
		<a href="https://forms.md" target="_blank" class="fmd-btn fmd-btn-accent fmd-btn-control">
			Made in <strong class="fmd-antialiased">Forms.md</strong>
		</a>
	</div>
</div>
`;

test("Case 9 (no footer slide controls with page setting)", () => {
	const result9 = createBodyTemplate({
		"color-scheme": "light",
		"header": "hide",
		"localization": "en",
		"page": "single",
		"page-progress": "hide",
	});
	expect(beautify(result9.template, { format: "html" })).toBe(
		beautify(expectedTemplate9, { format: "html" }),
	);
	expect(result9.settings).toMatchObject({
		"color-scheme": "light",
		"footer-render": true,
		"header-render": false,
		"localization": "en",
		"page": "single",
		"page-progress": "hide",
	});
});

// Case 10 (no Forms.md branding)

const expectedTemplate10 = `
<div class="fmd-backdrop"></div>

<div class="fmd-main">
	<div class="fmd-main-container">
		<div class="fmd-loader-container">
			<div class="fmd-text-center fmd-mb-3">
				<div class="fmd-specific-fs-20 fmd-text-emphasis fmd-fw-bold">Loading...</div>
			</div>
			<div class="fmd-loader-progress" role="status" aria-label="Loading"></div>
		</div>
	</div>
</div>

<div class="fmd-footer">
	<div class="fmd-footer-inner">
		<div class="fmd-btn-group" role="group">
			<button type="button" class="fmd-previous-btn fmd-btn fmd-btn-accent fmd-btn-control fmd-btn-control-square fmd-d-flex fmd-align-items-center fmd-justify-content-center" aria-label="Previous" disabled>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>
			</button>
			<div class="fmd-btn-group-vr"><div class="fmd-btn-group-vr-inner"></div></div>
			<button type="button" class="fmd-next-btn fmd-btn fmd-btn-accent fmd-btn-control fmd-btn-control-square fmd-d-flex fmd-align-items-center fmd-justify-content-center" aria-label="Next">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 10 (no Forms.md branding)", () => {
	const result10 = createBodyTemplate({
		"color-scheme": "light",
		"formsmd-branding": "hide",
		"header": "hide",
		"localization": "en",
		"page": "slides",
		"page-progress": "hide",
	});
	expect(beautify(result10.template, { format: "html" })).toBe(
		beautify(expectedTemplate10, { format: "html" }),
	);
	expect(result10.settings).toMatchObject({
		"color-scheme": "light",
		"footer-render": true,
		"formsmd-branding": "hide",
		"header-render": false,
		"localization": "en",
		"page": "slides",
		"page-progress": "hide",
	});
});
