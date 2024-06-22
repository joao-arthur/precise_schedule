import { Application, Router } from "oak/mod.ts";
import { oakCors } from "cors/mod.ts";
import { IdGeneratorRandom } from "@ps/infra/generator/id/random.adapter.ts";
import { ValidatorServiceImpl } from "@ps/domain/validation/validator/service.impl.ts";
import { ValidatorProviderImpl } from "@ps/infra/validation/validator/provider.impl.ts";
import { UserRepositoryMemory } from "@ps/infra/schedule/user/repository/memory.adapter.ts";
import { EventRepositoryMemory } from "@ps/infra/schedule/event/repository/memory.adapter.ts";
import { UserControllerOakAdapter } from "@ps/infra/schedule/user/controller/oak.adapter.ts";
import { EventControllerOakAdapter } from "@ps/infra/schedule/event/controller/oak.adapter.ts";
import { SessionMiddlewareOakAdapter } from "@ps/infra/http/middleware/session/oak.adapter.ts";
import { ErrorHandlerMiddlewareOakAdapter } from "@ps/infra/http/middleware/errorHandler/oak.adapter.ts";

const idGenerator = new IdGeneratorRandom();
const validator = new ValidatorServiceImpl(new ValidatorProviderImpl());

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

const app = new Application();
const router = new Router();

userControllerAdapter.initRoutes(router);
eventControllerAdapter.initRoutes(router);

const errorHandlerMiddleware = new ErrorHandlerMiddlewareOakAdapter();
const sessionMiddleware = new SessionMiddlewareOakAdapter(userRepository);

app.use(oakCors({ origin: "http://localhost:3000" }));
app.use(async (ctx, next) => {
    await errorHandlerMiddleware.handle(ctx, next);
});
app.use(async (ctx, next) => {
    await sessionMiddleware.handle(ctx, next);
});
app.use(router.routes());
app.use(router.allowedMethods());

const port = 8080;

console.log(`Server running on http://localhost:${port}/`);
await app.listen({ port });
