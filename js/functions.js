/* Функция для проверки длины строки. Она нам пригодится для валидации формы*/

const checkLength = (fieldName, maxLenght) => fieldName.length <= maxLenght;

checkLength('проверяемая строка', 20);

/* Функция для проверки, является ли строка палиндромом. Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево.
предусмотрите случай, когда в строке встречаются пробелы. Они не должны учитываться при проверке!*/

const isPalindrome = (string) => {
  const tempString = string
    .toLowerCase()
    .replaceAll(' ', '');

  let i = 0;
  let j = tempString.length - 1;
  let letterOne;
  let letterTwo;

  while (i < j && i !== j) {
    letterOne = tempString.at(i);
    letterTwo = tempString.at(j);

    if (letterOne !== letterTwo) {
      return false;
    }

    i++;
    j--;
  }

  return true;
};

isPalindrome('Лёша на полке клопа нашёл ');

/* Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN
*/

const getNumbers = (string) => {
  if (typeof string === 'number') {
    return string;
  }

  let result = '';
  for (let i = 0; i <= string.length - 1; i++) {
    if (isNaN(parseInt(string.at(i), 10))) {
      continue;
    }

    result += string.at(i);
  }
  return parseInt(result, 10);
};

getNumbers('1 кефир, 0.5 батона');

/* Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины. Символы добавляются в начало строки. Если исходная строка превышает заданную длину, она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца.
Эта функция нам пригодится для формирования адресов файлов.*/

const createPath = (string, minLenght, extraSymbols) => {

  if (string.length < minLenght) {
    let emptyLength = minLenght - string.length;

    while (emptyLength !== 0) {

      while (emptyLength >= extraSymbols.length) {
        string = extraSymbols.slice() + string.slice();
        const length = string.length;
        emptyLength = minLenght - length;
      }

      if (emptyLength < extraSymbols.length && emptyLength !== 0) {
        extraSymbols = extraSymbols.slice(0, emptyLength);
        string = extraSymbols.slice() + string.slice();
        return string;
      }
    }

    return string;
  }

  return string;
};

createPath('qwerty', 4, '0');
