use std::collections::HashMap;

pub struct Reqd;

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
pub struct ReqdErr;

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

pub enum Valid {
    Reqd(Reqd),
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

pub type Schema<'a> = HashMap<&'a str, Vec<Valid>>;

fn reqd_valid(_v: Reqd, value: Value) -> Result<(), ReqdErr> {
    match value {
        Value::Absent => Err(ReqdErr),
        _ => Ok(()),
    }
}

fn num_i_valid(_valid: NumI, value: Value) -> Result<(), NumIErr> {
    match value {
        Value::NumI(_num_i) => Ok(()),
        Value::Absent => Ok(()),
        _ => Err(NumIErr),
    }
}

fn num_i_exact_valid(valid: NumIExact, value: Value) -> Result<(), NumIExactErr> {
    match value {
        Value::NumI(num_i) => if num_i == valid.0 { Ok(()) } else { Err(NumIExactErr) }
        _ => Ok(()),
    }
}

fn num_i_min_valid(valid: NumIMin, value: Value) -> Result<(), NumIMinErr> {
    match value {
        Value::NumI(num_i) => if num_i >= valid.0 { Ok(()) } else { Err(NumIMinErr) }
        _ => Ok(()),
    }
}

fn num_i_max_valid(valid: NumIMax, value: Value) -> Result<(), NumIMaxErr> {
    match value {
        Value::NumI(num_i) => if num_i <= valid.0 { Ok(()) } else { Err(NumIMaxErr) }
        _ => Ok(()),
    }
}

fn num_u_valid(_valid: NumU, value: Value) -> Result<(), NumUErr> {
    match value {
        Value::NumU(_num_u) => Ok(()),
        Value::Absent => Ok(()),
        _ => Err(NumUErr),
    }
}

fn num_u_exact_valid(valid: NumUExact, value: Value) -> Result<(), NumUExactErr> {
    match value {
        Value::NumU(num_u) => if num_u == valid.0 { Ok(()) } else { Err(NumUExactErr) }
        _ => Ok(()),
    }
}

fn num_u_min_valid(valid: NumUMin, value: Value) -> Result<(), NumUMinErr> {
    match value {
        Value::NumU(num_u) => if num_u >= valid.0 { Ok(()) } else { Err(NumUMinErr) }
        _ => Ok(()),
    }
}

fn num_u_max_valid(valid: NumUMax, value: Value) -> Result<(), NumUMaxErr> {
    match value {
        Value::NumU(num_u) => if num_u <= valid.0 { Ok(()) } else { Err(NumUMaxErr) }
        _ => Ok(()),
    }
}

fn num_f_valid(_valid: NumF, value: Value) -> Result<(), NumFErr> {
    match value {
        Value::NumF(_value) => Ok(()),
        Value::Absent => Ok(()),
        _ => Err(NumFErr),
    }
}

fn num_f_exact_valid(valid: NumFExact, value: Value) -> Result<(), NumFExactErr> {
    match value {
        Value::NumF(num_f) => if num_f == valid.0 { Ok(()) } else { Err(NumFExactErr) }
        _ => Ok(()),
    }
}

fn num_f_min_valid(valid: NumFMin, value: Value) -> Result<(), NumFMinErr> {
    match value {
        Value::NumF(num_f) => if num_f >= valid.0 { Ok(()) } else { Err(NumFMinErr) }
        _ => Ok(()),
    }
}

fn num_f_max_valid(valid: NumFMax, value: Value) -> Result<(), NumFMaxErr> {
    match value {
        Value::NumF(num_f) => if num_f <= valid.0 { Ok(()) } else { Err(NumFMaxErr) }
        _ => Ok(()),
    }
}

fn str_valid(_valid: Str, value: Value) -> Result<(), StrErr> {
    match value {
        Value::Str(_value) => Ok(()),
        Value::Absent => Ok(()),
        _ => Err(StrErr),
    }
}

fn str_exact_valid(valid: StrExact, value: Value) -> Result<(), StrExactErr> {
    match value {
        Value::Str(str_value) => if str_value == valid.0 { Ok(()) } else { Err(StrExactErr) }
        _ => Ok(()),
    }
}

fn str_exact_len_valid(valid: StrExactLen, value: Value) -> Result<(), StrExactLenErr> {
    match value {
        Value::Str(str_value) => if str_value.chars().count() as u32 == valid.0 { Ok(()) } else { Err(StrExactLenErr) }
        _ => Ok(()),
    }
}

fn str_min_len_valid(valid: StrMinLen, value: Value) -> Result<(), StrMinLenErr> {
    match value {
        Value::Str(str_value) => if str_value.chars().count() as u32 >= valid.0 { Ok(()) } else { Err(StrMinLenErr) }
        _ => Ok(()),
    }
}

fn str_max_len_valid(valid: StrMaxLen, value: Value) -> Result<(), StrMaxLenErr> {
    match value {
        Value::Str(str_value) => if str_value.chars().count() as u32 <= valid.0 { Ok(()) } else { Err(StrMaxLenErr) }
        _ => Ok(()),
    }
}

/*
// TODO
fn str_min_upper_valid(valid: StrMinUpper, value: Value) -> Result<(), StrMinUpperErr> {
    match value {
        Value::Str(str_value) => {
            if str_value.chars().count() as u64 <= v.0 {
                Ok(())
            } else {
                Err(StrMinUpperErr)
            }
        }
        _ => Ok(()),
    }
}

// TODO
fn str_min_lower_valid(valid: StrMinLower, value: Value) -> Result<(), StrMinLowerErr> {
    match value {
        Value::Str(str_value) => {
            if str_value.chars().count() as u64 <= v.0 {
                Ok(())
            } else {
                Err(StrMinLowerErr)
            }
        }
        _ => Ok(()),
    }
}

// TODO
fn str_min_num_valid(valid: StrMinNum, value: Value) -> Result<(), StrMinNumErr> {
    match value {
        Value::Str(str_value) => {
            if str_value.chars().count() as u64 <= v.0 {
                Ok(())
            } else {
                Err(StrMinNumErr)
            }
        }
        _ => Ok(()),
    }
}

// TODO
fn str_min_special_valid(valid: StrMinSpecial, value: Value) -> Result<(), StrMinSpecialErr> {
    match value {
        Value::Str(str_value) => {
            if str_value.chars().count() as u64 <= v.0 {
                Ok(())
            } else {
                Err(StrMinSpecialErr)
            }
        }
        _ => Ok(()),
    }
}

// TODO
fn dt_valid(valid: Dt, value: Value) -> Result<(), DtErr> {
    match value {
        Value::Str(str_value) => {
            if str_value.chars().count() as u64 <= v.0 {
                Ok(())
            } else {
                Err(DtErr)
            }
        }
        _ => Ok(()),
    }
}

// TODO
fn dt_exact_valid(valid: DtExact, value: Value) -> Result<(), DtExactErr> {
    match value {
        Value::Str(str_value) => {
            if str_value.chars().count() as u64 <= v.0 {
                Ok(())
            } else {
                Err(DtExactErr)
            }
        }
        _ => Ok(()),
    }
}

// TODO
fn dt_min_valid(valid: DtMin, value: Value) -> Result<(), DtMinErr> {
    match value {
        Value::Str(str_value) => {
            if str_value.chars().count() as u64 <= v.0 {
                Ok(())
            } else {
                Err(DtMinErr)
            }
        }
        _ => Ok(()),
    }
}

// TODO
fn dt_max_valid(valid: DtMax, value: Value) -> Result<(), DtMaxErr> {
    match value {
        Value::Str(str_value) => {
            if str_value.chars().count() as u64 <= v.0 {
                Ok(())
            } else {
                Err(DtMaxErr)
            }
        }
        _ => Ok(()),
    }
}

// TODO
fn email_valid(valid: Email, value: Value) -> Result<(), EmailErr> {
    match value {
        Value::Str(str_value) => {
            str_value.chars().find
            if str_value.chars().count() as u64 <= v.0 {
                Ok(())
            } else {
                Err(EmailErr)
            }
        }
        _ => Ok(()),
    }
}
*/

#[cfg(test)]
mod test {
    use super::*;
    use std::collections::HashMap;


    
    #[test]
    fn test_reqd_valid_ok() {
        let string = String::from("hello");
        let arr = vec![Value::NumI(-1), Value::NumI(2)];
        let obj = HashMap::from([(String::from("age"), Value::NumI(42))]);
        assert_eq!(reqd_valid(Reqd, Value::Bool(false)), Ok(()));
        assert_eq!(reqd_valid(Reqd, Value::NumI(-42)), Ok(()));
        assert_eq!(reqd_valid(Reqd, Value::NumU(42)), Ok(()));
        assert_eq!(reqd_valid(Reqd, Value::NumF(24.5)), Ok(()));
        assert_eq!(reqd_valid(Reqd, Value::Str(string)), Ok(()));
        assert_eq!(reqd_valid(Reqd, Value::Arr(arr)), Ok(()));
        assert_eq!(reqd_valid(Reqd, Value::Obj(obj)), Ok(()));
    }

