import type { Result } from "../../../../lang/result.ts";
import type { RepositoryError } from "../../../../repository/RepositoryError.ts";
import type { ValidationError } from "../../../../validation/ValidationError.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { MeetingCreateModel } from "./model.ts";

export type MeetingCreateErrors =
    | RepositoryError
    | ValidationError;

export type MeetingCreateService = {
    readonly create: (
        userId: User["id"],
        event: MeetingCreateModel,
    ) => Promise<Result<Event, MeetingCreateErrors>>;
};
