# pusu

Simple type-safe `pub-sub` implementation APIs for Javascript/TypeScript Apps

## Create Publication

```
type TCreateConfiguration = {
  name?: string;
  enableLogging?: string;
};

type TPublication<T> = {
  config?: TCreateConfiguration,
  subscribers: ((data: T) => void)[],
}

declare const createPublication: <T>(config?: TCreateConfiguration | undefined) => TPublication<T>;
```

**Parameters**:

- `config`: _(Optional)_ TCreateConfiguration - Configuration options.

**Return value**: Object - New publication.

Creates & returns a unique new publication object.

#### Configuration

- name?: _(Optional)_ string - Used in logging. Default: "Unknown".
- enableLogging?: _(Optional)_ boolean - Enable/disable console logging. Useful in development and/or test environments. If enabled then each action "create" | "publish" | "subscribe" | "unsubscribe" | "notify" gets logged on console with relevent data.

**Example**

```
import { createPublication } from 'pusu';

export default createPublication<{ asOfDate: Date }>({ name: 'load-data' });
```

### Unique publication every time

**Creation of a publication makes sure that each publication is unique in itself and removes the need of maintaining a unique key for each publication.**

Even if multiple publications created with same `name`, then each publication will be treated as a separate publication without any conflicts.

Below code creates two separate unique publications `publication1` & `publication2` even though the publication names are same. Name is just for the sake of naming the publication so that its useful during debugging any issues.

**Example**

```
import { createPublication } from 'pusu';

const publication1 = createPublication<{ asOfDate: Date }>({ name: 'load-data' });
const publication2 = createPublication<{ asOfDate: Date }>({ name: 'load-data' });

console.log(publication1 === publication2); //false
```

## Publish

```
declare const publish: <T>(publication: TPublication<T>, data: T) => void;
```

**Parameters**:

- `publication`: _(Required)_ Object - Publication object created using the api `createPublication()`
- `data`: _(Optional)_ - This argument is passed to the subscribers listening to the publication. Its a way of passing data to the subscribers.

`publish` method calls all the subscribers subscribed to the `publication` (provided as a first argument). It calls the subscribers with the data.

**Example**

```
import { publish } from 'pusu';
import loadDataPublication from './publications/load-data-publication';

<button
  id="headerRefreshAction"
  onClick={() => {
    // Publish the data
    publish(loadDataPublication, { asOfDate: new Date() });
  }}
>
  Refresh
</button>
```

## Subscribe

```
declare const subscribe: <T>(publication: TPublication<T>, subscriber: TSubscriber<T>) => (() => void);
```

**Parameters**:

- `publication`: _(Required)_ Object - Publication object created using the api `createPublication`
- `subscriber`: _(Required)_ Function - A subscriber function which will be called by the publisher. This function will receive the data published by the publisher.

**Return value**: Function - A function to unsubscribe, when called then the `subscriber` is unsubscribed and no longer called by the publisher.

**Example**

```
import { subscribe } from 'pusu';
import loadDataPublication from './publications/load-data-publication';

let unsubscribe;

// Subscribe to the publication
unsubscribe = subscribe(loadDataPublication, ({ asOfDate }) => {
  // load the data from API
});

// Unsubscribe from the publication before removal of the component
if (unsubscribe) {
  unsubscribe();
}
```

## Logging

If logging is enabled while creating the pubcalition then each action gets logged.

#### Log Information

```
{
  publication: string;
  action: TLogAction;
  data?: TData;
  meta?: TMetaData;
}
```

- publication: Name of the publication. Default = "Unknown".
- action: "create" | "publish" | "subscribe" | "unsubscribe" | "notify".
- data: Data published and sent to subscribers.
- meta: Can be any metadata. E.g. when a subscriber is notified then the sibscriber function's name is added in the metadata.

#### Actions

- create: When publication is created.
- publish: When publciation is published with data.
- subscribe: When a subscriber function is subscribed.
- unsubscribe: When a subscriber function is unsubscribed.
- notify: When a subscriber function is called with the data.

**Example**

```
createPublication<{ asOfDate: Date }>({ name: 'load-data', enableLogging: process.env.NODE_ENV === 'development' });
```

**Log**

```
'pusu', { publication: 'load-data', action: 'create' }
```

```
'pusu', { publication: 'load-data', action: 'subscribe', meta: { subscriber: '[functionName]' } }
```

```
'pusu', { publication: 'load-data', action: 'publish', data: { asOfDate: 1706513208749 } }
```

```
'pusu', { publication: 'load-data', action: 'notify', data: { asOfDate: 1706513208749 }, meta: { subscriber: '[functionName]' } }
```

## License

MIT
