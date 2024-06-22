import type { User } from "@ps/domain/schedule/user/model.ts";
import type { Session } from "@ps/domain/session/model.ts";
import type { SessionCreateService } from "@ps/domain/session/create/service.ts";
import type { SessionPayload } from "../SessionPayload.ts";
import { create, getNumericDate } from "djwt/mod.ts";
import { key } from "../key.ts";

export class SessionCreateServiceJWTAdapter implements SessionCreateService {
    private static EXP_SEC = 60 * 60 * 2;

    public async create(userId: User["id"]): Promise<Session> {
        const payload: SessionPayload = {
            exp: getNumericDate(
                SessionCreateServiceJWTAdapter.EXP_SEC,
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
