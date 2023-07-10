import type { UserRepository } from "@ps/domain/schedule/user/UserRepository.ts";

import { Context, Next } from "oak/mod.ts";
import { ValidateUserSessionServiceImpl } from "@ps/domain_impl/userSession/ValidateUserSessionServiceImpl.ts";
import { FindUserServiceImpl } from "@ps/domain_impl/schedule/user/find/FindUserServiceImpl.ts";
import { DecodeSessionServiceJWTAdapter } from "@ps/infra/session/decode/DecodeSessionServiceJWTAdapter.ts";
import { unauthorized } from "@ps/application_impl/http/builder/400/unauthorized.ts";
import { SessionMiddlewareImpl } from "@ps/application_impl/http/middleware/SessionMiddlewareImpl.ts";
import { SessionFromRequestServiceImpl } from "@ps/application_impl/http/session/SessionFromRequestServiceImpl.ts";

export class SessionMiddlewareOakAdapter {
    constructor(private readonly repository: UserRepository) {}

    public async handle(
        // deno-lint-ignore no-explicit-any
        context: Context<Record<string, any>, Record<string, any>>,
        next: Next,
    ): Promise<void> {
        const { request, response } = context;
        const isLogin = request.method === "POST" && request.url.pathname === "/user/login";
        const isUserRegister = request.method === "POST" && request.url.pathname === "/user";
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
                    Authorization: request.headers.get("Authorization"),
                },
            });
            await next();
        } catch {
            const res = unauthorized();
            response.body = res.body;
            response.status = res.status;
            return;
        }
    }
}
