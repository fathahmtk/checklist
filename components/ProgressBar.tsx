import React from 'react';

interface ProgressBarProps {
    progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (
    <div>
        <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-slate-600">Progress</span>
            <span className="text-sm font-medium text-slate-600">{progress}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
            <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    </div>
);

export default ProgressBar;