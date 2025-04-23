
type ErrorSeverity = 'error' | 'warning' | 'info';

interface ErrorLogData {
  message: string;
  path?: string;
  timestamp: string;
  severity: ErrorSeverity;
  error?: unknown;
  additionalInfo?: Record<string, unknown>;
}

export const logError = (
  message: string,
  error?: unknown,
  severity: ErrorSeverity = 'error',
  additionalInfo?: Record<string, unknown>
) => {
  const errorLog: ErrorLogData = {
    message,
    path: window.location.pathname,
    timestamp: new Date().toISOString(),
    severity,
    error,
    additionalInfo
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error logged:', errorLog);
  }

  // Here you could add integration with error monitoring services
  // like Sentry or LogRocket in the future
};
