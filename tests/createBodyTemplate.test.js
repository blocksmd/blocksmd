("use strict");

const { createBodyTemplate } = require("../src/templates-create");
const beautify = require("beautify");

// Case 1

const expectedTemplate1 = `
<div class="bmd-backdrop"></div>

<div class="bmd-page-progress">
	<div class="bmd-progress">
		<div class="bmd-progress-bar" style="width: 0%"></div>
	</div>
</div>

<header class="bmd-header">
	<div class="bmd-header-container">
		<img class="bmd-header-brand bmd-hide-dm" src="https://example.com/logo-lm.svg" loading="lazy" alt="Brand">
		<img class="bmd-header-brand bmd-hide-lm" src="https://example.com/logo-dm.svg" loading="lazy" alt="Brand">
		<a class="bmd-btn bmd-btn-accent bmd-btn-control bmd-ms-auto" href="https://example.com/sign-up/">Sign Up</a>
	</div>
</header>

<main class="bmd-main">
	<div class="bmd-main-container">
		<div class="bmd-loader-container">
			<div class="bmd-text-center bmd-mb-3">
				<div class="bmd-specific-fs-14">Made in</div>
				<div class="bmd-specific-fs-20 bmd-text-emphasis"><strong>blocks.md</strong></div>
			</div>
			<div class="bmd-loader-progress" role="status" aria-label="Loading"></div>
		</div>
	</div>
</main>

<footer class="bmd-footer">
	<button type="button" class="bmd-toggle-color-scheme-btn bmd-btn bmd-btn-accent bmd-btn-control bmd-btn-control-square bmd-d-flex bmd-align-items-center bmd-justify-content-center" aria-label="Toggle color scheme">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="bmd-icon" aria-hidden="true" focusable="false"><path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" /></svg>
	</button>
	<div class="bmd-btn-group" role="group">
		<button type="button" class="bmd-previous-btn bmd-btn bmd-btn-accent bmd-btn-control bmd-btn-control-square bmd-d-flex bmd-align-items-center bmd-justify-content-center" aria-label="Previous" disabled>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>
		</button>
		<div class="bmd-btn-group-vr"><div class="bmd-btn-group-vr-inner"></div></div>
		<button type="button" class="bmd-next-btn bmd-btn bmd-btn-accent bmd-btn-control bmd-btn-control-square bmd-d-flex bmd-align-items-center bmd-justify-content-center" aria-label="Next">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
		</button>
	</div>
	<a href="https://blocks.md" target="_blank" class="bmd-btn bmd-btn-accent bmd-btn-control bmd-antialiased">
		Made in <strong>blocks.md</strong>
	</a>
</footer>
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
	expect(beautify(result1["template"], { format: "html" })).toBe(
		beautify(expectedTemplate1, { format: "html" }),
	);
	expect(result1["settings"]).toMatchObject({
		"brand":
			'<img class="bmd-header-brand bmd-hide-dm" src="https://example.com/logo-lm.svg" loading="lazy" alt="Brand">',
		"brand-alt-scheme":
			'<img class="bmd-header-brand bmd-hide-lm" src="https://example.com/logo-dm.svg" loading="lazy" alt="Brand">',
		"cta":
			'<a class="bmd-btn bmd-btn-accent bmd-btn-control bmd-ms-auto" href="https://example.com/sign-up/">Sign Up</a>',
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
<div class="bmd-backdrop"></div>

<div class="bmd-page-progress">
	<div class="bmd-progress">
		<div class="bmd-progress-bar" style="width: 0%"></div>
	</div>
</div>

<header class="bmd-header">
	<div class="bmd-header-container">
		<img class="bmd-header-brand bmd-hide-lm" src="https://example.com/logo-dm.svg" loading="lazy" alt="Brand">
		<img class="bmd-header-brand bmd-hide-dm" src="https://example.com/logo-lm.svg" loading="lazy" alt="Brand">
		<a class="bmd-btn bmd-btn-accent bmd-btn-control bmd-ms-auto" href="https://example.com/sign-up/">Sign Up</a>
	</div>
</header>

<main class="bmd-main">
	<div class="bmd-main-container">
		<div class="bmd-loader-container">
			<div class="bmd-text-center bmd-mb-3">
				<div class="bmd-specific-fs-14">Made in</div>
				<div class="bmd-specific-fs-20 bmd-text-emphasis"><strong>blocks.md</strong></div>
			</div>
			<div class="bmd-loader-progress" role="status" aria-label="Loading"></div>
		</div>
	</div>
</main>

<footer class="bmd-footer">
	<button type="button" class="bmd-toggle-color-scheme-btn bmd-btn bmd-btn-accent bmd-btn-control bmd-btn-control-square bmd-d-flex bmd-align-items-center bmd-justify-content-center" aria-label="Toggle color scheme">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="bmd-icon" aria-hidden="true" focusable="false"><path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" /></svg>
	</button>
	<div class="bmd-btn-group" role="group">
		<button type="button" class="bmd-previous-btn bmd-btn bmd-btn-accent bmd-btn-control bmd-btn-control-square bmd-d-flex bmd-align-items-center bmd-justify-content-center" aria-label="Previous" disabled>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>
		</button>
		<div class="bmd-btn-group-vr"><div class="bmd-btn-group-vr-inner"></div></div>
		<button type="button" class="bmd-next-btn bmd-btn bmd-btn-accent bmd-btn-control bmd-btn-control-square bmd-d-flex bmd-align-items-center bmd-justify-content-center" aria-label="Next">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
		</button>
	</div>
	<a href="https://blocks.md" target="_blank" class="bmd-btn bmd-btn-accent bmd-btn-control bmd-antialiased">
		Made in <strong>blocks.md</strong>
	</a>
</footer>
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
	expect(beautify(result2["template"], { format: "html" })).toBe(
		beautify(expectedTemplate2, { format: "html" }),
	);
	expect(result2["settings"]).toMatchObject({
		"brand":
			'<img class="bmd-header-brand bmd-hide-lm" src="https://example.com/logo-dm.svg" loading="lazy" alt="Brand">',
		"brand-alt-scheme":
			'<img class="bmd-header-brand bmd-hide-dm" src="https://example.com/logo-lm.svg" loading="lazy" alt="Brand">',
		"cta":
			'<a class="bmd-btn bmd-btn-accent bmd-btn-control bmd-ms-auto" href="https://example.com/sign-up/">Sign Up</a>',
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
<div class="bmd-backdrop"></div>

<div class="bmd-page-progress">
	<div class="bmd-progress">
		<div class="bmd-progress-bar" style="width: 0%"></div>
	</div>
</div>

<header class="bmd-header">
	<div class="bmd-header-container">
		<img class="bmd-header-brand bmd-hide-dm" src="https://example.com/logo-lm.svg" loading="lazy" alt="Brand">
		<img class="bmd-header-brand bmd-hide-lm" src="https://example.com/logo-dm.svg" loading="lazy" alt="Brand">
		<a class="bmd-btn bmd-btn-accent bmd-btn-control bmd-ms-auto" href="https://example.com/sign-up/">Sign Up</a>
	</div>
</header>

<main class="bmd-main">
	<div class="bmd-main-container">
		<div class="bmd-loader-container">
			<div class="bmd-text-center bmd-mb-3">
				<div class="bmd-specific-fs-20 bmd-text-emphasis"><strong>blocks.md</strong></div>
				<div class="bmd-specific-fs-14">তে তৈরি</div>
			</div>
			<div class="bmd-loader-progress" role="status" aria-label="লোড হচ্ছে"></div>
		</div>
	</div>
</main>

<footer class="bmd-footer">
	<button type="button" class="bmd-toggle-color-scheme-btn bmd-btn bmd-btn-accent bmd-btn-control bmd-btn-control-square bmd-d-flex bmd-align-items-center bmd-justify-content-center" aria-label="রঙের স্কিম টগল করুন">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="bmd-icon" aria-hidden="true" focusable="false"><path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" /></svg>
	</button>
	<div class="bmd-btn-group" role="group">
		<button type="button" class="bmd-previous-btn bmd-btn bmd-btn-accent bmd-btn-control bmd-btn-control-square bmd-d-flex bmd-align-items-center bmd-justify-content-center" aria-label="পূর্ববর্তী" disabled>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>
		</button>
		<div class="bmd-btn-group-vr"><div class="bmd-btn-group-vr-inner"></div></div>
		<button type="button" class="bmd-next-btn bmd-btn bmd-btn-accent bmd-btn-control bmd-btn-control-square bmd-d-flex bmd-align-items-center bmd-justify-content-center" aria-label="পরবর্তী">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
		</button>
	</div>
	<a href="https://blocks.md" target="_blank" class="bmd-btn bmd-btn-accent bmd-btn-control bmd-antialiased">
		<strong>blocks.md</strong> তে তৈরি
	</a>
</footer>
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
	expect(beautify(result3["template"], { format: "html" })).toBe(
		beautify(expectedTemplate3, { format: "html" }),
	);
	expect(result3["settings"]).toMatchObject({
		"brand":
			'<img class="bmd-header-brand bmd-hide-dm" src="https://example.com/logo-lm.svg" loading="lazy" alt="Brand">',
		"brand-alt-scheme":
			'<img class="bmd-header-brand bmd-hide-lm" src="https://example.com/logo-dm.svg" loading="lazy" alt="Brand">',
		"cta":
			'<a class="bmd-btn bmd-btn-accent bmd-btn-control bmd-ms-auto" href="https://example.com/sign-up/">Sign Up</a>',
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
<div class="bmd-backdrop"></div>

<main class="bmd-main">
	<div class="bmd-main-container">
		<div class="bmd-loader-container">
			<div class="bmd-text-center bmd-mb-3">
				<div class="bmd-specific-fs-14">Made in</div>
				<div class="bmd-specific-fs-20 bmd-text-emphasis"><strong>blocks.md</strong></div>
			</div>
			<div class="bmd-loader-progress" role="status" aria-label="Loading"></div>
		</div>
	</div>
</main>
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
	expect(beautify(result4["template"], { format: "html" })).toBe(
		beautify(expectedTemplate4, { format: "html" }),
	);
	expect(result4["settings"]).toMatchObject({
		"brand":
			'<img class="bmd-header-brand bmd-hide-dm" src="https://example.com/logo-lm.svg" loading="lazy" alt="Brand">',
		"brand-alt-scheme":
			'<img class="bmd-header-brand bmd-hide-lm" src="https://example.com/logo-dm.svg" loading="lazy" alt="Brand">',
		"cta":
			'<a class="bmd-btn bmd-btn-accent bmd-btn-control bmd-ms-auto" href="https://example.com/sign-up/">Sign Up</a>',
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
<div class="bmd-backdrop"></div>

<header class="bmd-header">
	<div class="bmd-header-container">
		<img class="bmd-header-brand" src="https://example.com/logo-lm.svg" loading="lazy" alt="Brand">
	</div>
</header>

<main class="bmd-main">
	<div class="bmd-main-container">
		<div class="bmd-loader-container">
			<div class="bmd-text-center bmd-mb-3">
				<div class="bmd-specific-fs-14">Made in</div>
				<div class="bmd-specific-fs-20 bmd-text-emphasis"><strong>blocks.md</strong></div>
			</div>
			<div class="bmd-loader-progress" role="status" aria-label="Loading"></div>
		</div>
	</div>
</main>
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
	expect(beautify(result5["template"], { format: "html" })).toBe(
		beautify(expectedTemplate5, { format: "html" }),
	);
	expect(result5["settings"]).toMatchObject({
		"brand":
			'<img class="bmd-header-brand" src="https://example.com/logo-lm.svg" loading="lazy" alt="Brand">',
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
<div class="bmd-backdrop"></div>

<header class="bmd-header">
	<div class="bmd-header-container">
		<a class="bmd-btn bmd-btn-accent bmd-btn-control bmd-ms-auto" href="https://example.com/learn-more/">Learn More</a>
	</div>
</header>

<main class="bmd-main">
	<div class="bmd-main-container">
		<div class="bmd-loader-container">
			<div class="bmd-text-center bmd-mb-3">
				<div class="bmd-specific-fs-14">Made in</div>
				<div class="bmd-specific-fs-20 bmd-text-emphasis"><strong>blocks.md</strong></div>
			</div>
			<div class="bmd-loader-progress" role="status" aria-label="Loading"></div>
		</div>
	</div>
</main>
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
	expect(beautify(result6["template"], { format: "html" })).toBe(
		beautify(expectedTemplate6, { format: "html" }),
	);
	expect(result6["settings"]).toMatchObject({
		"cta":
			'<a class="bmd-btn bmd-btn-accent bmd-btn-control bmd-ms-auto" href="https://example.com/learn-more/">Learn More</a>',
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
<div class="bmd-backdrop"></div>

<main class="bmd-main">
	<div class="bmd-main-container">
		<div class="bmd-loader-container">
			<div class="bmd-text-center bmd-mb-3">
				<div class="bmd-specific-fs-14">Made in</div>
				<div class="bmd-specific-fs-20 bmd-text-emphasis"><strong>blocks.md</strong></div>
			</div>
			<div class="bmd-loader-progress" role="status" aria-label="Loading"></div>
		</div>
	</div>
</main>

<footer class="bmd-footer">
	<div class="bmd-btn-group" role="group">
		<button type="button" class="bmd-previous-btn bmd-btn bmd-btn-accent bmd-btn-control bmd-btn-control-square bmd-d-flex bmd-align-items-center bmd-justify-content-center" aria-label="Previous" disabled>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>
		</button>
		<div class="bmd-btn-group-vr"><div class="bmd-btn-group-vr-inner"></div></div>
		<button type="button" class="bmd-next-btn bmd-btn bmd-btn-accent bmd-btn-control bmd-btn-control-square bmd-d-flex bmd-align-items-center bmd-justify-content-center" aria-label="Next">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
		</button>
	</div>
	<a href="https://blocks.md" target="_blank" class="bmd-btn bmd-btn-accent bmd-btn-control bmd-antialiased">
		Made in <strong>blocks.md</strong>
	</a>
</footer>
`;

