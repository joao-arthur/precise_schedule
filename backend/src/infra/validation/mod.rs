mod validate;
mod adapter;
pub mod validator_custom;

use crate::domain::validation::Val;

struct Field {
    name: &'static str,
    value: Val,
    has_required: bool,
}

impl Default for Field {
    fn default() -> Self {
        Field { name: "foo", value: Val::None, has_required: false }
    }
}

impl Field {
    fn required() -> Self {
        Field { has_required: true, ..Default::default() }
    }

    fn of(value: Val) -> Self {
        Field { value, ..Default::default() }
    }
}
