use crate::{
    domain::validation::{Val, V},
    infra::validation::Field,
};

pub fn str_exact(valid: &'static str, f: &Field) -> Result<(), V> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value == valid {
                Ok(())
            } else {
                Err(V::StrExact(valid))
            }
        }
        Val::None => {
            if !f.has_required {
                Ok(())
            } else {
                Err(V::StrExact(valid))
            }
        }
        _ => Err(V::StrExact(valid)),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::{
        f_arr_stub, f_bool_stub, f_num_f_stub, f_num_i_stub, f_num_u_stub, f_obj_stub,
    };

    use super::*;

    #[test]
    fn test_str_exact_ok() {
        assert_eq!(str_exact("Ai", &Field::of(Val::None)), Ok(()));
        assert_eq!(str_exact("Ai", &Field::of(Val::Str(String::from("Ai")))), Ok(()));
    }

    #[test]
    fn test_str_exact_err() {
        assert_eq!(
            str_exact("TO BE", &Field::of(Val::Str(String::from("to be")))),
            Err(V::StrExact("TO BE"))
        );
    }

    #[test]
    fn test_str_exact_type_err() {
        assert_eq!(str_exact("Hello", &f_num_u_stub()), Err(V::StrExact("Hello")));
        assert_eq!(str_exact("Hello", &f_num_i_stub()), Err(V::StrExact("Hello")));
        assert_eq!(str_exact("Hello", &f_num_f_stub()), Err(V::StrExact("Hello")));
        assert_eq!(str_exact("Hello", &f_bool_stub()), Err(V::StrExact("Hello")));
        assert_eq!(str_exact("Hello", &f_arr_stub()), Err(V::StrExact("Hello")));
        assert_eq!(str_exact("Hello", &f_obj_stub()), Err(V::StrExact("Hello")));
    }

    #[test]
    fn test_str_exact_required() {
        assert_eq!(str_exact("Hello", &Field::default()), Ok(()));
        assert_eq!(str_exact("Hello", &Field::required()), Err(V::StrExact("Hello")));
    }
}
