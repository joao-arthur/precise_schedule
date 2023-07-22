import type { EventCreateModel } from "../../create/model.ts";
import type { AppointmentCreateFactory } from "./factory.ts";

export class AppointmentCreateFactoryStub implements AppointmentCreateFactory {
    constructor(private readonly event: EventCreateModel) {}

    public build(): EventCreateModel {
        return this.event;
    }
}
