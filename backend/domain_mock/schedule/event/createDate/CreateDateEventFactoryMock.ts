import type { CreateEventModel } from "@ps/domain/schedule/event/create/CreateEventModel.ts";
import type { CreateDateEventFactory } from "@ps/domain/schedule/event/createDate/CreateDateEventFactory.ts";

export class CreateDateEventFactoryMock
    implements CreateDateEventFactory {
    constructor(private readonly event: CreateEventModel) {}

    public build(): CreateEventModel {
        return this.event;
    }
}
