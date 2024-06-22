import type { Session } from "../../domain/session/service.ts";
import type { User } from "../../domain/schedule/user/model.ts";
import type { SessionService } from "../../domain/session/service.ts";
import { verify } from "djwt/mod.ts";
import { err, ok } from "../../domain/lang/result.ts";
import { create, getNumericDate } from "djwt/mod.ts";
import { SessionCreateErr, SessionDecodeErr } from "../../domain/session/service.ts";

export type SessionPayload = {
    readonly exp: number;
    readonly userId: string;
};

export const key = await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
);

const EXP_SEC = 60 * 60 * 2;

export function sessionJWT(): SessionService {
    return {
        create: async (userId: User["id"]) => {
            const payload: SessionPayload = {
                exp: getNumericDate(EXP_SEC),
                userId,
            };
            try {
                const token = await create(
                    { alg: "HS512", typ: "JWT" },
                    payload,
                    key,
                );
                return ok({ token });
            } catch {
                return err(new SessionCreateErr());
            }
        },
        decode: async (session: Session) => {
            try {
                const payload = await verify(session.token, key);
                const userId = (payload as SessionPayload).userId;
                return ok(userId);
            } catch {
                return err(new SessionDecodeErr());
            }
        },
    };
}
