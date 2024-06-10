import type { Result } from "../../../lang/result.ts";
import type { User } from "../../user/model.ts";
import type { Event } from "../model.ts";
import type { EventCreateModel } from "./model.ts";

export type EventCreateService = {
    readonly create: (
        userId: User["id"],
        event: EventCreateModel,
    ) => Promise<Result<Event>>;
};
