import React from 'react';

const Blockquote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <blockquote className="p-4 bg-pink-50 rounded mt-8 mb-8">
        <strong className="font-medium">
            {children}
        </strong>
    </blockquote>
);

export default Blockquote;
