use std::collections::HashMap;

use crate::domain::validation::{Schema, Val, Validator, V};

use super::{
    validate::{
        // bool::bool,
        // date::date,
        // date_max::date_max,
        // date_min::date_min,
        // datetime::datetime,
        // datetime_max::datetime_max,
        // datetime_min::datetime_min,
        // email::email,
        // eq::eq,
        // num_f::num_f,
        // num_f_exact::num_f_exact,
        // num_f_max::num_f_max,
        // num_f_min::num_f_min,
        num_i::num_i,
        // num_i_exact::num_i_exact,
        // num_i_max::num_i_max,
        // num_i_min::num_i_min,
        // num_u::num_u,
        // num_u_exact::num_u_exact,
        // num_u_max::num_u_max,
        // num_u_min::num_u_min,
        required::required,
        // str::str,
        // str_exact::str_exact,
        // str_exact_len::str_exact_len,
        // str_max_len::str_max_len,
        // str_min_len::str_min_len,
        // str_min_lower::str_min_lower,
        // str_min_num::str_min_num,
        // str_min_special::str_min_special,
        // str_min_upper::str_min_upper,
        // time::time,
        // time_max,
        // time_min
    },
    Field,
};

fn validate_schema(schema: &Schema, value: &Val) -> Result<(), Schema> {
    let mut res: Schema = HashMap::new();

    match value {
        Val::Obj(obj) => {
            schema.iter().for_each(|schema_f| {
                let value = obj.get(*schema_f.0).unwrap_or(&Val::None);
                let has_required = schema_f.1.iter().find(|v| v == &&V::Required).is_some();

                let f_results: Vec<V> = schema_f
                    .1
                    .iter()
                    .map(|val| {
                        let f = Field { value: value.clone(), has_required };
                        match val {
                                    V::Required => required(&f),
                                    V::NumI => num_i(&f),
                                    // V::NumU => num_u(&f),
                                    // V::NumF => num_f(&f),
                                    // V::Str => str(&f),
                                    // V::Bool => bool(&f),
                                    // V::Date => date(&f),
                                    // V::Time => time(&f),
                                    // V::Datetime => datetime(&f),
                                    // V::Email => email(&f),
                                    // V::NumIExact(v) => num_i_exact(*v, &f),
                                    // V::NumUExact(v) => num_u_exact(*v, &f),
                                    // V::NumFExact(v) => num_f_exact(*v, &f),
                                    // V::NumIMin(v) => num_i_min(*v, &f),
                                    // V::NumUMin(v) => num_u_min(*v, &f),
                                    // V::NumFMin(v) => num_f_min(*v, &f),
                                    // V::NumIMax(v) => num_i_max(*v, &f),
                                    // V::NumUMax(v) => num_u_max(*v, &f),
                                    // V::NumFMax(v) => num_f_max(*v, &f),
                                    // V::StrExact(v) => str_exact(v, &f),
                                    // V::StrExactLen(v) => str_exact_len(*v, &f),
                                    // V::StrMinLen(v) => str_min_len(*v, &f),
                                    // V::StrMaxLen(v) => str_max_len(*v, &f),
                                    // V::StrMinUpper(v) => str_min_upper(*v, &f),
                                    // V::StrMinLower(v) => str_min_lower(*v, &f),
                                    // V::StrMinNum(v) => str_min_num(*v, &f),
                                    // V::StrMinSpecial(v) => str_min_special(*v, &f),
                                    // V::DateMin(v) => date_min(v, &f),
                                    // V::DateMax(v) => date_max(v, &f),
                                    // V::TimeMin(v) => time_min(v, &f),
                                    // V::TimeMax(v) => time_max(v, &f),
                                    // V::DatetimeMin(v) => datetime_min(v, &f),
                                    // V::DatetimeMax(v) => datetime_max(v, &f),
                                    // V::Enum(v) =>
                                    // V::Eq(v) => eq(&f),
                                    // V::Ne(v) =>
                                    // V::Ge(v) =>
                                    // V::Gt(v) =>
                                    // V::Le(v) =>
                                    // V::Lt(v) =>  
                        }})
                    .filter_map(|res| res.err())
                    .collect();
                if !f_results.is_empty() {
                    res.insert(schema_f.0, f_results);
                }
            });
            if res.is_empty() {
                return Ok(());
            }
            Err(res)
        }
        _ => Ok(()),
    }
}

pub struct ValidatorCustom;

impl Validator for ValidatorCustom {
    fn validate(&self, schema: &Schema, value: &Val) -> Result<(), Schema> {
        validate_schema(schema, value)
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use std::collections::HashMap;

    #[test]
    fn test_validate_schema() {
        let schema = HashMap::from([
            ("name", vec![V::Required, /*V::Str, V::StrMinLen(1), V::StrMaxLen(255)*/]),
            ("birthdate", vec![V::Required, /*V::Str, V::Date*/]),
        ]);
        assert_eq!(
            validate_schema(
                &schema,
                &Val::Obj(HashMap::from([
                    (String::from("name"), Val::Str(String::from("John Doe"))),
                    (String::from("birthdate"), Val::Str(String::from("1990-01-01")))
                ]))
            ),
            Ok(())
        );
        assert_eq!(
            validate_schema(
                &schema,
                &Val::Obj(HashMap::from([
                    (String::from("name"), Val::Str(String::from(""))),
                    (String::from("birthdate"), Val::Str(String::from("")))
                ]))
            ),
            Err(HashMap::from([("name", vec![/*V::StrMinLen(1)*/]), ("birthdate", vec![/*V::Date*/])]))
        );
        assert_eq!(
            validate_schema(
                &schema,
                &Val::Obj(HashMap::from([
                    (String::from("name"), Val::None),
                    (String::from("birthdate"), Val::None)
                ]))
            ),
            Err(HashMap::from([
                ("name", vec![V::Required,  /*V::Str, V::StrMinLen(1), V::StrMaxLen(255)*/]),
                ("birthdate", vec![V::Required,  /*V::Str, V::Date,*/])
            ]))
        );
    }
}
