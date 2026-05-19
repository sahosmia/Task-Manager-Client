import React from 'react';
import type { TaskFormData, FormErrors } from '../types/task';

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'create' | 'edit';
    formData: TaskFormData;
    setFormData: (data: TaskFormData) => void;
    formErrors: FormErrors;
    onSubmit: (e: React.FormEvent) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
    isOpen,
    onClose,
    mode,
    formData,
    setFormData,
    formErrors,
    onSubmit
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform transition-all animate-in fade-in zoom-in-95 duration-200">
                
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="text-lg font-bold text-gray-900">
                        {mode === 'create' ? 'Create New Task' : 'Edit Task Details'}
                    </h3>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 font-bold text-xl focus:outline-none"
                    >
                        &times;
                    </button>
                </div>

                {/* Modal Form */}
                <form onSubmit={onSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Task Title <span className="text-red-500">*</span></label>
                        <input 
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none"
                            placeholder="E.g., Complete API Documentation"
                        />
                        {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title[0]}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                        <textarea 
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none"
                            placeholder="Describe the structural goals..."
                        />
                        {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description[0]}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Priority</label>
                            <select 
                                value={formData.priority}
                                onChange={(e) => setFormData({...formData, priority: e.target.value as any})}
                                className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                            <select 
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                                className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
                            >
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Due Date</label>
                        <input 
                            type="date"
                            value={formData.due_date}
                            onChange={(e) => setFormData({...formData, due_date: e.target.value})}
                            className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none"
                        />
                        {formErrors.due_date && <p className="text-red-500 text-xs mt-1">{formErrors.due_date[0]}</p>}
                    </div>

                    {/* Button Actions */}
                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition shadow-sm"
                        >
                            {mode === 'create' ? 'Save Task' : 'Update Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;
