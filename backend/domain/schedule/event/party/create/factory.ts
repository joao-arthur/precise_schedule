import type { CreateEventModel } from "../create/CreateEventModel.ts";
import type { CreatePartyEvent } from "./CreatePartyEvent.ts";

export type CreatePartyEventFactory = {
    readonly build: (event: CreatePartyEvent) => CreateEventModel;
};
