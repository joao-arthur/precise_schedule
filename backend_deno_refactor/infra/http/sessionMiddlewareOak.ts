import type { UserRepo } from "../../domain/schedule/user/repo.ts";
import { Context, Next } from "oak/mod.ts";
import { sessionMiddleware } from "../../application/http/sessionMiddleware.ts";
import { reqBuild } from "../../application/http/request.ts";
import { sessionJWT } from "../session/sessionJWT.ts";
import { errorHandler } from "../../application/http/errorHandler.ts";
import { resultBuild } from "./httpOak.ts";

export async function sessionMiddlewareOak(
    repo: UserRepo,
    ctx: Context,
    next: Next,
): Promise<void> {
    const req = ctx.request;
    const isUserLogin = req.method === "POST" && req.url.pathname === "/user/login";
    const isUserRegister = req.method === "POST" && req.url.pathname === "/user";
    if (isUserLogin || isUserRegister) {
        await next();
        return;
    }
    const httpREQ = reqBuild(
        undefined,
        {},
        { authorization: req.headers.get("authorization") },
    );
    const result = await sessionMiddleware(repo, sessionJWT(), httpREQ);
    switch (result.type) {
        case "ok":
            await next();
            break;
        case "err": {
            const res = errorHandler(result.error);
            resultBuild(res, ctx);
        }
    }
}
