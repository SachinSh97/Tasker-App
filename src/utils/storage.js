// used for retrieving and setting data in web
export const getItem = (key) => {
  try {
    const serialzedItem = localStorage.getItem(key);
    if (serialzedItem === null) {
      return undefined;
    }
    return JSON.parse(serialzedItem);
  } catch (err) {
    return undefined;
  }
};

export const setItem = (key, value) => {
  // set it on storage
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.log('Error : Storage is not accessable');
  }
};

export const removeItem = (key) => {
  // remove it from storage
  localStorage.removeItem(key);
};
