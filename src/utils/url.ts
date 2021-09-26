export const parseLocation = (location: string, params: string[]) => {
    const parsed: {[s: string]: string} = {};
    const pg = new URLSearchParams(location);
    params.forEach(param => {
        const newParam = pg.get(param);
        if (newParam)
            parsed[param] = newParam;
    });
    return parsed;
}
