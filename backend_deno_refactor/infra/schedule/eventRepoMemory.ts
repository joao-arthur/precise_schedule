import type { Result } from "../../domain/lang/result.ts";
import type { RepoError } from "../../domain/repository/repo.ts";
import type { User } from "../../domain/schedule/user/model.ts";
import type { Event } from "../../domain/schedule/event/model.ts";
import type { EventRepo } from "../../domain/schedule/event/repo.ts";
import { ok } from "../../domain/lang/result.ts";

export function eventRepoMemory(): EventRepo {
    const events: Event[] = [];

    return {
        cCreate: (event: Event): Promise<Result<void, RepoError>> => {
            events.push(event);
            return Promise.resolve(ok(undefined));
        },
        cUpdate: (userToUpdate: Event): Promise<Result<void, RepoError>> => {
            const index = events.findIndex((event) => event.id === userToUpdate.id);
            events.splice(index, 1, userToUpdate);
            return Promise.resolve(ok(undefined));
        },
        cReadMany: (
            userId: User["id"],
        ): Promise<Result<readonly Event[], RepoError>> => {
            const userEvents = events.filter((event) => event.user === userId);
            return Promise.resolve(ok(userEvents));
        },
        cReadOne: (
            userId: User["id"],
            id: Event["id"],
        ): Promise<Result<Event | undefined, RepoError>> => {
            const userEvent = events.find((event) => event.id === id && event.user === userId);
            return Promise.resolve(ok(userEvent));
        },
        cDelete: (id: Event["id"]): Promise<Result<void, RepoError>> => {
            const index = events.findIndex((event) => event.id === id);
            events.splice(index, 1);
            return Promise.resolve(ok(undefined));
        },
    };
}
