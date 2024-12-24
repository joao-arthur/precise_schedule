use crate::{
    domain::validation::{Val, V},
    infra::validation::Field,
};

pub fn num_i_max(valid: i64, f: &Field) -> Result<(), V> {
    match f.value {
        Val::Num(_num_u, num_i, _num_f) => {
            if let Some(num_i) = num_i {
                if num_i <= valid {
                    return Ok(());
                }
            }
            return Err(V::NumIMax(valid));
        }
        Val::None => {
            if !f.has_required {
                Ok(())
            } else {
                Err(V::NumIMax(valid))
            }
        }
        _ => Err(V::NumIMax(valid)),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::{
        f_arr_stub, f_bool_stub, f_num_f_stub, f_num_u_stub, f_obj_stub, f_str_stub,
    };

    use super::*;

    #[test]
    fn test_num_i_max_ok() {
        assert_eq!(num_i_max(22, &Field::of(Val::None)), Ok(()));
        assert_eq!(num_i_max(22, &Field::of(Val::Num(None, Some(22), None))), Ok(()));
        assert_eq!(num_i_max(22, &Field::of(Val::Num(None, Some(21), None))), Ok(()));
        assert_eq!(num_i_max(22, &Field::of(Val::Num(None, Some(-1943), None))), Ok(()));
    }

    #[test]
    fn test_num_i_max_err() {
        assert_eq!(num_i_max(10, &Field::of(Val::Num(None, Some(11), None))), Err(V::NumIMax(10)));
        assert_eq!(num_i_max(10, &Field::of(Val::Num(None, Some(12), None))), Err(V::NumIMax(10)));
    }

    #[test]
    fn test_num_i_max_type_err() {
        assert_eq!(num_i_max(-42, &f_num_u_stub()), Err(V::NumIMax(-42)));
        assert_eq!(num_i_max(-42, &f_num_f_stub()), Err(V::NumIMax(-42)));
        assert_eq!(num_i_max(-42, &f_str_stub()), Err(V::NumIMax(-42)));
        assert_eq!(num_i_max(-42, &f_bool_stub()), Err(V::NumIMax(-42)));
        assert_eq!(num_i_max(-42, &f_arr_stub()), Err(V::NumIMax(-42)));
        assert_eq!(num_i_max(-42, &f_obj_stub()), Err(V::NumIMax(-42)));
    }

    #[test]
    fn test_num_i_max_required() {
        assert_eq!(num_i_max(-42, &Field::default()), Ok(()));
        assert_eq!(num_i_max(-42, &Field::required()), Err(V::NumIMax(-42)));
    }
}
