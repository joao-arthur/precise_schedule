use crate::{
    domain::validation::{NumIMinErr, Val},
    infra::validation::Field,
};

pub fn num_i_min(valid: i64, f: &Field) -> Result<(), NumIMinErr> {
    match f.value {
        Val::Num(num_u, num_i, num_f) => {
            if let Some(num_i) = num_i {
                if num_i >= valid {
                    return Ok(());
                }
            }
            return Err(NumIMinErr(f.name));
        }
        Val::None => {
            if f.has_required {
                Err(NumIMinErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(NumIMinErr(f.name)),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::{
        f_arr_stub, f_bool_stub, f_num_f_stub, f_num_u_stub, f_obj_stub, f_str_stub,
    };

    use super::*;

    #[test]
    fn test_num_i_min_ok() {
        assert_eq!(num_i_min(-42, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_i_min(-42, &Field::of(Val::Num(None, Some(-42), None))), Ok(()));
        assert_eq!(num_i_min(-42, &Field::of(Val::Num(None, Some(-41), None))), Ok(()));
        assert_eq!(num_i_min(-42, &Field::of(Val::Num(None, Some(22), None))), Ok(()));
    }

    #[test]
    fn test_num_i_min_err() {
        assert_eq!(
            num_i_min(-10, &Field::of(Val::Num(None, Some(-11), None))),
            Err(NumIMinErr("foo"))
        );
        assert_eq!(
            num_i_min(-10, &Field::of(Val::Num(None, Some(-12), None))),
            Err(NumIMinErr("foo"))
        );
    }

    #[test]
    fn test_num_i_min_type_err() {
        assert_eq!(num_i_min(-42, &f_num_u_stub()), Err(NumIMinErr("foo")));
        assert_eq!(num_i_min(-42, &f_num_f_stub()), Err(NumIMinErr("foo")));
        assert_eq!(num_i_min(-42, &f_str_stub()), Err(NumIMinErr("foo")));
        assert_eq!(num_i_min(-42, &f_bool_stub()), Err(NumIMinErr("foo")));
        assert_eq!(num_i_min(-42, &f_arr_stub()), Err(NumIMinErr("foo")));
        assert_eq!(num_i_min(-42, &f_obj_stub()), Err(NumIMinErr("foo")));
    }

    #[test]
    fn test_num_i_min_required() {
        assert_eq!(num_i_min(-42, &Field::default()), Ok(()));
        assert_eq!(num_i_min(-42, &Field::required()), Err(NumIMinErr("foo")));
    }
}
