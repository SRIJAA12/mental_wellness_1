/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 6;
}

/**
 * Validate username
 */
export function isValidUsername(username: string): boolean {
  return username.trim().length >= 3 && username.trim().length <= 20;
}

/**
 * Sanitize string input
 */
export function sanitizeString(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

/**
 * Check if string is empty or whitespace
 */
export function isEmpty(str: string): boolean {
  return !str || str.trim().length === 0;
}

/**
 * Validate mood value
 */
export function isValidMoodValue(value: number): boolean {
  return Number.isInteger(value) && value >= 1 && value <= 4;
}

/**
 * Validate array is not empty
 */
export function isNonEmptyArray<T>(arr: T[]): boolean {
  return Array.isArray(arr) && arr.length > 0;
}
