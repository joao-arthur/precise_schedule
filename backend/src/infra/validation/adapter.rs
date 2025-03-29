use domain::{
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
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_validation_i18n_english() {
        assert_eq!(validation_i18n(&V::Required, &Language::English), String::from("Is required"));
    }
}