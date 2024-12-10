"use strict";

const { createFileField } = require("../src/form-field-create");
const beautify = require("beautify");

// Case 1

const expectedTemplate1 = `
<div data-fmd-name="portfolio" data-fmd-type="file" data-fmd-size-limit="50" id="some-id" class="fmd-col-6 fmd-xs:col-10 fmd-form-field fmd-form-field-sm fmd-form-field-classic-labels" aria-label="Label" data-title="Some title">
	<label class="fmd-form-question">
		Upload your <span class="fmd-text-nowrap" aria-hidden="true">portfolio<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">portfolio (required)</span>
	</label>
	<p class="fmd-form-description">
		Please make sure the file is a PDF.
	</p>
	<div class="fmd-form-file">
		<label class="fmd-form-file-label fmd-disabled">
			<input 
				name="portfolio"
				id="id_portfolio"
				type="file"
				class="fmd-form-file-input"
				required
				accept="image/*"
				disabled
				data-fmd-autofocus
			>
			<span class="fmd-d-block fmd-w-auto fmd-mw-100">
				<span class="fmd-visually-hidden">
					Upload your <span class="fmd-text-nowrap" aria-hidden="true">portfolio<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">portfolio (required)</span>
				</span>
				<span class="fmd-file-empty-section">
					<span class="fmd-form-file-img-container">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M389.8 125.2C363.7 88.1 320.7 64 272 64c-77.4 0-140.5 61-143.9 137.5c-.6 13-9 24.4-21.3 28.8C63.2 245.7 32 287.2 32 336c0 61.9 50.1 112 112 112l368 0c53 0 96-43 96-96c0-36.8-20.7-68.8-51.2-84.9c-13.4-7.1-20-22.5-15.8-37.1c2-6.9 3-14.3 3-22c0-44.2-35.8-80-80-80c-12.3 0-23.9 2.8-34.3 7.7c-14.1 6.7-30.9 2.3-39.9-10.5zM272 32c59.5 0 112.1 29.5 144 74.8C430.5 99.9 446.8 96 464 96c61.9 0 112 50.1 112 112c0 10.7-1.5 21-4.3 30.8C612.3 260.2 640 302.9 640 352c0 70.7-57.3 128-128 128l-368 0C64.5 480 0 415.5 0 336c0-62.8 40.2-116.1 96.2-135.9C100.3 106.6 177.4 32 272 32zM228.7 244.7l80-80c6.2-6.2 16.4-6.2 22.6 0l80 80c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L336 214.6 336 368c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-153.4-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6z"/></svg>
					</span>
					<span class="fmd-d-block fmd-mt-3 fmd-first-letter-uppercase">
						<strong class="fmd-text-accent">choose file</strong><span class="fmd-xs:d-none"> or drag here</span>
					</span>
				</span>
				<span class="fmd-file-exists-section"></span>
				<span class="fmd-form-file-size-limit fmd-mt-1">
					Size limit: 50MB
				</span>
			</span>
		</label>
		<div class="fmd-form-file-reset-btn-container">
			<button type="button" class="fmd-form-file-reset-btn" aria-label="Remove chosen file">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 1", () => {
	expect(
		beautify(
			createFileField(
				"portfolio",
				true,
				'id="some-id" class="fmd-col-6 fmd-xs:col-10" aria-label="Label" data-title="Some title"',
				`
					| question = Upload your portfolio
					| description = Please make sure the file is a PDF.
					| fieldsize = sm
					| subfield
					| autofocus
					| disabled
					| imageOnly
					| sizelimit = -49.5
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate1, { format: "html" }));
});

// Case 2 (not required, size limit not set)

