use crate::domain::{
    language::Language,
    validation::{Val, V},
};

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

pub fn validation_i18n(v: &V, lg: &Language) -> String {
    let locale = lg.to_iso_639_1();
    match v {
        V::Required => String::from(rust_i18n::t!("validation.required", locale = locale)),
        V::NumI => String::from(rust_i18n::t!("validation.num_i", locale = locale)),
        V::NumU => String::from(rust_i18n::t!("validation.num_u", locale = locale)),
        V::NumF => String::from(rust_i18n::t!("validation.num_f", locale = locale)),
        V::Str => String::from(rust_i18n::t!("validation.str", locale = locale)),
        V::Bool => String::from(rust_i18n::t!("validation.bool", locale = locale)),
        V::Date => String::from(rust_i18n::t!("validation.dt", locale = locale)),
        V::Time => String::from(rust_i18n::t!("validation.dt", locale = locale)),
        V::Datetime => String::from(rust_i18n::t!("validation.dt", locale = locale)),
        V::Email => String::from(rust_i18n::t!("validation.email", locale = locale)),
        V::NumIExact(v) => rust_i18n::t!("validation.exact", locale = locale).replace("{}", &format!("{v}")),
        V::NumUExact(v) => rust_i18n::t!("validation.exact", locale = locale).replace("{}", &format!("{v}")),
        V::NumFExact(v) => rust_i18n::t!("validation.exact", locale = locale).replace("{}", &format!("{v}")),
        V::NumIMin(v) => rust_i18n::t!("validation.min", locale = locale).replace("{}", &format!("{v}")),
        V::NumUMin(v) => rust_i18n::t!("validation.min", locale = locale).replace("{}", &format!("{v}")),
        V::NumFMin(v) => rust_i18n::t!("validation.min", locale = locale).replace("{}", &format!("{v}")),
        V::NumIMax(v) => rust_i18n::t!("validation.max", locale = locale).replace("{}", &format!("{v}")),
        V::NumUMax(v) => rust_i18n::t!("validation.max", locale = locale).replace("{}", &format!("{v}")),
        V::NumFMax(v) => rust_i18n::t!("validation.max", locale = locale).replace("{}", &format!("{v}")),
        V::StrExact(v) => rust_i18n::t!("validation.exact", locale = locale).replace("{}", &format!("{v}")),
        V::StrExactLen(v) => rust_i18n::t!("validation.str_exact_len", locale = locale).replace("{}", &format!("{v}")),
        V::StrMinLen(v) => rust_i18n::t!("validation.str_min_len", locale = locale).replace("{}", &format!("{v}")),
        V::StrMaxLen(v) => rust_i18n::t!("validation.str_max_len", locale = locale).replace("{}", &format!("{v}")),
        V::StrMinUpper(v) => {
            if *v > 1 {
                String::from(rust_i18n::t!("validation.str_min_upper.plural", locale = locale)).replace("{}", &format!("{v}"))
            } else {
                String::from(rust_i18n::t!("validation.str_min_upper.singular", locale = locale)).replace("{}", &format!("{v}"))
            }
        }
        V::StrMinLower(v) => {
            if *v > 1 {
                String::from(rust_i18n::t!("validation.str_min_lower.plural", locale = locale)).replace("{}", &format!("{v}"))
            } else {
                String::from(rust_i18n::t!("validation.str_min_lower.singular", locale = locale)).replace("{}", &format!("{v}"))
            }
        }
        V::StrMinNum(v) => {
            if *v > 1 {
                String::from(rust_i18n::t!("validation.str_min_num.plural", locale = locale)).replace("{}", &format!("{v}"))
            } else {
                String::from(rust_i18n::t!("validation.str_min_num.singular", locale = locale)).replace("{}", &format!("{v}"))
            }
        }
        V::StrMinSpecial(v) => {
            if *v > 1 {
                String::from(rust_i18n::t!("validation.str_min_special.plural", locale = locale)).replace("{}", &format!("{v}"))
            } else {
                String::from(rust_i18n::t!("validation.str_min_special.singular", locale = locale)).replace("{}", &format!("{v}"))
            }
        }
        V::DateMin(v) => String::from(rust_i18n::t!("validation.min", locale = locale)).replace("{}", &format!("{v}")),
        V::DateMax(v) => String::from(rust_i18n::t!("validation.max", locale = locale)).replace("{}", &format!("{v}")),
    }
}
