import type { User } from "./model.ts";
import type { UserCreate } from "./create.ts";
import type { UserUpdate } from "./update.ts";
import type { UserLogin } from "./login.ts";
import type { UserInfo } from "./read.ts";
import type { UserUniqueInfo } from "./uniqueInfo.ts";

export const userCreateStub: UserCreate = {
    email: "john@gmail.com",
    firstName: "john",
    birthdate: "2000-08-22",
    username: "john123",
    password: "abcDEF123$%",
};

export const userStub: User = {
    id: "user-id",
    email: "john@gmail.com",
    firstName: "john",
    birthdate: "2000-08-22",
    username: "john123",
    password: "abcDEF123$%",
    createdAt: new Date("2023-03-02T19:16:12.327Z"),
    updatedAt: new Date("2023-03-02T19:16:12.327Z"),
};

export const userUpdateStub: UserUpdate = {
    email: "peter@gmail.com",
    firstName: "peter",
    birthdate: "1999-04-11",
    username: "peter987",
    password: "abcDEF123$%",
};

export const userUpdatedStub: User = {
    id: "user-id",
    email: "peter@gmail.com",
    firstName: "peter",
    birthdate: "1999-04-11",
    username: "peter987",
    password: "abcDEF123$%",
    createdAt: new Date("2023-03-02T19:16:12.327Z"),
    updatedAt: new Date("2024-06-17T20:53:37.173Z"),
};

export const userInfoStub: UserInfo = {
    email: "john@gmail.com",
    firstName: "john",
    birthdate: "2000-08-22",
    username: "john123",
};

export const userLoginStub: UserLogin = {
    username: "john123",
    password: "abcDEF123$%",
};

export const userUniqueEqualsStub: UserUniqueInfo = {
    username: "john123",
    email: "john@gmail.com",
};

export const userUniqueDifferentStub: UserUniqueInfo = {
    username: "peter987",
    email: "peter@gmail.com",
};
