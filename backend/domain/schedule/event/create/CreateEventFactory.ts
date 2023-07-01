import type { Event } from "../Event.ts";
import type { CreateEventModel } from "./CreateEventModel.ts";

export type CreateEventFactory = {
    readonly build: (event: CreateEventModel) => Event;
};
