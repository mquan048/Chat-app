import validator from 'validator';

export const validName = (name) => {
  return validator.isLength(name, { min: 3, max: 255 });
};

export const validEmail = (email) => {
  return validator.isEmail(email);
};

export const validPassword = (password) => {
  return validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  });
};
