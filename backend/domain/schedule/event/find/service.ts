import { User } from "../../user/model.ts";
import type { Event } from "../model.ts";

export type EventFindService = {
    readonly findByUser: (userId: User["id"]) => Promise<Event[]>;
    readonly findByUserAndId: (userId: User["id"], id: Event["id"]) => Promise<Event>;
};
