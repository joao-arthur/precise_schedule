export enum Language {
    pt = "pt",
    en = "en",
    es = "es",
    de = "de",
}

export enum Status {
    active = "active",
    excluding = "excluding",
}

type Name = {
    readonly firstName: string;
    readonly lastName: string;
    readonly nickName: string;
};

type Info = {
    readonly status: Status;
    readonly birthdate: Date;
    readonly language: Language;
    readonly createdAt: Date;
    readonly updatedAt: Date;
};

export type User = {
    readonly id: string;
    readonly firstName: string;
    readonly birthdate: Date;
    readonly email: string;
    readonly username: string;
    readonly password: string;
};

export type CreateUser = {
    readonly firstName: User["firstName"];
    readonly birthdate: User["birthdate"];
    readonly email: User["email"];
    readonly username: User["username"];
    readonly password: User["password"];
};

export type UpdateUser = {
    readonly firstName: User["firstName"];
    readonly birthdate: User["birthdate"];
    readonly email: User["email"];
    readonly username: User["username"];
    readonly password: User["password"];
};

export type Login = {
    readonly username: User["username"];
    readonly password: User["password"];
};

export type ForgotPassword = {
    readonly email: User["email"];
};

export type NewPassword = {
    readonly password: User["password"];
};

export type Settings = {
    readonly language: Language;
    readonly theme: "light" | "dark" | "auto";
};
