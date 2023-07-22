import type { EventUpdateModel } from "../../update/model.ts";
import type { BirthdayUpdateFactory } from "./factory.ts";

export class BirthdayUpdateFactoryStub implements BirthdayUpdateFactory {
    constructor(private readonly event: EventUpdateModel) {}

    public build(): EventUpdateModel {
        return this.event;
    }
}
