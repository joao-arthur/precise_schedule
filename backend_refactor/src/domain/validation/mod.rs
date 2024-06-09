use std::collections::HashMap;

pub enum ValidationType {
    //Str,
    //Dt,
    //Tm,
    U64,
    U64Min(u64),
    U64Max(u64),
}

pub type Schema<'a> = HashMap<&'a str, Vec<ValidationType>>;
