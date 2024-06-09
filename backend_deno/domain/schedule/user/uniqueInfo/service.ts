import type { User } from "../model.ts";
import type { UserUniqueInfoModel } from "./model.ts";

export type UserUniqueInfoService = {
    readonly validateNew: (user: UserUniqueInfoModel) => Promise<void>;
    readonly validateExisting: (user: UserUniqueInfoModel, oldUser: User) => Promise<void>;
};
