"use strict";

const { createRatingField } = require("../src/form-field-create");
const beautify = require("beautify");

// Case 1

const expectedTemplate1 = `
<fieldset data-fmd-name="rating" data-fmd-type="num-radio" data-fmd-required id="some-id" class="fmd-col-6 fmd-xs:col-10 fmd-form-field fmd-form-field-sm fmd-form-field-classic-labels" aria-label="Label" data-title="Some title">
	<legend class="fmd-form-question">
		What is your <span class="fmd-text-nowrap" aria-hidden="true">rating?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">rating? (required)</span>
	</legend>
	<p class="fmd-form-description">
		Please choose.
	</p>
	<div class="fmd-rating-grid">
		<input 
			name="rating"
			id="id_rating-1"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="1"
			data-fmd-autofocus
		>
		<label class="fmd-form-rating-label" for="id_rating-1">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			1<span class="fmd-visually-hidden"> star</span>
		</label>
		<input 
			name="rating"
			id="id_rating-2"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="2"
			data-fmd-autofocus
		>
		<label class="fmd-form-rating-label" for="id_rating-2">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			2<span class="fmd-visually-hidden"> stars</span>
		</label>
		<input 
			name="rating"
			id="id_rating-3"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="3"
			data-fmd-autofocus
		>
		<label class="fmd-form-rating-label" for="id_rating-3">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			3<span class="fmd-visually-hidden"> stars</span>
		</label>
		<input 
			name="rating"
			id="id_rating-4"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="4"
			data-fmd-autofocus
		>
		<label class="fmd-form-rating-label" for="id_rating-4">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			4<span class="fmd-visually-hidden"> stars</span>
		</label>
		<input 
			name="rating"
			id="id_rating-5"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="5"
			data-fmd-autofocus
		>
		<label class="fmd-form-rating-label" for="id_rating-5">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			5<span class="fmd-visually-hidden"> stars</span>
		</label>
	</div>
</fieldset>
`;