const expectedTemplate2 = `
<div data-fmd-name="portfolio" data-fmd-type="file" data-fmd-size-limit="10" class="fmd-form-field">
	<label class="fmd-form-question">
		Upload your portfolio
	</label>
	<p class="fmd-form-description">
		Please make sure the file is a PDF.
	</p>
	<div class="fmd-form-file">
		<label class="fmd-form-file-label">
			<input 
				name="portfolio"
				id="id_portfolio"
				type="file"
				class="fmd-form-file-input"
			>
			<span class="fmd-d-block fmd-w-auto fmd-mw-100">
				<span class="fmd-visually-hidden">
					Upload your portfolio
				</span>
				<span class="fmd-file-empty-section">
					<span class="fmd-form-file-img-container">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M389.8 125.2C363.7 88.1 320.7 64 272 64c-77.4 0-140.5 61-143.9 137.5c-.6 13-9 24.4-21.3 28.8C63.2 245.7 32 287.2 32 336c0 61.9 50.1 112 112 112l368 0c53 0 96-43 96-96c0-36.8-20.7-68.8-51.2-84.9c-13.4-7.1-20-22.5-15.8-37.1c2-6.9 3-14.3 3-22c0-44.2-35.8-80-80-80c-12.3 0-23.9 2.8-34.3 7.7c-14.1 6.7-30.9 2.3-39.9-10.5zM272 32c59.5 0 112.1 29.5 144 74.8C430.5 99.9 446.8 96 464 96c61.9 0 112 50.1 112 112c0 10.7-1.5 21-4.3 30.8C612.3 260.2 640 302.9 640 352c0 70.7-57.3 128-128 128l-368 0C64.5 480 0 415.5 0 336c0-62.8 40.2-116.1 96.2-135.9C100.3 106.6 177.4 32 272 32zM228.7 244.7l80-80c6.2-6.2 16.4-6.2 22.6 0l80 80c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L336 214.6 336 368c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-153.4-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6z"/></svg>
					</span>
					<span class="fmd-d-block fmd-mt-3 fmd-first-letter-uppercase">
						<strong class="fmd-text-accent">choose file</strong><span class="fmd-xs:d-none"> or drag here</span>
					</span>
				</span>
				<span class="fmd-file-exists-section"></span>
				<span class="fmd-form-file-size-limit fmd-mt-1">
					Size limit: 10MB
				</span>
			</span>
		</label>
		<div class="fmd-form-file-reset-btn-container">
			<button type="button" class="fmd-form-file-reset-btn" aria-label="Remove chosen file">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 2 (not required, size limit not set)", () => {
	expect(
		beautify(
			createFileField(
				"portfolio",
				false,
				"",
				`
					| question = Upload your portfolio
					| description = Please make sure the file is a PDF.
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
<div data-fmd-name="portfolio" data-fmd-type="file" data-fmd-size-limit="100" class="fmd-form-field">
	<label class="fmd-form-question">
		Upload your portfolio
	</label>
	<p class="fmd-form-description">
		Please make sure the file is a PDF.
	</p>
	<div class="fmd-form-file">
		<label class="fmd-form-file-label">
			<input 
				name="portfolio"
				id="id_portfolio"
				type="file"
				class="fmd-form-file-input"
			>
			<span class="fmd-d-block fmd-w-auto fmd-mw-100">
				<span class="fmd-visually-hidden">
					Upload your portfolio
				</span>
				<span class="fmd-file-empty-section">
					<span class="fmd-form-file-img-container">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M389.8 125.2C363.7 88.1 320.7 64 272 64c-77.4 0-140.5 61-143.9 137.5c-.6 13-9 24.4-21.3 28.8C63.2 245.7 32 287.2 32 336c0 61.9 50.1 112 112 112l368 0c53 0 96-43 96-96c0-36.8-20.7-68.8-51.2-84.9c-13.4-7.1-20-22.5-15.8-37.1c2-6.9 3-14.3 3-22c0-44.2-35.8-80-80-80c-12.3 0-23.9 2.8-34.3 7.7c-14.1 6.7-30.9 2.3-39.9-10.5zM272 32c59.5 0 112.1 29.5 144 74.8C430.5 99.9 446.8 96 464 96c61.9 0 112 50.1 112 112c0 10.7-1.5 21-4.3 30.8C612.3 260.2 640 302.9 640 352c0 70.7-57.3 128-128 128l-368 0C64.5 480 0 415.5 0 336c0-62.8 40.2-116.1 96.2-135.9C100.3 106.6 177.4 32 272 32zM228.7 244.7l80-80c6.2-6.2 16.4-6.2 22.6 0l80 80c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L336 214.6 336 368c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-153.4-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6z"/></svg>
					</span>
					<span class="fmd-d-block fmd-mt-3 fmd-first-letter-uppercase">
						<strong class="fmd-text-accent">ফাইল বেছে নিন</strong><span class="fmd-xs:d-none"> বা এখানে টেনে আনুন</span>
					</span>
				</span>
				<span class="fmd-file-exists-section"></span>
				<span class="fmd-form-file-size-limit fmd-mt-1">
					সাইজ লিমিট: 100MB
				</span>
			</span>
		</label>
		<div class="fmd-form-file-reset-btn-container">
			<button type="button" class="fmd-form-file-reset-btn" aria-label="নির্বাচিত ফাইল সরান">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 3 (different localization)", () => {
	expect(
		beautify(
			createFileField(
				"portfolio",
				false,
				"",
				`
					| question = Upload your portfolio
					| description = Please make sure the file is a PDF.
					| SIZELIMIT = 100
				`,
				"|",
				"",
				"bn",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate3, { format: "html" }));
});

