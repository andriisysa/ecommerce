export const FIELD_REQUIRED: string = 'This field is required';
export const INVALID_EMAIL: string = 'Email is invalid';
const INVALID_CONFIRMATION: string = 'Confirmation is not the same as password';
const NOT_ALLOWED_SPECIAL_CHARACTER =
  'Only use letters and numbers. Special characters and spaces are not allowed.';

export const CARD_NUMBER_INVALID: string = 'This credit card number is invalid';
export const EXPIRY_INVALID: string = 'Expiry date is invalid';
export const CVV_INVALID: string = 'CVV is invalid';

export const PRICE_TRANSPARENCY_MSG =
  'No hidden fees or setup costs. Cancel anytime.';

const REGEX_EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const REGEX_SPECIAL_CHARACTER = /[^a-zA-Z0-9_]/;

export const isRequired = (value: string): string => {
  if (!value) return FIELD_REQUIRED;

  return '';
};

export const isEmail = (email: string): string => {
  if (!email) return FIELD_REQUIRED;
  if (!email.match(REGEX_EMAIL)) return INVALID_EMAIL;

  return '';
};
