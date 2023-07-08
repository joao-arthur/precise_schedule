import type { CreateEventModel } from "@ps/domain/schedule/event/create/CreateEventModel.ts";
import type { CreateBirthdayEventFactory } from "@ps/domain/schedule/event/createBirthday/CreateBirthdayEventFactory.ts";

export class CreateBirthdayEventFactoryMock
    implements CreateBirthdayEventFactory {
    constructor(private readonly event: CreateEventModel) {}

    public build(): CreateEventModel {
        return this.event;
    }
}
