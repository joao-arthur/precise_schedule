export type StrMinLowerVal = { readonly type: "strMinLower"; readonly min: number };

export class StrMinLowerValidationError extends Error {
    constructor(min: number) {
        super(`at least ${min} lowercase letter`);
    }
}

export function strMinLowerValidation(
    val: StrMinLowerVal,
    value: unknown,
): StrMinLowerValidationError | undefined {
    if (typeof value !== "string") {
        return new StrMinLowerValidationError(val.min);
    }
    const lowerLen = value
        .replaceAll(
            /0|1|2|3|4|5|6|7|8|9| |\!|\@|\#|\$|\%|\¨|\&|\*|\(|\)|\[|\]|\{|\}|\+|\-|\*|\<|\>|\,|\.|\;|\:|\'|\"|\`|\~|\^|\?|\´/g,
            "",
        )
        .split("")
        .reduce((acc, c) => acc + Number(c.toLocaleLowerCase() === c), 0);
    if (val.min > lowerLen) {
        return new StrMinLowerValidationError(val.min);
    }
}
