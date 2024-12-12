use std::collections::HashMap;

#[derive(Debug, PartialEq)]
pub struct RequiredErr;

#[derive(Debug, PartialEq)]
pub struct NumIErr;

#[derive(Debug, PartialEq)]
pub struct NumUErr;

#[derive(Debug, PartialEq)]
pub struct NumFErr;

#[derive(Debug, PartialEq)]
pub struct StrErr;

#[derive(Debug, PartialEq)]
pub struct BoolErr;

#[derive(Debug, PartialEq)]
pub struct NumIExactErr;

#[derive(Debug, PartialEq)]
pub struct NumIMinErr;

#[derive(Debug, PartialEq)]
pub struct NumIMaxErr;

#[derive(Debug, PartialEq)]
pub struct NumUExactErr;

#[derive(Debug, PartialEq)]
pub struct NumUMinErr;

#[derive(Debug, PartialEq)]
pub struct NumUMaxErr;

#[derive(Debug, PartialEq)]
pub struct NumFExactErr;

#[derive(Debug, PartialEq)]
pub struct NumFMinErr;

#[derive(Debug, PartialEq)]
pub struct NumFMaxErr;

#[derive(Debug, PartialEq)]
pub struct StrExactErr;

#[derive(Debug, PartialEq)]
pub struct StrExactLenErr;

#[derive(Debug, PartialEq)]
pub struct StrMinLenErr;

#[derive(Debug, PartialEq)]
pub struct StrMaxLenErr;

#[derive(Debug, PartialEq)]
pub struct StrMinUpperErr;

#[derive(Debug, PartialEq)]
pub struct StrMinLowerErr;

#[derive(Debug, PartialEq)]
pub struct StrMinNumErr;

#[derive(Debug, PartialEq)]
pub struct StrMinSpecialErr;

#[derive(Debug, PartialEq)]
pub struct DtErr;

#[derive(Debug, PartialEq)]
pub struct DtMinErr;

#[derive(Debug, PartialEq)]
pub struct DtMaxErr;

#[derive(Debug, PartialEq)]
pub struct EmailErr;

pub enum Validation {
    Required,
    NumI,
    NumU,
    NumF,
    Str,
    Bool,
    NumIExact(i64),
    NumIMin(i64),
    NumIMax(i64),
    NumUExact(u64),
    NumUMin(u64),
    NumUMax(u64),
    NumFExact(f64),
    NumFMin(f64),
    NumFMax(f64),
    StrExact(String),
    StrExactLen(u32),
    StrMinLen(u32),
    StrMaxLen(u32),
    StrMinUpper(u32),
    StrMinLower(u32),
    StrMinNum(u32),
    StrMinSpecial(u32),
    Dt,
    DtMin(String),
    DtMax(String),
    Email,
}

pub enum ValidationErr {
    RequiredErr(RequiredErr),
    NumIErr(NumIErr),
    NumUErr(NumUErr),
    NumFErr(NumFErr),
    StrErr(StrErr),
    BoolErr(BoolErr),
    NumIExactErr(NumIExactErr),
    NumIMinErr(NumIMinErr),
    NumIMaxErr(NumIMaxErr),
    NumUExactErr(NumUExactErr),
    NumUMinErr(NumUMinErr),
    NumUMaxErr(NumUMaxErr),
    NumFExactErr(NumFExactErr),
    NumFMinErr(NumFMinErr),
    NumFMaxErr(NumFMaxErr),
    StrExactErr(StrExactErr),
    StrExactLenErr(StrExactLenErr),
    StrMinLenErr(StrMinLenErr),
    StrMaxLenErr(StrMaxLenErr),
    StrMinUpperErr(StrMinUpperErr),
    StrMinLowerErr(StrMinLowerErr),
    StrMinNumErr(StrMinNumErr),
    StrMinSpecialErr(StrMinSpecialErr),
    DtErr(DtErr),
    DtMinErr(DtMinErr),
    DtMaxErr(DtMaxErr),
    EmailErr(EmailErr),
}

pub enum Value {
    NumU(u64),
    NumI(i64),
    NumF(f64),
    Str(String),
    Bool(bool),
    Arr(Vec<Value>),
    Obj(HashMap<String, Value>),
    Absent,
}

pub type Schema<'a> = HashMap<&'a str, Vec<Validation>>;

