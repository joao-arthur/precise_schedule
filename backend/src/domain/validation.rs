use std::collections::HashMap;

pub struct Required;

pub struct NumI;
pub struct NumIExact(pub i64);
pub struct NumIMin(pub i64);
pub struct NumIMax(pub i64);

pub struct NumU;
pub struct NumUExact(pub u64);
pub struct NumUMin(pub u64);
pub struct NumUMax(pub u64);

pub struct NumF;
pub struct NumFExact(pub f64);
pub struct NumFMin(pub f64);
pub struct NumFMax(pub f64);

pub struct Str;
pub struct StrExact(pub String);
pub struct StrExactLen(pub u32);
pub struct StrMinLen(pub u32);
pub struct StrMaxLen(pub u32);

pub struct StrMinUpper(pub u32);
pub struct StrMinLower(pub u32);
pub struct StrMinNum(pub u32);
pub struct StrMinSpecial(pub u32);

pub struct Dt;
pub struct DtExact(pub String);
pub struct DtMin(pub String);
pub struct DtMax(pub String);

pub struct Email;

#[derive(Debug, PartialEq)]
pub struct RequiredErr;

#[derive(Debug, PartialEq)]
pub struct NumIErr;

#[derive(Debug, PartialEq)]
pub struct NumIExactErr;

#[derive(Debug, PartialEq)]
pub struct NumIMinErr;

#[derive(Debug, PartialEq)]
pub struct NumIMaxErr;

#[derive(Debug, PartialEq)]
pub struct NumUErr;

#[derive(Debug, PartialEq)]
pub struct NumUExactErr;

#[derive(Debug, PartialEq)]
pub struct NumUMinErr;

#[derive(Debug, PartialEq)]
pub struct NumUMaxErr;

#[derive(Debug, PartialEq)]
pub struct NumFErr;

#[derive(Debug, PartialEq)]
pub struct NumFExactErr;

#[derive(Debug, PartialEq)]
pub struct NumFMinErr;

#[derive(Debug, PartialEq)]
pub struct NumFMaxErr;

#[derive(Debug, PartialEq)]
pub struct StrErr;

#[derive(Debug, PartialEq)]
pub struct StrExactErr;

#[derive(Debug, PartialEq)]
pub struct StrExactLenErr;

#[derive(Debug, PartialEq)]
pub struct StrMinLenErr;

#[derive(Debug, PartialEq)]
pub struct StrMaxLenErr;

#[derive(Debug, PartialEq)]
pub struct StrMinUpperErr;

#[derive(Debug, PartialEq)]
pub struct StrMinLowerErr;

#[derive(Debug, PartialEq)]
pub struct StrMinNumErr;

#[derive(Debug, PartialEq)]
pub struct StrMinSpecialErr;

#[derive(Debug, PartialEq)]
pub struct DtErr;

#[derive(Debug, PartialEq)]
pub struct DtExactErr;

#[derive(Debug, PartialEq)]
pub struct DtMinErr;

#[derive(Debug, PartialEq)]
pub struct DtMaxErr;

#[derive(Debug, PartialEq)]
pub struct EmailErr;

pub enum Validation {
    Required(Required),
    NumI(NumI),
    NumIExact(NumIExact),
    NumIMin(NumIMin),
    NumIMax(NumIMax),
    NumU(NumU),
    NumUExact(NumUExact),
    NumUMin(NumUMin),
    NumUMax(NumUMax),
    NumF(NumF),
    NumFExact(NumFExact),
    NumFMin(NumFMin),
    NumFMax(NumFMax),
    Str(Str),
    StrExact(StrExact),
    StrExactLen(StrExactLen),
    StrMinLen(StrMinLen),
    StrMaxLen(StrMaxLen),
    StrMinUpper(StrMinUpper),
    StrMinLower(StrMinLower),
    StrMinNum(StrMinNum),
    StrMinSpecial(StrMinSpecial),
    Dt(Dt),
    DtExact(DtExact),
    DtMin(DtMin),
    DtMax(DtMax),
    Email(Email),
}

pub enum Value {
    Bool(bool),
    NumU(u64),
    NumI(i64),
    NumF(f64),
    Str(String),
    Arr(Vec<Value>),
    Obj(HashMap<String, Value>),
    Absent,
}

pub type Schema<'a> = HashMap<&'a str, Vec<Validation>>;

fn validate_required(_v: Required, value: Value) -> Result<(), RequiredErr> {
    match value {
        Value::Absent => Err(RequiredErr),
        _ => Ok(()),
    }
}

