use crate::{
    domain::validation::{V, Val},
    infra::validation::Field,
};

pub fn str_min_lower(valid: u32, f: &Field) -> Result<(), V> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value.chars().filter(|c| c.is_alphabetic() && c.is_lowercase()).count() as u32 >= valid {
                Ok(())
            } else {
                Err(V::StrMinLower(valid))
            }
        }
        Val::None => {
            if f.has_required {
                Err(V::StrMinLower(valid))
            } else {
                Ok(())
            }
        }
        _ => Err(V::StrMinLower(valid)),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::{
        f_arr_stub, f_bool_stub, f_num_f_stub, f_num_i_stub, f_num_u_stub, f_obj_stub,
    };

    use super::*;

    #[test]
    fn test_str_min_lower_ok() {
        assert_eq!(str_min_lower(1, &Field::of(Val::None)), Ok(()));
        assert_eq!(str_min_lower(1, &Field::of(Val::Str(String::from("PAUl")))), Ok(()));
        assert_eq!(str_min_lower(2, &Field::of(Val::Str(String::from("PAul")))), Ok(()));
        assert_eq!(str_min_lower(3, &Field::of(Val::Str(String::from("Paul")))), Ok(()));
        assert_eq!(str_min_lower(4, &Field::of(Val::Str(String::from("paul")))), Ok(()));
    }

    #[test]
    fn test_str_min_lower_err() {
        assert_eq!(
            str_min_lower(4, &Field::of(Val::Str(String::from("PaUL")))),
            Err(V::StrMinLower(4))
        );
        assert_eq!(
            str_min_lower(4, &Field::of(Val::Str(String::from("PauL")))),
            Err(V::StrMinLower(4))
        );
    }

    #[test]
    fn test_str_min_lower_type_err() {
        assert_eq!(str_min_lower(1, &f_num_u_stub()), Err(V::StrMinLower(1)));
        assert_eq!(str_min_lower(1, &f_num_i_stub()), Err(V::StrMinLower(1)));
        assert_eq!(str_min_lower(1, &f_num_f_stub()), Err(V::StrMinLower(1)));
        assert_eq!(str_min_lower(1, &f_bool_stub()), Err(V::StrMinLower(1)));
        assert_eq!(str_min_lower(1, &f_arr_stub()), Err(V::StrMinLower(1)));
        assert_eq!(str_min_lower(1, &f_obj_stub()), Err(V::StrMinLower(1)));
    }

    #[test]
    fn test_str_min_lower_required() {
        assert_eq!(str_min_lower(1, &Field::default()), Ok(()));
        assert_eq!(str_min_lower(1, &Field::required()), Err(V::StrMinLower(1)));
    }
}