test("Case 1", () => {
	expect(
		beautify(
			createRatingField(
				"rating",
				true,
				'id="some-id" class="fmd-col-6 fmd-xs:col-10" aria-label="Label" data-title="Some title"',
				`
					| question = What is your rating?
					| description = Please choose.
					| fieldsize = sm
					| subfield
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

// Case 2 (not required, out of 3, hearts, value, different id)

const expectedTemplate2 = `
<fieldset data-fmd-name="rating" data-fmd-type="num-radio" class="fmd-form-field">
	<legend class="fmd-form-question">
		What is your rating?
	</legend>
	<p class="fmd-form-description">
		Please choose.
	</p>
	<div class="fmd-rating-grid">
		<input 
			name="rating"
			id="form3:id_rating-1"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="1"
		>
		<label class="fmd-form-rating-label" for="form3:id_rating-1">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M39.8 263.8L64 288 256 480 448 288l24.2-24.2c25.5-25.5 39.8-60 39.8-96C512 92.8 451.2 32 376.2 32c-36 0-70.5 14.3-96 39.8L256 96 231.8 71.8c-25.5-25.5-60-39.8-96-39.8C60.8 32 0 92.8 0 167.8c0 36 14.3 70.5 39.8 96z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M256 141.3l-22.6-22.6L209.1 94.4C189.7 74.9 163.3 64 135.8 64C78.5 64 32 110.5 32 167.8c0 27.5 10.9 53.9 30.4 73.4l24.2 24.2L256 434.8 425.4 265.4l24.2-24.2c19.5-19.5 30.4-45.9 30.4-73.4C480 110.5 433.5 64 376.2 64c-27.5 0-53.9 10.9-73.4 30.4l-24.2 24.2L256 141.3zm22.6 316.1L256 480l-22.6-22.6L64 288 39.8 263.8C14.3 238.3 0 203.8 0 167.8C0 92.8 60.8 32 135.8 32c36 0 70.5 14.3 96 39.8l1.6 1.6L256 96l22.6-22.6 1.6-1.6c25.5-25.5 60-39.8 96-39.8C451.2 32 512 92.8 512 167.8c0 36-14.3 70.5-39.8 96L448 288 278.6 457.4z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			1<span class="fmd-visually-hidden"> star</span>
		</label>
		<input 
			name="rating"
			id="form3:id_rating-2"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="2"
			checked
		>
		<label class="fmd-form-rating-label" for="form3:id_rating-2">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M39.8 263.8L64 288 256 480 448 288l24.2-24.2c25.5-25.5 39.8-60 39.8-96C512 92.8 451.2 32 376.2 32c-36 0-70.5 14.3-96 39.8L256 96 231.8 71.8c-25.5-25.5-60-39.8-96-39.8C60.8 32 0 92.8 0 167.8c0 36 14.3 70.5 39.8 96z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M256 141.3l-22.6-22.6L209.1 94.4C189.7 74.9 163.3 64 135.8 64C78.5 64 32 110.5 32 167.8c0 27.5 10.9 53.9 30.4 73.4l24.2 24.2L256 434.8 425.4 265.4l24.2-24.2c19.5-19.5 30.4-45.9 30.4-73.4C480 110.5 433.5 64 376.2 64c-27.5 0-53.9 10.9-73.4 30.4l-24.2 24.2L256 141.3zm22.6 316.1L256 480l-22.6-22.6L64 288 39.8 263.8C14.3 238.3 0 203.8 0 167.8C0 92.8 60.8 32 135.8 32c36 0 70.5 14.3 96 39.8l1.6 1.6L256 96l22.6-22.6 1.6-1.6c25.5-25.5 60-39.8 96-39.8C451.2 32 512 92.8 512 167.8c0 36-14.3 70.5-39.8 96L448 288 278.6 457.4z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			2<span class="fmd-visually-hidden"> stars</span>
		</label>
		<input 
			name="rating"
			id="form3:id_rating-3"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="3"
		>
		<label class="fmd-form-rating-label" for="form3:id_rating-3">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M39.8 263.8L64 288 256 480 448 288l24.2-24.2c25.5-25.5 39.8-60 39.8-96C512 92.8 451.2 32 376.2 32c-36 0-70.5 14.3-96 39.8L256 96 231.8 71.8c-25.5-25.5-60-39.8-96-39.8C60.8 32 0 92.8 0 167.8c0 36 14.3 70.5 39.8 96z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M256 141.3l-22.6-22.6L209.1 94.4C189.7 74.9 163.3 64 135.8 64C78.5 64 32 110.5 32 167.8c0 27.5 10.9 53.9 30.4 73.4l24.2 24.2L256 434.8 425.4 265.4l24.2-24.2c19.5-19.5 30.4-45.9 30.4-73.4C480 110.5 433.5 64 376.2 64c-27.5 0-53.9 10.9-73.4 30.4l-24.2 24.2L256 141.3zm22.6 316.1L256 480l-22.6-22.6L64 288 39.8 263.8C14.3 238.3 0 203.8 0 167.8C0 92.8 60.8 32 135.8 32c36 0 70.5 14.3 96 39.8l1.6 1.6L256 96l22.6-22.6 1.6-1.6c25.5-25.5 60-39.8 96-39.8C451.2 32 512 92.8 512 167.8c0 36-14.3 70.5-39.8 96L448 288 278.6 457.4z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			3<span class="fmd-visually-hidden"> stars</span>
		</label>
	</div>
</fieldset>
`;

test("Case 2 (not required, out of 3, hearts, value, different id)", () => {
	expect(
		beautify(
			createRatingField(
				"rating",
				false,
				"",
				`
					| question = What is your rating?
					| description = Please choose.
					| outOf = 3
					| icon = hearts
					| value = 2
				`,
				"|",
				"form3",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate2, { format: "html" }));
});

// Case 3 (out of 5 or more, hide labels, different form delimiter)

const expectedTemplate3 = `
<fieldset data-fmd-name="rating" data-fmd-type="num-radio" data-fmd-required id="some-id" class="fmd-col-6 fmd-xs:col-10 fmd-form-field" aria-label="Label" data-title="Some title">
	<legend class="fmd-form-question">
		What is your <span class="fmd-text-nowrap" aria-hidden="true">rating?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">rating? (required)</span>
	</legend>
	<p class="fmd-form-description">
		Please choose.
	</p>
	<div class="fmd-rating-grid fmd-rating-grid-5-or-more">
		<input 
			name="rating"
			id="id_rating-1"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="1"
		>
		<label class="fmd-form-rating-label" for="id_rating-1">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			<span class="fmd-visually-hidden">1 star</span>
		</label>
		<input 
			name="rating"
			id="id_rating-2"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="2"
		>
		<label class="fmd-form-rating-label" for="id_rating-2">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			<span class="fmd-visually-hidden">2 stars</span>
		</label>
		<input 
			name="rating"
			id="id_rating-3"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="3"
		>
		<label class="fmd-form-rating-label" for="id_rating-3">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			<span class="fmd-visually-hidden">3 stars</span>
		</label>
		<input 
			name="rating"
			id="id_rating-4"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="4"
		>
		<label class="fmd-form-rating-label" for="id_rating-4">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			<span class="fmd-visually-hidden">4 stars</span>
		</label>
		<input 
			name="rating"
			id="id_rating-5"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="5"
		>
		<label class="fmd-form-rating-label" for="id_rating-5">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			<span class="fmd-visually-hidden">5 stars</span>
		</label>
		<input 
			name="rating"
			id="id_rating-6"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="6"
		>
		<label class="fmd-form-rating-label" for="id_rating-6">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			<span class="fmd-visually-hidden">6 stars</span>
		</label>
	</div>
</fieldset>
`;

test("Case 3 (out of 5 or more, hide labels, different form delimiter)", () => {
	expect(
		beautify(
			createRatingField(
				"rating",
				true,
				'id="some-id" class="fmd-col-6 fmd-xs:col-10" aria-label="Label" data-title="Some title"',
				`
					question = What is your rating?
					description = Please choose.
					outof = 6
					hideLabels
				`,
				"\n",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate3, { format: "html" }));
});

// Case 4 (out of 2, different localization)

const expectedTemplate4 = `
<fieldset data-fmd-name="rating" data-fmd-type="num-radio" data-fmd-required class="fmd-form-field">
	<legend class="fmd-form-question">
		What is your <span class="fmd-text-nowrap" aria-hidden="true">rating?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">rating? (প্রয়োজন)</span>
	</legend>
	<p class="fmd-form-description">
		Please choose.
	</p>
	<div class="fmd-rating-grid">
		<input 
			name="rating"
			id="id_rating-1"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="1"
		>
		<label class="fmd-form-rating-label" for="id_rating-1">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M39.8 263.8L64 288 256 480 448 288l24.2-24.2c25.5-25.5 39.8-60 39.8-96C512 92.8 451.2 32 376.2 32c-36 0-70.5 14.3-96 39.8L256 96 231.8 71.8c-25.5-25.5-60-39.8-96-39.8C60.8 32 0 92.8 0 167.8c0 36 14.3 70.5 39.8 96z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M256 141.3l-22.6-22.6L209.1 94.4C189.7 74.9 163.3 64 135.8 64C78.5 64 32 110.5 32 167.8c0 27.5 10.9 53.9 30.4 73.4l24.2 24.2L256 434.8 425.4 265.4l24.2-24.2c19.5-19.5 30.4-45.9 30.4-73.4C480 110.5 433.5 64 376.2 64c-27.5 0-53.9 10.9-73.4 30.4l-24.2 24.2L256 141.3zm22.6 316.1L256 480l-22.6-22.6L64 288 39.8 263.8C14.3 238.3 0 203.8 0 167.8C0 92.8 60.8 32 135.8 32c36 0 70.5 14.3 96 39.8l1.6 1.6L256 96l22.6-22.6 1.6-1.6c25.5-25.5 60-39.8 96-39.8C451.2 32 512 92.8 512 167.8c0 36-14.3 70.5-39.8 96L448 288 278.6 457.4z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			1<span class="fmd-visually-hidden"> স্টার</span>
		</label>
		<input 
			name="rating"
			id="id_rating-2"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="2"
		>
		<label class="fmd-form-rating-label" for="id_rating-2">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M39.8 263.8L64 288 256 480 448 288l24.2-24.2c25.5-25.5 39.8-60 39.8-96C512 92.8 451.2 32 376.2 32c-36 0-70.5 14.3-96 39.8L256 96 231.8 71.8c-25.5-25.5-60-39.8-96-39.8C60.8 32 0 92.8 0 167.8c0 36 14.3 70.5 39.8 96z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M256 141.3l-22.6-22.6L209.1 94.4C189.7 74.9 163.3 64 135.8 64C78.5 64 32 110.5 32 167.8c0 27.5 10.9 53.9 30.4 73.4l24.2 24.2L256 434.8 425.4 265.4l24.2-24.2c19.5-19.5 30.4-45.9 30.4-73.4C480 110.5 433.5 64 376.2 64c-27.5 0-53.9 10.9-73.4 30.4l-24.2 24.2L256 141.3zm22.6 316.1L256 480l-22.6-22.6L64 288 39.8 263.8C14.3 238.3 0 203.8 0 167.8C0 92.8 60.8 32 135.8 32c36 0 70.5 14.3 96 39.8l1.6 1.6L256 96l22.6-22.6 1.6-1.6c25.5-25.5 60-39.8 96-39.8C451.2 32 512 92.8 512 167.8c0 36-14.3 70.5-39.8 96L448 288 278.6 457.4z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			2<span class="fmd-visually-hidden"> স্টার</span>
		</label>
	</div>
</fieldset>
`;

test("Case 4 (out of 2, heart, different localization)", () => {
	expect(
		beautify(
			createRatingField(
				"rating",
				true,
				"",
				`
					| question = What is your rating?
					| description = Please choose.
					| outof = 2
					| icon = HEART
				`,
				"|",
				"",
				"bn",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate4, { format: "html" }));
});

// Case 5 (out of more than 10)

const expectedTemplate5 = `
<fieldset data-fmd-name="rating" data-fmd-type="num-radio" data-fmd-required id="some-id" class="fmd-col-6 fmd-xs:col-10 fmd-form-field fmd-form-field-sm fmd-form-field-classic-labels" aria-label="Label" data-title="Some title">
	<legend class="fmd-form-question">
		What is your <span class="fmd-text-nowrap" aria-hidden="true">rating?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">rating? (required)</span>
	</legend>
	<p class="fmd-form-description">
		Please choose.
	</p>
	<div class="fmd-rating-grid">
		<input 
			name="rating"
			id="id_rating-1"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="1"
			data-fmd-autofocus
		>
		<label class="fmd-form-rating-label" for="id_rating-1">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			1<span class="fmd-visually-hidden"> star</span>
		</label>
		<input 
			name="rating"
			id="id_rating-2"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="2"
			data-fmd-autofocus
		>
		<label class="fmd-form-rating-label" for="id_rating-2">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			2<span class="fmd-visually-hidden"> stars</span>
		</label>
		<input 
			name="rating"
			id="id_rating-3"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="3"
			data-fmd-autofocus
		>
		<label class="fmd-form-rating-label" for="id_rating-3">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			3<span class="fmd-visually-hidden"> stars</span>
		</label>
		<input 
			name="rating"
			id="id_rating-4"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="4"
			data-fmd-autofocus
		>
		<label class="fmd-form-rating-label" for="id_rating-4">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			4<span class="fmd-visually-hidden"> stars</span>
		</label>
		<input 
			name="rating"
			id="id_rating-5"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="5"
			data-fmd-autofocus
		>
		<label class="fmd-form-rating-label" for="id_rating-5">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			5<span class="fmd-visually-hidden"> stars</span>
		</label>
	</div>
</fieldset>
`;

test("Case 5 (out of more than 10)", () => {
	expect(
		beautify(
			createRatingField(
				"rating",
				true,
				'id="some-id" class="fmd-col-6 fmd-xs:col-10" aria-label="Label" data-title="Some title"',
				`
					| question = What is your rating?
					| description = Please choose.
					| OUTOF = 11
					| fieldsize = sm
					| subfield
					| autofocus
				`,
				"|",
				"",
				"en",
			),
			{ format: "html" },
		),
	).toBe(beautify(expectedTemplate5, { format: "html" }));
});

// Case 6 (no params)

const expectedTemplate6 = `
<fieldset data-fmd-name="rating" data-fmd-type="num-radio" data-fmd-required class="fmd-form-field">
	<legend class="fmd-form-question">
		<span class="fmd-text-nowrap" aria-hidden="true">...<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">... (required)</span>
	</legend>
	<div class="fmd-rating-grid">
		<input 
			name="rating"
			id="id_rating-1"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="1"
		>
		<label class="fmd-form-rating-label" for="id_rating-1">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			1<span class="fmd-visually-hidden"> star</span>
		</label>
		<input 
			name="rating"
			id="id_rating-2"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="2"
		>
		<label class="fmd-form-rating-label" for="id_rating-2">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			2<span class="fmd-visually-hidden"> stars</span>
		</label>
		<input 
			name="rating"
			id="id_rating-3"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="3"
		>
		<label class="fmd-form-rating-label" for="id_rating-3">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			3<span class="fmd-visually-hidden"> stars</span>
		</label>
		<input 
			name="rating"
			id="id_rating-4"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="4"
		>
		<label class="fmd-form-rating-label" for="id_rating-4">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			4<span class="fmd-visually-hidden"> stars</span>
		</label>
		<input 
			name="rating"
			id="id_rating-5"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="5"
		>
		<label class="fmd-form-rating-label" for="id_rating-5">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			5<span class="fmd-visually-hidden"> stars</span>
		</label>
	</div>
</fieldset>
`;

test("Case 6 (no params)", () => {
	expect(
		beautify(createRatingField("rating", true, "", "", "|", "", "en"), {
			format: "html",
		}),
	).toBe(beautify(expectedTemplate6, { format: "html" }));
});
