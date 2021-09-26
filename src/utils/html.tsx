import dompurify from 'dompurify';

function createMarkup(post: string) {
    const sanitizer = dompurify.sanitize;
    return { __html: sanitizer(post) };
}

export function stringToHtml(string: string) {
    return <div dangerouslySetInnerHTML={createMarkup(string)} />
}

export function addTags(string: string) {
    if (!string.includes('<p'))
        return string.split('\n').map(str => `<p>${str}</p>`).join('');
    else
        return string;
}

function findRealIndex(string: string, findIndex: number) {
    let stack = 0;
    let i = 0;
    let realCount = 0;
    for (i; i < string.length && realCount < findIndex; i++) {
        if (string[i] === '<')
            stack++;
        else if (string[i] === '>')
            stack--;
        else if (stack === 0)
            realCount++;
    }
    return i;
}

export function truncateHtmlString(string: string, max_symbols: number) {
    const realIndex = findRealIndex(string, max_symbols);
    if (realIndex < string.length)
        return string.slice(0, realIndex) + '...';
    return string;
}
