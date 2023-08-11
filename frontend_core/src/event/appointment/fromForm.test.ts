import { assert, it } from "vitest";
import { fromForm } from "./fromForm.js";

it("fromForm", () => {
    assert.deepEqual(fromForm({ day: "2023-08-10" }), { day: "2023-08-10", repeats: false });
    assert.deepEqual(fromForm({ frequency: "1D" }), { frequency: "1D", repeats: true });
});
