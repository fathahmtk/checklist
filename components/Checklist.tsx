import React from 'react';
import { Task } from '../types';
import ChecklistItem from './ChecklistItem';

interface ChecklistProps {
    tasks: Task[];
    onUpdateTask: (id: number, field: keyof Task, value: string) => void;
    onDeleteTask: (id: number) => void;
    onMoveTask: (id: number, direction: 'up' | 'down') => void;
}

const Checklist: React.FC<ChecklistProps> = ({ tasks, onUpdateTask, onDeleteTask, onMoveTask }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-600">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th scope="col" className="p-3 font-medium w-1/6">Task Category</th>
                        <th scope="col" className="p-3 font-medium w-2/5">Task Description</th>
                        <th scope="col" className="p-3 font-medium">Deadline</th>
                        <th scope="col" className="p-3 font-medium">Responsible</th>
                        <th scope="col" className="p-3 font-medium">Status</th>
                        <th scope="col" className="p-3 font-medium text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <ChecklistItem
                            key={task.id}
                            task={task}
                            onUpdateTask={onUpdateTask}
                            onDeleteTask={onDeleteTask}
                            onMoveTask={onMoveTask}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Checklist;