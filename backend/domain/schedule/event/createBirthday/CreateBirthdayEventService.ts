import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateBirthdayEvent } from "@ps/domain/schedule/event/createBirthday/CreateBirthdayEvent.ts";

export type CreateBirthdayEventService = {
    readonly create: (
        event: CreateBirthdayEvent,
    ) => Promise<Event>;
};
