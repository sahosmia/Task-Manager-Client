import React from 'react';
import type { Task } from '../types/task';

interface TaskTableProps {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (id: number) => void;
    onStatusChange: (id: number, status: string) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onEdit, onDelete, onStatusChange }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Due Date</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                    {tasks.map((task) => (
                        <tr key={task.id} className="hover:bg-gray-50/50 transition">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-semibold text-gray-900">{task.title}</div>
                                <div className="text-sm text-gray-400 truncate max-w-xs">{task.description}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    ${task.priority === 'high' ? 'bg-red-50 text-red-700' : 
                                      task.priority === 'medium' ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'}`}>
                                    {task.priority}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {task.due_date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <select 
                                    value={task.status}
                                    onChange={(e) => onStatusChange(task.id, e.target.value)}
                                    className={`border rounded-xl p-1.5 text-xs font-semibold focus:outline-none transition-colors
                                        ${task.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' : 
                                          task.status === 'in-progress' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-orange-50 text-orange-700 border-orange-200'}`}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                <button 
                                    onClick={() => onEdit(task)}
                                    className="text-indigo-600 hover:text-indigo-900 transition"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => onDelete(task.id)}
                                    className="text-red-500 hover:text-red-700 transition"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskTable;
