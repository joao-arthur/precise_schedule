import type { Context } from "oak/mod.ts";

// deno-lint-ignore no-explicit-any
export function makeBody(ctx: Context): Promise<any> {
    return ctx.request.body({ type: "json" }).value;
}
