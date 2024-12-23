use crate::{
    domain::validation::{NumUMaxErr, Val},
    infra::validation::Field,
};

pub fn num_u_max(valid: u64, f: &Field) -> Result<(), NumUMaxErr> {
    match f.value {
        Val::Num(num_u, num_i, num_f) => {
            if let Some(num_u) = num_u {
                if num_u <= valid {
                    return Ok(());
                }
            }
            return Err(NumUMaxErr(f.name));
        }
        Val::None => {
            if f.has_required {
                Err(NumUMaxErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(NumUMaxErr(f.name)),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::f_obj_stub;

    use super::*;

    #[test]
    fn test_num_max_ok() {
        assert_eq!(num_u_max(22, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_u_max(22, &Field::of(Val::Num(Some(22), None, None))), Ok(()));
        assert_eq!(num_u_max(22, &Field::of(Val::Num(Some(21), None, None))), Ok(()));
        assert_eq!(num_u_max(22, &Field::of(Val::Num(Some(0), None, None))), Ok(()));
    }

    #[test]
    fn test_num_max_err() {
        assert_eq!(
            num_u_max(10, &Field::of(Val::Num(Some(11), None, None))),
            Err(NumUMaxErr("foo"))
        );
        assert_eq!(
            num_u_max(10, &Field::of(Val::Num(Some(12), None, None))),
            Err(NumUMaxErr("foo"))
        );
    }

    #[test]
    fn test_wrong_type_err() {
        assert_eq!(num_u_max(42, &f_obj_stub()), Err(NumUMaxErr("foo")));
    }

    #[test]
    fn test_none_not_required() {
        assert_eq!(num_u_max(42, &Field::default()), Ok(()));
    }

    #[test]
    fn test_none_required() {
        assert_eq!(num_u_max(42, &Field::required()), Err(NumUMaxErr("foo")));
    }
}
