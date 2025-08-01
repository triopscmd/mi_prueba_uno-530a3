import React from 'react';
import DashboardPage from './pages/DashboardPage';
import Button from './components/ui/Button';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <header className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to Asana-Lite
        </h1>
        <p className="text-gray-600">
          This is the root component of your application.
        </p>
      </header>

      <main className="w-full max-w-4xl">
        <DashboardPage />
      </main>

      <div className="mt-8">
        <p className="text-gray-700 mb-4">
          Testing our reusable Button component:
        </p>
        <Button onClick={() => alert('Button Clicked!')}>
          Click Me
        </Button>
      </div>
    </div>
  );
}

export default App;