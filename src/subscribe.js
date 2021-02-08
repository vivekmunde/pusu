export default function subscribe(publication, subscriber) {
  const { subscribers } = publication;

  subscribers.push(subscriber);

  return function unsubscribe() {
    const index = subscribers.indexOf(subscriber);

    if (index > -1) {
      subscribers.splice(index, 1);
    }
  };
}
