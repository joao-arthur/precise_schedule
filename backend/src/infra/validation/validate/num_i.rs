use crate::{
    domain::validation::{NumIErr, Val},
    infra::validation::Field,
};

pub fn num_i(f: &Field) -> Result<(), NumIErr> {
    match f.value {
        Val::Num(num_u, num_i, num_f) => {
            if num_i.is_some() {
                Ok(())
            } else {
                Err(NumIErr(f.name))
            }
        }
        Val::None => {
            if f.has_required {
                Err(NumIErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(NumIErr(f.name)),
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
        assert_eq!(num_i(&f_num_u_stub()), Err(NumIErr("foo")));
        assert_eq!(num_i(&f_num_f_stub()), Err(NumIErr("foo")));
        assert_eq!(num_i(&f_str_stub()), Err(NumIErr("foo")));
        assert_eq!(num_i(&f_bool_stub()), Err(NumIErr("foo")));
        assert_eq!(num_i(&f_arr_stub()), Err(NumIErr("foo")));
        assert_eq!(num_i(&f_obj_stub()), Err(NumIErr("foo")));
    }

    #[test]
    fn test_num_i_required() {
        assert_eq!(num_i(&Field::default()), Ok(()));
        assert_eq!(num_i(&Field::required()), Err(NumIErr("foo")));
    }
}
