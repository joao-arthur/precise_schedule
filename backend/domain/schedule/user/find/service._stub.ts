import type { User } from "../model.ts";
import type { UserFindModel } from "./model.ts";
import type { UserFindService } from "./service.ts";

export class UserFindServiceStub implements UserFindService {
    constructor(
        private readonly user: User,
        private readonly userFindModel: UserFindModel,
    ) {}

    public findById(): Promise<User> {
        return Promise.resolve(this.user);
    }

    public findByIdMapped(): Promise<UserFindModel> {
        return Promise.resolve(this.userFindModel);
    }

    public findByCredentials(): Promise<User> {
        return Promise.resolve(this.user);
    }
}
