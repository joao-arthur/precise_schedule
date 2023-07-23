export type BoolVal = { readonly type: "bool" };
export type DtVal = { readonly type: "dt" };
export type DtMinVal = { readonly type: "dtMin"; readonly min: string };
export type EmailVal = { readonly type: "email" };
export type EnumVal = { readonly type: "enum"; readonly values: readonly unknown[] };
export type StrVal = { readonly type: "str" };
export type StrMaxLenVal = { readonly type: "strMaxLen"; readonly max: number };
export type StrMinLenVal = { readonly type: "strMinLen"; readonly min: number };
export type StrMinNumVal = { readonly type: "strMinNum"; readonly min: number };
export type StrMinLowerVal = { readonly type: "strMinLower"; readonly min: number };
export type StrMinUpperVal = { readonly type: "strMinUpper"; readonly min: number };
export type StrMinSpecialVal = { readonly type: "strMinSpecial"; readonly min: number };
export type TimeVal = { readonly type: "time" };
export type CompareBiggerVal = { readonly type: "compareBigger"; readonly field: string };

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
    | StrMinLowerVal
    | StrMinUpperVal
    | StrMinSpecialVal
    | TimeVal
    | CompareBiggerVal;
