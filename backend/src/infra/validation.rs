use araucaria::error::SchemaErr;
use domain::language::Language;

pub fn language_to_locale(lg: &Language) -> araucaria::locale::Locale {
    match lg {
        Language::English => araucaria_plugins::locale::locale_en_long(),
        Language::Portuguese => araucaria_plugins::locale::locale_pt_long(),
        Language::Spanish => araucaria_plugins::locale::locale_es_long(),
    }
}

pub fn validation_i18n(err: &SchemaErr, lg: &Language) -> String {
    let locale = match lg {
        Language::English => araucaria_plugins::locale::locale_en_long(),
        Language::Portuguese => araucaria_plugins::locale::locale_pt_long(),
        Language::Spanish => araucaria_plugins::locale::locale_es_long(),
    };
    let localized_err = araucaria::locale::localize_schema_err(err, &locale);
    let serializable_err = araucaria_plugins::serialize::to_schema_err_locale(localized_err);

    serde_json::to_string(&serializable_err).unwrap()
}

#[cfg(test)]
mod test {
    use araucaria::schema::BoolSchema;

    use super::*;

    //#[test]
    //fn test_validation_i18n_english() {
    //    assert_eq!(validation_i18n(&Validation::Bool(BoolSchema::default()), &Language::English), String::from("Is required"));
    //}
}
