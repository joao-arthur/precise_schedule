import type { User } from "@ps/domain/schedule/user/User.ts";
import type { UpdateUserService } from "@ps/domain/schedule/user/update/UpdateUserService.ts";

export class UpdateUserServiceMock implements UpdateUserService {
    constructor(private readonly user: User) {}

    public update(): Promise<User> {
        return Promise.resolve(this.user);
    }
}
