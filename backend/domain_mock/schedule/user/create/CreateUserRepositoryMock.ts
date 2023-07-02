import type { CreateUserRepository } from "@ps/domain/schedule/user/create/CreateUserRepository.ts";

export class CreateUserRepositoryMock
    implements CreateUserRepository {
    public async create(): Promise<void> {}
}
