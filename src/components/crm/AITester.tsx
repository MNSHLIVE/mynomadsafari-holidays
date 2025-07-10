
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { TestResult, AITesterProps } from './ai-tester/types';
import { createTestCases } from './ai-tester/test-functions';
import { TestControls } from './ai-tester/TestControls';
import { TestResultsList } from './ai-tester/TestResultsList';
import { TestCoverageInfo } from './ai-tester/TestCoverageInfo';

export const AITester: React.FC<AITesterProps> = ({ userRole }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const { toast } = useToast();

  const runAllTests = async () => {
    setIsRunning(true);
    setProgress(0);
    setTestResults([]);

    const testCases = createTestCases();
    const results: TestResult[] = testCases.map(test => ({
      name: test.name,
      status: 'pending'
    }));
    setTestResults([...results]);

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      setCurrentTest(testCase.name);
      
      results[i] = { ...results[i], status: 'running' };
      setTestResults([...results]);

      const startTime = Date.now();

      try {
        await testCase.testFunction();
        const duration = Date.now() - startTime;
        
        results[i] = {
          ...results[i],
          status: 'success',
          message: 'Test passed successfully',
          duration
        };
        
        toast({
          title: "Test Passed",
          description: `${testCase.name} completed successfully`,
        });

      } catch (error: any) {
        const duration = Date.now() - startTime;
        
        results[i] = {
          ...results[i],
          status: 'error',
          message: error.message || 'Test failed',
          duration
        };

        toast({
          title: "Test Failed",
          description: `${testCase.name}: ${error.message}`,
          variant: "destructive"
        });
      }

      setTestResults([...results]);
      setProgress(((i + 1) / testCases.length) * 100);

      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setIsRunning(false);
    setCurrentTest('');

    const passedTests = results.filter(r => r.status === 'success').length;
    const failedTests = results.filter(r => r.status === 'error').length;

    toast({
      title: "Testing Complete",
      description: `${passedTests} tests passed, ${failedTests} tests failed`,
      variant: failedTests > 0 ? "destructive" : "default"
    });
  };

  const stopTests = () => {
    setIsRunning(false);
    setCurrentTest('');
  };

  if (userRole !== 'admin' && userRole !== 'super_admin') {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            AI Testing is only available for Admin users.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <TestControls 
        isRunning={isRunning}
        progress={progress}
        currentTest={currentTest}
        onRunTests={runAllTests}
        onStopTests={stopTests}
      />

      <TestResultsList testResults={testResults} />

      <TestCoverageInfo />
    </div>
  );
};
