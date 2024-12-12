mod validate;

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

fn validate_schema(schema: &Schema, value: &Value) -> Result<(), ()> {
    match value {
        Value::Obj(obj) => {
            schema.iter().for_each(|f| {
                let ddd = obj.get(f.0.clone()).unwrap_or(&Value::Absent);

                let dfddeferf: Vec<Result<(), ValidationErr>> = f
                    .1
                    .iter()
                    .map(|val| match val {
                        Validation::Required => {
                            required(ddd).map_err(|err| ValidationErr::RequiredErr(err))
                        }
                        Validation::NumI => num_i(ddd).map_err(|err| ValidationErr::NumIErr(err)),
                        Validation::NumU => num_u(ddd).map_err(|err| ValidationErr::NumUErr(err)),
                        Validation::NumF => num_f(ddd).map_err(|err| ValidationErr::NumFErr(err)),
                        Validation::Str => str(ddd).map_err(|err| ValidationErr::StrErr(err)),
                        Validation::Bool => bool(ddd).map_err(|err| ValidationErr::BoolErr(err)),
                        Validation::NumIExact(num_i_exact_v) => num_i_exact(*num_i_exact_v, ddd)
                            .map_err(|err| ValidationErr::NumIExactErr(err)),
                        Validation::NumIMin(num_i_min_v) => num_i_min(*num_i_min_v, ddd)
                            .map_err(|err| ValidationErr::NumIMinErr(err)),
                        Validation::NumIMax(num_i_max_v) => num_i_max(*num_i_max_v, ddd)
                            .map_err(|err| ValidationErr::NumIMaxErr(err)),
                        Validation::NumUExact(num_u_exact_v) => num_u_exact(*num_u_exact_v, ddd)
                            .map_err(|err| ValidationErr::NumUExactErr(err)),
                        Validation::NumUMin(num_u_min_v) => num_u_min(*num_u_min_v, ddd)
                            .map_err(|err| ValidationErr::NumUMinErr(err)),
                        Validation::NumUMax(num_u_max_v) => num_u_max(*num_u_max_v, ddd)
                            .map_err(|err| ValidationErr::NumUMaxErr(err)),
                        Validation::NumFExact(num_f_exact_v) => num_f_exact(*num_f_exact_v, ddd)
                            .map_err(|err| ValidationErr::NumFExactErr(err)),
                        Validation::NumFMin(num_f_min_v) => num_f_min(*num_f_min_v, ddd)
                            .map_err(|err| ValidationErr::NumFMinErr(err)),
                        Validation::NumFMax(num_f_max_v) => num_f_max(*num_f_max_v, ddd)
                            .map_err(|err| ValidationErr::NumFMaxErr(err)),
                        Validation::StrExact(str_exact_v) => str_exact(str_exact_v, ddd)
                            .map_err(|err| ValidationErr::StrExactErr(err)),
                        Validation::StrExactLen(str_exact_len_v) => {
                            str_exact_len(*str_exact_len_v, ddd)
                                .map_err(|err| ValidationErr::StrExactLenErr(err))
                        }
                        Validation::StrMinLen(str_min_len_v) => str_min_len(*str_min_len_v, ddd)
                            .map_err(|err| ValidationErr::StrMinLenErr(err)),
                        Validation::StrMaxLen(str_max_len_v) => str_max_len(*str_max_len_v, ddd)
                            .map_err(|err| ValidationErr::StrMaxLenErr(err)),
                        Validation::StrMinUpper(str_min_upper_v) => {
                            str_min_upper(*str_min_upper_v, ddd)
                                .map_err(|err| ValidationErr::StrMinUpperErr(err))
                        }
                        Validation::StrMinLower(str_min_lower_v) => {
                            str_min_lower(*str_min_lower_v, ddd)
                                .map_err(|err| ValidationErr::StrMinLowerErr(err))
                        }
                        Validation::StrMinNum(str_min_num_v) => str_min_num(*str_min_num_v, ddd)
                            .map_err(|err| ValidationErr::StrMinNumErr(err)),
                        Validation::StrMinSpecial(str_min_special_v) => {
                            str_min_special(*str_min_special_v, ddd)
                                .map_err(|err| ValidationErr::StrMinSpecialErr(err))
                        }
                        Validation::Dt => dt(ddd).map_err(|err| ValidationErr::DtErr(err)),
                        Validation::DtMin(dt_min_v) => {
                            dt_min(dt_min_v, ddd).map_err(|err| ValidationErr::DtMinErr(err))
                        }
                        Validation::DtMax(dt_max_v) => {
                            dt_max(dt_max_v, ddd).map_err(|err| ValidationErr::DtMaxErr(err))
                        }
                        Validation::Email => email(ddd).map_err(|err| ValidationErr::EmailErr(err)),
                    })
                    .collect();
            });
            Ok(())
        }
        _ => Err(()),
    }
}

#[cfg(test)]
mod test {
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
                    (String::from("birthday"), Value::Str(String::from("1990-01-01")))
                ]))
            ),
            Ok(())
        );
    }
}

// fn transform_to_value (val: serde_json::Value) -> Value {
//     match val {
//         serde_json::Value::Bool(b) => Value::Bool(b),
//         serde_json::Value::String(s) => Value::Str(s),
//         serde_json::Value::Number(n) => {
//             n.is_u64() {
//                 return Value::NumF(n.as_u64());
//             }
//             n.is_i64() {
//                 return Value::NumF(n.as_i64());
//             }
//             if n.is_f64() {
//                 return Value::NumF(n.as_f64());
//             }
//         },
//         serde_json::Value::Array(arr) => Value::Arr(a.into_iter().map(transform)),
//         serde_json::Value::Null => Value::Absent,
//         serde_json::Value::Object(obj) => Value::Arr,
//     }
// }
