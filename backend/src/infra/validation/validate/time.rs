use crate::{
    domain::validation::{Val, V},
    infra::validation::Field,
};

use super::parse::parse_time;

pub fn time(f: &Field) -> Result<(), V> {
    match &f.value {
        Val::Str(str_value) => match parse_time(str_value) {
            Err(_) => Err(V::Time),
            Ok(_) => Ok(()),
        },
        Val::None => {
            if !f.has_required {
                Ok(())
            } else {
                Err(V::Time)
            }
        }
        _ => Err(V::Time),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::{
        f_arr_stub, f_bool_stub, f_num_f_stub, f_num_i_stub, f_num_u_stub, f_obj_stub,
    };

    use super::time;

    #[test]
    fn test_time_ok() {
        assert_eq!(time(&Field::of(Val::None)), Ok(()));
        assert_eq!(time(&Field::of(Val::Str(String::from("10:27")))), Ok(()));
    }

    #[test]
    fn test_time_err() {
        assert_eq!(time(&Field::of(Val::Str(String::from("10:27:24")))), Err(V::Time));
        assert_eq!(time(&Field::of(Val::Str(String::from("10:27:23.235")))), Err(V::Time));
        assert_eq!(time(&Field::of(Val::Str(String::from("1027")))), Err(V::Time));
        assert_eq!(time(&Field::of(Val::Str(String::from("102")))), Err(V::Time));
        assert_eq!(time(&Field::of(Val::Str(String::from("10")))), Err(V::Time));
        assert_eq!(time(&Field::of(Val::Str(String::from("1")))), Err(V::Time));
    }

    #[test]
    fn test_time_type_err() {
        assert_eq!(time(&f_num_u_stub()), Err(V::Time));
        assert_eq!(time(&f_num_i_stub()), Err(V::Time));
        assert_eq!(time(&f_num_f_stub()), Err(V::Time));
        assert_eq!(time(&f_bool_stub()), Err(V::Time));
        assert_eq!(time(&f_arr_stub()), Err(V::Time));
        assert_eq!(time(&f_obj_stub()), Err(V::Time));
    }

    #[test]
    fn test_time_required() {
        assert_eq!(time(&Field::default()), Ok(()));
        assert_eq!(time(&Field::required()), Err(V::Time));
    }
}
