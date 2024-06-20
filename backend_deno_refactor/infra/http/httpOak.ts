import type { Context, RouterContext } from "oak/mod.ts";
import type { HTTPHeaders, HTTPParams } from "../../application/http/request.ts";
import type { HTTPResponse } from "../../application/http/response.ts";
import type { Session } from "../../domain/session/service.ts";
import type { User } from "../../domain/schedule/user/model.ts";
import { reqBuild } from "../../application/http/request.ts";
import { sessionFromRequest } from "../../application/http/sessionFromRequest.ts";
import { sessionJWT } from "../session/sessionJWT.ts";

export async function bodyBuild<Data>(ctx: Context): Promise<Data> {
    const text = await ctx.request.body.text();
    if (!text) {
        return undefined!;
    }
    return JSON.parse(text) as Data;
}

export function headersBuild(ctx: Context): Promise<HTTPHeaders> {
    return Promise.resolve({
        authorization: ctx.request.headers.get("authorization"),
    });
}

// deno-lint-ignore no-explicit-any
export function paramsBuild(ctx: RouterContext<any, any, any>): Promise<HTTPParams> {
    return Promise.resolve(ctx.params);
}

export function resultBuild(res: HTTPResponse, ctx: Context): void {
    ctx.response.body = res.body;
    ctx.response.status = res.status;
    if (res.headers) {
        ctx.response.headers.append("content-location", res.headers.contentLocation);
    }
}

export async function userIdBuild(ctx: Context): Promise<User["id"]> {
    const headers = await headersBuild(ctx);
    const service = sessionJWT();
    const req = reqBuild(undefined, {}, headers);
    const session = sessionFromRequest(req) as Session;
    const result = await service.decode(session);
    switch (result.type) {
        case "ok":
            return result.data;
        case "err":
            return "";
    }
}
