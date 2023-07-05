import type { CreateEventModel } from "../create/CreateEventModel.ts";
import type { CreateDateEvent } from "./CreateDateEvent.ts";

export type CreateDateEventFactory = {
    readonly build: (event: CreateDateEvent) => CreateEventModel;
};
