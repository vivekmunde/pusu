/**
 * Publishes the data to all subscribers.
 * @param {T} data - Data to be published. All subscribers receive this data.
 */
export type TPublish<T> = (
  /** Data to be published. All subscribers receive this data. */
  data: T
) => void;

/**
 * A subscriber function to be called each time the data is published.
 * @param {T} data - The data sent by the publisher.
 */
export type TSubscriber<T> = (
  /** The data sent by the publisher. */
  data: T
) => void;

/**
 * Unsibscribes a subscriber from the publication.
 * @param {TSubscriber} subscriber - The subscriber function to be unsubscribed.
 */
export type TUnsubscribe<T> = (
  /** The subscriber function to be unsubscribed. */
  subscriber: TSubscriber<T>
) => void;

/**
 * Subscribes to the publication.
 * @param {TSubscriber} subscriber - A subscriber function to be called each time the data is published.
 */
export type TSubscribe<T> = (
  /** A subscriber function to be called each time the data is published. */
  subscriber: TSubscriber<T>
) => () => void;

/**
 * Publication.
 * @property {TPublish} publish - Publishes the data to all subscribers.
 * @property {TSubscribe} subscribe - Subscribes to the publication.
 * @property {TUnsubscribe} unsubscribe - Unsibscribes a subscriber from the publication.
 */
export type TPublication<T> = {
  /** Publishes the data to all subscribers. */
  publish: TPublish<T>;

  /** Subscribes to the publication. */
  subscribe: TSubscribe<T>;

  /** Unsibscribes a subscriber from the publication. */
  unsubscribe: TUnsubscribe<T>;
};

/**
 * Configuration options to be provided to the publication being created.
 *
 * @property {string} name - Used in logging. Default: "Unknown".
 * @property {boolean} enableLogging - Enable/disable logging. If enabled then each action "create" | "publish" | "subscribe" | "unsubscribe" | "notify" gets logged on console with relevent data.
 */
export type TCreateOptions = {
  name?: string;
  enableLogging?: boolean;
};

export type TLogAction =
  | "create"
  | "publish"
  | "subscribe"
  | "unsubscribe"
  | "notify";

/**
 * Logs the action and its relative information.
 *
 * @param {string} publication - Name of the publication.
 * @param {TLogAction} - Action: | "create" | "publish" | "subscribe" | "unsubscribe" | "notify"
 * @param {TData} - Data sent to subscribers.
 * @param {TMetaData} - Can be any metadata. E.g. in case of subscribe the name of the subscriber function. */
const log = <TData, TMetaData>(
  /** Name of the publication. */
  publication: string,
  /** Action: | "create" | "publish" | "subscribe" | "unsubscribe" | "notify" */
  action: TLogAction,
  /** Data sent to subscribers. */
  data?: TData,
  /** Can be any metadata. E.g. in case of subscribe the name of the subscriber function. */
  meta?: TMetaData
) => {
  const info: {
    publication: string;
    action: TLogAction;
    data?: TData;
    meta?: TMetaData;
  } = { publication, action };

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
 * @param {TCreateOptions} options - Configuration options to be provided to the publication being created.
 * @returns {TPublication} Publication object containing the pub-sub functions.
 */
const createPublication = <T>(
  /** Configuration options to be provided to the publication being created. */
  options?: TCreateOptions
): TPublication<T> => {
  const _loggingEnabled = options?.enableLogging;

  const _name: string = options?.name ?? "Unknown";

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
