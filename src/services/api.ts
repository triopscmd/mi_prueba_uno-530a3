```typescript
import { Project, Task, User, Comment } from '../types/project';

/**
 * Base URL for the API. It attempts to use a Vite environment variable,
 * falling back to a default localhost address if the variable is not defined.
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * Defines the standard structure for an API response.
 * @template T The expected type of the data returned in a successful response.
 */
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}

/**
 * Handles the raw fetch API response, parsing JSON and checking for HTTP errors.
 * @template T The expected type of the data.
 * @param response The raw Response object from a fetch call.
 * @returns A Promise resolving to an ApiResponse containing data or an error.
 */
const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  if (!response.ok) {
    let errorData: any = {};
    try {
      errorData = await response.json();
    } catch (e) {
      // If response is not JSON, use status text
      errorData.message = response.statusText;
    }
    return {
      success: false,
      error: errorData.message || 'An unknown error occurred',
      statusCode: response.status,
    };
  }
  const data: T = await response.json();
  return { success: true, data, statusCode: response.status };
};

/**
 * A generic request function to abstract common fetch API logic.
 * @template T The expected type of the data in the successful response.
 * @param endpoint The API endpoint (e.g., '/projects', '/tasks/123').
 * @param method The HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE').
 * @param body Optional request body for POST/PUT requests.
 * @returns A Promise resolving to an ApiResponse.
 */
const request = async <T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: Record<string, any>
): Promise<ApiResponse<T>> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    // Authorization header can be added here once authentication is implemented:
    // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
  };

  const config: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    return handleResponse<T>(response);
  } catch (err: any) {
    // Catch network errors (e.g., server unreachable, no internet)
    return {
      success: false,
      error: err.message || 'Network error or request failed',
      statusCode: 0, // Custom status code to indicate client-side/network issue
    };
  }
};

/**
 * An object containing specific API methods for different resources (e.g., Projects, Tasks).
 * Each method returns an ApiResponse Promise, making error handling consistent.
 */
export const api = {
  // --- Project API Endpoints ---
  getProjects: (): Promise<ApiResponse<Project[]>> =>
    request<Project[]>('/projects', 'GET'),

  getProjectById: (id: string): Promise<ApiResponse<Project>> =>
    request<Project>(`/projects/${id}`, 'GET'),

  createProject: (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Project>> =>
    request<Project>('/projects', 'POST', projectData),

  updateProject: (id: string, projectData: Partial<Project>): Promise<ApiResponse<Project>> =>
    request<Project>(`/projects/${id}`, 'PUT', projectData),

  deleteProject: (id: string): Promise<ApiResponse<void>> =>
    request<void>(`/projects/${id}`, 'DELETE'),

  // --- Task API Endpoints ---
  /**
   * Fetches tasks. Can optionally filter tasks by projectId.
   * @param projectId Optional projectId to get tasks for a specific project.
   */
  getTasks: (projectId?: string): Promise<ApiResponse<Task[]>> => {
    const endpoint = projectId ? `/projects/${projectId}/tasks` : '/tasks';
    return request<Task[]>(endpoint, 'GET');
  },

  getTaskById: (id: string): Promise<ApiResponse<Task>> =>
    request<Task>(`/tasks/${id}`, 'GET'),

  createTask: (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Task>> =>
    request<Task>('/tasks', 'POST', taskData),

  updateTask: (id: string, taskData: Partial<Task>): Promise<ApiResponse<Task>> =>
    request<Task>(`/tasks/${id}`, 'PUT', taskData),

  deleteTask: (id: string): Promise<ApiResponse<void>> =>
    request<void>(`/tasks/${id}`, 'DELETE'),

  // --- User API Endpoints (Example) ---
  getUsers: (): Promise<ApiResponse<User[]>> =>
    request<User[]>('/users', 'GET'),

  getUserById: (id: string): Promise<ApiResponse<User>> =>
    request<User>(`/users/${id}`, 'GET'),

  // --- Comment API Endpoints (Example) ---
  /**
   * Fetches comments related to a specific entity (task or project).
   * @param entityId The ID of the task or project the comments belong to.
   */
  getComments: (entityId: string): Promise<ApiResponse<Comment[]>> =>
    request<Comment[]>(`/comments?entityId=${entityId}`, 'GET'),

  createComment: (commentData: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Comment>> =>
    request<Comment>('/comments', 'POST', commentData),

  updateComment: (id: string, commentData: Partial<Comment>): Promise<ApiResponse<Comment>> =>
    request<Comment>(`/comments/${id}`, 'PUT', commentData),

  deleteComment: (id: string): Promise<ApiResponse<void>> =>
    request<void>(`/comments/${id}`, 'DELETE'),
};