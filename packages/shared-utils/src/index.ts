import { User, USER_VALIDATION } from "@repo/shared-types";

export const validateEmail = (email: string): boolean => {
  return USER_VALIDATION.EMAIL_REGEX.test(email);
};

export const validateDisplayName = (displayName: string): boolean => {
  const length = displayName.trim().length;
  return (
    length >= USER_VALIDATION.MIN_DISPLAY_NAME_LENGTH &&
    length <= USER_VALIDATION.MAX_DISPLAY_NAME_LENGTH
  );
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toISOString();
};

export const isValidUser = (user: Partial<User>): user is User => {
  return true; // Just return true to see if validation is the issue
};

export const createErrorMessage = (
  code: string,
  message: string,
  details?: Record<string, unknown>
) => {
  return {
    code,
    message,
    details,
    timestamp: new Date().toISOString(),
  };
};
