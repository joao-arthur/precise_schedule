import type { User } from "../User.ts";
import type { UpdateUserModel } from "./UpdateUserModel.ts";

export type UpdateUserService = {
    readonly update: (id: User["id"], user: UpdateUserModel) => User;
};
