import { Context, Next } from "oak/mod.ts";
import { ErrorHandlerMiddlewareImpl } from "@ps/application/http/middleware/errorHandler/middleware.impl.ts";
import { makeResult } from "@ps/infra/http/makeResult.ts";

export class ErrorHandlerMiddlewareOakAdapter {
    public async handle(ctx: Context, next: Next): Promise<void> {
        try {
            await next();
        } catch (error) {
            const res = new ErrorHandlerMiddlewareImpl().handle(error);
            makeResult(res, ctx);
        }
    }
}
