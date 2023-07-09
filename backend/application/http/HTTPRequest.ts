export type HTTPRequest<
    Body = undefined,
    Params = undefined,
    Headers = undefined,
> =
    // deno-lint-ignore ban-types
    & (Body extends undefined ? {} : { readonly body: Body })
    // deno-lint-ignore ban-types
    & (Params extends undefined ? {} : { readonly params: Params })
    // deno-lint-ignore ban-types
    & (Headers extends undefined ? {}
        : { readonly headers: Headers });
