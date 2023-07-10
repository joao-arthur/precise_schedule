import type { IdGenerator } from "@ps/domain/generation/IdGenerator.ts";
import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateEventModel } from "@ps/domain/schedule/event/create/CreateEventModel.ts";
import type { CreateEventFactory } from "@ps/domain/schedule/event/create/CreateEventFactory.ts";

export class CreateEventFactoryImpl implements CreateEventFactory {
    constructor(private readonly idGenerator: IdGenerator) {}

    public build(event: CreateEventModel): Event {
        const now = new Date();
        return {
            id: this.idGenerator.generate(),
            name: event.name,
            day: event.day,
            begin: event.begin,
            end: event.end,
            category: event.category,
            frequency: event.frequency,
            weekendRepeat: event.weekendRepeat,
            createdAt: now,
            updatedAt: now,
        };
    }
}
