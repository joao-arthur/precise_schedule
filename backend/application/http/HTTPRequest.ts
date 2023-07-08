export type HTTPRequest<
    Body = undefined,
    Params = undefined,
    Headers = undefined,
> =
    & (Body extends undefined ? {} : { readonly body: Body })
    & (Params extends undefined ? {} : { readonly params: Params })
    & (Headers extends undefined ? {}
        : { readonly headers: Headers });
