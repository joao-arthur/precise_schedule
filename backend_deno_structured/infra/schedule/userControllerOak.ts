import type { Router } from "oak/mod.ts";
import type { UserRepo } from "../../domain/schedule/user/repo.ts";
import type { IdGenerator } from "../../domain/generator.ts";
import type { DateGenerator } from "../../domain/generator.ts";
import type { SessionService } from "../../domain/session/service.ts";
import type { UserCreate } from "../../domain/schedule/user/create.ts";
import type { UserUpdate } from "../../domain/schedule/user/update.ts";
import type { UserLogin } from "../../domain/schedule/user/login.ts";
import { reqBuild } from "../../application/http/request.ts";
import {
    userCreateEndpoint,
    userInfoReadByIdEndpoint,
    userLoginEndpoint,
    userUpdateEndpoint,
} from "../../application/schedule/user.ts";
import { bodyBuild, resultBuild, userIdBuild } from "../http/httpOak.ts";

export function userControllerOak(
    repo: UserRepo,
    idGenerator: IdGenerator,
    dateGenerator: DateGenerator,
    sessionService: SessionService,
    router: Router,
): void {
    router
        .post("/user", async (ctx) => {
            const body = await bodyBuild<UserCreate>(ctx);
            const req = reqBuild(body, {}, {});
            const res = await userCreateEndpoint(
                repo,
                idGenerator,
                dateGenerator,
                sessionService,
                req,
            );
            resultBuild(res, ctx);
        })
        .put("/user", async (ctx) => {
            const userId = await userIdBuild(ctx);
            const body = await bodyBuild<UserUpdate>(ctx);
            const req = reqBuild(body, {}, {});
            const res = await userUpdateEndpoint(repo, dateGenerator, userId, req);
            resultBuild(res, ctx);
        })
        .get("/user", async (ctx) => {
            const userId = await userIdBuild(ctx);
            const res = await userInfoReadByIdEndpoint(repo, userId);
            resultBuild(res, ctx);
        })
        .post("/user/login", async (ctx) => {
            const body = await bodyBuild<UserLogin>(ctx);
            const req = reqBuild(body, {}, {});
            const res = await userLoginEndpoint(repo, sessionService, req);
            resultBuild(res, ctx);
        });
}
