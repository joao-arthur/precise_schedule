use crate::{
    domain::validation::{StrMaxLenErr, Val},
    infra::validation::Field,
};

pub fn str_max_len(valid: u32, f: &Field) -> Result<(), StrMaxLenErr> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value.chars().count() as u32 <= valid {
                Ok(())
            } else {
                Err(StrMaxLenErr(f.name))
            }
        }
        Val::None => {
            if f.has_required {
                Err(StrMaxLenErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(StrMaxLenErr(f.name)),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::f_obj_stub;

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
            Err(StrMaxLenErr("foo"))
        );
        assert_eq!(
            str_max_len(10, &Field::of(Val::Str(String::from("light that n")))),
            Err(StrMaxLenErr("foo"))
        );
    }

    #[test]
    fn test_wrong_type_err() {
        assert_eq!(str_max_len(1, &f_obj_stub()), Err(StrMaxLenErr("foo")));
    }

    #[test]
    fn test_none_not_required() {
        assert_eq!(str_max_len(1, &Field::default()), Ok(()));
    }

    #[test]
    fn test_none_required() {
        assert_eq!(str_max_len(1, &Field::required()), Err(StrMaxLenErr("foo")));
    }
}
