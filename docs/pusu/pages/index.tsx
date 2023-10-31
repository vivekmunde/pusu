import CreatePublication from '@/components/documentation/create-publication';
import Installation from '@/components/documentation/installation';
import Publish from '@/components/documentation/publish';
import Subscribe from '@/components/documentation/subscribe';
import PageTitle from '@/components/page-title';
import Paragraph from '@/components/paragraph';
import React from 'react';

const Home: React.FC = () => {
    return (
        <div>
            <PageTitle>pusu</PageTitle>
            <Paragraph>Simple type-safe pub-sub implementation APIs for Javascript/TypeScript Apps.</Paragraph>
            <br />
            <Installation />
            <CreatePublication />
            <Publish />
            <Subscribe />
        </div>
    );
};

export default Home;
