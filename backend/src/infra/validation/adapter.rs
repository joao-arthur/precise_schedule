use crate::domain::validation::{Val, V};

pub fn value_from_json_value(value: serde_json::Value) -> Val {
    match value {
        serde_json::Value::Null => Val::None,
        serde_json::Value::Bool(_bool) => Val::Bool(_bool),
        serde_json::Value::Number(num) => Val::Num(
            if num.is_u64() { num.as_u64() } else { None },
            if num.is_i64() { num.as_i64() } else { None },
            if num.is_f64() { num.as_f64() } else { None },
        ),
        serde_json::Value::String(str) => Val::Str(str),
        serde_json::Value::Array(arr) => {
            Val::Arr(arr.into_iter().map(value_from_json_value).collect())
        }
        serde_json::Value::Object(obj) => {
            Val::Obj(obj.into_iter().map(|f| (f.0, value_from_json_value(f.1))).collect())
        }
    }
}

pub fn to_english(v: &V) -> String {
    match v {
        V::Required => String::from(rust_i18n::t!("validation.required", locale = "en")),
        V::NumI => String::from("Must be an integer"),
        V::NumU => String::from("Must be an unsigned integer"),
        V::NumF => String::from("Must be a float"),
        V::Str => String::from("Must be a string"),
        V::Bool => String::from("Must be a boolean"),
        V::NumIExact(v) => String::from(format!("Must be equal to {v}")),
        V::NumIMin(v) => String::from(format!("Must be greater or equal to {v}")),
        V::NumIMax(v) => String::from(format!("Must be smaller or equal to {v}")),
        V::NumUExact(v) => String::from(format!("Must be equal to {v}")),
        V::NumUMin(v) => String::from(format!("Must be greater or equal to {v}")),
        V::NumUMax(v) => String::from(format!("Must be smaller or equal to {v}")),
        V::NumFExact(v) => String::from(format!("Must be equal to {v}")),
        V::NumFMin(v) => String::from(format!("Must be greater or equal to {v}")),
        V::NumFMax(v) => String::from(format!("Must be smaller or equal to {v}")),
        V::StrExact(v) => String::from(format!("Must be equal to {v}")),
        V::StrExactLen(v) => String::from(format!("Length must be equal to {v}")),
        V::StrMinLen(v) => String::from(format!("Length must be greater or equal to {v}")),
        V::StrMaxLen(v) => String::from(format!("Length must be smaller or equal to {v}")),
        V::StrMinUpper(v) => {
            String::from(format!("Must contain at least {v} uppercase characters"))
        }
        V::StrMinLower(v) => {
            String::from(format!("Must contain at least {v} lowercase characters"))
        }
        V::StrMinNum(v) => String::from(format!("Must contain at least {v} numbers")),
        V::StrMinSpecial(v) => String::from(format!(
            "Must contain at least {v} of !\"#$%&'()*+,-./:;<=>?@[\\]^_`{{|}}~"
        )),
        V::Dt => String::from("Must be a date in the format YYYY-MM-DD"),
        V::DtMin(v) => String::from(format!("Must be greater or equal to {v}")),
        V::DtMax(v) => String::from(format!("Must be smaller or equal to {v}")),
        V::Email => String::from("Must be a valid email"),
    }
}

