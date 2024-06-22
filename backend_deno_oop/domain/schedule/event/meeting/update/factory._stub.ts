import type { EventUpdateModel } from "../../update/model.ts";
import type { MeetingUpdateFactory } from "./factory.ts";

export class MeetingUpdateFactoryStub implements MeetingUpdateFactory {
    constructor(private readonly event: EventUpdateModel) {}

    public build(): EventUpdateModel {
        return this.event;
    }
}
