import type { StrMinUpperVal } from "@ps/domain/validation/Validation.ts";

import { StrMinUpperValidationError } from "./StrMinUpperValidationError.ts";

export function strMinUpperValidation(
    val: StrMinUpperVal,
    value: unknown,
): StrMinUpperValidationError | undefined {
    if (typeof value !== "string") {
        return new StrMinUpperValidationError(val.min);
    }
    const upperLen = value
        .replaceAll(
            /0|1|2|3|4|5|6|7|8|9| |\!|\@|\#|\$|\%|\¨|\&|\*|\(|\)|\[|\]|\{|\}|\+|\-|\*|\<|\>|\,|\.|\;|\:|\'|\"|\`|\~|\^|\?|\´/g,
            "",
        )
        .split("")
        .reduce((acc, c) => acc + Number(c.toLocaleUpperCase() === c), 0);
    if (val.min > upperLen) {
        return new StrMinUpperValidationError(val.min);
    }
}
