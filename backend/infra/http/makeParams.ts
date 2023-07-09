import type { RouterContext } from "oak/mod.ts";

export function makeParams(ctx: RouterContext<any, any, any>): Promise<any> {
    return Promise.resolve(ctx.params);
}
