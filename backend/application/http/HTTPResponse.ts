export type HTTPResponse = {
    readonly status: number;
    readonly body: Record<string, unknown> | undefined;
    readonly headers: {
        readonly contentLocation: string;
    } | undefined;
};