    #[test]
    fn test_num_i_valid_ok() {
        assert_eq!(num_i_valid(NumI, Value::Absent), Ok(()));
        assert_eq!(num_i_valid(NumI, Value::NumI(42)), Ok(()));
        assert_eq!(num_i_valid(NumI, Value::NumI(-42)), Ok(()));
    }

    #[test]
    fn test_num_i_exact_valid_ok() {

    }

    #[test]
    fn test_num_i_min_valid_ok() {
        let string = String::from("hello");
        let arr = vec![Value::NumI(-1), Value::NumI(2)];
        let obj = HashMap::from([(String::from("age"), Value::NumI(42))]);

        assert_eq!(num_i_min_valid(NumIMin(-10), Value::Absent), Ok(()));
        assert_eq!(num_i_min_valid(NumIMin(-10), Value::Bool(false)), Ok(()));
        assert_eq!(num_i_min_valid(NumIMin(-10), Value::NumF(24.5)), Ok(()));
        assert_eq!(num_i_min_valid(NumIMin(-10), Value::Str(string)), Ok(()));
        assert_eq!(num_i_min_valid(NumIMin(-10), Value::Arr(arr)), Ok(()));
        assert_eq!(num_i_min_valid(NumIMin(-10), Value::Obj(obj)), Ok(()));

        assert_eq!(num_i_min_valid(NumIMin(-10), Value::NumI(-10)), Ok(()));
        assert_eq!(num_i_min_valid(NumIMin(-10), Value::NumI(0)), Ok(()));
        assert_eq!(num_i_min_valid(NumIMin(-10), Value::NumI(1)), Ok(()));
        assert_eq!(num_i_min_valid(NumIMin(-10), Value::NumI(10)), Ok(()));
    }

