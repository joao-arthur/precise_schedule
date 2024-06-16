import type { Op } from "../../repository/repo.ts";
import type { User } from "../user/model.ts";
import type { Event } from "./model.ts";

export type EventRepo = {
    readonly cCreate: (event: Event) => Op<void>;
    readonly cUpdate: (event: Event) => Op<void>;
    readonly cReadOne: (user: User["id"], event: Event["id"]) => Op<Event | undefined>;
    readonly cReadMany: (userId: User["id"]) => Op<readonly Event[]>;
    readonly cDelete: (eventId: Event["id"]) => Op<void>;
};
