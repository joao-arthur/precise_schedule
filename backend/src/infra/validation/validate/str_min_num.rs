use crate::{
    domain::validation::{V, Val},
    infra::validation::Field,
};

pub fn str_min_num(valid: u32, f: &Field) -> Result<(), V> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value.chars().filter(|c| c.is_ascii_digit()).count() as u32 >= valid {
                Ok(())
            } else {
                Err(V::StrMinNum(valid))
            }
        }
        Val::None => {
            if f.has_required {
                Err(V::StrMinNum(valid))
            } else {
                Ok(())
            }
        }
        _ => Err(V::StrMinNum(valid)),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::{
        f_arr_stub, f_bool_stub, f_num_f_stub, f_num_i_stub, f_num_u_stub, f_obj_stub,
    };

    use super::*;

    #[test]
    fn test_str_min_num_ok() {
        assert_eq!(str_min_num(1, &Field::of(Val::None)), Ok(()));
        assert_eq!(str_min_num(1, &Field::of(Val::Str(String::from("1")))), Ok(()));
        assert_eq!(str_min_num(2, &Field::of(Val::Str(String::from("10")))), Ok(()));
        assert_eq!(str_min_num(3, &Field::of(Val::Str(String::from("we are 1 3 8")))), Ok(()));
    }

    #[test]
    fn test_str_min_num_err() {
        assert_eq!(
            str_min_num(3, &Field::of(Val::Str(String::from("we are one 3 8")))),
            Err(V::StrMinNum(3))
        );
        assert_eq!(
            str_min_num(3, &Field::of(Val::Str(String::from("we are one thirty 8")))),
            Err(V::StrMinNum(3))
        );
    }

    #[test]
    fn test_str_min_num_type_err() {
        assert_eq!(str_min_num(1, &f_num_u_stub()), Err(V::StrMinNum(1)));
        assert_eq!(str_min_num(1, &f_num_i_stub()), Err(V::StrMinNum(1)));
        assert_eq!(str_min_num(1, &f_num_f_stub()), Err(V::StrMinNum(1)));
        assert_eq!(str_min_num(1, &f_bool_stub()), Err(V::StrMinNum(1)));
        assert_eq!(str_min_num(1, &f_arr_stub()), Err(V::StrMinNum(1)));
        assert_eq!(str_min_num(1, &f_obj_stub()), Err(V::StrMinNum(1)));
    }

    #[test]
    fn test_str_min_num_required() {
        assert_eq!(str_min_num(1, &Field::default()), Ok(()));
        assert_eq!(str_min_num(1, &Field::required()), Err(V::StrMinNum(1)));
    }
}
