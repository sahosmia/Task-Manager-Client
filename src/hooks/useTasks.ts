import { useState, useCallback } from 'react';
import { allTask, createTask, updateTask, deleteTask } from '../util/task';
import type { Task, TaskFormData } from '../types/task';

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchTasks = useCallback(async (filters: { status?: string; priority?: string } = {}) => {
        setLoading(true);
        try {
            const response = await allTask(filters);
            if (response && response.success) {
                setTasks(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleCreateTask = async (formData: TaskFormData) => {
        const response = await createTask(formData);
        if (response.success) {
            await fetchTasks();
            setSuccessMessage('Task created successfully!');
            return true;
        }
        return false;
    };

    const handleUpdateTask = async (id: number, formData: Partial<TaskFormData>) => {
        const response = await updateTask(id, formData);
        if (response.success) {
            setTasks(prev => prev.map(t => t.id === id ? { ...t, ...formData as any } : t));
            setSuccessMessage('Task updated successfully!');
            return true;
        }
        return false;
    };

    const handleDeleteTask = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            const response = await deleteTask(id);
            if (response.success) {
                setTasks(prev => prev.filter(t => t.id !== id));
                setSuccessMessage('Task deleted successfully!');
                return true;
            }
        }
        return false;
    };

    return {
        tasks,
        loading,
        successMessage,
        setSuccessMessage,
        fetchTasks,
        handleCreateTask,
        handleUpdateTask,
        handleDeleteTask
    };
};
