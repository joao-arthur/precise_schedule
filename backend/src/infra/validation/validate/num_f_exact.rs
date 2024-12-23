use crate::{
    domain::validation::{NumFExactErr, Val},
    infra::validation::Field,
};

pub fn num_f_exact(valid: f64, f: &Field) -> Result<(), NumFExactErr> {
    match f.value {
        Val::Num(num_u, num_i, num_f) => {
            if num_f == Some(valid) {
                Ok(())
            } else {
                Err(NumFExactErr(f.name))
            }
        }
        Val::None => {
            if f.has_required {
                Err(NumFExactErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(NumFExactErr(f.name)),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::f_obj_stub;

    use super::*;

    #[test]
    fn test_num_exact_ok() {
        assert_eq!(num_f_exact(-42.0, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_f_exact(-42.5, &Field::of(Val::Num(None, None, Some(-42.5)))), Ok(()));
        assert_eq!(num_f_exact(42.5, &Field::of(Val::Num(None, None, Some(42.5)))), Ok(()));
    }

    #[test]
    fn test_num_exact_err() {
        assert_eq!(
            num_f_exact(-10.0, &Field::of(Val::Num(None, None, Some(-10.1)))),
            Err(NumFExactErr("foo"))
        );
        assert_eq!(
            num_f_exact(-10.0, &Field::of(Val::Num(None, None, Some(-9.9)))),
            Err(NumFExactErr("foo"))
        );
    }

    #[test]
    fn test_wrong_type_err() {
        assert_eq!(num_f_exact(-42.0, &f_obj_stub()), Err(NumFExactErr("foo")));
    }

    #[test]
    fn test_none_not_required() {
        assert_eq!(num_f_exact(-42.0, &Field::default()), Ok(()));
    }

    #[test]
    fn test_none_required() {
        assert_eq!(num_f_exact(-42.0, &Field::required()), Err(NumFExactErr("foo")));
    }
}
