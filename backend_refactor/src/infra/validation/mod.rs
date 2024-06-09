use crate::domain::validation::*;

pub fn req_v(_v: ReqV, value: Value) -> Result<(), ReqErr> {
    match value {
        Value::Absent => Err(ReqErr {}),
        _ => Ok(()),
    }
}

pub fn int_v(_v: IntV, value: Value) -> Result<(), IntErr> {
    match value {
        Value::Int(_value) => Ok(()),
        Value::Absent => Ok(()),
        _ => Err(IntErr {}),
    }
}

pub fn int_min_v(v: IntMinV, value: Value) -> Result<(), IntMinErr> {
    match value {
        Value::Int(int_value) => {
            if int_value >= v.value {
                Ok(())
            } else {
                Err(IntMinErr {})
            }
        }
        _ => Ok(()),
    }
}

pub fn int_max_v(v: IntMaxV, value: Value) -> Result<(), IntMaxErr> {
    match value {
        Value::Int(int_value) => {
            if int_value <= v.value {
                Ok(())
            } else {
                Err(IntMaxErr {})
            }
        }
        _ => Ok(()),
    }
}

#[cfg(test)]
mod validation_test {
    use super::*;
    use std::collections::HashMap;

    #[test]
    fn required_v_ok_test() {
        let string = String::from("hello");
        let arr = vec![Value::Int(-1), Value::Int(2)];
        let obj = HashMap::from([(String::from("age"), Value::Int(42))]);

        assert_eq!(req_v(ReqV {}, Value::Bool(false)), Ok(()));
        assert_eq!(req_v(ReqV {}, Value::Int(42)), Ok(()));
        assert_eq!(req_v(ReqV {}, Value::Float(24.5)), Ok(()));
        assert_eq!(req_v(ReqV {}, Value::Str(string)), Ok(()));
        assert_eq!(req_v(ReqV {}, Value::Arr(arr)), Ok(()));
        assert_eq!(req_v(ReqV {}, Value::Obj(obj)), Ok(()));
    }

    #[test]
    fn int_v_ok_test() {
        assert_eq!(int_v(IntV {}, Value::Absent), Ok(()));
        assert_eq!(int_v(IntV {}, Value::Int(42)), Ok(()));
        assert_eq!(int_v(IntV {}, Value::Int(-42)), Ok(()));
    }

    #[test]
    fn int_min_v_ok_test() {
        let string = String::from("hello");
        let arr = vec![Value::Int(-1), Value::Int(2)];
        let obj = HashMap::from([(String::from("age"), Value::Int(42))]);

        assert_eq!(int_min_v(IntMinV { value: -10 }, Value::Absent), Ok(()));
        assert_eq!(
            int_min_v(IntMinV { value: -10 }, Value::Bool(false)),
            Ok(())
        );
        assert_eq!(
            int_min_v(IntMinV { value: -10 }, Value::Float(24.5)),
            Ok(())
        );
        assert_eq!(
            int_min_v(IntMinV { value: -10 }, Value::Str(string)),
            Ok(())
        );
        assert_eq!(int_min_v(IntMinV { value: -10 }, Value::Arr(arr)), Ok(()));
        assert_eq!(int_min_v(IntMinV { value: -10 }, Value::Obj(obj)), Ok(()));

        assert_eq!(int_min_v(IntMinV { value: -10 }, Value::Int(-10)), Ok(()));
        assert_eq!(int_min_v(IntMinV { value: -10 }, Value::Int(0)), Ok(()));
        assert_eq!(int_min_v(IntMinV { value: -10 }, Value::Int(1)), Ok(()));
        assert_eq!(int_min_v(IntMinV { value: -10 }, Value::Int(10)), Ok(()));
    }

    #[test]
    fn int_max_v_ok_test() {
        let string = String::from("hello");
        let arr = vec![Value::Int(-1), Value::Int(2)];
        let obj = HashMap::from([(String::from("age"), Value::Int(42))]);

        assert_eq!(int_max_v(IntMaxV { value: 10 }, Value::Absent), Ok(()));
        assert_eq!(int_max_v(IntMaxV { value: 10 }, Value::Bool(false)), Ok(()));
        assert_eq!(int_max_v(IntMaxV { value: 10 }, Value::Float(24.5)), Ok(()));
        assert_eq!(int_max_v(IntMaxV { value: 10 }, Value::Str(string)), Ok(()));
        assert_eq!(int_max_v(IntMaxV { value: 10 }, Value::Arr(arr)), Ok(()));
        assert_eq!(int_max_v(IntMaxV { value: 10 }, Value::Obj(obj)), Ok(()));

        assert_eq!(int_max_v(IntMaxV { value: 10 }, Value::Int(-10)), Ok(()));
        assert_eq!(int_max_v(IntMaxV { value: 10 }, Value::Int(0)), Ok(()));
        assert_eq!(int_max_v(IntMaxV { value: 10 }, Value::Int(1)), Ok(()));
        assert_eq!(int_max_v(IntMaxV { value: 10 }, Value::Int(10)), Ok(()));
    }

    #[test]
    fn required_v_err_test() {
        assert_eq!(req_v(ReqV {}, Value::Absent), Err(ReqErr {}));
    }

    #[test]
    fn int_v_err_test() {
        let string = String::from("hello");
        let arr = vec![Value::Int(-1), Value::Int(2)];
        let obj = HashMap::from([(String::from("age"), Value::Int(42))]);

        assert_eq!(int_v(IntV {}, Value::Bool(false)), Err(IntErr {}));
        assert_eq!(int_v(IntV {}, Value::Float(24.5)), Err(IntErr {}));
        assert_eq!(int_v(IntV {}, Value::Str(string)), Err(IntErr {}));
        assert_eq!(int_v(IntV {}, Value::Arr(arr)), Err(IntErr {}));
        assert_eq!(int_v(IntV {}, Value::Obj(obj)), Err(IntErr {}));
    }

    #[test]
    fn int_min_v_err_test() {
        assert_eq!(
            int_min_v(IntMinV { value: -10 }, Value::Int(-11)),
            Err(IntMinErr {})
        );
        assert_eq!(
            int_min_v(IntMinV { value: -10 }, Value::Int(-12)),
            Err(IntMinErr {})
        );
    }

    #[test]
    fn int_max_v_err_test() {
        assert_eq!(
            int_max_v(IntMaxV { value: 10 }, Value::Int(11)),
            Err(IntMaxErr {})
        );
        assert_eq!(
            int_max_v(IntMaxV { value: 10 }, Value::Int(12)),
            Err(IntMaxErr {})
        );
    }
}
