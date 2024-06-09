import Cookies from 'js-cookie';

export function storeCookie(name, content) {
    Cookies.set(name, content);
}

export function getCookie(name) {
    return Cookies.get(name);
}