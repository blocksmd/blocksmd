"use strict";

const { formFieldPattern } = require("./form-field-create");
const { unescape } = require("./helpers");
const { getTranslation } = require("./translations");
var nunjucks = require("nunjucks");

const slideTemplate = `
{% if isForm and isFormSlide %}
<form
	method="POST"
	action="javascript:void(0);"
	class="fmd-slide{% if isFirstSlide %} fmd-first-slide{% endif %}"
	{% if jump and not isFirstSlide %}data-fmd-jump="{{ jump }}"{% endif %}
	{% if pageProgress %}data-fmd-page-progress="{{ pageProgress }}"{% endif %}
	{% if disablePrevBtn %}data-fmd-disable-prev-btn{% endif %}
	{% if post %}data-fmd-post{% endif %}
>
	<div class="fmd-grid">
		{{ content }}
		{% if startBtn %}
		<div class="fmd-next-controls fmd-d-flex{% if buttonAlignment %} fmd-justify-content-{{ buttonAlignment }}{% endif %}">
			<button type="submit" class="fmd-submit-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				{{ startBtn }}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
		{% else %}
		<div class="fmd-next-controls fmd-d-flex{% if buttonAlignment %} fmd-justify-content-{{ buttonAlignment }}{% endif %}">
			<button type="submit" class="fmd-submit-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				{% if btnSettings.submitBtnText != "" %}
				{{ btnSettings.submitBtnText }}
				{% else %}
				{{ translations.formSubmitBtn }}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon fmd-ms-2" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
				{% endif %}
			</button>
		</div>
		{% endif %}
	</div>
</form>
{% else %}
<div
	class="fmd-slide{% if isFirstSlide %} fmd-first-slide{% endif %}"
	{% if jump and not isFirstSlide %}data-fmd-jump="{{ jump }}"{% endif %}
	{% if pageProgress %}data-fmd-page-progress="{{ pageProgress }}"{% endif %}
	{% if disablePrevBtn %}data-fmd-disable-prev-btn{% endif %}
>
	<div class="fmd-grid">
		{{ content }}
		{% if startBtn %}
		<div class="fmd-next-controls fmd-d-flex{% if buttonAlignment %} fmd-justify-content-{{ buttonAlignment }}{% endif %}">
			<button type="button" class="fmd-next-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				{{ startBtn }}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
		{% else %}
		<div class="fmd-next-controls fmd-d-flex{% if buttonAlignment %} fmd-justify-content-{{ buttonAlignment }}{% endif %}">
			<button type="button" class="fmd-next-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				{{ translations.nextBtn }}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-rtl" aria-hidden="true" focusable="false"><path d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"/></svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fmd-icon fmd-ms-2 fmd-hide-ltr" aria-hidden="true" focusable="false"><path d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z"/></svg>
			</button>
		</div>
		{% endif %}
	</div>
</div>
{% endif %}
`;

const endSlideTemplate = `
<div
	class="fmd-slide fmd-end-slide"
	{% if redirect %}data-fmd-redirect="{{ redirect }}"{% endif %}
>
	<div class="fmd-grid">
		{{ content }}
		{% if btnSettings.showRestartBtn %}
		<div class="fmd-next-controls fmd-d-flex fmd-justify-content-center">
			<button type="button" class="fmd-restart-btn fmd-btn fmd-btn-accent fmd-d-flex fmd-align-items-center fmd-justify-content-center">
				{{ translations.restartBtn }}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fmd-icon fmd-ms-2" aria-hidden="true" focusable="false"><path d="M472 224c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24s-24 10.7-24 24v80.1l-20-23.5C387 63.4 325.1 32 256 32C132.3 32 32 132.3 32 256s100.3 224 224 224c50.4 0 97-16.7 134.4-44.8c10.6-8 12.7-23 4.8-33.6s-23-12.7-33.6-4.8C332.2 418.9 295.7 432 256 432c-97.2 0-176-78.8-176-176s78.8-176 176-176c54.3 0 102.9 24.6 135.2 63.4l.1 .2 0 0L418.9 176H328c-13.3 0-24 10.7-24 24s10.7 24 24 24H472z"/></svg>
			</button>
		</div>
		{% endif %}
	</div>
</div>
`;

