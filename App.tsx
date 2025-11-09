import React, { useState, useMemo, useEffect } from 'react';
import { Task, TaskStatus, LogEntry } from './types';
import { INITIAL_TASKS, INITIAL_LOGS } from './constants';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import Checklist from './components/Checklist';

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
    const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);

    // Load data from localStorage on initial render
    useEffect(() => {
        const savedTasks = localStorage.getItem('hydro_checklist_tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
        const savedLogs = localStorage.getItem('hydro_checklist_logs');
        if (savedLogs) {
            setLogs(JSON.parse(savedLogs));
        }
    }, []);

    // --- Task Handlers ---
    const handleUpdateTask = (id: number, field: keyof Task, value: string) => {
        setTasks(prev => prev.map(task => task.id === id ? { ...task, [field]: value } : task));
    };

    const handleAddTask = () => {
        const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
        setTasks(prev => [...prev, { id: newId, category: '', description: '', deadline: '', responsible: '', status: TaskStatus.Pending }]);
    };

    const handleDeleteTask = (id: number) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            setTasks(prev => prev.filter(task => task.id !== id));
        }
    };

    const handleMoveTask = (id: number, direction: 'up' | 'down') => {
        const index = tasks.findIndex(task => task.id === id);
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === tasks.length - 1)) return;
        
        const newTasks = [...tasks];
        const taskToMove = newTasks.splice(index, 1)[0];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        newTasks.splice(newIndex, 0, taskToMove);
        setTasks(newTasks);
    };

    // --- Log Handlers ---
    const handleUpdateLog = (id: number, field: keyof LogEntry, value: string) => {
        setLogs(prev => prev.map(log => log.id === id ? { ...log, [field]: value } : log));
    };

    const handleAddLog = () => {
        const newId = logs.length > 0 ? Math.max(...logs.map(l => l.id)) + 1 : 1;
        setLogs(prev => [...prev, { id: newId, date: new Date().toISOString().split('T')[0], workedOn: '', hours: '', blockers: '', nextActions: '' }]);
    };

    const handleDeleteLog = (id: number) => {
        if (window.confirm('Are you sure you want to delete this log entry?')) {
            setLogs(prev => prev.filter(log => log.id !== id));
        }
    };

    // --- Data Persistence ---
    const saveData = () => {
        localStorage.setItem('hydro_checklist_tasks', JSON.stringify(tasks));
        localStorage.setItem('hydro_checklist_logs', JSON.stringify(logs));
        alert('Data saved successfully!');
    };

    const loadData = () => {
        if (window.confirm('This will overwrite any unsaved changes. Are you sure?')) {
            const savedTasks = localStorage.getItem('hydro_checklist_tasks');
            if (savedTasks) setTasks(JSON.parse(savedTasks));
            const savedLogs = localStorage.getItem('hydro_checklist_logs');
            if (savedLogs) setLogs(JSON.parse(savedLogs));
            alert('Data loaded from local storage.');
        }
    };

    const clearData = () => {
        if (window.confirm('This will clear all data from local storage. Are you sure?')) {
            localStorage.removeItem('hydro_checklist_tasks');
            localStorage.removeItem('hydro_checklist_logs');
            alert('Local storage cleared.');
        }
    };

    // --- CSV Export ---
    const exportToCsv = (data: (Task | LogEntry)[], filename: string) => {
        if (data.length === 0) return;
        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(','),
            ...data.map(row => 
                headers.map(header => `"${String((row as any)[header]).replace(/"/g, '""')}"`).join(',')
            )
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    // --- Calculations for Progress Bar ---
    const completedTasks = useMemo(() => tasks.filter(task => task.status === TaskStatus.Completed).length, [tasks]);
    const totalTasks = tasks.length;
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    // --- Styles ---
    const cardStyles = "mt-8 bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden";
    const buttonStyles = "px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    const primaryButton = `${buttonStyles} bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500`;
    const secondaryButton = `${buttonStyles} bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 focus:ring-blue-500`;
    const inputStyles = "bg-white border border-slate-300 rounded-md py-1 px-2 w-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition";
    const textareaStyles = `${inputStyles} min-h-[40px]`;

    return (
        <div className="min-h-screen bg-slate-100 font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <Header />
                
                <main className={cardStyles}>
                    <div className="p-6 border-b border-slate-200">
                        <h2 className="text-lg font-semibold text-slate-800 mb-2">Project Progress</h2>
                        <p className="text-sm text-slate-500 mb-4">{completedTasks} of {totalTasks} tasks completed</p>
                        <ProgressBar progress={progress} />
                    </div>
                     <div className="p-4 bg-slate-50 flex flex-wrap gap-3 border-b border-slate-200">
                        <button onClick={handleAddTask} className={primaryButton}>Add Task</button>
                        <button onClick={saveData} className={secondaryButton}>Save</button>
                        <button onClick={loadData} className={secondaryButton}>Load</button>
                        <button onClick={clearData} className={secondaryButton}>Clear Storage</button>
                        <button onClick={() => exportToCsv(tasks, 'checklist.csv')} className={secondaryButton}>Export CSV</button>
                    </div>
                    <Checklist tasks={tasks} onUpdateTask={handleUpdateTask} onDeleteTask={handleDeleteTask} onMoveTask={handleMoveTask} />
                </main>

                <section className={cardStyles}>
                    <div className="p-6 border-b border-slate-200">
                         <h2 className="text-lg font-semibold text-slate-800">Daily Process Log</h2>
                        <p className="text-sm text-slate-500 mt-1">Capture your daily progress, blockers, and next steps.</p>
                    </div>
                    <div className="p-4 bg-slate-50 flex flex-wrap gap-3 border-b border-slate-200">
                        <button onClick={handleAddLog} className={primaryButton}>Add Log Entry</button>
                        <button onClick={() => exportToCsv(logs, 'daily_log.csv')} className={secondaryButton}>Export Logs CSV</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-slate-600">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th scope="col" className="p-3 font-medium w-[150px]">Date</th>
                                    <th scope="col" className="p-3 font-medium">Worked On</th>
                                    <th scope="col" className="p-3 font-medium w-[100px]">Hours</th>
                                    <th scope="col" className="p-3 font-medium">Blockers / Issues</th>
                                    <th scope="col" className="p-3 font-medium">Next Actions (Tomorrow)</th>
                                    <th scope="col" className="p-3 font-medium w-[80px] text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map(log => (
                                    <tr key={log.id} className="border-b border-slate-200 last:border-b-0">
                                        <td className="p-2"><input type="date" value={log.date} onChange={(e) => handleUpdateLog(log.id, 'date', e.target.value)} className={inputStyles} /></td>
                                        <td className="p-2"><textarea value={log.workedOn} onChange={(e) => handleUpdateLog(log.id, 'workedOn', e.target.value)} className={textareaStyles} /></td>
                                        <td className="p-2"><input type="number" step="0.5" value={log.hours} onChange={(e) => handleUpdateLog(log.id, 'hours', e.target.value)} className={inputStyles} /></td>
                                        <td className="p-2"><textarea value={log.blockers} onChange={(e) => handleUpdateLog(log.id, 'blockers', e.target.value)} className={textareaStyles} /></td>
                                        <td className="p-2"><textarea value={log.nextActions} onChange={(e) => handleUpdateLog(log.id, 'nextActions', e.target.value)} className={textareaStyles} /></td>
                                        <td className="p-2 text-center">
                                          <button onClick={() => handleDeleteLog(log.id)} className="px-2 py-1 rounded-md text-slate-500 hover:bg-red-100 hover:text-red-600 transition" aria-label="Delete log entry">✕</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default App;