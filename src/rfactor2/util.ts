export const castIntFloat = (value: any): any => {
  if (!isNaN(value)) {
    value = value % 1 === 0 ? parseInt(value, 10) : parseFloat(value);
  }
  return value;
};
