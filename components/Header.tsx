import React from 'react';

const Header: React.FC = () => (
    <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">
            Hydromech Accounts Closing Checklist
        </h1>
        <p className="mt-3 text-base text-slate-600 max-w-3xl mx-auto">
            Track tasks, owners, and deadlines. Use the daily process log below for day-by-day updates.
        </p>
    </header>
);

export default Header;