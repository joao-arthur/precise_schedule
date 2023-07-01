export function required(
    field: string,
    length: number,
    value: unknown,
): string | undefined {
    if (value.length < length) {
        return `"${field}" min length is ${length}`;
    }
}
