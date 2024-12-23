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
    use super::*;
    use std::collections::HashMap;

    fn f_num_u_stub() -> Field {
        Field::of(Val::Num(Some(42), None, None))
    }

    fn f_num_i_stub() -> Field {
        Field::of(Val::Num(None, Some(-42), None))
    }

    fn f_num_f_stub() -> Field {
        Field::of(Val::Num(None, None, Some(24.5)))
    }

    fn f_str_stub() -> Field {
        Field::of(Val::Str(String::from("hello")))
    }

    fn f_bool_stub() -> Field {
        Field::of(Val::Bool(false))
    }

    fn f_arr_stub() -> Field {
        Field::of(Val::Arr(vec![Val::Num(None, Some(-1), None), Val::Num(None, Some(2), None)]))
    }

    fn f_obj_stub() -> Field {
        Field::of(Val::Obj(HashMap::from([(String::from("age"), Val::Num(None, Some(42), None))])))
    }

    #[test]
    fn test_type_ok() {
        assert_eq!(required(&f_num_u_stub()), Ok(()));
        assert_eq!(required(&f_num_i_stub()), Ok(()));
        assert_eq!(required(&f_num_f_stub()), Ok(()));
        assert_eq!(required(&f_str_stub()), Ok(()));
        assert_eq!(required(&f_bool_stub()), Ok(()));
        assert_eq!(required(&f_arr_stub()), Ok(()));
        assert_eq!(required(&f_obj_stub()), Ok(()));
    }

    #[test]
    fn test_wrong_type_err() {
        assert_eq!(required(&Field::of(Val::None)), Err(RequiredErr("foo")));
    }
}
