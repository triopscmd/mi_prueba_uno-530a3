```typescript
declare module './project.d.ts' {
  /**
   * Defines the structure for a Project.
   */
  export interface Project {
    id: string;
    name: string;
    description: string;
    status: ProjectStatus;
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
    ownerId: string;
    members: string[]; // Array of User IDs
  }

  /**
   * Defines the possible statuses for a Project.
   */
  export type ProjectStatus = 'active' | 'archived' | 'completed' | 'on-hold';

  /**
   * Defines the structure for a User.
   */
  export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  }

  /**
   * Defines the structure for a Task.
   */
  export interface Task {
    id: string;
    projectId: string;
    title: string;
    description?: string;
    status: TaskStatus;
    assigneeId?: string; // User ID
    dueDate?: string; // ISO 8601 date string
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
    priority: TaskPriority;
  }

  /**
   * Defines the possible statuses for a Task.
   */
  export type TaskStatus = 'to-do' | 'in-progress' | 'done' | 'blocked';

  /**
   * Defines the possible priorities for a Task.
   */
  export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

  /**
   * Defines the structure for a Comment on a Task or Project.
   */
  export interface Comment {
    id: string;
    entityId: string; // ID of the task or project the comment belongs to
    entityType: 'task' | 'project';
    userId: string;
    content: string;
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
  }

  /**
   * Defines a generic type for items that can be dragged and dropped, e.g., in a Kanban board.
   */
  export interface DraggableItem {
    id: string;
    type: string; // e.g., 'task', 'column'
    data?: any; // Any additional data associated with the draggable item
  }
}