// Case 4 (different id, different form delimiter, image only)

const expectedTemplate4 = `
<div data-fmd-name="image" data-fmd-type="file" data-fmd-size-limit="10" class="fmd-form-field fmd-form-field-classic-labels">
	<label class="fmd-form-question">
		Upload your <span class="fmd-text-nowrap" aria-hidden="true">image<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">image (required)</span>
	</label>
	<p class="fmd-form-description">
		Please make sure the file is an image.
	</p>
	<div class="fmd-form-file">
		<label class="fmd-form-file-label">
			<input 
				name="image"
				id="form1:id_image"
				type="file"
				class="fmd-form-file-input"
				required
				accept="image/*"
			>
			<span class="fmd-d-block fmd-w-auto fmd-mw-100">
				<span class="fmd-visually-hidden">
					Upload your <span class="fmd-text-nowrap" aria-hidden="true">image<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">image (required)</span>
				</span>
				<span class="fmd-file-empty-section">
					<span class="fmd-form-file-img-container">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M389.8 125.2C363.7 88.1 320.7 64 272 64c-77.4 0-140.5 61-143.9 137.5c-.6 13-9 24.4-21.3 28.8C63.2 245.7 32 287.2 32 336c0 61.9 50.1 112 112 112l368 0c53 0 96-43 96-96c0-36.8-20.7-68.8-51.2-84.9c-13.4-7.1-20-22.5-15.8-37.1c2-6.9 3-14.3 3-22c0-44.2-35.8-80-80-80c-12.3 0-23.9 2.8-34.3 7.7c-14.1 6.7-30.9 2.3-39.9-10.5zM272 32c59.5 0 112.1 29.5 144 74.8C430.5 99.9 446.8 96 464 96c61.9 0 112 50.1 112 112c0 10.7-1.5 21-4.3 30.8C612.3 260.2 640 302.9 640 352c0 70.7-57.3 128-128 128l-368 0C64.5 480 0 415.5 0 336c0-62.8 40.2-116.1 96.2-135.9C100.3 106.6 177.4 32 272 32zM228.7 244.7l80-80c6.2-6.2 16.4-6.2 22.6 0l80 80c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L336 214.6 336 368c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-153.4-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6z"/></svg>
					</span>
					<span class="fmd-d-block fmd-mt-3 fmd-first-letter-uppercase">
						<strong class="fmd-text-accent">choose file</strong><span class="fmd-xs:d-none"> or drag here</span>
					</span>
				</span>
				<span class="fmd-file-exists-section"></span>
				<span class="fmd-form-file-size-limit fmd-mt-1">
					Size limit: 10MB
				</span>
			</span>
		</label>
		<div class="fmd-form-file-reset-btn-container">
			<button type="button" class="fmd-form-file-reset-btn" aria-label="Remove chosen file">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 4 (different id, different form delimiter, image only)", () => {
	expect(
		beautify(
			createFileField(
				"image",
				true,
				"",
				`
					question = Upload your image
					description = Please make sure the file is an image.
					ImageOnly
					LABELstyle = classic
				`,
				"\n",
				"form1",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate4, { format: "html" }));
});

// Case 5 (no params)

const expectedTemplate5 = `
<div data-fmd-name="image" data-fmd-type="file" data-fmd-size-limit="10" class="fmd-form-field">
	<label class="fmd-form-question">
		<span class="fmd-text-nowrap" aria-hidden="true">...<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">... (required)</span>
	</label>
	<div class="fmd-form-file">
		<label class="fmd-form-file-label">
			<input 
				name="image"
				id="id_image"
				type="file"
				class="fmd-form-file-input"
				required
			>
			<span class="fmd-d-block fmd-w-auto fmd-mw-100">
				<span class="fmd-visually-hidden">
					<span class="fmd-text-nowrap" aria-hidden="true">...<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">... (required)</span>
				</span>
				<span class="fmd-file-empty-section">
					<span class="fmd-form-file-img-container">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M389.8 125.2C363.7 88.1 320.7 64 272 64c-77.4 0-140.5 61-143.9 137.5c-.6 13-9 24.4-21.3 28.8C63.2 245.7 32 287.2 32 336c0 61.9 50.1 112 112 112l368 0c53 0 96-43 96-96c0-36.8-20.7-68.8-51.2-84.9c-13.4-7.1-20-22.5-15.8-37.1c2-6.9 3-14.3 3-22c0-44.2-35.8-80-80-80c-12.3 0-23.9 2.8-34.3 7.7c-14.1 6.7-30.9 2.3-39.9-10.5zM272 32c59.5 0 112.1 29.5 144 74.8C430.5 99.9 446.8 96 464 96c61.9 0 112 50.1 112 112c0 10.7-1.5 21-4.3 30.8C612.3 260.2 640 302.9 640 352c0 70.7-57.3 128-128 128l-368 0C64.5 480 0 415.5 0 336c0-62.8 40.2-116.1 96.2-135.9C100.3 106.6 177.4 32 272 32zM228.7 244.7l80-80c6.2-6.2 16.4-6.2 22.6 0l80 80c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L336 214.6 336 368c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-153.4-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6z"/></svg>
					</span>
					<span class="fmd-d-block fmd-mt-3 fmd-first-letter-uppercase">
						<strong class="fmd-text-accent">choose file</strong><span class="fmd-xs:d-none"> or drag here</span>
					</span>
				</span>
				<span class="fmd-file-exists-section"></span>
				<span class="fmd-form-file-size-limit fmd-mt-1">
					Size limit: 10MB
				</span>
			</span>
		</label>
		<div class="fmd-form-file-reset-btn-container">
			<button type="button" class="fmd-form-file-reset-btn" aria-label="Remove chosen file">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 5 (no params)", () => {
	expect(
		beautify(createFileField("image", true, "", "", "|", "", "en"), {
			format: "html",
		}),
	).toBe(beautify(expectedTemplate5, { format: "html" }));
});

