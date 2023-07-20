import type { User } from "@ps/domain/schedule/user/User.ts";

export const userMock: User = {
    id: "id",
    email: "email",
    firstName: "john",
    birthdate: "2000-08-22",
    username: "username",
    password: "password",
    createdAt: new Date(),
    updatedAt: new Date(),
};
