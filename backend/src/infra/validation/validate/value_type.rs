use crate::{
    domain::validation::{BoolErr, NumFErr, NumIErr, NumUErr, RequiredErr, StrErr, Val},
    infra::validation::Field,
};

pub fn required(f: &Field) -> Result<(), RequiredErr> {
    match f.value {
        Val::None => Err(RequiredErr(f.name)),
        _ => Ok(()),
    }
}

pub fn num_u(f: &Field) -> Result<(), NumUErr> {
    match f.value {
        Val::NumU(_num_u) => Ok(()),
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

pub fn num_i(f: &Field) -> Result<(), NumIErr> {
    match f.value {
        Val::NumI(_num_i) => Ok(()),
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

pub fn num_f(f: &Field) -> Result<(), NumFErr> {
    match f.value {
        Val::NumF(_value) => Ok(()),
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

pub fn str(f: &Field) -> Result<(), StrErr> {
    match &f.value {
        Val::Str(_value) => Ok(()),
        Val::None => {
            if f.has_required {
                Err(StrErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(StrErr(f.name)),
    }
}

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
    use crate::domain::validation::RequiredErr;

    use super::*;
    use std::collections::HashMap;

    #[test]
    fn test_type_ok() {
        let f_num_u = Field::of(Val::NumU(42));
        let f_num_i = Field::of(Val::NumI(-42));
        let f_num_f = Field::of(Val::NumF(24.5));
        let f_str = Field::of(Val::Str(String::from("hello")));
        let f_bool = Field::of(Val::Bool(false));
        let f_arr = Field::of(Val::Arr(vec![Val::NumI(-1), Val::NumI(2)]));
        let f_obj = Field::of(Val::Obj(HashMap::from([(String::from("age"), Val::NumI(42))])));

        assert_eq!(required(&f_num_u), Ok(()));
        assert_eq!(required(&f_num_i), Ok(()));
        assert_eq!(required(&f_num_f), Ok(()));
        assert_eq!(required(&f_str), Ok(()));
        assert_eq!(required(&f_bool), Ok(()));
        assert_eq!(required(&f_arr), Ok(()));
        assert_eq!(required(&f_obj), Ok(()));
        assert_eq!(num_u(&f_num_u), Ok(()));
        assert_eq!(num_i(&f_num_i), Ok(()));
        assert_eq!(num_f(&f_num_f), Ok(()));
        assert_eq!(str(&f_str), Ok(()));
        assert_eq!(bool(&f_bool), Ok(()));
    }

    #[test]
    fn test_type_err() {
        let f_none = Field::of(Val::None);
        let f_num_u = Field::of(Val::NumU(42));
        let f_num_i = Field::of(Val::NumI(-42));
        let f_num_f = Field::of(Val::NumF(24.5));
        let f_str = Field::of(Val::Str(String::from("hello")));
        let f_bool = Field::of(Val::Bool(false));
        let f_arr = Field::of(Val::Arr(vec![Val::NumI(-1), Val::NumI(2)]));
        let f_obj = Field::of(Val::Obj(HashMap::from([(String::from("age"), Val::NumI(42))])));

        assert_eq!(required(&f_none), Err(RequiredErr("foo")));

        assert_eq!(num_u(&f_num_i), Err(NumUErr("foo")));
        assert_eq!(num_u(&f_num_f), Err(NumUErr("foo")));
        assert_eq!(num_u(&f_str), Err(NumUErr("foo")));
        assert_eq!(num_u(&f_bool), Err(NumUErr("foo")));
        assert_eq!(num_u(&f_arr), Err(NumUErr("foo")));
        assert_eq!(num_u(&f_obj), Err(NumUErr("foo")));

        assert_eq!(num_i(&f_num_u), Err(NumIErr("foo")));
        assert_eq!(num_i(&f_num_f), Err(NumIErr("foo")));
        assert_eq!(num_i(&f_str), Err(NumIErr("foo")));
        assert_eq!(num_i(&f_bool), Err(NumIErr("foo")));
        assert_eq!(num_i(&f_arr), Err(NumIErr("foo")));
        assert_eq!(num_i(&f_obj), Err(NumIErr("foo")));

        assert_eq!(num_f(&f_num_u), Err(NumFErr("foo")));
        assert_eq!(num_f(&f_num_i), Err(NumFErr("foo")));
        assert_eq!(num_f(&f_str), Err(NumFErr("foo")));
        assert_eq!(num_f(&f_bool), Err(NumFErr("foo")));
        assert_eq!(num_f(&f_arr), Err(NumFErr("foo")));
        assert_eq!(num_f(&f_obj), Err(NumFErr("foo")));

        assert_eq!(str(&f_num_u), Err(StrErr("foo")));
        assert_eq!(str(&f_num_i), Err(StrErr("foo")));
        assert_eq!(str(&f_num_f), Err(StrErr("foo")));
        assert_eq!(str(&f_bool), Err(StrErr("foo")));
        assert_eq!(str(&f_arr), Err(StrErr("foo")));
        assert_eq!(str(&f_obj), Err(StrErr("foo")));

        assert_eq!(bool(&f_num_u), Err(BoolErr("foo")));
        assert_eq!(bool(&f_num_i), Err(BoolErr("foo")));
        assert_eq!(bool(&f_num_f), Err(BoolErr("foo")));
        assert_eq!(bool(&f_str), Err(BoolErr("foo")));
        assert_eq!(bool(&f_arr), Err(BoolErr("foo")));
        assert_eq!(bool(&f_obj), Err(BoolErr("foo")));
    }

    #[test]
    fn test_none_not_required() {
        assert_eq!(num_u(&Field::default()), Ok(()));
        assert_eq!(num_i(&Field::default()), Ok(()));
        assert_eq!(num_f(&Field::default()), Ok(()));
        assert_eq!(str(&Field::default()), Ok(()));
        assert_eq!(bool(&Field::default()), Ok(()));
    }

    #[test]
    fn test_none_required() {
        assert_eq!(num_u(&Field::required()), Err(NumUErr("foo")));
        assert_eq!(num_i(&Field::required()), Err(NumIErr("foo")));
        assert_eq!(num_f(&Field::required()), Err(NumFErr("foo")));
        assert_eq!(str(&Field::required()), Err(StrErr("foo")));
        assert_eq!(bool(&Field::required()), Err(BoolErr("foo")));
    }
}
