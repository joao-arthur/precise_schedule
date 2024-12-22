use email_address::EmailAddress;
use regex::Regex;

use crate::{
    domain::validation::*,
    infra::validation::Field,
};

pub fn required(f: &Field) -> Result<(), RequiredErr> {
    match f.value {
        Val::None => Err(RequiredErr(f.name)),
        _ => Ok(()),
    }
}

pub fn num_u(f: &Field) -> Result<(), NumUErr> {
    match f.value {
        Val::NumU(_num_u) => Ok(()),
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
        Val::NumI(_num_i) => Ok(()),
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
        Val::NumF(_value) => Ok(()),
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
        Val::NumU(num_u) => {
            if num_u == valid {
                Ok(())
            } else {
                Err(NumUExactErr(f.name))
            }
        },
        Val::None => {
            if f.has_required {
                Err(NumUExactErr(f.name))
            } else {
                Ok(())
            }
        },
        _ => Ok(()),
    }
}

pub fn num_i_exact(valid: i64, f: &Field) -> Result<(), NumIExactErr> {
    match f.value {
        Val::NumI(num_i) => {
            if num_i == valid {
                Ok(())
            } else {
                Err(NumIExactErr(f.name))
            }
        },
        Val::None => {
            if f.has_required {
                Err(NumIExactErr(f.name))
            } else {
                Ok(())
            }
        },
        _ => Ok(()),
    }
}

pub fn num_f_exact(valid: f64, f: &Field) -> Result<(), NumFExactErr> {
    match f.value {
        Val::NumF(num_f) => {
            if num_f == valid {
                Ok(())
            } else {
                Err(NumFExactErr(f.name))
            }
        },
        Val::None => {
            if f.has_required {
                Err(NumFExactErr(f.name))
            } else {
                Ok(())
            }
        },
        _ => Ok(()),
    }
}

pub fn num_u_min(valid: u64, f: &Field) -> Result<(), NumUMinErr> {
    match f.value {
        Val::NumU(num_u) => {
            if num_u >= valid {
                Ok(())
            } else {
                Err(NumUMinErr(f.name))
            }
        },
        Val::None => {
            if f.has_required {
                Err(NumUMinErr(f.name))
            } else {
                Ok(())
            }
        },
        _ => Ok(()),
    }
}

pub fn num_i_min(valid: i64, f: &Field) -> Result<(), NumIMinErr> {
    match f.value {
        Val::NumI(num_i) => {
            if num_i >= valid {
                Ok(())
            } else {
                Err(NumIMinErr(f.name))
            }
        },
        Val::None => {
            if f.has_required {
                Err(NumIMinErr(f.name))
            } else {
                Ok(())
            }
        },
        _ => Ok(()),
    }
}

pub fn num_f_min(valid: f64, f: &Field) -> Result<(), NumFMinErr> {
    match f.value {
        Val::NumF(num_f) => {
            if num_f >= valid {
                Ok(())
            } else {
                Err(NumFMinErr(f.name))
            }
        },
        Val::None => {
            if f.has_required {
                Err(NumFMinErr(f.name))
            } else {
                Ok(())
            }
        },
        _ => Ok(()),
    }
}

pub fn num_u_max(valid: u64, f: &Field) -> Result<(), NumUMaxErr> {
    match f.value {
        Val::NumU(num_u) => {
            if num_u <= valid {
                Ok(())
            } else {
                Err(NumUMaxErr(f.name))
            }
        },
        Val::None => {
            if f.has_required {
                Err(NumUMaxErr(f.name))
            } else {
                Ok(())
            }
        },
        _ => Ok(()),
    }
}

pub fn num_i_max(valid: i64, f: &Field) -> Result<(), NumIMaxErr> {
    match f.value {
        Val::NumI(num_i) => {
            if num_i <= valid {
                Ok(())
            } else {
                Err(NumIMaxErr(f.name))
            }
        },
        Val::None => {
            if f.has_required {
                Err(NumIMaxErr(f.name))
            } else {
                Ok(())
            }
        },
        _ => Ok(()),
    }
}

