import { EnumError } from "./EnumError.ts";

export const isEnum = (values: readonly unknown[]) => (value: unknown): EnumError | undefined => {
    if (!values.includes(value)) {
        return new EnumError(values);
    }
};
