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

use crate::domain::validation::{Schema, Validation, ValidationErr, Value};

fn validate_schema(schema: &Schema, value: &Value) -> HashMap<String, Vec<ValidationErr>> {
    let mut res: HashMap<String, Vec<ValidationErr>> = HashMap::new();

    match value {
        Value::Obj(obj) => {
            schema.iter().for_each(|schema_f| {
                let f = obj.get(*schema_f.0).unwrap_or(&Value::Absent);
                let f_results: Vec<ValidationErr> = schema_f.1
                    .iter()
                    .map(|val| match val {
                        Validation::Required => required(f).map_err(|_| ValidationErr::RequiredErr),
                        Validation::NumI => num_i(f).map_err(|_| ValidationErr::NumIErr),
                        Validation::NumU => num_u(f).map_err(|_| ValidationErr::NumUErr),
                        Validation::NumF => num_f(f).map_err(|_| ValidationErr::NumFErr),
                        Validation::Str => str(f).map_err(|_| ValidationErr::StrErr),
                        Validation::Bool => bool(f).map_err(|_| ValidationErr::BoolErr),
                        Validation::NumIExact(v) => num_i_exact(*v, f).map_err(|err| ValidationErr::NumIExactErr(err)),
                        Validation::NumIMin(v) => num_i_min(*v, f).map_err(|err| ValidationErr::NumIMinErr(err)),
                        Validation::NumIMax(v) => num_i_max(*v, f).map_err(|err| ValidationErr::NumIMaxErr(err)),
                        Validation::NumUExact(v) => num_u_exact(*v, f).map_err(|err| ValidationErr::NumUExactErr(err)),
                        Validation::NumUMin(v) => num_u_min(*v, f).map_err(|err| ValidationErr::NumUMinErr(err)),
                        Validation::NumUMax(v) => num_u_max(*v, f).map_err(|err| ValidationErr::NumUMaxErr(err)),
                        Validation::NumFExact(v) => num_f_exact(*v, f).map_err(|err| ValidationErr::NumFExactErr(err)),
                        Validation::NumFMin(v) => num_f_min(*v, f).map_err(|err| ValidationErr::NumFMinErr(err)),
                        Validation::NumFMax(v) => num_f_max(*v, f).map_err(|err| ValidationErr::NumFMaxErr(err)),
                        Validation::StrExact(v) => str_exact(v, f).map_err(|err| ValidationErr::StrExactErr(err)),
                        Validation::StrExactLen(v) => str_exact_len(*v, f).map_err(|err| ValidationErr::StrExactLenErr(err)),
                        Validation::StrMinLen(v) => str_min_len(*v, f).map_err(|err| ValidationErr::StrMinLenErr(err)),
                        Validation::StrMaxLen(v) => str_max_len(*v, f).map_err(|err| ValidationErr::StrMaxLenErr(err)),
                        Validation::StrMinUpper(v) => str_min_upper(*v, f).map_err(|err| ValidationErr::StrMinUpperErr(err)),
                        Validation::StrMinLower(v) => str_min_lower(*v, f).map_err(|err| ValidationErr::StrMinLowerErr(err)),
                        Validation::StrMinNum(v) => str_min_num(*v, f).map_err(|err| ValidationErr::StrMinNumErr(err)),
                        Validation::StrMinSpecial(v) => str_min_special(*v, f).map_err(|err| ValidationErr::StrMinSpecialErr(err)),
                        Validation::Dt => dt(f).map_err(|_| ValidationErr::DtErr),
                        Validation::DtMin(dt_min_v) => dt_min(dt_min_v, f).map_err(|err| ValidationErr::DtMinErr(err)),
                        Validation::DtMax(dt_max_v) => dt_max(dt_max_v, f).map_err(|err| ValidationErr::DtMaxErr(err)),
                        Validation::Email => email(f).map_err(|_| ValidationErr::EmailErr),
                    })
                    .filter_map(|res| res.err())
                    .collect();
                if !f_results.is_empty() {
                    res.insert(String::from(*schema_f.0), f_results);
                }
            });
            res
        }
        _ => HashMap::new(),
    }
}

#[cfg(test)]
mod test {
    use crate::domain::validation::StrMinLenErr;
    use super::*;
    use std::collections::HashMap;

    #[test]
    fn test_validate_schema() {
        let schema = HashMap::from([
            (
                "name",
                vec![
                    Validation::Required,
                    Validation::Str,
                    Validation::StrMinLen(1),
                    Validation::StrMaxLen(256),
                ],
            ),
            ("birthdate", vec![Validation::Required, Validation::Str, Validation::Dt]),
        ]);
        assert_eq!(
            validate_schema(
                &schema,
                &Value::Obj(HashMap::from([
                    (String::from("name"), Value::Str(String::from("John Doe"))),
                    (String::from("birthdate"), Value::Str(String::from("1990-01-01")))
                ]))
            ),
            HashMap::new()
        );
        assert_eq!(
            validate_schema(
                &schema,
                &Value::Obj(HashMap::from([
                    (String::from("name"), Value::Str(String::from(""))),
                    (String::from("birthdate"), Value::Str(String::from("")))
                ]))
            ),
            HashMap::from([
                (String::from("name"), vec![ValidationErr::StrMinLenErr(StrMinLenErr)]),
                (String::from("birthdate"), vec![ValidationErr::DtErr])
            ])
        );
        assert_eq!(
            validate_schema(
                &schema,
                &Value::Obj(HashMap::from([
                    (String::from("name"), Value::Absent),
                    (String::from("birthdate"), Value::Absent)
                ]))
            ),
            HashMap::from([
                (String::from("name"), vec![ValidationErr::RequiredErr]),
                (String::from("birthdate"), vec![ValidationErr::RequiredErr])
            ])
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
