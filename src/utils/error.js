export const excToMessage = (e) => {
    if (e?.response?.data?.detail)
        return e?.response?.data?.detail;
    else if (e?.response?.data)
        return e?.response?.data;
    else
        return e.message;
}