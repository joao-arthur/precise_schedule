use std::collections::HashMap;

use crate::domain::validation::{Schema, Val, Validator, V};

use super::{
    validate::{
        bool::bool, dt::dt, dt_max::dt_max, dt_min::dt_min, email::email, num_f::num_f,
        num_f_exact::num_f_exact, num_f_max::num_f_max, num_f_min::num_f_min, num_i::num_i,
        num_i_exact::num_i_exact, num_i_max::num_i_max, num_i_min::num_i_min, num_u::num_u,
        num_u_exact::num_u_exact, num_u_max::num_u_max, num_u_min::num_u_min, required::required,
        str::str, str_exact::str_exact, str_exact_len::str_exact_len, str_max_len::str_max_len,
        str_min_len::str_min_len, str_min_lower::str_min_lower, str_min_num::str_min_num,
        str_min_special::str_min_special, str_min_upper::str_min_upper,
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
                    .map(|val| match val {
                        V::Required => required(&Field { value: value.clone(), has_required }),
                        V::NumI => num_i(&Field { value: value.clone(), has_required }),
                        V::NumU => num_u(&Field { value: value.clone(), has_required }),
                        V::NumF => num_f(&Field { value: value.clone(), has_required }),
                        V::Str => str(&Field { value: value.clone(), has_required }),
                        V::Bool => bool(&Field { value: value.clone(), has_required }),
                        V::NumIExact(v) => num_i_exact(*v, &Field { value: value.clone(), has_required }),
                        V::NumIMin(v) => num_i_min(*v, &Field { value: value.clone(), has_required }),
                        V::NumIMax(v) => num_i_max(*v, &Field { value: value.clone(), has_required }),
                        V::NumUExact(v) => num_u_exact(*v, &Field { value: value.clone(), has_required }),
                        V::NumUMin(v) => num_u_min(*v, &Field { value: value.clone(), has_required }),
                        V::NumUMax(v) => num_u_max(*v, &Field { value: value.clone(), has_required }),
                        V::NumFExact(v) => num_f_exact(*v, &Field { value: value.clone(), has_required }),
                        V::NumFMin(v) => num_f_min(*v, &Field { value: value.clone(), has_required }),
                        V::NumFMax(v) => num_f_max(*v, &Field { value: value.clone(), has_required }),
                        V::StrExact(v) => str_exact(v, &Field { value: value.clone(), has_required }),
                        V::StrExactLen(v) => str_exact_len(*v, &Field { value: value.clone(), has_required }),
                        V::StrMinLen(v) => str_min_len(*v, &Field { value: value.clone(), has_required }),
                        V::StrMaxLen(v) => str_max_len(*v, &Field { value: value.clone(), has_required }),
                        V::StrMinUpper(v) => str_min_upper(*v, &Field { value: value.clone(), has_required }),
                        V::StrMinLower(v) => str_min_lower(*v, &Field { value: value.clone(), has_required }),
                        V::StrMinNum(v) => str_min_num(*v, &Field { value: value.clone(), has_required }),
                        V::StrMinSpecial(v) => str_min_special(*v, &Field { value: value.clone(), has_required }),
                        V::Dt => dt(&Field { value: value.clone(), has_required }),
                        V::DtMin(dt_min_v) => dt_min(dt_min_v, &Field { value: value.clone(), has_required }),
                        V::DtMax(dt_max_v) => dt_max(dt_max_v, &Field { value: value.clone(), has_required }),
                        V::Email => email(&Field { value: value.clone(), has_required }),
                    })
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
            ("name", vec![V::Required, V::Str, V::StrMinLen(1), V::StrMaxLen(255)]),
            ("birthdate", vec![V::Required, V::Str, V::Dt]),
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
            Err(HashMap::from([("name", vec![V::StrMinLen(1)]), ("birthdate", vec![V::Dt])]))
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
                ("name", vec![V::Required, V::Str, V::StrMinLen(1), V::StrMaxLen(255)]),
                ("birthdate", vec![V::Required, V::Str, V::Dt,])
            ]))
        );
    }
}
