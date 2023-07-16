// deno-lint-ignore-file no-explicit-any
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { Headers } from "@ps/application/http/Headers.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";

type BodyMock = {
    readonly body: any;
};

type FullMock = {
    readonly body: any;
    readonly params: IdParam;
    readonly headers: undefined;
};

export const httpRequestBodyMock: BodyMock = {
    body: {},
};

export const httpRequestParamsMock: HTTPRequest<undefined, IdParam> = {
    params: { id: "id" },
};

export const httpRequestHeadersMock: HTTPRequest<undefined, undefined, Headers> = {
    headers: {
        authorization: "Bearer 123",
    },
};

export const httpRequestFullMock: FullMock = {
    body: {},
    params: { id: "id" },
    headers: undefined,
};
