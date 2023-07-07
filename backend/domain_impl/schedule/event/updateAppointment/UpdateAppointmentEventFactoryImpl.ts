import type { UpdateEventModel } from "@ps/domain/schedule/event/update/UpdateEventModel.ts";
import type { UpdateAppointmentEvent } from "@ps/domain/schedule/event/updateAppointment/UpdateAppointmentEvent.ts";
import type { UpdateAppointmentEventFactory } from "@ps/domain/schedule/event/updateAppointment/UpdateAppointmentEventFactory.ts";

export class UpdateAppointmentEventFactoryImpl
    implements UpdateAppointmentEventFactory {
    public build(event: UpdateAppointmentEvent): UpdateEventModel {
        return {
            name: event.name,
            day: event.day,
            begin: event.begin,
            end: event.end,
            category: "APPOINTMENT",
            frequency: event.frequency,
            weekendRepeat: event.weekendRepeat,
        };
    }
}
