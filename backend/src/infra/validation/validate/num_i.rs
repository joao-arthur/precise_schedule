use crate::{
    domain::validation::{V, Val},
    infra::validation::Field,
};

pub fn num_i(f: &Field) -> Result<(), V> {
    match f.value {
        Val::Num(_num_u, num_i, _num_f) => {
            if num_i.is_some() {
                Ok(())
            } else {
                Err(V::NumI)
            }
        }
        Val::None => {
            if f.has_required {
                Err(V::NumI)
            } else {
                Ok(())
            }
        }
        _ => Err(V::NumI),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::{
        f_arr_stub, f_bool_stub, f_num_f_stub, f_num_i_stub, f_num_u_stub, f_obj_stub, f_str_stub,
    };

    use super::*;

    #[test]
    fn test_num_i_ok() {
        assert_eq!(num_i(&f_num_i_stub()), Ok(()));
    }

    #[test]
    fn test_num_i_err() {
        assert_eq!(num_i(&f_num_u_stub()), Err(V::NumI));
        assert_eq!(num_i(&f_num_f_stub()), Err(V::NumI));
        assert_eq!(num_i(&f_str_stub()), Err(V::NumI));
        assert_eq!(num_i(&f_bool_stub()), Err(V::NumI));
        assert_eq!(num_i(&f_arr_stub()), Err(V::NumI));
        assert_eq!(num_i(&f_obj_stub()), Err(V::NumI));
    }

    #[test]
    fn test_num_i_required() {
        assert_eq!(num_i(&Field::default()), Ok(()));
        assert_eq!(num_i(&Field::required()), Err(V::NumI));
    }
}
