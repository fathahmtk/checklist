
import React from 'react';

interface ProgressBarProps {
    progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (
    <div>
        <div className="flex justify-between items-center mb-1">
            <span className="text-base font-medium text-emerald-300">Progress</span>
            <span className="text-sm font-medium text-emerald-300">{progress}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2.5">
            <div
                className="bg-gradient-to-r from-sky-400 to-emerald-400 h-2.5 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    </div>
);

export default ProgressBar;
