use crate::domain::validation::Val;

pub mod adapter;
mod validate;
pub mod validator_custom;

struct Field {
    value: Val,
    has_required: bool,
}

impl Default for Field {
    fn default() -> Self {
        Field { value: Val::None, has_required: false }
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
