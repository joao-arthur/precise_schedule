import type { UserRepository } from "../../../domain/schedule/user/repository.ts";
import { Context, Next } from "oak/mod.ts";
import { ValidateUserSessionServiceImpl } from "../../../domain/userSession/service.impl.ts";
import { UserFindServiceImpl } from "../../../domain/schedule/user/find/service.impl.ts";
import { SessionMiddlewareImpl } from "@ps/application/http/middleware/session/middleware.impl.ts";
import { SessionFromRequestServiceImpl } from "@ps/application/http/sessionFromRequest/service.impl.ts";
import { DecodeSessionServiceJWTAdapter } from "../../../session/decode/jwt.adapter.ts";

export class SessionMiddlewareOakAdapter {
    constructor(private readonly repository: UserRepository) {}

    public async handle(ctx: Context, next: Next): Promise<void> {
        const req = ctx.request;
        const isUserLogin = req.method === "POST" && req.url.pathname === "/user/login";
        const isUserRegister = req.method === "POST" && req.url.pathname === "/user";
        if (isUserLogin || isUserRegister) {
            await next();
            return;
        }
        const sessionMiddleware = new SessionMiddlewareImpl(
            new SessionFromRequestServiceImpl(),
            new ValidateUserSessionServiceImpl(
                new UserFindServiceImpl(new UserFindFactoryImpl(), this.repository),
                new DecodeSessionServiceJWTAdapter(),
            ),
        );
        await sessionMiddleware.handle({
            headers: {
                authorization: req.headers.get("authorization"),
            },
        });
        await next();
    }
}
