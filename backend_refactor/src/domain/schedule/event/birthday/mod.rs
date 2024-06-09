use crate::domain::validation::Schema;
use crate::domain::validation::ValidationType;
use std::collections::HashMap;

fn build_create_schema() -> Schema<'static> {
    HashMap::from([(
        "wip",
        vec![
            ValidationType::U64,
            ValidationType::U64Min(1),
            ValidationType::U64Max(1000),
        ],
    )])
}
