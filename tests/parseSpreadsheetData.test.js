"use strict";

const { parseSpreadsheetData } = require("../src/spreadsheet-data-parse");

// Data downloaded from https://docs.google.com/spreadsheets/d/1KUJYtku4vzbYLuuKAL_w-EBtU1MX_SsWcHKr0YM2RvQ/

// Case 1 (CSV data)

const data1 = `date,name,number,numberTimesTwo,check
2021-10-1,John,1.00,2,FALSE
2021-10-2,হামদান,2.00,4,TRUE
2021-10-3,Sam,3.00,6,FALSE
2021-10-4,Kathy,,0,TRUE
2021-10-5,"Arnold, Terminator",5.00,10,FALSE
2021-10-6,Sarah,6.00,12,TRUE
,Jamie,7.50,,`;
const expectedData1 = {
	dataSpreadsheet: {
		A1: "date",
		B1: "name",
		C1: "number",
		D1: "numberTimesTwo",
		E1: "check",
		A2: "2021-10-1",
		B2: "John",
		C2: 1,
		D2: 2,
		E2: false,
		A3: "2021-10-2",
		B3: "হামদান",
		C3: 2,
		D3: 4,
		E3: true,
		A4: "2021-10-3",
		B4: "Sam",
		C4: 3,
		D4: 6,
		E4: false,
		A5: "2021-10-4",
		B5: "Kathy",
		C5: "",
		D5: 0,
		E5: true,
		A6: "2021-10-5",
		B6: "Arnold, Terminator",
		C6: 5,
		D6: 10,
		E6: false,
		A7: "2021-10-6",
		B7: "Sarah",
		C7: 6,
		D7: 12,
		E7: true,
		A8: "",
		B8: "Jamie",
		C8: 7.5,
		D8: "",
		E8: "",
	},
	dataNormalized: [
		{
			date: "2021-10-1",
			name: "John",
			number: 1,
			numberTimesTwo: 2,
			check: false,
		},
		{
			date: "2021-10-2",
			name: "হামদান",
			number: 2,
			numberTimesTwo: 4,
			check: true,
		},
		{
			date: "2021-10-3",
			name: "Sam",
			number: 3,
			numberTimesTwo: 6,
			check: false,
		},
		{
			date: "2021-10-4",
			name: "Kathy",
			number: "",
			numberTimesTwo: 0,
			check: true,
		},
		{
			date: "2021-10-5",
			name: "Arnold, Terminator",
			number: 5,
			numberTimesTwo: 10,
			check: false,
		},
		{
			date: "2021-10-6",
			name: "Sarah",
			number: 6,
			numberTimesTwo: 12,
			check: true,
		},
		{
			date: "",
			name: "Jamie",
			number: 7.5,
			numberTimesTwo: "",
			check: "",
		},
	],
};

test("Case 1 (CSV data)", () => {
	expect(parseSpreadsheetData(data1, ",")).toMatchObject(expectedData1);
});

// Case 2 (TSV data)

const data2 = `date	name	number	numberTimesTwo	check
2021-10-1	John	1.00	2	FALSE
2021-10-2	হামদান	2.00	4	TRUE
2021-10-3	Sam	3.00	6	FALSE
2021-10-4	Kathy		0	TRUE
2021-10-5	Arnold, Terminator	5.00	10	FALSE
2021-10-6	Sarah	6.00	12	TRUE
	Jamie	7.50		`;
const expectedData2 = {
	dataSpreadsheet: {
		A1: "date",
		B1: "name",
		C1: "number",
		D1: "numberTimesTwo",
		E1: "check",
		A2: "2021-10-1",
		B2: "John",
		C2: 1,
		D2: 2,
		E2: false,
		A3: "2021-10-2",
		B3: "হামদান",
		C3: 2,
		D3: 4,
		E3: true,
		A4: "2021-10-3",
		B4: "Sam",
		C4: 3,
		D4: 6,
		E4: false,
		A5: "2021-10-4",
		B5: "Kathy",
		C5: "",
		D5: 0,
		E5: true,
		A6: "2021-10-5",
		B6: "Arnold, Terminator",
		C6: 5,
		D6: 10,
		E6: false,
		A7: "2021-10-6",
		B7: "Sarah",
		C7: 6,
		D7: 12,
		E7: true,
		A8: "",
		B8: "Jamie",
		C8: 7.5,
		D8: "",
		E8: "",
	},
	dataNormalized: [
		{
			date: "2021-10-1",
			name: "John",
			number: 1,
			numberTimesTwo: 2,
			check: false,
		},
		{
			date: "2021-10-2",
			name: "হামদান",
			number: 2,
			numberTimesTwo: 4,
			check: true,
		},
		{
			date: "2021-10-3",
			name: "Sam",
			number: 3,
			numberTimesTwo: 6,
			check: false,
		},
		{
			date: "2021-10-4",
			name: "Kathy",
			number: "",
			numberTimesTwo: 0,
			check: true,
		},
		{
			date: "2021-10-5",
			name: "Arnold, Terminator",
			number: 5,
			numberTimesTwo: 10,
			check: false,
		},
		{
			date: "2021-10-6",
			name: "Sarah",
			number: 6,
			numberTimesTwo: 12,
			check: true,
		},
		{
			date: "",
			name: "Jamie",
			number: 7.5,
			numberTimesTwo: "",
			check: "",
		},
	],
};

test("Case 2 (TSV data)", () => {
	expect(parseSpreadsheetData(data2, "\t")).toMatchObject(expectedData2);
});
