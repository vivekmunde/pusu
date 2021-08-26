# pusu
Simple type-safe `pub-sub` implementation APIs for Javascript/TypeScript Apps

## createPublication&lt;T&gt;([name])
**Parameters**:
- `name`: *(Optional)* String - Publication name

**Return value**: Object - New publication

Creates & returns a unique new publication object.

Publication object is a simple javascript object `{ subscribers: [] }` which has an array named `subscribers`. The array `subscribers` actually holds the references to the subscriber functions. Result is, all the subscribers (i.e. functions) of the publication are mapped inside the publication object itself. Whenever a publiser publishes any data for a publication then all the subscribers inside the publication are called with this data.

TypeScript

```
// load-data-publication.ts

import { createPublication } from 'pusu';

export default createPublication<{ asOfDate: Date }>('Load data');
```

JavaScript

```
// load-data-publication.js

import { createPublication } from 'pusu';

export default createPublication('Load data');
```

### Unique publication every time

**Creation of a publication makes sure that each publication is unique in itself and removes the need of maintaining a unique key for each publication.**

Even if multiple publications created with same `name`, then each publication will be treated as a separate publication without any conflicts.

Below code creates two separate unique publications `publication1` & `publication2` even though the publication names are same. Name is just for the sake of naming the publication so that its useful during debugging any issues.

TypeScript

```
import { createPublication } from 'pusu';

const publication1 = createPublication<{ asOfDate: Date }>('Load data');
const publication2 = createPublication<{ asOfDate: Date }>('Load data');

console.log(publication1 === publication2); //false
```

JavaScript

```
import { createPublication } from 'pusu';

const publication1 = createPublication('Load data');
const publication2 = createPublication('Load data');

console.log(publication1 === publication2); //false
```

## publish(publication [, ... nParams])
**Parameters**:
- `publication`: *(Required)* Object - Publication object created using the api `createPublication()`
- `[, ... nParams]`: *(Optional)* Any - These parameters/arguments are passed as is to the subscribers listening to the publication. Its a way of passing data to the subscribers.

`publish` method calls all the subscribers subscribed to the `publication` (provided as a first argument). It calls the subscribers with all the rest of the arguments/data (`[, ... nParams]`).

```
import { publish } from 'pusu';
import loadDataPublication from './publications/load-data-publication';

  ...

  const handleClick = () => {
    const asOfDate = new Date();
    // Publish the data 
    publish(publication, { asOfDate });
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

  ...
```

## subscribe(publication, subscriber)
**Parameters**:
- `publication`: *(Required)* Object - Publication object created using the api `createPublication`
- `subscriber`: *(Required)* Function - A subscriber function which will be called by the publisher. This function will receive any argument(s) i.e. data published by the publisher.

**Return value**: Function - A function when called then the `subscriber` is unsubscribed and no longer called by the publisher.

```
import { subscribe } from 'pusu';
import loadDataPublication from './publications/load-data-publication';

  ...

  let unsubscribe;

  const loadData = ({ asOfDate }) => {
    // load the data from API
  }

  // Subscribe to the publication
  const onInit = () => {
    unsubscribe = subscribe(loadDataPublication, loadData);
  }

  // Unsubscribe from the publication before removal of the component
  const beforeRemoval = () => {
    if (unsubscribe) {
      unsubscribe();
    }
  }

  ...
```

## License

MIT
