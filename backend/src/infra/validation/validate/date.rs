use crate::{
    domain::validation::{Val, V},
    infra::validation::Field,
};

use super::parse::parse_date;

pub fn date(f: &Field) -> Result<(), V> {
    match &f.value {
        Val::Str(str_value) => match parse_date(str_value) {
            Err(_) => Err(V::Date),
            Ok(_) => Ok(()),
        },
        Val::None => {
            if !f.has_required {
                Ok(())
            } else {
                Err(V::Date)
            }
        }
        _ => Err(V::Date),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::{
        f_arr_stub, f_bool_stub, f_num_f_stub, f_num_i_stub, f_num_u_stub, f_obj_stub,
    };

    use super::*;

    #[test]
    fn test_date_ok() {
        assert_eq!(date(&Field::of(Val::None)), Ok(()));
        assert_eq!(date(&Field::of(Val::Str(String::from("2026-10-28")))), Ok(()));
    }

    #[test]
    fn test_date_err() {
        assert_eq!(date(&Field::of(Val::Str(String::from("28-10-2026")))), Err(V::Date));
        assert_eq!(date(&Field::of(Val::Str(String::from("28-102026")))), Err(V::Date));
        assert_eq!(date(&Field::of(Val::Str(String::from("2810-2026")))), Err(V::Date));
        assert_eq!(date(&Field::of(Val::Str(String::from("10-2026-28")))), Err(V::Date));
        assert_eq!(date(&Field::of(Val::Str(String::from("26-10-28")))), Err(V::Date));
        assert_eq!(date(&Field::of(Val::Str(String::from("026-10-28")))), Err(V::Date));
        assert_eq!(date(&Field::of(Val::Str(String::from("2026/10/28")))), Err(V::Date));
        assert_eq!(date(&Field::of(Val::Str(String::from("2026 10 28 ")))), Err(V::Date));
        assert_eq!(date(&Field::of(Val::Str(String::from("20261028")))), Err(V::Date));
    }

    #[test]
    fn test_date_type_err() {
        assert_eq!(date(&f_num_u_stub()), Err(V::Date));
        assert_eq!(date(&f_num_i_stub()), Err(V::Date));
        assert_eq!(date(&f_num_f_stub()), Err(V::Date));
        assert_eq!(date(&f_bool_stub()), Err(V::Date));
        assert_eq!(date(&f_arr_stub()), Err(V::Date));
        assert_eq!(date(&f_obj_stub()), Err(V::Date));
    }

    #[test]
    fn test_date_required() {
        assert_eq!(date(&Field::default()), Ok(()));
        assert_eq!(date(&Field::required()), Err(V::Date));
    }
}
