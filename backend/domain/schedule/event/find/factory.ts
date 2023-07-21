import type { Event } from "../../event/Event.ts";
import type { FindEventModel } from "./FindEventModel.ts";

export type FindEventFactory = {
    readonly build: (event: Event) => FindEventModel;
};
