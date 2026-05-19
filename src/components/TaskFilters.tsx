import React from 'react';

interface TaskFiltersProps {
    statusFilter: string;
    setStatusFilter: (status: string) => void;
    priorityFilter: string;
    setPriorityFilter: (priority: string) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter
}) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-wrap gap-4 items-center border border-gray-100">
            <span className="text-sm font-medium text-gray-500">Filter By:</span>
            <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-200 rounded-xl p-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
            >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>

            <select 
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="border border-gray-200 rounded-xl p-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
            >
                <option value="">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        </div>
    );
};

export default TaskFilters;