// Case 6 (current file)

const expectedTemplate6 = `
<div data-fmd-name="portfolio" data-fmd-type="file" data-fmd-size-limit="10" class="fmd-form-field">
	<label class="fmd-form-question">
		Upload your <span class="fmd-text-nowrap" aria-hidden="true">portfolio<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">portfolio (required)</span>
	</label>
	<p class="fmd-form-description">
		Please make sure the file is a PDF.
	</p>
	<div class="fmd-current-file">
		<div class="fmd-current-file-label">
			Currently: <a href="https://example.com/portfolio.pdf">portfolio.pdf</a>
		</div>
	</div>
	<div class="fmd-form-file">
		<label class="fmd-form-file-label">
			<input 
				name="portfolio"
				id="id_portfolio"
				type="file"
				class="fmd-form-file-input"
			>
			<span class="fmd-d-block fmd-w-auto fmd-mw-100">
				<span class="fmd-visually-hidden">
					Upload your <span class="fmd-text-nowrap" aria-hidden="true">portfolio<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">portfolio (required)</span>
				</span>
				<span class="fmd-file-empty-section">
					<span class="fmd-form-file-img-container">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M389.8 125.2C363.7 88.1 320.7 64 272 64c-77.4 0-140.5 61-143.9 137.5c-.6 13-9 24.4-21.3 28.8C63.2 245.7 32 287.2 32 336c0 61.9 50.1 112 112 112l368 0c53 0 96-43 96-96c0-36.8-20.7-68.8-51.2-84.9c-13.4-7.1-20-22.5-15.8-37.1c2-6.9 3-14.3 3-22c0-44.2-35.8-80-80-80c-12.3 0-23.9 2.8-34.3 7.7c-14.1 6.7-30.9 2.3-39.9-10.5zM272 32c59.5 0 112.1 29.5 144 74.8C430.5 99.9 446.8 96 464 96c61.9 0 112 50.1 112 112c0 10.7-1.5 21-4.3 30.8C612.3 260.2 640 302.9 640 352c0 70.7-57.3 128-128 128l-368 0C64.5 480 0 415.5 0 336c0-62.8 40.2-116.1 96.2-135.9C100.3 106.6 177.4 32 272 32zM228.7 244.7l80-80c6.2-6.2 16.4-6.2 22.6 0l80 80c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L336 214.6 336 368c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-153.4-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6z"/></svg>
					</span>
					<span class="fmd-d-block fmd-mt-3 fmd-first-letter-uppercase">
						Change: <strong class="fmd-text-accent">choose file</strong><span class="fmd-xs:d-none"> or drag here</span>
					</span>
				</span>
				<span class="fmd-file-exists-section"></span>
				<span class="fmd-form-file-size-limit fmd-mt-1">
					Size limit: 10MB
				</span>
			</span>
		</label>
		<div class="fmd-form-file-reset-btn-container">
			<button type="button" class="fmd-form-file-reset-btn" aria-label="Remove chosen file">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 6 (current file)", () => {
	expect(
		beautify(
			createFileField(
				"portfolio",
				true,
				"",
				`
					| question = Upload your portfolio
					| description = Please make sure the file is a PDF.
					| currentFile = https://example.com/portfolio.pdf
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate6, { format: "html" }));
});