fn validate_num_i(_valid: NumI, value: Value) -> Result<(), NumIErr> {
    match value {
        Value::NumI(_num_i) => Ok(()),
        Value::Absent => Ok(()),
        _ => Err(NumIErr),
    }
}

fn validate_num_i_exact(valid: NumIExact, value: Value) -> Result<(), NumIExactErr> {
    match value {
        Value::NumI(num_i) => if num_i == valid.0 { Ok(()) } else { Err(NumIExactErr) }
        _ => Ok(()),
    }
}

fn validate_num_i_min(valid: NumIMin, value: Value) -> Result<(), NumIMinErr> {
    match value {
        Value::NumI(num_i) => if num_i >= valid.0 { Ok(()) } else { Err(NumIMinErr) }
        _ => Ok(()),
    }
}

fn validate_num_i_max(valid: NumIMax, value: Value) -> Result<(), NumIMaxErr> {
    match value {
        Value::NumI(num_i) => if num_i <= valid.0 { Ok(()) } else { Err(NumIMaxErr) }
        _ => Ok(()),
    }
}

fn validate_num_u(_valid: NumU, value: Value) -> Result<(), NumUErr> {
    match value {
        Value::NumU(_num_u) => Ok(()),
        Value::Absent => Ok(()),
        _ => Err(NumUErr),
    }
}

fn validate_num_u_exact(valid: NumUExact, value: Value) -> Result<(), NumUExactErr> {
    match value {
        Value::NumU(num_u) => if num_u == valid.0 { Ok(()) } else { Err(NumUExactErr) }
        _ => Ok(()),
    }
}

fn validate_num_u_min(valid: NumUMin, value: Value) -> Result<(), NumUMinErr> {
    match value {
        Value::NumU(num_u) => if num_u >= valid.0 { Ok(()) } else { Err(NumUMinErr) }
        _ => Ok(()),
    }
}

fn validate_num_u_max(valid: NumUMax, value: Value) -> Result<(), NumUMaxErr> {
    match value {
        Value::NumU(num_u) => if num_u <= valid.0 { Ok(()) } else { Err(NumUMaxErr) }
        _ => Ok(()),
    }
}

fn validate_num_f(_valid: NumF, value: Value) -> Result<(), NumFErr> {
    match value {
        Value::NumF(_value) => Ok(()),
        Value::Absent => Ok(()),
        _ => Err(NumFErr),
    }
}

fn validate_num_f_exact(valid: NumFExact, value: Value) -> Result<(), NumFExactErr> {
    match value {
        Value::NumF(num_f) => if num_f == valid.0 { Ok(()) } else { Err(NumFExactErr) }
        _ => Ok(()),
    }
}

fn validate_num_f_min(valid: NumFMin, value: Value) -> Result<(), NumFMinErr> {
    match value {
        Value::NumF(num_f) => if num_f >= valid.0 { Ok(()) } else { Err(NumFMinErr) }
        _ => Ok(()),
    }
}

fn validate_num_f_max(valid: NumFMax, value: Value) -> Result<(), NumFMaxErr> {
    match value {
        Value::NumF(num_f) => if num_f <= valid.0 { Ok(()) } else { Err(NumFMaxErr) }
        _ => Ok(()),
    }
}

fn validate_str(_valid: Str, value: Value) -> Result<(), StrErr> {
    match value {
        Value::Str(_value) => Ok(()),
        Value::Absent => Ok(()),
        _ => Err(StrErr),
    }
}

fn validate_str_exact(valid: StrExact, value: Value) -> Result<(), StrExactErr> {
    match value {
        Value::Str(str_value) => if str_value == valid.0 { Ok(()) } else { Err(StrExactErr) }
        _ => Ok(()),
    }
}

fn validate_str_exact_len(valid: StrExactLen, value: Value) -> Result<(), StrExactLenErr> {
    match value {
        Value::Str(str_value) => if str_value.chars().count() as u32 == valid.0 { Ok(()) } else { Err(StrExactLenErr) }
        _ => Ok(()),
    }
}

fn validate_str_min_len(valid: StrMinLen, value: Value) -> Result<(), StrMinLenErr> {
    match value {
        Value::Str(str_value) => if str_value.chars().count() as u32 >= valid.0 { Ok(()) } else { Err(StrMinLenErr) }
        _ => Ok(()),
    }
}

