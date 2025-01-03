use crate::{domain::validation::V, infra::validation::Field};

pub fn datetime_min(f: &Field) -> Result<(), V> {
    Ok(())
}
