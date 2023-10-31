import CodeBlock from '@/components/code-block';
import Paragraph from '@/components/paragraph';
import Section from '@/components/section';
import SectionTitle from '@/components/section-title';
import React from 'react';
import CodeInline from '../code-inline';

const CreatePublication: React.FC = () => {
    return (
        <Section>
            <SectionTitle id="create-publication" level={3}>Create Publication</SectionTitle>
            <Paragraph>Creates & returns a unique new publication object.</Paragraph>
            <Section>
                <h5>Type Definition</h5>
                <CodeBlock>
                    {`type TPublication<T> = {
  name?: string,
  subscribers: ((args?: T) => void)[],
}

type TCreatePublication = <T>(name?: string) => TPublication<T>;`}
                </CodeBlock>
                <h5>Arguments</h5>
                <Paragraph>
                    - <CodeInline>name</CodeInline> : Publication name. Useful for logging or debugging.
                </Paragraph>
                <div className="flex flex-row gap-2">
                    <h5>Return Value</h5>:<div>Publication object.</div>
                </div>
                <Paragraph>
                    Publication object is a simple javascript object <CodeInline>{`{subscribers: [] }`}</CodeInline>, which has an array named subscribers.
                    The array subscribers actually holds the references to the subscriber functions.
                    Result is, all the subscribers (i.e. functions) of the publication are mapped inside the publication object itself.
                    Whenever a publisher publishes any data for a publication then all the subscribers inside the publication are called with this data.
                </Paragraph>
                <CodeBlock>
                    {`import { createPublication } from 'pusu';

const refreshPublication = createPublication('refresh');

export default refreshPublication;`}
                </CodeBlock>
            </Section>
            <Section>
                <h5>Unique publication every time</h5>
                <Paragraph>
                    Creation of a publication makes sure that each publication is unique in itself and removes the need of maintaining a unique key for each publication.
                </Paragraph>
                <Paragraph>
                    Even if multiple publications created with same <CodeInline>name</CodeInline>, then each publication will be treated as a separate publication without any conflicts.
                </Paragraph>
                <Paragraph>
                    Below code creates two separate unique publications <CodeInline>publication1</CodeInline> & <CodeInline>publication2</CodeInline> even though the publication names are same.
                    Name is just for the sake of naming the publication so that its useful during debugging any issues.
                </Paragraph>
                <CodeBlock>
                    {`import { createPublication } from 'pusu';

const publication1 = createPublication<{ asOfDate: Date }>('load-data');
const publication2 = createPublication<{ asOfDate: Date }>('load-data');

console.log(publication1 === publication2); //false`}
                </CodeBlock>
            </Section>
        </Section>
    );
};

export default CreatePublication;
