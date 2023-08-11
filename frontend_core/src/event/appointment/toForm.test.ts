import { assert, it } from "vitest";
import { toForm } from "./toForm.js";

it("toForm", () => {
    assert.deepEqual(toForm({ day: "2023-08-10" }), { day: "2023-08-10", repeats: false });
    assert.deepEqual(toForm({ frequency: "1D" }), { frequency: "1D", repeats: true });
});
