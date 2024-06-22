import { assertEquals } from "@std/assert/assert-equals";
import { ok } from "../../lang/result.ts";
import { appointmentStub } from "./appointment/model.stub.ts";
import { eventRepoOneStubBuild } from "./repo.stub.ts";
import { eventDelete } from "./delete.ts";

Deno.test("eventDelete", async () => {
    assertEquals(
        await eventDelete(eventRepoOneStubBuild(appointmentStub), "user-id", "appointment-id"),
        ok(undefined),
    );
});