fn validate_str_max_len(valid: StrMaxLen, value: Value) -> Result<(), StrMaxLenErr> {
    match value {
        Value::Str(str_value) => if str_value.chars().count() as u32 <= valid.0 { Ok(()) } else { Err(StrMaxLenErr) }
        _ => Ok(()),
    }
}

fn str_min_upper_valid(valid: StrMinUpper, value: Value) -> Result<(), StrMinUpperErr> {
    match value {
        Value::Str(str_value) => {
            if str_value.chars().filter(|c| c.is_alphabetic() && c.is_uppercase()).count() as u32 >= valid.0 {
                Ok(())
            } else {
                Err(StrMinUpperErr)
            }
        }
        _ => Ok(()),
    }
}

fn str_min_lower_valid(valid: StrMinLower, value: Value) -> Result<(), StrMinLowerErr> {
    match value {
        Value::Str(str_value) => {
            if str_value.chars().filter(|c| c.is_alphabetic() && c.is_lowercase()).count() as u32 >= valid.0 {
                Ok(())
            } else {
                Err(StrMinLowerErr)
            }
        }
        _ => Ok(()),
    }
}

fn str_min_num_valid(valid: StrMinNum, value: Value) -> Result<(), StrMinNumErr> {
    match value {
        Value::Str(str_value) => {
            if str_value.chars().filter(|c| c.is_ascii_digit()).count() as u32 >= valid.0 {
                Ok(())
            } else {
                Err(StrMinNumErr)
            }
        }
        _ => Ok(()),
    }
}

fn str_min_special_valid(valid: StrMinSpecial, value: Value) -> Result<(), StrMinSpecialErr> {
    match value {
        Value::Str(str_value) => {
            if str_value.chars().filter(|c| c.is_ascii_punctuation()).count() as u32 >= valid.0 {
                Ok(())
            } else {
                Err(StrMinSpecialErr)
            }
        }
        _ => Ok(()),
    }
}

fn dt_valid(valid: Dt, value: Value) -> Result<(), DtErr> {
    match value {
        Value::Str(str_value) => {
            let parts: Vec<&str> = str_value.split('-').collect();
            if parts.len() != 3 {
                return Err(DtErr);
            }
            if parts[0].len() != 2 || parts[1].len() != 2 || parts[2].len() != 4 {
                return Err(DtErr);
            }
            if !parts.iter().all(|part| part.chars().all(|c| c.is_digit(10))) {
                return Err(DtErr);
            }
            let _yyyy = parts[0].parse::<u32>().map_err(|_| DtErr)?;
            let _mm = parts[1].parse::<u32>().map_err(|_| DtErr)?;
            let _dd = parts[2].parse::<u32>().map_err(|_| DtErr)?;
            return Err(DtErr);
        }
        _ => Ok(()),
    }
}

fn dt_exact_valid(valid: DtExact, value: Value) -> Result<(), DtExactErr> {
    match value {
        Value::Str(str_value) => if str_value == valid.0 { Ok(()) } else { Err(DtExactErr) } 
        _ => Ok(()),
    }
}

fn dt_min_valid(valid: DtMin, value: Value) -> Result<(), DtMinErr> {
    match value {
        Value::Str(str_value) => {
            let valid_parts: Vec<&str> = valid.0.split('-').collect();
            let valid_yyyy = valid_parts[0].parse::<u32>().map_err(|_| DtMinErr)?;
            let valid_mm = valid_parts[1].parse::<u32>().map_err(|_| DtMinErr)?;
            let valid_dd = valid_parts[2].parse::<u32>().map_err(|_| DtMinErr)?;

            let value_parts: Vec<&str> = str_value.split('-').collect();
            let value_yyyy = value_parts[0].parse::<u32>().map_err(|_| DtMinErr)?;
            let value_mm = value_parts[1].parse::<u32>().map_err(|_| DtMinErr)?;
            let value_dd = value_parts[2].parse::<u32>().map_err(|_| DtMinErr)?;

            if value_yyyy < valid_yyyy {
                return Err(DtMinErr);
            }
            if value_yyyy == valid_yyyy && value_mm < valid_mm {
                return Err(DtMinErr);
            }
            if value_yyyy == valid_yyyy && value_mm == valid_mm && value_dd < valid_dd {
                return Err(DtMinErr);
            }
            Ok(())
        }
        _ => Ok(()),
    }
}

