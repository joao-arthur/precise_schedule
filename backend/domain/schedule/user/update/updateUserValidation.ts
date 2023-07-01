import type { Schema } from "@ps/domain/validation/Schema.ts";
import type { UpdateUserModel } from "./UpdateUserModel.ts";

import { V } from "@ps/domain/validation/V.ts";

/*
export const updateUserValidation: Schema<UpdateUserModel> = {
    firstName: [
        required,
        isString,
        //minLength(1),
        //maxLength(100),
    ],
    lastName: [
        required,
        isString,
        //minLength(1),
        //maxLength(100),
    ],
    birthdate: [
        required,
        isDate,
        //min(new Date(1970, 1, 1)),
    ],
    email: [
        required,
        isString,
        //minLength(3),
        //maxLength(100),
        //emailFormat,
    ],
    language: [
        required,
        isEnum(["pt", "en", "es", "de"]),
    ],
    username: [
        required,
        isString,
        //minLength(1),
        //maxLength(100),
    ],
    password: [
        required,
        isString,
        //minLength(8),
        //maxLength(100),
        //minNumber(1),
        //minSpecial(1),
        //minUppercase(1),
        //minLowercase(1),
    ],
};
*/

export const updateUserValidation: Schema<UpdateUserModel> = {
    email: [
        V.required,
        V.isString,
    ],
    username: [
        V.required,
        V.isString,
    ],
    password: [
        V.required,
        V.isString,
    ],
};
