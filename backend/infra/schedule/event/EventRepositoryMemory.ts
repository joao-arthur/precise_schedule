import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { EventRepository } from "@ps/domain/schedule/event/EventRepository.ts";

export class EventRepositoryMemory implements EventRepository {
    private readonly events: Event[] = [];

    public create(event: Event): void {
        this.events.push(event);
    }

    public update(userToUpdate: Event): void {
        this.events.splice(
            this.events.findIndex((event) =>
                event.id === userToUpdate.id
            ),
            1,
            userToUpdate,
        );
    }

    public findById(id: Event["id"]): Event | undefined {
        return this.events.find((event) => event.id === id);
    }

    public del(id: Event["id"]): void {
        this.events.splice(
            this.events.findIndex((event) => event.id === id),
            1,
        );
    }
}
