/**
 * Calls elm.setAttribute() for each key/value in props
 */
export function updateElement(elm, props) {
  // const oldProps = elm.getAttributeNames();
  // const removedProps = getRemovedAttributes(oldProps, props);

  // Remove the dead attributes
  // removeAttributes(elm, removedProps);
  // Add/Update the rest
  setAttributes(elm, props);
}


export function setAttributes(elm, props) {
  //TODO: Profile shows this as taking a lot of time to run.
  // Not sure if it creates an array each time, or if .forEach is slow or both.
  Object.keys(props).forEach((attrName) => {
    const value = props[attrName];
    elm.setAttribute(attrName, value);
  });
}

// export function removeAttributes(elm, propNameList) {
//   propNameList.forEach(attrName => elm.removeAttribute(attrName));
// }


// export function getRemovedAttributes(oldProps, newProps) {
//   return oldProps.filter((attrName) => !newProps.hasOwnProperty(attrName))
// }
