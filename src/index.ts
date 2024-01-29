/**
 * A subscriber function to be called each time the data is published.
 *
 * @param {T} data - The data sent by the publisher.
 */
export type TSubscriber<T> = (data: T) => void;

/**
 * Configuration options to be provided to the publication being created.
 */
export type TCreateConfiguration = {
  /** Used in logging. Default: "Unknown". */
  name?: string;

  /** Enable/disable console logging. Useful in development and/or test environments. If enabled then each action "create" | "publish" | "subscribe" | "unsubscribe" | "notify" gets logged on console with relevent data. */
  enableLogging?: boolean;
};

/**
 * Publication object.
 *
 * @property {TCreateConfiguration} config - Configuration options provided at the time of creating the publication.
 * @property {TSubscriber[]} subscribers - Collection of subscriber functions currently subscribed to the publication.
 */
export type TPublication<T> = {
  config?: TCreateConfiguration;
  subscribers: TSubscriber<T>[];
};

export type TLogAction =
  | "create"
  | "publish"
  | "subscribe"
  | "unsubscribe"
  | "notify";

export type TLog<T> = {
  publication: string;
  action: TLogAction;
  data?: T;
  meta?: any;
};

/**
 * Logs the action and its relative information.
 *
 * @param {TCreateConfiguration} config - Configuration options provided at the time of creating the publication.
 * @param {TLogAction} action - Action: "create" | "publish" | "subscribe" | "unsubscribe" | "notify"
 * @param {TData} data - Data sent to subscribers.
 * @param {TMetaData} meta - Can be any metadata. E.g. when a subscriber is notified then the sibscriber function's name is added in the metadata. */
const log = <TData, TMetaData>(
  config: TCreateConfiguration | undefined,
  action: TLogAction,
  data?: TData,
  meta?: TMetaData
) => {
  if (config?.enableLogging) {
    const info: {
      publication: string;
      action: TLogAction;
      data?: TData;
      meta?: TMetaData;
    } = { publication: config.name ?? "Unknown", action };

    if (data) {
      info.data = data;
    }

    if (meta) {
      info.meta = meta;
    }

    console.log("pusu", info);
  }
};

/**
 * Creates a new publication.
 *
 * @param {TCreateConfiguration} config - Configuration options to be provided to the publication being created.
 * @returns {TPublication} Publication.
 */
export const createPublication = <T>(
  config?: TCreateConfiguration
): TPublication<T> => {
  const publication: TPublication<T> = {
    config,
    subscribers: [],
  };

  log(config, "create", undefined);

  return publication;
};

/**
 * Publishes the data to all subscribers.
 *
 * @param {TPublication} publication - Publication object.
 * @param {T} data - Data to publish and to be sent to all subscribers.
 */
export const publish = <T>(publication: TPublication<T>, data: T): void => {
  log<T, undefined>(publication.config, "publish", data, undefined);

  for (const subscriber of publication.subscribers) {
    log<T, { subscriber: string }>(publication.config, "notify", data, {
      subscriber: subscriber.name,
    });

    subscriber(data);
  }
};

/**
 * Subscribes to the publication.
 *
 * @param {TPublication} publication - Publication object.
 * @param {TSubscriber} subscriber - A subscriber function to be called each time the data is published.
 *
 * @returns {function} A function to ubsubscribe the subscriber from the publication.
 */
export const subscribe = <T>(
  publication: TPublication<T>,
  subscriber: TSubscriber<T>
): (() => void) => {
  log<undefined, { subscriber: string }>(
    publication.config,
    "subscribe",
    undefined,
    {
      subscriber: subscriber.name,
    }
  );

  const { subscribers } = publication;

  subscribers.push(subscriber);

  return function unsubscribe() {
    log<undefined, { subscriber: string }>(
      publication.config,
      "unsubscribe",
      undefined,
      {
        subscriber: subscriber.name,
      }
    );

    const index = subscribers.indexOf(subscriber);

    if (index > -1) {
      subscribers.splice(index, 1);
    }
  };
};
