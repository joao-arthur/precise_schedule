import type { IdGenerator } from "@ps/domain/generation/IdGenerator.ts";
import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateEventModel } from "@ps/domain/schedule/event/create/CreateEventModel.ts";
import type { CreateEventFactory } from "@ps/domain/schedule/event/create/CreateEventFactory.ts";

export class CreateEventFactoryImpl implements CreateEventFactory {
    constructor(private readonly idGenerator: IdGenerator) {}

    public build(user: CreateEventModel): Event {
        return {
            id: this.idGenerator.generate(),
            name: user.name,
            begin: user.begin,
            end: user.end,
        };
    }
}
