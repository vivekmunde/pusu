export type TPublication<T> = {
  name: string,
  subscribers: ((args?: T) => void)[],
}

export type TCreatePublication = <T>(name?: string) => TPublication<T>;

export type TPublish = <T>(publication: TPublication<T>, args?: T) => void;

export type TSubscribe = <T>(publication: TPublication<T>, subscriber: (args?: T) => void) => () => void;

export const createPublication: TCreatePublication = (name) => {
  return {
    name: name ?? 'anonymous',
    subscribers: [],
  };
}

export const publish: TPublish = (publication, args) => {
  for (const subscriber of publication.subscribers) {
    subscriber(args);
  }
}

export const subscribe: TSubscribe = (publication, subscriber) => {
  const { subscribers } = publication;

  subscribers.push(subscriber);

  return function unsubscribe() {
    const index = subscribers.indexOf(subscriber);

    if (index > -1) {
      subscribers.splice(index, 1);
    }
  };
}
