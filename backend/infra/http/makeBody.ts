import type { Context } from "oak/mod.ts";

export function makeBody(ctx: Context): Promise<any> {
    return ctx.request.body({ type: "json" }).value;
}
