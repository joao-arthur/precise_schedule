import type { User } from "@ps/domain/schedule/user/User.ts";
import type { UpdateUserModel } from "@ps/domain/schedule/user/update/UpdateUserModel.ts";
import type { UpdateUserFactory } from "@ps/domain/schedule/user/update/UpdateUserFactory.ts";

export class UpdateUserFactoryImpl implements UpdateUserFactory {
    public build(
        user: UpdateUserModel,
        id: User["id"],
    ): User {
        return {
            id,
            email: user.email,
            username: user.username,
            password: user.password,
        };
    }
}
