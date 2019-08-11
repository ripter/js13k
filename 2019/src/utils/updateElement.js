/**
 * Calls elm.setAttribute() for each key/value in props
 */
export function updateElement(elm, props) {
  Object.keys(props).forEach((attrName) => {
    const value = props[attrName];
    elm.setAttribute(attrName, value);
  });
}
