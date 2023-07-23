import type { Res } from "./res.ts";

import { State } from "../app/state.ts";

type Params = {
    readonly resource: string;
    readonly method: "GET" | "POST" | "PUT" | "DELETE";
    readonly body?: Record<string, unknown> | undefined | null;
};

function customFetch<T>({ resource, method, body }: Params): Promise<Res<T>> {
    const Authorization = State.getState().getToken();

    return fetch(
        `http://localhost:8080/${resource}`,
        {
            headers: Object.assign(
                {},
                Authorization ? { Authorization } : null,
            ),
            method,
            body: body ? JSON.stringify(body) : undefined,
        },
    ).then(async (res) => {
        const status = res.status;
        const headers = {
            contentLocation: res.headers.get("content-location") ?? undefined,
        };
        if ([201, 204].includes(res.status)) {
            const body = await res.body?.cancel();
            return { status, body, headers };
        }
        const body = await res.json();
        return { status, body, headers };
    });
}

export function getReq<T>(resource: string): Promise<Res<T>> {
    return customFetch({ resource, method: "GET" });
}

export function postReq<T>(
    resource: string,
    body: Record<string, unknown> | undefined | null,
): Promise<Res<T>> {
    return customFetch({ resource, method: "POST", body });
}

export function putReq<T>(
    resource: string,
    body: Record<string, unknown> | undefined | null,
): Promise<Res<T>> {
    return customFetch({ resource, method: "PUT", body });
}

export function deleteReq<T>(resource: string): Promise<Res<T>> {
    return customFetch({ resource, method: "DELETE" });
}

export const request = {
    get: getReq,
    post: postReq,
    put: putReq,
    delete: deleteReq,
};
