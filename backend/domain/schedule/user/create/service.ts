import type { Session } from "../../../session/Session.ts";
import type { CreateUserModel } from "./CreateUserModel.ts";

export type CreateUserService = {
    readonly create: (user: CreateUserModel) => Promise<Session>;
};
