const scriptProp = PropertiesService.getScriptProperties();

function intialSetup() {
	const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
	scriptProp.setProperty("key", activeSpreadsheet.getId());
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

function doPost(e) {
	const lock = LockService.getScriptLock();
	lock.tryLock(10000);

	try {
		// Parse the data from the request
		const data = JSON.parse(e.postData.contents);

		// Get the sheet using the name
		// If the sheet name is not provided, get the first sheet of the document
		const doc = SpreadsheetApp.openById(scriptProp.getProperty("key"));
		const sheet = doc.getSheetByName(data["_sheetName"]) || doc.getSheets()[0];

		// Set up the column references
		// This contains the column numbers for the headers (first row)
		const colRefs = {};
		const firstRow = sheet
			.getRange(1, 1, 1, sheet.getLastColumn())
			.getValues()[0];
		for (let i = 0; i < firstRow.length; i++) {
			const colName = firstRow[i];
			colRefs[colName] = i + 1;
		}

		// Get the row number to insert the request data
		// By default, this is the last row
		// If the incoming request has an "_rid" that matches an existing row,
		// then that row is used for the insert
		let rowToInsert = sheet.getLastRow() + 1;
		const _ridCol = colRefs["_rid"] || false;
		if (_ridCol) {
			const _ridColLetter = getSpreadsheetColRef(_ridCol - 1);
			const _ridValues = sheet
				.getRange(`${_ridColLetter}:${_ridColLetter}`)
				.getValues();
			for (let i = 0; i < _ridValues.length; i++) {
				if (data["_rid"] === String(_ridValues[i])) {
					rowToInsert = i + 1;
				}
			}
		}

		// Insert
		// Make sure to remove all formulae (starts with "=")
		for (let [key, value] of Object.entries(data)) {
			const colRef = colRefs[key] || false;
			if (colRef) {
				if (typeof value === "string") {
					value = value.trim();
					if (value.startsWith("=")) value = `[${value}]`;
				} else if (Array.isArray(value)) {
					value = value.join(", ");
				}
				sheet.getRange(rowToInsert, colRef).setValue(value);
			}
		}

		// Return ok
		return ContentService.createTextOutput(
			JSON.stringify({ ok: true }),
		).setMimeType(ContentService.MimeType.JSON);
	} catch (e) {
		// Return not ok
		return ContentService.createTextOutput(
			JSON.stringify({ ok: false }),
		).setMimeType(ContentService.MimeType.JSON);
	} finally {
		lock.releaseLock();
	}
}
