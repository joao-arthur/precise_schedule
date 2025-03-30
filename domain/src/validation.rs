use araucaria::{error::SchemaErr, validation::Validation, value::Value};

pub trait Validator {
    fn validate(&self, validation: &Validation, value: &Value) -> Result<(), SchemaErr>;
}

pub mod stub {
    use super::*;

    pub struct ValidatorStub(pub Result<(), SchemaErr>);

    impl Validator for ValidatorStub {
        fn validate(&self, _validation: &Validation, _value: &Value) -> Result<(), SchemaErr> {
            self.0.clone()
        }
    }

    #[cfg(test)]
    mod test {
        use std::collections::HashMap;

        use araucaria::{
            error::ValidationErr,
            validation::{bool::BoolValidation, ObjValidation},
        };

        use super::*;

        #[test]
        fn test_validator_stub() {
            assert_eq!(
                ValidatorStub(Ok(())).validate(
                    &Validation::Obj(ObjValidation {
                        validation: HashMap::from([(
                            String::from("is"),
                            Validation::Bool(BoolValidation::default().eq(false))
                        )]),
                        required: false
                    }),
                    &Value::Obj(HashMap::from([(String::from("is"), Value::Bool(false))]))
                ),
                Ok(())
            );
            assert_eq!(
                ValidatorStub(Err(SchemaErr::Obj(HashMap::from([(
                    String::from("is"),
                    SchemaErr::validation([
                        ValidationErr::Bool,
                        ValidationErr::Required,
                        ValidationErr::Eq(Value::Bool(false))
                    ])
                )]))))
                .validate(
                    &Validation::Obj(ObjValidation {
                        validation: HashMap::from([(
                            String::from("is"),
                            Validation::Bool(BoolValidation::default().eq(false))
                        )]),
                        required: false
                    }),
                    &Value::None
                ),
                Err(SchemaErr::Obj(HashMap::from([(
                    String::from("is"),
                    SchemaErr::validation([
                        ValidationErr::Bool,
                        ValidationErr::Required,
                        ValidationErr::Eq(Value::Bool(false))
                    ])
                )])))
            );
        }
    }
}
