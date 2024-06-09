import type { EventCreateModel } from "../../create/model.ts";
import type { MeetingCreateFactory } from "./factory.ts";

export class MeetingCreateFactoryStub implements MeetingCreateFactory {
    constructor(private readonly event: EventCreateModel) {}

    public build(): EventCreateModel {
        return this.event;
    }
}
