import type { User } from "../User.ts";

export type UpdateUserRepository = {
    readonly update: (user: User) => Promise<void>;
};
