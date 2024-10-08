("use strict");

const { renderer } = require("../src/marked-renderer");
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


<!-- Headings -->

# Heading 1
## [] *Heading* 2
### Another \`heading\`, hello <span data-bmd-name>name</span>!
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

<blockquote class="bmd-col-4">
	<p>Blockquote.</p>
</blockquote>

<blockquote id="some-blockquote" class="bmd-text-accent" data-toggle="tooltip" data-title="Some title">
	<p>This is a blockquote with a <a href="https://www.example.com">link</a>.</p>
</blockquote>


<!-- Code -->

<div class="bmd-code-wrapper">
	<div class="bmd-code-header"><span></span><button type="button" class="bmd-copy-btn">Copy</button></div>
	<pre tabindex="0"><code>y = mx + c
</code></pre>
</div>

<div class="bmd-code-wrapper">
	<div class="bmd-code-header"><span></span><button type="button" class="bmd-copy-btn">Copy</button></div>
	<pre tabindex="0"><code>y = mx + c
</code></pre>
</div>

<div class="bmd-col-6 bmd-text-accent bmd-code-wrapper" aria-label="Code">
	<div class="bmd-code-header"><span></span><button type="button" class="bmd-copy-btn">Copy</button></div>
	<pre tabindex="0"><code>y = mx + c
</code></pre>
</div>

<div class="bmd-code-wrapper">
	<div class="bmd-code-header"><span>JavaScript</span><button type="button" class="bmd-copy-btn">Copy</button></div>
	<pre tabindex="0"><code class="language-JavaScript">var a = 5;
</code></pre>
</div>

<div class="bmd-col-6 bmd-code-wrapper" aria-label="Code">
	<div class="bmd-code-header"><span>JavaScript</span><button type="button" class="bmd-copy-btn">Copy</button></div>
	<pre tabindex="0"><code class="language-JavaScript">var a = 5;
</code></pre>
</div>

<div class="bmd-code-wrapper">
	<div class="bmd-code-header"><span>Python</span><button type="button" class="bmd-copy-btn">Copy</button></div>
	<pre tabindex="0"><code class="language-Python">a = 5
</code></pre>
</div>

<div id="some-code" class="bmd-col-6 bmd-xs:col-8 bmd-code-wrapper">
	<div class="bmd-code-header"><span>Python</span><button type="button" class="bmd-copy-btn">Copy</button></div>
	<pre tabindex="0"><code class="language-Python">a = 5
</code></pre>
</div>

<div class="bmd-mermaid-wrapper">
	<pre class="mermaid">pie "x" : 100
</pre>
</div>

<div class="bmd-col-4 bmd-text-accent bmd-mermaid-wrapper">
	<pre class="mermaid">pie "x" : 100
</pre>
</div>


<!-- Form fields -->

<div class="bmd-form-field">
	<label class="bmd-form-question" for="id_name">
		What is your <span class="bmd-text-nowrap" aria-hidden="true">name?<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">name? (required)</span>
	</label>
	<p class="bmd-form-description">
		Please enter your full name.
	</p>
	<input
		name="name"
		id="id_name"
		type="text"
		class="bmd-form-control"
		placeholder="Type your answer here..."
		required
	>
</div>

<div class="bmd-hidden bmd-form-field">
	<label class="bmd-form-question" for="id_text">
		<span class="bmd-text-nowrap" aria-hidden="true">...<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">... (required)</span>
	</label>
	<input
		name="text"
		id="id_text"
		type="text"
		class="bmd-form-control"
		placeholder="Type your answer here..."
		required
	>
</div>

<div id="some-email-field" class="bmd-col-6 bmd-form-field bmd-form-subfield">
	<label class="bmd-form-question" for="id_email">
		What is your email address?
	</label>
	<input
		name="email"
		id="id_email"
		type="email"
		class="bmd-form-control"
		placeholder="name@example.com"
		maxlength="255"
	>
</div>

<div id="some-url-field" class="bmd-col-6 bmd-form-field bmd-form-field-sm">
	<label class="bmd-form-question" for="id_website">
		...
	</label>
	<input
		name="website"
		id="id_website"
		type="url"
		class="bmd-form-control"
		placeholder="Keep this empty if you do not have one."
		value="https://mysite.com"
	>
</div>

