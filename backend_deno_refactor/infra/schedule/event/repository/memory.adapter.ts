import type { Result } from "@ps/domain/lang/result.ts";
import type { RepositoryError } from "@ps/domain/repository/RepositoryError.ts";
import type { User } from "@ps/domain/schedule/user/model.ts";
import type { Event } from "@ps/domain/schedule/event/model.ts";
import type { EventRepository } from "@ps/domain/schedule/event/repository.ts";

import { buildOk } from "@ps/domain/lang/result.ts";

export class EventRepositoryMemory implements EventRepository {
    private readonly events: Event[] = [];

    public create(event: Event): Promise<Result<void, RepositoryError>> {
        this.events.push(event);
        return Promise.resolve(buildOk(undefined));
    }

    public update(userToUpdate: Event): Promise<Result<void, RepositoryError>> {
        const index = this.events.findIndex((event) => event.id === userToUpdate.id);
        this.events.splice(index, 1, userToUpdate);
        return Promise.resolve(buildOk(undefined));
    }

    public findByUser(
        userId: User["id"],
    ): Promise<Result<readonly Event[], RepositoryError>> {
        const events = this.events.filter((event) => event.user === userId);
        return Promise.resolve(buildOk(events));
    }

    public findByUserAndId(
        userId: User["id"],
        id: Event["id"],
    ): Promise<Result<Event | undefined, RepositoryError>> {
        const event = this.events.find((event) => event.id === id && event.user === userId);
        return Promise.resolve(buildOk(event));
    }

    public del(id: Event["id"]): Promise<Result<void, RepositoryError>> {
        const index = this.events.findIndex((event) => event.id === id);
        this.events.splice(index, 1);
        return Promise.resolve(buildOk(undefined));
    }
}
