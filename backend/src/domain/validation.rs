use std::collections::HashMap;

#[derive(Debug, PartialEq, Clone)]
pub struct RequiredErr(pub &'static str);

#[derive(Debug, PartialEq, Clone)]
pub struct NumUErr(pub &'static str);

#[derive(Debug, PartialEq, Clone)]
pub struct NumIErr(pub &'static str);

#[derive(Debug, PartialEq, Clone)]
pub struct NumFErr(pub &'static str);

#[derive(Debug, PartialEq, Clone)]
pub struct StrErr(pub &'static str);

#[derive(Debug, PartialEq, Clone)]
pub struct BoolErr(pub &'static str);

#[derive(Debug, PartialEq, Clone)]
pub struct NumUExactErr(pub &'static str);

#[derive(Debug, PartialEq, Clone)]
pub struct NumUMinErr(pub &'static str);

#[derive(Debug, PartialEq, Clone)]
pub struct NumUMaxErr(pub &'static str);

#[derive(Debug, PartialEq, Clone)]
pub struct NumIExactErr(pub &'static str);

#[derive(Debug, PartialEq, Clone)]
pub struct NumIMinErr(pub &'static str);

#[derive(Debug, PartialEq, Clone)]
pub struct NumIMaxErr(pub &'static str);

#[derive(Debug, PartialEq, Clone)]
pub struct NumFExactErr(pub &'static str);

#[derive(Debug, PartialEq, Clone)]
pub struct NumFMinErr(pub &'static str);

#[derive(Debug, PartialEq, Clone)]
pub struct NumFMaxErr(pub &'static str);

#[derive(Debug, PartialEq, Clone)]
pub struct StrExactErr(pub &'static str);

#[derive(Debug, PartialEq, Clone)]
pub struct StrExactLenErr(pub &'static str);

#[derive(Debug, PartialEq, Clone)]
pub struct StrMinLenErr(pub &'static str);

#[derive(Debug, PartialEq, Clone)]
pub struct StrMaxLenErr(pub &'static str);

#[derive(Debug, PartialEq, Clone)]
pub struct StrMinUpperErr(pub &'static str);

#[derive(Debug, PartialEq, Clone)]
pub struct StrMinLowerErr(pub &'static str);

#[derive(Debug, PartialEq, Clone)]
pub struct StrMinNumErr(pub &'static str);

#[derive(Debug, PartialEq, Clone)]
pub struct StrMinSpecialErr(pub &'static str);

#[derive(Debug, PartialEq, Clone)]
pub struct DtErr(pub &'static str);

#[derive(Debug, PartialEq, Clone)]
pub struct DtMinErr(pub &'static str);

#[derive(Debug, PartialEq, Clone)]
pub struct DtMaxErr(pub &'static str);

#[derive(Debug, PartialEq, Clone)]
pub struct EmailErr(pub &'static str);

#[derive(Debug, PartialEq)]
pub enum V {
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
pub enum VErr {
    Required(RequiredErr),
    NumI(NumIErr),
    NumU(NumUErr),
    NumF(NumFErr),
    Str(StrErr),
    Bool(BoolErr),
    NumIExact(NumIExactErr),
    NumIMin(NumIMinErr),
    NumIMax(NumIMaxErr),
    NumUExact(NumUExactErr),
    NumUMin(NumUMinErr),
    NumUMax(NumUMaxErr),
    NumFExact(NumFExactErr),
    NumFMin(NumFMinErr),
    NumFMax(NumFMaxErr),
    StrExact(StrExactErr),
    StrExactLen(StrExactLenErr),
    StrMinLen(StrMinLenErr),
    StrMaxLen(StrMaxLenErr),
    StrMinUpper(StrMinUpperErr),
    StrMinLower(StrMinLowerErr),
    StrMinNum(StrMinNumErr),
    StrMinSpecial(StrMinSpecialErr),
    Dt(DtErr),
    DtMin(DtMinErr),
    DtMax(DtMaxErr),
    Email(EmailErr),
}

#[derive(Debug, PartialEq, Clone)]
pub enum Val {
    None,
    Num(Option<u64>, Option<i64>, Option<f64>),
    Str(String),
    Bool(bool),
    Arr(Vec<Val>),
    Obj(HashMap<String, Val>),
}

pub type Schema = HashMap<&'static str, Vec<V>>;

pub type SchemaErr = HashMap<String, Vec<VErr>>;

pub trait Validator {
    fn validate(&self, schema: &Schema, value: &Val) -> Result<(), SchemaErr>;
}

#[cfg(test)]
pub mod stub {
    use super::*;

    pub struct ValidatorStub(pub Result<(), SchemaErr>);

    impl Validator for ValidatorStub {
        fn validate(&self, _schema: &Schema, _value: &Val) -> Result<(), SchemaErr> {
            self.0.clone()
        }
    }

    mod test {
        use super::*;

        #[test]
        fn test_validator_stub() {
            assert_eq!(
                ValidatorStub(Ok(())).validate(
                    &HashMap::from([("name", vec![V::Str, V::StrMinLen(2)])]),
                    &Val::Str(String::from("George"))
                ),
                Ok(())
            );
            assert_eq!(
                ValidatorStub(Err(HashMap::from([(
                    String::from("name"),
                    vec![VErr::StrMinLen(StrMinLenErr("name"))]
                )])))
                .validate(
                    &HashMap::from([("name", vec![V::Str, V::StrMinLen(2)])]),
                    &Val::Str(String::from("George"))
                ),
                Err(HashMap::from([(
                    String::from("name"),
                    vec![VErr::StrMinLen(StrMinLenErr("name"))]
                )]))
            );
        }
    }
}
