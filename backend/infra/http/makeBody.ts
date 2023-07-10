import type { RouterContext } from "oak/mod.ts";

// deno-lint-ignore no-explicit-any
export function makeBody(ctx: RouterContext<any, any, any>): Promise<any> {
    return ctx.request.body({ type: "json" }).value;
}