// Case 7 (current file, not required)

const expectedTemplate7 = `
<div data-fmd-name="portfolio" data-fmd-type="file" data-fmd-size-limit="10" class="fmd-form-field">
	<label class="fmd-form-question">
		Upload your portfolio
	</label>
	<p class="fmd-form-description">
		Please make sure the file is a PDF.
	</p>
	<div class="fmd-current-file">
		<div class="fmd-current-file-label">
			Currently: <a href="https://example.com/portfolio.pdf">portfolio.pdf</a>
		</div>
		<div class="fmd-current-file-clear">
			<div class="fmd-form-check">
				<input
					name="portfolioClear"
					id="id_portfolioClear"
					type="checkbox"
					class="fmd-form-file-clear-check-input fmd-form-check-input"
					value="Clear"
				>
				<label class="fmd-form-check-label" for="id_portfolioClear">
					Clear<span class="fmd-visually-hidden"> current file</span>
					<span class="fmd-form-clear-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"></path></svg>
					</span>
				</label>
			</div>
		</div>
	</div>
	<div class="fmd-form-file">
		<label class="fmd-form-file-label">
			<input 
				name="portfolio"
				id="id_portfolio"
				type="file"
				class="fmd-form-file-input"
			>
			<span class="fmd-d-block fmd-w-auto fmd-mw-100">
				<span class="fmd-visually-hidden">
					Upload your portfolio
				</span>
				<span class="fmd-file-empty-section">
					<span class="fmd-form-file-img-container">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M389.8 125.2C363.7 88.1 320.7 64 272 64c-77.4 0-140.5 61-143.9 137.5c-.6 13-9 24.4-21.3 28.8C63.2 245.7 32 287.2 32 336c0 61.9 50.1 112 112 112l368 0c53 0 96-43 96-96c0-36.8-20.7-68.8-51.2-84.9c-13.4-7.1-20-22.5-15.8-37.1c2-6.9 3-14.3 3-22c0-44.2-35.8-80-80-80c-12.3 0-23.9 2.8-34.3 7.7c-14.1 6.7-30.9 2.3-39.9-10.5zM272 32c59.5 0 112.1 29.5 144 74.8C430.5 99.9 446.8 96 464 96c61.9 0 112 50.1 112 112c0 10.7-1.5 21-4.3 30.8C612.3 260.2 640 302.9 640 352c0 70.7-57.3 128-128 128l-368 0C64.5 480 0 415.5 0 336c0-62.8 40.2-116.1 96.2-135.9C100.3 106.6 177.4 32 272 32zM228.7 244.7l80-80c6.2-6.2 16.4-6.2 22.6 0l80 80c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L336 214.6 336 368c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-153.4-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6z"/></svg>
					</span>
					<span class="fmd-d-block fmd-mt-3 fmd-first-letter-uppercase">
						Change: <strong class="fmd-text-accent">choose file</strong><span class="fmd-xs:d-none"> or drag here</span>
					</span>
				</span>
				<span class="fmd-file-exists-section"></span>
				<span class="fmd-form-file-size-limit fmd-mt-1">
					Size limit: 10MB
				</span>
			</span>
		</label>
		<div class="fmd-form-file-reset-btn-container">
			<button type="button" class="fmd-form-file-reset-btn" aria-label="Remove chosen file">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 7 (current file, not required)", () => {
	expect(
		beautify(
			createFileField(
				"portfolio",
				false,
				"",
				`
					| question = Upload your portfolio
					| description = Please make sure the file is a PDF.
					| currentFile = https://example.com/portfolio.pdf
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate7, { format: "html" }));
});

