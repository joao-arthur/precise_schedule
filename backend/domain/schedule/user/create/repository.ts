import type { User } from "../model.ts";

export type UserCreateRepository = {
    readonly create: (user: User) => Promise<void>;
};
