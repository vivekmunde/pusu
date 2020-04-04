export default function publish(publication, ...args) {
    for (const subscriber of publication.subscribers) {
        subscriber(...args);
    }
}
