import { EventFindFactory } from "./factory.ts";
import { EventFindModel } from "./model.ts";

export class EventFindFactoryStub implements EventFindFactory {
    constructor(private readonly event: EventFindModel) {}

    public build(): EventFindModel {
        return this.event;
    }
}
