use araucaria::{error::SchemaErr, validation::Validation, value::Value};
use domain::{language::Language, validation::Validator};

pub struct ValidatorCustom;

impl Validator for ValidatorCustom {
    fn validate(&self, validation: &Validation, value: &Value) -> Result<(), SchemaErr> {
        araucaria_plugins::validate::validate(validation, value)
    }
}

pub fn value_from_json_and_schema(value: &serde_json::Value, validation: &Validation) -> Value {
    araucaria_plugins::deserialize::value_from_json_and_schema(value, validation)
}

pub fn validation_i18n(err: &SchemaErr, lg: &Language) -> String {
    let locale =match lg {
        Language::English => araucaria_plugins::locale::locale_en_long(),
        Language::Portuguese => araucaria_plugins::locale::locale_pt_long(),
        Language::Spanish => araucaria_plugins::locale::locale_es_long(),
    };
    let localized_err = araucaria::locale::localize_schema_err(err, &locale);
    let serializable_err = araucaria_plugins::serialize::to_schema_localized_err(localized_err);

    serde_json::to_string(&serializable_err).unwrap()
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
