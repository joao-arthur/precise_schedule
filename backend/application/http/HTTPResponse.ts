export type HTTPResponse<Body> = {
    readonly body: Body;
    readonly status: number;
};
