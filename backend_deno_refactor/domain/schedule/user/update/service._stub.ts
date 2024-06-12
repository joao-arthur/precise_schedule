import type { Result } from "../../../lang/result.ts";
import type { User } from "../model.ts";
import type { UserUpdateErrors, UserUpdateService } from "./service.ts";
import { ok } from "../../../lang/result.ts";

export class UserUpdateServiceStub implements UserUpdateService {
    constructor(private readonly user: User) {}

    public update(): Promise<Result<User, UserUpdateErrors>> {
        return Promise.resolve(ok(this.user));
    }
}
