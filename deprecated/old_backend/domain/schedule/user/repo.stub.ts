import type { UserRepo } from "./repo.ts";
import { RepoErr } from "../../repo.ts";
import { err, ok } from "../../lang/result.ts";
import { userStub } from "./model.stub.ts";

export function userRepoUserStubBuild(): UserRepo {
    return {
        cCreate: () => Promise.resolve(ok(undefined)),
        cUpdate: () => Promise.resolve(ok(undefined)),
        cReadById: () => Promise.resolve(ok(userStub)),
        cReadByCredentials: () => Promise.resolve(ok(userStub)),
        cCountUsername: () => Promise.resolve(ok(0)),
        cCountEmail: () => Promise.resolve(ok(0)),
    };
}

export function userRepoCountStubBuild(
    countUsername: number,
    countEmail: number,
): UserRepo {
    return {
        cCreate: () => Promise.resolve(ok(undefined)),
        cUpdate: () => Promise.resolve(ok(undefined)),
        cReadById: () => Promise.resolve(ok(undefined)),
        cReadByCredentials: () => Promise.resolve(ok(undefined)),
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
        cCreate: () => Promise.resolve(err(new RepoErr())),
        cUpdate: () => Promise.resolve(err(new RepoErr())),
        cReadById: () => Promise.resolve(err(new RepoErr())),
        cReadByCredentials: () => Promise.resolve(err(new RepoErr())),
        cCountUsername: () => Promise.resolve(err(new RepoErr())),
        cCountEmail: () => Promise.resolve(err(new RepoErr())),
    };
}
