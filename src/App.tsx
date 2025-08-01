```typescript
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import KanbanBoardPage from './pages/KanbanBoardPage';
import TaskListPage from './pages/TaskListPage';
import TimelinePage from './pages/TimelinePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/kanban" element={<KanbanBoardPage />} />
        <Route path="/tasks" element={<TaskListPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        {/* Future routes can be added here, e.g., /projects, /settings, /auth */}
        {/* Add a catch-all route for 404 Not Found if desired: */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;