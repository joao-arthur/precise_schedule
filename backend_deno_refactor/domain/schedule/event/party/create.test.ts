import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { idGeneratorStubBuild } from "../../../generator.stub.ts";
import { dateGeneratorStubBuild } from "../../../generator.stub.ts";
import { eventRepoEmptyStubBuild } from "../repo.stub.ts";
import { partyCreateStub, partyEventCreateStub, partyStub } from "./model.stub.ts";
import { partyCreateService, partyCreateToEventCreate } from "./create.ts";

Deno.test("partyCreateToEventCreate", () => {
    assertEquals(
        partyCreateToEventCreate(partyCreateStub),
        partyEventCreateStub,
    );
});

Deno.test("partyCreateService", async () => {
    assertEquals(
        await partyCreateService(
            eventRepoEmptyStubBuild(),
            idGeneratorStubBuild("party-id"),
            dateGeneratorStubBuild(new Date("2024-06-16T19:16:12.327Z")),
            "user-id",
            partyCreateStub,
        ),
        ok(partyStub),
    );
});
