import type { EventUpdateModel } from "../../update/model.ts";
import type { AppointmentUpdateFactory } from "./factory.ts";

export class AppointmentUpdateFactoryStub implements AppointmentUpdateFactory {
    constructor(private readonly event: EventUpdateModel) {}

    public build(): EventUpdateModel {
        return this.event;
    }
}
