use std::sync::LazyLock;

use email_address::EmailAddress;
use regex::Regex;

use crate::{domain::validation::*, infra::validation::Field};

#[derive(Debug, PartialEq)]
struct InternalDT(pub u32, pub u8, pub u8);

#[derive(Debug, PartialEq)]
struct InternalTM(pub u8, pub u8);

#[derive(Debug, PartialEq)]
struct InternalISO(pub u32, pub u16, pub u16, pub u8, pub u8);

static DT_RE: LazyLock<Regex> =
    LazyLock::new(|| Regex::new(r"([0-9]{4})-([0-9]{2})-([0-9]{2})").unwrap());

static TM_RE: LazyLock<Regex> = LazyLock::new(|| Regex::new(r"([0-9]{2}):([0-9]{2})").unwrap());

static ISO_DATE_RE: LazyLock<Regex> = LazyLock::new(|| {
    Regex::new(r"^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2})Z$").unwrap()
});

fn parse_dt(s: &String) -> Result<InternalDT, ()> {
    if let Some(caps) = DT_RE.captures(s) {
        let c: (&str, [&str; 3]) = caps.extract();
        let yyyy = c.1[0].parse::<u32>().map_err(|_| ())?;
        let mm = c.1[1].parse::<u8>().map_err(|_| ())?;
        let dd = c.1[2].parse::<u8>().map_err(|_| ())?;
        return Ok(InternalDT(yyyy, mm, dd));
    } else {
        return Err(());
    }
}

fn parse_tm(s: &String) -> Result<InternalTM, ()> {
    if let Some(caps) = TM_RE.captures(s) {
        let c: (&str, [&str; 2]) = caps.extract();
        let h = c.1[0].parse::<u8>().map_err(|_| ())?;
        let m = c.1[1].parse::<u8>().map_err(|_| ())?;
        return Ok(InternalTM(h, m));
    } else {
        return Err(());
    }
}

fn parse_iso(s: &String) -> Result<InternalISO, ()> {
    if let Some(caps) = ISO_DATE_RE.captures(s) {
        let c: (&str, [&str; 5]) = caps.extract();
        let yyyy = c.1[0].parse::<u32>().map_err(|_| ())?;
        let mm = c.1[1].parse::<u16>().map_err(|_| ())?;
        let dd = c.1[2].parse::<u16>().map_err(|_| ())?;
        let h = c.1[3].parse::<u8>().map_err(|_| ())?;
        let m = c.1[4].parse::<u8>().map_err(|_| ())?;
        return Ok(InternalISO(yyyy, mm, dd, h, m));
    } else {
        return Err(());
    }
}

pub fn required(f: &Field) -> Result<(), RequiredErr> {
    match f.value {
        Val::None => Err(RequiredErr(f.name)),
        _ => Ok(()),
    }
}

