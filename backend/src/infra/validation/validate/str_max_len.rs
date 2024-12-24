use crate::{
    domain::validation::{V, Val},
    infra::validation::Field,
};

pub fn str_max_len(valid: u32, f: &Field) -> Result<(), V> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value.chars().count() as u32 <= valid {
                Ok(())
            } else {
                Err(V::StrMaxLen(valid))
            }
        }
        Val::None => {
            if f.has_required {
                Err(V::StrMaxLen(valid))
            } else {
                Ok(())
            }
        }
        _ => Err(V::StrMaxLen(valid)),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::{
        f_arr_stub, f_bool_stub, f_num_f_stub, f_num_i_stub, f_num_u_stub, f_obj_stub,
    };

    use super::*;

    #[test]
    fn test_str_max_len_ok() {
        assert_eq!(str_max_len(10, &Field::of(Val::None)), Ok(()));
        assert_eq!(str_max_len(10, &Field::of(Val::Str(String::from("restaurant")))), Ok(()));
        assert_eq!(str_max_len(10, &Field::of(Val::Str(String::from("at the end")))), Ok(()));
        assert_eq!(str_max_len(10, &Field::of(Val::Str(String::from("of the")))), Ok(()));
        assert_eq!(str_max_len(10, &Field::of(Val::Str(String::from("universe")))), Ok(()));
    }

    #[test]
    fn test_str_max_len_err() {
        assert_eq!(
            str_max_len(10, &Field::of(Val::Str(String::from("there is a ")))),
            Err(V::StrMaxLen(10))
        );
        assert_eq!(
            str_max_len(10, &Field::of(Val::Str(String::from("light that n")))),
            Err(V::StrMaxLen(10))
        );
    }

    #[test]
    fn test_str_max_len_type_err() {
        assert_eq!(str_max_len(1, &f_num_u_stub()), Err(V::StrMaxLen(1)));
        assert_eq!(str_max_len(1, &f_num_i_stub()), Err(V::StrMaxLen(1)));
        assert_eq!(str_max_len(1, &f_num_f_stub()), Err(V::StrMaxLen(1)));
        assert_eq!(str_max_len(1, &f_bool_stub()), Err(V::StrMaxLen(1)));
        assert_eq!(str_max_len(1, &f_arr_stub()), Err(V::StrMaxLen(1)));
        assert_eq!(str_max_len(1, &f_obj_stub()), Err(V::StrMaxLen(1)));
    }

    #[test]
    fn test_str_max_len_required() {
        assert_eq!(str_max_len(1, &Field::default()), Ok(()));
        assert_eq!(str_max_len(1, &Field::required()), Err(V::StrMaxLen(1)));
    }
}
