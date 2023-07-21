import type { User } from "../../user/User.ts";
import type { Event } from "../Event.ts";

export type FindEventRepository = {
    readonly findByUser: (userId: User["id"]) => Promise<Event[]>;
    readonly findByUserAndId: (userId: User["id"], id: Event["id"]) => Promise<Event | undefined>;
};
