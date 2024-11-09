"use strict";

const { isNumeric } = require("./helpers");

/**
 * Given a row string, split it by the given delimiter (unless the delimiter
 * is inside double quotes).
 *
 * @param {string} row
 * @param {string} delimiter
 * @returns {string[]}
 */
function splitRow(row, delimiter) {
	const result = [];
	let currentChunk = "";
	let insideQuotes = false;

	for (let i = 0; i < row.length; i++) {
		const char = row[i];
		if (char === '"') {
			insideQuotes = !insideQuotes;
		} else if (char === delimiter && !insideQuotes) {
			result.push(currentChunk.trim());
			currentChunk = "";
		} else {
			currentChunk += char;
		}
	}

	result.push(currentChunk.trim());

	return result;
}

/**
 * Given a number, convert it to the equivalent spreadsheet column reference.
 * For example, 0 would return "A", 7 would return "H", 26 would return "AA",
 * etc.
 *
 * @param {number} num
 * @returns {string}
 */
function getSpreadsheetColRef(num) {
	const quotient = Math.floor(num / 26);
	const remainder = num % 26;
	const letter = String.fromCharCode(65 + remainder);
	if (quotient > 0) {
		return getSpreadsheetColRef(quotient - 1) + letter;
	} else {
		return letter;
	}
}

/**
 * Parse data fetched from a spreadsheet.
 *
 * @param {string} data
 * @param {string} delimiter
 * @returns {{dataSpreadsheet: Object, dataNormalized: Object[]}}
 */
function parseSpreadsheetData(data, delimiter) {
	const dataSpreadsheet = {};
	const dataNormalized = [];
	const rows = data.split("\n");
	const columnNames = splitRow(rows[0], delimiter);

	// Go through each row
	for (let i = 0; i < rows.length; i++) {
		const rowNormalized = {};
		const cells = splitRow(rows[i], delimiter);

		// Go through each cell
		for (let j = 0; j < cells.length; j++) {
			let cell = cells[j].trim();

			// Convert cell value to number or boolean where possible
			if (isNumeric(cell)) {
				cell = Number(cell);
			} else if (cell.toLowerCase() === "true") {
				cell = true;
			} else if (cell.toLowerCase() === "false") {
				cell = false;
			}

			// Add cell data
			let spreadsheetCellRef = getSpreadsheetColRef(j) + String(i + 1);
			dataSpreadsheet[spreadsheetCellRef] = cell;
			rowNormalized[columnNames[j]] = cell;
		}

		// Push normalized row (ignore first row as those are column names here)
		if (i > 0) {
			dataNormalized.push(rowNormalized);
		}
	}

	return {
		dataSpreadsheet: dataSpreadsheet,
		dataNormalized: dataNormalized,
	};
}

exports.parseSpreadsheetData = parseSpreadsheetData;
