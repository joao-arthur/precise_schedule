use std::collections::HashMap;

#[derive(Debug, PartialEq, Clone)]
pub struct RequiredErr;

#[derive(Debug, PartialEq, Clone)]
pub struct NumIErr;

#[derive(Debug, PartialEq, Clone)]
pub struct NumUErr;

#[derive(Debug, PartialEq, Clone)]
pub struct NumFErr;

#[derive(Debug, PartialEq, Clone)]
pub struct StrErr;

#[derive(Debug, PartialEq, Clone)]
pub struct BoolErr;

#[derive(Debug, PartialEq, Clone)]
pub struct NumIExactErr;

#[derive(Debug, PartialEq, Clone)]
pub struct NumIMinErr;

#[derive(Debug, PartialEq, Clone)]
pub struct NumIMaxErr;

#[derive(Debug, PartialEq, Clone)]
pub struct NumUExactErr;

#[derive(Debug, PartialEq, Clone)]
pub struct NumUMinErr;

#[derive(Debug, PartialEq, Clone)]
pub struct NumUMaxErr;

#[derive(Debug, PartialEq, Clone)]
pub struct NumFExactErr;

#[derive(Debug, PartialEq, Clone)]
pub struct NumFMinErr;

#[derive(Debug, PartialEq, Clone)]
pub struct NumFMaxErr;

#[derive(Debug, PartialEq, Clone)]
pub struct StrExactErr;

#[derive(Debug, PartialEq, Clone)]
pub struct StrExactLenErr;

#[derive(Debug, PartialEq, Clone)]
pub struct StrMinLenErr;

#[derive(Debug, PartialEq, Clone)]
pub struct StrMaxLenErr;

#[derive(Debug, PartialEq, Clone)]
pub struct StrMinUpperErr;

#[derive(Debug, PartialEq, Clone)]
pub struct StrMinLowerErr;

#[derive(Debug, PartialEq, Clone)]
pub struct StrMinNumErr;

#[derive(Debug, PartialEq, Clone)]
pub struct StrMinSpecialErr;

#[derive(Debug, PartialEq, Clone)]
pub struct DtErr;

#[derive(Debug, PartialEq, Clone)]
pub struct DtMinErr;

#[derive(Debug, PartialEq, Clone)]
pub struct DtMaxErr;

#[derive(Debug, PartialEq, Clone)]
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

#[derive(Debug, PartialEq, Clone)]
pub enum ValidationErr {
    RequiredErr,
    NumIErr,
    NumUErr,
    NumFErr,
    StrErr,
    BoolErr,
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
    DtErr,
    DtMinErr(DtMinErr),
    DtMaxErr(DtMaxErr),
    EmailErr,
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

pub trait Validator {
    fn validate(&self, schema: &Schema, value: &Value) -> HashMap<String, Vec<ValidationErr>>;
}

#[cfg(test)]
pub mod test {
    use super::*;

    pub struct ValidatorStub(pub HashMap<String, Vec<ValidationErr>>);

    impl Validator for ValidatorStub {
        fn validate(&self, _schema: &Schema, _value: &Value) -> HashMap<String, Vec<ValidationErr>> {
            self.0.clone()
        }
    }

    #[test]
    fn test_validator_stub() {
        assert_eq!(
            ValidatorStub(HashMap::from([(String::from("name"), vec![ValidationErr::StrMinLenErr(StrMinLenErr)])])).validate(
                &HashMap::from([("name", vec![Validation::Str, Validation::StrMinLen(2)])]),
                &Value::Str(String::from("George"))
            ),
            HashMap::from([(String::from("name"), vec![ValidationErr::StrMinLenErr(StrMinLenErr)])])
        );
    }
}
