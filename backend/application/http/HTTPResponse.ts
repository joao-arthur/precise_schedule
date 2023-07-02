export type HTTPResponse<Body> = {
    readonly status: number;
    readonly body: Body;
};
