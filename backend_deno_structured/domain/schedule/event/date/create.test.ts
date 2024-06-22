import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../../lang/result.ts";
import { idGeneratorStubBuild } from "../../../generator.stub.ts";
import { dateGeneratorStubBuild } from "../../../generator.stub.ts";
import { eventRepoEmptyStubBuild } from "../repo.stub.ts";
import { dateCreateStub, dateEventCreateStub, dateStub } from "./model.stub.ts";
import { dateCreateService, dateCreateToEventCreate } from "./create.ts";

Deno.test("dateCreateToEventCreate", () => {
    assertEquals(
        dateCreateToEventCreate(dateCreateStub),
        dateEventCreateStub,
    );
});

Deno.test("dateCreateService", async () => {
    assertEquals(
        await dateCreateService(
            eventRepoEmptyStubBuild(),
            idGeneratorStubBuild("date-id"),
            dateGeneratorStubBuild(new Date("2024-06-16T19:16:12.327Z")),
            "user-id",
            dateCreateStub,
        ),
        ok(dateStub),
    );
});
