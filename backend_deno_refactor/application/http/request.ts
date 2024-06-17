export type HTTPRequest<
    Body = undefined,
    Params = undefined,
    HTTPHeaders = undefined,
> =
    & (Body extends undefined ? Record<never, never> : { readonly body: Body })
    & (Params extends undefined ? Record<never, never> : { readonly params: Params })
    & (HTTPHeaders extends undefined ? Record<never, never> : { readonly headers: HTTPHeaders });

export type IdParam = {
    readonly id: string;
};

export type HTTPHeaders = {
    readonly authorization?: string | undefined | null;
};
