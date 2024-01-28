/**
 * A subscriber function to be called each time the data is published.
 *
 * @param {T} data - The data sent by the publisher.
 */
export type TSubscriber<T> = (data: T) => void;

/**
 * Publication object.
 *
 * @property {string} name - Name of the publication.
 * @property {TSubscriber[]} subscribers - Collection of subscriber functions currently subscribed to the publication.
 */
export type TPublication<T> = {
  name?: string;
  subscribers: TSubscriber<T>[];
};

/**
 * Creates a new publication.
 *
 * @param {string} name - Name of the publication. Helpful in debugging and logging.
 * @returns {TPublication} Publication.
 */
export const createPublication = <T>(name?: string): TPublication<T> => {
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
export const publish = <T>(publication: TPublication<T>, data: T): void => {
  for (const subscriber of publication.subscribers) {
    subscriber(data);
  }
};

/**
 * Subscribes to the publication.
 *
 * @param {TPublication} publication - Publication object.
 * @param {TSubscriber} subscriber - A subscriber function to be called each time the data is published.
 *
 * @returns {function} Ubsubscribes the subscriber from the publication.
 */
export const subscribe = <T>(
  publication: TPublication<T>,
  subscriber: TSubscriber<T>
): (() => void) => {
  const { subscribers } = publication;

  subscribers.push(subscriber);

  return function unsubscribe() {
    const index = subscribers.indexOf(subscriber);

    if (index > -1) {
      subscribers.splice(index, 1);
    }
  };
};
