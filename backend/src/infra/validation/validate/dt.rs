use crate::{
    domain::validation::{DtErr, Val},
    infra::validation::Field,
};

use super::parse::parse_dt;

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

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::f_obj_stub;

    use super::*;

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
    fn test_wrong_type_err() {
        assert_eq!(dt(&f_obj_stub()), Err(DtErr("foo")));
    }

    #[test]
    fn test_none_not_required() {
        assert_eq!(dt(&Field::default()), Ok(()));
    }

    #[test]
    fn test_none_required() {
        assert_eq!(dt(&Field::required()), Err(DtErr("foo")));
    }
}
