use crate::{
    domain::validation::{NumIMaxErr, Val},
    infra::validation::Field,
};

pub fn num_i_max(valid: i64, f: &Field) -> Result<(), NumIMaxErr> {
    match f.value {
        Val::Num(num_u, num_i, num_f) => {
            if let Some(num_i) = num_i {
                if num_i <= valid {
                    return Ok(());
                }
            }
            return Err(NumIMaxErr(f.name));
        }
        Val::None => {
            if f.has_required {
                Err(NumIMaxErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(NumIMaxErr(f.name)),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::f_obj_stub;

    use super::*;

    #[test]
    fn test_num_max_ok() {
        assert_eq!(num_i_max(22, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_i_max(22, &Field::of(Val::Num(None, Some(22), None,))), Ok(()));
        assert_eq!(num_i_max(22, &Field::of(Val::Num(None, Some(21), None,))), Ok(()));
        assert_eq!(num_i_max(22, &Field::of(Val::Num(None, Some(-1943), None,))), Ok(()));
    }

    #[test]
    fn test_num_max_err() {
        assert_eq!(
            num_i_max(10, &Field::of(Val::Num(None, Some(11), None,))),
            Err(NumIMaxErr("foo"))
        );
        assert_eq!(
            num_i_max(10, &Field::of(Val::Num(None, Some(12), None,))),
            Err(NumIMaxErr("foo"))
        );
    }

    #[test]
    fn test_wrong_type_err() {
        assert_eq!(num_i_max(-42, &f_obj_stub()), Err(NumIMaxErr("foo")));
    }

    #[test]
    fn test_none_not_required() {
        assert_eq!(num_i_max(-42, &Field::default()), Ok(()));
    }

    #[test]
    fn test_none_required() {
        assert_eq!(num_i_max(-42, &Field::required()), Err(NumIMaxErr("foo")));
    }
}
