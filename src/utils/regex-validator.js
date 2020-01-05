/**
 * Regex validation for inputs
 */

/**
 *
 * @param {String} field - text field item representing an email
 */
export const emailValidator = field => {
  const emailTest = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$/);
  return emailTest.test(field);
};

/**
 *
 * @param {String} password1 - represents user password
 * @param {String} password2 - represents confirmation of user password
 */
export const passwordValidator = (password1, password2) => {
  return (
    password1 === password2 && password1.length < 128 && password1.length > 6
  );
};
