import type { Context } from "oak/mod.ts";
import type { Session } from "@ps/domain/session/model.ts";
import type { User } from "@ps/domain/schedule/user/model.ts";
import { SessionFromRequestServiceImpl } from "@ps/application/http/sessionFromRequest/service.impl.ts";
import { DecodeSessionServiceJWTAdapter } from "../session/decode/jwt.adapter.ts";
import { makeHeaders } from "./makeHeaders.ts";

export async function makeUserId(ctx: Context): Promise<User["id"]> {
    return new DecodeSessionServiceJWTAdapter().decode(
        new SessionFromRequestServiceImpl().create({ headers: await makeHeaders(ctx) }) as Session,
    );
}
