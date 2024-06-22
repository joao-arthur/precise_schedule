import type { EventCreateModel } from "../../create/model.ts";
import type { DateCreateModel } from "./model.ts";

export type DateCreateFactory = {
    readonly build: (event: DateCreateModel) => EventCreateModel;
};
