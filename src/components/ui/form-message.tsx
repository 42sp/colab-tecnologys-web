import React from 'react';

export const FormMessage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (!children) return null;
    return (
        <p className="text-sm font-medium text-red-500 mt-1">
            {children}
        </p>
    );
};