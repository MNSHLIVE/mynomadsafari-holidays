
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Play, Square } from 'lucide-react';

interface TestControlsProps {
  isRunning: boolean;
  progress: number;
  currentTest: string;
  onRunTests: () => void;
  onStopTests: () => void;
}

export const TestControls: React.FC<TestControlsProps> = ({
  isRunning,
  progress,
  currentTest,
  onRunTests,
  onStopTests
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="h-5 w-5" />
          AI-Powered CRM Testing
        </CardTitle>
        <p className="text-sm text-gray-600">
          Automatically test all CRM functions with realistic travel data
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Button 
            onClick={onRunTests} 
            disabled={isRunning}
            className="flex items-center gap-2"
          >
            <Play className="h-4 w-4" />
            {isRunning ? 'Running Tests...' : 'Run All Tests'}
          </Button>
          
          {isRunning && (
            <Button 
              onClick={onStopTests} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <Square className="h-4 w-4" />
              Stop Tests
            </Button>
          )}
        </div>

        {isRunning && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress: {Math.round(progress)}%</span>
              {currentTest && <span>Current: {currentTest}</span>}
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
