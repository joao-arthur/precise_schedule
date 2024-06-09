import type { User } from "../model.ts";

export type UserUpdateRepository = {
    readonly update: (user: User) => Promise<void>;
};
