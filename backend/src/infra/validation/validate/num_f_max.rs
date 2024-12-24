use crate::{
    domain::validation::{Val, V},
    infra::validation::Field,
};

pub fn num_f_max(valid: f64, f: &Field) -> Result<(), V> {
    match f.value {
        Val::Num(_num_u, _num_i, num_f) => {
            if let Some(num_f) = num_f {
                if num_f <= valid {
                    return Ok(());
                }
            }
            Err(V::NumFMax(valid))
        }
        Val::None => {
            if !f.has_required {
                Ok(())
            } else {
                Err(V::NumFMax(valid))
            }
        }
        _ => Err(V::NumFMax(valid)),
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
            Err(V::NumFMax(10.0))
        );
        assert_eq!(
            num_f_max(10.0, &Field::of(Val::Num(None, None, Some(12.0)))),
            Err(V::NumFMax(10.0))
        );
    }

    #[test]
    fn test_num_f_max_type_err() {
        assert_eq!(num_f_max(-42.0, &f_num_u_stub()), Err(V::NumFMax(-42.0)));
        assert_eq!(num_f_max(-42.0, &f_num_i_stub()), Err(V::NumFMax(-42.0)));
        assert_eq!(num_f_max(-42.0, &f_str_stub()), Err(V::NumFMax(-42.0)));
        assert_eq!(num_f_max(-42.0, &f_bool_stub()), Err(V::NumFMax(-42.0)));
        assert_eq!(num_f_max(-42.0, &f_arr_stub()), Err(V::NumFMax(-42.0)));
        assert_eq!(num_f_max(-42.0, &f_obj_stub()), Err(V::NumFMax(-42.0)));
    }

    #[test]
    fn test_num_f_max_required() {
        assert_eq!(num_f_max(-42.0, &Field::default()), Ok(()));
        assert_eq!(num_f_max(-42.0, &Field::required()), Err(V::NumFMax(-42.0)));
    }
}
