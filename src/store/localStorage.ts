export const fillLocalStorage = (username:string|null = null, token:string|null = null, userid:string|null = null) => {
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
