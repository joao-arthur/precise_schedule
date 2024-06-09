import type { EventCreateModel } from "../../create/model.ts";
import type { PartyCreateFactory } from "./factory.ts";

export class PartyCreateFactoryStub implements PartyCreateFactory {
    constructor(private readonly event: EventCreateModel) {}

    public build(): EventCreateModel {
        return this.event;
    }
}
