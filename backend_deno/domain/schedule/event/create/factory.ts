import type { User } from "../../user/model.ts";
import type { Event } from "../model.ts";
import type { EventCreateModel } from "./model.ts";

export type EventCreateFactory = {
    readonly build: (userId: User["id"], event: EventCreateModel) => Event;
};
