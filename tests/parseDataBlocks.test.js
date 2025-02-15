"use strict";

const { parseDataBlocks } = require("../src/data-blocks-parse");

// Case 1

const template1 = `
\`\`\`data
{
	"name": "John Doe",
	"age": 23
}
\`\`\`

# Heading

This is a paragraph.
`;
const expectedTemplate1 = `


# Heading

This is a paragraph.
`;
const expectedData1 = {
	name: "John Doe",
	age: 23,
};

test("Case 1", () => {
	const result1 = parseDataBlocks(template1);
	expect(result1.template).toBe(expectedTemplate1);
	expect(result1.data).toMatchObject(expectedData1);
});

// Case 2 (multiple data-blocks, weird formatting and case)

const template2 = `
\`\`\` data  
{
	"name": "John Doe",
	"age": 23
}
\`\`\`

# Heading

This is a paragraph.

\`\`\` 		DATA  
{
	"age": 42,
	"profession": "Software Engineer"
}
\`\`\`

> Blockquote.

\`\`\`dATa
{
	"country": "USA"
}
\`\`\`
`;
const expectedTemplate2 = `


# Heading

This is a paragraph.



> Blockquote.


`;
const expectedData2 = {
	name: "John Doe",
	age: 42,
	profession: "Software Engineer",
	country: "USA",
};

test("Case 2 (multiple data-blocks, weird formatting and case)", () => {
	const result2 = parseDataBlocks(template2);
	expect(result2.template).toBe(expectedTemplate2);
	expect(result2.data).toMatchObject(expectedData2);
});

// Case 3 (using tildes)

const template3 = `
~~~data
{
	"name": "John Doe",
	"age": 23
}
~~~

# Heading

This is a paragraph.
`;
const expectedTemplate3 = `


# Heading

This is a paragraph.
`;
const expectedData3 = {
	name: "John Doe",
	age: 23,
};

test("Case 3 (using tildes)", () => {
	const result3 = parseDataBlocks(template3);
	expect(result3.template).toBe(expectedTemplate3);
	expect(result3.data).toMatchObject(expectedData3);
});

// Case 4 (mix and match)

const template4 = `
\`\`\` data  
{
	"name": "John Doe",
	"age": 23
}
\`\`\`

# Heading

This is a paragraph.

~~~ 		data  
{
	"age": 42,
	"profession": "Software Engineer"
}
~~~

> Blockquote.

~~~data
{
	"country": "USA"
}
~~~
`;
const expectedTemplate4 = `


# Heading

This is a paragraph.



> Blockquote.


`;
const expectedData4 = {
	name: "John Doe",
	age: 42,
	profession: "Software Engineer",
	country: "USA",
};

test("Case 4 (mix and match)", () => {
	const result4 = parseDataBlocks(template4);
	expect(result4.template).toBe(expectedTemplate4);
	expect(result4.data).toMatchObject(expectedData4);
});

// Case 5 (invalid JSON)

const template5 = `
\`\`\`data  
{
	"name": "John Doe",
	"age": 23,
}
\`\`\`

# Heading

This is a paragraph.

~~~data  
{
	"age": 42,
	"profession": "Software Engineer"
}
~~~

> Blockquote.

~~~data
{
	"country": "USA",
}
~~~
`;
const expectedTemplate5 = `


# Heading

This is a paragraph.



> Blockquote.


`;
const expectedData5 = {
	age: 42,
	profession: "Software Engineer",
};

test("Case 5 (invalid JSON)", () => {
	const result5 = parseDataBlocks(template5);
	expect(result5.template).toBe(expectedTemplate5);
	expect(result5.data).toMatchObject(expectedData5);
});

// Case 6 (no data-blocks)

const template6 = `
\`\`\`json
{
	"name": "John Doe",
	"age": 23
}
\`\`\`

# Heading

This is a paragraph.
`;
const expectedTemplate6 = `
\`\`\`json
{
	"name": "John Doe",
	"age": 23
}
\`\`\`

# Heading

This is a paragraph.
`;
const expectedData6 = {};

test("Case 6 (no data-blocks)", () => {
	const result6 = parseDataBlocks(template6);
	expect(result6.template).toBe(expectedTemplate6);
	expect(result6.data).toMatchObject(expectedData6);
});

// Case 7 (empty block)

const template7 = `
\`\`\`data
{}
\`\`\`

# Heading

This is a paragraph.
`;
const expectedTemplate7 = `


# Heading

This is a paragraph.
`;
const expectedData7 = {};

test("Case 7 (empty block)", () => {
	const result7 = parseDataBlocks(template7);
	expect(result7.template).toBe(expectedTemplate7);
	expect(result7.data).toMatchObject(expectedData7);
});

// Case 8 (empty string)

const template8 = "";
const expectedTemplate8 = "";
const expectedData8 = {};

test("Case 8 (empty string)", () => {
	const result8 = parseDataBlocks(template8);
	expect(result8.template).toBe(expectedTemplate8);
	expect(result8.data).toMatchObject(expectedData8);
});
