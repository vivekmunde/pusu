/**
 * Publication object.
 */
export type TPublication<T> = {
  /* Name of the publication. */
  name?: string;

  /* Collection of subscriber functions currently subscribed to the publication. */
  subscribers: ((data: T) => void)[];
};

/**
 * Creates a new publication.
 *
 * @param {string} name - Name of the publication. Helpful in debugging and logging.
 * @returns {TPublication<T>} Publication object containing the pub-sub functions.
 */
export type TCreatePublication = <T>(
  /* Name of the publication. */
  name?: string
) => TPublication<T>;

export type TPublish = <T>(
  /** Publication object. */
  publication: TPublication<T>,

  /** Data to be published and to be sent to all subscribers. */
  data: T
) => void;

/** Subscribes to the publication. */
export type TSubscribe = <T>(
  /** Publication object. */
  publication: TPublication<T>,

  /** A subscriber function to be called each time the data is published. */
  subscriber: (
    /** The data sent by the publisher. */
    data: T
  ) => void
) => () => void;

/**
 * Creates a new publication.
 *
 * @param {string} name - Name of the publication. Helpful in debugging and logging.
 */
export const createPublication: TCreatePublication = (name) => {
  return {
    name,
    subscribers: [],
  };
};

/**
 * Publishes the data to all subscribers.
 *
 * @param {TPublication} publication - Publication object.
 * @param {T} data - Data to publish and to be sent to all subscribers.
 */
export const publish: TPublish = (publication, data) => {
  for (const subscriber of publication.subscribers) {
    subscriber(data);
  }
};

/** Subscribes to the publication.
 *
 * @param {TPublication} publication - Publication object.
 * @param {function} subscriber - A subscriber function to be called each time the data is published.
 */
export const subscribe: TSubscribe = (publication, subscriber) => {
  const { subscribers } = publication;

  subscribers.push(subscriber);

  return function unsubscribe() {
    const index = subscribers.indexOf(subscriber);

    if (index > -1) {
      subscribers.splice(index, 1);
    }
  };
};
