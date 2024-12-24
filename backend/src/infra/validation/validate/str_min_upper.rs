use crate::{
    domain::validation::{Val, V},
    infra::validation::Field,
};

pub fn str_min_upper(valid: u32, f: &Field) -> Result<(), V> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value.chars().filter(|c| c.is_alphabetic() && c.is_uppercase()).count() as u32
                >= valid
            {
                Ok(())
            } else {
                Err(V::StrMinUpper(valid))
            }
        }
        Val::None => {
            if !f.has_required {
                Ok(())
            } else {
                Err(V::StrMinUpper(valid))
            }
        }
        _ => Err(V::StrMinUpper(valid)),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::{
        f_arr_stub, f_bool_stub, f_num_f_stub, f_num_i_stub, f_num_u_stub, f_obj_stub,
    };

    use super::*;

    #[test]
    fn test_str_min_upper_ok() {
        assert_eq!(str_min_upper(1, &Field::of(Val::None)), Ok(()));
        assert_eq!(str_min_upper(1, &Field::of(Val::Str(String::from("John")))), Ok(()));
        assert_eq!(str_min_upper(2, &Field::of(Val::Str(String::from("JoHn")))), Ok(()));
        assert_eq!(str_min_upper(3, &Field::of(Val::Str(String::from("JoHN")))), Ok(()));
        assert_eq!(str_min_upper(4, &Field::of(Val::Str(String::from("JOHN")))), Ok(()));
    }

    #[test]
    fn test_str_min_upper_err() {
        assert_eq!(
            str_min_upper(4, &Field::of(Val::Str(String::from("JOHn")))),
            Err(V::StrMinUpper(4))
        );
        assert_eq!(
            str_min_upper(4, &Field::of(Val::Str(String::from("JOhn")))),
            Err(V::StrMinUpper(4))
        );
    }

    #[test]
    fn test_str_min_upper_type_err() {
        assert_eq!(str_min_upper(1, &f_num_u_stub()), Err(V::StrMinUpper(1)));
        assert_eq!(str_min_upper(1, &f_num_i_stub()), Err(V::StrMinUpper(1)));
        assert_eq!(str_min_upper(1, &f_num_f_stub()), Err(V::StrMinUpper(1)));
        assert_eq!(str_min_upper(1, &f_bool_stub()), Err(V::StrMinUpper(1)));
        assert_eq!(str_min_upper(1, &f_arr_stub()), Err(V::StrMinUpper(1)));
        assert_eq!(str_min_upper(1, &f_obj_stub()), Err(V::StrMinUpper(1)));
    }

    #[test]
    fn test_str_min_upper_required() {
        assert_eq!(str_min_upper(1, &Field::default()), Ok(()));
        assert_eq!(str_min_upper(1, &Field::required()), Err(V::StrMinUpper(1)));
    }
}
