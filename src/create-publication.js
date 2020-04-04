export default function createPublication(name = 'anonymous') {
    return {
        name,
        subscribers: [],
    };
}
