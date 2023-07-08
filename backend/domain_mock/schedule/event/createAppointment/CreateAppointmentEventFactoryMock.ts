import type { CreateEventModel } from "@ps/domain/schedule/event/create/CreateEventModel.ts";
import type { CreateAppointmentEventFactory } from "@ps/domain/schedule/event/createAppointment/CreateAppointmentEventFactory.ts";

export class CreateAppointmentEventFactoryMock
    implements CreateAppointmentEventFactory {
    constructor(private readonly event: CreateEventModel) {}

    public build(): CreateEventModel {
        return this.event;
    }
}
