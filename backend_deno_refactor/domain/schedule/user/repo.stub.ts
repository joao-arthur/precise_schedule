import type { User } from "./model.ts";
import type { UserRepo } from "./repo.ts";
import { RepoError } from "../../repository/repo.ts";
import { err, ok } from "../../lang/result.ts";

export function userRepoStubBuild(
    user: User,
    countUsername: number,
    countEmail: number,
): UserRepo {
    return {
        cCreate: () => Promise.resolve(ok(undefined)),
        cUpdate: () => Promise.resolve(ok(undefined)),
        cReadById: () => Promise.resolve(ok(user)),
        cReadByCredentials: () => Promise.resolve(ok(user)),
        cCountUsername: () => Promise.resolve(ok(countUsername)),
        cCountEmail: () => Promise.resolve(ok(countEmail)),
    };
}

export function userRepoEmptyStubBuild(): UserRepo {
    return {
        cCreate: () => Promise.resolve(ok(undefined)),
        cUpdate: () => Promise.resolve(ok(undefined)),
        cReadById: () => Promise.resolve(ok(undefined)),
        cReadByCredentials: () => Promise.resolve(ok(undefined)),
        cCountUsername: () => Promise.resolve(ok(0)),
        cCountEmail: () => Promise.resolve(ok(0)),
    };
}

export function userRepoErrStubBuild(): UserRepo {
    return {
        cCreate: () => Promise.resolve(err(new RepoError())),
        cUpdate: () => Promise.resolve(err(new RepoError())),
        cReadById: () => Promise.resolve(err(new RepoError())),
        cReadByCredentials: () => Promise.resolve(err(new RepoError())),
        cCountUsername: () => Promise.resolve(err(new RepoError())),
        cCountEmail: () => Promise.resolve(err(new RepoError())),
    };
}