<div class="bmd-form-field">
	<label class="bmd-form-question" for="id_shortBio">
		Write a short description about yourself.
	</label>
	<textarea
		name="shortBio"
		id="id_shortBio"
		class="bmd-form-control"
		placeholder="Type your answer here..."
		aria-details="id_shortBio-form-text"
	></textarea>
	<div id="id_shortBio-form-text" class="bmd-form-text-bottom bmd-d-flex bmd-align-items-center">
		<kbd class="bmd-d-flex bmd-align-items-center bmd-me-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="bmd-icon bmd-mt-1 bmd-me-2" aria-hidden="true" focusable="false"><path d="M464 56V32h48V56 288v24H488 93.1l79 79 17 17-33.9 33.9-17-17L18.2 305l-17-17 17-17 120-120 17-17L189.1 168l-17 17-79 79H464V56z"/></svg> Enter</kbd>
		to add new line
	</div>
</div>

<div class="bmd-form-field">
	<label class="bmd-form-question" for="id_phone">
		...
	</label>
	<input
		name="phone"
		id="id_phone"
		type="tel"
		class="bmd-form-control"
		placeholder="(201) 555-0123"
	>
</div>

<div class="bmd-form-field">
	<label class="bmd-form-question" for="id_number">
		What number are you thinking <span class="bmd-text-nowrap" aria-hidden="true">of?<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">of? (required)</span>
	</label>
	<div class="bmd-input-group">
		<input
			name="number"
			id="id_number"
			type="number"
			class="bmd-form-control"
			placeholder="Type a number here..."
			required
		>
	</div>
</div>

<div class="bmd-form-field">
	<label class="bmd-form-question" for="id_color">
		What is your favorite color?
	</label>
	<select
		name="color"
		id="id_color"
		class="bmd-form-select"
	>
		<option value="" selected>Select an option</option>
		<option value="red">red</option>
		<option value="green">green</option>
		<option value="blue">blue</option>
	</select>
</div>

<fieldset data-bmd-name="choice" data-bmd-type="radio" data-bmd-required class="bmd-form-field">
	<legend class="bmd-form-question">
		What is your <span class="bmd-text-nowrap" aria-hidden="true">choice?<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">choice? (required)</span>
	</legend>
	<div class="bmd-check-grid-wrapper">
		<div class="bmd-check-grid">
			<div class="bmd-form-check">
				<input
					name="choice"
					id="id_choice-1"
					type="radio"
					class="bmd-form-check-input"
					value="A"
				>
				<label class="bmd-form-check-label" for="id_choice-1">
					A
					<span class="bmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="bmd-form-check">
				<input
					name="choice"
					id="id_choice-2"
					type="radio"
					class="bmd-form-check-input"
					value="B"
				>
				<label class="bmd-form-check-label" for="id_choice-2">
					B
					<span class="bmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
		</div>
	</div>
</fieldset>

<fieldset data-bmd-name="pictureChoice" data-bmd-type="checkbox" data-bmd-required class="bmd-form-field">
	<legend class="bmd-form-question">
		What is your picture <span class="bmd-text-nowrap" aria-hidden="true">choice?<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">choice? (required)</span>
	</legend>
	<div class="bmd-form-text">
		Choose as many as you like
	</div>
	<div class="bmd-check-grid-wrapper">
		<div class="bmd-check-grid bmd-check-grid-h">
			<div class="bmd-form-check bmd-form-img-check">
				<input
					name="pictureChoice"
					id="id_pictureChoice-1"
					type="checkbox"
					class="bmd-form-check-input"
					value="A"
				>
				<label class="bmd-form-check-label" for="id_pictureChoice-1">
					<span class="bmd-form-check-frame">
						<img src="https://example.com/a.png" alt="A">
					</span>
					A
					<span class="bmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
			<div class="bmd-form-check bmd-form-img-check">
				<input
					name="pictureChoice"
					id="id_pictureChoice-2"
					type="checkbox"
					class="bmd-form-check-input"
					value="B"
					checked
				>
				<label class="bmd-form-check-label" for="id_pictureChoice-2">
					<span class="bmd-form-check-frame">
						<img src="https://example.com/b.png" alt="B">
					</span>
					B
					<span class="bmd-form-check-mark">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z"/></svg>
					</span>
				</label>
			</div>
		</div>
	</div>
</fieldset>

