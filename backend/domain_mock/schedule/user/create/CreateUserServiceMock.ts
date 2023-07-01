import type { User } from "@ps/domain/schedule/user/User.ts";
import type { CreateUserService } from "@ps/domain/schedule/user/create/CreateUserService.ts";

export class CreateUserServiceMock implements CreateUserService {
    constructor(private readonly user: User) {}

    public create(): User {
        return this.user;
    }
}
