import type { RouterContext } from "oak/mod.ts";

// deno-lint-ignore no-explicit-any
export function makeParams(ctx: RouterContext<any, any, any>): Promise<any> {
    return Promise.resolve(ctx.params);
}
