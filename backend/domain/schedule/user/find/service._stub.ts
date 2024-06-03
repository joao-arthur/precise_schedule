import type { Result } from "../../../lang/result.ts";
import type { User } from "../model.ts";
import type { UserFindModel } from "./model.ts";
import type { UserFindService } from "./service.ts";
import type { UserNotFound } from "./error.userNotFound.ts";

import { buildOk } from "../../../lang/result.ts";

export class UserFindServiceStub implements UserFindService {
    constructor(
        private readonly user: User,
        private readonly userFindModel: UserFindModel,
    ) {}

    public findById(): Promise<Result<User, UserNotFound>> {
        return Promise.resolve(buildOk(this.user));
    }

    public findByIdMapped(): Promise<Result<UserFindModel, UserNotFound>> {
        return Promise.resolve(buildOk(this.userFindModel));
    }

    public findByCredentials(): Promise<Result<User, UserNotFound>> {
        return Promise.resolve(buildOk(this.user));
    }
}
