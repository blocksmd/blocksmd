"use strict";

const { addReservedClass } = require("./attrs-parse");
const { parseDivs, parseBindSpans } = require("./div-span-parse");
const { renderer } = require("./marked-renderer");
const { parseSlides } = require("./slides-parse");
const { getTranslation } = require("./translations");
const createDOMPurify = require("dompurify");
const { marked } = require("marked");
var nunjucks = require("nunjucks");

/**
 * Create the CSS styles using the settings.
 *
 * @param {Object} settings
 * @returns {string} the contents of the stylesheet
 */
function createStyles(settings) {
	const styleBlocks = [];

	// Add the font import URL
	if (settings["font-import-url"] !== undefined) {
		styleBlocks.push(`@import url("${settings["font-import-url"]}");`);
	}

	// Set up the base styles
	const colorScheme = settings["color-scheme"] === "light" ? "lm" : "dm";
	const altColorScheme = settings["color-scheme"] === "light" ? "dm" : "lm";
	const baseStyles = [];
	if (settings["font-family"] !== undefined) {
		baseStyles.push(`--fmd-body-font-family: ${settings["font-family"]};`);
	}
	if (settings["backdrop-opacity"] !== undefined) {
		baseStyles.push(
			`--fmd-backdrop-opacity-${colorScheme}: ${settings["backdrop-opacity"]};`,
		);
	}
	if (settings["backdrop-opacity-alt-scheme"] !== undefined) {
		baseStyles.push(
			`--fmd-backdrop-opacity-${altColorScheme}: ${settings["backdrop-opacity-alt-scheme"]};`,
		);
	}
	if (settings["background-image"] !== undefined) {
		baseStyles.push(
			`--fmd-body-bg-img-${colorScheme}: ${settings["background-image"]};`,
		);
	}
	if (settings["background-image-alt-scheme"] !== undefined) {
		baseStyles.push(
			`--fmd-body-bg-img-${altColorScheme}: ${settings["background-image-alt-scheme"]};`,
		);
	}

	// Set up the color styles
	const colorStyles = [];
	const colorStylesAltScheme = [];
	const colorVariablesPrefixMap = {
		"accent": "--fmd-accent-",
		"accent-alt-scheme": "--fmd-accent-",
		"accent-foreground": "--fmd-accent-foreground-",
		"accent-foreground-alt-scheme": "--fmd-accent-foreground-",
		"background-color": "--fmd-body-bg-",
		"background-color-alt-scheme": "--fmd-body-bg-",
		"color": "--fmd-body-color-",
		"color-alt-scheme": "--fmd-body-color-",
	};
	for (const [key, value] of Object.entries(settings)) {
		if (colorVariablesPrefixMap[key] !== undefined) {
			// Split the value into the individual RGB parts
			const rgbValues = value.split(",").map(function (item) {
				return item.trim();
			});

			// Add the variables (depending on color scheme)
			const variablePrefix = colorVariablesPrefixMap[key];
			if (!key.endsWith("-alt-scheme")) {
				colorStyles.push(`${variablePrefix}r: ${rgbValues[0]};`);
				colorStyles.push(`${variablePrefix}g: ${rgbValues[1]};`);
				colorStyles.push(`${variablePrefix}b: ${rgbValues[2]};`);
			} else {
				colorStylesAltScheme.push(`${variablePrefix}r: ${rgbValues[0]};`);
				colorStylesAltScheme.push(`${variablePrefix}g: ${rgbValues[1]};`);
				colorStylesAltScheme.push(`${variablePrefix}b: ${rgbValues[2]};`);
			}
		}
	}

	// Create the selector using the id
	const selector =
		settings.id !== ""
			? `.fmd-root[data-fmd-id="${settings.id}"]`
			: ".fmd-root";

	// Add the base styles block
	if (baseStyles.length > 0) {
		styleBlocks.push(`${selector} {${baseStyles.join("")}}`);
	}

	// Add the color styles block (default color scheme)
	if (colorStyles.length > 0) {
		if (settings["color-scheme"] === "light") {
			styleBlocks.push(`${selector} {${colorStyles.join("")}}`);
		} else {
			styleBlocks.push(
				`${selector}[data-fmd-color-scheme="dark"] {${colorStyles.join("")}}`,
			);
		}
	}

	// Add the color styles block (alternative color scheme)
	if (colorStylesAltScheme.length > 0) {
		if (settings["color-scheme"] === "light") {
			styleBlocks.push(
				`${selector}[data-fmd-color-scheme="dark"] {${colorStylesAltScheme.join("")}}`,
			);
		} else {
			styleBlocks.push(`${selector} {${colorStylesAltScheme.join("")}\n}`);
		}
	}

	return styleBlocks.join("\n");
}

