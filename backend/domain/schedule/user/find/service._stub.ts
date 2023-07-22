import type { User } from "../model.ts";
import type { UserFindService } from "./service.ts";

export class UserFindServiceStub implements UserFindService {
    constructor(private readonly user: User) {}

    public findById(): Promise<User> {
        return Promise.resolve(this.user);
    }

    public findByCredentials(): Promise<User> {
        return Promise.resolve(this.user);
    }
}
