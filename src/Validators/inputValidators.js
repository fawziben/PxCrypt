const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^[567][0-9]{8}$/;

  phoneRegex.test(phoneNumber);
};

export { validateEmail, validatePhoneNumber };
