use crate::{
    domain::validation::{RequiredErr, Val},
    infra::validation::Field,
};

pub fn required(f: &Field) -> Result<(), RequiredErr> {
    match f.value {
        Val::None => Err(RequiredErr(f.name)),
        _ => Ok(()),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::{
        f_arr_stub, f_bool_stub, f_num_f_stub, f_num_i_stub, f_num_u_stub, f_obj_stub, f_str_stub,
    };

    use super::*;

    #[test]
    fn test_required_ok() {
        assert_eq!(required(&f_num_u_stub()), Ok(()));
        assert_eq!(required(&f_num_i_stub()), Ok(()));
        assert_eq!(required(&f_num_f_stub()), Ok(()));
        assert_eq!(required(&f_str_stub()), Ok(()));
        assert_eq!(required(&f_bool_stub()), Ok(()));
        assert_eq!(required(&f_arr_stub()), Ok(()));
        assert_eq!(required(&f_obj_stub()), Ok(()));
    }

    #[test]
    fn test_required_err() {
        assert_eq!(required(&Field::of(Val::None)), Err(RequiredErr("foo")));
    }
}
