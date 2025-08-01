```typescript
import React from 'react';

// Define the props for the Card component, extending native div attributes
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content to be rendered inside the card.
   */
  children: React.ReactNode;
  /**
   * Optional additional CSS classes to apply to the card.
   * These classes will be merged with the default styles.
   */
  className?: string;
}

/**
 * A reusable Card component with a default Tailwind CSS styling.
 * It serves as a generic container for content, providing a distinct visual separation.
 * It accepts all standard HTML div attributes.
 */
const Card: React.FC<CardProps> = ({
  children,
  className, // Destructure className to merge with default styles
  ...props // Capture all other standard div props
}) => {
  const defaultStyles = `
    bg-white
    rounded-lg
    shadow-md
    p-6
    border border-gray-200
  `.replace(/\s+/g, ' ').trim(); // Clean up whitespace for a single line

  // Merge the default styles with any provided custom className
  const combinedClassName = `${defaultStyles} ${className || ''}`.trim();

  return (
    <div
      className={combinedClassName}
      {...props} // Spread the rest of the props onto the div element
    >
      {children}
    </div>
  );
};

export default Card;