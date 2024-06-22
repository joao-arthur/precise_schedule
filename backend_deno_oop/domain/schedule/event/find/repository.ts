import type { User } from "../../user/model.ts";
import type { Event } from "../model.ts";

export type EventFindRepository = {
    readonly findByUser: (userId: User["id"]) => Promise<Event[]>;
    readonly findByUserAndId: (userId: User["id"], id: Event["id"]) => Promise<Event | undefined>;
};
