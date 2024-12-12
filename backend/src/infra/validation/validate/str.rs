use crate::domain::validation::{StrErr, StrExactErr, StrMaxLenErr, StrMinLenErr, StrMinNumErr, StrExactLenErr, StrMinSpecialErr, StrMinUpperErr, StrMinLowerErr, Value};

fn str(value: &Value) -> Result<(), StrErr> {
    match value {
        Value::Str(_value) => Ok(()),
        Value::Absent => Ok(()),
        _ => Err(StrErr),
    }
}

fn str_exact(valid: String, value: &Value) -> Result<(), StrExactErr> {
    match value {
        Value::Str(str_value) => if str_value == &valid { Ok(()) } else { Err(StrExactErr) }
        _ => Ok(()),
    }
}

fn str_exact_len(valid: u32, value: &Value) -> Result<(), StrExactLenErr> {
    match value {
        Value::Str(str_value) => if str_value.chars().count() as u32 == valid { Ok(()) } else { Err(StrExactLenErr) }
        _ => Ok(()),
    }
}

fn str_min_len(valid: u32, value: &Value) -> Result<(), StrMinLenErr> {
    match value {
        Value::Str(str_value) => if str_value.chars().count() as u32 >= valid { Ok(()) } else { Err(StrMinLenErr) }
        _ => Ok(()),
    }
}

fn str_max_len(valid: u32, value: &Value) -> Result<(), StrMaxLenErr> {
    match value {
        Value::Str(str_value) => if str_value.chars().count() as u32 <= valid { Ok(()) } else { Err(StrMaxLenErr) }
        _ => Ok(()),
    }
}

fn str_min_upper(valid: u32, value: &Value) -> Result<(), StrMinUpperErr> {
    match value {
        Value::Str(str_value) => {
            if str_value.chars().filter(|c| c.is_alphabetic() && c.is_uppercase()).count() as u32 >= valid {
                Ok(())
            } else {
                Err(StrMinUpperErr)
            }
        }
        _ => Ok(()),
    }
}

fn str_min_lower(valid: u32, value: &Value) -> Result<(), StrMinLowerErr> {
    match value {
        Value::Str(str_value) => {
            if str_value.chars().filter(|c| c.is_alphabetic() && c.is_lowercase()).count() as u32 >= valid {
                Ok(())
            } else {
                Err(StrMinLowerErr)
            }
        }
        _ => Ok(()),
    }
}

fn str_min_num(valid: u32, value: &Value) -> Result<(), StrMinNumErr> {
    match value {
        Value::Str(str_value) => {
            if str_value.chars().filter(|c| c.is_ascii_digit()).count() as u32 >= valid {
                Ok(())
            } else {
                Err(StrMinNumErr)
            }
        }
        _ => Ok(()),
    }
}

