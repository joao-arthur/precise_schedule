import type { Context } from "oak/mod.ts";
import type { Session } from "../../../domain/session/model.ts";
import type { User } from "../../../../domain/schedule/user/model.ts";
import { SessionFromRequestServiceImpl } from "@ps/application/http/sessionFromRequest/service.impl.ts";
import { DecodeSessionServiceJWTAdapter } from "../session/decode/jwt.adapter.ts";
import { makeHeaders } from "./makeHeaders.ts";

export async function makeUserId(ctx: Context): Promise<User["id"]> {
    const headers = await makeHeaders(ctx);
    const sessionFromRequest = new SessionFromRequestServiceImpl();
    const jwtAdapter = new DecodeSessionServiceJWTAdapter();
    const session = sessionFromRequest.create({ headers }) as Session;
    const result = await jwtAdapter.decode(session);
}
