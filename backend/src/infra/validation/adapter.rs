use crate::domain::validation::{Val, V};

pub fn value_from_json_value(value: serde_json::Value) -> Val {
    match value {
        serde_json::Value::Null => Val::None,
        serde_json::Value::Bool(_bool) => Val::Bool(_bool),
        serde_json::Value::Number(num) => Val::Num(
            if num.is_u64() { num.as_u64() } else { None },
            if num.is_i64() { num.as_i64() } else { None },
            if num.is_f64() { num.as_f64() } else { None },
        ),
        serde_json::Value::String(str) => Val::Str(str),
        serde_json::Value::Array(arr) => {
            Val::Arr(arr.into_iter().map(value_from_json_value).collect())
        }
        serde_json::Value::Object(obj) => {
            Val::Obj(obj.into_iter().map(|f| (f.0, value_from_json_value(f.1))).collect())
        }
    }
}

pub fn to_english(v: &V) -> String {
    match v {
        V::Required => String::from("Is required"),
        V::NumI => String::from("Must be an integer"),
        V::NumU => String::from("Must be an unsigned integer"),
        V::NumF => String::from("Must be a float"),
        V::Str => String::from("Must be a string"),
        V::Bool => String::from("Must be a boolean"),
        V::NumIExact(v) => String::from("The field"),
        V::NumIMin(v) => String::from("The field"),
        V::NumIMax(v) => String::from("The field"),
        V::NumUExact(v) => String::from("The field"),
        V::NumUMin(v) => String::from("The field"),
        V::NumUMax(v) => String::from("The field"),
        V::NumFExact(v) => String::from("The field"),
        V::NumFMin(v) => String::from("The field"),
        V::NumFMax(v) => String::from("The field"),
        V::StrExact(v) => String::from("The field"),
        V::StrExactLen(v) => String::from("The field"),
        V::StrMinLen(v) => String::from("The field"),
        V::StrMaxLen(v) => String::from("The field"),
        V::StrMinUpper(v) => String::from("Must contain at least one uppercase"),
        V::StrMinLower(v) => String::from("Must contain at least one lowercase"),
        V::StrMinNum(v) => String::from("Must contain at least one b"),
        V::StrMinSpecial(v) => String::from("Must contain at least one special character"),
        V::Dt => String::from("Must be a date in the format YYYY-MM-DD"),
        V::DtMin(v) => String::from(format!("Must be greater than {v}")),
        V::DtMax(v) => String::from(format!("Must be greater than {v}")),
        V::Email => String::from("Must be a valid email"),
    }
}
