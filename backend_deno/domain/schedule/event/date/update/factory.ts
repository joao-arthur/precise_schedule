import type { EventUpdateModel } from "../../update/model.ts";
import type { DateUpdateModel } from "./model.ts";

export type DateUpdateFactory = {
    readonly build: (event: DateUpdateModel) => EventUpdateModel;
};
