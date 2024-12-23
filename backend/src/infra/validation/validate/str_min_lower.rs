use crate::{
    domain::validation::{StrMinLowerErr, Val},
    infra::validation::Field,
};

pub fn str_min_lower(valid: u32, f: &Field) -> Result<(), StrMinLowerErr> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value.chars().filter(|c| c.is_alphabetic() && c.is_lowercase()).count() as u32
                >= valid
            {
                Ok(())
            } else {
                Err(StrMinLowerErr(f.name))
            }
        }
        Val::None => {
            if f.has_required {
                Err(StrMinLowerErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(StrMinLowerErr(f.name)),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::f_obj_stub;

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
            Err(StrMinLowerErr("foo"))
        );
        assert_eq!(
            str_min_lower(4, &Field::of(Val::Str(String::from("PauL")))),
            Err(StrMinLowerErr("foo"))
        );
    }

    #[test]
    fn test_wrong_type_err() {
        assert_eq!(str_min_lower(1, &f_obj_stub()), Err(StrMinLowerErr("foo")));
    }

    #[test]
    fn test_none_not_required() {
        assert_eq!(str_min_lower(1, &Field::default()), Ok(()));
    }

    #[test]
    fn test_none_required() {
        assert_eq!(str_min_lower(1, &Field::required()), Err(StrMinLowerErr("foo")));
    }
}
