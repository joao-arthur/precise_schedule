use araucaria::{error::ErrWrap, validation::Validation, value::Value};
use domain::validation::{Validator};

pub struct ValidatorCustom;

impl Validator for ValidatorCustom {
    fn validate(&self, validation: &Validation, value: &Value) -> Result<(), ErrWrap> {
        Ok(())
    }
}

#[cfg(test)]
mod test {
    use super::*;

}
