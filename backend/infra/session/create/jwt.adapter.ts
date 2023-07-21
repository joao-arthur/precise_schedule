import type { User } from "@ps/domain/schedule/user/User.ts";
import type { Session } from "@ps/domain/session/Session.ts";
import type { CreateSessionService } from "@ps/domain/session/create/CreateSessionService.ts";
import type { SessionPayload } from "../SessionPayload.ts";

import { create, getNumericDate } from "djwt/mod.ts";
import { key } from "../key.ts";

export class CreateSessionServiceJWTAdapter implements CreateSessionService {
    private static EXP_SEC = 60 * 60 * 2;

    public async create(userId: User["id"]): Promise<Session> {
        const payload: SessionPayload = {
            exp: getNumericDate(
                CreateSessionServiceJWTAdapter.EXP_SEC,
            ),
            userId,
        };
        const token = await create(
            { alg: "HS512", typ: "JWT" },
            payload,
            key,
        );
        return { token };
    }
}
