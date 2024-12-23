use crate::{
    domain::validation::{NumFErr, Val},
    infra::validation::Field,
};

pub fn num_f(f: &Field) -> Result<(), NumFErr> {
    match f.value {
        Val::Num(num_u, num_i, num_f) => {
            if num_f.is_some() {
                Ok(())
            } else {
                Err(NumFErr(f.name))
            }
        }
        Val::None => {
            if f.has_required {
                Err(NumFErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(NumFErr(f.name)),
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
        assert_eq!(num_f(&f_num_u_stub()), Err(NumFErr("foo")));
        assert_eq!(num_f(&f_num_i_stub()), Err(NumFErr("foo")));
        assert_eq!(num_f(&f_str_stub()), Err(NumFErr("foo")));
        assert_eq!(num_f(&f_bool_stub()), Err(NumFErr("foo")));
        assert_eq!(num_f(&f_arr_stub()), Err(NumFErr("foo")));
        assert_eq!(num_f(&f_obj_stub()), Err(NumFErr("foo")));
    }

    #[test]
    fn test_num_f_required() {
        assert_eq!(num_f(&Field::default()), Ok(()));
        assert_eq!(num_f(&Field::required()), Err(NumFErr("foo")));
    }
}
