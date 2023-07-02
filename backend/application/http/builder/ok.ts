import { HTTPResponse } from "../HTTPResponse.ts";

export function ok<Body>(data: Body): HTTPResponse<Body> {
    return {
        status: 200,
        body: data,
    };
}
