import type { EventUpdateModel } from "../../update/model.ts";
import type { PartyUpdateFactory } from "./factory.ts";

export class PartyUpdateFactoryStub implements PartyUpdateFactory {
    constructor(private readonly event: EventUpdateModel) {}

    public build(): EventUpdateModel {
        return this.event;
    }
}
