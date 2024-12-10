var path = require("path");

module.exports = {
	mode: "production",
	entry: {
		formsmd: "./src/main.js",
		composer: "./src/composer.js",
	},
	output: {
		filename: "[name].bundle.min.js",
		path: path.resolve(__dirname, "dist/js"),
		libraryTarget: "window",
	},
	optimization: { minimize: true },
};
