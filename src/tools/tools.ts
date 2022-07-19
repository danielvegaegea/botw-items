export const capitalizeWords = (string: string) => {
  // Gets a string, verifies it and returns it with capitalized words.
  if (typeof string !== 'string') {
    string = '';
  }
  return string.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
};
