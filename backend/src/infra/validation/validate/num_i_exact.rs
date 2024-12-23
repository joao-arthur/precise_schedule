use crate::{
    domain::validation::{NumIExactErr, Val},
    infra::validation::Field,
};

pub fn num_i_exact(valid: i64, f: &Field) -> Result<(), NumIExactErr> {
    match f.value {
        Val::Num(num_u, num_i, num_f) => {
            if num_i == Some(valid) {
                Ok(())
            } else {
                Err(NumIExactErr(f.name))
            }
        }
        Val::None => {
            if f.has_required {
                Err(NumIExactErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(NumIExactErr(f.name)),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::f_obj_stub;

    use super::*;

    #[test]
    fn test_num_exact_ok() {
        assert_eq!(num_i_exact(42, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_i_exact(42, &Field::of(Val::Num(None, Some(42), None,))), Ok(()));
        assert_eq!(num_i_exact(-42, &Field::of(Val::Num(None, Some(-42), None,))), Ok(()));
    }

    #[test]
    fn test_num_exact_err() {
        assert_eq!(
            num_i_exact(-10, &Field::of(Val::Num(None, Some(-11), None,))),
            Err(NumIExactErr("foo"))
        );
        assert_eq!(
            num_i_exact(-10, &Field::of(Val::Num(None, Some(-9), None,))),
            Err(NumIExactErr("foo"))
        );
    }

    #[test]
    fn test_wrong_type_err() {
        assert_eq!(num_i_exact(-42, &f_obj_stub()), Err(NumIExactErr("foo")));
    }

    #[test]
    fn test_none_not_required() {
        assert_eq!(num_i_exact(-42, &Field::default()), Ok(()));
    }

    #[test]
    fn test_none_required() {
        assert_eq!(num_i_exact(-42, &Field::required()), Err(NumIExactErr("foo")));
    }
}
