function formatNumberWithSuffix(number: number) {
  let formattedNumber: string = String(number);

  if (number >= 1000 && number < 1000000) {
    formattedNumber = (number / 1000).toFixed(2) + "K";
  } else if (number >= 1000000) {
    formattedNumber = (number / 1000000).toFixed(2) + "M";
  }

  return formattedNumber;
}

export const numbers = {
  suffix: formatNumberWithSuffix,
};
