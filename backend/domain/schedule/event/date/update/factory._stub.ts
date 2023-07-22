import type { EventUpdateModel } from "../../update/model.ts";
import type { DateUpdateFactory } from "./factory.ts";

export class DateUpdateFactoryStub implements DateUpdateFactory {
    constructor(private readonly event: EventUpdateModel) {}

    public build(): EventUpdateModel {
        return this.event;
    }
}