const madeInLoaderTemplate = `
<div class="fmd-backdrop"></div>

<div class="fmd-main">
	<div class="fmd-main-container">
		<div class="fmd-loader-container">
			<div class="fmd-text-center fmd-mb-3">
				{% if settings["formsmd-branding"] != "hide" %}
				{{ translations.madeInLoader | safe }}
				{% else %}
				<div class="fmd-specific-fs-20 fmd-text-emphasis fmd-fw-bold">{{ translations.loading }}...</div>
				{% endif %}
			</div>
			<div class="fmd-loader-progress" role="status" aria-label="{{ translations.loading }}"></div>
		</div>
	</div>
</div>
`;

const bodyTemplate = `
<div class="fmd-backdrop"></div>

{% if settings["page-progress"] != "hide" %}
<div class="fmd-page-progress">
	<div class="fmd-progress">
		<div class="fmd-progress-bar" style="width: 0%"></div>
	</div>
</div>
{% endif %}

{% if settings["header-render"] %}
<div class="fmd-header">
	<div class="fmd-header-container">
		{% if settings.brand != undefined %}
		{{ settings.brand | safe }}
		{% if settings["brand-alt-scheme"] != undefined %}
		{{ settings["brand-alt-scheme"] | safe }}
		{% endif %}
		{% endif %}
		{% if settings.cta != undefined %}
		{{ settings.cta | safe }}
		{% endif %}
	</div>
</div>
{% endif %}

<div class="fmd-main">
	<div class="fmd-main-container">
		<div class="fmd-loader-container">
			<div class="fmd-text-center fmd-mb-3">
				{% if settings["formsmd-branding"] != "hide" %}
				{{ translations.madeInLoader | safe }}
				{% else %}
				<div class="fmd-specific-fs-20 fmd-text-emphasis fmd-fw-bold">{{ translations.loading }}...</div>
				{% endif %}
			</div>
			<div class="fmd-loader-progress" role="status" aria-label="{{ translations.loading }}"></div>
		</div>
	</div>
</div>

{% if settings["footer-render"] %}
<div class="fmd-footer">
	<div class="fmd-footer-inner">
		{% if settings["color-scheme-toggle"] == "show" %}
		<button type="button" class="fmd-toggle-color-scheme-btn fmd-btn fmd-btn-accent fmd-btn-control fmd-btn-control-square fmd-d-flex fmd-align-items-center fmd-justify-content-center" aria-label="{{ translations.toggleColorSchemeBtn }}">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fmd-icon" aria-hidden="true" focusable="false"><path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" /></svg>
		</button>
		{% endif %}
		{% if settings["slide-controls"] != "hide" and settings.page != "single" %}
		<div class="fmd-btn-group" role="group">
			<button type="button" class="fmd-previous-btn fmd-btn fmd-btn-accent fmd-btn-control fmd-btn-control-square fmd-d-flex fmd-align-items-center fmd-justify-content-center" aria-label="{{ translations.previousBtn }}" disabled>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>
			</button>
			<div class="fmd-btn-group-vr"><div class="fmd-btn-group-vr-inner"></div></div>
			<button type="button" class="fmd-next-btn fmd-btn fmd-btn-accent fmd-btn-control fmd-btn-control-square fmd-d-flex fmd-align-items-center fmd-justify-content-center" aria-label="{{ translations.nextBtn }}">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
			</button>
		</div>
		{% endif %}
		{% if settings["formsmd-branding"] != "hide" %}
		<a href="https://forms.md" target="_blank" class="fmd-btn fmd-btn-accent fmd-btn-control">
			{{ translations.madeInBtn | safe }}
		</a>
		{% endif %}
	</div>
</div>
{% endif %}
`;

/**
 * Create the body template.
 *
 * @param {Object} settings
 * @returns {{template: string, settings: Object}} the template and the
 * updated settings
 */
