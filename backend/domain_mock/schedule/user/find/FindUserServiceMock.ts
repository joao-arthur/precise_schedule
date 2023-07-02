import type { User } from "@ps/domain/schedule/user/User.ts";
import type { FindUserService } from "@ps/domain/schedule/user/find/FindUserService.ts";

export class FindUserServiceMock implements FindUserService {
    constructor(private readonly user: User) {}

    public findById(): Promise<User> {
        return Promise.resolve(this.user);
    }

    public findByCredentials(): Promise<User> {
        return Promise.resolve(this.user);
    }
}
