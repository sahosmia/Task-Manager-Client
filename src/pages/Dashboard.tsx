import React, { useState, useEffect } from 'react';
import TaskModal from '../components/TaskModal';
import TaskTable from '../components/TaskTable';
import TaskFilters from '../components/TaskFilters';
import { useTasks } from '../hooks/useTasks';
import type { Task, TaskFormData, FormErrors } from '../types/task';

const Dashboard = () => {
    const {
        tasks,
        loading,
        successMessage,
        setSuccessMessage,
        fetchTasks,
        handleCreateTask,
        handleUpdateTask,
        handleDeleteTask
    } = useTasks();

    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [formData, setFormData] = useState<TaskFormData>({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        due_date: ''
    });

    useEffect(() => {
        fetchTasks({ status: statusFilter, priority: priorityFilter });
    }, [statusFilter, priorityFilter, fetchTasks]);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, setSuccessMessage]);

    const openModal = (mode: 'create' | 'edit', task: Task | null = null) => {
        setModalMode(mode);
        setFormErrors({});
        if (mode === 'edit' && task) {
            setCurrentTaskId(task.id);
            setFormData({
                title: task.title,
                description: task.description || '',
                status: task.status,
                priority: task.priority,
                due_date: task.due_date || ''
            });
        } else {
            setCurrentTaskId(null);
            setFormData({
                title: '',
                description: '',
                status: 'pending',
                priority: 'medium',
                due_date: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormErrors({});

        try {
            let success = false;
            if (modalMode === 'create') {
                success = await handleCreateTask(formData);
            } else if (modalMode === 'edit' && currentTaskId) {
                success = await handleUpdateTask(currentTaskId, formData);
            }
            if (success) setIsModalOpen(false);
        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                setFormErrors(error.response.data.errors || {});
            }
        }
    };

    return (
        <>
            {successMessage && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl text-sm animate-in fade-in slide-in-from-top-2 duration-300">
                    {successMessage}
                </div>
            )}

            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Task Dashboard</h2>
                <button 
                    onClick={() => openModal('create')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition shadow-sm"
                >
                    + Create New Task
                </button>
            </div>

            <TaskFilters 
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                priorityFilter={priorityFilter}
                setPriorityFilter={setPriorityFilter}
            />

            {loading ? (
                <div className="text-center py-12 text-gray-500 font-medium">Loading tasks...</div>
            ) : tasks.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-400">No tasks found.</div>
            ) : (
                <TaskTable 
                    tasks={tasks}
                    onEdit={(task) => openModal('edit', task)}
                    onDelete={handleDeleteTask}
                    onStatusChange={(id, status) => handleUpdateTask(id, { status: status as any })}
                />
            )}

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mode={modalMode}
                formData={formData}
                setFormData={setFormData}
                formErrors={formErrors}
                onSubmit={handleFormSubmit}
            />
        </>
    );
};

export default Dashboard;
