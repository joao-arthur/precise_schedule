export type BoolVal = { readonly v: "bool" };
export type DtVal = { readonly v: "dt" };
export type DtMinVal = { readonly v: "dtMin"; readonly min: string };
export type EmailVal = { readonly v: "email" };
export type EnumVal = { readonly v: "enum"; readonly values: readonly unknown[] };
export type StrVal = { readonly v: "str" };
export type StrMaxLenVal = { readonly v: "strMaxLen"; readonly max: number };
export type StrMinLenVal = { readonly v: "strMinLen"; readonly min: number };
export type StrMinNumVal = { readonly v: "strMinNum"; readonly min: number };
export type MinLowerVal = { readonly v: "strMinLower"; readonly min: number };
export type MinUpperVal = { readonly v: "strMinUpper"; readonly min: number };
export type MinSpecialVal = { readonly v: "strMinSpecial"; readonly min: number };
export type TimeVal = { readonly v: "time" };

export type Validation =
    | BoolVal
    | DtVal
    | DtMinVal
    | EmailVal
    | EnumVal
    | StrVal
    | StrMaxLenVal
    | StrMinLenVal
    | StrMinNumVal
    | MinLowerVal
    | MinUpperVal
    | MinSpecialVal
    | TimeVal;
