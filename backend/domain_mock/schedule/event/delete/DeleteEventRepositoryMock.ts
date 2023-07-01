import type { DeleteEventRepository } from "@ps/domain/schedule/event/delete/DeleteEventRepository.ts";

export class DeleteEventRepositoryMock
    implements DeleteEventRepository {
    del(): void {}
}
