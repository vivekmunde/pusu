import CodeBlock from '@/components/code-block';
import Section from '@/components/section';
import SectionTitle from '@/components/section-title';
import React from 'react';

const Installation: React.FC = () => {
    return (
        <Section>
            <SectionTitle id="installation" level={3}>Installation</SectionTitle>
            <CodeBlock>
                npm i --save pusu
            </CodeBlock>
        </Section>
    );
};

export default Installation;
