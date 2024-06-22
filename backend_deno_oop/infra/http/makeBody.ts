import type { Context } from "oak/mod.ts";

// deno-lint-ignore no-explicit-any
export async function makeBody(ctx: Context): Promise<any> {
    const text = await ctx.request.body.text();
    if (!text) {
        return undefined;
    }
    return JSON.parse(text);
}
