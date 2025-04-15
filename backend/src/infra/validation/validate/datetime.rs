use crate::{
    domain::validation::{Val, V},
    infra::validation::Field,
};

use super::parse::parse_iso;

pub fn datetime(f: &Field) -> Result<(), V> {
    match &f.value {
        Val::Str(str_value) => match parse_iso(str_value) {
            Err(_) => Err(V::Datetime),
            Ok(_) => Ok(()),
        },
        Val::None => {
            if !f.has_required {
                Ok(())
            } else {
                Err(V::Datetime)
            }
        }
        _ => Err(V::Datetime),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::{
        f_arr_stub, f_bool_stub, f_num_f_stub, f_num_i_stub, f_num_u_stub, f_obj_stub,
    };

    use super::datetime;

    #[test]
    fn test_date_ok() {
        assert_eq!(datetime(&Field::of(Val::None)), Ok(()));
        assert_eq!(datetime(&Field::of(Val::Str(String::from("2026-10-28T10:27Z")))), Ok(()));
    }

    #[test]
    fn test_date_err() {
        assert_eq!(datetime(&Field::of(Val::Str(String::from("2026-10-28T10:27:29Z")))), Err(V::Datetime));
        assert_eq!(datetime(&Field::of(Val::Str(String::from("2026-10-28T10:27:29.973Z")))), Err(V::Datetime));
        assert_eq!(datetime(&Field::of(Val::Str(String::from("10-2026-28T10:27:29.973Z")))), Err(V::Datetime));
        assert_eq!(datetime(&Field::of(Val::Str(String::from("28-10-2026T10:27:29.973Z")))), Err(V::Datetime));
    }

    #[test]
    fn test_date_type_err() {
        assert_eq!(datetime(&f_num_u_stub()), Err(V::Datetime));
        assert_eq!(datetime(&f_num_i_stub()), Err(V::Datetime));
        assert_eq!(datetime(&f_num_f_stub()), Err(V::Datetime));
        assert_eq!(datetime(&f_bool_stub()), Err(V::Datetime));
        assert_eq!(datetime(&f_arr_stub()), Err(V::Datetime));
        assert_eq!(datetime(&f_obj_stub()), Err(V::Datetime));
    }

    #[test]
    fn test_date_required() {
        assert_eq!(datetime(&Field::default()), Ok(()));
        assert_eq!(datetime(&Field::required()), Err(V::Datetime));
    }
}
