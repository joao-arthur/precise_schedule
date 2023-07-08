import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateDateEvent } from "@ps/domain/schedule/event/createDate/CreateDateEvent.ts";

export type CreateDateEventService = {
    readonly create: (
        event: CreateDateEvent,
    ) => Promise<Event>;
};
