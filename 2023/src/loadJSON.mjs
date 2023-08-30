/**
 * Fetches and parses a JSON file from a given URL.
 *
 * @param {string} url - The URL of the JSON file.
 * @returns {Promise<Object>} A promise that resolves with the parsed JSON object.
 * @throws {Error} If there's an error fetching or parsing the JSON.
 * @example
 * 
 * loadJson('https://api.example.com/data.json')
 *   .then(data => {
 *     console.log(data);
 *   })
 *   .catch(error => {
 *     console.error('Error loading JSON:', error);
 *   });
 * 
 */
export async function loadJSON(url) {
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
  } catch (error) {
      throw new Error(`Failed to fetch JSON from ${url}: ${error.message}`);
  }
}
