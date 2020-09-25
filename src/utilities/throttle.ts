export const throttle = (func: Function, duration: number) => {
  let shouldWait = false;
  return function (...args: any) {
    if (!shouldWait) {
      func.apply(this, args);
      shouldWait = true;
      setTimeout(function () {
        shouldWait = false;
      }, duration);
    }
  };
};
