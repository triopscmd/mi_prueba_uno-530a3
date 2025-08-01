```typescript
import React from 'react';

interface ModalProps {
  /**
   * Controls the visibility of the modal.
   */
  isOpen: boolean;
  /**
   * Callback function to be called when the modal is requested to be closed.
   * This is typically triggered by clicking the close button or the backdrop.
   */
  onClose: () => void;
  /**
   * The content to be rendered inside the modal body.
   */
  children: React.ReactNode;
  /**
   * Optional title for the modal, displayed in the header.
   */
  title?: string;
  /**
   * Optional additional CSS classes to apply to the modal content area.
   * These classes will be merged with the default styles.
   */
  className?: string;
}

/**
 * A reusable Modal component with a default Tailwind CSS styling.
 * It provides an overlay and a content area that can be controlled via `isOpen` and `onClose` props.
 * The modal can be closed by clicking the backdrop or the close button.
 */
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className,
}) => {
  if (!isOpen) {
    return null; // Don't render anything if the modal is not open
  }

  // Styles for the modal content area (the white box)
  const defaultContentStyles = `
    relative bg-white rounded-lg shadow-xl p-6
    w-full max-w-lg mx-auto my-8
    transform transition-all
    scale-100 opacity-100
  `.replace(/\s+/g, ' ').trim(); // Normalize whitespace

  // Merge default styles with any provided custom className for the content area
  const combinedContentClassName = `${defaultContentStyles} ${className || ''}`.trim();

  return (
    // Modal Overlay (backdrop)
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-75 transition-opacity flex items-center justify-center p-4 sm:p-0"
      aria-labelledby={title ? 'modal-title' : undefined}
      role="dialog"
      aria-modal="true"
      // Close modal if the backdrop is clicked directly
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Modal Content */}
      <div className={combinedContentClassName}>
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <h3 id="modal-title" className="text-xl font-semibold text-gray-900">
            {title || 'Modal'}
          </h3>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            onClick={onClose}
            aria-label="Close"
          >
            {/* Close Icon (X) */}
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-4 text-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;