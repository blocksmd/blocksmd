export namespace blocksmd {
	export { init };
	export { options };
	export { setPreferredColorScheme };
	export { state };
}
/**
 * Initialize settings, set data defined in the template, fetch and set data
 * from remote source, and create the templates.
 *
 * @param {string} template
 * @param {{getHeaders: Object, postHeaders: Object, sanitize: boolean}} opts
 */
declare function init(
	template: string,
	opts: {
		getHeaders: any;
		postHeaders: any;
		sanitize: boolean;
	},
): void;
declare namespace options {
	let getHeaders: {};
	let postData: {};
	let postHeaders: {};
	let prioritizeURLFormData: boolean;
	let sanitize: boolean;
}
/**
 * Set the preferred color scheme (if one is found in the local storage).
 * Depending on the preference from settings, either the domain-wide or the
 * page-specific value is used.
 */
declare function setPreferredColorScheme(): void;
declare namespace state {
	let bindDivTemplates: {};
	let data: {};
	let fieldTypes: {};
	let formData: {};
	let settings: any;
	namespace slideData {
		let currentIndex: number;
	}
}
export {};
