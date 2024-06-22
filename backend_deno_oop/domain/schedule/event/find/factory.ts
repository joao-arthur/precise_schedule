import type { Event } from "../../event/model.ts";
import type { EventFindModel } from "./model.ts";

export type EventFindFactory = {
    readonly build: (event: Event) => EventFindModel;
};
