use crate::{
    domain::validation::{Val, V},
    infra::validation::Field,
};

pub fn bool(f: &Field) -> Result<(), V> {
    match f.value {
        Val::Bool(_value) => Ok(()),
        Val::None => {
            if !f.has_required {
                Ok(())
            } else {
                Err(V::Bool)
            }
        }
        _ => Err(V::Bool),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::{
        f_arr_stub, f_bool_stub, f_num_f_stub, f_num_i_stub, f_num_u_stub, f_obj_stub, f_str_stub,
    };

    use super::*;

    #[test]
    fn test_bool_ok() {
        assert_eq!(bool(&f_bool_stub()), Ok(()));
    }

    #[test]
    fn test_bool_err() {
        assert_eq!(bool(&f_num_u_stub()), Err(V::Bool));
        assert_eq!(bool(&f_num_i_stub()), Err(V::Bool));
        assert_eq!(bool(&f_num_f_stub()), Err(V::Bool));
        assert_eq!(bool(&f_str_stub()), Err(V::Bool));
        assert_eq!(bool(&f_arr_stub()), Err(V::Bool));
        assert_eq!(bool(&f_obj_stub()), Err(V::Bool));
    }

    #[test]
    fn test_bool_required() {
        assert_eq!(bool(&Field::default()), Ok(()));
        assert_eq!(bool(&Field::required()), Err(V::Bool));
    }
}
