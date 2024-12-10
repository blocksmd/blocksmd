"use strict";

const { parseBindSpans } = require("../src/div-span-parse");

// Case 1

const template1 = `
# Heading

Hello {$ name $}!
`;
const expectedTemplate1 = `
# Heading

Hello <span data-fmd-bind-name>{{ name }}</span>!
`;

test("Case 1", () => {
	expect(parseBindSpans(template1)).toBe(expectedTemplate1);
});

// Case 2 (multiple binds and weird formatting)

const template2 = `
# Hello, I'm {$ name $}

I'm {$age$} years old.

> {$   quote  $}
`;
const expectedTemplate2 = `
# Hello, I'm <span data-fmd-bind-name>{{ name }}</span>

I'm <span data-fmd-bind-age>{{ age }}</span> years old.

> <span data-fmd-bind-quote>{{ quote }}</span>
`;

test("Case 2 (multiple binds and weird formatting)", () => {
	expect(parseBindSpans(template2)).toBe(expectedTemplate2);
});

// Case 3 (invalid variable names)

const template3 = `
# Heading

Paragraph {$ word $}

Paragraph {$ random   word  $}{$ 123 $} {$ x y z $}
`;
const expectedTemplate3 = `
# Heading

Paragraph <span data-fmd-bind-word>{{ word }}</span>

Paragraph {$ random   word  $}{$ 123 $} {$ x y z $}
`;

test("Case 3 (invalid variable names)", () => {
	expect(parseBindSpans(template3)).toBe(expectedTemplate3);
});

// Case 4 (no <span> elements)

const template4 = `
# Heading

This is a paragraph.

> Blockquote
`;
const expectedTemplate4 = `
# Heading

This is a paragraph.

> Blockquote
`;

test("Case 4 (no <span> elements)", () => {
	expect(parseBindSpans(template4)).toBe(expectedTemplate4);
});

// Case 5 (empty string)

const template5 = "";
const expectedTemplate5 = "";

test("Case 5 (empty string)", () => {
	expect(parseBindSpans(template5)).toBe(expectedTemplate5);
});
