# Migrating from 1.0 to 1.1

## Breaking change

The version 1.1 will allow only one parameter while publishing the data & subscribing to the data.


### 1.0

The versions 1.0 was allowing more than one parameters while publishing the data.

In the example below, publisher is publishing date and company id as two different parameters.

```
import { publish } from 'pusu';
import refreshPageDataPublication from './publications/refresh-page-data-publication';

  ...

  const handleClick = () => {
    const asOfDate = new Date();
    // Publish the data 
    publish(publication, asOfDate, company._id);
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

The subscriber receives two arguments as date and company id.
 
```
import { subscribe } from 'pusu';
import refreshPageDataPublication from './publications/refresh-page-data-publication';

  ...

  let unsubscribe;

  const refreshData = (asOfDate, companyId) => {
    // load the data from API
  }

  // Subscribe to the publication
  const onInit = () => {
    unsubscribe = subscribe(refreshPageDataPublication, refreshData);
  }

  // Unsubscribe from the publication before removal of the component
  const beforeRemoval = () => {
    if (unsubscribe) {
      unsubscribe();
    }
  }

  ...
```


### 1.1

The version 1.1 will allow only one parameter while publishing the data & subscribing to the data.

In the example below, publisher is publishing one JSON object consisting of date and company id.

```
import { publish } from 'pusu';
import refreshPageDataPublication from './publications/refresh-page-data-publication';

  ...

  const handleClick = () => {
    const asOfDate = new Date();
    // Publish the data 
    publish(publication, { asOfDate, companyId: company._id });
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

The subscriber receives it as the same JSON object consisting of date and company id.

```
import { subscribe } from 'pusu';
import refreshPageDataPublication from './publications/refresh-page-data-publication';

  ...

  let unsubscribe;

  const refreshData = ({ asOfDate, companyId }) => {
    // load the data from API
  }

  // Subscribe to the publication
  const onInit = () => {
    unsubscribe = subscribe(refreshPageDataPublication, refreshData);
  }

  // Unsubscribe from the publication before removal of the component
  const beforeRemoval = () => {
    if (unsubscribe) {
      unsubscribe();
    }
  }

  ...
```