fn str_min_special(valid: u32, value: &Value) -> Result<(), StrMinSpecialErr> {
    match value {
        Value::Str(str_value) => {
            if str_value.chars().filter(|c| c.is_ascii_punctuation()).count() as u32 >= valid {
                Ok(())
            } else {
                Err(StrMinSpecialErr)
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
    fn test_str_ok() {
        assert_eq!(str(&Value::Absent), Ok(()));
        assert_eq!(str(&Value::Str(String::from("42"))), Ok(()));
    }

    #[test]
    fn test_str_err() {
        assert_eq!(str(&Value::Bool(false)), Err(StrErr));
        assert_eq!(str(&Value::NumI(-42)), Err(StrErr));
        assert_eq!(str(&Value::NumU(42)), Err(StrErr));
        assert_eq!(str(&Value::NumF(24.5)), Err(StrErr));
        assert_eq!(str(&Value::Arr(vec![Value::NumI(-1), Value::NumI(2)])), Err(StrErr));
        assert_eq!(str(&Value::Obj(HashMap::from([(String::from("age"), Value::NumI(42))]))), Err(StrErr));
    }

    #[test]
    fn test_str_exact_ok() {
        assert_eq!(str_exact(String::from("Ai"), &Value::Absent), Ok(()));
        assert_eq!(str_exact(String::from("Ai"), &Value::Str(String::from("Ai"))), Ok(()));
    }

    #[test]
    fn test_str_exact_err() {
        assert_eq!(str_exact(String::from("TO BE"), &Value::Str(String::from("to be"))), Err(StrExactErr)); 
    }

    #[test]
    fn test_str_exact_len_ok() {
        assert_eq!(str_exact_len(10, &Value::Absent), Ok(()));
        assert_eq!(str_exact_len(2, &Value::Str(String::from("so"))), Ok(()));
        assert_eq!(str_exact_len(4, &Value::Str(String::from("long"))), Ok(()));
        assert_eq!(str_exact_len(3, &Value::Str(String::from("and"))), Ok(()));
        assert_eq!(str_exact_len(6, &Value::Str(String::from("thanks"))), Ok(()));
    }

    #[test]
    fn test_str_exact_len_err() {
        assert_eq!(str_exact_len(6, &Value::Str(String::from("touch"))), Err(StrExactLenErr));
        assert_eq!(str_exact_len(6, &Value::Str(String::from("the sky"))), Err(StrExactLenErr));
    }

    #[test]
    fn test_str_min_len_ok() {
        assert_eq!(str_min_len(10, &Value::Absent), Ok(()));
        assert_eq!(str_min_len(10, &Value::Str(String::from("Hitchhiker"))), Ok(()));
        assert_eq!(str_min_len(10, &Value::Str(String::from("Guide to the galaxy"))), Ok(()));
    }

    #[test]
    fn test_str_min_len_err() {
        assert_eq!(str_min_len(10, &Value::Str(String::from("Nevermore"))), Err(StrMinLenErr));
        assert_eq!(str_min_len(10, &Value::Str(String::from("Nevermor"))), Err(StrMinLenErr));
    }

    #[test]
    fn test_str_max_len_ok() {
        assert_eq!(str_max_len(10, &Value::Absent), Ok(()));
        assert_eq!(str_max_len(10, &Value::Str(String::from("restaurant"))), Ok(()));
        assert_eq!(str_max_len(10, &Value::Str(String::from("at the end"))), Ok(()));
        assert_eq!(str_max_len(10, &Value::Str(String::from("of the"))), Ok(()));
        assert_eq!(str_max_len(10, &Value::Str(String::from("universe"))), Ok(()));
    }

    #[test]
    fn test_str_max_len_err() {
        assert_eq!(str_max_len(10, &Value::Str(String::from("there is a "))), Err(StrMaxLenErr));
        assert_eq!(str_max_len(10, &Value::Str(String::from("light that n"))), Err(StrMaxLenErr));
    }


    #[test]
    fn test_str_min_upper_ok() {
        assert_eq!(str_min_upper(1, &Value::Absent), Ok(()));
        assert_eq!(str_min_upper(1, &Value::Str(String::from("John"))), Ok(()));
        assert_eq!(str_min_upper(2, &Value::Str(String::from("JoHn"))), Ok(()));
        assert_eq!(str_min_upper(3, &Value::Str(String::from("JoHN"))), Ok(()));
        assert_eq!(str_min_upper(4, &Value::Str(String::from("JOHN"))), Ok(()));
    }

    #[test]
    fn test_str_min_upper_err() {
        assert_eq!(str_min_upper(4, &Value::Str(String::from("JOHn"))), Err(StrMinUpperErr));
        assert_eq!(str_min_upper(4, &Value::Str(String::from("JOhn"))), Err(StrMinUpperErr));
    }

    #[test]
    fn test_str_min_lower_ok() {
        assert_eq!(str_min_lower(1, &Value::Absent), Ok(()));
        assert_eq!(str_min_lower(1, &Value::Str(String::from("PAUl"))), Ok(()));
        assert_eq!(str_min_lower(2, &Value::Str(String::from("PAul"))), Ok(()));
        assert_eq!(str_min_lower(3, &Value::Str(String::from("Paul"))), Ok(()));
        assert_eq!(str_min_lower(4, &Value::Str(String::from("paul"))), Ok(()));
    }

    #[test]
    fn test_str_min_lower_err() {
        assert_eq!(str_min_lower(4, &Value::Str(String::from("PaUL"))), Err(StrMinLowerErr));
        assert_eq!(str_min_lower(4, &Value::Str(String::from("PauL"))), Err(StrMinLowerErr));
    }

    #[test]
    fn test_str_min_num_ok() {
        assert_eq!(str_min_num(1, &Value::Absent), Ok(()));
        assert_eq!(str_min_num(1, &Value::Str(String::from("1"))), Ok(()));
        assert_eq!(str_min_num(2, &Value::Str(String::from("10"))), Ok(()));
        assert_eq!(str_min_num(3, &Value::Str(String::from("we are 1 3 8"))), Ok(()));
    }

    #[test]
    fn test_str_min_num_err() {
        assert_eq!(str_min_num(3, &Value::Str(String::from("we are one 3 8"))), Err(StrMinNumErr));
        assert_eq!(str_min_num(3, &Value::Str(String::from("we are one thirty 8"))), Err(StrMinNumErr));
    }

    #[test]
    fn test_str_min_special_ok() {
        assert_eq!(str_min_special(1, &Value::Absent), Ok(()));
        assert_eq!(str_min_special(1, &Value::Str(String::from(":"))), Ok(()));
        assert_eq!(str_min_special(2, &Value::Str(String::from(":~"))), Ok(()));
        assert_eq!(str_min_special(10, &Value::Str(String::from("!@#$%&*()+-"))), Ok(()));
    }

    #[test]
    fn test_str_min_special_err() {
        assert_eq!(str_min_special(10, &Value::Str(String::from("!@#$%¨&*("))), Err(StrMinSpecialErr));
        assert_eq!(str_min_special(10, &Value::Str(String::from("pressure"))), Err(StrMinSpecialErr));
    }
}
