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
    use crate::infra::validation::validate::stub::{f_bool_stub, f_obj_stub};

    use super::*;

    #[test]
    fn test_type_ok() {
        assert_eq!(bool(&f_bool_stub()), Ok(()));
    }

    #[test]
    fn test_wrong_type_err() {
        assert_eq!(bool(&f_obj_stub()), Err(BoolErr("foo")));
    }

    #[test]
    fn test_none_not_required() {
        assert_eq!(bool(&Field::default()), Ok(()));
    }

    #[test]
    fn test_none_required() {
        assert_eq!(bool(&Field::required()), Err(BoolErr("foo")));
    }
}
