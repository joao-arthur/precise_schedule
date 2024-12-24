use std::collections::HashMap;

#[derive(Debug, PartialEq, Clone)]
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
    StrExact(&'static str),
    StrExactLen(u32),
    StrMinLen(u32),
    StrMaxLen(u32),
    StrMinUpper(u32),
    StrMinLower(u32),
    StrMinNum(u32),
    StrMinSpecial(u32),
    Dt,
    DtMin(&'static str),
    DtMax(&'static str),
    Email,
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

pub trait Validator {
    fn validate(&self, schema: &Schema, value: &Val) -> Result<(), Schema>;
}

#[cfg(test)]
pub mod stub {
    use super::*;

    pub struct ValidatorStub(pub Result<(), Schema>);

    impl Validator for ValidatorStub {
        fn validate(&self, _schema: &Schema, _value: &Val) -> Result<(), Schema> {
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
                ValidatorStub(Err(HashMap::from([("name", vec![V::StrMinLen(2)])]))).validate(
                    &HashMap::from([("name", vec![V::Str, V::StrMinLen(2)])]),
                    &Val::Str(String::from("George"))
                ),
                Err(HashMap::from([("name", vec![V::StrMinLen(2)])]))
            );
        }
    }
}
