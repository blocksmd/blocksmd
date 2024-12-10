"use strict";

const { parseDivs } = require("../src/div-span-parse");

// Case 1

const template1 = `
:::
# Heading

Hello {{ name }}!
:::
`;
const expectedTemplate1 = `

<div class="fmd-grid">

# Heading

Hello {{ name }}!

</div>

`;
const expectedBindDivTemplates1 = {};

test("Case 1", () => {
	const result1 = parseDivs(template1, "fmd-");
	expect(result1.template).toBe(expectedTemplate1);
	expect(result1.bindDivTemplates).toMatchObject(expectedBindDivTemplates1);
});

// Case 2 (multiple <div> elements and attributes)

const template2 = `
::: [.col-4]
# Heading

Hello {{ name }}!
:::

:::
[#some-id .col-4 .xs:col-6 aria-label="Label" data-title="Some title"]
> Just a blockquote
:::
`;
const expectedTemplate2 = `

<div class="fmd-col-4 fmd-grid">

# Heading

Hello {{ name }}!

</div>



<div id="some-id" class="fmd-col-4 fmd-xs:col-6 fmd-grid" aria-label="Label" data-title="Some title">

> Just a blockquote

</div>

`;
const expectedBindDivTemplates2 = {};

test("Case 2 (multiple <div> elements and attributes)", () => {
	const result2 = parseDivs(template2, "fmd-");
	expect(result2.template).toBe(expectedTemplate2);
	expect(result2.bindDivTemplates).toMatchObject(expectedBindDivTemplates2);
});

// Case 3 (bind and one-line)

const template3 = `
::: [.col-4 {$ name age $}]
# Heading

Hello {{ name }}!
:::

::: Word :::

:::
[#some-id .col-4 .xs:col-6 aria-label="Label" data-title="Some title" {$profession  skills   email   $}]
> Just a blockquote
:::
`;
const expectedTemplate3 = `

<div class="fmd-col-4 fmd-grid" data-fmd-bind-name data-fmd-bind-age data-fmd-bind-template-ref="0">

# Heading

Hello {{ name }}!

</div>



<div class="fmd-grid">

Word

</div>



<div id="some-id" class="fmd-col-4 fmd-xs:col-6 fmd-grid" aria-label="Label" data-title="Some title" data-fmd-bind-profession data-fmd-bind-skills data-fmd-bind-email data-fmd-bind-template-ref="1">

> Just a blockquote

</div>

`;
const expectedBindDivTemplates3 = {
	0: "\n\n# Heading\n\nHello {{ name }}!\n\n",
	1: "\n\n> Just a blockquote\n\n",
};

test("Case 3 (bind and one-line)", () => {
	const result3 = parseDivs(template3, "fmd-");
	expect(result3.template).toBe(expectedTemplate3);
	expect(result3.bindDivTemplates).toMatchObject(expectedBindDivTemplates3);
});

// Case 4 (odd marker)

const template4 = `
::: Word :::

:::
# Heading

Hello {{ name }}!
:::

:::
`;
const expectedTemplate4 = `

<div class="fmd-grid">

Word

</div>



<div class="fmd-grid">

# Heading

Hello {{ name }}!

</div>


:::
`;
const expectedBindDivTemplates4 = {};

test("Case 4 (odd marker)", () => {
	const result4 = parseDivs(template4, "fmd-");
	expect(result4.template).toBe(expectedTemplate4);
	expect(result4.bindDivTemplates).toMatchObject(expectedBindDivTemplates4);
});

// Case 5 (no <div> elements)

const template5 = `
# Heading

This is a paragraph.

> Blockquote
`;
const expectedTemplate5 = `
# Heading

This is a paragraph.

> Blockquote
`;
const expectedBindDivTemplates5 = {};

test("Case 5 (no <div> elements)", () => {
	const result5 = parseDivs(template5, "fmd-");
	expect(result5.template).toBe(expectedTemplate5);
	expect(result5.bindDivTemplates).toMatchObject(expectedBindDivTemplates5);
});

// Case 6 (empty string)

const template6 = "";
const expectedTemplate6 = "";
const expectedBindDivTemplates6 = {};

test("Case 6 (empty string)", () => {
	const result6 = parseDivs(template6, "fmd-");
	expect(result6.template).toBe(expectedTemplate6);
	expect(result6.bindDivTemplates).toMatchObject(expectedBindDivTemplates6);
});
