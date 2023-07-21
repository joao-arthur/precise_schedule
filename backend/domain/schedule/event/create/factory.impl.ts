import type { IdGenerator } from "@ps/domain/generation/IdGenerator.ts";
import type { User } from "@ps/domain/schedule/user/User.ts";
import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateEventModel } from "@ps/domain/schedule/event/create/CreateEventModel.ts";
import type { CreateEventFactory } from "@ps/domain/schedule/event/create/CreateEventFactory.ts";

export class CreateEventFactoryImpl implements CreateEventFactory {
    constructor(private readonly idGenerator: IdGenerator) {}

    public build(userId: User["id"], event: CreateEventModel): Event {
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
