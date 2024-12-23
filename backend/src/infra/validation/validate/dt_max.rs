use crate::{
    domain::validation::{DtMaxErr, Val},
    infra::validation::Field,
};

use super::parse::parse_dt;

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

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::f_obj_stub;

    use super::*;

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
    fn test_wrong_type_err() {
        assert_eq!(dt_max(&String::from("2099-12-31"), &f_obj_stub()), Err(DtMaxErr("foo")));
    }

    #[test]
    fn test_none_not_required() {
        assert_eq!(dt_max(&String::from("2099-12-31"), &Field::default()), Ok(()));
    }

    #[test]
    fn test_none_required() {
        assert_eq!(dt_max(&String::from("2099-12-31"), &Field::required()), Err(DtMaxErr("foo")));
    }
}
