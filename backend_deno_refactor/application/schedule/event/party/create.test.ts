import { assertEquals } from "@std/assert/assert-equals";
import { idGeneratorStubBuild } from "../../../../domain/generator/id.stub.ts";
import { dateGeneratorStubBuild } from "../../../../domain/generator/date.stub.ts";
import { partyCreateStub, partyStub } from "../../../../domain/schedule/event/party/model.stub.ts";
import { created } from "../../../http/response.ts";
import { requestBuild } from "../../../http/request.stub.ts";
import { partyCreateController } from "./create.ts";
import { eventRepoEmptyStubBuild } from "../../../../domain/schedule/event/repo.stub.ts";

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
