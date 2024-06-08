use std::collections::HashMap;
use std::iter::Map;

enum ValidationType {
    //Bool,
    //
    //DtMin,
    //DtMax,
    //TmMin,
    //TmMax,
    //
    //StrLen,
    //StrMinLen,
    //StrMaxLen,
    //StrMinNum,
    //StrMinLower,
    //StrMinUpper,
    //StrMinSpecial,
    //StrMaxSpecial,
    //
    //Email,
    //Enum,
    //CompareBigger,
    //
    TypeIsStr,
    TypeIsDt,
    TypeIsTm,
    TypeIsU64
}

struct Schema {
    pub val_type: ValidationType,
    //pub min_number: usize,
    //pub max_number: usize,
    //pub min_str: String,
    //pub max_str: String,
    //pub field: String,
    //pub values: Vec<String>,
}

const CREATE_SCHEMA: HashMap<&str, Vec<Schema>> = HashMap::from([
    (
        "name",
        vec![
            Schema { val_type: ValidationType::TypeIsStr }
        ]
    ),
    (
        "day",
        vec![
            Schema { val_type: ValidationType::TypeIsDt },
        ]
    )
]);


// BoolVal = { readonly type: "bool" };
// DtVal = { readonly type: "dt" };
// EmailVal = { readonly type: "email" };
// StrVal = { readonly type: "str" };
// TimeVal = { readonly type: "time" };
// EnumVal = { readonly type: "enum"; readonly values: readonly unknown[] };
// DtMinVal = { readonly type: "dtMin"; readonly min: string };
// StrMaxLenVal = { readonly type: "strMaxLen"; readonly max: number };
// StrMinLenVal = { readonly type: "strMinLen"; readonly min: number };
// StrMinNumVal = { readonly type: "strMinNum"; readonly min: number };
// StrMinLowerVal = { readonly type: "strMinLower"; readonly min: number };
// StrMinUpperVal = { readonly type: "strMinUpper"; readonly min: number };
// StrMinSpecialVal = { readonly type: "strMinSpecial"; readonly min: number };
// CompareBiggerVal = { readonly type: "compareBigger"; readonly field: string };
