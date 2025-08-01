import React from 'react';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';

// Define the props for the MainLayout component
interface MainLayoutProps {
  /**
   * The content to be rendered within the main content area of the layout.
   */
  children: React.ReactNode;
  /**
   * Optional additional CSS classes to apply to the main layout container.
   * These classes will be merged with the default styles.
   */
  className?: string;
  /**
   * Optional content to be rendered within the Sidebar.
   * If not provided, the Sidebar will still render but might be empty.
   */
  sidebarContent?: React.ReactNode;
}

/**
 * The MainLayout component provides the primary structure for the application.
 * It includes a Header at the top, a Sidebar on the left, and a main content area
 * for the children components.
 */
const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className,
  sidebarContent,
}) => {
  // Default styles for the main content area (the area next to the sidebar)
  const defaultMainContentStyles = `
    flex-1
    overflow-y-auto
    bg-gray-100
    p-6
  `.replace(/\s+/g, ' ').trim();

  // Merge default styles with any provided custom className for the main layout container
  const combinedClassName = `
    flex flex-col min-h-screen
    ${className || ''}
  `.replace(/\s+/g, ' ').trim();

  return (
    <div className={combinedClassName}>
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar>
          {sidebarContent || (
            <nav>
              <ul className="space-y-2">
                <li><a href="/dashboard" className="block px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200">Dashboard</a></li>
                <li><a href="/kanban" className="block px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200">Kanban Board</a></li>
                <li><a href="/tasks" className="block px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200">Task List</a></li>
                <li><a href="/timeline" className="block px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200">Timeline</a></li>
              </ul>
            </nav>
          )}
        </Sidebar>
        <main className={defaultMainContentStyles}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;