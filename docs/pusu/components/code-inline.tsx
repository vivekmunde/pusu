import React from 'react';

const CodeInline: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <code className="font-mono px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800">{children}</code>
    );
};

export default CodeInline;
