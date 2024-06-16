export type Ok<Data> = {
    readonly type: "ok";
    readonly data: Data;
};

export type Err<E> = {
    readonly type: "err";
    readonly error: E;
};

export type Result<Data, E> =
    | Ok<Data>
    | Err<E>;

export function ok<Data>(data: Data): Ok<Data> {
    return { type: "ok", data };
}

export function err<E extends Error>(error: E): Err<E> {
    return { type: "err", error };
}
