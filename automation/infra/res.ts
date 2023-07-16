export type Res<T> = {
    readonly status: number;
    readonly body: T;
    readonly headers: {
        readonly contentLocation: string | undefined;
    };
};
