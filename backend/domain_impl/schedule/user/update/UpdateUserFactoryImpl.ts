import type { User } from "@ps/domain/schedule/user/User.ts";
import type { UpdateUserModel } from "@ps/domain/schedule/user/update/UpdateUserModel.ts";
import type { UpdateUserFactory } from "@ps/domain/schedule/user/update/UpdateUserFactory.ts";

export class UpdateUserFactoryImpl implements UpdateUserFactory {
    public build(user: UpdateUserModel, existingUser: User): User {
        return {
            id: existingUser.id,
            email: user.email,
            firstName: user.firstName,
            birthdate: user.birthdate,
            username: user.username,
            password: user.password,
            createdAt: existingUser.createdAt,
            updatedAt: new Date(),
        };
    }
}
