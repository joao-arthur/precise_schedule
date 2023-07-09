import type { RouterContext } from "oak/mod.ts";
import { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";

type CB<T> = (params: T) => Promise<HTTPResponse>;
// deno-lint-ignore no-explicit-any
type CTX = RouterContext<any, any, any>;

export const paramsEndpoint = <T>(cb: CB<T>) => async (ctx: CTX): Promise<void> => {
    const params = ctx.params;
    const result = await cb(params);
    ctx.response.body = result.body;
    ctx.response.status = result.status;
};
