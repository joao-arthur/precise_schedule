import type { RouterContext } from "oak/mod.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";

export function makeResult(res: HTTPResponse, ctx: RouterContext<any, any, any>): void {
    ctx.response.body = res.body;
    ctx.response.status = res.status;
}