test("Case 7 (no footer toggle color scheme button)", () => {
	const result7 = createBodyTemplate({
		"color-scheme": "light",
		"header": "hide",
		"localization": "en",
		"page": "form-slides",
		"page-progress": "hide",
	});
	expect(beautify(result7["template"], { format: "html" })).toBe(
		beautify(expectedTemplate7, { format: "html" }),
	);
	expect(result7["settings"]).toMatchObject({
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
<div class="bmd-backdrop"></div>

<main class="bmd-main">
	<div class="bmd-main-container">
		<div class="bmd-loader-container">
			<div class="bmd-text-center bmd-mb-3">
				<div class="bmd-specific-fs-14">Made in</div>
				<div class="bmd-specific-fs-20 bmd-text-emphasis"><strong>blocks.md</strong></div>
			</div>
			<div class="bmd-loader-progress" role="status" aria-label="Loading"></div>
		</div>
	</div>
</main>

<footer class="bmd-footer">
	<a href="https://blocks.md" target="_blank" class="bmd-btn bmd-btn-accent bmd-btn-control bmd-antialiased">
		Made in <strong>blocks.md</strong>
	</a>
</footer>
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
	expect(beautify(result8["template"], { format: "html" })).toBe(
		beautify(expectedTemplate8, { format: "html" }),
	);
	expect(result8["settings"]).toMatchObject({
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
<div class="bmd-backdrop"></div>

<main class="bmd-main">
	<div class="bmd-main-container">
		<div class="bmd-loader-container">
			<div class="bmd-text-center bmd-mb-3">
				<div class="bmd-specific-fs-14">Made in</div>
				<div class="bmd-specific-fs-20 bmd-text-emphasis"><strong>blocks.md</strong></div>
			</div>
			<div class="bmd-loader-progress" role="status" aria-label="Loading"></div>
		</div>
	</div>
</main>

<footer class="bmd-footer">
	<a href="https://blocks.md" target="_blank" class="bmd-btn bmd-btn-accent bmd-btn-control bmd-antialiased">
		Made in <strong>blocks.md</strong>
	</a>
</footer>
`;

test("Case 9 (no footer slide controls with page setting)", () => {
	const result9 = createBodyTemplate({
		"color-scheme": "light",
		"header": "hide",
		"localization": "en",
		"page": "single",
		"page-progress": "hide",
	});
	expect(beautify(result9["template"], { format: "html" })).toBe(
		beautify(expectedTemplate9, { format: "html" }),
	);
	expect(result9["settings"]).toMatchObject({
		"color-scheme": "light",
		"footer-render": true,
		"header-render": false,
		"localization": "en",
		"page": "single",
		"page-progress": "hide",
	});
});

// Case 10 (no blocksmd branding)

const expectedTemplate10 = `
<div class="bmd-backdrop"></div>

<main class="bmd-main">
	<div class="bmd-main-container">
		<div class="bmd-loader-container">
			<div class="bmd-text-center bmd-mb-3">
				<div class="bmd-specific-fs-20 bmd-text-emphasis bmd-fw-bold">Loading...</div>
			</div>
			<div class="bmd-loader-progress" role="status" aria-label="Loading"></div>
		</div>
	</div>
</main>

<footer class="bmd-footer">
	<div class="bmd-btn-group" role="group">
		<button type="button" class="bmd-previous-btn bmd-btn bmd-btn-accent bmd-btn-control bmd-btn-control-square bmd-d-flex bmd-align-items-center bmd-justify-content-center" aria-label="Previous" disabled>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>
		</button>
		<div class="bmd-btn-group-vr"><div class="bmd-btn-group-vr-inner"></div></div>
		<button type="button" class="bmd-next-btn bmd-btn bmd-btn-accent bmd-btn-control bmd-btn-control-square bmd-d-flex bmd-align-items-center bmd-justify-content-center" aria-label="Next">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
		</button>
	</div>
</footer>
`;

test("Case 10 (no blocksmd branding)", () => {
	const result10 = createBodyTemplate({
		"blocksmd-branding": "hide",
		"color-scheme": "light",
		"header": "hide",
		"localization": "en",
		"page": "slides",
		"page-progress": "hide",
	});
	expect(beautify(result10["template"], { format: "html" })).toBe(
		beautify(expectedTemplate10, { format: "html" }),
	);
	expect(result10["settings"]).toMatchObject({
		"blocksmd-branding": "hide",
		"color-scheme": "light",
		"footer-render": true,
		"header-render": false,
		"localization": "en",
		"page": "slides",
		"page-progress": "hide",
	});
});
