import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { dateGeneratorStubBuild } from "../../../generator/date.stub.ts";
import {
    partyEventUpdateStub,
    partyStub,
    partyUpdatedStub,
    partyUpdateStub,
} from "./model.stub.ts";
import { eventRepoStubBuild } from "../repo.stub.ts";
import { partyUpdate, partyUpdateToEventUpdate } from "./update.ts";

Deno.test("partyUpdateToEventUpdate", () => {
    assertEquals(
        partyUpdateToEventUpdate(partyUpdateStub),
        partyEventUpdateStub,
    );
});

Deno.test("partyUpdate", async () => {
    assertEquals(
        await partyUpdate(
            eventRepoStubBuild([], partyStub),
            dateGeneratorStubBuild(new Date("2025-07-18T15:43:12.377Z")),
            "user-id",
            "party-id",
            partyUpdateStub,
        ),
        ok(partyUpdatedStub),
    );
});
