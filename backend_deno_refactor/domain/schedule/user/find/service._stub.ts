import type { Result } from "../../../lang/result.ts";
import type { User } from "../model.ts";
import type { UserFindModel } from "./model.ts";
import type { UserFindErrors, UserFindService } from "./service.ts";
import { buildOk } from "../../../lang/result.ts";

export class UserFindServiceStub implements UserFindService {
    constructor(
        private readonly user: User,
        private readonly userFindModel: UserFindModel,
    ) {}

    public findById(): Promise<Result<User, UserFindErrors>> {
        return Promise.resolve(buildOk(this.user));
    }

    public findByIdMapped(): Promise<Result<UserFindModel, UserFindErrors>> {
        return Promise.resolve(buildOk(this.userFindModel));
    }

    public findByCredentials(): Promise<Result<User, UserFindErrors>> {
        return Promise.resolve(buildOk(this.user));
    }
}
