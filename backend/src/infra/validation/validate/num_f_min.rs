use crate::{
    domain::validation::{V, Val},
    infra::validation::Field,
};

pub fn num_f_min(valid: f64, f: &Field) -> Result<(), V> {
    match f.value {
        Val::Num(_num_u, _num_i, num_f) => {
            if let Some(num_f) = num_f {
                if num_f >= valid {
                    return Ok(());
                }
            }
            return Err(V::NumFMin(valid));
        }
        Val::None => {
            if !f.has_required {
                Ok(())
            } else {
                Err(V::NumFMin(valid))
            }
        }
        _ => Err(V::NumFMin(valid)),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::{
        f_arr_stub, f_bool_stub, f_num_i_stub, f_num_u_stub, f_obj_stub, f_str_stub,
    };

    use super::*;

    #[test]
    fn test_num_f_min_ok() {
        assert_eq!(num_f_min(-42.0, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_f_min(-42.0, &Field::of(Val::Num(None, None, Some(-42.0)))), Ok(()));
        assert_eq!(num_f_min(-42.0, &Field::of(Val::Num(None, None, Some(-41.9)))), Ok(()));
        assert_eq!(num_f_min(-42.0, &Field::of(Val::Num(None, None, Some(-41.0)))), Ok(()));
        assert_eq!(num_f_min(-42.0, &Field::of(Val::Num(None, None, Some(22.0)))), Ok(()));
    }

    #[test]
    fn test_num_f_min_err() {
        assert_eq!(
            num_f_min(-10.0, &Field::of(Val::Num(None, None, Some(-11.0)))),
            Err(V::NumFMin(-10.0))
        );
        assert_eq!(
            num_f_min(-10.0, &Field::of(Val::Num(None, None, Some(-12.0)))),
            Err(V::NumFMin(-10.0))
        );
    }

    #[test]
    fn test_num_f_min_type_err() {
        assert_eq!(num_f_min(-42.0, &f_num_u_stub()), Err(V::NumFMin(-42.0)));
        assert_eq!(num_f_min(-42.0, &f_num_i_stub()), Err(V::NumFMin(-42.0)));
        assert_eq!(num_f_min(-42.0, &f_str_stub()), Err(V::NumFMin(-42.0)));
        assert_eq!(num_f_min(-42.0, &f_bool_stub()), Err(V::NumFMin(-42.0)));
        assert_eq!(num_f_min(-42.0, &f_arr_stub()), Err(V::NumFMin(-42.0)));
        assert_eq!(num_f_min(-42.0, &f_obj_stub()), Err(V::NumFMin(-42.0)));
    }

    #[test]
    fn test_num_f_min_required() {
        assert_eq!(num_f_min(-42.0, &Field::default()), Ok(()));
        assert_eq!(num_f_min(-42.0, &Field::required()), Err(V::NumFMin(-42.0)));
    }
}
