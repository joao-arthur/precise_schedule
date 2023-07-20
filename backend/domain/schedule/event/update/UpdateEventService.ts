import type { User } from "@ps/domain/schedule/user/User.ts";
import type { Event } from "../Event.ts";
import type { UpdateEventModel } from "./UpdateEventModel.ts";

export type UpdateEventService = {
    readonly update: (
        userId: User["id"],
        id: Event["id"],
        event: UpdateEventModel,
    ) => Promise<Event>;
};
