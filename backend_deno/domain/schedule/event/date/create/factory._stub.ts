import type { EventCreateModel } from "../../create/model.ts";
import type { DateCreateFactory } from "./factory.ts";

export class DateCreateFactoryStub implements DateCreateFactory {
    constructor(private readonly event: EventCreateModel) {}

    public build(): EventCreateModel {
        return this.event;
    }
}
