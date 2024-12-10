"use strict";

const { createCountryCallingCodeOptions } = require("../src/phone-numbers");
const beautify = require("beautify");

// Case 1 (restrict available country codes)

const expectedTemplate1 = `
<option value="BD +880" data-fmd-placeholder="01812-345678">BD</option>
<option value="GB +44" selected data-fmd-placeholder="07400 123456">GB</option>
<option value="US +1" data-fmd-placeholder="(201) 555-0123">US</option>
`;

test("Case 1 (restrict available country codes)", () => {
	expect(
		beautify(createCountryCallingCodeOptions("Gb", ["bd", "gb", "US"]), {
			format: "html",
		}),
	).toBe(beautify(expectedTemplate1, { format: "html" }));
});

// Case 2 (restrict available country codes, selected one not available)

const expectedTemplate2 = `
<option value="SG +65" selected data-fmd-placeholder="8123 4567">SG</option>
<option value="GB +44" data-fmd-placeholder="07400 123456">GB</option>
<option value="BD +880" data-fmd-placeholder="01812-345678">BD</option>
<option value="US +1" data-fmd-placeholder="(201) 555-0123">US</option>
`;

test("Case 2 (restrict available country codes, selected one not available)", () => {
	expect(
		beautify(createCountryCallingCodeOptions("SG", ["GB", "BD", "US"]), {
			format: "html",
		}),
	).toBe(beautify(expectedTemplate2, { format: "html" }));
});