pub fn num_f_max(valid: f64, f: &Field) -> Result<(), NumFMaxErr> {
    match f.value {
        Val::NumF(num_f) => {
            if num_f <= valid {
                Ok(())
            } else {
                Err(NumFMaxErr(f.name))
            }
        },
        Val::None => {
            if f.has_required {
                Err(NumFMaxErr(f.name))
            } else {
                Ok(())
            }
        },
        _ => Ok(()),
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
        _ => Ok(()),
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
        _ => Ok(()),
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
        _ => Ok(()),
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
        _ => Ok(()),
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
        _ => Ok(()),
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
        _ => Ok(()),
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
        _ => Ok(()),
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
        _ => Ok(()),
    }
}

struct InternalDT(pub u32, pub u16, pub u16);

fn parsedt(s: &String) -> Result<InternalDT, ()> {
    let re = Regex::new(r"(?x)
(?P<year>\d{4})  # the year
-
(?P<month>\d{2}) # the month
-
(?P<day>\d{2})   # the day
").unwrap();
    if let Some(caps) = re.captures(s) {
        let _yyyy = caps["year"].parse::<u32>().map_err(|_| ())?;
        let _mm = caps["month"].parse::<u16>().map_err(|_| ())?;
        let _dd = caps["day"].parse::<u16>().map_err(|_| ())?;
        return Ok(InternalDT(_yyyy, _mm, _dd));
    } else {
        return Err(());
    }
}

fn parsetime(s: &String) -> Result<InternalDT, ()> {
        return Err(());
    
}

fn parsetimestamp(s: &String) -> Result<InternalDT, ()> {
        return Err(());
    
}

pub fn dt(f: &Field) -> Result<(), DtErr> {
    match &f.value {
        Val::Str(str_value) => {
            match parsedt(str_value) {
               Err(_) => Err(DtErr(f.name)),
               Ok(_) => Ok(())
            }
        }
        _ => Ok(()),
    }
}

pub fn dt_min(valid: &String, f: &Field) -> Result<(), DtMinErr> {
    match &f.value {
        Val::Str(str_value) => {
            let valid_dt = parsedt(valid).map_err(|_| DtMinErr(f.name))?;
            let value_dt = parsedt(str_value).map_err(|_| DtMinErr(f.name))?;

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
        _ => Ok(()),
    }
}

pub fn dt_max(valid: &String, f: &Field) -> Result<(), DtMaxErr> {
    match &f.value {
        Val::Str(str_value) => {
            let valid_dt = parsedt(valid).map_err(|_| DtMaxErr(f.name))?;
            let value_dt = parsedt(str_value).map_err(|_| DtMaxErr(f.name))?;

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
        _ => Ok(()),
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
        _ => Ok(()),
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use std::collections::HashMap;

    #[test]
    fn test_type_ok() {
        let f_num_u = Field::of(Val::NumU(42));
        let f_num_i = Field::of(Val::NumI(-42));
        let f_num_f = Field::of(Val::NumF(24.5));
        let f_str = Field::of(Val::Str(String::from("hello")));
        let f_bool = Field::of(Val::Bool(false));
        let f_arr = Field::of(Val::Arr(vec![Val::NumI(-1), Val::NumI(2)]));
        let f_obj = Field::of(Val::Obj(HashMap::from([(String::from("age"), Val::NumI(42))])));

        assert_eq!(required(&f_num_u), Ok(()));
        assert_eq!(required(&f_num_i), Ok(()));
        assert_eq!(required(&f_num_f), Ok(()));
        assert_eq!(required(&f_str), Ok(()));
        assert_eq!(required(&f_bool), Ok(()));
        assert_eq!(required(&f_arr), Ok(()));
        assert_eq!(required(&f_obj), Ok(()));
        assert_eq!(num_u(&f_num_u), Ok(()));
        assert_eq!(num_i(&f_num_i), Ok(()));
        assert_eq!(num_f(&f_num_f), Ok(()));
        assert_eq!(str(&f_str), Ok(()));
        assert_eq!(bool(&f_bool), Ok(()));
    }

    #[test]
    fn test_type_err() {
        let f_none = Field::of(Val::None);
        let f_num_u = Field::of(Val::NumU(42));
        let f_num_i = Field::of(Val::NumI(-42));
        let f_num_f = Field::of(Val::NumF(24.5));
        let f_str = Field::of(Val::Str(String::from("hello")));
        let f_bool = Field::of(Val::Bool(false));
        let f_arr = Field::of(Val::Arr(vec![Val::NumI(-1), Val::NumI(2)]));
        let f_obj = Field::of(Val::Obj(HashMap::from([(String::from("age"), Val::NumI(42))])));

        assert_eq!(required(&f_none), Err(RequiredErr("foo")));

        assert_eq!(num_u(&f_num_i), Err(NumUErr("foo")));
        assert_eq!(num_u(&f_num_f), Err(NumUErr("foo")));
        assert_eq!(num_u(&f_str), Err(NumUErr("foo")));
        assert_eq!(num_u(&f_bool), Err(NumUErr("foo")));
        assert_eq!(num_u(&f_arr), Err(NumUErr("foo")));
        assert_eq!(num_u(&f_obj), Err(NumUErr("foo")));

        assert_eq!(num_i(&f_num_u), Err(NumIErr("foo")));
        assert_eq!(num_i(&f_num_f), Err(NumIErr("foo")));
        assert_eq!(num_i(&f_str), Err(NumIErr("foo")));
        assert_eq!(num_i(&f_bool), Err(NumIErr("foo")));
        assert_eq!(num_i(&f_arr), Err(NumIErr("foo")));
        assert_eq!(num_i(&f_obj), Err(NumIErr("foo")));

        assert_eq!(num_f(&f_num_u), Err(NumFErr("foo")));
        assert_eq!(num_f(&f_num_i), Err(NumFErr("foo")));
        assert_eq!(num_f(&f_str), Err(NumFErr("foo")));
        assert_eq!(num_f(&f_bool), Err(NumFErr("foo")));
        assert_eq!(num_f(&f_arr), Err(NumFErr("foo")));
        assert_eq!(num_f(&f_obj), Err(NumFErr("foo")));

        assert_eq!(str(&f_num_u), Err(StrErr("foo")));
        assert_eq!(str(&f_num_i), Err(StrErr("foo")));
        assert_eq!(str(&f_num_f), Err(StrErr("foo")));
        assert_eq!(str(&f_bool), Err(StrErr("foo")));
        assert_eq!(str(&f_arr), Err(StrErr("foo")));
        assert_eq!(str(&f_obj), Err(StrErr("foo")));

        assert_eq!(bool(&f_num_u), Err(BoolErr("foo")));
        assert_eq!(bool(&f_num_i), Err(BoolErr("foo")));
        assert_eq!(bool(&f_num_f), Err(BoolErr("foo")));
        assert_eq!(bool(&f_str), Err(BoolErr("foo")));
        assert_eq!(bool(&f_arr), Err(BoolErr("foo")));
        assert_eq!(bool(&f_obj), Err(BoolErr("foo")));
    }

    #[test]
    fn test_none_not_required() {
        assert_eq!(num_u(&Field::default()), Ok(()));
        assert_eq!(num_i(&Field::default()), Ok(()));
        assert_eq!(num_f(&Field::default()), Ok(()));
        assert_eq!(str(&Field::default()), Ok(()));
        assert_eq!(bool(&Field::default()), Ok(()));
    }

    #[test]
    fn test_none_required() {
        assert_eq!(num_u(&Field::required()), Err(NumUErr("foo")));
        assert_eq!(num_i(&Field::required()), Err(NumIErr("foo")));
        assert_eq!(num_f(&Field::required()), Err(NumFErr("foo")));
        assert_eq!(str(&Field::required()), Err(StrErr("foo")));
        assert_eq!(bool(&Field::required()), Err(BoolErr("foo")));
    }


    #[test]
    fn test_num_exact_ok() {
        assert_eq!(num_u_exact(42, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_u_exact(42, &Field::of(Val::NumU(42))), Ok(()));
        assert_eq!(num_u_exact(22, &Field::of(Val::NumU(22))), Ok(()));

        assert_eq!(num_i_exact(42, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_i_exact(42, &Field::of(Val::NumI(42))), Ok(()));
        assert_eq!(num_i_exact(-42, &Field::of(Val::NumI(-42))), Ok(()));

        assert_eq!(num_f_exact(-42.0, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_f_exact(-42.5, &Field::of(Val::NumF(-42.5))), Ok(()));
        assert_eq!(num_f_exact(42.5, &Field::of(Val::NumF(42.5))), Ok(()));
    }

    #[test]
    fn test_num_min_ok() {
        assert_eq!(num_u_min(42, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_u_min(42, &Field::of(Val::NumU(42))), Ok(()));
        assert_eq!(num_u_min(42, &Field::of(Val::NumU(43))), Ok(()));
        assert_eq!(num_u_min(42, &Field::of(Val::NumU(100))), Ok(()));

        assert_eq!(num_i_min(-42, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_i_min(-42, &Field::of(Val::NumI(-42))), Ok(()));
        assert_eq!(num_i_min(-42, &Field::of(Val::NumI(-41))), Ok(()));
        assert_eq!(num_i_min(-42, &Field::of(Val::NumI(22))), Ok(()));

        assert_eq!(num_f_min(-42.0, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_f_min(-42.0, &Field::of(Val::NumF(-42.0))), Ok(()));
        assert_eq!(num_f_min(-42.0, &Field::of(Val::NumF(-41.9))), Ok(()));
        assert_eq!(num_f_min(-42.0, &Field::of(Val::NumF(-41.0))), Ok(()));
        assert_eq!(num_f_min(-42.0, &Field::of(Val::NumF(22.0))), Ok(()));
    }

    #[test]
    fn test_num_max_ok() {
        assert_eq!(num_u_max(22, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_u_max(22, &Field::of(Val::NumU(22))), Ok(()));
        assert_eq!(num_u_max(22, &Field::of(Val::NumU(21))), Ok(()));
        assert_eq!(num_u_max(22, &Field::of(Val::NumU(0))), Ok(()));

        assert_eq!(num_i_max(22, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_i_max(22, &Field::of(Val::NumI(22))), Ok(()));
        assert_eq!(num_i_max(22, &Field::of(Val::NumI(21))), Ok(()));
        assert_eq!(num_i_max(22, &Field::of(Val::NumI(-1943))), Ok(()));

        assert_eq!(num_f_max(22.0, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_f_max(22.0, &Field::of(Val::NumF(22.0))), Ok(()));
        assert_eq!(num_f_max(22.0, &Field::of(Val::NumF(21.9))), Ok(()));
        assert_eq!(num_f_max(22.0, &Field::of(Val::NumF(21.0))), Ok(()));
        assert_eq!(num_f_max(22.0, &Field::of(Val::NumF(-1943.0))), Ok(()));
    }

    #[test]
    fn test_num_exact_err() {
        assert_eq!(num_u_exact(10, &Field::of(Val::NumU(11))), Err(NumUExactErr("foo")));
        assert_eq!(num_u_exact(10, &Field::of(Val::NumU(9))), Err(NumUExactErr("foo")));

        assert_eq!(num_i_exact(-10, &Field::of(Val::NumI(-11))), Err(NumIExactErr("foo")));
        assert_eq!(num_i_exact(-10, &Field::of(Val::NumI(-9))), Err(NumIExactErr("foo")));

        assert_eq!(num_f_exact(-10.0, &Field::of(Val::NumF(-10.1))), Err(NumFExactErr("foo")));
        assert_eq!(num_f_exact(-10.0, &Field::of(Val::NumF(-9.9))), Err(NumFExactErr("foo")));
    }

    #[test]
    fn test_num_min_err() {
        assert_eq!(num_u_min(10, &Field::of(Val::NumU(9))), Err(NumUMinErr("foo")));
        assert_eq!(num_u_min(10, &Field::of(Val::NumU(8))), Err(NumUMinErr("foo")));

        assert_eq!(num_i_min(-10, &Field::of(Val::NumI(-11))), Err(NumIMinErr("foo")));
        assert_eq!(num_i_min(-10, &Field::of(Val::NumI(-12))), Err(NumIMinErr("foo")));

        assert_eq!(num_f_min(-10.0, &Field::of(Val::NumF(-11.0))), Err(NumFMinErr("foo")));
        assert_eq!(num_f_min(-10.0, &Field::of(Val::NumF(-12.0))), Err(NumFMinErr("foo")));
    }

    #[test]
    fn test_num_max_err() {
        assert_eq!(num_u_max(10, &Field::of(Val::NumU(11))), Err(NumUMaxErr("foo")));
        assert_eq!(num_u_max(10, &Field::of(Val::NumU(12))), Err(NumUMaxErr("foo")));

        assert_eq!(num_i_max(10, &Field::of(Val::NumI(11))), Err(NumIMaxErr("foo")));
        assert_eq!(num_i_max(10, &Field::of(Val::NumI(12))), Err(NumIMaxErr("foo")));

        assert_eq!(num_f_max(10.0, &Field::of(Val::NumF(11.0))), Err(NumFMaxErr("foo")));
        assert_eq!(num_f_max(10.0, &Field::of(Val::NumF(12.0))), Err(NumFMaxErr("foo")));
    }

    #[test]
    fn test_num_none_not_required() {
        assert_eq!(num_u_exact(42, &Field::default()), Ok(()));
        assert_eq!(num_i_exact(-42, &Field::default()), Ok(()));
        assert_eq!(num_f_exact(-42.0, &Field::default()), Ok(()));
        assert_eq!(num_u_min(42, &Field::default()), Ok(()));
        assert_eq!(num_i_min(-42, &Field::default()), Ok(()));
        assert_eq!(num_f_min(-42.0, &Field::default()), Ok(()));
        assert_eq!(num_u_max(42, &Field::default()), Ok(()));
        assert_eq!(num_i_max(-42, &Field::default()), Ok(()));
        assert_eq!(num_f_max(-42.0, &Field::default()), Ok(()));
    }

    #[test]
    fn test_num_none_required() {
        assert_eq!(num_u_exact(42, &Field::required()), Ok(()));
        assert_eq!(num_i_exact(-42, &Field::required()), Ok(()));
        assert_eq!(num_f_exact(-42.0, &Field::required()), Ok(()));
        assert_eq!(num_u_min(42, &Field::required()), Ok(()));
        assert_eq!(num_i_min(-42, &Field::required()), Ok(()));
        assert_eq!(num_f_min(-42.0, &Field::required()), Ok(()));
        assert_eq!(num_u_max(42, &Field::required()), Ok(()));
        assert_eq!(num_i_max(-42, &Field::required()), Ok(()));
        assert_eq!(num_f_max(-42.0, &Field::required()), Ok(()));
    }

    #[test]
    fn test_str_exact_ok() {
        assert_eq!(str_exact(&String::from("Ai"), &Field::of(Val::None)), Ok(()));
        assert_eq!(str_exact(&String::from("Ai"), &Field::of(Val::Str(String::from("Ai")))), Ok(()));
    }

    #[test]
    fn test_str_exact_err() {
        assert_eq!(str_exact(&String::from("TO BE"), &Field::of(Val::Str(String::from("to be")))), Err(StrExactErr("foo")));
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
        assert_eq!(str_exact_len(6, &Field::of(Val::Str(String::from("touch")))), Err(StrExactLenErr("foo")));
        assert_eq!(str_exact_len(6, &Field::of(Val::Str(String::from("the sky")))), Err(StrExactLenErr("foo")));
    }

    #[test]
    fn test_str_min_len_ok() {
        assert_eq!(str_min_len(10, &Field::of(Val::None)), Ok(()));
        assert_eq!(str_min_len(10, &Field::of(Val::Str(String::from("Hitchhiker")))), Ok(()));
        assert_eq!(str_min_len(10, &Field::of(Val::Str(String::from("Guide to the galaxy")))), Ok(()));
    }

    #[test]
    fn test_str_min_len_err() {
        assert_eq!(str_min_len(10, &Field::of(Val::Str(String::from("Nevermore")))), Err(StrMinLenErr("foo")));
        assert_eq!(str_min_len(10, &Field::of(Val::Str(String::from("Nevermor")))), Err(StrMinLenErr("foo")));
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
        assert_eq!(str_max_len(10, &Field::of(Val::Str(String::from("there is a ")))), Err(StrMaxLenErr("foo")));
        assert_eq!(str_max_len(10, &Field::of(Val::Str(String::from("light that n")))), Err(StrMaxLenErr("foo")));
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
        assert_eq!(str_min_upper(4, &Field::of(Val::Str(String::from("JOHn")))), Err(StrMinUpperErr("foo")));
        assert_eq!(str_min_upper(4, &Field::of(Val::Str(String::from("JOhn")))), Err(StrMinUpperErr("foo")));
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
        assert_eq!(str_min_lower(4, &Field::of(Val::Str(String::from("PaUL")))), Err(StrMinLowerErr("foo")));
        assert_eq!(str_min_lower(4, &Field::of(Val::Str(String::from("PauL")))), Err(StrMinLowerErr("foo")));
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
        assert_eq!(str_min_num(3, &Field::of(Val::Str(String::from("we are one 3 8")))), Err(StrMinNumErr("foo")));
        assert_eq!(str_min_num(3, &Field::of(Val::Str(String::from("we are one thirty 8")))), Err(StrMinNumErr("foo")));
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
        assert_eq!(str_min_special(10, &Field::of(Val::Str(String::from("!@#$%¨&*(")))), Err(StrMinSpecialErr("foo")));
        assert_eq!(str_min_special(10, &Field::of(Val::Str(String::from("pressure")))), Err(StrMinSpecialErr("foo")));
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
        assert_eq!(dt_min(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-10-28")))), Ok(()));
        assert_eq!(dt_min(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-10-29")))), Ok(()));
        assert_eq!(dt_min(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-11-01")))), Ok(()));
        assert_eq!(dt_min(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2027-01-01")))), Ok(()));
        assert_eq!(dt_min(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2027-12-31")))), Ok(()));
    }

    #[test]
    fn test_dt_min_err() {
        assert_eq!(dt_min(&String::from("2026-1028"), &Field::of(Val::Str(String::from("2026-1027")))), Err(DtMinErr("foo")));
        assert_eq!(dt_min(&String::from("202610-28"), &Field::of(Val::Str(String::from("202610-27")))), Err(DtMinErr("foo")));

        assert_eq!(dt_min(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-10-27")))), Err(DtMinErr("foo")));
        assert_eq!(dt_min(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-09-30")))), Err(DtMinErr("foo")));
        assert_eq!(dt_min(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2025-12-31")))), Err(DtMinErr("foo")));
        assert_eq!(dt_min(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2025-01-01")))), Err(DtMinErr("foo")));
    }

    #[test]
    fn test_dt_max_ok() {
        assert_eq!(dt_max(&String::from("2026-10-28"), &Field::of(Val::None)), Ok(()));
        assert_eq!(dt_max(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-10-28")))), Ok(()));
        assert_eq!(dt_max(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-10-27")))), Ok(()));
        assert_eq!(dt_max(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-09-30")))), Ok(()));
        assert_eq!(dt_max(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2025-12-31")))), Ok(()));
        assert_eq!(dt_max(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2025-01-01")))), Ok(()));
    }

    #[test]
    fn test_dt_max_err() {
        assert_eq!(dt_max(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-10-29")))), Err(DtMaxErr("foo")));
        assert_eq!(dt_max(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2026-11-01")))), Err(DtMaxErr("foo")));
        assert_eq!(dt_max(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2027-01-01")))), Err(DtMaxErr("foo")));
        assert_eq!(dt_max(&String::from("2026-10-28"), &Field::of(Val::Str(String::from("2027-12-31")))), Err(DtMaxErr("foo")));
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
        assert_eq!(email(&Field::of(Val::Str(String::from("paul@liv@e.com")))), Err(EmailErr("foo")));
        assert_eq!(email(&Field::of(Val::Str(String::from("live.com")))), Err(EmailErr("foo")));
        assert_eq!(email(&Field::of(Val::Str(String::from("@live.com")))), Err(EmailErr("foo")));
    }
}
