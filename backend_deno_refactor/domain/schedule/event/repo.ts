import type { Result } from "../../lang/result.ts";
import type { RepositoryError } from "../../repository/RepositoryError.ts";
import type { User } from "../user/model.ts";
import type { Event } from "./model.ts";

type Op<Data> = Promise<Result<Data, RepositoryError>>;

export type EventRepo = {
    readonly cCreate: (event: Event) => Op<void>;
    readonly cUpdate: (event: Event) => Op<void>;
    readonly cReadByUser: (userId: User["id"]) => Op<readonly Event[]>;
    readonly cReadByUserAndEventId: (
        userId: User["id"],
        eventId: Event["id"],
    ) => Op<Event | undefined>;
    readonly cDelete: (eventId: Event["id"]) => Op<void>;
};
