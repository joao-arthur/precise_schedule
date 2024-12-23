use crate::{
    domain::validation::{StrMinNumErr, Val},
    infra::validation::Field,
};

pub fn str_min_num(valid: u32, f: &Field) -> Result<(), StrMinNumErr> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value.chars().filter(|c| c.is_ascii_digit()).count() as u32 >= valid {
                Ok(())
            } else {
                Err(StrMinNumErr(f.name))
            }
        }
        Val::None => {
            if f.has_required {
                Err(StrMinNumErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(StrMinNumErr(f.name)),
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
            Err(StrMinNumErr("foo"))
        );
        assert_eq!(
            str_min_num(3, &Field::of(Val::Str(String::from("we are one thirty 8")))),
            Err(StrMinNumErr("foo"))
        );
    }

    #[test]
    fn test_str_min_num_type_err() {
        assert_eq!(str_min_num(1, &f_num_u_stub()), Err(StrMinNumErr("foo")));
        assert_eq!(str_min_num(1, &f_num_i_stub()), Err(StrMinNumErr("foo")));
        assert_eq!(str_min_num(1, &f_num_f_stub()), Err(StrMinNumErr("foo")));
        assert_eq!(str_min_num(1, &f_bool_stub()), Err(StrMinNumErr("foo")));
        assert_eq!(str_min_num(1, &f_arr_stub()), Err(StrMinNumErr("foo")));
        assert_eq!(str_min_num(1, &f_obj_stub()), Err(StrMinNumErr("foo")));
    }

    #[test]
    fn test_str_min_num_required() {
        assert_eq!(str_min_num(1, &Field::default()), Ok(()));
        assert_eq!(str_min_num(1, &Field::required()), Err(StrMinNumErr("foo")));
    }
}
