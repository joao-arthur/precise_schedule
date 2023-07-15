import { handleResponse } from "./handleResponse";

export type Headers = {
    readonly authorization: string;
};

type params = {
    readonly method: "GET" | "POST" | "PUT" | "DELETE";
    readonly resource: string;
    readonly body?: unknown;
    readonly headers: Headers | undefined;
};

function customFetch<T>({
    method,
    resource,
    body,
    headers,
}: params): Promise<T> {
    return fetch(`http://localhost:8080/${resource}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: JSON.stringify(body),
    })
        .then(handleResponse);
}

export function getRequest<T>(
    resource: string,
    headers?: Headers,
): Promise<T> {
    return customFetch<T>({ method: "GET", resource, headers });
}

export function postRequest<T>(
    resource: string,
    body: unknown,
    headers?: Headers,
): Promise<T> {
    return customFetch<T>({
        method: "POST",
        resource,
        body,
        headers,
    });
}

export function putRequest<T>(
    resource: string,
    body: unknown,
    headers?: Headers,
): Promise<T> {
    return customFetch<T>({ method: "PUT", resource, body, headers });
}

export function deleteRequest<T>(
    resource: string,
    headers?: Headers,
): Promise<T> {
    return customFetch<T>({ method: "DELETE", resource, headers });
}

export const request = {
    get: getRequest,
    post: postRequest,
    put: putRequest,
    delete: deleteRequest,
} as const;
