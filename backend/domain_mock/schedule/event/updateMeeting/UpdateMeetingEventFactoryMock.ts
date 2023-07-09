import type { UpdateEventModel } from "@ps/domain/schedule/event/update/UpdateEventModel.ts";
import type { UpdateMeetingEventFactory } from "@ps/domain/schedule/event/updateMeeting/UpdateMeetingEventFactory.ts";

export class UpdateMeetingEventFactoryMock implements UpdateMeetingEventFactory {
    constructor(private readonly event: UpdateEventModel) {}

    public build(): UpdateEventModel {
        return this.event;
    }
}
