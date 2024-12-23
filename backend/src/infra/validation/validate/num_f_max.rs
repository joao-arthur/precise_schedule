use crate::{
    domain::validation::{NumFMaxErr, Val},
    infra::validation::Field,
};

pub fn num_f_max(valid: f64, f: &Field) -> Result<(), NumFMaxErr> {
    match f.value {
        Val::Num(num_u, num_i, num_f) => {
            if let Some(num_f) = num_f {
                if num_f <= valid {
                    return Ok(());
                }
            }
            Err(NumFMaxErr(f.name))
        }
        Val::None => {
            if f.has_required {
                Err(NumFMaxErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(NumFMaxErr(f.name)),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::{
        f_arr_stub, f_bool_stub, f_num_i_stub, f_num_u_stub, f_obj_stub, f_str_stub,
    };

    use super::*;

    #[test]
    fn test_num_f_max_ok() {
        assert_eq!(num_f_max(22.0, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_f_max(22.0, &Field::of(Val::Num(None, None, Some(22.0)))), Ok(()));
        assert_eq!(num_f_max(22.0, &Field::of(Val::Num(None, None, Some(21.9)))), Ok(()));
        assert_eq!(num_f_max(22.0, &Field::of(Val::Num(None, None, Some(21.0)))), Ok(()));
        assert_eq!(num_f_max(22.0, &Field::of(Val::Num(None, None, Some(-1943.0)))), Ok(()));
    }

    #[test]
    fn test_num_f_max_err() {
        assert_eq!(
            num_f_max(10.0, &Field::of(Val::Num(None, None, Some(11.0)))),
            Err(NumFMaxErr("foo"))
        );
        assert_eq!(
            num_f_max(10.0, &Field::of(Val::Num(None, None, Some(12.0)))),
            Err(NumFMaxErr("foo"))
        );
    }

    #[test]
    fn test_num_f_max_type_err() {
        assert_eq!(num_f_max(-42.0, &f_num_u_stub()), Err(NumFMaxErr("foo")));
        assert_eq!(num_f_max(-42.0, &f_num_i_stub()), Err(NumFMaxErr("foo")));
        assert_eq!(num_f_max(-42.0, &f_str_stub()), Err(NumFMaxErr("foo")));
        assert_eq!(num_f_max(-42.0, &f_bool_stub()), Err(NumFMaxErr("foo")));
        assert_eq!(num_f_max(-42.0, &f_arr_stub()), Err(NumFMaxErr("foo")));
        assert_eq!(num_f_max(-42.0, &f_obj_stub()), Err(NumFMaxErr("foo")));
    }

    #[test]
    fn test_num_f_max_required() {
        assert_eq!(num_f_max(-42.0, &Field::default()), Ok(()));
        assert_eq!(num_f_max(-42.0, &Field::required()), Err(NumFMaxErr("foo")));
    }
}
