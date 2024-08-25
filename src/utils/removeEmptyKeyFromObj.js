const removeKeyFromObj = (obj = {}) => {
  const clonedObj = { ...obj }; // use lodash lib to copy nested as well
  const keys = Object.keys(clonedObj);
  keys.forEach((key) => {
    // Delete the key if its value is falsy
    if (!clonedObj[key]) delete clonedObj[key];
  });

  return Object.keys(clonedObj) ? clonedObj : null;
};

export default removeKeyFromObj;
