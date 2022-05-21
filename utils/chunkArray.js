export function chunkArray(collection, size) {
    const chunked = [];

    for (let x = 0; x < Math.ceil(collection.length / size); x++) {
        const start = x * size;
        const end = start + size;

        chunked.push(
            collection.slice(start, end)
        );
    }

    return chunked;
}