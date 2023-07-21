import type { CreateEventModel } from "@ps/domain/schedule/event/create/CreateEventModel.ts";
import type { CreateMeetingEventFactory } from "@ps/domain/schedule/event/createMeeting/CreateMeetingEventFactory.ts";

export class CreateMeetingEventFactoryMock implements CreateMeetingEventFactory {
    constructor(private readonly event: CreateEventModel) {}

    public build(): CreateEventModel {
        return this.event;
    }
}
