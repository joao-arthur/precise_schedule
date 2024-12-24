use crate::{
    domain::validation::{V, Val},
    infra::validation::Field,
};

use super::parse::parse_dt;

pub fn dt(f: &Field) -> Result<(), V> {
    match &f.value {
        Val::Str(str_value) => match parse_dt(str_value) {
            Err(_) => Err(V::Dt),
            Ok(_) => Ok(()),
        },
        Val::None => {
            if f.has_required {
                Err(V::Dt)
            } else {
                Ok(())
            }
        }
        _ => Err(V::Dt),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::{
        f_arr_stub, f_bool_stub, f_num_f_stub, f_num_i_stub, f_num_u_stub, f_obj_stub,
    };

    use super::*;

    #[test]
    fn test_dt_ok() {
        assert_eq!(dt(&Field::of(Val::None)), Ok(()));
        assert_eq!(dt(&Field::of(Val::Str(String::from("2026-10-28")))), Ok(()));
    }

    #[test]
    fn test_dt_err() {
        assert_eq!(dt(&Field::of(Val::Str(String::from("28-10-2026")))), Err(V::Dt));
        assert_eq!(dt(&Field::of(Val::Str(String::from("28-102026")))), Err(V::Dt));
        assert_eq!(dt(&Field::of(Val::Str(String::from("2810-2026")))), Err(V::Dt));
        assert_eq!(dt(&Field::of(Val::Str(String::from("10-2026-28")))), Err(V::Dt));
        assert_eq!(dt(&Field::of(Val::Str(String::from("26-10-28")))), Err(V::Dt));
        assert_eq!(dt(&Field::of(Val::Str(String::from("026-10-28")))), Err(V::Dt));
        assert_eq!(dt(&Field::of(Val::Str(String::from("2026/10/28")))), Err(V::Dt));
        assert_eq!(dt(&Field::of(Val::Str(String::from("2026 10 28 ")))), Err(V::Dt));
        assert_eq!(dt(&Field::of(Val::Str(String::from("20261028")))), Err(V::Dt));
    }

    #[test]
    fn test_dt_type_err() {
        assert_eq!(dt(&f_num_u_stub()), Err(V::Dt));
        assert_eq!(dt(&f_num_i_stub()), Err(V::Dt));
        assert_eq!(dt(&f_num_f_stub()), Err(V::Dt));
        assert_eq!(dt(&f_bool_stub()), Err(V::Dt));
        assert_eq!(dt(&f_arr_stub()), Err(V::Dt));
        assert_eq!(dt(&f_obj_stub()), Err(V::Dt));
    }

    #[test]
    fn test_dt_required() {
        assert_eq!(dt(&Field::default()), Ok(()));
        assert_eq!(dt(&Field::required()), Err(V::Dt));
    }
}
