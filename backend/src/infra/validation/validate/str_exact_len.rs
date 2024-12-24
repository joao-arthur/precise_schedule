use crate::{
    domain::validation::{V, Val},
    infra::validation::Field,
};

pub fn str_exact_len(valid: u32, f: &Field) -> Result<(), V> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value.chars().count() as u32 == valid {
                Ok(())
            } else {
                Err(V::StrExactLen(valid))
            }
        }
        Val::None => {
            if f.has_required {
                Err(V::StrExactLen(valid))
            } else {
                Ok(())
            }
        }
        _ => Err(V::StrExactLen(valid)),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::{
        f_arr_stub, f_bool_stub, f_num_f_stub, f_num_i_stub, f_num_u_stub, f_obj_stub,
    };

    use super::*;

    #[test]
    fn test_str_exact_len_ok() {
        assert_eq!(str_exact_len(10, &Field::of(Val::None)), Ok(()));
        assert_eq!(str_exact_len(2, &Field::of(Val::Str(String::from("so")))), Ok(()));
        assert_eq!(str_exact_len(4, &Field::of(Val::Str(String::from("long")))), Ok(()));
        assert_eq!(str_exact_len(3, &Field::of(Val::Str(String::from("and")))), Ok(()));
        assert_eq!(str_exact_len(6, &Field::of(Val::Str(String::from("thanks")))), Ok(()));
    }

    #[test]
    fn test_str_exact_len_err() {
        assert_eq!(
            str_exact_len(6, &Field::of(Val::Str(String::from("touch")))),
            Err(V::StrExactLen(6))
        );
        assert_eq!(
            str_exact_len(6, &Field::of(Val::Str(String::from("the sky")))),
            Err(V::StrExactLen(6))
        );
    }

    #[test]
    fn test_str_exact_len_type_err() {
        assert_eq!(str_exact_len(1, &f_num_u_stub()), Err(V::StrExactLen(1)));
        assert_eq!(str_exact_len(1, &f_num_i_stub()), Err(V::StrExactLen(1)));
        assert_eq!(str_exact_len(1, &f_num_f_stub()), Err(V::StrExactLen(1)));
        assert_eq!(str_exact_len(1, &f_bool_stub()), Err(V::StrExactLen(1)));
        assert_eq!(str_exact_len(1, &f_arr_stub()), Err(V::StrExactLen(1)));
        assert_eq!(str_exact_len(1, &f_obj_stub()), Err(V::StrExactLen(1)));
    }

    #[test]
    fn test_str_exact_len_required() {
        assert_eq!(str_exact_len(1, &Field::default()), Ok(()));
        assert_eq!(str_exact_len(1, &Field::required()), Err(V::StrExactLen(1)));
    }
}
