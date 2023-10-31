import React from 'react';

const Section: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <section className="mb-8">{children}</section>
    );
};

export default Section;
