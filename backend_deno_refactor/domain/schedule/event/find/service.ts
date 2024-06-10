import type { Result } from "../../../lang/result.ts";
import type { User } from "../../user/model.ts";
import type { Event } from "../model.ts";
import type { EventFindModel } from "./model.ts";
import type { EventNotFound } from "./error.eventNotFound.ts";

export type EventFindService = {
    readonly findByUser: (
        userId: User["id"],
    ) => Promise<Result<readonly Event[]>>;
    readonly findByUserMapped: (
        userId: User["id"],
    ) => Promise<Result<readonly EventFindModel[]>>;
    readonly findByUserAndId: (
        userId: User["id"],
        id: Event["id"],
    ) => Promise<Result<Event, EventNotFound>>;
    readonly findByUserAndIdMapped: (
        userId: User["id"],
        id: Event["id"],
    ) => Promise<Result<EventFindModel, EventNotFound>>;
};
