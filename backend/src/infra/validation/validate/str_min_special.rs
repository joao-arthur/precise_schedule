use crate::{
    domain::validation::{Val, V},
    infra::validation::Field,
};

pub fn str_min_special(valid: u32, f: &Field) -> Result<(), V> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value.chars().filter(|c| c.is_ascii_punctuation()).count() as u32 >= valid {
                Ok(())
            } else {
                Err(V::StrMinSpecial(valid))
            }
        }
        Val::None => {
            if !f.has_required {
                Ok(())
            } else {
                Err(V::StrMinSpecial(valid))
            }
        }
        _ => Err(V::StrMinSpecial(valid)),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::{
        f_arr_stub, f_bool_stub, f_num_f_stub, f_num_i_stub, f_num_u_stub, f_obj_stub,
    };

    use super::*;

    #[test]
    fn test_str_min_special_ok() {
        assert_eq!(str_min_special(1, &Field::of(Val::None)), Ok(()));
        assert_eq!(str_min_special(1, &Field::of(Val::Str(String::from(":")))), Ok(()));
        assert_eq!(str_min_special(2, &Field::of(Val::Str(String::from(":~")))), Ok(()));
        assert_eq!(str_min_special(10, &Field::of(Val::Str(String::from("!@#$%&*()+-")))), Ok(()));
    }

    #[test]
    fn test_str_min_special_err() {
        assert_eq!(
            str_min_special(10, &Field::of(Val::Str(String::from("!@#$%¨&*(")))),
            Err(V::StrMinSpecial(10))
        );
        assert_eq!(
            str_min_special(10, &Field::of(Val::Str(String::from("pressure")))),
            Err(V::StrMinSpecial(10))
        );
    }

    #[test]
    fn test_str_min_special_type_err() {
        assert_eq!(str_min_special(1, &f_num_u_stub()), Err(V::StrMinSpecial(1)));
        assert_eq!(str_min_special(1, &f_num_i_stub()), Err(V::StrMinSpecial(1)));
        assert_eq!(str_min_special(1, &f_num_f_stub()), Err(V::StrMinSpecial(1)));
        assert_eq!(str_min_special(1, &f_bool_stub()), Err(V::StrMinSpecial(1)));
        assert_eq!(str_min_special(1, &f_arr_stub()), Err(V::StrMinSpecial(1)));
        assert_eq!(str_min_special(1, &f_obj_stub()), Err(V::StrMinSpecial(1)));
    }

    #[test]
    fn test_str_min_special_required() {
        assert_eq!(str_min_special(1, &Field::default()), Ok(()));
        assert_eq!(str_min_special(1, &Field::required()), Err(V::StrMinSpecial(1)));
    }
}