pub fn to_spanish(v: &V) -> String {
    match v {
        V::Required => String::from(rust_i18n::t!("validation.required", locale = "es")),
        V::NumI => String::from("Debe ser un entero"),
        V::NumU => String::from("Debe ser un entero sin signo"),
        V::NumF => String::from("Debe ser un flotante"),
        V::Str => String::from("Debe ser una cadena"),
        V::Bool => String::from("Debe ser un booleano"),
        V::NumIExact(v) => String::from(format!("Deve ser igual a {v}")),
        V::NumIMin(v) => String::from(format!("Debe ser mayor o igual que {v}")),
        V::NumIMax(v) => String::from(format!("Deve ser menor o igual que {v}")),
        V::NumUExact(v) => String::from(format!("Deve ser igual a {v}")),
        V::NumUMin(v) => String::from(format!("Debe ser mayor o igual que {v}")),
        V::NumUMax(v) => String::from(format!("Deve ser menor o igual que {v}")),
        V::NumFExact(v) => String::from(format!("Deve ser igual a {v}")),
        V::NumFMin(v) => String::from(format!("Debe ser mayor o igual que {v}")),
        V::NumFMax(v) => String::from(format!("Deve ser menor o igual que {v}")),
        V::StrExact(v) => String::from(format!("Deve ser igual a {v}")),
        V::StrExactLen(v) => String::from(format!("La longitud deve ser igual a {v}")),
        V::StrMinLen(v) => String::from(format!("La longitud deve ser mayor o igual que {v}")),
        V::StrMaxLen(v) => String::from(format!("La longitud deve ser menor o igual que {v}")),
        V::StrMinUpper(v) => {
            String::from(format!("Deve contener al menos {v} carácter en minúscula"))
        }
        V::StrMinLower(v) => {
            String::from(format!("Deve contener al menos {v} carácter en mayúscula"))
        }
        V::StrMinNum(v) => String::from(format!("Deve contener al menos {v} numeros")),
        V::StrMinSpecial(v) => String::from(format!(
            "Deve contener al menos {v} de !\"#$%&'()*+,-./:;<=>?@[\\]^_`{{|}}~"
        )),
        V::Dt => String::from("Debe ser una fecha en el formato AAAA-MM-DD"),
        V::DtMin(v) => String::from(format!("Debe ser mayor o igual que {v}")),
        V::DtMax(v) => String::from(format!("Deve ser menor o igual que {v}")),
        V::Email => String::from("Debe ser un email válido"),
    }
}

pub fn to_portuguese(v: &V) -> String {
    match v {
        V::Required => String::from(rust_i18n::t!("validation.required", locale = "pt")),
        V::NumI => String::from("Deve ser um inteiro"),
        V::NumU => String::from("Deve ser um inteiro sem sinal"),
        V::NumF => String::from("Deve ser um flutuante"),
        V::Str => String::from("Deve ser uma string"),
        V::Bool => String::from("Deve ser um booleano"),
        V::NumIExact(v) => String::from(format!("Deve ser igual a {v}")),
        V::NumIMin(v) => String::from(format!("Deve ser maior ou igual a {v}")),
        V::NumIMax(v) => String::from(format!("Deve ser menor ou igual a {v}")),
        V::NumUExact(v) => String::from(format!("Deve ser igual a {v}")),
        V::NumUMin(v) => String::from(format!("Deve ser maior ou igual a {v}")),
        V::NumUMax(v) => String::from(format!("Deve ser menor ou igual a {v}")),
        V::NumFExact(v) => String::from(format!("Deve ser igual a {v}")),
        V::NumFMin(v) => String::from(format!("Deve ser maior ou igual a {v}")),
        V::NumFMax(v) => String::from(format!("Deve ser menor ou igual a {v}")),
        V::StrExact(v) => String::from(format!("Deve ser igual a {v}")),
        V::StrExactLen(v) => String::from(format!("O comprimento deve ser igual a {v}")),
        V::StrMinLen(v) => String::from(format!("O comprimento deve ser maior ou igual a {v}")),
        V::StrMaxLen(v) => String::from(format!("O comprimento deve ser menor ou igual a {v}")),
        V::StrMinUpper(v) => String::from(format!("Deve conter {v} caracteres minúsculos")),
        V::StrMinLower(v) => String::from(format!("Deve conter {v} caracteres maiúsculos")),
        V::StrMinNum(v) => String::from(format!("Deve conter {v} números")),
        V::StrMinSpecial(v) => {
            String::from(format!("Deve conter {v} de !\"#$%&'()*+,-./:;<=>?@[\\]^_`{{|}}~"))
        }
        V::Dt => String::from("Deve ser uma data no formato AAAA-MM-DD"),
        V::DtMin(v) => String::from(format!("Deve ser maior ou igual a {v}")),
        V::DtMax(v) => String::from(format!("Deve ser menor ou igual a {v}")),
        V::Email => String::from("Deve ser um email válido"),
    }
}
