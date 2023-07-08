import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateDateEvent } from "@ps/domain/schedule/event/updateDate/UpdateDateEvent.ts";

export type UpdateDateEventService = {
    readonly update: (
        id: Event["id"],
        event: UpdateDateEvent,
    ) => Promise<Event>;
};
