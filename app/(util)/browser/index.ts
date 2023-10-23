export function getCookie(name: string) {
    return document.cookie.split(';').some((c) => {
        console.log('cookie? ', c);
        return c.trim().startsWith(name + '=');
    });
}
