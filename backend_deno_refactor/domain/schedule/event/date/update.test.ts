import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { dateGeneratorStubBuild } from "../../../generator/date.stub.ts";
import { dateEventUpdateStub, dateStub, dateUpdatedStub, dateUpdateStub } from "./model.stub.ts";
import { eventRepoDataStubBuild } from "../repo.stub.ts";
import { dateUpdate, dateUpdateToEventUpdate } from "./update.ts";

Deno.test("dateUpdateToEventUpdate", () => {
    assertEquals(
        dateUpdateToEventUpdate(dateUpdateStub),
        dateEventUpdateStub,
    );
});

Deno.test("dateUpdate", async () => {
    assertEquals(
        await dateUpdate(
            eventRepoDataStubBuild([], dateStub),
            dateGeneratorStubBuild(new Date("2025-07-18T15:43:12.377Z")),
            "user-id",
            "date-id",
            dateUpdateStub,
        ),
        ok(dateUpdatedStub),
    );
});
