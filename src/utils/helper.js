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
    let context = this;
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      func(...args).call(context);
    }, delay);
  };
};
