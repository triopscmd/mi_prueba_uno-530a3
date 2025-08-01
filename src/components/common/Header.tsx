```typescript
import React from 'react';

// Define the props for the Header component, extending native header attributes
interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optional additional CSS classes to apply to the header.
   * These classes will be merged with the default styles.
   */
  className?: string;
  /**
   * The title to display in the header. Defaults to 'Asana-Lite' if not provided.
   */
  title?: string;
}

/**
 * A reusable Header component for the application with default Tailwind CSS styling.
 * It typically sits at the top of the page, displaying the application title.
 * It accepts all standard HTML header attributes.
 */
const Header: React.FC<HeaderProps> = ({
  className,
  title = 'Asana-Lite', // Default title for the application
  ...props // Capture all other standard header props
}) => {
  const defaultStyles = `
    bg-blue-600 text-white shadow-md
    py-4 px-6
    w-full
    flex items-center justify-between
  `.replace(/\s+/g, ' ').trim(); // Normalize whitespace

  // Merge the default styles with any provided custom className
  const combinedClassName = `${defaultStyles} ${className || ''}`.trim();

  return (
    <header
      className={combinedClassName}
      {...props} // Spread the rest of the props onto the header element
    >
      <div className="container mx-auto"> {/* Use container for max-width and centering */}
        <h1 className="text-2xl font-bold">
          {title}
        </h1>
        {/* Placeholder for future navigation or user elements */}
      </div>
    </header>
  );
};

export default Header;