    #[test]
    fn test_num_i_max_valid_ok() {
        let string = String::from("hello");
        let arr = vec![Value::NumI(-1), Value::NumI(2)];
        let obj = HashMap::from([(String::from("age"), Value::NumI(42))]);

        assert_eq!(num_i_max_valid(NumIMax(10), Value::Absent), Ok(()));
        assert_eq!(num_i_max_valid(NumIMax(10), Value::Bool(false)), Ok(()));
        assert_eq!(num_i_max_valid(NumIMax(10), Value::NumF(24.5)), Ok(()));
        assert_eq!(num_i_max_valid(NumIMax(10), Value::Str(string)), Ok(()));
        assert_eq!(num_i_max_valid(NumIMax(10), Value::Arr(arr)), Ok(()));
        assert_eq!(num_i_max_valid(NumIMax(10), Value::Obj(obj)), Ok(()));

        assert_eq!(num_i_max_valid(NumIMax(10), Value::NumI(-10)), Ok(()));
        assert_eq!(num_i_max_valid(NumIMax(10), Value::NumI(0)), Ok(()));
        assert_eq!(num_i_max_valid(NumIMax(10), Value::NumI(1)), Ok(()));
        assert_eq!(num_i_max_valid(NumIMax(10), Value::NumI(10)), Ok(()));
    }

