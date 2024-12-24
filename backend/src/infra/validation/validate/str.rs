use crate::{
    domain::validation::{V, Val},
    infra::validation::Field,
};

pub fn str(f: &Field) -> Result<(), V> {
    match &f.value {
        Val::Str(_value) => Ok(()),
        Val::None => {
            if f.has_required {
                Err(V::Str)
            } else {
                Ok(())
            }
        }
        _ => Err(V::Str),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::{
        f_arr_stub, f_bool_stub, f_num_f_stub, f_num_i_stub, f_num_u_stub, f_obj_stub, f_str_stub,
    };

    use super::*;

    #[test]
    fn test_str_ok() {
        assert_eq!(str(&f_str_stub()), Ok(()));
    }

    #[test]
    fn test_str_err() {
        assert_eq!(str(&f_num_u_stub()), Err(V::Str));
        assert_eq!(str(&f_num_i_stub()), Err(V::Str));
        assert_eq!(str(&f_num_f_stub()), Err(V::Str));
        assert_eq!(str(&f_bool_stub()), Err(V::Str));
        assert_eq!(str(&f_arr_stub()), Err(V::Str));
        assert_eq!(str(&f_obj_stub()), Err(V::Str));
    }

    #[test]
    fn test_str_required() {
        assert_eq!(str(&Field::default()), Ok(()));
        assert_eq!(str(&Field::required()), Err(V::Str));
    }
}
