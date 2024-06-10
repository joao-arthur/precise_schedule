import type { Result } from "../../../lang/result.ts";
import type { User } from "../model.ts";
import type { UserUpdateModel } from "./model.ts";

export type UserUpdateService = {
    readonly update: (id: User["id"], user: UserUpdateModel) => Promise<Result<User>>;
};
