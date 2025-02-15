"use strict";

const { renderer } = require("../src/marked-renderer");
const { createCountryCallingCodeOptions } = require("../src/phone-numbers");
const beautify = require("beautify");
const { marked } = require("marked");

const template = `
<!-- Blockquotes -->

> Blockquote.

> This is a blockquote with a [link](https://www.example.com).

> [ .col-4 ] Blockquote.

>   [   #some-blockquote    .text-accent data-toggle="tooltip" data-title="Some title"   ]
> This is a blockquote with a [link](https://www.example.com).


<!-- Code -->

	y = mx + c

\`\`\`
y = mx + c
\`\`\`

~~~		[.col-6 .text-accent aria-label="Code"]
y = mx + c
~~~

\`\`\`JavaScript
var a = 5;
\`\`\`

\`\`\`JavaScript 	[.col-6 aria-label="Code"]	
var a = 5;
\`\`\`

~~~   Python	
a = 5
~~~

~~~[   .col-6 .xs:col-8 	#some-code	]   Python	
a = 5
~~~

\`\`\`Mermaid
pie "x" : 100
\`\`\`

~~~Mermaid [.col-4 .text-accent]
pie "x" : 100
~~~


<!-- Form fields -->

name* = TextInput(
	| question = What is your name?
	| description = Please enter your full name.
)

[.hidden]
text* = TextInput()

[#some-email-field .col-6]
email = emailinput(
	| question = What is your email address?
	| maxlength = 255
	| subfield
)

[#some-url-field .col-6]
website = uRlInPuT(
	| fieldsize = sm
	| value = https://mysite.com
	| placeholder = Keep this empty if you do not have one.
)

password = passwordinput(| question = Password)

shortBio = TextInput(
	| question = Write a short description about yourself.
	| multiline
)

phone = telinput()

number* = NumberInput(
	| question = What number are you thinking of?
)

color = SelectBox(
	| question = What is your favorite color?
	| options = red, green, blue
)

choice* = ChoiceInput(
	| question = What is your choice?
	| choices = A, B
)

pictureChoice* = PictureChoice(
	| question = What is your picture choice?
	| choices = A && https://example.com/a.png, B && https://example.com/b.png
	| checked = a, B
	| multiple
)

rating = RatingInput(
	| question = How would you rate our service?
)

opinion* = OpinionScale(
	| question = What is your opinion?
	| description = Please choose.
)

joined* = DateTimeInput(
	| question = When did you join?
)

[#some-date-field .col-6]
joinedDate = dateinput(
	| question = What date did you join?
	| description = Please specify.
	| max = 2025-01-01
	| subfield
)

joinTime = TIMEINPUT()

portfolio* = FileInput(
	| question = Upload your portfolio
	| description = Please make sure the file is a PDF.
	| sizelimit = 50
)


<!-- Headings -->

# Heading 1
## [] *Heading* 2
### Another \`heading\`, hello <span data-fmd-name>name</span>!
#### Heading 4 with [link](https://www.example.com) ####
##### Heading 5
###### [	  ] Heading 6

# [#some-id .col-4 .xs:col-6 aria-label="Label" data-title="Some title"] Hello world!
## [		#some-other-id 		.col-4 	.xs:col-6 	aria-label="Label" 	  data-title=' Some  title '	 .col-8  ] **Heading** ##


<!-- Image -->

![Image](https://example.com/image.png "Title")


<!-- Lists -->

- Item
- **Item**
- Item

1. Item
2. Item
3. *Item*

- [#unordered-1 .text-accent aria-label="Unordered list"]
- \`Item\`
- Item
- Item

0. [#ordered-1 .text-accent aria-label="Ordered list"]
1. Item
2. Item
3. Item
4. [Link](https://www.example.com)

- [x] Item
- [ ] Item

0. [.list-unstyled]
1. [ ] Item
2. [x] Item


<!-- Paragraphs -->

This is a paragraph.

[ #some-paragraph aria-label="Label" data-title="Some title" .col-8 .xs:col-12 ] This is a paragraph.

 [   .text-accent     #some-other-paragraph ]				
This is a paragraph.


<!-- Table -->

| Syntax     | Description                     |
| ---------- | ------------------------------- |
| **Header** | Title                           |
| Paragraph  | [Link](https://www.example.com) |
`;
const expectedTemplate = `
<!-- Blockquotes -->

<blockquote>
	<p>Blockquote.</p>
</blockquote>

<blockquote>
	<p>This is a blockquote with a <a href="https://www.example.com">link</a>.</p>
</blockquote>

<blockquote class="fmd-col-4">
	<p>Blockquote.</p>
</blockquote>

<blockquote id="some-blockquote" class="fmd-text-accent" data-toggle="tooltip" data-title="Some title">
	<p>This is a blockquote with a <a href="https://www.example.com">link</a>.</p>
</blockquote>


<!-- Code -->

<div class="fmd-code-wrapper">
	<div class="fmd-code-header"><span></span><button type="button" class="fmd-copy-btn">Copy</button></div>
	<pre tabindex="0"><code>y = mx + c
</code></pre>
</div>

<div class="fmd-code-wrapper">
	<div class="fmd-code-header"><span></span><button type="button" class="fmd-copy-btn">Copy</button></div>
	<pre tabindex="0"><code>y = mx + c
</code></pre>
</div>

<div class="fmd-col-6 fmd-text-accent fmd-code-wrapper" aria-label="Code">
	<div class="fmd-code-header"><span></span><button type="button" class="fmd-copy-btn">Copy</button></div>
	<pre tabindex="0"><code>y = mx + c
</code></pre>
</div>

<div class="fmd-code-wrapper">
	<div class="fmd-code-header"><span>JavaScript</span><button type="button" class="fmd-copy-btn">Copy</button></div>
	<pre tabindex="0"><code class="language-JavaScript">var a = 5;
</code></pre>
</div>

<div class="fmd-col-6 fmd-code-wrapper" aria-label="Code">
	<div class="fmd-code-header"><span>JavaScript</span><button type="button" class="fmd-copy-btn">Copy</button></div>
	<pre tabindex="0"><code class="language-JavaScript">var a = 5;
</code></pre>
</div>

<div class="fmd-code-wrapper">
	<div class="fmd-code-header"><span>Python</span><button type="button" class="fmd-copy-btn">Copy</button></div>
	<pre tabindex="0"><code class="language-Python">a = 5
</code></pre>
</div>

<div id="some-code" class="fmd-col-6 fmd-xs:col-8 fmd-code-wrapper">
	<div class="fmd-code-header"><span>Python</span><button type="button" class="fmd-copy-btn">Copy</button></div>
	<pre tabindex="0"><code class="language-Python">a = 5
</code></pre>
</div>

<div class="fmd-mermaid-wrapper">
	<pre class="mermaid">pie "x" : 100
</pre>
</div>

<div class="fmd-col-4 fmd-text-accent fmd-mermaid-wrapper">
	<pre class="mermaid">pie "x" : 100
</pre>
</div>


<!-- Form fields -->

<div class="fmd-form-field">
	<label class="fmd-form-question" for="id_name">
		What is your <span class="fmd-text-nowrap" aria-hidden="true">name?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">name? (required)</span>
	</label>
	<p class="fmd-form-description">
		Please enter your full name.
	</p>
	<input
		name="name"
		id="id_name"
		type="text"
		class="fmd-form-str-input fmd-form-control"
		placeholder="Type your answer here..."
		required
	>
</div>

<div class="fmd-hidden fmd-form-field">
	<label class="fmd-form-question" for="id_text">
		<span class="fmd-text-nowrap" aria-hidden="true">...<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">... (required)</span>
	</label>
	<input
		name="text"
		id="id_text"
		type="text"
		class="fmd-form-str-input fmd-form-control"
		placeholder="Type your answer here..."
		required
	>
</div>

<div id="some-email-field" class="fmd-col-6 fmd-form-field fmd-form-field-classic-labels">
	<label class="fmd-form-question" for="id_email">
		What is your email address?
	</label>
	<input
		name="email"
		id="id_email"
		type="email"
		class="fmd-form-str-input fmd-form-control"
		placeholder="name@example.com"
		maxlength="255"
	>
</div>

<div id="some-url-field" class="fmd-col-6 fmd-form-field fmd-form-field-sm">
	<label class="fmd-form-question" for="id_website">
		...
	</label>
	<input
		name="website"
		id="id_website"
		type="url"
		class="fmd-form-str-input fmd-form-control"
		placeholder="Keep this empty if you do not have one."
		value="https://mysite.com"
	>
</div>

<div class="fmd-form-field">
	<label class="fmd-form-question" for="id_password">
		Password
	</label>
	<input
		name="password"
		id="id_password"
		type="password"
		class="fmd-form-password-input fmd-form-control"
		placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
	>
</div>

<div class="fmd-form-field">
	<label class="fmd-form-question" for="id_shortBio">
		Write a short description about yourself.
	</label>
	<textarea
		name="shortBio"
		id="id_shortBio"
		class="fmd-form-str-input fmd-form-control"
		placeholder="Type your answer here..."
		aria-describedby="id_shortBio-form-text"
	></textarea>
	<div id="id_shortBio-form-text" class="fmd-form-text-bottom fmd-d-flex fmd-align-items-center">
		<kbd class="fmd-d-flex fmd-align-items-center fmd-me-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fmd-icon fmd-mt-1 fmd-me-2" aria-hidden="true" focusable="false"><path d="M464 56V32h48V56 288v24H488 93.1l79 79 17 17-33.9 33.9-17-17L18.2 305l-17-17 17-17 120-120 17-17L189.1 168l-17 17-79 79H464V56z"/></svg> Enter</kbd>
		to add new line
	</div>
</div>

<fieldset class="fmd-form-field">
	<legend class="fmd-form-question">
		...
	</legend>
	<div class="fmd-input-group">
		<select
			name="phoneCountryCode"
			id="id_phoneCountryCode"
			class="fmd-form-str-select fmd-form-countrycode-select fmd-form-select"
			required
			aria-label="Country calling code"
		>
			${createCountryCallingCodeOptions("US", [])}
		</select>
		<input
			name="phone"
			id="id_phone"
			type="tel"
			class="fmd-form-str-input fmd-form-control"
			placeholder="(201) 555-0123"
			aria-label="Phone number"
		>
	</div>
</fieldset>

<div class="fmd-form-field">
	<label class="fmd-form-question" for="id_number">
		What number are you thinking <span class="fmd-text-nowrap" aria-hidden="true">of?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">of? (required)</span>
	</label>
	<div class="fmd-input-group">
		<input
			name="number"
			id="id_number"
			type="number"
			class="fmd-form-num-input fmd-form-control"
			placeholder="Type a number here..."
			required
		>
	</div>
</div>

<div class="fmd-form-field">
	<label class="fmd-form-question" for="id_color">
		What is your favorite color?
	</label>
	<select
		name="color"
		id="id_color"
		class="fmd-form-str-select fmd-form-select"
	>
		<option value="" selected>Select an option</option>
		<option value="red">red</option>
		<option value="green">green</option>
		<option value="blue">blue</option>
	</select>
</div>

<fieldset data-fmd-name="choice" data-fmd-type="radio" data-fmd-required class="fmd-form-field">
	<legend class="fmd-form-question">
		What is your <span class="fmd-text-nowrap" aria-hidden="true">choice?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">choice? (required)</span>
	</legend>
	<div class="fmd-check-grid-wrapper">
		<div class="fmd-check-grid">
			<div class="fmd-form-check">
				<input
					name="choice"
					id="id_choice-1"
					type="radio"
					class="fmd-form-str-check-input fmd-form-check-input"
					value="A"
				>
				<label class="fmd-form-check-label" for="id_choice-1">
					A
					<span class="fmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="fmd-form-check">
				<input
					name="choice"
					id="id_choice-2"
					type="radio"
					class="fmd-form-str-check-input fmd-form-check-input"
					value="B"
				>
				<label class="fmd-form-check-label" for="id_choice-2">
					B
					<span class="fmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
		</div>
	</div>
</fieldset>

<fieldset data-fmd-name="pictureChoice" data-fmd-type="checkbox" data-fmd-required class="fmd-form-field">
	<legend class="fmd-form-question">
		What is your picture <span class="fmd-text-nowrap" aria-hidden="true">choice?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">choice? (required)</span>
	</legend>
	<div class="fmd-form-text">
		Choose as many as you like
	</div>
	<div class="fmd-check-grid-wrapper">
		<div class="fmd-check-grid fmd-check-grid-h">
			<div class="fmd-form-check fmd-form-img-check">
				<input
					name="pictureChoice"
					id="id_pictureChoice-1"
					type="checkbox"
					class="fmd-form-str-check-input fmd-form-check-input"
					value="A"
				>
				<label class="fmd-form-check-label" for="id_pictureChoice-1">
					<span class="fmd-form-check-frame">
						<img src="https://example.com/a.png" alt="A">
					</span>
					A
					<span class="fmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="fmd-form-check fmd-form-img-check">
				<input
					name="pictureChoice"
					id="id_pictureChoice-2"
					type="checkbox"
					class="fmd-form-str-check-input fmd-form-check-input"
					value="B"
					checked
				>
				<label class="fmd-form-check-label" for="id_pictureChoice-2">
					<span class="fmd-form-check-frame">
						<img src="https://example.com/b.png" alt="B">
					</span>
					B
					<span class="fmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
		</div>
	</div>
</fieldset>

<fieldset data-fmd-name="rating" data-fmd-type="num-radio" class="fmd-form-field">
	<legend class="fmd-form-question">
		How would you rate our service?
	</legend>
	<div class="fmd-rating-grid">
		<input 
			name="rating"
			id="id_rating-1"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="1"
		>
		<label class="fmd-form-rating-label" for="id_rating-1">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			1<span class="fmd-visually-hidden"> star</span>
		</label>
		<input 
			name="rating"
			id="id_rating-2"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="2"
		>
		<label class="fmd-form-rating-label" for="id_rating-2">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			2<span class="fmd-visually-hidden"> stars</span>
		</label>
		<input 
			name="rating"
			id="id_rating-3"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="3"
		>
		<label class="fmd-form-rating-label" for="id_rating-3">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			3<span class="fmd-visually-hidden"> stars</span>
		</label>
		<input 
			name="rating"
			id="id_rating-4"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="4"
		>
		<label class="fmd-form-rating-label" for="id_rating-4">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			4<span class="fmd-visually-hidden"> stars</span>
		</label>
		<input 
			name="rating"
			id="id_rating-5"
			type="radio"
			class="fmd-form-num-check-input fmd-form-rating-input"
			value="5"
		>
		<label class="fmd-form-rating-label" for="id_rating-5">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="fmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="fmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="fmd-form-rating-svg-path-outer"/>
			</svg>
			5<span class="fmd-visually-hidden"> stars</span>
		</label>
	</div>
</fieldset>

<fieldset data-fmd-name="opinion" data-fmd-type="num-radio" data-fmd-required class="fmd-form-field">
	<legend class="fmd-form-question">
		What is your <span class="fmd-text-nowrap" aria-hidden="true">opinion?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">opinion? (required)</span>
	</legend>
	<p class="fmd-form-description">
		Please choose.
	</p>
	<div class="fmd-scale-grid">
		<input 
			name="opinion"
			id="id_opinion-0"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="0"
			aria-describedby="id_opinion-label-start"
		>
		<label class="fmd-form-scale-label" for="id_opinion-0">0</label>
		<input 
			name="opinion"
			id="id_opinion-1"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="1"
		>
		<label class="fmd-form-scale-label" for="id_opinion-1">1</label>
		<input 
			name="opinion"
			id="id_opinion-2"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="2"
		>
		<label class="fmd-form-scale-label" for="id_opinion-2">2</label>
		<input 
			name="opinion"
			id="id_opinion-3"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="3"
		>
		<label class="fmd-form-scale-label" for="id_opinion-3">3</label>
		<input 
			name="opinion"
			id="id_opinion-4"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="4"
		>
		<label class="fmd-form-scale-label" for="id_opinion-4">4</label>
		<input 
			name="opinion"
			id="id_opinion-5"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="5"
		>
		<label class="fmd-form-scale-label" for="id_opinion-5">5</label>
		<input 
			name="opinion"
			id="id_opinion-6"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="6"
		>
		<label class="fmd-form-scale-label" for="id_opinion-6">6</label>
		<input 
			name="opinion"
			id="id_opinion-7"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="7"
		>
		<label class="fmd-form-scale-label" for="id_opinion-7">7</label>
		<input 
			name="opinion"
			id="id_opinion-8"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="8"
		>
		<label class="fmd-form-scale-label" for="id_opinion-8">8</label>
		<input 
			name="opinion"
			id="id_opinion-9"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="9"
		>
		<label class="fmd-form-scale-label" for="id_opinion-9">9</label>
		<input 
			name="opinion"
			id="id_opinion-10"
			type="radio"
			class="fmd-form-num-check-input fmd-form-scale-input"
			value="10"
			aria-describedby="id_opinion-label-end"
		>
		<label class="fmd-form-scale-label" for="id_opinion-10">10</label>
	</div>
	<div class="fmd-form-scale-text">
		<div class="fmd-form-scale-text-start">
        	<span class="fmd-d-none fmd-xs:d-inline-block">0 &mdash;</span>
        	<span id="id_opinion-label-start">Not likely at all</span>
        </div>
        <div class="fmd-form-scale-text-end">
        	<span class="fmd-d-none fmd-xs:d-inline-block">10 &mdash;</span>
        	<span id="id_opinion-label-end">Extremely likely</span>
        </div>
    </div>
</fieldset>

<div data-fmd-name="joined" data-fmd-type="datetime-local" class="fmd-form-field">
	<label class="fmd-form-question" for="id_joined">
		When did you <span class="fmd-text-nowrap" aria-hidden="true">join?<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">join? (required)</span>
	</label>
	<input
		name="joined"
		id="id_joined"
		type="datetime-local"
		class="fmd-form-datetime-input fmd-form-control"
		placeholder="YYYY-MM-DDTHH:mm"
		required
	>
</div>

<div data-fmd-name="joinedDate" data-fmd-type="date" id="some-date-field" class="fmd-col-6 fmd-form-field fmd-form-field-classic-labels">
	<label class="fmd-form-question" for="id_joinedDate">
		What date did you join?
	</label>
	<p class="fmd-form-description">
		Please specify.
	</p>
	<input
		name="joinedDate"
		id="id_joinedDate"
		type="date"
		class="fmd-form-datetime-input fmd-form-control"
		placeholder="YYYY-MM-DD"
		max="2025-01-01"
	>
</div>

<div data-fmd-name="joinTime" data-fmd-type="time" class="fmd-form-field">
	<label class="fmd-form-question" for="id_joinTime">
		...
	</label>
	<input
		name="joinTime"
		id="id_joinTime"
		type="time"
		class="fmd-form-datetime-input fmd-form-control"
		placeholder="HH:mm"
	>
</div>

<div data-fmd-name="portfolio" data-fmd-type="file" data-fmd-size-limit="50" class="fmd-form-field">
	<label class="fmd-form-question">
		Upload your <span class="fmd-text-nowrap" aria-hidden="true">portfolio<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">portfolio (required)</span>
	</label>
	<p class="fmd-form-description">
		Please make sure the file is a PDF.
	</p>
	<div class="fmd-form-file">
		<label class="fmd-form-file-label">
			<input 
				name="portfolio"
				id="id_portfolio"
				type="file"
				class="fmd-form-file-input"
				required
			>
			<span class="fmd-d-block fmd-w-auto fmd-mw-100">
				<span class="fmd-visually-hidden">
					Upload your <span class="fmd-text-nowrap" aria-hidden="true">portfolio<sup class="fmd-text-accent">*</sup></span><span class="fmd-visually-hidden">portfolio (required)</span>
				</span>
				<span class="fmd-file-empty-section">
					<span class="fmd-form-file-img-container">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M389.8 125.2C363.7 88.1 320.7 64 272 64c-77.4 0-140.5 61-143.9 137.5c-.6 13-9 24.4-21.3 28.8C63.2 245.7 32 287.2 32 336c0 61.9 50.1 112 112 112l368 0c53 0 96-43 96-96c0-36.8-20.7-68.8-51.2-84.9c-13.4-7.1-20-22.5-15.8-37.1c2-6.9 3-14.3 3-22c0-44.2-35.8-80-80-80c-12.3 0-23.9 2.8-34.3 7.7c-14.1 6.7-30.9 2.3-39.9-10.5zM272 32c59.5 0 112.1 29.5 144 74.8C430.5 99.9 446.8 96 464 96c61.9 0 112 50.1 112 112c0 10.7-1.5 21-4.3 30.8C612.3 260.2 640 302.9 640 352c0 70.7-57.3 128-128 128l-368 0C64.5 480 0 415.5 0 336c0-62.8 40.2-116.1 96.2-135.9C100.3 106.6 177.4 32 272 32zM228.7 244.7l80-80c6.2-6.2 16.4-6.2 22.6 0l80 80c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L336 214.6 336 368c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-153.4-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6z"/></svg>
					</span>
					<span class="fmd-d-block fmd-mt-3 fmd-first-letter-uppercase">
						<strong class="fmd-text-accent">choose file</strong><span class="fmd-xs:d-none"> or drag here</span>
					</span>
				</span>
				<span class="fmd-file-exists-section"></span>
				<span class="fmd-form-file-size-limit fmd-mt-1">
					Size limit: 50MB
				</span>
			</span>
		</label>
		<div class="fmd-form-file-reset-btn-container">
			<button type="button" class="fmd-form-file-reset-btn" aria-label="Remove chosen file">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"/></svg>
			</button>
		</div>
	</div>
</div>


<!-- Headings -->

<h1 id="heading-1">Heading 1&nbsp;<a href="#heading-1" class="fmd-heading-anchor">#</a></h1>
<h2 id="heading-2"><em>Heading</em> 2&nbsp;<a href="#heading-2" class="fmd-heading-anchor">#</a></h2>
<h3 id="another-heading-hello-name">Another <code>heading</code>, hello <span data-fmd-name>name</span>!&nbsp;<a href="#another-heading-hello-name" class="fmd-heading-anchor">#</a></h3>
<h4 id="heading-4-with-link">Heading 4 with <a href="https://www.example.com">link</a>&nbsp;<a href="#heading-4-with-link" class="fmd-heading-anchor">#</a></h4>
<h5 id="heading-5">Heading 5&nbsp;<a href="#heading-5" class="fmd-heading-anchor">#</a></h5>
<h6 id="heading-6">Heading 6&nbsp;<a href="#heading-6" class="fmd-heading-anchor">#</a></h6>

<h1 id="some-id" class="fmd-col-4 fmd-xs:col-6" aria-label="Label" data-title="Some title">Hello world!&nbsp;<a href="#some-id" class="fmd-heading-anchor">#</a></h1>
<h2 id="some-other-id" class="fmd-col-4 fmd-xs:col-6 fmd-col-8" aria-label="Label" data-title=" Some title "><strong>Heading</strong>&nbsp;<a href="#some-other-id" class="fmd-heading-anchor">#</a></h2>


<!-- Image -->

<p>
	<img src="https://example.com/image.png" loading="lazy" alt="Image" title="Title">
</p>


<!-- Lists -->

<ul>
	<li>Item</li>
	<li><strong>Item</strong></li>
	<li>Item</li>
</ul>

<ol>
	<li>Item</li>
	<li>Item</li>
	<li><em>Item</em></li>
</ol>

<ul id="unordered-1" class="fmd-text-accent" aria-label="Unordered list">
	<li><code>Item</code></li>
	<li>Item</li>
	<li>Item</li>
</ul>

<ol id="ordered-1" class="fmd-text-accent" aria-label="Ordered list">
	<li>Item</li>
	<li>Item</li>
	<li>Item</li>
	<li><a href="https://www.example.com">Link</a></li>
</ol>

<ul>
	<li>
		<div role="checkbox" class="fmd-list-check fmd-list-checked" aria-label="Checked" aria-checked="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg></div>
		Item
	</li>
	<li>
		<div role="checkbox" class="fmd-list-check" aria-label="Not checked" aria-checked="false"></div>
		Item
	</li>
</ul>

<ol class="fmd-list-unstyled">
	<li>
		<div role="checkbox" class="fmd-list-check" aria-label="Not checked" aria-checked="false"></div>
		Item
	</li>
	<li>
		<div role="checkbox" class="fmd-list-check fmd-list-checked" aria-label="Checked" aria-checked="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fmd-icon" aria-hidden="true" focusable="false"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg></div>
		Item
	</li>
</ol>


<!-- Paragraphs -->

<p>
	This is a paragraph.
</p>

<p id="some-paragraph" class="fmd-col-8 fmd-xs:col-12" aria-label="Label" data-title="Some title">
	This is a paragraph.
</p>

<p id="some-other-paragraph" class="fmd-text-accent">
	This is a paragraph.
</p>


<!-- Table -->

<table class="fmd-table">
	<thead>
		<tr>
			<th>Syntax</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><strong>Header</strong></td>
			<td>Title</td>
		</tr>
		<tr>
			<td>Paragraph</td>
			<td><a href="https://www.example.com">Link</a></td>
		</tr>
	</tbody>
</table>
`;

test("Custom renderer", () => {
	marked.use({ renderer });
	expect(beautify(marked.parse(template), { format: "html" })).toBe(
		beautify(expectedTemplate, { format: "html" }),
	);
});