    #[test]
    fn test_num_u_valid_ok() {

    }

    #[test]
    fn test_num_u_exact_valid_ok() {

    }

    #[test]
    fn test_num_u_min_valid_ok() {

    }

    #[test]
    fn test_num_u_max_valid_ok() {

    }

    #[test]
    fn test_num_f_valid_ok() {

    }

    #[test]
    fn test_num_f_exact_valid_ok() {

    }

    #[test]
    fn test_num_f_min_valid_ok() {

    }

    #[test]
    fn test_num_f_max_valid_ok() {

    }

    #[test]
    fn test_str_valid_ok() {

    }

    #[test]
    fn test_str_exact_valid_ok() {

    }

    #[test]
    fn test_str_exact_len_valid_ok() {

    }

    #[test]
    fn test_str_min_len_valid_ok() {

    }

    #[test]
    fn test_str_max_len_valid_ok() {

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







    fn test_reqd_valid_err() {
        assert_eq!(reqd_valid(Reqd, Value::Absent), Err(ReqdErr));
    }

    fn test_num_i_valid_err() {
        let string = String::from("hello");
        let arr = vec![Value::NumI(-1), Value::NumI(2)];
        let obj = HashMap::from([(String::from("age"), Value::NumI(42))]);

        assert_eq!(num_i_valid(NumI, Value::Bool(false)), Err(NumIErr));
        assert_eq!(num_i_valid(NumI, Value::NumF(24.5)), Err(NumIErr));
        assert_eq!(num_i_valid(NumI, Value::Str(string)), Err(NumIErr));
        assert_eq!(num_i_valid(NumI, Value::Arr(arr)), Err(NumIErr));
        assert_eq!(num_i_valid(NumI, Value::Obj(obj)), Err(NumIErr));
    }

    fn test_num_i_exact_valid_err() {

    }

    fn test_num_i_min_valid_err() {
        assert_eq!(num_i_min_valid(NumIMin(-10), Value::NumI(-11)), Err(NumIMinErr));
        assert_eq!(num_i_min_valid(NumIMin(-10), Value::NumI(-12)), Err(NumIMinErr));
    }

    fn test_num_i_max_valid_err() {
        assert_eq!(num_i_max_valid(NumIMax(10), Value::NumI(11)), Err(NumIMaxErr));
        assert_eq!(num_i_max_valid(NumIMax(10), Value::NumI(12)), Err(NumIMaxErr));
    }

    fn test_num_u_valid_err() {

    }

    fn test_num_u_exact_valid_err() {

    }

    fn test_num_u_min_valid_err() {

    }

    fn test_num_u_max_valid_err() {

    }

    fn test_num_f_valid_err() {

    }

    fn test_num_f_exact_valid_err() {

    }

    fn test_num_f_min_valid_err() {

    }

    fn test_num_f_max_valid_err() {

    }

    fn test_str_valid_err() {

    }

    fn test_str_exact_valid_err() {

    }

    fn test_str_exact_len_valid_err() {

    }

    fn test_str_min_len_valid_err() {

    }

    fn test_str_max_len_valid_err() {

    }

    fn test_str_min_upper_valid_err() {

    }

    fn test_str_min_lower_valid_err() {

    }

    fn test_str_min_num_valid_err() {

    }

    fn test_str_min_special_valid_err() {

    }

    fn test_dt_valid_err() {

    }

    fn test_dt_exact_valid_err() {

    }

    fn test_dt_min_valid_err() {

    }

    fn test_dt_max_valid_err() {

    }

    fn test_email_valid_err() {

    }
}
