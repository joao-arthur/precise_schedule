import type { User } from "@ps/domain/schedule/user/User.ts";
import type { FindUserService } from "@ps/domain/schedule/user/find/FindUserService.ts";

export class FindUserServiceMock implements FindUserService {
    constructor(private readonly user: User) {}

    public findById(): User {
        return this.user;
    }

    public findByCredentials(): User {
        return this.user;
    }
}
