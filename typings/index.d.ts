/**
 * Converts YouTube caption format from XML to SRT
 *
 * @param {string} xmlString The XML string to convert to SRT.
 * @returns {Promise<string>} The result of the conversion in SRT format.
 */
export declare function Parse(xmlString: string): Promise<string>;
