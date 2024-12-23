use crate::{
    domain::validation::{NumUExactErr, Val},
    infra::validation::Field,
};

pub fn num_u_exact(valid: u64, f: &Field) -> Result<(), NumUExactErr> {
    match f.value {
        Val::Num(num_u, num_i, num_f) => {
            if num_u == Some(valid) {
                Ok(())
            } else {
                Err(NumUExactErr(f.name))
            }
        }
        Val::None => {
            if f.has_required {
                Err(NumUExactErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(NumUExactErr(f.name)),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::f_obj_stub;

    use super::*;

    #[test]
    fn test_num_exact_ok() {
        assert_eq!(num_u_exact(42, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_u_exact(42, &Field::of(Val::Num(Some(42), None, None))), Ok(()));
        assert_eq!(num_u_exact(22, &Field::of(Val::Num(Some(22), None, None))), Ok(()));
    }

    #[test]
    fn test_num_exact_err() {
        assert_eq!(
            num_u_exact(10, &Field::of(Val::Num(Some(11), None, None))),
            Err(NumUExactErr("foo"))
        );
        assert_eq!(
            num_u_exact(10, &Field::of(Val::Num(Some(9), None, None))),
            Err(NumUExactErr("foo"))
        );
    }

    #[test]
    fn test_wrong_type_err() {
        assert_eq!(num_u_exact(42, &f_obj_stub()), Err(NumUExactErr("foo")));
    }

    #[test]
    fn test_none_not_required() {
        assert_eq!(num_u_exact(42, &Field::default()), Ok(()));
    }

    #[test]
    fn test_none_required() {
        assert_eq!(num_u_exact(42, &Field::required()), Err(NumUExactErr("foo")));
    }
}