fn dt_max_valid(valid: DtMax, value: Value) -> Result<(), DtMaxErr> {
    match value {
        Value::Str(str_value) => {
            let valid_parts: Vec<&str> = valid.0.split('-').collect();
            let valid_yyyy = valid_parts[0].parse::<u32>().map_err(|_| DtMaxErr)?;
            let valid_mm = valid_parts[1].parse::<u32>().map_err(|_| DtMaxErr)?;
            let valid_dd = valid_parts[2].parse::<u32>().map_err(|_| DtMaxErr)?;

            let value_parts: Vec<&str> = str_value.split('-').collect();
            let value_yyyy = value_parts[0].parse::<u32>().map_err(|_| DtMaxErr)?;
            let value_mm = value_parts[1].parse::<u32>().map_err(|_| DtMaxErr)?;
            let value_dd = value_parts[2].parse::<u32>().map_err(|_| DtMaxErr)?;

            if value_yyyy > valid_yyyy {
                return Err(DtMaxErr);
            }
            if value_yyyy == valid_yyyy && value_mm > valid_mm {
                return Err(DtMaxErr);
            }
            if value_yyyy == valid_yyyy && value_mm == valid_mm && value_dd > valid_dd {
                return Err(DtMaxErr);
            }
            Ok(())
        }
        _ => Ok(()),
    }
}

fn email_valid(valid: Email, value: Value) -> Result<(), EmailErr> {
    match value {
        Value::Str(str_value) => {
            if str_value.chars().any(|c| c.is_whitespace()) {
                return Err(EmailErr);
            }
            let parts: Vec<&str> = str_value.split('@').collect();
            if parts.len() != 2 {
                return Err(EmailErr);
            }
            let local_part = parts[0];
            let domain_part = parts[1];
            if local_part.is_empty() || domain_part.is_empty() {
                return Err(EmailErr);
            }
            let domain_parts: Vec<&str> = domain_part.split('.').collect();
            if domain_parts.len() < 2 || domain_parts.iter().any(|part| part.is_empty()) {
                return Err(EmailErr);
            }
            Ok(())
        }
        _ => Ok(()),
    }
}
    
#[cfg(test)]
mod test {
    use super::*;
    use std::collections::HashMap;

    #[test]
    fn test_validate_required_ok() {
        let arr = vec![Value::NumI(-1), Value::NumI(2)];
        let obj = HashMap::from([(String::from("age"), Value::NumI(42))]);
        assert_eq!(validate_required(Required, Value::Bool(false)), Ok(()));
        assert_eq!(validate_required(Required, Value::NumI(-42)), Ok(()));
        assert_eq!(validate_required(Required, Value::NumU(42)), Ok(()));
        assert_eq!(validate_required(Required, Value::NumF(24.5)), Ok(()));
        assert_eq!(validate_required(Required, Value::Str(String::from("hello"))), Ok(()));
        assert_eq!(validate_required(Required, Value::Arr(arr)), Ok(()));
        assert_eq!(validate_required(Required, Value::Obj(obj)), Ok(()));
    }

    #[test]
    fn test_validate_num_i_ok() {
        assert_eq!(validate_num_i(NumI, Value::Absent), Ok(()));
        assert_eq!(validate_num_i(NumI, Value::NumI(42)), Ok(()));
        assert_eq!(validate_num_i(NumI, Value::NumI(-42)), Ok(()));
    }

    #[test]
    fn test_validate_num_i_exact_ok() {
        assert_eq!(validate_num_i_exact(NumIExact(42), Value::Absent), Ok(()));
        assert_eq!(validate_num_i_exact(NumIExact(-42), Value::NumI(-42)), Ok(()));
    }

    #[test]
    fn test_validate_num_i_min_ok() {
        assert_eq!(validate_num_i_min(NumIMin(-42), Value::Absent), Ok(()));
        assert_eq!(validate_num_i_min(NumIMin(-42), Value::NumI(-42)), Ok(()));
        assert_eq!(validate_num_i_min(NumIMin(-42), Value::NumI(-41)), Ok(()));
        assert_eq!(validate_num_i_min(NumIMin(-42), Value::NumI(22)), Ok(()));
    }

    #[test]
    fn test_validate_num_i_max_ok() {
        assert_eq!(validate_num_i_max(NumIMax(22), Value::Absent), Ok(()));
        assert_eq!(validate_num_i_max(NumIMax(22), Value::NumI(22)), Ok(()));
        assert_eq!(validate_num_i_max(NumIMax(22), Value::NumI(21)), Ok(()));
        assert_eq!(validate_num_i_max(NumIMax(22), Value::NumI(-1943)), Ok(()));
    }