<fieldset data-bmd-name="rating" data-bmd-type="num-radio" class="bmd-form-field">
	<legend class="bmd-form-question">
		How would you rate our service?
	</legend>
	<div class="bmd-rating-grid">
		<input 
			name="rating"
			id="id_rating-1"
			type="radio"
			class="bmd-form-num-check-input bmd-form-rating-input"
			value="1"
		>
		<label class="bmd-form-rating-label" for="id_rating-1">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="bmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="bmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="bmd-form-rating-svg-path-outer"/>
			</svg>
			1<span class="bmd-visually-hidden"> star</span>
		</label>
		<input 
			name="rating"
			id="id_rating-2"
			type="radio"
			class="bmd-form-num-check-input bmd-form-rating-input"
			value="2"
		>
		<label class="bmd-form-rating-label" for="id_rating-2">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="bmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="bmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="bmd-form-rating-svg-path-outer"/>
			</svg>
			2<span class="bmd-visually-hidden"> stars</span>
		</label>
		<input 
			name="rating"
			id="id_rating-3"
			type="radio"
			class="bmd-form-num-check-input bmd-form-rating-input"
			value="3"
		>
		<label class="bmd-form-rating-label" for="id_rating-3">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="bmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="bmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="bmd-form-rating-svg-path-outer"/>
			</svg>
			3<span class="bmd-visually-hidden"> stars</span>
		</label>
		<input 
			name="rating"
			id="id_rating-4"
			type="radio"
			class="bmd-form-num-check-input bmd-form-rating-input"
			value="4"
		>
		<label class="bmd-form-rating-label" for="id_rating-4">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="bmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="bmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="bmd-form-rating-svg-path-outer"/>
			</svg>
			4<span class="bmd-visually-hidden"> stars</span>
		</label>
		<input 
			name="rating"
			id="id_rating-5"
			type="radio"
			class="bmd-form-num-check-input bmd-form-rating-input"
			value="5"
		>
		<label class="bmd-form-rating-label" for="id_rating-5">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="bmd-form-rating-svg" aria-hidden="true" focusable="false">
				<path d="M288.1 0l63.5 195.6H557.2L390.9 316.4 454.4 512 288.1 391.1 121.7 512l63.5-195.6L18.9 195.6H224.5L288.1 0z" class="bmd-form-rating-svg-path-inner"/>
				<path d="M351.6 195.6L304.9 51.8 288.1 0 271.2 51.8 224.5 195.6l-151.2 0-54.4 0 44 32 122.3 88.9L138.5 460.2 121.7 512l44-32 122.3-88.9L410.4 480l44 32-16.8-51.8L390.9 316.4l122.3-88.9 44-32-54.4 0-151.2 0zm107.1 32l-86.7 63-18.8 13.7 7.2 22.1 33.1 101.9-86.7-63-18.8-13.7-18.8 13.7-86.7 63 33.1-101.9 7.2-22.1L204 290.5l-86.7-63 107.1 0 23.2 0 7.2-22.1 33.1-101.9 33.1 101.9 7.2 22.1 23.3 0 107.1 0z" class="bmd-form-rating-svg-path-outer"/>
			</svg>
			5<span class="bmd-visually-hidden"> stars</span>
		</label>
	</div>
</fieldset>

<fieldset data-bmd-name="opinion" data-bmd-type="num-radio" data-bmd-required class="bmd-form-field">
	<legend class="bmd-form-question">
		What is your <span class="bmd-text-nowrap" aria-hidden="true">opinion?<sup class="bmd-text-accent">*</sup></span><span class="bmd-visually-hidden">opinion? (required)</span>
	</legend>
	<p class="bmd-form-description">
		Please choose.
	</p>
	<div class="bmd-scale-grid">
		<input 
			name="opinion"
			id="id_opinion-0"
			type="radio"
			class="bmd-form-num-check-input bmd-form-scale-input"
			value="0"
			aria-describedby="id_opinion-label-start"
		>
		<label class="bmd-form-scale-label" for="id_opinion-0">0</label>
		<input 
			name="opinion"
			id="id_opinion-1"
			type="radio"
			class="bmd-form-num-check-input bmd-form-scale-input"
			value="1"
		>
		<label class="bmd-form-scale-label" for="id_opinion-1">1</label>
		<input 
			name="opinion"
			id="id_opinion-2"
			type="radio"
			class="bmd-form-num-check-input bmd-form-scale-input"
			value="2"
		>
		<label class="bmd-form-scale-label" for="id_opinion-2">2</label>
		<input 
			name="opinion"
			id="id_opinion-3"
			type="radio"
			class="bmd-form-num-check-input bmd-form-scale-input"
			value="3"
		>
		<label class="bmd-form-scale-label" for="id_opinion-3">3</label>
		<input 
			name="opinion"
			id="id_opinion-4"
			type="radio"
			class="bmd-form-num-check-input bmd-form-scale-input"
			value="4"
		>
		<label class="bmd-form-scale-label" for="id_opinion-4">4</label>
		<input 
			name="opinion"
			id="id_opinion-5"
			type="radio"
			class="bmd-form-num-check-input bmd-form-scale-input"
			value="5"
		>
		<label class="bmd-form-scale-label" for="id_opinion-5">5</label>
		<input 
			name="opinion"
			id="id_opinion-6"
			type="radio"
			class="bmd-form-num-check-input bmd-form-scale-input"
			value="6"
		>
		<label class="bmd-form-scale-label" for="id_opinion-6">6</label>
		<input 
			name="opinion"
			id="id_opinion-7"
			type="radio"
			class="bmd-form-num-check-input bmd-form-scale-input"
			value="7"
		>
		<label class="bmd-form-scale-label" for="id_opinion-7">7</label>
		<input 
			name="opinion"
			id="id_opinion-8"
			type="radio"
			class="bmd-form-num-check-input bmd-form-scale-input"
			value="8"
		>
		<label class="bmd-form-scale-label" for="id_opinion-8">8</label>
		<input 
			name="opinion"
			id="id_opinion-9"
			type="radio"
			class="bmd-form-num-check-input bmd-form-scale-input"
			value="9"
		>
		<label class="bmd-form-scale-label" for="id_opinion-9">9</label>
		<input 
			name="opinion"
			id="id_opinion-10"
			type="radio"
			class="bmd-form-num-check-input bmd-form-scale-input"
			value="10"
			aria-describedby="id_opinion-label-end"
		>
		<label class="bmd-form-scale-label" for="id_opinion-10">10</label>
	</div>
	<div class="bmd-form-scale-text">
		<div class="bmd-form-scale-text-start">
        	<span class="bmd-d-none bmd-xs:d-inline-block">0 &mdash;</span>
        	<span id="id_opinion-label-start">Not likely at all</span>
        </div>
        <div class="bmd-form-scale-text-end">
        	<span class="bmd-d-none bmd-xs:d-inline-block">10 &mdash;</span>
        	<span id="id_opinion-label-end">Extremely likely</span>
        </div>
    </div>
