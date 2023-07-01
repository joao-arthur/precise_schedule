export type HTTPRequest<Body, Params> = {
    readonly body: Body;
    readonly params: Params;
};
