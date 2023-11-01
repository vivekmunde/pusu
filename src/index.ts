export type TPublication<T> = {
  name?: string,
  subscribers: ((data: T) => void)[],
}

export type TCreatePublication = <T>(name?: string) => TPublication<T>;

export type TPublish = <T>(publication: TPublication<T>, data: T) => void;

export type TSubscribe = <T>(publication: TPublication<T>, subscriber: (data: T) => void) => () => void;

export const createPublication: TCreatePublication = (name) => {
  return {
    name,
    subscribers: [],
  };
}

export const publish: TPublish = (publication, data) => {
  for (const subscriber of publication.subscribers) {
    subscriber(data);
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
