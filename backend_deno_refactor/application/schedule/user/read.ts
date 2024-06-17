import type { User } from "../../../domain/schedule/user/model.ts";
import type { UserRepo } from "../../../domain/schedule/user/repo.ts";
import type { HTTPResponse } from "../../http/response.ts";
import { userInfoReadById } from "../../../domain/schedule/user/read.ts";
import { badRequest, ok } from "../../http/response.ts";

export async function userInfoReadController(
    repo: UserRepo,
    userId: User["id"],
): Promise<HTTPResponse> {
    const result = await userInfoReadById(repo, userId);
    switch (result.type) {
        case "ok":
            return ok(result.data);
        case "err":
            return badRequest({ message: result.error.message });
    }
}
