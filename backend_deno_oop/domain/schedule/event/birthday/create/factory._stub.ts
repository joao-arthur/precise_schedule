import type { EventCreateModel } from "../../create/model.ts";
import type { BirthdayCreateFactory } from "./factory.ts";

export class BirthdayCreateFactoryStub implements BirthdayCreateFactory {
    constructor(private readonly event: EventCreateModel) {}

    public build(): EventCreateModel {
        return this.event;
    }
}
