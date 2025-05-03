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

        const REQUIRED: ValidationErr = ValidationErr::Required;
        const BOOL: ValidationErr = ValidationErr::Bool;

        #[test]
        fn test_validator_stub() {
            let v = Validation::Obj(
                ObjValidation::default()
                    .optional()
                    .validation(BTreeMap::from([(String::from("is"), Validation::Bool(BoolValidation::default().eq(false)))])),
            );
            let value = Value::Obj(BTreeMap::from([(String::from("is"), Value::Bool(false))]));
            let err = SchemaErr::obj([(
                String::from("is"),
                SchemaErr::validation([REQUIRED, BOOL, ValidationErr::Operation(Operation::Eq(Operand::Value(OperandValue::Bool(false))))]),
            )]);
            assert_eq!(ValidatorStub(Ok(())).validate(&v, &value), Ok(()));
            assert_eq!(ValidatorStub(Err(err.clone())).validate(&v, &Value::None), Err(err.clone()));
        }
    }
}
