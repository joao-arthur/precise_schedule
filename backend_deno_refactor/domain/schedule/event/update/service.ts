import type { Result } from "../../../lang/result.ts";
import type { User } from "../../user/model.ts";
import type { Event } from "../model.ts";
import type { EventUpdateModel } from "./model.ts";

export type EventUpdateService = {
    readonly update: (
        userId: User["id"],
        id: Event["id"],
        event: EventUpdateModel,
    ) => Promise<Result<Event>>;
};
