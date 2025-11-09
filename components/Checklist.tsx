
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
            <table className="w-full text-sm text-left text-slate-300 table-fixed">
                <thead className="text-xs text-sky-300 uppercase bg-slate-900/50">
                    <tr>
                        <th scope="col" className="p-2 w-1/6">Task Category</th>
                        <th scope="col" className="p-2 w-2/5">Task Description</th>
                        <th scope="col" className="p-2">Deadline</th>
                        <th scope="col" className="p-2">Responsible</th>
                        <th scope="col" className="p-2">Status</th>
                        <th scope="col" className="p-2 text-center">Actions</th>
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
