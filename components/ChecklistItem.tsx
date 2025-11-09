
import React from 'react';
import { Task, TaskStatus } from '../types';

interface ChecklistItemProps {
    task: Task;
    onUpdateTask: (id: number, field: keyof Task, value: string) => void;
    onDeleteTask: (id: number) => void;
    onMoveTask: (id: number, direction: 'up' | 'down') => void;
}

const inputStyles = "bg-slate-700/50 border border-slate-600 rounded-md py-1 px-2 w-full focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:outline-none transition";
const buttonStyles = "px-2 py-1 rounded-md text-slate-300 hover:bg-slate-600 transition";

const ChecklistItem: React.FC<ChecklistItemProps> = ({ task, onUpdateTask, onDeleteTask, onMoveTask }) => {

    const handleChange = (field: keyof Task, value: string) => {
        onUpdateTask(task.id, field, value);
    };

    return (
        <tr className="border-b border-slate-700">
            <td className="p-2 w-1/6">
                <input
                    type="text"
                    value={task.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className={inputStyles}
                    aria-label="Task Category"
                />
            </td>
            <td className="p-2 w-2/5">
                <input
                    type="text"
                    value={task.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className={inputStyles}
                    aria-label="Task Description"
                />
            </td>
            <td className="p-2">
                <input
                    type="date"
                    value={task.deadline}
                    onChange={(e) => handleChange('deadline', e.target.value)}
                    className={inputStyles}
                    aria-label="Deadline"
                />
            </td>
            <td className="p-2">
                <input
                    type="text"
                    value={task.responsible}
                    onChange={(e) => handleChange('responsible', e.target.value)}
                    className={inputStyles}
                    placeholder="Owner"
                    aria-label="Responsible"
                />
            </td>
            <td className="p-2">
                <select
                    value={task.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className={`${inputStyles} cursor-pointer`}
                    aria-label="Status"
                >
                    {Object.values(TaskStatus).map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </td>
            <td className="p-2 text-center">
                <div className="flex items-center justify-center gap-1">
                    <button onClick={() => onMoveTask(task.id, 'up')} className={buttonStyles} aria-label="Move task up">↑</button>
                    <button onClick={() => onMoveTask(task.id, 'down')} className={buttonStyles} aria-label="Move task down">↓</button>
                    <button onClick={() => onDeleteTask(task.id)} className={`${buttonStyles} hover:bg-red-500/50 hover:text-red-300`} aria-label="Delete task">✕</button>
                </div>
            </td>
        </tr>
    );
};

export default ChecklistItem;
