use araucaria::{error::ErrWrap, validation::Validation, value::Value};
use domain::{validation::Validator, language::Language};

pub struct ValidatorCustom;

impl Validator for ValidatorCustom {
    fn validate(&self, validation: &Validation, value: &Value) -> Result<(), ErrWrap> {
        Ok(())
    }
}

pub fn value_from_json_value(value: serde_json::Value) -> Value {
    match value {
        serde_json::Value::Null => Value::None,
        serde_json::Value::Bool(_bool) => Value::Bool(_bool),
        serde_json::Value::Number(num) => Value::Num(
            if num.is_u64() { num.as_u64() } else { None },
            if num.is_i64() { num.as_i64() } else { None },
            if num.is_f64() { num.as_f64() } else { None },
        ),
        serde_json::Value::String(str) => Value::Str(str),
        serde_json::Value::Array(arr) => {
            Value::Arr(arr.into_iter().map(value_from_json_value).collect())
        }
        serde_json::Value::Object(obj) => {
            Value::Obj(obj.into_iter().map(|f| (f.0, value_from_json_value(f.1))).collect())
        }
    }
}

pub fn validation_i18n(v: &Validation, lg: &Language) -> String {
    let locale = lg.to_iso_639_1();
    String::from("")
}

#[cfg(test)]
mod test {
    use araucaria::validation::bool::BoolValidation;

    use super::*;

    #[test]
    fn test_validation_i18n_english() {
        assert_eq!(validation_i18n(&Validation::Bool(BoolValidation::default()), &Language::English), String::from("Is required"));
    }
}
