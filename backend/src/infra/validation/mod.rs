mod validate;

use std::collections::HashMap;

use validate::{
    bool::bool,
    dt::{dt, dt_max, dt_min},
    email::email,
    num_f::{num_f, num_f_exact, num_f_max, num_f_min},
    num_i::{num_i, num_i_exact, num_i_max, num_i_min},
    num_u::{num_u, num_u_exact, num_u_max, num_u_min},
    required::required,
    str::{
        str, str_exact, str_exact_len, str_max_len, str_min_len, str_min_lower, str_min_num,
        str_min_special, str_min_upper,
    },
};

use crate::domain::validation::{Schema, SchemaErr, VErr, Validator, Value, V};

fn validate_schema(schema: &Schema, value: &Value) -> Result<(), HashMap<String, Vec<VErr>>> {
    let mut res: HashMap<String, Vec<VErr>> = HashMap::new();

    match value {
        Value::Obj(obj) => {
            schema.iter().for_each(|schema_f| {
                let f = obj.get(*schema_f.0).unwrap_or(&Value::Absent);
                let f_results: Vec<VErr> = schema_f
                    .1
                    .iter()
                    .map(|val| match val {
                        V::Required => required(f).map_err(|_| VErr::Required),
                        V::NumI => num_i(f).map_err(|_| VErr::NumI),
                        V::NumU => num_u(f).map_err(|_| VErr::NumU),
                        V::NumF => num_f(f).map_err(|_| VErr::NumF),
                        V::Str => str(f).map_err(|_| VErr::Str),
                        V::Bool => bool(f).map_err(|_| VErr::Bool),
                        V::NumIExact(v) => num_i_exact(*v, f).map_err(VErr::NumIExact),
                        V::NumIMin(v) => num_i_min(*v, f).map_err(VErr::NumIMin),
                        V::NumIMax(v) => num_i_max(*v, f).map_err(VErr::NumIMax),
                        V::NumUExact(v) => num_u_exact(*v, f).map_err(VErr::NumUExact),
                        V::NumUMin(v) => num_u_min(*v, f).map_err(VErr::NumUMin),
                        V::NumUMax(v) => num_u_max(*v, f).map_err(VErr::NumUMax),
                        V::NumFExact(v) => num_f_exact(*v, f).map_err(VErr::NumFExact),
                        V::NumFMin(v) => num_f_min(*v, f).map_err(VErr::NumFMin),
                        V::NumFMax(v) => num_f_max(*v, f).map_err(VErr::NumFMax),
                        V::StrExact(v) => str_exact(v, f).map_err(VErr::StrExact),
                        V::StrExactLen(v) => str_exact_len(*v, f).map_err(VErr::StrExactLen),
                        V::StrMinLen(v) => str_min_len(*v, f).map_err(VErr::StrMinLen),
                        V::StrMaxLen(v) => str_max_len(*v, f).map_err(VErr::StrMaxLen),
                        V::StrMinUpper(v) => str_min_upper(*v, f).map_err(VErr::StrMinUpper),
                        V::StrMinLower(v) => str_min_lower(*v, f).map_err(VErr::StrMinLower),
                        V::StrMinNum(v) => str_min_num(*v, f).map_err(VErr::StrMinNum),
                        V::StrMinSpecial(v) => str_min_special(*v, f).map_err(VErr::StrMinSpecial),
                        V::Dt => dt(f).map_err(|_| VErr::Dt),
                        V::DtMin(dt_min_v) => dt_min(dt_min_v, f).map_err(VErr::DtMin),
                        V::DtMax(dt_max_v) => dt_max(dt_max_v, f).map_err(VErr::DtMax),
                        V::Email => email(f).map_err(|_| VErr::Email),
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
    fn validate(&self, schema: &Schema, value: &Value) -> Result<(), SchemaErr> {
        validate_schema(schema, value)
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::domain::validation::StrMinLenErr;
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
                &Value::Obj(HashMap::from([
                    (String::from("name"), Value::Str(String::from("John Doe"))),
                    (String::from("birthdate"), Value::Str(String::from("1990-01-01")))
                ]))
            ),
            Ok(())
        );
        assert_eq!(
            validate_schema(
                &schema,
                &Value::Obj(HashMap::from([
                    (String::from("name"), Value::Str(String::from(""))),
                    (String::from("birthdate"), Value::Str(String::from("")))
                ]))
            ),
            Err(HashMap::from([
                (String::from("name"), vec![VErr::StrMinLen(StrMinLenErr)]),
                (String::from("birthdate"), vec![VErr::Dt])
            ]))
        );
        assert_eq!(
            validate_schema(
                &schema,
                &Value::Obj(HashMap::from([
                    (String::from("name"), Value::Absent),
                    (String::from("birthdate"), Value::Absent)
                ]))
            ),
            Err(HashMap::from([
                (String::from("name"), vec![VErr::Required]),
                (String::from("birthdate"), vec![VErr::Required])
            ]))
        );
    }
}

// pub fn transform_to_value(val: &rocket::figment::value::Value) -> Value {
//     match val {
//         rocket::figment::value::Value::String(_, s) => Value::Str(s),
//         rocket::figment::value::Value::Char(_, c) => Value::Str(String::from(c)),
//         rocket::figment::value::Value::Bool(_, b) => Value::Bool(b),
//         rocket::figment::value::Value::Num(_, n) => match n {
//             rocket::figment::value::Num::U8(v) => Value::NumU(u64::from(v)),
//             rocket::figment::value::Num::U16(v) => Value::NumU(u64::from(v)),
//             rocket::figment::value::Num::U32(v) => Value::NumU(u64::from(v)),
//             rocket::figment::value::Num::U64(v) => Value::NumU(v),
//             rocket::figment::value::Num::U128(v) => Value::NumU(v as u64),
//             rocket::figment::value::Num::USize(v) => Value::NumU(v as u64),
//             rocket::figment::value::Num::I8(v) => Value::NumI(i64::from(v)),
//             rocket::figment::value::Num::I16(v) => Value::NumI(i64::from(v)),
//             rocket::figment::value::Num::I32(v) => Value::NumI(i64::from(v)),
//             rocket::figment::value::Num::I64(v) => Value::NumI(v),
//             rocket::figment::value::Num::I128(v) => Value::NumI(v as i64),
//             rocket::figment::value::Num::ISize(v) => Value::NumI(v as i64),
//             rocket::figment::value::Num::F32(v) => Value::NumF(f64::from(v)),
//             rocket::figment::value::Num::F64(v) => Value::NumF(v),
//         },
//         rocket::figment::value::Value::Empty(_, __) => Value::Absent,
//         rocket::figment::value::Value::Dict(_, obj) => Value::Obj(obj.into_iter().map(|f| (f.0, transform_to_value(f.1))).collect()),
//         rocket::figment::value::Value::Array(_, arr) => Value::Arr(arr.into_iter().map(transform_to_value).collect()),
//     }
// }
