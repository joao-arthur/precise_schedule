import type { Event } from "./model.ts";
import { ok } from "../../lang/result.ts";
import { EventRepo } from "./repo.ts";

export function eventRepoStubBuild(
    readByUser: Event[],
    readByUserAndId: Event | undefined,
): EventRepo {
    return {
        cCreate: () => Promise.resolve(ok(undefined)),
        cUpdate: () => Promise.resolve(ok(undefined)),
        cReadByUser: () => Promise.resolve(ok(readByUser)),
        cReadByUserAndId: () => Promise.resolve(ok(readByUserAndId)),
        cDelete: () => Promise.resolve(ok(undefined)),
    };
}
