export type HTTPResponse = {
    readonly status: number;
    readonly body:
        | Record<string, unknown>
        | readonly unknown[]
        | undefined;
    readonly headers: {
        readonly contentLocation: string;
    } | undefined;
};

export function ok(data: Record<string, unknown> | readonly unknown[]): HTTPResponse {
    return {
        status: 200,
        body: data,
        headers: undefined,
    };
}

export function created<T extends { readonly id: string }>(data: T): HTTPResponse {
    return {
        status: 201,
        body: undefined,
        headers: { contentLocation: data.id },
    };
}

export function noContent(): HTTPResponse {
    return {
        status: 204,
        body: undefined,
        headers: undefined,
    };
}

export function badRequest(body: Record<string, unknown>): HTTPResponse {
    return {
        status: 400,
        body,
        headers: undefined,
    };
}

export function unauthorized(): HTTPResponse {
    return {
        status: 401,
        body: undefined,
        headers: undefined,
    };
}

export function internalServerError(): HTTPResponse {
    return {
        status: 500,
        body: { message: "An unexpected error occurred!" },
        headers: undefined,
    };
}
