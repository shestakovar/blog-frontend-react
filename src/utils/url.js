export const parseLocation = (location, params) => {
    const parsed = {};
    const pg = new URLSearchParams(location);
    params.forEach(param => parsed[param] = pg.get(param))
    return parsed;
}
