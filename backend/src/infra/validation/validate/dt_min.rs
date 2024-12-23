use crate::{
    domain::validation::{DtMinErr, Val},
    infra::validation::Field,
};

use super::parse::parse_dt;

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

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::{
        f_arr_stub, f_bool_stub, f_num_f_stub, f_num_i_stub, f_num_u_stub, f_obj_stub,
    };

    use super::*;

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
    fn test_dt_min_type_err() {
        assert_eq!(dt_min(&String::from("1970-01-01"), &f_num_u_stub()), Err(DtMinErr("foo")));
        assert_eq!(dt_min(&String::from("1970-01-01"), &f_num_i_stub()), Err(DtMinErr("foo")));
        assert_eq!(dt_min(&String::from("1970-01-01"), &f_num_f_stub()), Err(DtMinErr("foo")));
        assert_eq!(dt_min(&String::from("1970-01-01"), &f_bool_stub()), Err(DtMinErr("foo")));
        assert_eq!(dt_min(&String::from("1970-01-01"), &f_arr_stub()), Err(DtMinErr("foo")));
        assert_eq!(dt_min(&String::from("1970-01-01"), &f_obj_stub()), Err(DtMinErr("foo")));
    }

    #[test]
    fn test_dt_min_required() {
        assert_eq!(dt_min(&String::from("1970-01-01"), &Field::default()), Ok(()));
        assert_eq!(dt_min(&String::from("1970-01-01"), &Field::required()), Err(DtMinErr("foo")));
    }
}
