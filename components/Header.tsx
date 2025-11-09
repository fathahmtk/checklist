
import React from 'react';

const Header: React.FC = () => (
    <header className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
            Hydromech Accounts Closing Checklist
        </h1>
        <p className="mt-2 text-lg text-slate-400 max-w-3xl mx-auto">
            Track tasks, owners, and deadlines. Use the daily process log below for day-by-day updates.
        </p>
    </header>
);

export default Header;
