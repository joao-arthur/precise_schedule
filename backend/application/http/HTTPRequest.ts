export type HTTPRequest<Body, Params> =
    & (Body extends undefined ? {} : { readonly body: Body })
    & (Params extends undefined ? {} : { readonly params: Params });
