use crate::domain::validation::{NumFErr,NumFExactErr, NumFMinErr, NumFMaxErr, Value};

fn num_f(value: &Value) -> Result<(), NumFErr> {
    match value {
        Value::NumF(_value) => Ok(()),
        Value::Absent => Ok(()),
        _ => Err(NumFErr),
    }
}

fn num_f_exact(valid: f64, value: &Value) -> Result<(), NumFExactErr> {
    match value {
        Value::NumF(num_f) => if num_f == &valid { Ok(()) } else { Err(NumFExactErr) }
        _ => Ok(()),
    }
}

fn num_f_min(valid: f64, value: &Value) -> Result<(), NumFMinErr> {
    match value {
        Value::NumF(num_f) => if num_f >= &valid { Ok(()) } else { Err(NumFMinErr) }
        _ => Ok(()),
    }
}

fn num_f_max(valid: f64, value: &Value) -> Result<(), NumFMaxErr> {
    match value {
        Value::NumF(num_f) => if num_f <= &valid { Ok(()) } else { Err(NumFMaxErr) }
        _ => Ok(()),
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use std::collections::HashMap;

    #[test]
    fn test_num_f_ok() {
        assert_eq!(num_f(&Value::Absent), Ok(()));
        assert_eq!(num_f(&Value::NumF(-42.0)), Ok(()));
    }

    #[test]
    fn test_num_f_err() {
        assert_eq!(num_f(&Value::Bool(false)), Err(NumFErr));
        assert_eq!(num_f(&Value::NumI(-42)), Err(NumFErr));
        assert_eq!(num_f(&Value::NumU(42)), Err(NumFErr));
        assert_eq!(num_f(&Value::Str(String::from("hello"))), Err(NumFErr));
        assert_eq!(num_f(&Value::Arr(vec![Value::NumI(-1), Value::NumI(2)])), Err(NumFErr));
        assert_eq!(num_f(&Value::Obj(HashMap::from([(String::from("age"), Value::NumI(42))]))), Err(NumFErr));
    }

    #[test]
    fn test_num_f_exact_ok() {
        assert_eq!(num_f_exact(-42.0, &Value::Absent), Ok(()));
        assert_eq!(num_f_exact(-42.5, &Value::NumF(-42.5)), Ok(()));
        assert_eq!(num_f_exact(42.5, &Value::NumF(42.5)), Ok(()));
    }

    #[test]
    fn test_num_f_exact_err() {
        assert_eq!(num_f_exact(-10.0, &Value::NumF(-10.1)), Err(NumFExactErr));
        assert_eq!(num_f_exact(-10.0, &Value::NumF(-9.9)), Err(NumFExactErr));
    }

    #[test]
    fn test_num_f_min_ok() {
        assert_eq!(num_f_min(-42.0, &Value::Absent), Ok(()));
        assert_eq!(num_f_min(-42.0, &Value::NumF(-42.0)), Ok(()));
        assert_eq!(num_f_min(-42.0, &Value::NumF(-41.9)), Ok(()));
        assert_eq!(num_f_min(-42.0, &Value::NumF(-41.0)), Ok(()));
        assert_eq!(num_f_min(-42.0, &Value::NumF(22.0)), Ok(()));
    }

    #[test]
    fn test_num_f_min_err() {
        assert_eq!(num_f_min(-10.0, &Value::NumF(-11.0)), Err(NumFMinErr));
        assert_eq!(num_f_min(-10.0, &Value::NumF(-12.0)), Err(NumFMinErr));
    }

    #[test]
    fn test_num_f_max_ok() {
        assert_eq!(num_f_max(22.0, &Value::Absent), Ok(()));
        assert_eq!(num_f_max(22.0, &Value::NumF(22.0)), Ok(()));
        assert_eq!(num_f_max(22.0, &Value::NumF(21.9)), Ok(()));
        assert_eq!(num_f_max(22.0, &Value::NumF(21.0)), Ok(()));
        assert_eq!(num_f_max(22.0, &Value::NumF(-1943.0)), Ok(()));
    }

    #[test]
    fn test_num_f_max_err() {
        assert_eq!(num_f_max(10.0, &Value::NumF(11.0)), Err(NumFMaxErr));
        assert_eq!(num_f_max(10.0, &Value::NumF(12.0)), Err(NumFMaxErr));
    }
}
