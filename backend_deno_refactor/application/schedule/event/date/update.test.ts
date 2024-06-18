import { assertEquals } from "@std/assert/assert-equals";
import { dateGeneratorStubBuild } from "../../../../domain/generator/date.stub.ts";
import { dateStub, dateUpdateStub } from "../../../../domain/schedule/event/date/model.stub.ts";
import { noContent } from "../../../http/response.ts";
import { requestBuild } from "../../../http/request.stub.ts";
import { dateUpdateController } from "./update.ts";
import { eventRepoOneStubBuild } from "../../../../domain/schedule/event/repo.stub.ts";

Deno.test("dateUpdateController", async () => {
    assertEquals(
        await dateUpdateController(
            eventRepoOneStubBuild(dateStub),
            dateGeneratorStubBuild(new Date("2025-07-18T15:43:12.377Z")),
            "user-id",
            requestBuild(dateUpdateStub, { id: "date-id" }),
        ),
        noContent(),
    );
});
