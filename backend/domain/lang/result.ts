export type ResultOk<Data> = {
    readonly type: "ok";
    readonly data: Data;
};

export type ResultErr<E extends Error> = {
    readonly type: "err";
    readonly error: E;
};

export type Result<Data, E extends Error = Error> =
    | ResultOk<Data>
    | ResultErr<E>;

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
