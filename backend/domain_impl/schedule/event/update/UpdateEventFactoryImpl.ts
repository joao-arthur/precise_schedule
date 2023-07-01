import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateEventModel } from "@ps/domain/schedule/event/update/UpdateEventModel.ts";
import type { UpdateEventFactory } from "@ps/domain/schedule/event/update/UpdateEventFactory.ts";

export class UpdateEventFactoryImpl implements UpdateEventFactory {
    public build(user: UpdateEventModel, id: Event["id"]): Event {
        return {
            id,
            name: user.name,
            begin: user.begin,
            end: user.end,
        };
    }
}
