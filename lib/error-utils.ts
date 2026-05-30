const NETWORK_ERROR_PATTERNS = [
  /ECONNREFUSED/i,
  /ERR_CONNECTION_REFUSED/i,
  /Failed to fetch/i,
  /Network request failed/i,
  /NetworkError/i,
  /fetch failed/i,
  /ENOTFOUND/i,
];

export function getApiConnectionErrorMessage(error: unknown): string | null {
  if (!(error instanceof Error)) return null;
  if (!NETWORK_ERROR_PATTERNS.some((pattern) => pattern.test(error.message)))
    return null;

  return "Can't reach the backend server. Check that it is running and that EXPO_PUBLIC_API_BASE_URL points to the right address.";
}
