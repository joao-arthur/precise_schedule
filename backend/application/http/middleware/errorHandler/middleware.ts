import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";

export type ErrorHandlerMiddleware = {
    readonly handle: (error: unknown) => HTTPResponse;
};