// Case 8 (not required, current file, different localization)

const expectedTemplate8 = `
<div data-fmd-name="portfolio" data-fmd-type="file" data-fmd-size-limit="100" class="fmd-form-field">
	<label class="fmd-form-question">
		Upload your portfolio
	</label>
	<p class="fmd-form-description">
		Please make sure the file is a PDF.
	</p>
	<div class="fmd-current-file">
		<div class="fmd-current-file-label">
			বর্তমানে: <a href="image.png">image.png</a>
		</div>
		<div class="fmd-current-file-clear">
			<div class="fmd-form-check">
				<input
					name="portfolioClear"
					id="id_portfolioClear"
					type="checkbox"
					class="fmd-form-file-clear-check-input fmd-form-check-input"
					value="Clear"
				>
				<label class="fmd-form-check-label" for="id_portfolioClear">
					সাফ<span class="fmd-visually-hidden"> করুন বর্তমান ফাইল</span>
					<span class="fmd-form-clear-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"></path></svg>
					</span>
				</label>
			</div>
		</div>
	</div>
	<div class="fmd-form-file">
		<label class="fmd-form-file-label">
			<input 
				name="portfolio"
				id="id_portfolio"
				type="file"
				class="fmd-form-file-input"
			>
			<span class="fmd-d-block fmd-w-auto fmd-mw-100">
				<span class="fmd-visually-hidden">
					Upload your portfolio
				</span>
				<span class="fmd-file-empty-section">
					<span class="fmd-form-file-img-container">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M389.8 125.2C363.7 88.1 320.7 64 272 64c-77.4 0-140.5 61-143.9 137.5c-.6 13-9 24.4-21.3 28.8C63.2 245.7 32 287.2 32 336c0 61.9 50.1 112 112 112l368 0c53 0 96-43 96-96c0-36.8-20.7-68.8-51.2-84.9c-13.4-7.1-20-22.5-15.8-37.1c2-6.9 3-14.3 3-22c0-44.2-35.8-80-80-80c-12.3 0-23.9 2.8-34.3 7.7c-14.1 6.7-30.9 2.3-39.9-10.5zM272 32c59.5 0 112.1 29.5 144 74.8C430.5 99.9 446.8 96 464 96c61.9 0 112 50.1 112 112c0 10.7-1.5 21-4.3 30.8C612.3 260.2 640 302.9 640 352c0 70.7-57.3 128-128 128l-368 0C64.5 480 0 415.5 0 336c0-62.8 40.2-116.1 96.2-135.9C100.3 106.6 177.4 32 272 32zM228.7 244.7l80-80c6.2-6.2 16.4-6.2 22.6 0l80 80c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L336 214.6 336 368c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-153.4-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6z"/></svg>
					</span>
					<span class="fmd-d-block fmd-mt-3 fmd-first-letter-uppercase">
						পালটান: <strong class="fmd-text-accent">ফাইল বেছে নিন</strong><span class="fmd-xs:d-none"> বা এখানে টেনে আনুন</span>
					</span>
				</span>
				<span class="fmd-file-exists-section"></span>
				<span class="fmd-form-file-size-limit fmd-mt-1">
					সাইজ লিমিট: 100MB
				</span>
			</span>
		</label>
		<div class="fmd-form-file-reset-btn-container">
			<button type="button" class="fmd-form-file-reset-btn" aria-label="নির্বাচিত ফাইল সরান">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"/></svg>
			</button>
		</div>
	</div>
</div>
`;

test("Case 8 (not required, current file, different localization)", () => {
	expect(
		beautify(
			createFileField(
				"portfolio",
				false,
				"",
				`
					| question = Upload your portfolio
					| description = Please make sure the file is a PDF.
					| SIZELIMIT = 100
					| currentfile = image.png
				`,
				"|",
				"",
				"bn",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate8, { format: "html" }));
});
