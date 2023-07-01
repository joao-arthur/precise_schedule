export function maxLength(
    field: string,
    length: number,
    value: unknown,
): string | undefined {
    if (value.length > length) {
        return `"${field}" max length is ${length}`;
    }
}
