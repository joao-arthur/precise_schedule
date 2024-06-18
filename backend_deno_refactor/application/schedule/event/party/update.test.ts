import { assertEquals } from "@std/assert/assert-equals";
import { dateGeneratorStubBuild } from "../../../../domain/generator/date.stub.ts";
import { partyStub, partyUpdateStub } from "../../../../domain/schedule/event/party/model.stub.ts";
import { noContent } from "../../../http/response.ts";
import { requestBuild } from "../../../http/request.stub.ts";
import { partyUpdateController } from "./update.ts";
import { eventRepoOneStubBuild } from "../../../../domain/schedule/event/repo.stub.ts";

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
