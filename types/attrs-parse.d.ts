/**
 * Given a string, parse and return the attributes as a ready-for-DOM string.
 * In the input, id starts with "#", class names start with ".", and other
 * attributes are defined as is.
 *
 * @param {string} attrs
 * @param {string} cssPrefix
 * @returns {string} parsed attributes as a ready-for-DOM string
 */
export function parseElemAttrs(attrs: string, cssPrefix: string): string;
/**
 * Given a tag (as a string) and a class name, add the name inside the
 * `class="..."` attribute. Please note, this method assumes that class names
 * are inside double quotes, NOT single quotes.
 *
 * @param {string} tag
 * @param {string} name
 * @returns {string} tag after adding the class name
 */
export function addReservedClass(tag: string, name: string): string;
