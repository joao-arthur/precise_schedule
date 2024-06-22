import type { HTTPRequest } from "./request.ts";

export const requestEmpty: HTTPRequest = {
    body: undefined,
    params: {},
    headers: {},
};

export const requestHeaders: HTTPRequest = {
    body: undefined,
    params: {},
    headers: { authorization: "Bearer 123" },
};

export function requestBuild<Body, Params>(body: Body, params: Params): HTTPRequest<Body, Params> {
    return {
        body,
        params,
        headers: {},
    };
}