/**
 * Given a template, parse the slide and return a ready-to-use HTML string
 * (with Markdown content inside).
 *
 * Differences between first slide and start slides:
 *
 * - The first slide is the very first slide to render on the template.
 * - Start slides simply use a slightly altered template.
 * - The first slide cannot have a jump condition or a page progress.
 * - A start slide may or may not be the first slide.
 *
 * @param {string} template
 * @param {boolean} isForm
 * @param {boolean} isFirstSlide
 * @param {{showRestartBtn: boolean, submitBtnText: string}} btnSettings
 * @param {string} localization
 * @returns {{template: string, slideType:"start"|"body"|"end"}} template with
 * parsed slides, type of the slide
 */
function parseSlide(template, isForm, isFirstSlide, btnSettings, localization) {
	const content = [];
	let isFormSlide = false;
	let jump = "";
	let pageProgress = "";
	let disablePrevBtn = false;
	let post = false;
	let buttonAlignment = "";
	let startBtn = "";
	let redirect = "";
	let slideType = "body";

	// Check if slide should be <form> or <div>
	if (isForm) {
		if (template.match(formFieldPattern)) {
			isFormSlide = true;
		}
	}

	// Go through each line
	const lines = template.split("\n");
	for (let rawLine of lines) {
		// Unescape the line first
		let line = unescape(rawLine);

		// Get the jump condition (if provided using the line "-> ...")
		if (line.trim().startsWith("->")) {
			line = line.trim();
			line = line.slice(2).trim();

			// Start slides are defined using the line "-> START"
			if (line.toLowerCase() === "start") {
				startBtn = getTranslation(localization, "start-btn");
				slideType = "start";
			}
			// Start slides with custom start buttons are defined using the line
			// "-> START -> <start button text>"
			else if (line.match(/^start\s*->(.*)\s*$/i)) {
				startBtn = line.slice(5).trim().slice(2).trim();
				slideType = "start";
			}
			// End slides are defined using the line "-> END"
			else if (line.toLowerCase() === "end") {
				slideType = "end";
			}
			// End slides that redirect to a link are defined using the line
			// "-> END -> <link to redirect to>"
			else if (line.match(/^end\s*->(.*)\s*$/i)) {
				redirect = line.slice(3).trim().slice(2).trim();
				slideType = "end";
			}
			// Otherwise, set jump condition
			// Replace all double-quotes with single-quotes (for use in templates)
			else if (line) {
				jump = line.replace(/"/g, "'");
			}
		}
		// Get the page progress (if provided using the line "|> ...")
		else if (line.trim().startsWith("|>")) {
			line = line.trim();
			line = line.slice(2).trim();
			if (line.match(/^[0-9.]+%$/)) {
				pageProgress = line;
			} else if (line.match(/^[0-9]+\s*\/\s*[0-9]+$/)) {
				pageProgress = `calc(100% * (${line}))`;
			} else {
				console.warn(
					`[SLIDES] "${line}" is not a valid percentage or fraction, acceptable examples: 25%, 33.33%, 75%, 1/4, 1/3, 3/4, etc.`,
				);
			}
		}
		// Get the CTA alignment (if provided using the line "=| ..." or "|= ...")
		else if (line.trim().startsWith("=|") || line.trim().startsWith("|=")) {
			line = line.trim();
			line = line.slice(2).trim().toLowerCase();
			if (
				line === "start" ||
				line === "center" ||
				line === "end" ||
				line === "stretch"
			) {
				buttonAlignment = line;
			}
		}
		// Get the check for disabling the previous button in the footer (if
		// provided using the line "<< DISABLE")
		else if (line.match(/^\s*<<\s*disable\s*$/i)) {
			disablePrevBtn = true;
		}
		// Get the POST check (if provided using the line ">> POST")
		else if (line.match(/^\s*>>\s*post\s*$/i)) {
			if (isForm && isFormSlide) {
				post = true;
			} else {
				console.warn(
					'[SLIDES] ">> POST" will only work for forms AND on slides with at least one form field.',
				);
			}
		}
		// Otherwise, add the raw line to the content
		else {
			content.push(rawLine);
		}
	}

	// Use Nunjucks to create the parsed template
	let parsedTemplate = "";
	nunjucks.configure({ autoescape: false });
	// For start slides, jump is ignored
	if (slideType === "start") {
		parsedTemplate = nunjucks.renderString(slideTemplate, {
			isForm: isForm,
			isFirstSlide: isFirstSlide,
			content: `\n<markdown>\n\n${content.join("\n").trim()}\n\n</markdown>\n`,
			isFormSlide: isFormSlide,
			jump: "",
			pageProgress: pageProgress,
			buttonAlignment: buttonAlignment,
			btnSettings: btnSettings,
			disablePrevBtn: disablePrevBtn,
			post: post,
			startBtn: startBtn,
			translations: {
				formSubmitBtn: getTranslation(localization, "form-submit-btn"),
				nextBtn: getTranslation(localization, "next-btn"),
			},
		});
	}
	// For body slides, start button is ignored
	else if (slideType === "body") {
		parsedTemplate = nunjucks.renderString(slideTemplate, {
			isForm: isForm,
			isFirstSlide: isFirstSlide,
			content: `\n<markdown>\n\n${content.join("\n").trim()}\n\n</markdown>\n`,
			isFormSlide: isFormSlide,
			jump: jump,
			pageProgress: pageProgress,
			buttonAlignment: buttonAlignment,
			btnSettings: btnSettings,
			disablePrevBtn: disablePrevBtn,
			post: post,
			startBtn: "",
			translations: {
				formSubmitBtn: getTranslation(localization, "form-submit-btn"),
				nextBtn: getTranslation(localization, "next-btn"),
			},
		});
	}
	// For end slides, we only need the content and redirect
	else if (slideType === "end") {
		parsedTemplate = nunjucks.renderString(endSlideTemplate, {
			content: `\n<markdown>\n\n${content.join("\n").trim()}\n\n</markdown>\n`,
			redirect: redirect,
			btnSettings: btnSettings,
			translations: {
				restartBtn: getTranslation(localization, "restart-btn"),
			},
		});
	}

	return {
		template: parsedTemplate,
		slideType: slideType,
	};
}

/**
 * Given a template string, parse the slides. Slides are created wherever the
 * slide delimiter is used. By default, this is set to "---" in the state.
 *
 * @param {string} template
 * @param {boolean} isForm
 * @param {{showRestartBtn: boolean, submitBtnText: string}} btnSettings
 * @param {string} localization
 * @param {string} slideDelimiter
 * @returns {string} template with parsed slides
 */
function parseSlides(
	template,
	isForm,
	btnSettings,
	localization,
	slideDelimiter,
) {
	const startSlides = [];
	const bodySlides = [];
	let containsEndSlide = false;
	let endSlide = "";

	// Go through each slide
	const templateSplit = template.split(slideDelimiter);
	for (let i = 0; i < templateSplit.length; i++) {
		const slide = templateSplit[i];
		const isFirstSlide = i === 0 ? true : false;
		const parsedSlide = parseSlide(
			slide,
			isForm,
			isFirstSlide,
			btnSettings,
			localization,
		);
		if (parsedSlide.slideType === "start") {
			startSlides.push(parsedSlide.template);
		} else if (parsedSlide.slideType === "body") {
			bodySlides.push(parsedSlide.template);
		} else if (parsedSlide.slideType === "end") {
			containsEndSlide = true;
			endSlide = parsedSlide.template;
		}
	}

	// Combine the start slides (if any) and body slides
	const slides = startSlides.concat(bodySlides);

	// End slide will always be present (only the last one is used)
	// If not overridden in the template, we use the default content
	if (!containsEndSlide) {
		nunjucks.configure({ autoescape: false });
		endSlide = nunjucks.renderString(endSlideTemplate, {
			content: isForm
				? [
						`<div class="fmd-text-center">`,
						`	<h1 class="fmd-h2 fmd-mb-2">${getTranslation(localization, "form-submitted-title")}</h1>`,
						`	<p class="fmd-fs-lead fmd-mb-1">${getTranslation(localization, "form-submitted-subtitle")}</p>`,
						`</div>\n`,
					].join("\n")
				: [
						`<div class="fmd-text-center">`,
						`	<h1 class="fmd-h2 fmd-mb-2">${getTranslation(localization, "end-slide-title")}</h1>`,
						`	<p class="fmd-fs-lead fmd-mb-1">${getTranslation(localization, "end-slide-subtitle")}</p>`,
						`</div>\n`,
					].join("\n"),
			redirect: "",
			btnSettings: btnSettings,
			translations: {
				restartBtn: getTranslation(localization, "restart-btn"),
			},
		});
	}
	slides.push(endSlide);

	return slides.join("\n");
}

exports.parseSlide = parseSlide;
exports.parseSlides = parseSlides;
