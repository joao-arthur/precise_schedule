use crate::{
    domain::validation::{StrMinSpecialErr, Val},
    infra::validation::Field,
};

pub fn str_min_special(valid: u32, f: &Field) -> Result<(), StrMinSpecialErr> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value.chars().filter(|c| c.is_ascii_punctuation()).count() as u32 >= valid {
                Ok(())
            } else {
                Err(StrMinSpecialErr(f.name))
            }
        }
        Val::None => {
            if f.has_required {
                Err(StrMinSpecialErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(StrMinSpecialErr(f.name)),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::f_obj_stub;

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
            Err(StrMinSpecialErr("foo"))
        );
        assert_eq!(
            str_min_special(10, &Field::of(Val::Str(String::from("pressure")))),
            Err(StrMinSpecialErr("foo"))
        );
    }

    #[test]
    fn test_wrong_type_err() {
        assert_eq!(str_min_special(1, &f_obj_stub()), Err(StrMinSpecialErr("foo")));
    }

    #[test]
    fn test_none_not_required() {
        assert_eq!(str_min_special(1, &Field::default()), Ok(()));
    }

    #[test]
    fn test_none_required() {
        assert_eq!(str_min_special(1, &Field::required()), Err(StrMinSpecialErr("foo")));
    }
}
