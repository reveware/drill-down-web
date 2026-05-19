// Backend global error body
// `errors` is a class-validator dump for 400s
export interface ApiError {
  status_code: number;
  name: string;
  message: string;
  errors: string[];
}

export const isApiError = (value: unknown): value is ApiError =>
  typeof value === 'object' &&
  value !== null &&
  'status_code' in value &&
  typeof (value as ApiError).status_code === 'number';

export const getApiErrorStatus = (value: unknown): number | undefined =>
  isApiError(value) ? value.status_code : undefined;

// Used when the server doesn't return a usable message.
// (Eg- transport failure or an error that bypassed the global filter.)
export const GENERIC_ERROR_MESSAGE = 'Something went wrong. Please try again.';

export const getApiErrorMessage = (
  value: unknown,
  fallback: string = GENERIC_ERROR_MESSAGE
): string => {
  if (isApiError(value) && value.message) {
    return value.message;
  }
  if (value instanceof Error && value.message) {
    return value.message;
  }
  return fallback;
};
