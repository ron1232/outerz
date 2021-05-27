export const required = (value) => (value ? undefined : `is required`);
export const mustBeNumber = (value) =>
  isNaN(value) ? 'Must be a number' : undefined;
export const minValue = (min) => (value) =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
export const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'is invalid'
    : undefined;
export const url = (value) =>
  value && !/^[a-z\d-]+$/.test(value) ? 'Invalid URL' : undefined;
export const country = (value) =>
  value === 'Choose Country...' ? 'is required' : undefined;
export const select = (value) =>
  value && value.includes('Choose') ? 'is required' : undefined;
export const recordLevel = (values) => {
  const errors = {};
  if (values.password !== values.confirmPassword) {
    errors.password = 'Must match';
    errors.confirmPassword = 'Must match';
  }
  if (values.email && email(values.email)) {
    errors.email = 'is invalid';
  }
  return errors;
};

export const signIn = (values) => {
  const errors = {};
  if (values.email && email(values.email)) {
    errors.email = 'is invalid';
  }
  return errors;
};

export const productValidate = (values) => {
  const errors = {};
  if (values.price && isNaN(values.price)) {
    errors.price = 'Must be a number';
  }
  if (values.url && url(values.url)) {
    errors.url = 'Invalid URL';
  }
  if (values.countInStock && isNaN(values.countInStock)) {
    errors.countInStock = 'Must be a number';
  }
  return errors;
};

export const composeValidators = (...validators) => (value) =>
  validators.reduce((acc, cur) => acc || cur(value), undefined);
