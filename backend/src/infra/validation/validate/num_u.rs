use crate::domain::validation::{NumUErr,NumUExactErr, NumUMinErr, NumUMaxErr, Value};

fn num_u(value: &Value) -> Result<(), NumUErr> {
    match value {
        Value::NumU(_num_u) => Ok(()),
        Value::Absent => Ok(()),
        _ => Err(NumUErr),
    }
}

fn num_u_exact(valid: u64, value: &Value) -> Result<(), NumUExactErr> {
    match value {
        Value::NumU(num_u) => if num_u == &valid { Ok(()) } else { Err(NumUExactErr) }
        _ => Ok(()),
    }
}

fn num_u_min(valid: u64, value: &Value) -> Result<(), NumUMinErr> {
    match value {
        Value::NumU(num_u) => if num_u >= &valid { Ok(()) } else { Err(NumUMinErr) }
        _ => Ok(()),
    }
}

fn num_u_max(valid: u64, value: &Value) -> Result<(), NumUMaxErr> {
    match value {
        Value::NumU(num_u) => if num_u <= &valid { Ok(()) } else { Err(NumUMaxErr) }
        _ => Ok(()),
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use std::collections::HashMap;

    #[test]
    fn test_num_u_ok() {
        assert_eq!(num_u(&Value::Absent), Ok(()));
        assert_eq!(num_u(&Value::NumU(42)), Ok(()));
    }

    #[test]
    fn test_num_u_err() {
        assert_eq!(num_u(&Value::Bool(false)), Err(NumUErr));
        assert_eq!(num_u(&Value::NumI(-42)), Err(NumUErr));
        assert_eq!(num_u(&Value::NumF(24.5)), Err(NumUErr));
        assert_eq!(num_u(&Value::Str(String::from("hello"))), Err(NumUErr));
        assert_eq!(num_u(&Value::Arr(vec![Value::NumI(-1), Value::NumI(2)])), Err(NumUErr));
        assert_eq!(num_u(&Value::Obj(HashMap::from([(String::from("age"), Value::NumI(42))]))), Err(NumUErr));
    }

    #[test]
    fn test_num_u_exact_ok() {
        assert_eq!(num_u_exact(42, &Value::Absent), Ok(()));
        assert_eq!(num_u_exact(42, &Value::NumU(42)), Ok(()));
        assert_eq!(num_u_exact(22, &Value::NumU(22)), Ok(()));
    }

    #[test]
    fn test_num_u_exact_err() {
        assert_eq!(num_u_exact(10, &Value::NumU(11)), Err(NumUExactErr));
        assert_eq!(num_u_exact(10, &Value::NumU(9)), Err(NumUExactErr));
    }

    #[test]
    fn test_num_u_min_ok() {
        assert_eq!(num_u_min(42, &Value::Absent), Ok(()));
        assert_eq!(num_u_min(42, &Value::NumU(42)), Ok(()));
        assert_eq!(num_u_min(42, &Value::NumU(43)), Ok(()));
        assert_eq!(num_u_min(42, &Value::NumU(100)), Ok(()));
    }

    #[test]
    fn test_num_u_min_err() {
        assert_eq!(num_u_min(10, &Value::NumU(9)), Err(NumUMinErr));
        assert_eq!(num_u_min(10, &Value::NumU(8)), Err(NumUMinErr));
    }

    #[test]
    fn test_num_u_max_ok() {
        assert_eq!(num_u_max(22, &Value::Absent), Ok(()));
        assert_eq!(num_u_max(22, &Value::NumU(22)), Ok(()));
        assert_eq!(num_u_max(22, &Value::NumU(21)), Ok(()));
        assert_eq!(num_u_max(22, &Value::NumU(0)), Ok(()));
    }

    #[test]
    fn test_num_u_max_err() {
        assert_eq!(num_u_max(10, &Value::NumU(11)), Err(NumUMaxErr));
        assert_eq!(num_u_max(10, &Value::NumU(12)), Err(NumUMaxErr));
    }
}
