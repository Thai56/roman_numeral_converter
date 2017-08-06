// Roman Numerals are based off of the following:
// { 1: 'I' }, { 5: 'V' }, { 10: 'X' }, { 50: 'L' }, { 100: 'C' }, { 500: 'D' }, { 1000: 'M' }

//  Don't use the same symbol more than four times in a row. But sometimes IIII is used for four (mostly on clocks).

// Numbers greater than 1,000 are used by placing a dash over the number

// How to convert to Roman Numerals - Break the number down into thousands, hundreds, tens, & ones

// { 1000: 'M' }, { 500: 'D' }, { 100: 'C' }, { 50: 'L' }, { 10: 'X' }, { 5: 'V' }, { 1: 'I' }

// How to remember - "MeDiCaL XaVIer":

const one = 'I';
const five = 'V';
const ten = 'X';
const fifty = 'L';
const hundred = 'C';
const fiveHundred = 'D';
const thousand = 'M';

const helper = {
  handleThousands: (num, numeralArr = []) => {
    const lessThan1K = (num * 1) < 1000;

    const firstChar = (num.toString().charAt(0) * 1);

    const remainNumAfterNumeralAdded = num.toString().slice(1, num.toString().length);

    let i = 0;

    if (lessThan1K) return helper.handleHundreds(num, numeralArr);

    while (i < firstChar) {
      numeralArr.push(thousand);
      i++;
    }

    return helper.handleHundreds(remainNumAfterNumeralAdded, numeralArr);
  },

  handleHundreds: (num, numeralArr = []) => {
    // have the hundreds handle nums > 5, num === 9, num < 9
    const numLessThanHundred = (num * 1) < 100;

    const firstChar = (num.toString().charAt(0) * 1);

    const numGreaterOrEqualToFive = firstChar >= 5;

    const numEqualNine = firstChar === 9;

    const numEqualFour = firstChar === 4;

    console.log('handleHundreds', num, numeralArr, firstChar, numEqualNine, numEqualFour)

    if (numLessThanHundred) return helper.handleTens((num * 1), numeralArr);

    if (numGreaterOrEqualToFive) {
      const remainNumAfterNumeralAdded = num.toString().slice(1, num.toString().length);

      if (numEqualNine) {
        const nineArr = [hundred, thousand];
        nineArr.forEach(numeral => numeralArr.push(numeral));
        console.log('remainNumAfterNumeralAdded', remainNumAfterNumeralAdded, numeralArr)
        return helper.handleTens(remainNumAfterNumeralAdded, numeralArr)
      } else if(firstChar === 5) {
        numeralArr.push(fiveHundred);
        return helper.handleTens(remainNumAfterNumeralAdded, numeralArr);
      } else {
        const tenMinusArr = [fiveHundred];
        let i = 5;
        while(i < firstChar) {
        tenMinusArr.push(hundred);
        i++;
      }
        numeralArr = tenMinusArr.concat(numeralArr);

        return helper.handleTens(remainNumAfterNumeralAdded, numeralArr);
      }

    } else if (numEqualFour) {
      const remainNumAfterNumeralAdded = num.toString().slice(1, num.toString().length);

      const fourHundredArr = [hundred, fiveHundred];

      fourHundredArr.forEach(numeral => numeralArr.push(numeral));

      console.log('numEqualFour', numEqualFour, remainNumAfterNumeralAdded, numeralArr)

      return helper.handleTens(remainNumAfterNumeralAdded, numeralArr);
    }

    let i = 0;

    while(i < firstChar) {
      numeralArr.push(hundred);
      i++;
    }

    const remainNumAfterNumeralAdded = num.toString().slice(1, num.toString().length);

    return helper.handleTens(remainNumAfterNumeralAdded, numeralArr);
  },

  handleTens: (num, numeralArr = []) => {
    // need to account for fifty { in progress }
    // handle above fifty
    const numEqualToTen = (num * 1) === 10;

    const firstChar = typeof num === 'string'
      ? ((num * 1).toString().charAt(0) * 1)
      : (num.toString().charAt(0) * 1);

    if ((num * 1) < 10) return helper.handleOnes((num * 1), numeralArr)

    const numGreaterOrEqualToFive = firstChar >= 5;

    const remainNumAfterNumeralAdded = (num).toString().slice(1, num.toString().length);

    const numEqualFour = firstChar === 4;

    const numEqualNine = firstChar === 9;

    if(numEqualToTen) return helper.handleOnes(num, numeralArr)

    if (numGreaterOrEqualToFive) {
      const fivePlusArr = [fifty];


      if (numEqualNine) {
        const nineArr = [ten, hundred];
        nineArr.forEach(numeral => numeralArr.push(numeral));
        return helper.handleOnes(remainNumAfterNumeralAdded, numeralArr);
      } else if (firstChar === 5) {
        numeralArr.push(fifty);
        return helper.handleOnes(remainNumAfterNumeralAdded, numeralArr);
      } else {
       // fix here
      let i = 5;
      numeralArr.push(fifty);
      while(i < firstChar) {
        numeralArr.push(ten);
        i++;
      }

      // numeralArr = fivePlusArr.concat(numeralArr);

      return helper.handleOnes(remainNumAfterNumeralAdded, numeralArr);
      }
    } else if (numEqualFour) {
      const fourArr = [ten, fifty];
      fourArr.forEach(numeral => numeralArr.push(numeral));
      return helper.handleOnes(remainNumAfterNumeralAdded, numeralArr)
    }

    let i = 0;

    while(i < firstChar){
      numeralArr.push(ten);
      i++;
    }
    return helper.handleOnes(remainNumAfterNumeralAdded, numeralArr);
  },

  handleOnes: (num, numeralArr = []) => {
    console.log('148', num, numeralArr)
    // handle num === 10 /, num > 5, num === 5, num < 5
    // account for zeros i.e 3904, 3906
    const numEqualTen = (num * 1) === 10;

    const numGreaterOrEqualToFive = (num * 1) >= 5;

    const numEqualFour = (num * 1) === 4;

    const numEqualNine = (num * 1) === 9;

    if (numEqualTen) {
      numeralArr.push(ten);
      return numeralArr.join('');
    } else if (numGreaterOrEqualToFive) {
      const numEqualFive = (num * 1) === 5;

      const fivePlusArr = [five];

      if (numEqualFive) {
        numeralArr.push(five);

        return numeralArr.join('')
      } else if (numEqualNine) {
        const nineArr = [one, ten];

        nineArr.forEach(numer => numeralArr.push(numer));
        return numeralArr.join('');
      } else {
        let i = 5;
        while(i < (num * 1)) {
          fivePlusArr.push(one);
          i++;
        }
        console.log(fivePlusArr, '"fivePlusArr"')
        numeralArr = numeralArr.concat(fivePlusArr);
        return numeralArr.join('');
      }
    } else if (numEqualFour) {
      const fourArr = [one, five];
      fourArr.forEach(numeral => numeralArr.push(numeral));
      return numeralArr.join('');
    } else {
      console.log('firing here');
       let i = 0;
      while(i < (num * 1)) {
        numeralArr.push(one);
        i++;
      }
      return numeralArr.join('');
    }
  },
};


