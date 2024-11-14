"use strict";

const { createFileField } = require("../src/form-field-create");
const beautify = require("beautify");

// Case 1

const expectedTemplate1 = `
<div data-bmd-name="portfolio" data-bmd-type="file" data-bmd-size-limit="50" id="some-id" class="bmd-col-6 bmd-xs:col-10 bmd-form-field bmd-form-field-sm bmd-form-field-classic-labels" aria-label="Label" data-title="Some title">
	<label class="bmd-form-question">
		Upload your <span class="bmd-text-nowrap" aria-hidden="true">portfolio<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">portfolio (required)</span>
	</label>
	<p class="bmd-form-description">
		Please make sure the file is a PDF.
	</p>
	<div class="bmd-form-file">
		<label class="bmd-form-file-label bmd-disabled">
			<input 
				name="portfolio"
				id="id_portfolio"
				type="file"
				class="bmd-form-file-input"
				required
				accept="image/*"
				disabled
				data-bmd-autofocus
			>
			<span class="bmd-d-block bmd-w-auto bmd-mw-100">
				<span class="bmd-visually-hidden">
					Upload your <span class="bmd-text-nowrap" aria-hidden="true">portfolio<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">portfolio (required)</span>
				</span>
				<span class="bmd-file-empty-section">
					<span class="bmd-form-file-img-container">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M389.8 125.2C363.7 88.1 320.7 64 272 64c-77.4 0-140.5 61-143.9 137.5c-.6 13-9 24.4-21.3 28.8C63.2 245.7 32 287.2 32 336c0 61.9 50.1 112 112 112l368 0c53 0 96-43 96-96c0-36.8-20.7-68.8-51.2-84.9c-13.4-7.1-20-22.5-15.8-37.1c2-6.9 3-14.3 3-22c0-44.2-35.8-80-80-80c-12.3 0-23.9 2.8-34.3 7.7c-14.1 6.7-30.9 2.3-39.9-10.5zM272 32c59.5 0 112.1 29.5 144 74.8C430.5 99.9 446.8 96 464 96c61.9 0 112 50.1 112 112c0 10.7-1.5 21-4.3 30.8C612.3 260.2 640 302.9 640 352c0 70.7-57.3 128-128 128l-368 0C64.5 480 0 415.5 0 336c0-62.8 40.2-116.1 96.2-135.9C100.3 106.6 177.4 32 272 32zM228.7 244.7l80-80c6.2-6.2 16.4-6.2 22.6 0l80 80c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L336 214.6 336 368c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-153.4-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6z"/></svg>
					</span>
					<span class="bmd-d-block bmd-mt-3">
						<strong class="bmd-text-accent">Choose file</strong><span class="bmd-xs:d-none"> or drag here</span>
					</span>
				</span>
				<span class="bmd-file-exists-section"></span>
				<span class="bmd-form-file-size-limit bmd-mt-1">
					Size limit: 50MB
				</span>
			</span>
		</label>
		<div class="bmd-form-file-reset-btn-container">
			<button type="button" class="bmd-form-file-reset-btn" aria-label="Remove chosen file">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"/></svg>
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
				'id="some-id" class="bmd-col-6 bmd-xs:col-10" aria-label="Label" data-title="Some title"',
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
<div data-bmd-name="portfolio" data-bmd-type="file" data-bmd-size-limit="10" class="bmd-form-field">
	<label class="bmd-form-question">
		Upload your portfolio
	</label>
	<p class="bmd-form-description">
		Please make sure the file is a PDF.
	</p>
	<div class="bmd-form-file">
		<label class="bmd-form-file-label">
			<input 
				name="portfolio"
				id="id_portfolio"
				type="file"
				class="bmd-form-file-input"
			>
			<span class="bmd-d-block bmd-w-auto bmd-mw-100">
				<span class="bmd-visually-hidden">
					Upload your portfolio
				</span>
				<span class="bmd-file-empty-section">
					<span class="bmd-form-file-img-container">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M389.8 125.2C363.7 88.1 320.7 64 272 64c-77.4 0-140.5 61-143.9 137.5c-.6 13-9 24.4-21.3 28.8C63.2 245.7 32 287.2 32 336c0 61.9 50.1 112 112 112l368 0c53 0 96-43 96-96c0-36.8-20.7-68.8-51.2-84.9c-13.4-7.1-20-22.5-15.8-37.1c2-6.9 3-14.3 3-22c0-44.2-35.8-80-80-80c-12.3 0-23.9 2.8-34.3 7.7c-14.1 6.7-30.9 2.3-39.9-10.5zM272 32c59.5 0 112.1 29.5 144 74.8C430.5 99.9 446.8 96 464 96c61.9 0 112 50.1 112 112c0 10.7-1.5 21-4.3 30.8C612.3 260.2 640 302.9 640 352c0 70.7-57.3 128-128 128l-368 0C64.5 480 0 415.5 0 336c0-62.8 40.2-116.1 96.2-135.9C100.3 106.6 177.4 32 272 32zM228.7 244.7l80-80c6.2-6.2 16.4-6.2 22.6 0l80 80c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L336 214.6 336 368c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-153.4-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6z"/></svg>
					</span>
					<span class="bmd-d-block bmd-mt-3">
						<strong class="bmd-text-accent">Choose file</strong><span class="bmd-xs:d-none"> or drag here</span>
					</span>
				</span>
				<span class="bmd-file-exists-section"></span>
				<span class="bmd-form-file-size-limit bmd-mt-1">
					Size limit: 10MB
				</span>
			</span>
		</label>
		<div class="bmd-form-file-reset-btn-container">
			<button type="button" class="bmd-form-file-reset-btn" aria-label="Remove chosen file">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"/></svg>
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
<div data-bmd-name="portfolio" data-bmd-type="file" data-bmd-size-limit="100" class="bmd-form-field">
	<label class="bmd-form-question">
		Upload your portfolio
	</label>
	<p class="bmd-form-description">
		Please make sure the file is a PDF.
	</p>
	<div class="bmd-form-file">
		<label class="bmd-form-file-label">
			<input 
				name="portfolio"
				id="id_portfolio"
				type="file"
				class="bmd-form-file-input"
			>
			<span class="bmd-d-block bmd-w-auto bmd-mw-100">
				<span class="bmd-visually-hidden">
					Upload your portfolio
				</span>
				<span class="bmd-file-empty-section">
					<span class="bmd-form-file-img-container">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M389.8 125.2C363.7 88.1 320.7 64 272 64c-77.4 0-140.5 61-143.9 137.5c-.6 13-9 24.4-21.3 28.8C63.2 245.7 32 287.2 32 336c0 61.9 50.1 112 112 112l368 0c53 0 96-43 96-96c0-36.8-20.7-68.8-51.2-84.9c-13.4-7.1-20-22.5-15.8-37.1c2-6.9 3-14.3 3-22c0-44.2-35.8-80-80-80c-12.3 0-23.9 2.8-34.3 7.7c-14.1 6.7-30.9 2.3-39.9-10.5zM272 32c59.5 0 112.1 29.5 144 74.8C430.5 99.9 446.8 96 464 96c61.9 0 112 50.1 112 112c0 10.7-1.5 21-4.3 30.8C612.3 260.2 640 302.9 640 352c0 70.7-57.3 128-128 128l-368 0C64.5 480 0 415.5 0 336c0-62.8 40.2-116.1 96.2-135.9C100.3 106.6 177.4 32 272 32zM228.7 244.7l80-80c6.2-6.2 16.4-6.2 22.6 0l80 80c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L336 214.6 336 368c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-153.4-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6z"/></svg>
					</span>
					<span class="bmd-d-block bmd-mt-3">
						<strong class="bmd-text-accent">ফাইল বেছে নিন</strong><span class="bmd-xs:d-none"> বা এখানে টেনে আনুন</span>
					</span>
				</span>
				<span class="bmd-file-exists-section"></span>
				<span class="bmd-form-file-size-limit bmd-mt-1">
					সাইয লিমিট: 100MB
				</span>
			</span>
		</label>
		<div class="bmd-form-file-reset-btn-container">
			<button type="button" class="bmd-form-file-reset-btn" aria-label="নির্বাচিত ফাইল সরান">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"/></svg>
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
<div data-bmd-name="image" data-bmd-type="file" data-bmd-size-limit="10" class="bmd-form-field bmd-form-field-classic-labels">
	<label class="bmd-form-question">
		Upload your <span class="bmd-text-nowrap" aria-hidden="true">image<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">image (required)</span>
	</label>
	<p class="bmd-form-description">
		Please make sure the file is an image.
	</p>
	<div class="bmd-form-file">
		<label class="bmd-form-file-label">
			<input 
				name="image"
				id="form1:id_image"
				type="file"
				class="bmd-form-file-input"
				required
				accept="image/*"
			>
			<span class="bmd-d-block bmd-w-auto bmd-mw-100">
				<span class="bmd-visually-hidden">
					Upload your <span class="bmd-text-nowrap" aria-hidden="true">image<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">image (required)</span>
				</span>
				<span class="bmd-file-empty-section">
					<span class="bmd-form-file-img-container">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M389.8 125.2C363.7 88.1 320.7 64 272 64c-77.4 0-140.5 61-143.9 137.5c-.6 13-9 24.4-21.3 28.8C63.2 245.7 32 287.2 32 336c0 61.9 50.1 112 112 112l368 0c53 0 96-43 96-96c0-36.8-20.7-68.8-51.2-84.9c-13.4-7.1-20-22.5-15.8-37.1c2-6.9 3-14.3 3-22c0-44.2-35.8-80-80-80c-12.3 0-23.9 2.8-34.3 7.7c-14.1 6.7-30.9 2.3-39.9-10.5zM272 32c59.5 0 112.1 29.5 144 74.8C430.5 99.9 446.8 96 464 96c61.9 0 112 50.1 112 112c0 10.7-1.5 21-4.3 30.8C612.3 260.2 640 302.9 640 352c0 70.7-57.3 128-128 128l-368 0C64.5 480 0 415.5 0 336c0-62.8 40.2-116.1 96.2-135.9C100.3 106.6 177.4 32 272 32zM228.7 244.7l80-80c6.2-6.2 16.4-6.2 22.6 0l80 80c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L336 214.6 336 368c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-153.4-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6z"/></svg>
					</span>
					<span class="bmd-d-block bmd-mt-3">
						<strong class="bmd-text-accent">Choose file</strong><span class="bmd-xs:d-none"> or drag here</span>
					</span>
				</span>
				<span class="bmd-file-exists-section"></span>
				<span class="bmd-form-file-size-limit bmd-mt-1">
					Size limit: 10MB
				</span>
			</span>
		</label>
		<div class="bmd-form-file-reset-btn-container">
			<button type="button" class="bmd-form-file-reset-btn" aria-label="Remove chosen file">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"/></svg>
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
<div data-bmd-name="image" data-bmd-type="file" data-bmd-size-limit="10" class="bmd-form-field">
	<label class="bmd-form-question">
		<span class="bmd-text-nowrap" aria-hidden="true">...<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">... (required)</span>
	</label>
	<div class="bmd-form-file">
		<label class="bmd-form-file-label">
			<input 
				name="image"
				id="id_image"
				type="file"
				class="bmd-form-file-input"
				required
			>
			<span class="bmd-d-block bmd-w-auto bmd-mw-100">
				<span class="bmd-visually-hidden">
					<span class="bmd-text-nowrap" aria-hidden="true">...<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">... (required)</span>
				</span>
				<span class="bmd-file-empty-section">
					<span class="bmd-form-file-img-container">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M389.8 125.2C363.7 88.1 320.7 64 272 64c-77.4 0-140.5 61-143.9 137.5c-.6 13-9 24.4-21.3 28.8C63.2 245.7 32 287.2 32 336c0 61.9 50.1 112 112 112l368 0c53 0 96-43 96-96c0-36.8-20.7-68.8-51.2-84.9c-13.4-7.1-20-22.5-15.8-37.1c2-6.9 3-14.3 3-22c0-44.2-35.8-80-80-80c-12.3 0-23.9 2.8-34.3 7.7c-14.1 6.7-30.9 2.3-39.9-10.5zM272 32c59.5 0 112.1 29.5 144 74.8C430.5 99.9 446.8 96 464 96c61.9 0 112 50.1 112 112c0 10.7-1.5 21-4.3 30.8C612.3 260.2 640 302.9 640 352c0 70.7-57.3 128-128 128l-368 0C64.5 480 0 415.5 0 336c0-62.8 40.2-116.1 96.2-135.9C100.3 106.6 177.4 32 272 32zM228.7 244.7l80-80c6.2-6.2 16.4-6.2 22.6 0l80 80c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L336 214.6 336 368c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-153.4-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6z"/></svg>
					</span>
					<span class="bmd-d-block bmd-mt-3">
						<strong class="bmd-text-accent">Choose file</strong><span class="bmd-xs:d-none"> or drag here</span>
					</span>
				</span>
				<span class="bmd-file-exists-section"></span>
				<span class="bmd-form-file-size-limit bmd-mt-1">
					Size limit: 10MB
				</span>
			</span>
		</label>
		<div class="bmd-form-file-reset-btn-container">
			<button type="button" class="bmd-form-file-reset-btn" aria-label="Remove chosen file">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"/></svg>
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
