import type { Session } from "../../../session/model.ts";
import type { UserCreateModel } from "./model.ts";

export type UserCreateService = {
    readonly create: (user: UserCreateModel) => Promise<Session>;
};