</fieldset>


<!-- Headings -->

<h1 id="heading-1">Heading 1&nbsp;<a href="#heading-1" class="bmd-heading-anchor">#</a></h1>
<h2 id="heading-2"><em>Heading</em> 2&nbsp;<a href="#heading-2" class="bmd-heading-anchor">#</a></h2>
<h3 id="another-heading-hello-name">Another <code>heading</code>, hello <span data-bmd-name>name</span>!&nbsp;<a href="#another-heading-hello-name" class="bmd-heading-anchor">#</a></h3>
<h4 id="heading-4-with-link">Heading 4 with <a href="https://www.example.com">link</a>&nbsp;<a href="#heading-4-with-link" class="bmd-heading-anchor">#</a></h4>
<h5 id="heading-5">Heading 5&nbsp;<a href="#heading-5" class="bmd-heading-anchor">#</a></h5>
<h6 id="heading-6">Heading 6&nbsp;<a href="#heading-6" class="bmd-heading-anchor">#</a></h6>

<h1 id="some-id" class="bmd-col-4 bmd-xs:col-6" aria-label="Label" data-title="Some title">Hello world!&nbsp;<a href="#some-id" class="bmd-heading-anchor">#</a></h1>
<h2 id="some-other-id" class="bmd-col-4 bmd-xs:col-6 bmd-col-8" aria-label="Label" data-title=" Some title "><strong>Heading</strong>&nbsp;<a href="#some-other-id" class="bmd-heading-anchor">#</a></h2>


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

<ul id="unordered-1" class="bmd-text-accent" aria-label="Unordered list">
	<li><code>Item</code></li>
	<li>Item</li>
	<li>Item</li>
</ul>

<ol id="ordered-1" class="bmd-text-accent" aria-label="Ordered list">
	<li>Item</li>
	<li>Item</li>
	<li>Item</li>
	<li><a href="https://www.example.com">Link</a></li>
</ol>

<ul>
	<li>
		<div role="checkbox" class="bmd-list-check bmd-list-checked" aria-label="Checked" aria-checked="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg></div>
		Item
	</li>
	<li>
		<div role="checkbox" class="bmd-list-check" aria-label="Not checked" aria-checked="false"></div>
		Item
	</li>
</ul>

<ol class="bmd-list-unstyled">
	<li>
		<div role="checkbox" class="bmd-list-check" aria-label="Not checked" aria-checked="false"></div>
		Item
	</li>
	<li>
		<div role="checkbox" class="bmd-list-check bmd-list-checked" aria-label="Checked" aria-checked="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="bmd-icon" aria-hidden="true" focusable="false"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg></div>
		Item
	</li>
</ol>


<!-- Paragraphs -->

<p>
	This is a paragraph.
</p>

<p id="some-paragraph" class="bmd-col-8 bmd-xs:col-12" aria-label="Label" data-title="Some title">
	This is a paragraph.
</p>

<p id="some-other-paragraph" class="bmd-text-accent">
	This is a paragraph.
</p>


<!-- Table -->

<table class="bmd-table">
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
