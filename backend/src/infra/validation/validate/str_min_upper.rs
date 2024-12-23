use crate::{
    domain::validation::{StrMinUpperErr, Val},
    infra::validation::Field,
};

pub fn str_min_upper(valid: u32, f: &Field) -> Result<(), StrMinUpperErr> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value.chars().filter(|c| c.is_alphabetic() && c.is_uppercase()).count() as u32
                >= valid
            {
                Ok(())
            } else {
                Err(StrMinUpperErr(f.name))
            }
        }
        Val::None => {
            if f.has_required {
                Err(StrMinUpperErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(StrMinUpperErr(f.name)),
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
            Err(StrMinUpperErr("foo"))
        );
        assert_eq!(
            str_min_upper(4, &Field::of(Val::Str(String::from("JOhn")))),
            Err(StrMinUpperErr("foo"))
        );
    }

    #[test]
    fn test_str_min_upper_type_err() {
        assert_eq!(str_min_upper(1, &f_num_u_stub()), Err(StrMinUpperErr("foo")));
        assert_eq!(str_min_upper(1, &f_num_i_stub()), Err(StrMinUpperErr("foo")));
        assert_eq!(str_min_upper(1, &f_num_f_stub()), Err(StrMinUpperErr("foo")));
        assert_eq!(str_min_upper(1, &f_bool_stub()), Err(StrMinUpperErr("foo")));
        assert_eq!(str_min_upper(1, &f_arr_stub()), Err(StrMinUpperErr("foo")));
        assert_eq!(str_min_upper(1, &f_obj_stub()), Err(StrMinUpperErr("foo")));
    }

    #[test]
    fn test_str_min_upper_required() {
        assert_eq!(str_min_upper(1, &Field::default()), Ok(()));
        assert_eq!(str_min_upper(1, &Field::required()), Err(StrMinUpperErr("foo")));
    }
}
