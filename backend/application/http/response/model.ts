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
