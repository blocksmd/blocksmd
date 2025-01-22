![Forms.md cover image](https://res.cloudinary.com/dnriuttuy/image/upload/v1737557694/formsmd-og-image_qxkxec.png)

# Forms.md: Developer-first, open source Typeform alternative

**Forms.md** (formerly Blocks.md) lets you build powerful multi-step forms and surveys with minimal code. Create production-ready forms that are privacy-focused, accessible, localizable, and themeable. Perfect for user onboarding, data collection, customer feedback, and much more. The best part? [It's completely free](https://forms.md/pricing/).

To learn more, please [visit the website](https://forms.md) or [read the docs](https://docs.forms.md).

## Installation

### Install via npm

```
npm install formsmd
```

### Use in browser

Download the distribution files from this repo and include them using `<link>` and `<script>` tags in your template.

```html
<!-- Forms.md CSS -->
<link rel="stylesheet" type="text/css" href="path/to/formsmd/dist/css/formsmd.min.css" />
<!--
Or RTL version:
<link rel="stylesheet" type="text/css" href="path/to/formsmd/dist/css/formsmd.rtl.min.css" />
-->

<!-- Forms.md JS bundle -->
<script src="path/to/formsmd/dist/js/formsmd.bundle.min.js"></script>
```

***

## Usage

Create forms programmatically using the Composer class, then initialize them with the Formsmd class by passing in the template.

```javascript
import "formsmd/dist/css/formsmd.min.css"; // Or import formsmd.rtl.min.css in case of RTL
import { Composer, Formsmd } from "formsmd";
 
// Create form with ID and submission endpoint
const composer = new Composer({
  id: "onboarding-form",
  postUrl: "/api/onboard"
});
 
// Choice input for position
composer.choiceInput("position", {
  question: "What's your position?",
  choices: ["Product Manager", "Software Engineer", "Founder", "Other"],
  required: true
});
 
// Text input if user selects "Other" position
composer.textInput("positionOther", {
  question: "Other",
  required: true,
  labelStyle: "classic",
  displayCondition: {
    dependencies: ["position"],
    condition: "position == 'Other'"
  }
});
 
// Start new slide, progress indicator at 50%
composer.slide({
  pageProgress: "50%"
});
 
// Choice input for how user discovered the product
composer.choiceInput("referralSource", {
  question: "How did you hear about us?",
  choices: ["News", "Search Engine", "Social Media", "Recommendation"],
  required: true
});
 
// Start new slide, show only if user was recommended, progress indicator at 75%
composer.slide({
  jumpCondition: "referralSource == 'Recommendation'",
  pageProgress: "75%"
});
 
// Email input for recommender email address
composer.emailInput("recommender", {
  question: "Who recommended you?",
  description: "We may be able to reach out to them and provide a discount for helping us out."
});
 
// Initialize with template, container, and options
const formsmd = new Formsmd(
  composer.template,
  document.getElementById("onboarding-form-container"),
  {
    postHeaders: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }
);
formsmd.init();
```

## Build

Run the following to build the project:

```
npm run build
```

Make sure you have the dev dependencies installed.

## Test

Run the following to test the project:

```
npm run test
```

Again, make sure you have the dev dependencies installed.

## License

**Forms.md** is [licensed under Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).
