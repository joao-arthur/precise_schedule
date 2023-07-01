import type { User } from "../User.ts";

export type UniqueInfoRepository = {
    readonly countUsername: (username: User["username"]) => number;
    readonly countEmail: (email: User["email"]) => number;
};
