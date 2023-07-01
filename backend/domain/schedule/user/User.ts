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

type Info = {
    readonly status: Status;
    readonly language: Language;
    readonly createdAt: Date;
    readonly updatedAt: Date;
};

type Password = {
    readonly pepper: string;
    readonly salt: string;
    readonly iterations: number;
    readonly hash: string;
};

export type User = {
    readonly id: string;
    //readonly firstName: string;
    //readonly birthdate: Date;
    readonly email: string;
    readonly username: string;
    readonly password: string;
};

type DatabaseUser = {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly birthdate: string;
    readonly email: string;
    readonly language: string;
    readonly status: string;
    readonly username: string;
    readonly password: string;
};
