export const capitalizeWords = (string: string) => {
  // Obtiene una string, la verifica y la devuelve con palabraas con la primera+
  // letra en mayúsculas.
  if (typeof string !== 'string') {
    string = '';
  }
  return string.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
};
