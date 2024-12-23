use crate::{
    domain::validation::{NumUErr, Val},
    infra::validation::Field,
};

pub fn num_u(f: &Field) -> Result<(), NumUErr> {
    match f.value {
        Val::Num(num_u, num_i, num_f) => {
            if num_u.is_some() {
                Ok(())
            } else {
                Err(NumUErr(f.name))
            }
        }
        Val::None => {
            if f.has_required {
                Err(NumUErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(NumUErr(f.name)),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::{
        f_arr_stub, f_bool_stub, f_num_f_stub, f_num_i_stub, f_num_u_stub, f_obj_stub, f_str_stub,
    };

    use super::*;

    #[test]
    fn test_num_u_ok() {
        assert_eq!(num_u(&f_num_u_stub()), Ok(()));
    }

    #[test]
    fn test_num_u_err() {
        assert_eq!(num_u(&f_num_i_stub()), Err(NumUErr("foo")));
        assert_eq!(num_u(&f_num_f_stub()), Err(NumUErr("foo")));
        assert_eq!(num_u(&f_str_stub()), Err(NumUErr("foo")));
        assert_eq!(num_u(&f_bool_stub()), Err(NumUErr("foo")));
        assert_eq!(num_u(&f_arr_stub()), Err(NumUErr("foo")));
        assert_eq!(num_u(&f_obj_stub()), Err(NumUErr("foo")));
    }

    #[test]
    fn test_num_u_required() {
        assert_eq!(num_u(&Field::default()), Ok(()));
        assert_eq!(num_u(&Field::required()), Err(NumUErr("foo")));
    }
}
