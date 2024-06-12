export type ResultOk<Data> = {
    readonly type: "ok";
    readonly data: Data;
};

export type ResultErr<Err> = {
    readonly type: "err";
    readonly error: Err;
};

export type Result<Data, Err> =
    | ResultOk<Data>
    | ResultErr<Err>;

export function buildOk<Data>(data: Data): ResultOk<Data> {
    return {
        type: "ok",
        data,
    };
}

export function buildErr<E extends Error>(error: E): ResultErr<E> {
    return {
        type: "err",
        error,
    };
}
