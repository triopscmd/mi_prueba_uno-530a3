```typescript
import React from 'react';

// Define the props for the Sidebar component
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content to be rendered inside the sidebar (e.g., navigation links, user info).
   */
  children: React.ReactNode;
  /**
   * Optional additional CSS classes to apply to the sidebar.
   * These classes will be merged with the default styles.
   */
  className?: string;
}

/**
 * A reusable Sidebar component for application navigation with default Tailwind CSS styling.
 * It provides a fixed-width container typically used for primary navigation or secondary controls.
 * It accepts all standard HTML div attributes.
 */
const Sidebar: React.FC<SidebarProps> = ({
  children,
  className, // Destructure className to merge with default styles
  ...props // Capture all other standard div props
}) => {
  const defaultStyles = `
    w-64 flex-shrink-0
    bg-gray-800 text-white
    shadow-lg
    h-screen overflow-y-auto
    p-4
  `.replace(/\s+/g, ' ').trim(); // Clean up whitespace for a single line

  // Merge the default styles with any provided custom className
  const combinedClassName = `${defaultStyles} ${className || ''}`.trim();

  return (
    <aside
      className={combinedClassName}
      {...props} // Spread the rest of the props onto the aside element
    >
      {children}
    </aside>
  );
};

export default Sidebar;