import type { User } from "../model.ts";

export type UserUniqueInfoRepository = {
    readonly countUsername: (username: User["username"]) => Promise<number>;
    readonly countEmail: (email: User["email"]) => Promise<number>;
};
