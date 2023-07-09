import type { RouterContext } from "oak/mod.ts";

export function makeBody(ctx: RouterContext<any, any, any>): Promise<any> {
    return ctx.request.body({ type: "json" }).value;
}
