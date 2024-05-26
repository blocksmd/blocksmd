("use strict");

const { parseElemAttrs } = require("../src/attrs-parse");

test("Case 1", () => {
	expect(
		parseElemAttrs(
			'#some-id .col-4 .xs:col-6 aria-label="Label" data-title="Some title"',
			"bmd-",
		),
	).toBe(
		'id="some-id" class="bmd-col-4 bmd-xs:col-6" aria-label="Label" data-title="Some title"',
	);
});

test("Case 2 (single quotes)", () => {
	expect(
		parseElemAttrs(
			"#some-id .col-4 .xs:col-6 aria-label='Label' data-title='Some title'",
			"bmd-",
		),
	).toBe(
		'id="some-id" class="bmd-col-4 bmd-xs:col-6" aria-label="Label" data-title="Some title"',
	);
});

test("Case 3 (weird formatting and mix-and-match)", () => {
	expect(
		parseElemAttrs(
			`		#some-id 		.col-4 	.xs:col-6 	aria-label="Label" 	  data-title=' Some  title '	 .col-8  `,
			"bmd-",
		),
	).toBe(
		'id="some-id" class="bmd-col-4 bmd-xs:col-6 bmd-col-8" aria-label="Label" data-title=" Some title "',
	);
});

test("Case 4 (double id)", () => {
	expect(parseElemAttrs("#some-id-1 .col-4 #some-id-2", "bmd-")).toBe(
		'id="some-id-2" class="bmd-col-4"',
	);
});

test("Case 5 (no CSS prefix and many attributes)", () => {
	expect(
		parseElemAttrs(
			'.bold  .text-accent  .col-4  .xs:col-10   data-toggle="dialog" 	aria-label="A longer label" #some-other-id  ',
			"",
		),
	).toBe(
		'id="some-other-id" class="bold text-accent col-4 xs:col-10" data-toggle="dialog" aria-label="A longer label"',
	);
});

test("Case 6 (empty)", () => {
	expect(parseElemAttrs("", "bmd-")).toBe("");
});

test("Case 7 (only white-space)", () => {
	expect(parseElemAttrs("     ", "bmd-")).toBe("");
});
