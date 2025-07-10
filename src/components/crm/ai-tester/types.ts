
export interface TestResult {
  name: string;
  status: 'pending' | 'running' | 'success' | 'error';
  message?: string;
  duration?: number;
}

export interface AITesterProps {
  userRole: string;
}

export interface TestCase {
  name: string;
  description: string;
  testFunction: () => Promise<void>;
}
