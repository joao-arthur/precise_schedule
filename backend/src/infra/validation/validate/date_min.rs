use crate::{
    domain::validation::{Val, V},
    infra::validation::Field,
};

use super::parse::parse_date;

pub fn date_min(valid: &'static str, f: &Field) -> Result<(), V> {
    match &f.value {
        Val::Str(str_value) => {
            let valid_dt = parse_date(&String::from(valid)).map_err(|_| V::DateMin(valid))?;
            let value_dt = parse_date(str_value).map_err(|_| V::DateMin(valid))?;
            if value_dt.0 < valid_dt.0 {
                return Err(V::DateMin(valid));
            }
            if value_dt.0 == valid_dt.0 && value_dt.1 < valid_dt.1 {
                return Err(V::DateMin(valid));
            }
            if value_dt.0 == valid_dt.0 && value_dt.1 == valid_dt.1 && value_dt.2 < valid_dt.2 {
                return Err(V::DateMin(valid));
            }
            Ok(())
        }
        Val::None => {
            if !f.has_required {
                Ok(())
            } else {
                Err(V::DateMin(valid))
            }
        }
        _ => Err(V::DateMin(valid)),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::{
        f_arr_stub, f_bool_stub, f_num_f_stub, f_num_i_stub, f_num_u_stub, f_obj_stub,
    };

    use super::*;

    #[test]
    fn test_date_min_ok() {
        assert_eq!(date_min("2026-10-28", &Field::of(Val::None)), Ok(()));
        assert_eq!(date_min("2026-10-28", &Field::of(Val::Str(String::from("2026-10-28")))), Ok(()));
        assert_eq!(date_min("2026-10-28", &Field::of(Val::Str(String::from("2026-10-29")))), Ok(()));
        assert_eq!(date_min("2026-10-28", &Field::of(Val::Str(String::from("2026-11-01")))), Ok(()));
        assert_eq!(date_min("2026-10-28", &Field::of(Val::Str(String::from("2027-01-01")))), Ok(()));
        assert_eq!(date_min("2026-10-28", &Field::of(Val::Str(String::from("2027-12-31")))), Ok(()));
    }

    #[test]
    fn test_date_min_err() {
        assert_eq!(
            date_min("2026-1028", &Field::of(Val::Str(String::from("2026-1027")))),
            Err(V::DateMin("2026-1028"))
        );
        assert_eq!(
            date_min("202610-28", &Field::of(Val::Str(String::from("202610-27")))),
            Err(V::DateMin("202610-28"))
        );
        assert_eq!(
            date_min("2026-10-28", &Field::of(Val::Str(String::from("2026-10-27")))),
            Err(V::DateMin("2026-10-28"))
        );
        assert_eq!(
            date_min("2026-10-28", &Field::of(Val::Str(String::from("2026-09-30")))),
            Err(V::DateMin("2026-10-28"))
        );
        assert_eq!(
            date_min("2026-10-28", &Field::of(Val::Str(String::from("2025-12-31")))),
            Err(V::DateMin("2026-10-28"))
        );
        assert_eq!(
            date_min("2026-10-28", &Field::of(Val::Str(String::from("2025-01-01")))),
            Err(V::DateMin("2026-10-28"))
        );
    }

    #[test]
    fn test_date_min_type_err() {
        assert_eq!(date_min("1970-01-01", &f_num_u_stub()), Err(V::DateMin("1970-01-01")));
        assert_eq!(date_min("1970-01-01", &f_num_i_stub()), Err(V::DateMin("1970-01-01")));
        assert_eq!(date_min("1970-01-01", &f_num_f_stub()), Err(V::DateMin("1970-01-01")));
        assert_eq!(date_min("1970-01-01", &f_bool_stub()), Err(V::DateMin("1970-01-01")));
        assert_eq!(date_min("1970-01-01", &f_arr_stub()), Err(V::DateMin("1970-01-01")));
        assert_eq!(date_min("1970-01-01", &f_obj_stub()), Err(V::DateMin("1970-01-01")));
    }

    #[test]
    fn test_date_min_required() {
        assert_eq!(date_min("1970-01-01", &Field::default()), Ok(()));
        assert_eq!(date_min("1970-01-01", &Field::required()), Err(V::DateMin("1970-01-01")));
    }
}
