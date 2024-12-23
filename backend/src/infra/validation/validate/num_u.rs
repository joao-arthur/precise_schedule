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
    use crate::infra::validation::validate::stub::{f_num_u_stub, f_obj_stub};

    use super::*;

    #[test]
    fn test_type_ok() {
        assert_eq!(num_u(&f_num_u_stub()), Ok(()));
    }

    #[test]
    fn test_wrong_type_err() {
        assert_eq!(num_u(&f_obj_stub()), Err(NumUErr("foo")));
    }

    #[test]
    fn test_none_not_required() {
        assert_eq!(num_u(&Field::default()), Ok(()));
    }

    #[test]
    fn test_none_required() {
        assert_eq!(num_u(&Field::required()), Err(NumUErr("foo")));
    }
}
