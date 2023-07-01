import { IsEnumError } from "./IsEnumError.ts";

export const isEnum =
    (values: readonly unknown[]) =>
    (field: string, value: unknown): IsEnumError | undefined => {
        if (!values.includes(value)) {
            return new IsEnumError(field, values);
        }
    };
