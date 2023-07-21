import type { User } from "../../user/User.ts";
import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateDateEvent } from "@ps/domain/schedule/event/createDate/CreateDateEvent.ts";

export type CreateDateEventService = {
    readonly create: (userId: User["id"], event: CreateDateEvent) => Promise<Event>;
};
