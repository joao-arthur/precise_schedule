import type { EventDeleteRepository } from "./repository.ts";

export class EventDeleteRepositoryStub implements EventDeleteRepository {
    public async del(): Promise<void> {}
}
