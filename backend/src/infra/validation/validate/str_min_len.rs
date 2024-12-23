use crate::{
    domain::validation::{StrMinLenErr, Val},
    infra::validation::Field,
};

pub fn str_min_len(valid: u32, f: &Field) -> Result<(), StrMinLenErr> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value.chars().count() as u32 >= valid {
                Ok(())
            } else {
                Err(StrMinLenErr(f.name))
            }
        }
        Val::None => {
            if f.has_required {
                Err(StrMinLenErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(StrMinLenErr(f.name)),
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
            Err(StrMinLenErr("foo"))
        );
        assert_eq!(
            str_min_len(10, &Field::of(Val::Str(String::from("Nevermor")))),
            Err(StrMinLenErr("foo"))
        );
    }

    #[test]
    fn test_str_min_len_type_err() {
        assert_eq!(str_min_len(1, &f_num_u_stub()), Err(StrMinLenErr("foo")));
        assert_eq!(str_min_len(1, &f_num_i_stub()), Err(StrMinLenErr("foo")));
        assert_eq!(str_min_len(1, &f_num_f_stub()), Err(StrMinLenErr("foo")));
        assert_eq!(str_min_len(1, &f_bool_stub()), Err(StrMinLenErr("foo")));
        assert_eq!(str_min_len(1, &f_arr_stub()), Err(StrMinLenErr("foo")));
        assert_eq!(str_min_len(1, &f_obj_stub()), Err(StrMinLenErr("foo")));
    }

    #[test]
    fn test_str_min_len_required() {
        assert_eq!(str_min_len(1, &Field::default()), Ok(()));
        assert_eq!(str_min_len(1, &Field::required()), Err(StrMinLenErr("foo")));
    }
}
