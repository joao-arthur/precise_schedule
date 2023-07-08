import type { UpdateEventModel } from "@ps/domain/schedule/event/update/UpdateEventModel.ts";
import type { UpdateBirthdayEventFactory } from "@ps/domain/schedule/event/updateBirthday/UpdateBirthdayEventFactory.ts";

export class UpdateBirthdayEventFactoryMock
    implements UpdateBirthdayEventFactory {
    constructor(private readonly event: UpdateEventModel) {}

    public build(): UpdateEventModel {
        return this.event;
    }
}
