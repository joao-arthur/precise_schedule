import type { User } from "../User.ts";

export type UniqueInfoRepository = {
    readonly countUsername: (username: User["username"]) => Promise<number>;
    readonly countEmail: (email: User["email"]) => Promise<number>;
};
