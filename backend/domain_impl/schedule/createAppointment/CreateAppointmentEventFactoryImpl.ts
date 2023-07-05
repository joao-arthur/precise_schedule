import type { CreateEventModel } from "@ps/domain/schedule/event/create/CreateEventModel.ts";
import type { CreateAppointmentEvent } from "@ps/domain/schedule/event/createAppointment/CreateAppointmentEvent.ts";
import type { CreateAppointmentEventFactory } from "@ps/domain/schedule/event/createAppointment/CreateAppointmentEventFactory.ts";

export class CreateAppointmentEventFactoryImpl
    implements CreateAppointmentEventFactory {
    public build(event: CreateAppointmentEvent): CreateEventModel {
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
