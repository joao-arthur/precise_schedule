import { User } from "../../user/model.ts";
import type { Event } from "../model.ts";
import type { EventFindModel } from "./model.ts";

export type EventFindService = {
    readonly findByUser: (userId: User["id"]) => Promise<Event[]>;
    readonly findByUserMapped: (userId: User["id"]) => Promise<EventFindModel[]>;
    readonly findByUserAndId: (userId: User["id"], id: Event["id"]) => Promise<Event>;
    readonly findByUserAndIdMapped: (
        userId: User["id"],
        id: Event["id"],
    ) => Promise<EventFindModel>;
};
