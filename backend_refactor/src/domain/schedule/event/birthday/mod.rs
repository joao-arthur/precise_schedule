use crate::domain::validation::*;
use std::collections::HashMap;

fn build_create_schema() -> Schema<'static> {
    HashMap::from([(
        "wip",
        vec![
            VType::Req(ReqV {}),
            VType::Int(IntV {}),
            VType::IntMin(IntMinV { value: 1 }),
            VType::IntMax(IntMaxV { value: 1000 }),
        ],
    )])
}
