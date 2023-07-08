import type { UpdateEventModel } from "@ps/domain/schedule/event/update/UpdateEventModel.ts";
import type { UpdateDateEventFactory } from "@ps/domain/schedule/event/updateDate/UpdateDateEventFactory.ts";

export class UpdateDateEventFactoryMock
    implements UpdateDateEventFactory {
    constructor(private readonly event: UpdateEventModel) {}

    public build(): UpdateEventModel {
        return this.event;
    }
}
