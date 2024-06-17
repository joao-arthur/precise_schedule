// deno-lint-ignore-file no-explicit-any
import type { HTTPRequest } from "../request/model.ts";
import type { HTTPHeaders } from "../headers/model.ts";
import type { IdParam } from "../IdParam.ts";

type BodyStub = {
    readonly body: any;
};

type FullStub = {
    readonly body: any;
    readonly params: IdParam;
    readonly headers: undefined;
};

export const httpRequestBodyStub: BodyStub = {
    body: {},
};

export const httpRequestParamsStub: HTTPRequest<undefined, IdParam> = {
    params: { id: "id" },
};

export const httpRequestHeadersStub: HTTPRequest<undefined, undefined, HTTPHeaders> = {
    headers: {
        authorization: "Bearer 123",
    },
};

export const httpRequestFullStub: FullStub = {
    body: {},
    params: { id: "id" },
    headers: undefined,
};
