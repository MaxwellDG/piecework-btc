import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

enum MethodType {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

// todo type of jwt token

export const fetchWrapper = {
    get: request(MethodType.GET),
    post: request(MethodType.POST),
    put: request(MethodType.PUT),
    delete: request(MethodType.DELETE),
    patch: request(MethodType.PATCH),
};

function request(method: MethodType) {
    return async (url: string, body: any) => {
        const requestOptions: any = {
            method,
            headers: authHeader(url),
        };
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        return fetch(url, requestOptions).then(handleResponse);
    };
}

function getUserInfo() {
    const _user = typeof window !== 'undefined' && localStorage.getItem('user');
    if (_user) {
        return JSON.parse(_user);
    } else {
        return null;
    }
}

function authHeader(url: string) {
    try {
        const userInfo = getUserInfo();
        if (userInfo) {
            const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
            if (userInfo?.token && isApiUrl) {
                return { Authorization: `Bearer ${userInfo.token}` };
            } else {
                return {};
            }
        }
    } catch (e) {
        return {};
    }
}

async function handleResponse(response: any) {
    const isJson = response.headers
        ?.get('content-type')
        ?.includes('application/json');
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
        const userInfo = getUserInfo();
        if ([401, 403].includes(response.status) && userInfo) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            // todo full logout
        }

        // get error message from body or default to response status
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    return data;
}
