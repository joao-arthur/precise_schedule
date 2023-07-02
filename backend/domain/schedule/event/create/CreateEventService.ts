import type { Event } from "../Event.ts";
import type { CreateEventModel } from "./CreateEventModel.ts";

export type CreateEventService = {
    readonly create: (event: CreateEventModel) => Promise<Event>;
};
