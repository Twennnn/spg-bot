export function sceneEnter({ slug, context }) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Timeout')), 60 * 60 * 1_000);

        context.scene.enter(slug, {
            state: {
                resolve: (payload) => {
                    clearTimeout(timeout);

                    resolve(payload);
                },
                reject
            }
        });
    })
        .then((payload) => payload)
        .catch(() => null);
}