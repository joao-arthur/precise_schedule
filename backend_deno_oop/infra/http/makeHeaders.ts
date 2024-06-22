import type { Context } from "oak/context.ts";
import type { HTTPHeaders } from "@ps/application/http/headers/model.ts";

export function makeHeaders(ctx: Context): Promise<HTTPHeaders> {
    return Promise.resolve({
        authorization: ctx.request.headers.get("authorization"),
    });
}
