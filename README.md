# pusu
Simple type-safe `pub-sub` implementation APIs for Javascript/TypeScript Apps

## Create Publication

```
type TPublication<T> = {
  name?: string,
  subscribers: ((data?: T) => void)[],
}

type TCreatePublication = <T>(name?: string) => TPublication<T>;
```

**Parameters**:
- `name`: *(Optional)* String - Publication name. Useful for logging or debugging.

**Return value**: Object - New publication.

Creates & returns a unique new publication object.

Publication object is a simple javascript object `{ subscribers: [] }` which has an array named `subscribers`. The array `subscribers` actually holds the references to the subscriber functions. Result is, all the subscribers (i.e. functions) of the publication are mapped inside the publication object itself. Whenever a publiser publishes any data for a publication then all the subscribers inside the publication are called with this data.

```
import { createPublication } from 'pusu';

export default createPublication<{ asOfDate: Date }>('load-data');
```

### Unique publication every time

**Creation of a publication makes sure that each publication is unique in itself and removes the need of maintaining a unique key for each publication.**

Even if multiple publications created with same `name`, then each publication will be treated as a separate publication without any conflicts.

Below code creates two separate unique publications `publication1` & `publication2` even though the publication names are same. Name is just for the sake of naming the publication so that its useful during debugging any issues.

```
import { createPublication } from 'pusu';

const publication1 = createPublication<{ asOfDate: Date }>('load-data');
const publication2 = createPublication<{ asOfDate: Date }>('load-data');

console.log(publication1 === publication2); //false
```

## Publish

```
type TPublish = <T>(publication: TPublication<T>, data?: T) => void;
```

**Parameters**:
- `publication`: *(Required)* Object - Publication object created using the api `createPublication()`
- `data`: *(Optional)* - This argument is passed to the subscribers listening to the publication. Its a way of passing data to the subscribers.

`publish` method calls all the subscribers subscribed to the `publication` (provided as a first argument). It calls the subscribers with the data.

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
type TSubscribe = <T>(publication: TPublication<T>, subscriber: (data?: T) => void) => () => void;
```

**Parameters**:
- `publication`: *(Required)* Object - Publication object created using the api `createPublication`
- `subscriber`: *(Required)* Function - A subscriber function which will be called by the publisher. This function will receive the data published by the publisher.

**Return value**: Function - A function to unsubscribe, when called then the `subscriber` is unsubscribed and no longer called by the publisher.

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

## Migrating from 1.0 to 1.1

### Breaking change

The version 1.1 will allow only one parameter while publishing the data & subscribing to the data.


### 1.0

The versions 1.0 was allowing more than one parameters while publishing the data.

In the example below, publisher used to publish date and company id as two different parameters.

```
import { publish } from 'pusu';
import refreshPageDataPublication from './publications/refresh-page-data-publication';

<button
  id="headerRefreshAction"
  onClick={() => {
    // Publish the data 
    publish(publication, new Date(), '123');
}}
>
  Refresh
</button>
```

The subscriber used to receive two arguments as date and company id.
 
```
import { subscribe } from 'pusu';
import refreshPageDataPublication from './publications/refresh-page-data-publication';

let unsubscribe;

// Subscribe to the publication
unsubscribe = subscribe(refreshPageDataPublication, (asOfDate, companyId) => {
  // load the data from API
});

// Unsubscribe from the publication before removal of the component
if (unsubscribe) {
  unsubscribe();
}
```

### 1.1

The version 1.1 will allow only one parameter while publishing the data & subscribing to the data.

In the example below, publisher will not publish only one JSON object consisting of date and company id.

```
import { publish } from 'pusu';
import refreshPageDataPublication from './publications/refresh-page-data-publication';

<button
  id="headerRefreshAction"
  onClick={() => {
    // Publish the data 
    publish(publication, { asOfDate: new Date(), companyId: '123 });
  }}
>
  Refresh
</button>
```

The subscriber will receive only one argeument, as the same JSON object consisting of date and company id.

```
import { subscribe } from 'pusu';
import refreshPageDataPublication from './publications/refresh-page-data-publication';

let unsubscribe;

// Subscribe to the publication
const onInit = () => {
  unsubscribe = subscribe(refreshPageDataPublication, ({ asOfDate, companyId }) => {
    // load the data from API
  });
}

// Unsubscribe from the publication before removal of the component
const beforeRemoval = () => {
  if (unsubscribe) {
    unsubscribe();
  }
}
```

## License

MIT
