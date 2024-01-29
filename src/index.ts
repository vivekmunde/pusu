/**
 * Publishes the data to all subscribers.
 * @param {T} data - Data to be published. All subscribers will receive this data.
 */
export type TPublish<T> = (data: T) => void;

/**
 * A subscriber function to be called each time the data is published.
 *
 * @param {T} data - The data sent by the publisher.
 */
export type TSubscriber<T> = (data: T) => void;

/**
 * Unsibscribes a subscriber function from the publication.
 *
 * @param {TSubscriber} subscriber - The subscriber function to be unsubscribed.
 */
export type TUnsubscribe<T> = (subscriber: TSubscriber<T>) => void;

/**
 * Subscribes a subscriber function to the publication.
 *
 * @param {TSubscriber} subscriber - A subscriber function to be called each time the data is published.
 * @returns {function} A function to ubsubscribe the subscriber function from the publication.
 */
export type TSubscribe<T> = (subscriber: TSubscriber<T>) => () => void;

/**
 * Publication object.
 *
 * @property {TPublish} publish - Publishes the data to all subscribers.
 * @property {TSubscribe} subscribe - Subscribes a subscriber function to the publication.
 * @property {TUnsubscribe} unsubscribe - Unsibscribes a subscriber function from the publication.
 */
export type TPublication<T> = {
  publish: TPublish<T>;
  subscribe: TSubscribe<T>;
  unsubscribe: TUnsubscribe<T>;
};

/**
 * Configuration options to be provided to the publication being created.
 *
 * @property {string} name - Used in logging. Default: "Unknown".
 * @property {boolean} enableLogging - Enable/disable logging. If enabled then each action "create" | "publish" | "subscribe" | "unsubscribe" | "notify" gets logged on console with relevent data.
 */
export type TCreateConfiguration = {
  name?: string;
  enableLogging?: boolean;
};

/**
 * Action to log.
 */
export type TLogAction =
  /** When publication is created. */
  | "create"
  /** When publciation is published with data. */
  | "publish"
  /** When a subscriber function is subscribed. */
  | "subscribe"
  /** When a subscriber function is unsubscribed. */
  | "unsubscribe"
  /** When a subscriber function is called with the data. */
  | "notify";

/**
 * Information to log.
 *
 * @property {string} publication - Name of the publication. Default: 'Unknown'
 * @property {TLogAction} action - Action.
 * @property {T} data - Data published and sent to the subscribers.
 * @property {any} - Any metadata. E.g. when a subscriber is notified then the sibscriber function's name is added in the metadata.
 */
export type TLog<T> = {
  publication: string;
  action: TLogAction;
  data?: T;
  meta?: any;
};

/**
 * Logs the action and its relative information.
 *
 * @param {string} publication - Name of the publication.
 * @param {TLogAction} - Action.
 * @param {TData} - Data published and sent to the subscribers.
 * @param {TMetaData} - Any metadata. E.g. when a subscriber is notified then the sibscriber function's name is added in the metadata. */
const log = <TData, TMetaData>(
  publication: string,
  action: TLogAction,
  data?: TData,
  meta?: TMetaData
) => {
  const info: TLog<TData> = { publication, action };

  if (data) {
    info.data = data;
  }

  if (meta) {
    info.meta = meta;
  }

  console.log("pusu", info);
};

/**
 * Creates a new publication.
 *
 * @param {TCreateConfiguration} config - Configuration options to be provided to the publication.
 * @returns {TPublication} Publication object containing the pub-sub functions.
 */
const createPublication = <T>(
  config?: TCreateConfiguration
): TPublication<T> => {
  const _loggingEnabled = config?.enableLogging;

  const _name: string = config?.name ?? "Unknown";

  const _subscribers: TSubscriber<T>[] = [];

  const _log = <TData, TMetaData>(
    action: TLogAction,
    data: TData,
    meta?: TMetaData
  ) => {
    if (_loggingEnabled) {
      log(_name, action, data, meta);
    }
  };

  const publish: TPublish<T> = (data) => {
    _log<T, undefined>("publish", data, undefined);

    for (const subscriber of _subscribers) {
      _log<T, { subscriber: string }>("notify", data, {
        subscriber: subscriber.name,
      });

      subscriber(data);
    }
  };

  const unsubscribe: TUnsubscribe<T> = (subscriber) => {
    _log<undefined, { subscriber: string }>("unsubscribe", undefined, {
      subscriber: subscriber.name,
    });

    const index = _subscribers.indexOf(subscriber);

    if (index > -1) {
      _subscribers.splice(index, 1);
    }
  };

  const subscribe: TSubscribe<T> = (subscriber) => {
    _log<undefined, { subscriber: string }>("subscribe", undefined, {
      subscriber: subscriber.name,
    });

    _subscribers.push(subscriber);

    return () => unsubscribe(subscriber);
  };

  _log("create", undefined);

  const publication: TPublication<T> = {
    publish,
    subscribe,
    unsubscribe,
  };

  return publication;
};

export default createPublication;
