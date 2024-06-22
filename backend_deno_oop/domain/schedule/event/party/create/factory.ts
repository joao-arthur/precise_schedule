import type { EventCreateModel } from "../../create/model.ts";
import type { PartyCreateModel } from "./model.ts";

export type PartyCreateFactory = {
    readonly build: (event: PartyCreateModel) => EventCreateModel;
};
