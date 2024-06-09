import type { User } from "../model.ts";
import type { UserUpdateService } from "./service.ts";

export class UserUpdateServiceStub implements UserUpdateService {
    constructor(private readonly user: User) {}

    public update(): Promise<User> {
        return Promise.resolve(this.user);
    }
}
