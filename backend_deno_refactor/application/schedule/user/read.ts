import type { User } from "../../../domain/schedule/user/model.ts";
import type { UserRepo } from "../../../domain/schedule/user/repo.ts";
import type { HTTPResponse } from "../../http/response.ts";
import { userInfoReadByIdService } from "../../../domain/schedule/user/read.ts";
import { ok } from "../../http/response.ts";
import { errorHandler } from "../../http/errorHandler.ts";

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
