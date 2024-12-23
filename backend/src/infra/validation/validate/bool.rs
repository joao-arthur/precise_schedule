use crate::{
    domain::validation::{BoolErr, Val},
    infra::validation::Field,
};

pub fn bool(f: &Field) -> Result<(), BoolErr> {
    match f.value {
        Val::Bool(_value) => Ok(()),
        Val::None => {
            if f.has_required {
                Err(BoolErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(BoolErr(f.name)),
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
        assert_eq!(bool(&f_num_u_stub()), Err(BoolErr("foo")));
        assert_eq!(bool(&f_num_i_stub()), Err(BoolErr("foo")));
        assert_eq!(bool(&f_num_f_stub()), Err(BoolErr("foo")));
        assert_eq!(bool(&f_str_stub()), Err(BoolErr("foo")));
        assert_eq!(bool(&f_arr_stub()), Err(BoolErr("foo")));
        assert_eq!(bool(&f_obj_stub()), Err(BoolErr("foo")));
    }

    #[test]
    fn test_bool_required() {
        assert_eq!(bool(&Field::default()), Ok(()));
        assert_eq!(bool(&Field::required()), Err(BoolErr("foo")));
    }
}
