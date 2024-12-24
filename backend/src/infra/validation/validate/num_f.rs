use crate::{
    domain::validation::{V, Val},
    infra::validation::Field,
};

pub fn num_f(f: &Field) -> Result<(), V> {
    match f.value {
        Val::Num(_num_u, _num_i, num_f) => {
            if num_f.is_some() {
                Ok(())
            } else {
                Err(V::NumF)
            }
        }
        Val::None => {
            if f.has_required {
                Err(V::NumF)
            } else {
                Ok(())
            }
        }
        _ => Err(V::NumF),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::{
        f_arr_stub, f_bool_stub, f_num_f_stub, f_num_i_stub, f_num_u_stub, f_obj_stub, f_str_stub,
    };

    use super::*;

    #[test]
    fn test_num_f_ok() {
        assert_eq!(num_f(&f_num_f_stub()), Ok(()));
    }

    #[test]
    fn test_num_f_err() {
        assert_eq!(num_f(&f_num_u_stub()), Err(V::NumF));
        assert_eq!(num_f(&f_num_i_stub()), Err(V::NumF));
        assert_eq!(num_f(&f_str_stub()), Err(V::NumF));
        assert_eq!(num_f(&f_bool_stub()), Err(V::NumF));
        assert_eq!(num_f(&f_arr_stub()), Err(V::NumF));
        assert_eq!(num_f(&f_obj_stub()), Err(V::NumF));
    }

    #[test]
    fn test_num_f_required() {
        assert_eq!(num_f(&Field::default()), Ok(()));
        assert_eq!(num_f(&Field::required()), Err(V::NumF));
    }
}
