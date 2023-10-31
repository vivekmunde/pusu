import CodeBlock from '@/components/code-block';
import Section from '@/components/section';
import SectionTitle from '@/components/section-title';
import React from 'react';
import CodeInline from '../code-inline';
import Paragraph from '../paragraph';

const Subscribe: React.FC = () => {
  return (
    <Section>
      <SectionTitle id="subscribe" level={3}>Subscribe</SectionTitle>
      <Section>
        <h5>Type Definition</h5>
        <CodeBlock>
          {`type TSubscribe = <T>(publication: TPublication<T>, subscriber: (args?: T) => void) => () => void;`}
        </CodeBlock>
        <h5>Arguments</h5>
        <Paragraph>
          - <CodeInline>publication</CodeInline> : Publication object created using the api <CodeInline>createPublication()</CodeInline>.
        </Paragraph>
        <Paragraph>
          - <CodeInline>subscriber</CodeInline> : A subscriber function which will be called by the publisher. This function will receive the data published by the publisher.
        </Paragraph>
        <div className="flex flex-row gap-2">
          <h5>Return Value</h5>:<div>A function to unsubscribe, when called then the subscriber is unsubscribed and no longer called by the publisher.</div>
        </div>
        <Paragraph>
          All the subscriber functions are called and received the data passed by the publisher.
        </Paragraph>
        <CodeBlock>
          {`import { subscribe } from 'pusu';
import loadDataPublication from './publications/load-data-publication';

let unsubscribe;

// Subscribe to the publication
unsubscribe = subscribe(loadDataPublication, ({ asOfDate }) => {
  // load the data from API
});

// Unsubscribe from the publication before removal of the component
if (unsubscribe) {
  unsubscribe();
}`}
        </CodeBlock>
      </Section>
    </Section>
  );
};

export default Subscribe;
