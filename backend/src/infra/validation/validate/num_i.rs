use crate::domain::validation::{NumIErr, NumIExactErr, NumIMaxErr, NumIMinErr, Value};

pub fn num_i(value: &Value) -> Result<(), NumIErr> {
    match value {
        Value::NumI(_num_i) => Ok(()),
        Value::Absent => Ok(()),
        _ => Err(NumIErr),
    }
}

pub fn num_i_exact(valid: i64, value: &Value) -> Result<(), NumIExactErr> {
    match value {
        Value::NumI(num_i) => {
            if num_i == &valid {
                Ok(())
            } else {
                Err(NumIExactErr)
            }
        }
        _ => Ok(()),
    }
}

pub fn num_i_min(valid: i64, value: &Value) -> Result<(), NumIMinErr> {
    match value {
        Value::NumI(num_i) => {
            if num_i >= &valid {
                Ok(())
            } else {
                Err(NumIMinErr)
            }
        }
        _ => Ok(()),
    }
}

pub fn num_i_max(valid: i64, value: &Value) -> Result<(), NumIMaxErr> {
    match value {
        Value::NumI(num_i) => {
            if num_i <= &valid {
                Ok(())
            } else {
                Err(NumIMaxErr)
            }
        }
        _ => Ok(()),
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use std::collections::HashMap;

    #[test]
    fn test_num_i_ok() {
        assert_eq!(num_i(&Value::Absent), Ok(()));
        assert_eq!(num_i(&Value::NumI(-42)), Ok(()));
    }

    #[test]
    fn test_num_i_err() {
        assert_eq!(num_i(&Value::Bool(false)), Err(NumIErr));
        assert_eq!(num_i(&Value::NumU(42)), Err(NumIErr));
        assert_eq!(num_i(&Value::NumF(24.5)), Err(NumIErr));
        assert_eq!(num_i(&Value::Str(String::from("hello"))), Err(NumIErr));
        assert_eq!(num_i(&Value::Arr(vec![Value::NumI(-1), Value::NumI(2)])), Err(NumIErr));
        assert_eq!(
            num_i(&Value::Obj(HashMap::from([(String::from("age"), Value::NumI(42))]))),
            Err(NumIErr)
        );
    }

    #[test]
    fn test_num_i_exact_ok() {
        assert_eq!(num_i_exact(42, &Value::Absent), Ok(()));
        assert_eq!(num_i_exact(42, &Value::NumI(42)), Ok(()));
        assert_eq!(num_i_exact(-42, &Value::NumI(-42)), Ok(()));
    }

    #[test]
    fn test_num_i_exact_err() {
        assert_eq!(num_i_exact(-10, &Value::NumI(-11)), Err(NumIExactErr));
        assert_eq!(num_i_exact(-10, &Value::NumI(-9)), Err(NumIExactErr));
    }

    #[test]
    fn test_num_i_min_ok() {
        assert_eq!(num_i_min(-42, &Value::Absent), Ok(()));
        assert_eq!(num_i_min(-42, &Value::NumI(-42)), Ok(()));
        assert_eq!(num_i_min(-42, &Value::NumI(-41)), Ok(()));
        assert_eq!(num_i_min(-42, &Value::NumI(22)), Ok(()));
    }

    #[test]
    fn test_num_i_min_err() {
        assert_eq!(num_i_min(-10, &Value::NumI(-11)), Err(NumIMinErr));
        assert_eq!(num_i_min(-10, &Value::NumI(-12)), Err(NumIMinErr));
    }

    #[test]
    fn test_num_i_max_ok() {
        assert_eq!(num_i_max(22, &Value::Absent), Ok(()));
        assert_eq!(num_i_max(22, &Value::NumI(22)), Ok(()));
        assert_eq!(num_i_max(22, &Value::NumI(21)), Ok(()));
        assert_eq!(num_i_max(22, &Value::NumI(-1943)), Ok(()));
    }

    #[test]
    fn test_num_i_max_err() {
        assert_eq!(num_i_max(10, &Value::NumI(11)), Err(NumIMaxErr));
        assert_eq!(num_i_max(10, &Value::NumI(12)), Err(NumIMaxErr));
    }
}
