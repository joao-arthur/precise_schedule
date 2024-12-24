use crate::{
    domain::validation::{Val, V},
    infra::validation::Field,
};

pub fn str_min_len(valid: u32, f: &Field) -> Result<(), V> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value.chars().count() as u32 >= valid {
                Ok(())
            } else {
                Err(V::StrMinLen(valid))
            }
        }
        Val::None => {
            if !f.has_required {
                Ok(())
            } else {
                Err(V::StrMinLen(valid))
            }
        }
        _ => Err(V::StrMinLen(valid)),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::{
        f_arr_stub, f_bool_stub, f_num_f_stub, f_num_i_stub, f_num_u_stub, f_obj_stub,
    };

    use super::*;

    #[test]
    fn test_str_min_len_ok() {
        assert_eq!(str_min_len(10, &Field::of(Val::None)), Ok(()));
        assert_eq!(str_min_len(10, &Field::of(Val::Str(String::from("Hitchhiker")))), Ok(()));
        assert_eq!(
            str_min_len(10, &Field::of(Val::Str(String::from("Guide to the galaxy")))),
            Ok(())
        );
    }

    #[test]
    fn test_str_min_len_err() {
        assert_eq!(
            str_min_len(10, &Field::of(Val::Str(String::from("Nevermore")))),
            Err(V::StrMinLen(10))
        );
        assert_eq!(
            str_min_len(10, &Field::of(Val::Str(String::from("Nevermor")))),
            Err(V::StrMinLen(10))
        );
    }

    #[test]
    fn test_str_min_len_type_err() {
        assert_eq!(str_min_len(1, &f_num_u_stub()), Err(V::StrMinLen(1)));
        assert_eq!(str_min_len(1, &f_num_i_stub()), Err(V::StrMinLen(1)));
        assert_eq!(str_min_len(1, &f_num_f_stub()), Err(V::StrMinLen(1)));
        assert_eq!(str_min_len(1, &f_bool_stub()), Err(V::StrMinLen(1)));
        assert_eq!(str_min_len(1, &f_arr_stub()), Err(V::StrMinLen(1)));
        assert_eq!(str_min_len(1, &f_obj_stub()), Err(V::StrMinLen(1)));
    }

    #[test]
    fn test_str_min_len_required() {
        assert_eq!(str_min_len(1, &Field::default()), Ok(()));
        assert_eq!(str_min_len(1, &Field::required()), Err(V::StrMinLen(1)));
    }
}