pub fn num_u(f: &Field) -> Result<(), NumUErr> {
    match f.value {
        Val::Num(num_u, num_i, num_f) => if num_u.is_some() { Ok(()) } else { Err(NumUErr(f.name)) },
        Val::None => {
            if f.has_required {
                Err(NumUErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(NumUErr(f.name)),
    }
}

pub fn num_i(f: &Field) -> Result<(), NumIErr> {
    match f.value {
        Val::Num(num_u, num_i, num_f) => if num_i.is_some() { Ok(()) } else { Err(NumIErr(f.name)) },
        Val::None => {
            if f.has_required {
                Err(NumIErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(NumIErr(f.name)),
    }
}

pub fn num_f(f: &Field) -> Result<(), NumFErr> {
    match f.value {
        Val::Num(num_u, num_i, num_f) => if num_f.is_some() { Ok(()) } else { Err(NumFErr(f.name)) },
        Val::None => {
            if f.has_required {
                Err(NumFErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(NumFErr(f.name)),
    }
}

pub fn str(f: &Field) -> Result<(), StrErr> {
    match &f.value {
        Val::Str(_value) => Ok(()),
        Val::None => {
            if f.has_required {
                Err(StrErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(StrErr(f.name)),
    }
}

pub fn bool(f: &Field) -> Result<(), BoolErr> {
    match f.value {
        Val::Bool(_value) => Ok(()),
        Val::None => {
            if f.has_required {
                Err(BoolErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(BoolErr(f.name)),
    }
}

pub fn num_u_exact(valid: u64, f: &Field) -> Result<(), NumUExactErr> {
    match f.value {
        Val::Num(num_u, num_i, num_f) =>{
            if num_u == Some(valid) {
                Ok(())
            } else {
                Err(NumUExactErr(f.name))
            }
        }
        Val::None => {
            if f.has_required {
                Err(NumUExactErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(NumUExactErr(f.name)),
    }
}

pub fn num_i_exact(valid: i64, f: &Field) -> Result<(), NumIExactErr> {
    match f.value {
        Val::Num(num_u, num_i, num_f) => {
            if num_i == Some(valid) {
                Ok(())
            } else {
                Err(NumIExactErr(f.name))
            }
        }
        Val::None => {
            if f.has_required {
                Err(NumIExactErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(NumIExactErr(f.name)),
    }
}

pub fn num_f_exact(valid: f64, f: &Field) -> Result<(), NumFExactErr> {
    match f.value {
        Val::Num(num_u, num_i, num_f) => {
            if num_f == Some(valid) {
                Ok(())
            } else {
                Err(NumFExactErr(f.name))
            }
        }
        Val::None => {
            if f.has_required {
                Err(NumFExactErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(NumFExactErr(f.name)),
    }
}

pub fn num_u_min(valid: u64, f: &Field) -> Result<(), NumUMinErr> {
    match f.value {
        Val::Num(num_u, num_i, num_f) => {
            if let Some(num_u) = num_u {
                if num_u >= valid {
                    return Ok(());
                }
            }
            Err(NumUMinErr(f.name))
        }
        Val::None => {
            if f.has_required {
                Err(NumUMinErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(NumUMinErr(f.name)),
    }
}

pub fn num_i_min(valid: i64, f: &Field) -> Result<(), NumIMinErr> {
    match f.value {
        Val::Num(num_u, num_i, num_f) => {
            if let Some(num_i) = num_i {
                if num_i >= valid {
                return Ok(())
                }
            }
             return   Err(NumIMinErr(f.name));
        }
        Val::None => {
            if f.has_required {
                Err(NumIMinErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(NumIMinErr(f.name)),
    }
}

pub fn num_f_min(valid: f64, f: &Field) -> Result<(), NumFMinErr> {
    match f.value {
        Val::Num(num_u, num_i, num_f) => {
            if let Some(num_f) = num_f {
                if num_f >= valid {
                    return Ok(());
                }
            }
           return   Err(NumFMinErr(f.name));
        }
        Val::None => {
            if f.has_required {
                Err(NumFMinErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(NumFMinErr(f.name)),
    }
}

pub fn num_u_max(valid: u64, f: &Field) -> Result<(), NumUMaxErr> {
    match f.value {
        Val::Num(num_u, num_i, num_f) => {
            if let Some(num_u) = num_u {
                if num_u <= valid {
                    return Ok(());
                }
            }
             return   Err(NumUMaxErr(f.name));
        }
        Val::None => {
            if f.has_required {
                Err(NumUMaxErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(NumUMaxErr(f.name)),
    }
}

pub fn num_i_max(valid: i64, f: &Field) -> Result<(), NumIMaxErr> {
    match f.value {
        Val::Num(num_u, num_i, num_f) => {
            if let Some(num_i) = num_i {
                if num_i <= valid {
                return Ok(());
                }
            }
            return Err(NumIMaxErr(f.name));
        }
        Val::None => {
            if f.has_required {
                Err(NumIMaxErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(NumIMaxErr(f.name)),
    }
}

pub fn num_f_max(valid: f64, f: &Field) -> Result<(), NumFMaxErr> {
    match f.value {
        Val::Num(num_u, num_i, num_f) => {
            if let Some(num_f) = num_f {
                if num_f <= valid {
                    return Ok(());
                }
            }
            Err(NumFMaxErr(f.name))
        }
        Val::None => {
            if f.has_required {
                Err(NumFMaxErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(NumFMaxErr(f.name)),
    }
}

pub fn str_exact(valid: &String, f: &Field) -> Result<(), StrExactErr> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value == valid {
                Ok(())
            } else {
                Err(StrExactErr(f.name))
            }
        }
        Val::None => {
            if f.has_required {
                Err(StrExactErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(StrExactErr(f.name)),
    }
}

pub fn str_exact_len(valid: u32, f: &Field) -> Result<(), StrExactLenErr> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value.chars().count() as u32 == valid {
                Ok(())
            } else {
                Err(StrExactLenErr(f.name))
            }
        }
        Val::None => {
            if f.has_required {
                Err(StrExactLenErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(StrExactLenErr(f.name)),
    }
}

pub fn str_min_len(valid: u32, f: &Field) -> Result<(), StrMinLenErr> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value.chars().count() as u32 >= valid {
                Ok(())
            } else {
                Err(StrMinLenErr(f.name))
            }
        }
        Val::None => {
            if f.has_required {
                Err(StrMinLenErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(StrMinLenErr(f.name)),
    }
}

pub fn str_max_len(valid: u32, f: &Field) -> Result<(), StrMaxLenErr> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value.chars().count() as u32 <= valid {
                Ok(())
            } else {
                Err(StrMaxLenErr(f.name))
            }
        }
        Val::None => {
            if f.has_required {
                Err(StrMaxLenErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(StrMaxLenErr(f.name)),
    }
}

pub fn str_min_upper(valid: u32, f: &Field) -> Result<(), StrMinUpperErr> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value.chars().filter(|c| c.is_alphabetic() && c.is_uppercase()).count() as u32
                >= valid
            {
                Ok(())
            } else {
                Err(StrMinUpperErr(f.name))
            }
        }
        Val::None => {
            if f.has_required {
                Err(StrMinUpperErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(StrMinUpperErr(f.name)),
    }
}

pub fn str_min_lower(valid: u32, f: &Field) -> Result<(), StrMinLowerErr> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value.chars().filter(|c| c.is_alphabetic() && c.is_lowercase()).count() as u32
                >= valid
            {
                Ok(())
            } else {
                Err(StrMinLowerErr(f.name))
            }
        }
        Val::None => {
            if f.has_required {
                Err(StrMinLowerErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(StrMinLowerErr(f.name)),
    }
}

pub fn str_min_num(valid: u32, f: &Field) -> Result<(), StrMinNumErr> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value.chars().filter(|c| c.is_ascii_digit()).count() as u32 >= valid {
                Ok(())
            } else {
                Err(StrMinNumErr(f.name))
            }
        }
        Val::None => {
            if f.has_required {
                Err(StrMinNumErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(StrMinNumErr(f.name)),
    }
}

pub fn str_min_special(valid: u32, f: &Field) -> Result<(), StrMinSpecialErr> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value.chars().filter(|c| c.is_ascii_punctuation()).count() as u32 >= valid {
                Ok(())
            } else {
                Err(StrMinSpecialErr(f.name))
            }
        }
        Val::None => {
            if f.has_required {
                Err(StrMinSpecialErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(StrMinSpecialErr(f.name)),
    }
}

pub fn dt(f: &Field) -> Result<(), DtErr> {
    match &f.value {
        Val::Str(str_value) => match parse_dt(str_value) {
            Err(_) => Err(DtErr(f.name)),
            Ok(_) => Ok(()),
        },
        Val::None => {
            if f.has_required {
                Err(DtErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(DtErr(f.name)),
    }
}

pub fn dt_min(valid: &String, f: &Field) -> Result<(), DtMinErr> {
    match &f.value {
        Val::Str(str_value) => {
            let valid_dt = parse_dt(valid).map_err(|_| DtMinErr(f.name))?;
            let value_dt = parse_dt(str_value).map_err(|_| DtMinErr(f.name))?;

            if value_dt.0 < valid_dt.0 {
                return Err(DtMinErr(f.name));
            }
            if value_dt.0 == valid_dt.0 && value_dt.1 < valid_dt.1 {
                return Err(DtMinErr(f.name));
            }
            if value_dt.0 == valid_dt.0 && value_dt.1 == valid_dt.1 && value_dt.2 < valid_dt.2 {
                return Err(DtMinErr(f.name));
            }
            Ok(())
        }
        Val::None => {
            if f.has_required {
                Err(DtMinErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(DtMinErr(f.name)),
    }
}

pub fn dt_max(valid: &String, f: &Field) -> Result<(), DtMaxErr> {
    match &f.value {
        Val::Str(str_value) => {
            let valid_dt = parse_dt(valid).map_err(|_| DtMaxErr(f.name))?;
            let value_dt = parse_dt(str_value).map_err(|_| DtMaxErr(f.name))?;

            if value_dt.0 > valid_dt.0 {
                return Err(DtMaxErr(f.name));
            }
            if value_dt.0 == valid_dt.0 && value_dt.1 > valid_dt.1 {
                return Err(DtMaxErr(f.name));
            }
            if value_dt.0 == valid_dt.0 && value_dt.1 == valid_dt.1 && value_dt.2 > valid_dt.2 {
                return Err(DtMaxErr(f.name));
            }
            Ok(())
        }
        Val::None => {
            if f.has_required {
                Err(DtMaxErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(DtMaxErr(f.name)),
    }
}

pub fn email(f: &Field) -> Result<(), EmailErr> {
    match &f.value {
        Val::Str(str_value) => {
            if EmailAddress::is_valid(str_value) {
                Ok(())
            } else {
                Err(EmailErr(f.name))
            }
        }
        Val::None => {
            if f.has_required {
                Err(EmailErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(EmailErr(f.name)),
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use std::collections::HashMap;

    fn f_num_u_stub() -> Field {
        Field::of(Val::Num(Some(42), None, None))
    }

    fn f_num_i_stub() -> Field {
        Field::of(Val::Num(None,Some(-42), None,))
    }

    fn f_num_f_stub() -> Field {
        Field::of(Val::Num(None, None, Some(24.5)))
    }

    fn f_str_stub() -> Field {
        Field::of(Val::Str(String::from("hello")))
    }

    fn f_bool_stub() -> Field {
        Field::of(Val::Bool(false))
    }

    fn f_arr_stub() -> Field {
        Field::of(Val::Arr(vec![Val::Num(None,Some(-1), None,), Val::Num(None,Some(2), None,)]))
    }

    fn f_obj_stub() -> Field {
        Field::of(Val::Obj(HashMap::from([(String::from("age"), Val::Num(None,Some(42), None,))])))
    }

    #[test]
    fn test_parse_dt() {
        assert_eq!(parse_dt(&String::from("2029-12-31")), Ok(InternalDT(2029, 12, 31)));
    }
    
    #[test]
    fn test_parse_tm() {
        assert_eq!(parse_tm(&String::from("06:11")), Ok(InternalTM(06, 11)));
    }
    
    #[test]
    fn test_parse_iso() {
        assert_eq!(parse_iso(&String::from("2029-12-31T06:11Z")), Ok(InternalISO(2029, 12, 31, 06, 11)));
    }

    #[test]
    fn test_num_exact_ok() {
        assert_eq!(num_u_exact(42, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_u_exact(42, &Field::of(Val::Num(Some(42), None, None))), Ok(()));
        assert_eq!(num_u_exact(22, &Field::of(Val::Num(Some(22), None, None))), Ok(()));
        assert_eq!(num_i_exact(42, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_i_exact(42, &Field::of(Val::Num(None,Some(42), None,))), Ok(()));
        assert_eq!(num_i_exact(-42, &Field::of(Val::Num(None,Some(-42), None,))), Ok(()));
        assert_eq!(num_f_exact(-42.0, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_f_exact(-42.5, &Field::of(Val::Num(None, None, Some(-42.5)))), Ok(()));
        assert_eq!(num_f_exact(42.5, &Field::of(Val::Num(None, None, Some(42.5)))), Ok(()));
    }

    #[test]
    fn test_num_exact_err() {
        assert_eq!(num_u_exact(10, &Field::of(Val::Num(Some(11), None, None))), Err(NumUExactErr("foo")));
        assert_eq!(num_u_exact(10, &Field::of(Val::Num(Some(9), None, None))), Err(NumUExactErr("foo")));
        assert_eq!(num_i_exact(-10, &Field::of(Val::Num(None,Some(-11), None,))), Err(NumIExactErr("foo")));
        assert_eq!(num_i_exact(-10, &Field::of(Val::Num(None,Some(-9), None,))), Err(NumIExactErr("foo")));
        assert_eq!(num_f_exact(-10.0, &Field::of(Val::Num(None, None, Some(-10.1)))), Err(NumFExactErr("foo")));
        assert_eq!(num_f_exact(-10.0, &Field::of(Val::Num(None, None, Some(-9.9)))), Err(NumFExactErr("foo")));
    }

    #[test]
    fn test_num_min_ok() {
        assert_eq!(num_u_min(42, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_u_min(42, &Field::of(Val::Num(Some(42), None, None))), Ok(()));
        assert_eq!(num_u_min(42, &Field::of(Val::Num(Some(43), None, None))), Ok(()));
        assert_eq!(num_u_min(42, &Field::of(Val::Num(Some(100), None, None))), Ok(()));
        assert_eq!(num_i_min(-42, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_i_min(-42, &Field::of(Val::Num(None,Some(-42), None,))), Ok(()));
        assert_eq!(num_i_min(-42, &Field::of(Val::Num(None,Some(-41),None, ))), Ok(()));
        assert_eq!(num_i_min(-42, &Field::of(Val::Num(None,Some(22), None,))), Ok(()));
        assert_eq!(num_f_min(-42.0, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_f_min(-42.0, &Field::of(Val::Num(None, None, Some(-42.0)))), Ok(()));
        assert_eq!(num_f_min(-42.0, &Field::of(Val::Num(None, None, Some(-41.9)))), Ok(()));
        assert_eq!(num_f_min(-42.0, &Field::of(Val::Num(None, None, Some(-41.0)))), Ok(()));
        assert_eq!(num_f_min(-42.0, &Field::of(Val::Num(None, None, Some(22.0)))), Ok(()));
    }

    #[test]
    fn test_num_min_err() {
        assert_eq!(num_u_min(10, &Field::of(Val::Num(Some(9), None, None))), Err(NumUMinErr("foo")));
        assert_eq!(num_u_min(10, &Field::of(Val::Num(Some(8), None, None))), Err(NumUMinErr("foo")));
        assert_eq!(num_i_min(-10, &Field::of(Val::Num(None,Some(-11), None,))), Err(NumIMinErr("foo")));
        assert_eq!(num_i_min(-10, &Field::of(Val::Num(None,Some(-12), None,))), Err(NumIMinErr("foo")));
        assert_eq!(num_f_min(-10.0, &Field::of(Val::Num(None, None, Some(-11.0)))), Err(NumFMinErr("foo")));
        assert_eq!(num_f_min(-10.0, &Field::of(Val::Num(None, None, Some(-12.0)))), Err(NumFMinErr("foo")));
    }

    #[test]
    fn test_num_max_ok() {
        assert_eq!(num_u_max(22, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_u_max(22, &Field::of(Val::Num(Some(22), None, None))), Ok(()));
        assert_eq!(num_u_max(22, &Field::of(Val::Num(Some(21), None, None))), Ok(()));
        assert_eq!(num_u_max(22, &Field::of(Val::Num(Some(0), None, None))), Ok(()));
        assert_eq!(num_i_max(22, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_i_max(22, &Field::of(Val::Num(None,Some(22), None,))), Ok(()));
        assert_eq!(num_i_max(22, &Field::of(Val::Num(None,Some(21), None,))), Ok(()));
        assert_eq!(num_i_max(22, &Field::of(Val::Num(None,Some(-1943), None,))), Ok(()));
        assert_eq!(num_f_max(22.0, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_f_max(22.0, &Field::of(Val::Num(None, None, Some(22.0)))), Ok(()));
        assert_eq!(num_f_max(22.0, &Field::of(Val::Num(None, None, Some(21.9)))), Ok(()));
        assert_eq!(num_f_max(22.0, &Field::of(Val::Num(None, None, Some(21.0)))), Ok(()));
        assert_eq!(num_f_max(22.0, &Field::of(Val::Num(None, None, Some(-1943.0)))), Ok(()));
    }

    #[test]
    fn test_num_max_err() {
        assert_eq!(num_u_max(10, &Field::of(Val::Num(Some(11), None, None))), Err(NumUMaxErr("foo")));
        assert_eq!(num_u_max(10, &Field::of(Val::Num(Some(12), None, None))), Err(NumUMaxErr("foo")));
        assert_eq!(num_i_max(10, &Field::of(Val::Num(None,Some(11), None,))), Err(NumIMaxErr("foo")));
        assert_eq!(num_i_max(10, &Field::of(Val::Num(None,Some(12), None,))), Err(NumIMaxErr("foo")));
        assert_eq!(num_f_max(10.0, &Field::of(Val::Num(None, None, Some(11.0)))), Err(NumFMaxErr("foo")));
        assert_eq!(num_f_max(10.0, &Field::of(Val::Num(None, None, Some(12.0)))), Err(NumFMaxErr("foo")));
    }

    #[test]
    fn test_str_exact_ok() {
        assert_eq!(str_exact(&String::from("Ai"), &Field::of(Val::None)), Ok(()));
        assert_eq!(
            str_exact(&String::from("Ai"), &Field::of(Val::Str(String::from("Ai")))),
            Ok(())
        );
    }

    #[test]
    fn test_str_exact_err() {
        assert_eq!(
            str_exact(&String::from("TO BE"), &Field::of(Val::Str(String::from("to be")))),
            Err(StrExactErr("foo"))
        );
    }

    #[test]
    fn test_str_exact_len_ok() {
        assert_eq!(str_exact_len(10, &Field::of(Val::None)), Ok(()));
        assert_eq!(str_exact_len(2, &Field::of(Val::Str(String::from("so")))), Ok(()));
        assert_eq!(str_exact_len(4, &Field::of(Val::Str(String::from("long")))), Ok(()));
        assert_eq!(str_exact_len(3, &Field::of(Val::Str(String::from("and")))), Ok(()));
        assert_eq!(str_exact_len(6, &Field::of(Val::Str(String::from("thanks")))), Ok(()));
    }

    #[test]
    fn test_str_exact_len_err() {
        assert_eq!(
            str_exact_len(6, &Field::of(Val::Str(String::from("touch")))),
            Err(StrExactLenErr("foo"))
        );
        assert_eq!(
            str_exact_len(6, &Field::of(Val::Str(String::from("the sky")))),
            Err(StrExactLenErr("foo"))
        );
    }

    #[test]
    fn test_str_min_len_ok() {
        assert_eq!(str_min_len(10, &Field::of(Val::None)), Ok(()));
        assert_eq!(str_min_len(10, &Field::of(Val::Str(String::from("Hitchhiker")))), Ok(()));
        assert_eq!(
            str_min_len(10, &Field::of(Val::Str(String::from("Guide to the galaxy")))),
            Ok(())
        );
    }

    #[test]
    fn test_str_min_len_err() {
        assert_eq!(
            str_min_len(10, &Field::of(Val::Str(String::from("Nevermore")))),
            Err(StrMinLenErr("foo"))
        );
        assert_eq!(
            str_min_len(10, &Field::of(Val::Str(String::from("Nevermor")))),
            Err(StrMinLenErr("foo"))
        );
    }

    #[test]
    fn test_str_max_len_ok() {
        assert_eq!(str_max_len(10, &Field::of(Val::None)), Ok(()));
        assert_eq!(str_max_len(10, &Field::of(Val::Str(String::from("restaurant")))), Ok(()));
        assert_eq!(str_max_len(10, &Field::of(Val::Str(String::from("at the end")))), Ok(()));
        assert_eq!(str_max_len(10, &Field::of(Val::Str(String::from("of the")))), Ok(()));
        assert_eq!(str_max_len(10, &Field::of(Val::Str(String::from("universe")))), Ok(()));
    }

    #[test]
    fn test_str_max_len_err() {
        assert_eq!(
            str_max_len(10, &Field::of(Val::Str(String::from("there is a ")))),
            Err(StrMaxLenErr("foo"))
        );
        assert_eq!(
            str_max_len(10, &Field::of(Val::Str(String::from("light that n")))),
            Err(StrMaxLenErr("foo"))
        );
    }

    #[test]
    fn test_str_min_upper_ok() {
        assert_eq!(str_min_upper(1, &Field::of(Val::None)), Ok(()));
        assert_eq!(str_min_upper(1, &Field::of(Val::Str(String::from("John")))), Ok(()));
        assert_eq!(str_min_upper(2, &Field::of(Val::Str(String::from("JoHn")))), Ok(()));
        assert_eq!(str_min_upper(3, &Field::of(Val::Str(String::from("JoHN")))), Ok(()));
        assert_eq!(str_min_upper(4, &Field::of(Val::Str(String::from("JOHN")))), Ok(()));
    }

    #[test]
    fn test_str_min_upper_err() {
        assert_eq!(
            str_min_upper(4, &Field::of(Val::Str(String::from("JOHn")))),
            Err(StrMinUpperErr("foo"))
        );
        assert_eq!(
            str_min_upper(4, &Field::of(Val::Str(String::from("JOhn")))),
            Err(StrMinUpperErr("foo"))
        );
    }

    #[test]
    fn test_str_min_lower_ok() {
        assert_eq!(str_min_lower(1, &Field::of(Val::None)), Ok(()));
        assert_eq!(str_min_lower(1, &Field::of(Val::Str(String::from("PAUl")))), Ok(()));
        assert_eq!(str_min_lower(2, &Field::of(Val::Str(String::from("PAul")))), Ok(()));
        assert_eq!(str_min_lower(3, &Field::of(Val::Str(String::from("Paul")))), Ok(()));
        assert_eq!(str_min_lower(4, &Field::of(Val::Str(String::from("paul")))), Ok(()));
    }

    #[test]
    fn test_str_min_lower_err() {
        assert_eq!(
            str_min_lower(4, &Field::of(Val::Str(String::from("PaUL")))),
            Err(StrMinLowerErr("foo"))
        );
        assert_eq!(
            str_min_lower(4, &Field::of(Val::Str(String::from("PauL")))),
            Err(StrMinLowerErr("foo"))
        );
    }

    #[test]
    fn test_str_min_num_ok() {
        assert_eq!(str_min_num(1, &Field::of(Val::None)), Ok(()));
        assert_eq!(str_min_num(1, &Field::of(Val::Str(String::from("1")))), Ok(()));
        assert_eq!(str_min_num(2, &Field::of(Val::Str(String::from("10")))), Ok(()));
        assert_eq!(str_min_num(3, &Field::of(Val::Str(String::from("we are 1 3 8")))), Ok(()));
    }

    #[test]
    fn test_str_min_num_err() {
        assert_eq!(
            str_min_num(3, &Field::of(Val::Str(String::from("we are one 3 8")))),
            Err(StrMinNumErr("foo"))
        );
        assert_eq!(
            str_min_num(3, &Field::of(Val::Str(String::from("we are one thirty 8")))),
            Err(StrMinNumErr("foo"))
        );
    }

    #[test]
    fn test_str_min_special_ok() {
        assert_eq!(str_min_special(1, &Field::of(Val::None)), Ok(()));
        assert_eq!(str_min_special(1, &Field::of(Val::Str(String::from(":")))), Ok(()));
        assert_eq!(str_min_special(2, &Field::of(Val::Str(String::from(":~")))), Ok(()));
        assert_eq!(str_min_special(10, &Field::of(Val::Str(String::from("!@#$%&*()+-")))), Ok(()));
    }

    #[test]
    fn test_str_min_special_err() {
        assert_eq!(
            str_min_special(10, &Field::of(Val::Str(String::from("!@#$%¨&*(")))),
            Err(StrMinSpecialErr("foo"))
        );
        assert_eq!(
            str_min_special(10, &Field::of(Val::Str(String::from("pressure")))),
            Err(StrMinSpecialErr("foo"))
        );
    }

    #[test]
    fn test_dt_ok() {
        assert_eq!(dt(&Field::of(Val::None)), Ok(()));
        assert_eq!(dt(&Field::of(Val::Str(String::from("2026-10-28")))), Ok(()));
    }

    #[test]
    fn test_dt_err() {
        assert_eq!(dt(&Field::of(Val::Str(String::from("28-10-2026")))), Err(DtErr("foo")));
        assert_eq!(dt(&Field::of(Val::Str(String::from("28-102026")))), Err(DtErr("foo")));
        assert_eq!(dt(&Field::of(Val::Str(String::from("2810-2026")))), Err(DtErr("foo")));
        assert_eq!(dt(&Field::of(Val::Str(String::from("10-2026-28")))), Err(DtErr("foo")));
        assert_eq!(dt(&Field::of(Val::Str(String::from("26-10-28")))), Err(DtErr("foo")));
        assert_eq!(dt(&Field::of(Val::Str(String::from("026-10-28")))), Err(DtErr("foo")));
        assert_eq!(dt(&Field::of(Val::Str(String::from("2026/10/28")))), Err(DtErr("foo")));
        assert_eq!(dt(&Field::of(Val::Str(String::from("2026 10 28 ")))), Err(DtErr("foo")));
        assert_eq!(dt(&Field::of(Val::Str(String::from("20261028")))), Err(DtErr("foo")));
    }

    #[test]
    fn test_dt_min_ok() {
        assert_eq!(dt_min(&String::from("2026-10-28"), &Field::of(Val::None)), Ok(()));
        assert_eq!(
            dt_min(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-10-28")))),
            Ok(())
        );
        assert_eq!(
            dt_min(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-10-29")))),
            Ok(())
        );
        assert_eq!(
            dt_min(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-11-01")))),
            Ok(())
        );
        assert_eq!(
            dt_min(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2027-01-01")))),
            Ok(())
        );
        assert_eq!(
            dt_min(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2027-12-31")))),
            Ok(())
        );
    }

    #[test]
    fn test_dt_min_err() {
        assert_eq!(
            dt_min(&String::from("2026-1028"), &Field::of(Val::Str(String::from("2026-1027")))),
            Err(DtMinErr("foo"))
        );
        assert_eq!(
            dt_min(&String::from("202610-28"), &Field::of(Val::Str(String::from("202610-27")))),
            Err(DtMinErr("foo"))
        );
        assert_eq!(
            dt_min(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-10-27")))),
            Err(DtMinErr("foo"))
        );
        assert_eq!(
            dt_min(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-09-30")))),
            Err(DtMinErr("foo"))
        );
        assert_eq!(
            dt_min(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2025-12-31")))),
            Err(DtMinErr("foo"))
        );
        assert_eq!(
            dt_min(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2025-01-01")))),
            Err(DtMinErr("foo"))
        );
    }

    #[test]
    fn test_dt_max_ok() {
        assert_eq!(dt_max(&String::from("2026-10-28"), &Field::of(Val::None)), Ok(()));
        assert_eq!(
            dt_max(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-10-28")))),
            Ok(())
        );
        assert_eq!(
            dt_max(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-10-27")))),
            Ok(())
        );
        assert_eq!(
            dt_max(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-09-30")))),
            Ok(())
        );
        assert_eq!(
            dt_max(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2025-12-31")))),
            Ok(())
        );
        assert_eq!(
            dt_max(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2025-01-01")))),
            Ok(())
        );
    }

    #[test]
    fn test_dt_max_err() {
        assert_eq!(
            dt_max(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-10-29")))),
            Err(DtMaxErr("foo"))
        );
        assert_eq!(
            dt_max(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-11-01")))),
            Err(DtMaxErr("foo"))
        );
        assert_eq!(
            dt_max(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2027-01-01")))),
            Err(DtMaxErr("foo"))
        );
        assert_eq!(
            dt_max(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2027-12-31")))),
            Err(DtMaxErr("foo"))
        );
    }

    #[test]
    fn test_email_ok() {
        assert_eq!(email(&Field::of(Val::Str(String::from("john.lennon@gmail.com")))), Ok(()));
        assert_eq!(email(&Field::of(Val::Str(String::from("paul_macca@hotmail.com")))), Ok(()));
        assert_eq!(email(&Field::of(Val::Str(String::from("ringo-starr@outlook.com")))), Ok(()));
        assert_eq!(email(&Field::of(Val::Str(String::from("GeorgeHarrison@live.com")))), Ok(()));
    }

    #[test]
    fn test_email_err() {
        assert_eq!(email(&Field::of(Val::Str(String::from("paullivecom")))), Err(EmailErr("foo")));
        assert_eq!(email(&Field::of(Val::Str(String::from("paullive.com")))), Err(EmailErr("foo")));
        assert_eq!(
            email(&Field::of(Val::Str(String::from("paul@liv@e.com")))),
            Err(EmailErr("foo"))
        );
        assert_eq!(email(&Field::of(Val::Str(String::from("live.com")))), Err(EmailErr("foo")));
        assert_eq!(email(&Field::of(Val::Str(String::from("@live.com")))), Err(EmailErr("foo")));
    }

    #[test]
    fn test_type_ok() {
        assert_eq!(required(&f_num_u_stub()), Ok(()));
        assert_eq!(required(&f_num_i_stub()), Ok(()));
        assert_eq!(required(&f_num_f_stub()), Ok(()));
        assert_eq!(required(&f_str_stub()), Ok(()));
        assert_eq!(required(&f_bool_stub()), Ok(()));
        assert_eq!(required(&f_arr_stub()), Ok(()));
        assert_eq!(required(&f_obj_stub()), Ok(()));
        assert_eq!(num_u(&f_num_u_stub()), Ok(()));
        assert_eq!(num_i(&f_num_i_stub()), Ok(()));
        assert_eq!(num_f(&f_num_f_stub()), Ok(()));
        assert_eq!(str(&f_str_stub()), Ok(()));
        assert_eq!(bool(&f_bool_stub()), Ok(()));
    }

    #[test]
    fn test_wrong_type_err() {
        assert_eq!(required(&Field::of(Val::None)), Err(RequiredErr("foo")));
        assert_eq!(num_u(&f_obj_stub()), Err(NumUErr("foo")));
        assert_eq!(num_i(&f_obj_stub()), Err(NumIErr("foo")));
        assert_eq!(num_f(&f_obj_stub()), Err(NumFErr("foo")));
        assert_eq!(str(&f_obj_stub()), Err(StrErr("foo")));
        assert_eq!(bool(&f_obj_stub()), Err(BoolErr("foo")));
        assert_eq!(num_u_exact(42, &f_obj_stub()), Err(NumUExactErr("foo")));
        assert_eq!(num_i_exact(-42, &f_obj_stub()), Err(NumIExactErr("foo")));
        assert_eq!(num_f_exact(-42.0, &f_obj_stub()), Err(NumFExactErr("foo")));
        assert_eq!(num_u_min(42, &f_obj_stub()), Err(NumUMinErr("foo")));
        assert_eq!(num_i_min(-42, &f_obj_stub()), Err(NumIMinErr("foo")));
        assert_eq!(num_f_min(-42.0, &f_obj_stub()), Err(NumFMinErr("foo")));
        assert_eq!(num_u_max(42, &f_obj_stub()), Err(NumUMaxErr("foo")));
        assert_eq!(num_i_max(-42, &f_obj_stub()), Err(NumIMaxErr("foo")));
        assert_eq!(num_f_max(-42.0, &f_obj_stub()), Err(NumFMaxErr("foo")));
        assert_eq!(str_exact(&String::from(""), &f_obj_stub()), Err(StrExactErr("foo")));
        assert_eq!(str_exact_len(1, &f_obj_stub()), Err(StrExactLenErr("foo")));
        assert_eq!(str_min_len(1, &f_obj_stub()), Err(StrMinLenErr("foo")));
        assert_eq!(str_max_len(1, &f_obj_stub()), Err(StrMaxLenErr("foo")));
        assert_eq!(str_min_upper(1, &f_obj_stub()), Err(StrMinUpperErr("foo")));
        assert_eq!(str_min_lower(1, &f_obj_stub()), Err(StrMinLowerErr("foo")));
        assert_eq!(str_min_num(1, &f_obj_stub()), Err(StrMinNumErr("foo")));
        assert_eq!(str_min_special(1, &f_obj_stub()), Err(StrMinSpecialErr("foo")));
        assert_eq!(dt(&f_obj_stub()), Err(DtErr("foo")));
        assert_eq!(dt_min(&String::from("1970-01-01"), &f_obj_stub()), Err(DtMinErr("foo")));
        assert_eq!(dt_max(&String::from("2099-12-31"), &f_obj_stub()), Err(DtMaxErr("foo")));
        assert_eq!(email(&f_obj_stub()), Err(EmailErr("foo")));
    }

    #[test]
    fn test_none_not_required() {
        assert_eq!(num_u(&Field::default()), Ok(()));
        assert_eq!(num_i(&Field::default()), Ok(()));
        assert_eq!(num_f(&Field::default()), Ok(()));
        assert_eq!(str(&Field::default()), Ok(()));
        assert_eq!(bool(&Field::default()), Ok(()));
        assert_eq!(num_u_exact(42, &Field::default()), Ok(()));
        assert_eq!(num_i_exact(-42, &Field::default()), Ok(()));
        assert_eq!(num_f_exact(-42.0, &Field::default()), Ok(()));
        assert_eq!(num_u_min(42, &Field::default()), Ok(()));
        assert_eq!(num_i_min(-42, &Field::default()), Ok(()));
        assert_eq!(num_f_min(-42.0, &Field::default()), Ok(()));
        assert_eq!(num_u_max(42, &Field::default()), Ok(()));
        assert_eq!(num_i_max(-42, &Field::default()), Ok(()));
        assert_eq!(num_f_max(-42.0, &Field::default()), Ok(()));
        assert_eq!(str_exact(&String::from(""), &Field::default()), Ok(()));
        assert_eq!(str_exact_len(1, &Field::default()), Ok(()));
        assert_eq!(str_min_len(1, &Field::default()), Ok(()));
        assert_eq!(str_max_len(1, &Field::default()), Ok(()));
        assert_eq!(str_min_upper(1, &Field::default()), Ok(()));
        assert_eq!(str_min_lower(1, &Field::default()), Ok(()));
        assert_eq!(str_min_num(1, &Field::default()), Ok(()));
        assert_eq!(str_min_special(1, &Field::default()), Ok(()));
        assert_eq!(dt(&Field::default()), Ok(()));
        assert_eq!(dt_min(&String::from("1970-01-01"), &Field::default()), Ok(()));
        assert_eq!(dt_max(&String::from("2099-12-31"), &Field::default()), Ok(()));
        assert_eq!(email(&Field::default()), Ok(()));
    }

    #[test]
    fn test_none_required() {
        assert_eq!(num_u(&Field::required()), Err(NumUErr("foo")));
        assert_eq!(num_i(&Field::required()), Err(NumIErr("foo")));
        assert_eq!(num_f(&Field::required()), Err(NumFErr("foo")));
        assert_eq!(str(&Field::required()), Err(StrErr("foo")));
        assert_eq!(bool(&Field::required()), Err(BoolErr("foo")));
        assert_eq!(num_u_exact(42, &Field::required()), Err(NumUExactErr("foo")));
        assert_eq!(num_i_exact(-42, &Field::required()), Err(NumIExactErr("foo")));
        assert_eq!(num_f_exact(-42.0, &Field::required()), Err(NumFExactErr("foo")));
        assert_eq!(num_u_min(42, &Field::required()), Err(NumUMinErr("foo")));
        assert_eq!(num_i_min(-42, &Field::required()), Err(NumIMinErr("foo")));
        assert_eq!(num_f_min(-42.0, &Field::required()), Err(NumFMinErr("foo")));
        assert_eq!(num_u_max(42, &Field::required()), Err(NumUMaxErr("foo")));
        assert_eq!(num_i_max(-42, &Field::required()), Err(NumIMaxErr("foo")));
        assert_eq!(num_f_max(-42.0, &Field::required()), Err(NumFMaxErr("foo")));
        assert_eq!(str_exact(&String::from(""), &Field::required()), Err(StrExactErr("foo")));
        assert_eq!(str_exact_len(1, &Field::required()), Err(StrExactLenErr("foo")));
        assert_eq!(str_min_len(1, &Field::required()), Err(StrMinLenErr("foo")));
        assert_eq!(str_max_len(1, &Field::required()), Err(StrMaxLenErr("foo")));
        assert_eq!(str_min_upper(1, &Field::required()), Err(StrMinUpperErr("foo")));
        assert_eq!(str_min_lower(1, &Field::required()), Err(StrMinLowerErr("foo")));
        assert_eq!(str_min_num(1, &Field::required()), Err(StrMinNumErr("foo")));
        assert_eq!(str_min_special(1, &Field::required()), Err(StrMinSpecialErr("foo")));
        assert_eq!(dt(&Field::required()), Err(DtErr("foo")));
        assert_eq!(dt_min(&String::from("1970-01-01"), &Field::required()), Err(DtMinErr("foo")));
        assert_eq!(dt_max(&String::from("2099-12-31"), &Field::required()), Err(DtMaxErr("foo")));
        assert_eq!(email(&Field::required()), Err(EmailErr("foo")));
    }
}
