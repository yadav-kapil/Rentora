export const validateForm = (formData) => {
  const errors = {};

  const { name, email, password, confirmPassword } = formData;

  // 🔹 Name validation
  if (name !== undefined && !name.trim()) {
    errors.nameErr = "Name is required";
  }

  // 🔹 Email validation
  if (!email) {
    errors.emailErr = "Email is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.emailErr = "Please enter a valid email";
    }
  }

  // 🔹 Password validation
  if (!password) {
    errors.passwordErr = "Password is required";
  } else if (password.length < 6) {
    errors.passwordErr = "Password must be at least 6 characters";
  } else if (password.length > 50) {
    errors.passwordErr = "Password cannot exceed 50 characters";
  } else if (!/^[a-zA-Z0-9@#$%^&+=!]*$/.test(password)) {
    errors.passwordErr = "Password contains invalid characters";
  }

  // 🔹 Confirm password
  if (confirmPassword !== undefined) {
    if (!confirmPassword) {
      errors.confirmPasswordErr = "Please confirm your password";
    } else if (password !== confirmPassword) {
      errors.confirmPasswordErr = "Passwords do not match";
    }
  }

  return errors;
};