import type { Context } from "oak/mod.ts";
import type { User } from "@ps/domain/schedule/user/model.ts";
import { DecodeSessionServiceJWTAdapter } from "../session/decode/jwt.adapter.ts";

export function makeUserId(ctx: Context): Promise<User["id"]> {
    return new DecodeSessionServiceJWTAdapter().decode({
        token: ctx.request.headers.get("authorization")!,
    });
}
