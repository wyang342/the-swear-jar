import * as yup from "yup";

export const signInSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be at least 8 characters")
    .required("Password is required"),
});

export const signUpSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be at least 8 characters")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .required("Please re-enter your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const changePasswordSchema = yup.object({
  currentPassword: yup
    .string()
    .min(8, "Current password should be at least 8 characters")
    .required("Current password is required"),
  newPassword: yup
    .string()
    .min(8, "New password should be at least 8 characters")
    .required("New password is required"),
  newPasswordConfirmation: yup
    .string()
    .required("Please re-enter your new password")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

export const editProfileSchema = yup.object({
  newNickname: yup
    .string()
    .required("Nickname should not be empty")
    .max(20, "Nickname should be less than 20 characters."),
});

export const createJarSchema = yup.object({
  name: yup
    .string()
    .required("Jar name should not be empty")
    .max(30, "Jar name should be less than 30 characters."),
  commonPurpose: yup
    .string()
    .max(50, "Common purpose should be less than 50 characters."),
  jarFillingAction: yup
    .string()
    .required("Jar filling action should not be empty")
    .max(50, "Jar filling action should be less than 50 characters."),
  costPerAction: yup
    .number()
    .required("Money per action should not be empty")
    .positive("Money per action should be positive")
    .integer("Money per action should be an integer")
    .max(1000, "Money per action should be less than 1,000"),
  goalAmount: yup
    .number()
    .positive("Goal should be positive")
    .integer("Goal should be an integer")
    .max(1000000, "Goal should be less than 1,000,000"),
});
