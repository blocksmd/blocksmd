/**
 * Parse data fetched from a spreadsheet.
 *
 * @param {string} data
 * @param {string} delimiter
 * @returns {{dataSpreadsheet: Object, dataNormalized: Object[]}}
 */
export function parseSpreadsheetData(
	data: string,
	delimiter: string,
): {
	dataSpreadsheet: any;
	dataNormalized: any[];
};
