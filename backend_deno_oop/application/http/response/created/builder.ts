import type { HTTPResponse } from "../../response/model.ts";

export function created<T extends { readonly id: string }>(data: T): HTTPResponse {
    return {
        status: 201,
        body: undefined,
        headers: { contentLocation: data.id },
    };
}
