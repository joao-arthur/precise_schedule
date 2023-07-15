import type { UserRepository } from "@ps/domain/schedule/user/UserRepository.ts";

import { Context, Next } from "oak/mod.ts";
import { ValidateUserSessionServiceImpl } from "@ps/domain_impl/userSession/ValidateUserSessionServiceImpl.ts";
import { FindUserServiceImpl } from "@ps/domain_impl/schedule/user/find/FindUserServiceImpl.ts";
import { DecodeSessionServiceJWTAdapter } from "@ps/infra/session/decode/DecodeSessionServiceJWTAdapter.ts";
import { unauthorized } from "@ps/application_impl/http/builder/400/unauthorized.ts";
import { SessionMiddlewareImpl } from "@ps/application_impl/http/middleware/SessionMiddlewareImpl.ts";
import { SessionFromRequestServiceImpl } from "@ps/application_impl/http/session/SessionFromRequestServiceImpl.ts";
import { makeResult } from "@ps/infra/http/makeResult.ts";

export class SessionMiddlewareOakAdapter {
    constructor(private readonly repository: UserRepository) {}

    public async handle(ctx: Context, next: Next): Promise<void> {
        const isLogin = ctx.request.method === "POST" && ctx.request.url.pathname === "/user/login";
        const isUserRegister = ctx.request.method === "POST" &&
            ctx.request.url.pathname === "/user";
        if (isLogin || isUserRegister) {
            await next();
            return;
        }
        try {
            const sessionMiddleware = new SessionMiddlewareImpl(
                new SessionFromRequestServiceImpl(),
                new ValidateUserSessionServiceImpl(
                    new FindUserServiceImpl(this.repository),
                    new DecodeSessionServiceJWTAdapter(),
                ),
            );
            await sessionMiddleware.handle({
                headers: {
                    authorization: ctx.request.headers.get("authorization"),
                },
            });
            await next();
        } catch {
            makeResult(unauthorized(), ctx);
            return;
        }
    }
}
