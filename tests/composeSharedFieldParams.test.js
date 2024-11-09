"use strict";

const { composeSharedFieldParams } = require("../src/composer");

// Case 1

test("Case 1", () => {
	expect(
		composeSharedFieldParams(
			{
				question: "question",
				description: "description",
				fieldSize: "sm",
				labelStyle: "classic",
				subfield: true,
				disabled: true,
				autofocus: true,
			},
			"| ",
		),
	).toMatchObject([
		"\t| question = question",
		"\t| description = description",
		"\t| fieldSize = sm",
		"\t| labelStyle = classic",
		"\t| subfield",
		"\t| disabled",
		"\t| autofocus",
	]);
});

// Case 2

test("Case 2", () => {
	expect(
		composeSharedFieldParams(
			{
				question: "question",
				description: "description",
				fieldSize: "lg",
				labelStyle: "classic",
			},
			"| ",
		),
	).toMatchObject([
		"\t| question = question",
		"\t| description = description",
		"\t| labelStyle = classic",
	]);
});

// Case 3 (different form delimiter)

test("Case 3 (different form delimiter)", () => {
	expect(
		composeSharedFieldParams(
			{
				question: "question",
				description: "description",
				fieldSize: "sm",
				labelStyle: "classic",
				subfield: true,
				disabled: true,
				autofocus: true,
			},
			"",
		),
	).toMatchObject([
		"\tquestion = question",
		"\tdescription = description",
		"\tfieldSize = sm",
		"\tlabelStyle = classic",
		"\tsubfield",
		"\tdisabled",
		"\tautofocus",
	]);
});

// Case 4 (no optional params)

test("Case 4 (no optional params)", () => {
	expect(
		composeSharedFieldParams(
			{
				question: "question",
			},
			"| ",
		),
	).toMatchObject(["\t| question = question"]);
});
