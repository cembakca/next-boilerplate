export const uppercase = (string) => {
  const letters = { i: 'İ', ş: 'Ş', ğ: 'Ğ', ü: 'Ü', ö: 'Ö', ç: 'Ç', ı: 'I' };
  const replacedString = string.replace(/(([iışğüçö]))/g, (letter) => letters[letter]);
  return replacedString.toUpperCase();
};

export const lowercase = (string) => {
  const letters = { İ: 'i', I: 'ı', Ş: 'ş', Ğ: 'ğ', Ü: 'ü', Ö: 'ö', Ç: 'ç' };
  const replacedString = string.replace(/(([iışğüçö]))/g, (letter) => letters[letter]);
  return replacedString.toLowerCase();
};

export function slugify(text) {
  if (typeof text !== 'string') {
    return undefined;
  }

  const trMap = {
    çÇ: 'c',
    ğĞ: 'g',
    şŞ: 's',
    üÜ: 'u',
    ıİ: 'i',
    öÖ: 'o',
  };

  const newText = Object.keys(trMap).reduce((acc, key) => {
    /* eslint-disable-next-line */
    return acc.replace(new RegExp('[' + key + ']', 'g'), trMap[key]);
  }, text);

  return newText
    .replace(/[^-a-zA-Z0-9\s]+/gi, '') // remove non-alphanumeric chars
    .replace(/\s/gi, '-') // convert spaces to dashes
    .replace(/[-]+/gi, '-') // trim repeated dashes
    .toLowerCase();
}

export function checkOnlyLetters(text) {
  const regex = /^[a-zA-Z ğüşöçıİĞÜŞÖÇ]*$/;
  return text === '' || regex.test(text);
}
