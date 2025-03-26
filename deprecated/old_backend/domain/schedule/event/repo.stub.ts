import type { Event } from "./model.ts";
import type { EventRepo } from "./repo.ts";
import { RepoErr } from "../../repo.ts";
import { err, ok } from "../../lang/result.ts";

export function eventRepoManyStubBuild(many: Event[]): EventRepo {
    return {
        cCreate: () => Promise.resolve(ok(undefined)),
        cUpdate: () => Promise.resolve(ok(undefined)),
        cReadMany: () => Promise.resolve(ok(many)),
        cReadOne: () => Promise.resolve(ok(undefined)),
        cDelete: () => Promise.resolve(ok(undefined)),
    };
}

export function eventRepoOneStubBuild(one: Event): EventRepo {
    return {
        cCreate: () => Promise.resolve(ok(undefined)),
        cUpdate: () => Promise.resolve(ok(undefined)),
        cReadMany: () => Promise.resolve(ok([])),
        cReadOne: () => Promise.resolve(ok(one)),
        cDelete: () => Promise.resolve(ok(undefined)),
    };
}

export function eventRepoEmptyStubBuild(): EventRepo {
    return {
        cCreate: () => Promise.resolve(ok(undefined)),
        cUpdate: () => Promise.resolve(ok(undefined)),
        cReadMany: () => Promise.resolve(ok([])),
        cReadOne: () => Promise.resolve(ok(undefined)),
        cDelete: () => Promise.resolve(ok(undefined)),
    };
}

export function eventRepoErrStubBuild(): EventRepo {
    return {
        cCreate: () => Promise.resolve(err(new RepoErr())),
        cUpdate: () => Promise.resolve(err(new RepoErr())),
        cReadMany: () => Promise.resolve(err(new RepoErr())),
        cReadOne: () => Promise.resolve(err(new RepoErr())),
        cDelete: () => Promise.resolve(err(new RepoErr())),
    };
}
