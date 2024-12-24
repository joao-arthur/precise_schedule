use crate::{
    domain::validation::{V, Val},
    infra::validation::Field,
};

pub fn num_i_exact(valid: i64, f: &Field) -> Result<(), V> {
    match f.value {
        Val::Num(_num_u, num_i, _num_f) => {
            if num_i == Some(valid) {
                Ok(())
            } else {
                Err(V::NumIExact(valid))
            }
        }
        Val::None => {
            if f.has_required {
                Err(V::NumIExact(valid))
            } else {
                Ok(())
            }
        }
        _ => Err(V::NumIExact(valid)),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::{
        f_arr_stub, f_bool_stub, f_num_f_stub, f_num_u_stub, f_obj_stub, f_str_stub,
    };

    use super::*;

    #[test]
    fn test_num_i_exact_ok() {
        assert_eq!(num_i_exact(42, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_i_exact(42, &Field::of(Val::Num(None, Some(42), None))), Ok(()));
        assert_eq!(num_i_exact(-42, &Field::of(Val::Num(None, Some(-42), None))), Ok(()));
    }

    #[test]
    fn test_num_i_exact_err() {
        assert_eq!(
            num_i_exact(-10, &Field::of(Val::Num(None, Some(-11), None))),
            Err(V::NumIExact(-10))
        );
        assert_eq!(
            num_i_exact(-10, &Field::of(Val::Num(None, Some(-9), None))),
            Err(V::NumIExact(-10))
        );
    }

    #[test]
    fn test_num_i_exact_type_err() {
        assert_eq!(num_i_exact(-42, &f_num_u_stub()), Err(V::NumIExact(-42)));
        assert_eq!(num_i_exact(-42, &f_num_f_stub()), Err(V::NumIExact(-42)));
        assert_eq!(num_i_exact(-42, &f_str_stub()), Err(V::NumIExact(-42)));
        assert_eq!(num_i_exact(-42, &f_bool_stub()), Err(V::NumIExact(-42)));
        assert_eq!(num_i_exact(-42, &f_arr_stub()), Err(V::NumIExact(-42)));
        assert_eq!(num_i_exact(-42, &f_obj_stub()), Err(V::NumIExact(-42)));
    }

    #[test]
    fn test_num_i_exact_required() {
        assert_eq!(num_i_exact(-42, &Field::default()), Ok(()));
        assert_eq!(num_i_exact(-42, &Field::required()), Err(V::NumIExact(-42)));
    }
}
