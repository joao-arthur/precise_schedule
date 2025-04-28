use araucaria::{error::SchemaErr, validation::Validation, value::Value};

pub trait Validator {
    fn validate(&self, validation: &Validation, value: &Value) -> Result<(), SchemaErr>;
}

pub mod stub {
    use araucaria::{error::SchemaErr, validation::Validation, value::Value};

    use super::Validator;

    pub struct ValidatorStub(pub Result<(), SchemaErr>);

    impl Validator for ValidatorStub {
        fn validate(&self, _validation: &Validation, _value: &Value) -> Result<(), SchemaErr> {
            self.0.clone()
        }
    }

    #[cfg(test)]
    mod test {
        use std::collections::BTreeMap;

        use araucaria::{
            error::{SchemaErr, ValidationErr},
            operation::{Operand, OperandValue, Operation},
            validation::{BoolValidation, ObjValidation, Validation},
            value::Value,
        };

        use super::{Validator, ValidatorStub};

        #[test]
        fn test_validator_stub() {
            assert_eq!(
                ValidatorStub(Ok(())).validate(
                    &Validation::Obj(ObjValidation {
                        validation: BTreeMap::from([(String::from("is"), Validation::Bool(BoolValidation::default().eq(false)))]),
                        required: false
                    }),
                    &Value::Obj(BTreeMap::from([(String::from("is"), Value::Bool(false))]))
                ),
                Ok(())
            );
            assert_eq!(
                ValidatorStub(Err(SchemaErr::Obj(BTreeMap::from([(
                    String::from("is"),
                    SchemaErr::arr([
                        ValidationErr::Bool,
                        ValidationErr::Required,
                        ValidationErr::Operation(Operation::Eq(Operand::Value(OperandValue::Bool(false))))
                    ])
                )]))))
                .validate(
                    &Validation::Obj(ObjValidation {
                        validation: BTreeMap::from([(String::from("is"), Validation::Bool(BoolValidation::default().eq(false)))]),
                        required: false
                    }),
                    &Value::None
                ),
                Err(SchemaErr::Obj(BTreeMap::from([(
                    String::from("is"),
                    SchemaErr::arr([
                        ValidationErr::Bool,
                        ValidationErr::Required,
                        ValidationErr::Operation(Operation::Eq(Operand::Value(OperandValue::Bool(false))))
                    ])
                )])))
            );
        }
    }
}