fn validate_schema(schema: &Schema, value: &Value) -> Result<(), ()> {
    match value {
        Value::Obj(obj) => {
            schema.iter().for_each(|f| {
                let ddd = obj.get(f.0.clone()).unwrap_or(&Value::Absent);

                let dfddeferf: Vec<Result<(), ValidationErr>> = f.1.iter().map(|val| match val {
                    Validation::Required => required(ddd).map_err(|err| ValidationErr::RequiredErr(err)),
                    Validation::NumI => num_i(ddd).map_err(|err| ValidationErr::NumIErr(err)),
                    Validation::NumU => num_u(ddd).map_err(|err| ValidationErr::NumUErr(err)),
                    Validation::NumF => num_f(ddd).map_err(|err| ValidationErr::NumFErr(err)),
                    Validation::Str => str(ddd).map_err(|err| ValidationErr::StrErr(err)),
                    Validation::Bool => bool(ddd).map_err(|err| ValidationErr::BoolErr(err)),
                    Validation::NumIExact(num_i_exact_v) => num_i_exact(num_i_exact_v, ddd).map_err(|err| ValidationErr::NumIExactErr(err)),
                    Validation::NumIMin(num_i_min_v) => num_i_min(num_i_min_v, ddd).map_err(|err| ValidationErr::NumIMinErr(err)),
                    Validation::NumIMax(num_i_max_v) => num_i_max(num_i_max_v, ddd).map_err(|err| ValidationErr::NumIMaxErr(err)),
                    Validation::NumUExact(num_u_exact_v) => num_u_exact(num_u_exact_v, ddd).map_err(|err| ValidationErr::NumUExactErr(err)),
                    Validation::NumUMin(num_u_min_v) => num_u_min(num_u_min_v, ddd).map_err(|err| ValidationErr::NumUMinErr(err)),
                    Validation::NumUMax(num_u_max_v) => num_u_max(num_u_max_v, ddd).map_err(|err| ValidationErr::NumUMaxErr(err)),
                    Validation::NumFExact(num_f_exact_v) => num_f_exact(num_f_exact_v, ddd).map_err(|err| ValidationErr::NumFExactErr(err)),
                    Validation::NumFMin(num_f_min_v) => num_f_min(num_f_min_v, ddd).map_err(|err| ValidationErr::NumFMinErr(err)),
                    Validation::NumFMax(num_f_max_v) => num_f_max(num_f_max_v, ddd).map_err(|err| ValidationErr::NumFMaxErr(err)),
                    Validation::StrExact(str_exact_v) => str_exact(str_exact_v, ddd).map_err(|err| ValidationErr::StrExactErr(err)),
                    Validation::StrExactLen(str_exact_len_v) => str_exact_len(str_exact_len_v, ddd).map_err(|err| ValidationErr::StrExactLenErr(err)),
                    Validation::StrMinLen(str_min_len_v) => str_min_len(str_min_len_v, ddd).map_err(|err| ValidationErr::StrMinLenErr(err)),
                    Validation::StrMaxLen(str_max_len_v) => str_max_len(str_max_len_v, ddd).map_err(|err| ValidationErr::StrMaxLenErr(err)),
                    Validation::StrMinUpper(str_min_upper_v) => str_min_upper(str_min_upper_v, ddd).map_err(|err| ValidationErr::StrMinUpperErr(err)),
                    Validation::StrMinLower(str_min_lower_v) => str_min_lower(str_min_lower_v, ddd).map_err(|err| ValidationErr::StrMinLowerErr(err)),
                    Validation::StrMinNum(str_min_num_v) => str_min_num(str_min_num_v, ddd).map_err(|err| ValidationErr::StrMinNumErr(err)),
                    Validation::StrMinSpecial(str_min_special_v) => str_min_special(str_min_special_v, ddd).map_err(|err| ValidationErr::StrMinSpecialErr(err)),
                    Validation::Dt => dt(ddd).map_err(|err| ValidationErr::DtErr(err)),
                    Validation::DtMin(dt_min_v) => dt_min(dt_min_v, ddd).map_err(|err| ValidationErr::DtMinErr(err)),
                    Validation::DtMax(dt_max_v) => dt_max(dt_max_v, ddd).map_err(|err| ValidationErr::DtMaxErr(err)),
                    Validation::Email => email(ddd).map_err(|err| ValidationErr::EmailErr(err)),
                } ).collect();
            
             });
            Ok(())
        },
        _ => Err(()),
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use std::collections::HashMap;

    #[test]
    fn test_validate_schema() {
        assert_eq!(
            validate_schema(
                &HashMap::from([
                    (
                        "name",
                        vec![
                            Validation::Required,
                            Validation::Str,
                            Validation::StrMinLen(1),
                            Validation::StrMaxLen(256),
                        ],
                    ),
                    (
                        "birthdate",
                        vec![
                            Validation::Required,
                            Validation::Str,
                            Validation::Dt,
                        ]
                    )
                    ]),
                &Value::Obj(HashMap::from([
                    (String::from("name"), Value::Str(String::from("John Doe"))),
                    (String::from("birthday"), Value::Str(String::from("1990-01-01")))
                ])
                )
            ),
            Ok(())
        );
    }
}
