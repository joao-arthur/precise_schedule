import type { RouterContext } from "oak/mod.ts";
import { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";

// deno-lint-ignore no-explicit-any
type CB<T> = (body: any, params: T) => Promise<HTTPResponse>;
// deno-lint-ignore no-explicit-any
type CTX = RouterContext<any, any, any>;

export const fullEndpoint = <T>(cb: CB<T>) => async (ctx: CTX): Promise<void> => {
    const body = await ctx.request.body({ type: "json" }).value;
    const params = ctx.params;
    const result = await cb(body, params);
    ctx.response.body = result.body;
    ctx.response.status = result.status;
};
