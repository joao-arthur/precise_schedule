// deno-lint-ignore-file no-explicit-any
import type { RouterContext } from "oak/mod.ts";
import { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";

type CB<T> = (body: any, params: T) => Promise<HTTPResponse>;
type CTX = RouterContext<any, any, any>;

export const fullEndpoint = <T>(cb: CB<T>) => async (ctx: CTX): Promise<void> => {
    const body = await ctx.request.body({ type: "json" }).value;
    const params = ctx.params;
    const result = await cb(body, params);
    ctx.response.body = result.body;
    ctx.response.status = result.status;
};
