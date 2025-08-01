```typescript
import React from 'react';

// For future development, you might import specific types for a task:
// import { Task } from '../types/kanban';

interface TaskCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The unique identifier for the task. Essential for drag-and-drop functionality.
   */
  id: string;
  /**
   * The title or name of the task.
   */
  title: string;
  /**
   * Optional short description or details for the task.
   */
  description?: string;
  /**
   * Optional additional CSS classes to apply to the task card container.
   * These classes will be merged with the default styles.
   */
  className?: string;
  /**
   * Optional content to be rendered inside the card, overriding or supplementing default content.
   */
  children?: React.ReactNode;
  // In a more advanced version, you might pass the full task object:
  // task: Task;
}

/**
 * A reusable TaskCard component representing an individual task item within a Kanban column.
 * It displays the task title and an optional description, and is designed to be draggable.
 * It accepts all standard HTML div attributes.
 */
const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  className,
  children,
  ...props // Capture all other standard div props
}) => {
  // Default Tailwind CSS styles for the task card.
  // These styles ensure it looks like a distinct, clickable/draggable item.
  const defaultStyles = `
    bg-white rounded-md
    p-3 shadow-sm border border-gray-200
    cursor-grab active:cursor-grabbing
    hover:border-blue-400 transition-all duration-150 ease-in-out
    text-gray-800
  `.replace(/\s+/g, ' ').trim(); // Normalize whitespace

  // Merge the default styles with any provided custom className
  const combinedClassName = `${defaultStyles} ${className || ''}`.trim();

  return (
    <div
      id={id} // Set the id for potential drag-and-drop operations
      className={combinedClassName}
      draggable="true" // Indicate that this element is draggable
      // Future: Add onDragStart, onDragEnd handlers here or in a wrapper component/hook
      {...props} // Spread the rest of the props onto the div element
    >
      {children ? (
        children
      ) : (
        <>
          <h5 className="font-medium text-base mb-1">
            {title}
          </h5>
          {description && (
            <p className="text-sm text-gray-600">
              {description}
            </p>
          )}
          {/* Future: Add more details like assignee, due date, tags, etc. */}
        </>
      )}
    </div>
  );
};

export default TaskCard;