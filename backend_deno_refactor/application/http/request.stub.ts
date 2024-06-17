import type { HTTPHeaders, HTTPRequest, IdParam } from "./request.ts";

export const requestEmpty: HTTPRequest<Record<string, never>, Record<string, never>, HTTPHeaders> =
    {
        body: {},
        params: {},
        headers: {},
    };

export const requestBodyEmpty: HTTPRequest<Record<string, never>> = {
    body: {},
};

export const requestParams: HTTPRequest<undefined, IdParam> = {
    params: { id: "id" },
};

export const requestHeaders: HTTPRequest<undefined, undefined, HTTPHeaders> = {
    headers: { authorization: "Bearer 123" },
};

export const requestFull: HTTPRequest<Record<string, never>, IdParam> = {
    body: {},
    params: { id: "id" },
};
