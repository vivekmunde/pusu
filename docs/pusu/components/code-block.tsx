import React from 'react';

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <p className="mb-4 p-4 bg-neutral-100 dark:bg-neutral-800 rounded" style={{ overflow: 'auto', maxHeight: '90vh' }}>
            <code className="whitespace-pre font-mono">
                {children}
            </code>
        </p>
    );
};

export default CodeBlock;
