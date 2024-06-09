import type { HTTPResponse } from "../../../http/response/model.ts";

export type ErrorHandlerMiddleware = {
    readonly handle: (error: unknown) => HTTPResponse;
};
