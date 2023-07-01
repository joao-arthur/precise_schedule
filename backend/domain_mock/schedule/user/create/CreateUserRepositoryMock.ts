import type { CreateUserRepository } from "@ps/domain/schedule/user/create/CreateUserRepository.ts";

export class CreateUserRepositoryMock
    implements CreateUserRepository {
    create(): void {}
}
