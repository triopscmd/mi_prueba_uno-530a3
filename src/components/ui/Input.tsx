```typescript
import React from 'react';

// Define the props for the Input component, extending native input attributes
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Optional additional CSS classes to apply to the input.
   * These classes will be merged with the default styles.
   */
  className?: string;
  /**
   * The label for the input field.
   */
  label?: string;
  /**
   * The unique identifier for the input field, useful for accessibility (label's htmlFor).
   */
  id?: string;
}

/**
 * A reusable Input component with a default Tailwind CSS styling.
 * It accepts all standard HTML input attributes (e.g., type, value, onChange, placeholder, disabled).
 * It can also optionally render a label associated with the input.
 */
const Input: React.FC<InputProps> = ({
  className, // Destructure className to merge with default styles
  label,
  id,
  ...props // Capture all other standard input props (e.g., type, value, onChange)
}) => {
  const defaultStyles = `
    block w-full
    rounded-md border border-gray-300
    px-3 py-2
    text-gray-900 placeholder-gray-400
    shadow-sm
    focus:border-blue-500 focus:ring-blue-500
    sm:text-sm
    disabled:opacity-50 disabled:cursor-not-allowed
  `.replace(/\s+/g, ' ').trim(); // Clean up whitespace for a single line

  // Merge the default styles with any provided custom className
  const combinedClassName = `${defaultStyles} ${className || ''}`.trim();

  return (
    <div className="relative">
      {label && id && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        className={combinedClassName}
        {...props} // Spread the rest of the props onto the input element
      />
    </div>
  );
};

export default Input;