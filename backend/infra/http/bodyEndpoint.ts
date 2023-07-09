// deno-lint-ignore-file no-explicit-any
import type { RouterContext } from "oak/mod.ts";
import { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";

type CB = (body: any) => Promise<HTTPResponse>;
type CTX = RouterContext<any, any, any>;

export const bodyEndpoint = (cb: CB) => async (ctx: CTX): Promise<void> => {
    const body = await ctx.request.body({ type: "json" }).value;
    const result = await cb(body);
    ctx.response.body = result.body;
    ctx.response.status = result.status;
};
