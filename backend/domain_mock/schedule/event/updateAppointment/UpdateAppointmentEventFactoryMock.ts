import type { UpdateEventModel } from "@ps/domain/schedule/event/update/UpdateEventModel.ts";
import type { UpdateAppointmentEventFactory } from "@ps/domain/schedule/event/updateAppointment/UpdateAppointmentEventFactory.ts";

export class UpdateAppointmentEventFactoryMock implements UpdateAppointmentEventFactory {
    constructor(private readonly event: UpdateEventModel) {}

    public build(): UpdateEventModel {
        return this.event;
    }
}
