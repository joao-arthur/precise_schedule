import type { User } from "../../user/User.ts";
import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateBirthdayEvent } from "@ps/domain/schedule/event/createBirthday/CreateBirthdayEvent.ts";

export type CreateBirthdayEventService = {
    readonly create: (userId: User["id"], event: CreateBirthdayEvent) => Promise<Event>;
};
