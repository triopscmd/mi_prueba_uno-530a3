```typescript
import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

/**
 * DashboardPage component represents the main landing page or control panel
 * of the application. It serves as an overview for the user.
 */
const DashboardPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    alert(`Input Value: ${inputValue}`);
    setInputValue('');
  };

  return (
    <MainLayout>
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="col-span-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Welcome Back!</h3>
            <p className="text-gray-700">
              Welcome to your Asana-Lite dashboard. Get a quick overview of your projects and tasks here.
            </p>
            <div className="mt-4">
              <Button onClick={() => alert('View Projects!')}>View My Projects</Button>
            </div>
          </Card>

          <Card className="col-span-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Quick Task Entry</h3>
            <div className="space-y-4">
              <Input
                id="task-name"
                label="Task Name"
                placeholder="Enter new task here"
                value={inputValue}
                onChange={handleInputChange}
              />
              <Button onClick={handleSubmit} disabled={!inputValue.trim()}>
                Add Task
              </Button>
            </div>
          </Card>

          <Card className="col-span-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Project Status</h3>
            <p className="text-gray-700 mb-2">
              You have <span className="font-semibold text-blue-600">3 active projects</span> and{' '}
              <span className="font-semibold text-green-600">12 tasks completed</span> this week.
            </p>
            <p className="text-gray-700">
              Keep up the great work!
            </p>
          </Card>
        </div>

        <Card className="mt-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Recent Activity</h3>
          <ul className="space-y-2 text-gray-700">
            <li><span className="font-medium text-gray-900">John Doe</span> completed task "Setup initial project structure".</li>
            <li><span className="font-medium text-gray-900">Jane Smith</span> commented on "Design UI components".</li>
            <li><span className="font-medium text-gray-900">You</span> updated "Refine Kanban board layout".</li>
            <li><span className="font-medium text-gray-900">Alex Brown</span> created new task "Implement user authentication".</li>
          </ul>
        </Card>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;