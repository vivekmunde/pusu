import React from 'react';

const PageTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <h1>{children}</h1>
    );
};

export default PageTitle;
