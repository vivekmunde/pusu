import CodeBlock from '@/components/code-block';
import Section from '@/components/section';
import SectionTitle from '@/components/section-title';
import React from 'react';
import CodeInline from '../code-inline';
import Paragraph from '../paragraph';

const Publish: React.FC = () => {
    return (
        <Section>
            <SectionTitle id="publish" level={3}>Publish</SectionTitle>
            <Section>
                <h5>Type Definition</h5>
                <CodeBlock>
                    {`type TPublish = <T>(publication: TPublication<T>, data?: T) => void;`}
                </CodeBlock>
                <h5>Arguments</h5>
                <Paragraph>
                    - <CodeInline>publication</CodeInline> : Publication object created using the api <CodeInline>createPublication()</CodeInline>.
                </Paragraph>
                <Paragraph>
                    - <CodeInline>data</CodeInline> : Its the data passed to the subscribers, which are listening to the publication.
                </Paragraph>
                <Paragraph>
                    The <CodeInline>publish</CodeInline> method calls all the subscribers subscribed to the publication, passed as the first argument.
                    It calls the subscribers with the data, passed as the second argument.
                </Paragraph>
                <CodeBlock>
                    {`import { publish } from 'pusu';
import loadDataPublication from './publications/load-data-publication';

  ...

  const handleClick = () => {
    const asOfDate = new Date();
    // Publish the data 
    publish(loadDataPublication, { asOfDate });
  }

  ...

  const renderButton = () => {
    ...

    <button
      id="headerRefreshAction"
      onClick={handleClick}
    >
      Refresh
    </button>

    ...
  }

  ...`}
                </CodeBlock>
            </Section>
        </Section>
    );
};

export default Publish;
