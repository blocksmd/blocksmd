/**
 * Given a country code, get the correct phone number placeholder.
 *
 * @param {string} countryCode
 * @returns {string}
 */
export function getPhoneNumberPlaceholder(countryCode: string): string;
/**
 * Create <option> elements for selecting a country calling code.
 *
 * @param {string} selectedCountryCode
 * @param {Array.<string>} availableCountryCodes
 * @returns {string}
 */
export function createCountryCallingCodeOptions(
	selectedCountryCode: string,
	availableCountryCodes: Array<string>,
): string;
