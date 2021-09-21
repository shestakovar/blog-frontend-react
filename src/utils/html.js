function createMarkup(post) {
    return { __html: post };
}

export function stringToHtml(string) {
    return <div dangerouslySetInnerHTML={createMarkup(string)} />
}

export function addTags(string) {
    if (!string.includes('<p'))
        return string.split('\n').map(str => `<p>${str}</p>`).join('');
    else
        return string;
}
