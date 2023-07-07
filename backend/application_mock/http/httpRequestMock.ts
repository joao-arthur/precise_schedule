import type { HTTPRequest } from "../../application/http/HTTPRequest.ts";
import { IdParam } from "../../application/http/IdParam.ts";

type BodyMock = {
    readonly body: any;
};

type FullMock = {
    readonly body: any;
    readonly params: IdParam<"id">;
};

export const httpRequestBodyMock: BodyMock = {
    body: {},
};

export const httpRequestParamsMock: HTTPRequest<
    undefined,
    IdParam<"id">
> = {
    params: { id: "id" },
};

export const httpRequestFullMock: FullMock = {
    body: {},
    params: { id: "id" },
};
