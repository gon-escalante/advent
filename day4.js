const processByLine = require('./utils/betterProcessByLine');
const codes = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid',
  'cid'
];

const regex = /(?<code>\w{3}):[^\s]*/g

const countInvalidPassports = async () => {
  let count = 0;
  let currentCodes = [];
  const requiredCodes = codes.filter(code => code !== 'cid');
  await processByLine('./day4.input', line => {
    if(line === '') {
      const isValid = requiredCodes.every(requieredCode => currentCodes.findIndex(current => current === requieredCode) > -1);
      if (isValid) {
        count++;
      }
      currentCodes = [];
      return;
    }
    const results = line.matchAll(regex);
    for (const result of results) {
      currentCodes.push(result.groups.code);
    }
  })
  const isValid = requiredCodes.every(requieredCode => currentCodes.findIndex(current => current === requieredCode) > -1);
  if (isValid) {
    count++;
  }
  console.log(count);
}

// countInvalidPassports();


// part two
const fourDigitValidator = value => !!value.match(/[0-9]{4}/);

const createRangeValidator = (min, max) => (value) => min <= parseInt(value) && max >= parseInt(value);

const heightValidator = (height) => {
  const { value, unit } = height.match(/(?<value>[0-9]*)(?<unit>cm|in)/)?.groups || {};
  const intValue = parseInt(value);
  switch(unit) {
    case 'cm':
      return intValue >= 150 && intValue <= 193;
    case 'in':
      return intValue >= 59 && intValue <= 76;
    default:
      return false;
  }
}

const hairColorValidator = (color) => !!color.match(/#[0-9|a-f]{6}(\s|$)/)

const eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
const eyeColorValidator = (color) => eyeColors.findIndex(eyeColor => eyeColor === color) > -1;

const pidValidator = (pid) => pid.match(/^[0-9]{9}(\s|$)/)

const fields = [
  { code: 'byr', validators: [fourDigitValidator, createRangeValidator(1920, 2002)] },
  { code: 'iyr', validators: [fourDigitValidator, createRangeValidator(2010, 2020)] },
  { code: 'eyr', validators: [fourDigitValidator, createRangeValidator(2020, 2030)] },
  { code: 'hgt', validators: [heightValidator] },
  { code: 'hcl', validators: [hairColorValidator] },
  { code: 'ecl', validators: [eyeColorValidator] },
  { code: 'pid', validators: [pidValidator] },
  { code: 'cid', validators: [] }
];
const regex2 = /(?<code>\w{3}):(?<value>[^\s|\n]*)/g


const countInvalidPassports2 = async () => {
  let count = 0;
  let currentFields = [];
  const requiredFields = fields.filter(field => field.code !== 'cid');
  await processByLine('./day4.input', line => {
    if(line === '') {
      const isValid = requiredFields.every(requiredField => {
        const field = currentFields.find(current => current.code === requiredField.code);
        return field && requiredField.validators.every(validator => validator(field.value))
      });
      if (isValid) {
        count++;
      }
      currentFields = [];
      return;
    }
    const results = line.matchAll(regex2);
    for (const result of results) {
      currentFields.push(result.groups);
    }
  })
  const isValid = requiredFields.every(requiredField => {
    const field = currentFields.find(current => current.code === requiredField.code);
    return field && requiredField.validators.every(validator => validator(field.value))
  });
  if (isValid) {
    count++;
  }
  console.log(count);
}

countInvalidPassports2();