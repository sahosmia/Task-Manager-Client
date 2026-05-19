import type { Task, TaskFormData } from '../types/task';
import api from "../api/axios";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  total: number;
}

export const allTask = async (filters: { status?: string; priority?: string } = {}): Promise<ApiResponse<PaginatedResponse<Task>>> => {
  try {
    const response = await api.get("/tasks", {
      params: {
        status: filters.status || undefined,
        priority: filters.priority || undefined,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching tasks:", error.response?.data || error.message);
    throw error;
  }
};

export const showTask = async (id: number | string): Promise<ApiResponse<Task>> => {
  try {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching task ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

export const createTask = async (taskData: TaskFormData): Promise<ApiResponse<Task>> => {
  try {
    const response = await api.post("/tasks", taskData);
    return response.data;
  } catch (error: any) {
    console.error("Error creating task:", error.response?.data || error.message);
    throw error;
  }
};

export const updateTask = async (id: number | string, updatedData: Partial<TaskFormData>): Promise<ApiResponse<Task>> => {
  try {
    const response = await api.put(`/tasks/${id}`, updatedData);
    return response.data;
  } catch (error: any) {
    console.error(`Error updating task ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

export const deleteTask = async (id: number | string): Promise<ApiResponse<null>> => {
  try {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error deleting task ${id}:`, error.response?.data || error.message);
    throw error;
  }
};
