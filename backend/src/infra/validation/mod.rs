use crate::domain::validation::Value;

// fn transform_to_value (val: serde_json::Value) -> Value {
//     match val {
//         serde_json::Value::Bool(b) => Value::Bool(b),
//         serde_json::Value::String(s) => Value::Str(s),
//         serde_json::Value::Number(n) => {
//             n.is_u64() {
//                 return Value::NumF(n.as_u64());
//             }
//             n.is_i64() {
//                 return Value::NumF(n.as_i64());
//             }
//             if n.is_f64() {
//                 return Value::NumF(n.as_f64());
//             }
//         },
//         serde_json::Value::Array(arr) => Value::Arr(a.into_iter().map(transform)),
//         serde_json::Value::Null => Value::Absent,
//         serde_json::Value::Object(obj) => Value::Arr,
//     }
// }