    #[test]
    fn test_validate_num_u_ok() {
        assert_eq!(validate_num_u(NumU, Value::Absent), Ok(()));
        assert_eq!(validate_num_u(NumU, Value::NumU(42)), Ok(()));
    }

    #[test]
    fn test_validate_num_u_exact_ok() {
        assert_eq!(validate_num_u_exact(NumUExact(42), Value::Absent), Ok(()));
        assert_eq!(validate_num_u_exact(NumUExact(42), Value::NumU(42)), Ok(()));
    }

    #[test]
    fn test_validate_num_u_min_ok() {
        assert_eq!(validate_num_u_min(NumUMin(42), Value::Absent), Ok(()));
        assert_eq!(validate_num_u_min(NumUMin(42), Value::NumU(42)), Ok(()));
        assert_eq!(validate_num_u_min(NumUMin(42), Value::NumU(43)), Ok(()));
        assert_eq!(validate_num_u_min(NumUMin(42), Value::NumU(100)), Ok(()));
    }

    #[test]
    fn test_validate_num_u_max_ok() {
        assert_eq!(validate_num_u_max(NumUMax(22), Value::Absent), Ok(()));
        assert_eq!(validate_num_u_max(NumUMax(22), Value::NumU(22)), Ok(()));
        assert_eq!(validate_num_u_max(NumUMax(22), Value::NumU(21)), Ok(()));
        assert_eq!(validate_num_u_max(NumUMax(22), Value::NumU(0)), Ok(()));
    }

    #[test]
    fn test_validate_num_f_ok() {
        assert_eq!(validate_num_f(NumF, Value::Absent), Ok(()));
        assert_eq!(validate_num_f(NumF, Value::NumF(42.0)), Ok(()));
        assert_eq!(validate_num_f(NumF, Value::NumF(-42.0)), Ok(()));
    }

    #[test]
    fn test_validate_num_f_exact_ok() {
        assert_eq!(validate_num_f_exact(NumFExact(-42.0), Value::Absent), Ok(()));
        assert_eq!(validate_num_f_exact(NumFExact(-42.5), Value::NumF(-42.5)), Ok(()));
    }

    #[test]
    fn test_validate_num_f_min_ok() {
        assert_eq!(validate_num_f_min(NumFMin(-42.0), Value::Absent), Ok(()));
        assert_eq!(validate_num_f_min(NumFMin(-42.0), Value::NumF(-42.0)), Ok(()));
        assert_eq!(validate_num_f_min(NumFMin(-42.0), Value::NumF(-41.5)), Ok(()));
        assert_eq!(validate_num_f_min(NumFMin(-42.0), Value::NumF(-41.0)), Ok(()));
        assert_eq!(validate_num_f_min(NumFMin(-42.0), Value::NumF(22.0)), Ok(()));
    }

    #[test]
    fn test_validate_num_f_max_ok() {
        assert_eq!(validate_num_f_max(NumFMax(22.0), Value::Absent), Ok(()));
        assert_eq!(validate_num_f_max(NumFMax(22.0), Value::NumF(22.0)), Ok(()));
        assert_eq!(validate_num_f_max(NumFMax(22.0), Value::NumF(21.5)), Ok(()));
        assert_eq!(validate_num_f_max(NumFMax(22.0), Value::NumF(21.0)), Ok(()));
        assert_eq!(validate_num_f_max(NumFMax(22.0), Value::NumF(-1943.0)), Ok(()));
    }

    #[test]
    fn test_validate_str_ok() {
        assert_eq!(validate_str(Str, Value::Absent), Ok(()));
        assert_eq!(validate_str(Str, Value::Str(String::from("42"))), Ok(()));
    }

    #[test]
    fn test_validate_str_exact_ok() {
        assert_eq!(validate_str_exact(StrExact(String::from("Aqui")), Value::Absent), Ok(()));
        assert_eq!(validate_str_exact(StrExact(String::from("Aqui")), Value::Str(String::from("Aqui"))), Ok(()));
    }

    #[test]
    fn test_validate_str_exact_len_ok() {
        assert_eq!(validate_str_exact_len(StrExactLen(10), Value::Absent), Ok(()));
        assert_eq!(validate_str_exact_len(StrExactLen(10), Value::Str(String::from("acontecerá"))), Ok(()));
    }

    #[test]
    fn test_validate_str_min_len_ok() {
        assert_eq!(validate_str_min_len(StrMinLen(10), Value::Absent), Ok(()));
        assert_eq!(validate_str_min_len(StrMinLen(10), Value::Str(String::from("acontecerá"))), Ok(()));
        assert_eq!(validate_str_min_len(StrMinLen(10), Value::Str(String::from("aconteceria"))), Ok(()));
        assert_eq!(validate_str_min_len(StrMinLen(10), Value::Str(String::from("acontecería-mos"))), Ok(()));
    }

