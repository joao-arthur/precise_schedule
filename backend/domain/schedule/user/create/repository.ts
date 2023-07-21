import type { User } from "../User.ts";

export type CreateUserRepository = {
    readonly create: (user: User) => Promise<void>;
};
