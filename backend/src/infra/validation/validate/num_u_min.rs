use crate::{
    domain::validation::{NumUMinErr, Val},
    infra::validation::Field,
};

pub fn num_u_min(valid: u64, f: &Field) -> Result<(), NumUMinErr> {
    match f.value {
        Val::Num(num_u, num_i, num_f) => {
            if let Some(num_u) = num_u {
                if num_u >= valid {
                    return Ok(());
                }
            }
            Err(NumUMinErr(f.name))
        }
        Val::None => {
            if f.has_required {
                Err(NumUMinErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(NumUMinErr(f.name)),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::{
        f_arr_stub, f_bool_stub, f_num_f_stub, f_num_i_stub, f_obj_stub, f_str_stub,
    };

    use super::*;

    #[test]
    fn test_num_u_min_ok() {
        assert_eq!(num_u_min(42, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_u_min(42, &Field::of(Val::Num(Some(42), None, None))), Ok(()));
        assert_eq!(num_u_min(42, &Field::of(Val::Num(Some(43), None, None))), Ok(()));
        assert_eq!(num_u_min(42, &Field::of(Val::Num(Some(100), None, None))), Ok(()));
    }

    #[test]
    fn test_num_u_min_err() {
        assert_eq!(
            num_u_min(10, &Field::of(Val::Num(Some(9), None, None))),
            Err(NumUMinErr("foo"))
        );
        assert_eq!(
            num_u_min(10, &Field::of(Val::Num(Some(8), None, None))),
            Err(NumUMinErr("foo"))
        );
    }

    #[test]
    fn test_num_u_min_type_err() {
        assert_eq!(num_u_min(42, &f_num_i_stub()), Err(NumUMinErr("foo")));
        assert_eq!(num_u_min(42, &f_num_f_stub()), Err(NumUMinErr("foo")));
        assert_eq!(num_u_min(42, &f_str_stub()), Err(NumUMinErr("foo")));
        assert_eq!(num_u_min(42, &f_bool_stub()), Err(NumUMinErr("foo")));
        assert_eq!(num_u_min(42, &f_arr_stub()), Err(NumUMinErr("foo")));
        assert_eq!(num_u_min(42, &f_obj_stub()), Err(NumUMinErr("foo")));
    }

    #[test]
    fn test_num_u_min_required() {
        assert_eq!(num_u_min(42, &Field::default()), Ok(()));
        assert_eq!(num_u_min(42, &Field::required()), Err(NumUMinErr("foo")));
    }
}