    #[test]
    fn test_validate_str_max_len_ok() {
        assert_eq!(validate_str_max_len(StrMaxLen(10), Value::Absent), Ok(()));
        assert_eq!(validate_str_max_len(StrMaxLen(10), Value::Str(String::from("acontecerá"))), Ok(()));
        assert_eq!(validate_str_max_len(StrMaxLen(10), Value::Str(String::from("acontecer"))), Ok(()));
        assert_eq!(validate_str_max_len(StrMaxLen(10), Value::Str(String::from("acontece"))), Ok(()));
    }

    #[test]
    fn test_str_min_upper_valid_ok() {

    }

    #[test]
    fn test_str_min_lower_valid_ok() {

    }

    #[test]
    fn test_str_min_num_valid_ok() {

    }

    #[test]
    fn test_str_min_special_valid_ok() {

    }

    #[test]
    fn test_dt_valid_ok() {

    }

    #[test]
    fn test_dt_exact_valid_ok() {

    }

    #[test]
    fn test_dt_min_valid_ok() {

    }

    #[test]
    fn test_dt_max_valid_ok() {

    }

    #[test]
    fn test_email_valid_ok() {

    }

    #[test]
    fn test_reqd_valid_err() {
        assert_eq!(validate_required(Required, Value::Absent), Err(RequiredErr));
    }

    #[test]
    fn test_num_i_valid_err() {
        let string = String::from("hello");
        let arr = vec![Value::NumI(-1), Value::NumI(2)];
        let obj = HashMap::from([(String::from("age"), Value::NumI(42))]);

        assert_eq!(validate_num_i(NumI, Value::Bool(false)), Err(NumIErr));
        assert_eq!(validate_num_i(NumI, Value::NumF(24.5)), Err(NumIErr));
        assert_eq!(validate_num_i(NumI, Value::Str(string)), Err(NumIErr));
        assert_eq!(validate_num_i(NumI, Value::Arr(arr)), Err(NumIErr));
        assert_eq!(validate_num_i(NumI, Value::Obj(obj)), Err(NumIErr));
    }

    #[test]
    fn test_num_i_exact_valid_err() {

    }

    #[test]
    fn test_num_i_min_valid_err() {
        assert_eq!(validate_num_i_min(NumIMin(-10), Value::NumI(-11)), Err(NumIMinErr));
        assert_eq!(validate_num_i_min(NumIMin(-10), Value::NumI(-12)), Err(NumIMinErr));
    }

    #[test]
    fn test_num_i_max_valid_err() {
        assert_eq!(validate_num_i_max(NumIMax(10), Value::NumI(11)), Err(NumIMaxErr));
        assert_eq!(validate_num_i_max(NumIMax(10), Value::NumI(12)), Err(NumIMaxErr));
    }

    #[test]
    fn test_num_u_valid_err() {

    }

    #[test]
    fn test_num_u_exact_valid_err() {

    }

    #[test]
    fn test_num_u_min_valid_err() {

    }

    #[test]
    fn test_validate_num_u_max_err() {

    }

    #[test]
    fn test_validate_num_f_err() {

    }

    #[test]
    fn test_validate_num_f_exact_err() {

    }

    #[test]
    fn test_validate_num_f_min_err() {

    }

    #[test]
    fn test_validate_num_f_max_err() {

    }

    #[test]
    fn test_validate_str_err() {

    }

    #[test]
    fn test_validate_str_exact_err() {

    }

    #[test]
    fn test_validate_str_exact_len_err() {

    }

    #[test]
    fn test_validate_str_min_len_err() {

    }

    #[test]
    fn test_validate_str_max_len_err() {

    }

    #[test]
    fn test_str_min_upper_valid_err() {

    }

    #[test]
    fn test_str_min_lower_valid_err() {

    }

    #[test]
    fn test_str_min_num_valid_err() {

    }

    #[test]
    fn test_str_min_special_valid_err() {

    }

    #[test]
    fn test_dt_valid_err() {

    }

    #[test]
    fn test_dt_exact_valid_err() {

    }

    #[test]
    fn test_dt_min_valid_err() {

    }

    #[test]
    fn test_dt_max_valid_err() {

    }

    #[test]
    fn test_email_valid_err() {

    }
}
