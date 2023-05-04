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
    .max(20, "Jar name should be less than 20 characters."),
  common_purpose: yup
    .string()
    .required("Common purpose should not be empty")
    .max(20, "Common purpose should be less than 20 characters."),
  jar_filling_action: yup
    .string()
    .required("Jar filling action should not be empty")
    .max(20, "Jar filling action should be less than 20 characters."),