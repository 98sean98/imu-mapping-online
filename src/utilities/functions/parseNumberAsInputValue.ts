export const parseNumberAsInputValue = (number: number) =>
  isNaN(number) ? '' : number;
