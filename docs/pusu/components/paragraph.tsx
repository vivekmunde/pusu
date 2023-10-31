import React, { CSSProperties } from 'react';

const Paragraph: React.FC<{
    children: React.ReactNode;
    className?: string;
    style?: CSSProperties;
}> = ({ children, className, style }) => (
    <p className={`mb-4 ${className ?? ''}`} style={style}>
        {children}
    </p>
);

export default Paragraph;
