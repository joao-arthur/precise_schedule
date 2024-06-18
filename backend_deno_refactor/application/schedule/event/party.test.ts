import { assertEquals } from "@std/assert/assert-equals";
import { idGeneratorStubBuild } from "../../../domain/generator/id.stub.ts";
import { dateGeneratorStubBuild } from "../../../domain/generator/date.stub.ts";
import {
    partyCreateStub,
    partyStub,
    partyUpdateStub,
} from "../../../domain/schedule/event/party/model.stub.ts";
import {
    eventRepoEmptyStubBuild,
    eventRepoOneStubBuild,
} from "../../../domain/schedule/event/repo.stub.ts";
import { created, noContent } from "../../http/response.ts";
import { requestBuild } from "../../http/request.stub.ts";
import { partyCreateController, partyUpdateController } from "./party.ts";

Deno.test("partyCreateController", async () => {
    assertEquals(
        await partyCreateController(
            eventRepoEmptyStubBuild(),
            idGeneratorStubBuild("party-id"),
            dateGeneratorStubBuild(new Date("2024-06-16T19:16:12.327Z")),
            "user-id",
            requestBuild(partyCreateStub, {}),
        ),
        created(partyStub),
    );
});

Deno.test("partyUpdateController", async () => {
    assertEquals(
        await partyUpdateController(
            eventRepoOneStubBuild(partyStub),
            dateGeneratorStubBuild(new Date("2025-07-18T15:43:12.377Z")),
            "user-id",
            requestBuild(partyUpdateStub, { id: "party-id" }),
        ),
        noContent(),
    );
});
