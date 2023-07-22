import type { IdGenerator } from "../../../generation/idGenerator/service.ts";
import type { User } from "../../user/model.ts";
import type { Event } from "../model.ts";
import type { EventCreateModel } from "./model.ts";
import type { EventCreateFactory } from "./factory.ts";

export class EventCreateFactoryImpl implements EventCreateFactory {
    constructor(private readonly idGenerator: IdGenerator) {}

    public build(userId: User["id"], event: EventCreateModel): Event {
        return {
            id: this.idGenerator.generate(),
            name: event.name,
            day: event.day,
            begin: event.begin,
            end: event.end,
            category: event.category,
            frequency: event.frequency,
            weekendRepeat: event.weekendRepeat,
            user: userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}
