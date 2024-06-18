import { assertEquals } from "@std/assert/assert-equals";
import { idGeneratorStubBuild } from "../../../../domain/generator/id.stub.ts";
import { dateGeneratorStubBuild } from "../../../../domain/generator/date.stub.ts";
import { dateCreateStub, dateStub } from "../../../../domain/schedule/event/date/model.stub.ts";
import { created } from "../../../http/response.ts";
import { requestBuild } from "../../../http/request.stub.ts";
import { dateCreateController } from "./create.ts";
import { eventRepoEmptyStubBuild } from "../../../../domain/schedule/event/repo.stub.ts";

Deno.test("dateCreateController", async () => {
    assertEquals(
        await dateCreateController(
            eventRepoEmptyStubBuild(),
            idGeneratorStubBuild("date-id"),
            dateGeneratorStubBuild(new Date("2024-06-16T19:16:12.327Z")),
            "user-id",
            requestBuild(dateCreateStub, {}),
        ),
        created(dateStub),
    );
});
