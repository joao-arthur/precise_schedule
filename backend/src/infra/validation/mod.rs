mod validate;

use std::collections::HashMap;

use validate::*;

use crate::domain::validation::{Schema, SchemaErr, VErr, Val, Validator, V};

struct Field {
    name: &'static str,
    value: Val,
    has_required: bool,
}

impl Default for Field {
    fn default() -> Self {
        Field { name: "foo", value: Val::None, has_required: false }
    }
}

impl Field {
    fn required() -> Self {
        Field { has_required: true, ..Default::default() }
    }

    fn of(value: Val) -> Self {
        Field { value, ..Default::default() }
    }
}

fn validate_schema(schema: &Schema, value: &Val) -> Result<(), HashMap<String, Vec<VErr>>> {
    let mut res: HashMap<String, Vec<VErr>> = HashMap::new();

    match value {
        Val::Obj(obj) => {
            schema.iter().for_each(|schema_f| {
                let value = obj.get(*schema_f.0).unwrap_or(&Val::None);
                let name = schema_f.0;
                let has_required = schema_f.1.iter().find(|v| v == &&V::Required).is_some();

                let f_results: Vec<VErr> = schema_f
                    .1
                    .iter()
                    .map(|val| match val {
                        V::Required => {
                            required(&Field { name, value: value.clone(), has_required })
                                .map_err(VErr::Required)
                        }
                        V::NumI => num_i(&Field { name, value: value.clone(), has_required })
                            .map_err(VErr::NumI),
                        V::NumU => num_u(&Field { name, value: value.clone(), has_required })
                            .map_err(VErr::NumU),
                        V::NumF => num_f(&Field { name, value: value.clone(), has_required })
                            .map_err(VErr::NumF),
                        V::Str => str(&Field { name, value: value.clone(), has_required })
                            .map_err(VErr::Str),
                        V::Bool => bool(&Field { name, value: value.clone(), has_required })
                            .map_err(VErr::Bool),
                        V::NumIExact(v) => {
                            num_i_exact(*v, &Field { name, value: value.clone(), has_required })
                                .map_err(VErr::NumIExact)
                        }
                        V::NumIMin(v) => {
                            num_i_min(*v, &Field { name, value: value.clone(), has_required })
                                .map_err(VErr::NumIMin)
                        }
                        V::NumIMax(v) => {
                            num_i_max(*v, &Field { name, value: value.clone(), has_required })
                                .map_err(VErr::NumIMax)
                        }
                        V::NumUExact(v) => {
                            num_u_exact(*v, &Field { name, value: value.clone(), has_required })
                                .map_err(VErr::NumUExact)
                        }
                        V::NumUMin(v) => {
                            num_u_min(*v, &Field { name, value: value.clone(), has_required })
                                .map_err(VErr::NumUMin)
                        }
                        V::NumUMax(v) => {
                            num_u_max(*v, &Field { name, value: value.clone(), has_required })
                                .map_err(VErr::NumUMax)
                        }
                        V::NumFExact(v) => {
                            num_f_exact(*v, &Field { name, value: value.clone(), has_required })
                                .map_err(VErr::NumFExact)
                        }
                        V::NumFMin(v) => {
                            num_f_min(*v, &Field { name, value: value.clone(), has_required })
                                .map_err(VErr::NumFMin)
                        }
                        V::NumFMax(v) => {
                            num_f_max(*v, &Field { name, value: value.clone(), has_required })
                                .map_err(VErr::NumFMax)
                        }
                        V::StrExact(v) => {
                            str_exact(v, &Field { name, value: value.clone(), has_required })
                                .map_err(VErr::StrExact)
                        }
                        V::StrExactLen(v) => {
                            str_exact_len(*v, &Field { name, value: value.clone(), has_required })
                                .map_err(VErr::StrExactLen)
                        }
                        V::StrMinLen(v) => {
                            str_min_len(*v, &Field { name, value: value.clone(), has_required })
                                .map_err(VErr::StrMinLen)
                        }
                        V::StrMaxLen(v) => {
                            str_max_len(*v, &Field { name, value: value.clone(), has_required })
                                .map_err(VErr::StrMaxLen)
                        }
                        V::StrMinUpper(v) => {
                            str_min_upper(*v, &Field { name, value: value.clone(), has_required })
                                .map_err(VErr::StrMinUpper)
                        }
                        V::StrMinLower(v) => {
                            str_min_lower(*v, &Field { name, value: value.clone(), has_required })
                                .map_err(VErr::StrMinLower)
                        }
                        V::StrMinNum(v) => {
                            str_min_num(*v, &Field { name, value: value.clone(), has_required })
                                .map_err(VErr::StrMinNum)
                        }
                        V::StrMinSpecial(v) => {
                            str_min_special(*v, &Field { name, value: value.clone(), has_required })
                                .map_err(VErr::StrMinSpecial)
                        }
                        V::Dt => dt(&Field { name, value: value.clone(), has_required })
                            .map_err(VErr::Dt),
                        V::DtMin(dt_min_v) => {
                            dt_min(dt_min_v, &Field { name, value: value.clone(), has_required })
                                .map_err(VErr::DtMin)
                        }
                        V::DtMax(dt_max_v) => {
                            dt_max(dt_max_v, &Field { name, value: value.clone(), has_required })
                                .map_err(VErr::DtMax)
                        }
                        V::Email => email(&Field { name, value: value.clone(), has_required })
                            .map_err(VErr::Email),
                    })
                    .filter_map(|res| res.err())
                    .collect();
                if !f_results.is_empty() {
                    res.insert(String::from(*schema_f.0), f_results);
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
    fn validate(&self, schema: &Schema, value: &Val) -> Result<(), SchemaErr> {
        validate_schema(schema, value)
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::domain::validation::{DtErr, RequiredErr, StrErr, StrMaxLenErr, StrMinLenErr};
    use std::collections::HashMap;

    #[test]
    fn test_validate_schema() {
        let schema = HashMap::from([
            ("name", vec![V::Required, V::Str, V::StrMinLen(1), V::StrMaxLen(256)]),
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
            Err(HashMap::from([
                (String::from("name"), vec![VErr::StrMinLen(StrMinLenErr("name"))]),
                (String::from("birthdate"), vec![VErr::Dt(DtErr("birthdate"))])
            ]))
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
                (
                    String::from("name"),
                    vec![
                        VErr::Required(RequiredErr("name")),
                        VErr::Str(StrErr("name")),
                        VErr::StrMinLen(StrMinLenErr("name")),
                        VErr::StrMaxLen(StrMaxLenErr("name"))
                    ]
                ),
                (
                    String::from("birthdate"),
                    vec![
                        VErr::Required(RequiredErr("birthdate")),
                        VErr::Str(StrErr("birthdate")),
                        VErr::Dt(DtErr("birthdate"))
                    ]
                )
            ]))
        );
    }
}
