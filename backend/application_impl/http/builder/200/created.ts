import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";

export function created<T extends { readonly id: string }>(data: T): HTTPResponse {
    return {
        status: 201,
        body: undefined,
        headers: { contentLocation: data.id },
    };
}
