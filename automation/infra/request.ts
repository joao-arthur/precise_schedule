type Params = {
    readonly resource: string;
    readonly method: "GET" | "POST";
    readonly body: Record<string, unknown>;
};

function customReq({ resource, method, body }: Params): Promise<Response> {
    return fetch(
        `http://localhost:8080/${resource}`,
        {
            method,
            body: JSON.stringify(body),
        },
    );
}

export function getReq<T>(resource: string, body: Record<string, unknown>): Promise<T> {
    return customReq({ resource, method: "GET", body })
        .then((res) => res.json());
}

export function postReq<T>(resource: string, body: Record<string, unknown>): Promise<T> {
    return customReq({ resource, method: "POST", body })
        .then((res) => res.json());
}

export const request = {
    get: getReq,
    post: postReq,
};
