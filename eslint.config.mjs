import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		files: ["**/*.js"],
		rules: {
			"dot-notation": "error",
			"curly": "error",
		},
		languageOptions: {
			sourceType: "commonjs",
			globals: { ...globals.browser, ...globals.node },
		},
	},
];
