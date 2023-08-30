/**
 * Asynchronously renders a template using provided props. The props can be strings, 
 * synchronous functions, or asynchronous functions. If a function returns an HTMLElement, 
 * it will be appended to the corresponding slot. If it returns a string, the slot will be 
 * replaced with that string.
 * 
 * @async
 * @param {string} templateSelector - A CSS selector pointing to the template element to be rendered.
 * @param {Object.<string, string|Function|AsyncFunction>} props - An object containing properties that correspond to named slots in the template. 
 * Functions (sync or async) should return either a string or an HTMLElement.
 * @returns {Promise<DocumentFragment>} A promise that resolves with the rendered content.
 * @example
 * 
 * document.body.appendChild(
 *   await renderTemplate('#myTemplate', {
 *     title: 'Hello World',
 *     description: async () => {
 *         await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
 *         return 'This is an async description.';
 *     }
 *   })
 * );
 * 
 */
export async function renderTemplate(templateSelector, props) {
    const template = document.querySelector(templateSelector);
    if (!template) {
        console.error(`No template found with selector: ${templateSelector}`);
        return document.createDocumentFragment();  // Return an empty fragment as a fail-safe
    }

    // Clone the content of the template
    const instance = document.importNode(template.content, true);

    const propKeys = Object.keys(props);
    
    // Process each prop value, handling async functions
    await Promise.all(propKeys.map(async (key) => {
        const slot = instance.querySelector(`[name="${key}"]`);
        if (slot) {
            let value = props[key];
            
            // If value is a function (sync or async), evaluate it
            if (typeof value === 'function') {
                value = await value();
            }

            if (value instanceof HTMLElement) {
                // Append the HTMLElement
                slot.parentNode.replaceChild(value, slot);
            } else {
                // Assume it's a string and replace
                const textNode = document.createTextNode(value);
                slot.parentNode.replaceChild(textNode, slot);
            }
        }
    }));

    return instance;
}
