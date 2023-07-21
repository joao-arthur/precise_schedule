import type { UpdateEventModel } from "../update/UpdateEventModel.ts";
import type { UpdatePartyEvent } from "./UpdatePartyEvent.ts";

export type UpdatePartyEventFactory = {
    readonly build: (event: UpdatePartyEvent) => UpdateEventModel;
};
