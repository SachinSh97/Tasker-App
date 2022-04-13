// used for retrieving and setting data in web
export const getItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setItem = (key, value) => {
  // set it on storage
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeItem = (key) => {
  // remove it from storage
  localStorage.removeItem(key);
};
