use crate::{
    domain::validation::{Val, V},
    infra::validation::Field,
};

use super::parse::parse_dt;

pub fn dt_max(valid: &'static str, f: &Field) -> Result<(), V> {
    match &f.value {
        Val::Str(str_value) => {
            let valid_dt = parse_dt(&String::from(valid)).map_err(|_| V::DtMax(valid))?;
            let value_dt = parse_dt(str_value).map_err(|_| V::DtMax(valid))?;

            if value_dt.0 > valid_dt.0 {
                return Err(V::DtMax(valid));
            }
            if value_dt.0 == valid_dt.0 && value_dt.1 > valid_dt.1 {
                return Err(V::DtMax(valid));
            }
            if value_dt.0 == valid_dt.0 && value_dt.1 == valid_dt.1 && value_dt.2 > valid_dt.2 {
                return Err(V::DtMax(valid));
            }
            Ok(())
        }
        Val::None => {
            if !f.has_required {
                Ok(())
            } else {
                Err(V::DtMax(valid))
            }
        }
        _ => Err(V::DtMax(valid)),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::{
        f_arr_stub, f_bool_stub, f_num_f_stub, f_num_i_stub, f_num_u_stub, f_obj_stub,
    };

    use super::*;

    #[test]
    fn test_dt_max_ok() {
        assert_eq!(dt_max("2026-10-28", &Field::of(Val::None)), Ok(()));
        assert_eq!(dt_max("2026-10-28", &Field::of(Val::Str(String::from("2026-10-28")))), Ok(()));
        assert_eq!(dt_max("2026-10-28", &Field::of(Val::Str(String::from("2026-10-27")))), Ok(()));
        assert_eq!(dt_max("2026-10-28", &Field::of(Val::Str(String::from("2026-09-30")))), Ok(()));
        assert_eq!(dt_max("2026-10-28", &Field::of(Val::Str(String::from("2025-12-31")))), Ok(()));
        assert_eq!(dt_max("2026-10-28", &Field::of(Val::Str(String::from("2025-01-01")))), Ok(()));
    }

    #[test]
    fn test_dt_max_err() {
        assert_eq!(
            dt_max("2026-10-28", &Field::of(Val::Str(String::from("2026-10-29")))),
            Err(V::DtMax("2026-10-28"))
        );
        assert_eq!(
            dt_max("2026-10-28", &Field::of(Val::Str(String::from("2026-11-01")))),
            Err(V::DtMax("2026-10-28"))
        );
        assert_eq!(
            dt_max("2026-10-28", &Field::of(Val::Str(String::from("2027-01-01")))),
            Err(V::DtMax("2026-10-28"))
        );
        assert_eq!(
            dt_max("2026-10-28", &Field::of(Val::Str(String::from("2027-12-31")))),
            Err(V::DtMax("2026-10-28"))
        );
    }

    #[test]
    fn test_dt_max_type_err() {
        assert_eq!(dt_max("2099-12-31", &f_num_u_stub()), Err(V::DtMax("2099-12-31")));
        assert_eq!(dt_max("2099-12-31", &f_num_i_stub()), Err(V::DtMax("2099-12-31")));
        assert_eq!(dt_max("2099-12-31", &f_num_f_stub()), Err(V::DtMax("2099-12-31")));
        assert_eq!(dt_max("2099-12-31", &f_bool_stub()), Err(V::DtMax("2099-12-31")));
        assert_eq!(dt_max("2099-12-31", &f_arr_stub()), Err(V::DtMax("2099-12-31")));
        assert_eq!(dt_max("2099-12-31", &f_obj_stub()), Err(V::DtMax("2099-12-31")));
    }

    #[test]
    fn test_dt_max_required() {
        assert_eq!(dt_max("2099-12-31", &Field::default()), Ok(()));
        assert_eq!(dt_max("2099-12-31", &Field::required()), Err(V::DtMax("2099-12-31")));
    }
}