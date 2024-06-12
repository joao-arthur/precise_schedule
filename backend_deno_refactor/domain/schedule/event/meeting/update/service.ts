import type { Result } from "../../../../lang/result.ts";
import type { RepositoryError } from "../../../../repository/RepositoryError.ts";
import type { ValidationError } from "../../../../validation/ValidationError.ts";
import type { User } from "../../../user/model.ts";
import type { EventNotFound } from "../../find/error.eventNotFound.ts";
import type { Event } from "../../model.ts";
import type { MeetingUpdateModel } from "./model.ts";

export type MeetingUpdateErrors =
    | RepositoryError
    | ValidationError
    | EventNotFound;

export type MeetingUpdateService = {
    readonly update: (
        userId: User["id"],
        id: Event["id"],
        event: MeetingUpdateModel,
    ) => Promise<Result<Event, MeetingUpdateErrors>>;
};
