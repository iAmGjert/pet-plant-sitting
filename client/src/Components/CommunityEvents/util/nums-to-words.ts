const NUMBERS_TO_WORD: Record<string, string> = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen',
  20: 'twenty',
  30: 'thirty',
  40: 'forty',
  50: 'fifty',
  60: 'sixty',
  70: 'seventy',
  80: 'eighty',
  90: 'ninety',
};

const numberToEnglish = function(number: number): string {
  // number less than 20
  if (number < 20) {
    return NUMBERS_TO_WORD[number];
  }
  if (number < 100) {
    const tens = Math.floor(number / 10);
    const ones = number % 10;
    if (ones === 0) {
      return NUMBERS_TO_WORD[tens * 10];
    } else {
      return `${NUMBERS_TO_WORD[tens * 10]}-${NUMBERS_TO_WORD[ones]}`;
    }
  }
  // number less than 1000
  if (number < 10e2) {
    const hundreds = Math.floor(number / 100);
    const remainder = number % 100;
    if (remainder === 0) {
      return `${NUMBERS_TO_WORD[hundreds]} hundred`;
    } else {
      return `${NUMBERS_TO_WORD[hundreds]} hundred ${numberToEnglish(remainder)}`;
    }
  }
  if (number < 10e5) {
    const thousands = Math.floor(number / 1000);
    const remainder = number % 1000;
    if (remainder === 0) {
      return `${numberToEnglish(thousands)} thousand`;
    } else {
      return `${numberToEnglish(thousands)} thousand ${numberToEnglish(remainder)}`;
    }
  }
  if (number < 10e8) {
    const millions = Math.floor(number / 10e5);
    const remainder = number % 10e5;
    if (remainder === 0) {
      return `${numberToEnglish(millions)} million`;
    } else {
      return `${numberToEnglish(millions)} million ${numberToEnglish(remainder)}`;
    }
  }
  if (number < 10e11) {
    const billions = Math.floor(number / 10e8);
    const remainder = number % 10e8;
    if (remainder === 0) {
      return `${numberToEnglish(billions)} billion`;
    } else {
      return `${numberToEnglish(billions)} billion ${numberToEnglish(remainder)}`;
    }
  }
  if (number < 10e14) {
    const trillions = Math.floor(number / 10e11);
    const remainder = number % 10e11;
    if (remainder === 0) {
      return `${numberToEnglish(trillions)} trillion`;
    } else {
      return `${numberToEnglish(trillions)} trillion ${numberToEnglish(remainder)}`;
    }
  }
  if (number < 10e17) {
    const quadrillions = Math.floor(number / 10e14);
    const remainder = number % 10e14;
    if (remainder === 0) {
      return `${numberToEnglish(quadrillions)} quadrillion`;
    } else {
      return `${numberToEnglish(quadrillions)} quadrillion ${numberToEnglish(remainder)}`;
    }
  }
  if (number < 10e20) {
    const quintillions = Math.floor(number / 10e17);
    const remainder = number % 10e17;
    if (remainder === 0) {
      return `${numberToEnglish(quintillions)} quintillion`;
    } else {
      return `${numberToEnglish(quintillions)} quintillion ${numberToEnglish(remainder)}`;
    }
  }
};

export default numberToEnglish;











