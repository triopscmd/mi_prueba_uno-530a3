```typescript
import React from 'react';

// Define the props for the Button component, extending native button attributes
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The content to be rendered inside the button (e.g., text, icons).
   */
  children: React.ReactNode;
  /**
   * Optional additional CSS classes to apply to the button.
   * These classes will be merged with the default styles.
   */
  className?: string;
}

/**
 * A reusable Button component with a default Tailwind CSS styling.
 * It accepts all standard HTML button attributes, including onClick, type, and disabled.
 */
const Button: React.FC<ButtonProps> = ({
  children,
  className, // Destructure className to merge with default styles
  ...props // Capture all other standard button props (e.g., onClick, type, disabled)
}) => {
  const defaultStyles = `
    inline-flex items-center justify-center
    rounded-md border border-transparent
    bg-blue-600 px-4 py-2
    text-base font-medium text-white
    shadow-sm
    hover:bg-blue-700
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-colors duration-200 ease-in-out
  `.replace(/\s+/g, ' ').trim(); // Clean up whitespace for a single line

  // Merge the default styles with any provided custom className
  const combinedClassName = `${defaultStyles} ${className || ''}`.trim();

  return (
    <button
      className={combinedClassName}
      {...props} // Spread the rest of the props onto the button element
    >
      {children}
    </button>
  );
};

export default Button;