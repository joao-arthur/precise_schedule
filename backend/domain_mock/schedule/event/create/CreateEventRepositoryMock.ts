import type { CreateEventRepository } from "@ps/domain/schedule/event/create/CreateEventRepository.ts";

export class CreateEventRepositoryMock
    implements CreateEventRepository {
    create(): void {}
}