export default helper;

// function convertToRoman(num) {
//   if (num >= 1000) {
//     return helper.handleThousands(num);
//   } else if (num >= 500) {
//     return helper.handleHundreds(num);
//   } else if (num >= 100) {
//     return helper.handleHundreds(num);
//   } else if (num >= 50) {
//     return helper.handleTens(num);
//   } else if (num >= 10) {
//     return helper.handleTens(num);
//   } else if (num >= 1) {
//     return helper.handleOnes(num);
//   } else return `Must be Zero ${num}`;
// }
//
//



// convertToRoman(36);
// convertToRoman(2) // should return "II".
// convertToRoman(3) // should return "III".
// convertToRoman(3900) // should return "MMMCM"
// convertToRoman(500) //should return "D"
// convertToRoman(501) // should return "DI"
// need to fix the hundreds
// convertToRoman(649) // should return "DCXLIX"
// convertToRoman(4) // should return "IV".
// convertToRoman(5) // should return "V".
// convertToRoman(9) // should return "IX".
// convertToRoman(12) // should return "XII".
// convertToRoman(16) // should return "XVI".
// convertToRoman(29) // should return "XXIX".
// convertToRoman(44) // should return "XLIV".
// convertToRoman(45) // should return "XLV"
// convertToRoman(68) // should return "LXVIII"
// convertToRoman(83) // should return "LXXXIII"
// convertToRoman(97) // should return "XCVII"

// convertToRoman(500) // should return "D"
// convertToRoman(501) // should return "DI"
// convertToRoman(649) // should return

// convertToRoman(798) // should return "DCCXCVIII"

// convertToRoman(891) // should return "DCCCXCI"

// convertToRoman(1023) //should return "MXXIII"

// convertToRoman(3999) //should return "MMMCMXCIX"
