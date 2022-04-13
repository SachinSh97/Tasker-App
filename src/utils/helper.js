/**
 * function provide functionality of debouncing user events
 *
 * @param {func} func event handler that need to be debounce
 * @param {Number} delay time to delay the handler after user stop interactivity
 *
 */
export const debouncing = (func, delay) => {
  let timeOut;
  return function (...args) {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

/**
 * function to get random color
 */
export const getRandomColor = () => {
  let color = '#';
  let letters = '0123456789ABCDEF'.split('');
  color += letters[Math.round(Math.random() * 5)];
  for (var i = 0; i < 5; i++) {
    color += letters[Math.round(Math.random() * 15)];
  }
  return color;
};
