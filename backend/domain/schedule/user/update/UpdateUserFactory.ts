import type { User } from "../User.ts";
import type { UpdateUserModel } from "./UpdateUserModel.ts";

export type UpdateUserFactory = {
    readonly build: (user: UpdateUserModel, id: User["id"]) => User;
};
