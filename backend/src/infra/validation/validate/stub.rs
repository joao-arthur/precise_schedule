use std::collections::HashMap;

use crate::{domain::validation::Val, infra::validation::Field};

pub fn f_num_u_stub() -> Field {
    Field::of(Val::Num(Some(42), None, None))
}

pub fn f_num_i_stub() -> Field {
    Field::of(Val::Num(None, Some(-42), None))
}

pub fn f_num_f_stub() -> Field {
    Field::of(Val::Num(None, None, Some(24.5)))
}

pub fn f_str_stub() -> Field {
    Field::of(Val::Str(String::from("hello")))
}

pub fn f_bool_stub() -> Field {
    Field::of(Val::Bool(false))
}

pub fn f_arr_stub() -> Field {
    Field::of(Val::Arr(vec![Val::Num(None, Some(-1), None), Val::Num(None, Some(2), None)]))
}

pub fn f_obj_stub() -> Field {
    Field::of(Val::Obj(HashMap::from([(String::from("age"), Val::Num(None, Some(42), None))])))
}
