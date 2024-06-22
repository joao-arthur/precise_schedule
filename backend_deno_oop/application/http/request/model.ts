// deno-lint-ignore-file ban-types
export type HTTPRequest<
    Body = undefined,
    Params = undefined,
    HTTPHeaders = undefined,
> =
    & (Body extends undefined ? {} : { readonly body: Body })
    & (Params extends undefined ? {} : { readonly params: Params })
    & (HTTPHeaders extends undefined ? {} : { readonly headers: HTTPHeaders });
