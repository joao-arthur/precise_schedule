export type HTTPParams = {
    readonly id?: string | undefined | null;
};

export type HTTPHeaders = {
    readonly authorization?: string | undefined | null;
};

export type HTTPRequest<Body = undefined, Params = HTTPParams, Headers = HTTPHeaders> = {
    readonly body: Body;
    readonly params: Params;
    readonly headers: Headers;
};
