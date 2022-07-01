export function buildCDNUrl(endpoint, endpointId, resourceId, format = 'png', size = 64) {
    const params = new URLSearchParams({
        size
    });

    return `https://cdn.discordapp.com/${endpoint}/${endpointId}/${resourceId}.${format}?${params}`;
}