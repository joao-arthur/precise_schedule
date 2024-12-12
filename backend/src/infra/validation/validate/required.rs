use crate::domain::validation::{RequiredErr, Value};

pub fn validate_required(value: &Value) -> Result<(), RequiredErr> {
    match value {
        Value::Absent => Err(RequiredErr),
        _ => Ok(()),
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use std::collections::HashMap;

    #[test]
    fn test_required_ok() {
        assert_eq!(validate_required(&Value::Bool(false)), Ok(()));
        assert_eq!(validate_required(&Value::NumI(-42)), Ok(()));
        assert_eq!(validate_required(&Value::NumU(42)), Ok(()));
        assert_eq!(validate_required(&Value::NumF(24.5)), Ok(()));
        assert_eq!(validate_required(&Value::Str(String::from("hello"))), Ok(()));
        assert_eq!(validate_required(&Value::Arr(vec![Value::NumI(-1), Value::NumI(2)])), Ok(()));
        assert_eq!(validate_required(&Value::Obj(HashMap::from([(String::from("age"), Value::NumI(42))]))), Ok(()));
    }

    #[test]
    fn test_required_err() {
        assert_eq!(validate_required(&Value::Absent), Err(RequiredErr));
    }
}
