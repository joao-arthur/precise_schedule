import type { Res } from "./res.ts";

import { State } from "../app/state.ts";

type Params = {
    readonly resource: string;
    readonly method: "GET" | "POST" | "PUT";
    readonly body: Record<string, unknown>;
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
            body: JSON.stringify(body),
        },
    ).then(async (res) => {
        if ([201, 204].includes(res.status)) {
            const body = await res.body?.cancel();
            return { status: res.status, body };
        }
        const body = await res.json();
        return { status: res.status, body };
    });
}

export function getReq<T>(resource: string, body: Record<string, unknown>): Promise<Res<T>> {
    return customFetch({ resource, method: "GET", body });
}

export function postReq<T>(resource: string, body: Record<string, unknown>): Promise<Res<T>> {
    return customFetch({ resource, method: "POST", body });
}

export function putReq<T>(resource: string, body: Record<string, unknown>): Promise<Res<T>> {
    return customFetch({ resource, method: "PUT", body });
}

export const request = {
    get: getReq,
    post: postReq,
    put: putReq,
};