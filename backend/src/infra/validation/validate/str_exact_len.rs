use crate::{
    domain::validation::{StrExactLenErr, Val},
    infra::validation::Field,
};

pub fn str_exact_len(valid: u32, f: &Field) -> Result<(), StrExactLenErr> {
    match &f.value {
        Val::Str(str_value) => {
            if str_value.chars().count() as u32 == valid {
                Ok(())
            } else {
                Err(StrExactLenErr(f.name))
            }
        }
        Val::None => {
            if f.has_required {
                Err(StrExactLenErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(StrExactLenErr(f.name)),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::f_obj_stub;

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
            Err(StrExactLenErr("foo"))
        );
        assert_eq!(
            str_exact_len(6, &Field::of(Val::Str(String::from("the sky")))),
            Err(StrExactLenErr("foo"))
        );
    }

    #[test]
    fn test_wrong_type_err() {
        assert_eq!(str_exact_len(1, &f_obj_stub()), Err(StrExactLenErr("foo")));
    }

    #[test]
    fn test_none_not_required() {
        assert_eq!(str_exact_len(1, &Field::default()), Ok(()));
    }

    #[test]
    fn test_none_required() {
        assert_eq!(str_exact_len(1, &Field::required()), Err(StrExactLenErr("foo")));
    }
}
