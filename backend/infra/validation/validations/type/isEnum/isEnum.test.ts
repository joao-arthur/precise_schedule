import { assertEquals } from "std/testing/asserts.ts";
import { isEnum } from "./isEnum.ts";
import { IsEnumError } from "./IsEnumError.ts";

Deno.test("isEnum", () => {
    assertEquals(isEnum([1, 2, 3])("val", 2), undefined);
    assertEquals(isEnum(["a", "b", "c"])("val", "a"), undefined);

    assertEquals(
        isEnum([1, 2, 3])("a", []),
        new IsEnumError("a", [1, 2, 3]),
    );
    assertEquals(
        isEnum(["a", "b", "c"])("b", []),
        new IsEnumError("b", ["a", "b", "c"]),
    );
    assertEquals(
        isEnum([true, false])("c", []),
        new IsEnumError("c", [true, false]),
    );
});
