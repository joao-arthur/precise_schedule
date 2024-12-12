use crate::domain::validation::{BoolErr, Value};

fn bool(value: &Value) -> Result<(), BoolErr> {
    match value {
        Value::Bool(_value) => Ok(()),
        Value::Absent => Ok(()),
        _ => Err(BoolErr),
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use std::collections::HashMap;

    #[test]
    fn test_bool_ok() {
        assert_eq!(bool(&Value::Absent), Ok(()));
        assert_eq!(bool(&Value::Bool(false)), Ok(()));
    }

    #[test]
    fn test_bool_err() {
        assert_eq!(bool(&Value::NumI(-42)), Err(BoolErr));
        assert_eq!(bool(&Value::NumU(42)), Err(BoolErr));
        assert_eq!(bool(&Value::NumF(24.5)), Err(BoolErr));
        assert_eq!(bool(&Value::Str(String::from("hello"))), Err(BoolErr));
        assert_eq!(bool(&Value::Arr(vec![Value::NumI(-1), Value::NumI(2)])), Err(BoolErr));
        assert_eq!(bool(&Value::Obj(HashMap::from([(String::from("age"), Value::NumI(42))]))), Err(BoolErr));
    }
}
