import type { IdGenerator } from "../../domain/generator/id.ts";
import type { DateGenerator } from "../../domain/generator/date.ts";
import type { SessionService } from "../../domain/session/service.ts";
import type { User } from "../../domain/schedule/user/model.ts";
import type { UserCreate } from "../../domain/schedule/user/create.ts";
import type { UserUpdate } from "../../domain/schedule/user/update.ts";
import type { UserLogin } from "../../domain/schedule/user/login.ts";
import type { UserRepo } from "../../domain/schedule/user/repo.ts";
import type { HTTPRequest } from "../http/request.ts";
import type { HTTPResponse } from "../http/response.ts";
import { userInfoReadByIdService } from "../../domain/schedule/user/read.ts";
import { userCreateService } from "../../domain/schedule/user/create.ts";
import { userUpdateService } from "../../domain/schedule/user/update.ts";
import { userLoginService } from "../../domain/schedule/user/login.ts";
import { noContent, ok } from "../http/response.ts";
import { errorHandler } from "../http/errorHandler.ts";

export async function userCreateController(
    repo: UserRepo,
    idGenerator: IdGenerator,
    dateGenerator: DateGenerator,
    sessionService: SessionService,
    req: HTTPRequest<UserCreate>,
): Promise<HTTPResponse> {
    const result = await userCreateService(
        repo,
        idGenerator,
        dateGenerator,
        sessionService,
        req.body,
    );
    switch (result.type) {
        case "ok":
            return ok(result.data);
        case "err":
            return errorHandler(result.error);
    }
}

export async function userUpdateController(
    repo: UserRepo,
    dateGenerator: DateGenerator,
    userId: User["id"],
    req: HTTPRequest<UserUpdate>,
): Promise<HTTPResponse> {
    const result = await userUpdateService(repo, dateGenerator, userId, req.body);
    switch (result.type) {
        case "ok":
            return noContent();
        case "err":
            return errorHandler(result.error);
    }
}

export async function userLoginController(
    repo: UserRepo,
    sessionService: SessionService,
    req: HTTPRequest<UserLogin>,
): Promise<HTTPResponse> {
    const result = await userLoginService(repo, sessionService, req.body);
    switch (result.type) {
        case "ok":
            return ok(result.data);
        case "err":
            return errorHandler(result.error);
    }
}

export async function userInfoReadByIdController(
    repo: UserRepo,
    userId: User["id"],
): Promise<HTTPResponse> {
    const result = await userInfoReadByIdService(repo, userId);
    switch (result.type) {
        case "ok":
            return ok(result.data);
        case "err":
            return errorHandler(result.error);
    }
}
