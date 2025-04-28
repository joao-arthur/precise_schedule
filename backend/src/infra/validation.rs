use araucaria::{error::SchemaErr, validation::Validation, value::Value};
use domain::{language::Language, validation::Validator};

pub struct ValidatorCustom;

impl Validator for ValidatorCustom {
    fn validate(&self, validation: &Validation, value: &Value) -> Result<(), SchemaErr> {
        araucaria_plugins::validate::validate(validation, value, value, false)
    }
}

pub fn value_from_json_and_schema(value: &serde_json::Value, validation: &Validation) -> Value {
    araucaria_plugins::deserialize::value_from_json_and_schema(value, validation)
}

pub fn validation_i18n(err: &SchemaErr, lg: &Language) -> String {
    let locale = lg.to_iso_639_1();
    let locale_obj = araucaria_plugins::locale::locale_pt_long();
    serde_json::to_string(&araucaria_plugins::locale::schema_err_to_locale(err, &locale_obj)).unwrap()
}

#[cfg(test)]
mod test {
    use araucaria::validation::BoolValidation;

    use super::*;

    //#[test]
    //fn test_validation_i18n_english() {
    //    assert_eq!(validation_i18n(&Validation::Bool(BoolValidation::default()), &Language::English), String::from("Is required"));
    //}
}
