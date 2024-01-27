export type TPublish<T> = (data: T) => void;

export type TSubscriber<T> = (data: T) => void;

export type TUnsubscribe<T> = (subscriber: TSubscriber<T>) => void;

export type TSubscribe<T> = (subscriber: TSubscriber<T>) => () => void;

export type TPublication<T> = {
  publish: TPublish<T>;
  subscribe: TSubscribe<T>;
  unsubscribe: TUnsubscribe<T>;
};

export type TCreateOptions = {
  name?: string;
  enableLogging?: string;
};

export type TLogAction =
  | "create"
  | "publish"
  | "subscribe"
  | "unsubscribe"
  | "notify";

export type TLog = <TData, TMetaData>(
  publication: string,
  action: TLogAction,
  data: TData,
  meta?: TMetaData
) => void;

const log = <TData, TMetaData>(
  publication: string,
  action: TLogAction,
  data?: TData,
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

const create = <T>(options?: TCreateOptions): TPublication<T> => {
  const _loggingEnabled = options?.enableLogging;

  const _name: string = options?.name ?? "Unknown";

  const _subscribers: TSubscriber<T>[] = [];

  const _log = <TData, TMetaData>(
    action: "create" | "publish" | "subscribe" | "unsubscribe" | "notify",
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

export default create;
