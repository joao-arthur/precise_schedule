export type V =
    | { readonly v: "bool" }
    | { readonly v: "dt" }
    | { readonly v: "dtMin"; readonly min: string }
    | { readonly v: "email" }
    | { readonly v: "enum" }
    | { readonly v: "str" }
    | { readonly v: "strMaxLen"; readonly max: number }
    | { readonly v: "strMinLen"; readonly min: number }
    | { readonly v: "strMinNum"; readonly min: number }
    | { readonly v: "strMinLower"; readonly min: number }
    | { readonly v: "strMinUpper"; readonly min: number }
    | { readonly v: "strMinSpecial"; readonly min: number }
    | { readonly v: "time" };
