import {
    Application,
    Router,
} from "https://deno.land/x/oak@v12.5.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { UserControllerOakAdapter } from "../infra/schedule/user/UserControllerOakAdapter.ts";
import { UserRepositoryMemory } from "@ps/infra/schedule/user/UserRepositoryMemory.ts";
import { EventControllerOakAdapter } from "../infra/schedule/event/EventControllerOakAdapter.ts";
import { EventRepositoryMemory } from "@ps/infra/schedule/event/EventRepositoryMemory.ts";
import { IdGeneratorRandom } from "@ps/infra/generate/IdGeneratorRandom.ts";
import { ValidatorImpl } from "@ps/infra/validation/ValidatorImpl.ts";

const port = 8080;

const idGenerator = new IdGeneratorRandom();
const validator = new ValidatorImpl();

const userRepository = new UserRepositoryMemory();
const userControllerAdapter = new UserControllerOakAdapter(
    idGenerator,
    validator,
    userRepository,
);

const eventRepository = new EventRepositoryMemory();
const eventControllerAdapter = new EventControllerOakAdapter(
    idGenerator,
    validator,
    eventRepository,
);

const router = new Router();
router
    .post("/user", async (context) => {
        await userControllerAdapter.postUser(context);
    })
    .put("/user/:id", async (context) => {
        await userControllerAdapter.putUser(context);
    })
    .get("/user/:id", async (context) => {
        await userControllerAdapter.getUser(context);
    })
    .post("/event", async (context) => {
        await eventControllerAdapter.postEvent(context);
    })
    .put("/event/:id", async (context) => {
        await eventControllerAdapter.putEvent(context);
    })
    .get("/event/:id", async (context) => {
        await eventControllerAdapter.getEvent(context);
    });

const app = new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server running on http://localhost:${port}/`);
await app.listen({ port });
console.log(`Server running on http://localhost:${port}/`);
