import type { HTTPRequest } from "../../application/http/HTTPRequest.ts";
import { IdParam } from "../../application/http/IdParam.ts";

export const httpRequestBodyMock = {
    body: {},
} as HTTPRequest<any, never>;

export const httpRequestParamsMock = {
    params: { id: "id" },
} as HTTPRequest<never, IdParam<"id">>;

export const httpRequestFullMock: HTTPRequest<any, IdParam<"id">> = {
    body: {},
    params: { id: "id" },
};
