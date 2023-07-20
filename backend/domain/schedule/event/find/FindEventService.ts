import { User } from "../../user/User.ts";
import type { Event } from "../Event.ts";

export type FindEventService = {
    readonly findByUserAndId: (userId: User["id"], id: Event["id"]) => Promise<Event>;
};
