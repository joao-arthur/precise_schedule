import type { EventUpdateModel } from "../../update/model.ts";
import type { PartyUpdateModel } from "./model.ts";

export type PartyUpdateFactory = {
    readonly build: (event: PartyUpdateModel) => EventUpdateModel;
};