function createBodyTemplate(settings) {
	marked.use({
		renderer: renderer,
		markedSettings: {
			"css-prefix": settings["css-prefix"],
			"form-delimiter": settings["form-delimiter"],
			"id": settings.id,
			"localization": settings.localization,
		},
	});

	// Parse the brand (if provided)
	// The class for hiding depending on the color scheme is only added if the
	// alternate color scheme brand is also provided
	if (settings.brand !== undefined) {
		let brand = marked.parseInline(settings.brand);
		brand = addReservedClass(brand, "fmd-header-brand");
		if (settings["brand-alt-scheme"] !== undefined) {
			brand =
				settings["color-scheme"] === "light"
					? addReservedClass(brand, "fmd-hide-dm")
					: addReservedClass(brand, "fmd-hide-lm");
		}
		settings.brand = brand;

		// Parse the brand for the alternate color scheme (if provided)
		if (settings["brand-alt-scheme"] !== undefined) {
			let brandAltScheme = marked.parseInline(settings["brand-alt-scheme"]);
			brandAltScheme = addReservedClass(brandAltScheme, "fmd-header-brand");
			brandAltScheme =
				settings["color-scheme"] === "light"
					? addReservedClass(brandAltScheme, "fmd-hide-lm")
					: addReservedClass(brandAltScheme, "fmd-hide-dm");
			settings["brand-alt-scheme"] = brandAltScheme;
		}
	}

	// Parse the CTA (if provided)
	if (settings.cta !== undefined) {
		let cta = marked.parseInline(settings.cta);
		cta = addReservedClass(cta, "fmd-btn");
		cta = addReservedClass(cta, "fmd-btn-accent");
		cta = addReservedClass(cta, "fmd-btn-control");
		cta = addReservedClass(cta, "fmd-ms-auto");
		settings.cta = cta;
	}

	// Set the condition for rendering the header
	settings["header-render"] =
		settings.header !== "hide" &&
		(settings.brand !== undefined || settings.cta !== undefined);

	// Set the condition for rendering the footer
	settings["footer-render"] =
		settings.footer !== "hide" &&
		(settings["color-scheme-toggle"] === "show" ||
			(settings["slide-controls"] !== "hide" && settings.page !== "single") ||
			settings["formsmd-branding"] !== "hide");

	// Render the template using Nunjucks
	const localization = settings.localization;
	nunjucks.configure({ autoescape: false });
	const template = nunjucks.renderString(bodyTemplate, {
		settings: settings,
		translations: {
			loading: getTranslation(localization, "loading"),
			madeInBtn: getTranslation(localization, "made-in-btn"),
			madeInLoader: getTranslation(localization, "made-in-loader"),
			nextBtn: getTranslation(localization, "next-btn"),
			previousBtn: getTranslation(localization, "previous-btn"),
			toggleColorSchemeBtn: getTranslation(
				localization,
				"toggle-color-scheme-btn",
			),
		},
	});

	return {
		template: template,
		settings: settings,
	};
}

/**
 * Create the content template.
 *
 * @param {string} template
 * @param {Object} settings
 * @param {Object} data
 * @param {boolean} windowAndSanitize
 * @returns {{template: string, bindDivTemplates: Object}} template and bind
 * <div> templates
 */
function createContentTemplate(template, settings, data, windowAndSanitize) {
	// Parse <div> elements
	const parsedTemplateWithDivs = parseDivs(template, settings["css-prefix"]);
	template = parsedTemplateWithDivs.template;
	const bindDivTemplates = parsedTemplateWithDivs.bindDivTemplates;

	// Parse bind <span> elements
	template = parseBindSpans(template);

	// Parse slides
	if (settings.page !== "single") {
		template = parseSlides(
			template,
			settings.page === "form-slides" ? true : false,
			{
				showRestartBtn: settings["restart-button"] === "show" ? true : false,
				submitBtnText:
					settings["submit-button-text"] !== undefined
						? settings["submit-button-text"]
						: "",
			},
			settings.localization,
			settings["slide-delimiter"],
		);
	} else {
		template = [
			`<div class="fmd-single">`,
			`	<div class="fmd-grid">`,
			`		<markdown>`,
			`		${template}`,
			`		</markdown>`,
			`	</div>`,
			`</div>`,
		].join("\n");
	}

	// Render the template using Nunjucks
	nunjucks.configure({ autoescape: false });
	template = nunjucks.renderString(template, data);

	// Parse the <markdown>...</markdown> sections using Marked
	marked.use({
		renderer: renderer,
		markedSettings: {
			"css-prefix": settings["css-prefix"],
			"form-delimiter": settings["form-delimiter"],
			"id": settings.id,
			"localization": settings.localization,
		},
	});
	template = template.replace(
		/<markdown>(.*?)<\/markdown>/gs,
		function (match, content) {
			if (windowAndSanitize) {
				const DOMPurify = createDOMPurify(window);
				return DOMPurify.sanitize(marked.parse(content));
			} else {
				return marked.parse(content);
			}
		},
	);

	return {
		template: template,
		bindDivTemplates: bindDivTemplates,
	};
}

exports.createStyles = createStyles;
exports.madeInLoaderTemplate = madeInLoaderTemplate;
exports.createBodyTemplate = createBodyTemplate;
exports.createContentTemplate = createContentTemplate;
