import type { User } from "./model.ts";

export const userStub: User = {
    id: "user-id",
    email: "email",
    firstName: "john",
    birthdate: "2000-08-22",
    username: "username",
    password: "password",
    createdAt: new Date(),
    updatedAt: new Date(),
};
