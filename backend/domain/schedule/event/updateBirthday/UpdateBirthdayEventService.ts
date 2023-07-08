import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateBirthdayEvent } from "@ps/domain/schedule/event/updateBirthday/UpdateBirthdayEvent.ts";

export type UpdateBirthdayEventService = {
    readonly update: (
        id: Event["id"],
        event: UpdateBirthdayEvent,
    ) => Promise<Event>;
};
