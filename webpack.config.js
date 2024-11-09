var path = require("path");

module.exports = {
	mode: "production",
	entry: "./src/main.js",
	output: {
		filename: "blocksmd.bundle.min.js",
		path: path.resolve(__dirname, "dist/js"),
		libraryTarget: "window",
	},
	optimization: { minimize: true },
};
