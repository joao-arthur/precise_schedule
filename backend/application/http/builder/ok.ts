import { HTTPResponse } from "../HTTPResponse.ts";

export function ok<Body>(data: Body): HTTPResponse<Body> {
    return {
        body: data,
        status: 200,
    };
}
