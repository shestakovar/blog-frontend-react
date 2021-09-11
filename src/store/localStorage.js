export const fillLocalStorage = (username = null, token = null, userid = null) => {
    if (username)
        localStorage.setItem('username', username);
    if (token)
        localStorage.setItem('token', token);
    if (userid)
        localStorage.setItem('userid', userid);
}

export const eraseLocalStorage = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
}
